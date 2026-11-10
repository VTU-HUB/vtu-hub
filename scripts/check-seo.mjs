#!/usr/bin/env node
// Audits every built HTML page in dist/ for SEO and image-accessibility problems.
// Usage: npm run build && npm run check:seo   (add --verbose to list every issue)
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const SITE = "https://vtuhub.site";
const verbose = process.argv.includes("--verbose");

if (!existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const existing = new Set(
  files.map((f) => "/" + path.relative(DIST, f).split(path.sep).join("/")),
);

function routeOf(file) {
  let r = "/" + path.relative(DIST, file).split(path.sep).join("/");
  r = r.replace(/\/index\.html$/, "").replace(/\.html$/, "");
  return r || "/";
}

function resolves(href) {
  const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
  if (clean === "/") return existing.has("/index.html");
  return (
    existing.has(clean) ||
    existing.has(`${clean}.html`) ||
    existing.has(`${clean}/index.html`)
  );
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[2] ?? m[3] ?? m[4] ?? "") : null;
};
const decode = (t) => t.replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const meta = (html, key, val) => {
  const re = new RegExp(`<meta[^>]*${key}=["']${val}["'][^>]*>`, "i");
  const t = html.match(re);
  return t ? decode(attr(t[0], "content") ?? "") : null;
};

const issues = {}; // rule -> [route: detail]
const add = (rule, route, detail = "") => (issues[rule] ??= []).push(`${route}${detail ? `  ${detail}` : ""}`);
const titles = new Map();
const descs = new Map();
let images = 0;
let svgs = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const route = routeOf(file);
  const noindex = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);

  // ---- images: every <img> needs alt, dimensions, sane loading ----
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    images++;
    const alt = attr(tag, "alt");
    const decorative = attr(tag, "role") === "presentation" || attr(tag, "aria-hidden") === "true";
    if (alt === null) add("ERROR img missing alt", route, attr(tag, "src") ?? "");
    else if (alt.trim() === "" && !decorative) add("ERROR img empty alt without decorative role", route, attr(tag, "src") ?? "");
    else if (/\.(png|jpe?g|webp|svg|gif|avif)$/i.test(alt) || /^(image|photo|picture|img)$/i.test(alt.trim()))
      add("ERROR img alt is a filename/placeholder", route, alt);
    else if (alt.length > 125) add("WARN img alt > 125 chars", route, alt.slice(0, 60));
    if (attr(tag, "width") === null || attr(tag, "height") === null) add("WARN img missing width/height (CLS)", route, attr(tag, "src") ?? "");
  }
  // svg: either hidden from AT, or labelled as an image
  for (const tag of html.match(/<svg\b[^>]*>/gi) ?? []) {
    svgs++;
    const hidden = attr(tag, "aria-hidden") === "true";
    const labelled = attr(tag, "role") === "img" && (attr(tag, "aria-label") || /<title>/i.test(html));
    if (!hidden && !labelled) add("ERROR svg neither aria-hidden nor role=img+label", route);
  }
  for (const tag of html.match(/<(input)\b[^>]*type=["']image["'][^>]*>/gi) ?? []) {
    if (!attr(tag, "alt")) add("ERROR input[type=image] missing alt", route);
  }
  for (const tag of html.match(/<area\b[^>]*>/gi) ?? []) {
    if (!attr(tag, "alt")) add("ERROR area missing alt", route);
  }

  // ---- social images ----
  if (meta(html, "property", "og:image") && !meta(html, "property", "og:image:alt")) add("ERROR og:image without og:image:alt", route);
  if (meta(html, "name", "twitter:image") && !meta(html, "name", "twitter:image:alt")) add("ERROR twitter:image without twitter:image:alt", route);

  // ---- head basics ----
  if (!/<html[^>]*\slang=/i.test(html)) add("ERROR missing <html lang>", route);
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim());
  if (!title) add("ERROR missing <title>", route);
  else {
    if (title.length > 65) add("WARN title > 65 chars", route, `(${title.length}) ${title}`);
    if (title.length < 20) add("WARN title < 20 chars", route, title);
    if (!noindex) titles.set(title, [...(titles.get(title) ?? []), route]);
  }
  const desc = meta(html, "name", "description");
  if (!desc) add("ERROR missing meta description", route);
  else {
    if (desc.length > 165) add("WARN description > 165 chars", route, `(${desc.length})`);
    if (desc.length < 70) add("WARN description < 70 chars", route, `(${desc.length}) ${desc}`);
    if (!noindex) descs.set(desc, [...(descs.get(desc) ?? []), route]);
  }
  const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
  if (!canonical) add("ERROR missing canonical", route);
  else if (route !== "/404" && attr(canonical[0], "href") !== SITE + (route === "/" ? "" : route) && attr(canonical[0], "href") !== `${SITE}/`) {
    // A canonical may deliberately point at another page (the same VTU course shared by
    // several programmes) — fine as long as that page exists.
    const target = attr(canonical[0], "href").replace(SITE, "") || "/";
    if (!target.startsWith("/") || !existing.has(target === "/" ? "/index.html" : `${target}.html`))
      add("ERROR canonical points to a missing page", route, attr(canonical[0], "href"));
  }

  const h1s = (html.match(/<h1\b/gi) ?? []).length;
  if (h1s !== 1) add("ERROR h1 count != 1", route, `(${h1s})`);

  // ---- structured data must parse ----
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(m[1]);
    } catch {
      add("ERROR JSON-LD does not parse", route);
    }
  }

  // ---- internal links and head assets must resolve ----
  for (const m of html.matchAll(/\s(?:href|src)=["'](\/[^"'#][^"']*|\/)["']/gi)) {
    const href = m[1];
    if (href.startsWith("//")) continue;
    if (!resolves(href)) add("ERROR broken internal link/asset", route, href);
  }
}

for (const [t, routes] of titles) if (routes.length > 1) add("WARN duplicate title", routes.slice(0, 3).join(", "), `x${routes.length}: ${t}`);
for (const [d, routes] of descs) if (routes.length > 1) add("WARN duplicate description", routes.slice(0, 3).join(", "), `x${routes.length}: ${d.slice(0, 70)}`);

// ---- site-level files ----
for (const f of ["/robots.txt", "/sitemap-index.xml", "/favicon.svg", "/og.jpg"]) if (!existing.has(f)) add("ERROR missing site file", f);

console.log(`Checked ${htmlFiles.length} pages · ${images} <img> · ${svgs} <svg>`);
let errors = 0;
for (const [rule, list] of Object.entries(issues).sort()) {
  if (rule.startsWith("ERROR")) errors += list.length;
  console.log(`\n${rule}: ${list.length}`);
  for (const line of verbose ? list : list.slice(0, 5)) console.log(`  - ${line}`);
  if (!verbose && list.length > 5) console.log(`  … ${list.length - 5} more (use --verbose)`);
}
console.log(errors ? `\n✗ ${errors} error(s)` : "\n✓ No errors");
process.exit(errors ? 1 : 0);
