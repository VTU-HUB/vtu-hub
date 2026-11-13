#!/usr/bin/env node
// Route inventory for the BUILT site (run `npm run build` first). Walks every page in
// dist/ and reports, per page type: how many pages, how many are indexable, canonical
// targets, thin pages (little visible text), broken internal links, orphan pages
// (nothing links to them) and whether the sitemap agrees with the robots meta.
//
// Usage: node scripts/audit-routes.mjs [--csv routes.csv] [--json summary.json]
// Exits non-zero when internal links point at pages that do not exist.

import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .reduce((a, v, i, all) => (v.startsWith("--") ? [...a, [v.slice(2), all[i + 1]]] : a), []),
);
const DIST = path.resolve("dist");
const SITE = "https://vtuhub.site";
if (!fs.existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(2);
}

/** Every file in dist, as a site path ("/vtu/cse" for dist/vtu/cse.html). */
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else files.push(p);
  }
})(DIST);
const rel = (p) => "/" + path.relative(DIST, p).split(path.sep).join("/");
const assets = new Set(files.filter((f) => !f.endsWith(".html")).map(rel));
const pages = new Map(); // route -> file
for (const f of files.filter((f) => f.endsWith(".html"))) {
  let r = rel(f).replace(/\.html$/, "");
  if (r === "/index") r = "/";
  else if (r.endsWith("/index")) r = r.slice(0, -"/index".length);
  pages.set(r, f);
}

/** Page type from the URL shape. Order matters: first match wins. */
const TYPES = [
  ["home", (r) => r === "/" || r === "/kn" || r === "/hi"],
  ["translated (kn/hi)", (r) => /^\/(kn|hi)\//.test(r)],
  ["subject resource type", (r) => /^\/vtu\/[^/]+\/[^/]+\/[^/]+\/[^/]+$/.test(r)],
  ["subject", (r) => /^\/vtu\/[^/]+\/[^/]+\/[^/]+$/.test(r)],
  ["semester", (r) => /^\/vtu\/[^/]+\/[^/]+$/.test(r)],
  ["programme", (r) => /^\/vtu\/[^/]+$/.test(r)],
  ["vtu index", (r) => r === "/vtu"],
  ["guide (/files)", (r) => r.startsWith("/files/")],
  ["update", (r) => r.startsWith("/updates")],
  ["article", (r) => r.startsWith("/articles")],
  ["resource listing", (r) => r.startsWith("/resources")],
  ["scheme", (r) => r.startsWith("/schemes")],
  ["semester index (legacy)", (r) => r.startsWith("/semesters")],
  ["tool", (r) => r.startsWith("/tools")],
  ["site page", () => true],
];
const typeOf = (r) => TYPES.find(([, t]) => t(r))[0];

const meta = (html, re) => re.exec(html)?.[1] ?? "";
const inbound = new Map();
const broken = new Map(); // target -> [from...]
const rows = [];

for (const [route, file] of pages) {
  const html = fs.readFileSync(file, "utf8");
  const robots = meta(html, /<meta name="robots" content="([^"]+)"/);
  const noindex = /noindex/.test(robots);
  const canonical = meta(html, /<link rel="canonical" href="([^"]+)"/);
  const redirect = /http-equiv="refresh"/i.test(html);
  const main = /<main[\s\S]*?<\/main>/.exec(html)?.[0] ?? html;
  const words = main
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const ldTypes = [...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]);
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    let href = m[1].replace(/&amp;/g, "&");
    if (href.startsWith(SITE)) href = href.slice(SITE.length) || "/";
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const target = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
    if (pages.has(target))
      inbound.set(target, (inbound.get(target) ?? 0) + (target === route ? 0 : 1));
    else if (!assets.has(target)) broken.set(target, [...(broken.get(target) ?? []), route]);
  }
  rows.push({
    route,
    type: typeOf(route),
    indexable: !noindex && !redirect,
    redirect,
    canonical: canonical.replace(SITE, "") || "",
    canonicalSelf:
      !canonical || canonical === SITE + (route === "/" ? "" : route) || canonical === SITE + route,
    words,
    title: meta(html, /<title>([^<]*)<\/title>/),
    desc: meta(html, /<meta name="description" content="([^"]*)"/),
    ld: [...new Set(ldTypes)].join("|"),
  });
}

