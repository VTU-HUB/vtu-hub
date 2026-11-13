import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const root = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(root, "dist");

/**
 * The sitemap is generated after pages are written, so read each built page and
 * leave out anything marked noindex (unreviewed template guides, search). One
 * rule in the page decides both — the sitemap can never disagree with the robots meta.
 */
function isIndexedPage(page) {
  const { pathname } = new URL(page);
  const file = pathname === "/" ? "index.html" : `${pathname.replace(/^\/|\/$/g, "")}.html`;
  try {
    const html = fs.readFileSync(path.join(distDir, file), "utf8");
    if (/<meta name="robots" content="noindex/.test(html)) return false;
    // A page whose canonical points elsewhere (a course shared by several programmes)
    // is a duplicate — list only the canonical copy.
    const canon = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
    return !canon || canon === page.replace(/\/$/, "") || canon === page;
  } catch (err) {
    // Fail closed: a page we cannot read must not be advertised to search engines.
    console.warn(`[sitemap] left out ${pathname}: could not read ${file} (${err.message})`);
    return false;
  }
}

export default defineConfig({
  site: "https://vtuhub.site",
  output: "static",
  trailingSlash: "never",
  compressHTML: true,
  // Study notes (src/data/notes/*.md): plain code blocks styled by .notes-prose, so they
  // read well in both light and dark mode.
  markdown: { syntaxHighlight: false },
  // The floating dev toolbar covers mobile footers in local preview; it never ships to production.
  devToolbar: { enabled: false },
  // "file" emits /vtu/cse.html (not /vtu/cse/index.html) so Cloudflare serves
  // /vtu/cse with a 200 instead of a 307 redirect to /vtu/cse/. That keeps the
  // served URL identical to the canonical and sitemap URLs (trailingSlash: "never").
  build: { inlineStylesheets: "auto", format: "file" },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/search") && isIndexedPage(page),
      changefreq: "weekly",
      priority: 0.7,
      // Adds xhtml:link alternates between /, /kn and /hi versions of translated pages.
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-IN", kn: "kn-IN", hi: "hi-IN" },
      },
    }),
    {
      // Google, Bing and most tools look for /sitemap.xml first. @astrojs/sitemap writes
      // sitemap-index.xml; publish an identical copy at the conventional path. Must stay
      // after sitemap() — Astro runs build:done hooks in array order.
      name: "sitemap-xml-alias",
      hooks: {
        "astro:build:done": ({ dir }) => {
          const out = fileURLToPath(dir);
          // Split the flat sitemap into one file per site section so Search Console
          // reports coverage per section, and style it so a browser shows the structure.
          const flat = fs.readFileSync(path.join(out, "sitemap-0.xml"), "utf8");
          const head = flat.slice(0, flat.indexOf("<url>")).replace(/^<\?xml[^>]*\?>/, "");
          const urls = flat.match(/<url>[\s\S]*?<\/url>/g) ?? [];
          const SECTIONS = [
            ["kannada", "Kannada pages", (p) => /^\/kn(\/|$)/.test(p)],
            ["hindi", "Hindi pages", (p) => /^\/hi(\/|$)/.test(p)],
            ["subjects", "Subjects (every course page)", (p) => /^\/vtu\/[^/]+\/[^/]+\/[^/]+/.test(p)],
            ["programmes", "Programmes, semesters and schemes", (p) => /^\/(vtu|semesters|schemes)(\/|$)/.test(p)],
            ["updates", "Exam updates, guides and articles", (p) => /^\/(updates|articles|resources|files)(\/|$)/.test(p)],
            ["tools", "Calculators", (p) => /^\/tools(\/|$)/.test(p)],
            ["pages", "Home and site pages", () => true],
          ];
          const groups = new Map(SECTIONS.map(([k]) => [k, []]));
          for (const u of urls) {
            const p = (/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/.exec(u)?.[1] || "/").replace(/\/$/, "") || "/";
            groups.get(SECTIONS.find(([, , test]) => test(p))[0]).push(u);
          }
          const xsl = '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';
          const index = [];
          for (const [key, label] of SECTIONS) {
            const list = groups.get(key);
            if (!list.length) continue;
            const file = `sitemap-${key}.xml`;
            fs.writeFileSync(path.join(out, file), `${xsl}${head}<!-- ${label}: ${list.length} URLs -->${list.join("")}</urlset>`);
            // No lastmod on the index: a rebuild that did not change pages must not
            // look like every section was updated today.
            index.push(`<sitemap><loc>https://vtuhub.site/${file}</loc></sitemap>`);
          }
          const idx = `${xsl}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${index.join("")}</sitemapindex>`;
          fs.writeFileSync(path.join(out, "sitemap.xml"), idx);
          fs.writeFileSync(path.join(out, "sitemap-index.xml"), idx);
          fs.rmSync(path.join(out, "sitemap-0.xml"));
        },
      },
    },
    {
      // Subject and guide URLs that existed before the switch to official VTU data must
      // keep working. For each old URL with no page any more, 301 to the same course code
      // in the same programme, else its semester page, else the programme page.
      name: "legacy-redirects",
      hooks: {
        "astro:build:done": ({ dir }) => {
          const out = fileURLToPath(dir);
          const legacy = JSON.parse(fs.readFileSync(path.join(root, "src/data/vtu/legacy-urls.json"), "utf8"));
          const exists = (p) => fs.existsSync(path.join(out, `${p.replace(/^\//, "")}.html`));
          const byCode = new Map(); // "cse:BCS301" -> "/vtu/cse/3rd-semester/…"
          const vtuDir = path.join(out, "vtu");
          for (const b of fs.readdirSync(vtuDir)) {
            const bd = path.join(vtuDir, b);
            if (!fs.statSync(bd).isDirectory()) continue;
            for (const s of fs.readdirSync(bd)) {
              const sd = path.join(bd, s);
              if (!fs.statSync(sd).isDirectory()) continue;
              for (const f of fs.readdirSync(sd)) {
                if (!f.endsWith(".html")) continue;
                const code = /"courseCode":"([^"]+)"/.exec(fs.readFileSync(path.join(sd, f), "utf8"))?.[1];
                const key = `${b}:${code}`;
                if (code && !byCode.has(key)) byCode.set(key, `/vtu/${b}/${s}/${f.slice(0, -5)}`);
              }
            }
          }
          const lines = [];
          for (const s of legacy.subjects) {
            if (exists(s.path)) continue;
            const sem = s.path.split("/").slice(0, 4).join("/");
            const to = byCode.get(`${s.branch}:${s.code}`) ?? (exists(sem) ? sem : `/vtu/${s.branch}`);
            lines.push(`${s.path} ${to} 301`);
          }
          for (const f of legacy.files) {
            if (exists(f.path)) continue;
            // Longest programme slug that prefixes the file name ("robotics-ai-…", not "robotics").
            const name = f.path.replace("/files/", "");
            const branch =
              fs.readdirSync(vtuDir).filter((b) => name.startsWith(`${b}-`)).sort((a, b) => b.length - a.length)[0] ?? name.split("-")[0];
            const to = byCode.get(`${branch}:${f.code}`) ?? (exists(`/vtu/${branch}`) ? `/vtu/${branch}` : "/vtu");
            lines.push(`${f.path} ${to} 301`);
          }
          if (lines.length > 2000) throw new Error(`${lines.length} redirects exceeds Cloudflare's 2,000 static redirect limit`);
          fs.writeFileSync(path.join(out, "_redirects"), lines.join("\n") + "\n");
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { "@": path.join(root, "src") },
    },
  },
});