// Sitemap agreement.
const sitemapUrls = new Set();
for (const f of fs
  .readdirSync(DIST)
  .filter((f) => /^sitemap-.*\.xml$/.test(f) && f !== "sitemap-index.xml")) {
  for (const m of fs.readFileSync(path.join(DIST, f), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const u = m[1].replace(SITE, "") || "/";
    if (!u.endsWith(".xml")) sitemapUrls.add(u);
  }
}

const THIN = 150;
const byType = {};
for (const r of rows) {
  const t = (byType[r.type] ??= {
    pages: 0,
    indexable: 0,
    canonicalElsewhere: 0,
    redirects: 0,
    thinIndexable: 0,
    orphans: 0,
    inSitemap: 0,
    medianWords: [],
  });
  t.pages++;
  if (r.indexable) t.indexable++;
  if (r.redirect) t.redirects++;
  if (!r.canonicalSelf) t.canonicalElsewhere++;
  if (r.indexable && r.words < THIN) t.thinIndexable++;
  if (!r.redirect && !inbound.get(r.route) && r.route !== "/") t.orphans++;
  if (sitemapUrls.has(r.route)) t.inSitemap++;
  t.medianWords.push(r.words);
}
for (const t of Object.values(byType)) {
  const w = t.medianWords.sort((a, b) => a - b);
  t.medianWords = w[Math.floor(w.length / 2)];
}

const indexableSelf = rows.filter((r) => r.indexable && r.canonicalSelf).map((r) => r.route);
const missingFromSitemap = indexableSelf.filter((r) => !sitemapUrls.has(r));
const sitemapNotIndexable = [...sitemapUrls].filter((u) => {
  const r = rows.find((x) => x.route === u);
  return !r || !r.indexable || !r.canonicalSelf;
});
const dupDesc = new Map();
for (const r of rows.filter((x) => x.indexable && x.canonicalSelf))
  dupDesc.set(r.desc, [...(dupDesc.get(r.desc) ?? []), r.route]);

const summary = {
  pages: rows.length,
  indexable: rows.filter((r) => r.indexable).length,
  indexableSelfCanonical: indexableSelf.length,
  sitemapUrls: sitemapUrls.size,
  missingFromSitemap: missingFromSitemap.length,
  sitemapNotIndexable: sitemapNotIndexable.length,
  brokenInternalTargets: broken.size,
  brokenInternalLinks: [...broken.values()].reduce((n, v) => n + v.length, 0),
  duplicateDescriptions: [...dupDesc.values()].filter((v) => v.length > 1).length,
  byType,
};

console.log(
  `Route inventory · ${summary.pages} pages · ${summary.indexable} indexable · ${summary.sitemapUrls} in sitemap\n`,
);
console.table(Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, v])));
console.log(`\nIndexable self-canonical pages missing from sitemap: ${missingFromSitemap.length}`);
for (const r of missingFromSitemap.slice(0, 10)) console.log(`  - ${r}`);
console.log(
  `Sitemap URLs that are noindex, redirects or canonical elsewhere: ${sitemapNotIndexable.length}`,
);
for (const r of sitemapNotIndexable.slice(0, 10)) console.log(`  - ${r}`);
console.log(
  `Duplicate descriptions among indexable canonical pages: ${summary.duplicateDescriptions}`,
);
console.log(`Broken internal link targets: ${broken.size} (${summary.brokenInternalLinks} links)`);
for (const [t, from] of [...broken].slice(0, 20))
  console.log(`  - ${t}  ← ${from.length} page(s), e.g. ${from[0]}`);

if (args.csv) {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const head = [
    "route",
    "type",
    "indexable",
    "redirect",
    "canonical",
    "words",
    "inbound",
    "inSitemap",
    "ld",
    "title",
  ];
  const lines = rows
    .sort((a, b) => a.route.localeCompare(b.route))
    .map((r) =>
      [
        r.route,
        r.type,
        r.indexable,
        r.redirect,
        r.canonical,
        r.words,
        inbound.get(r.route) ?? 0,
        sitemapUrls.has(r.route),
        r.ld,
        r.title,
      ]
        .map(esc)
        .join(","),
    );
  fs.writeFileSync(args.csv, [head.join(","), ...lines].join("\n"));
  console.log(`\nWrote ${rows.length} rows to ${args.csv}`);
}
if (args.json) fs.writeFileSync(args.json, JSON.stringify(summary, null, 2));
process.exit(broken.size ? 1 : 0);
