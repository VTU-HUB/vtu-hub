#!/usr/bin/env node
// Crawls the LIVE site the way a search engine does: starts at the home page and the
// sitemap, obeys robots.txt for Googlebot, follows every internal link, and reports
// what a crawler sees — status codes, redirects, noindex, canonicals, broken links,
// pages in the sitemap that nothing links to, and slow responses.
//
// Usage: node scripts/crawl.mjs [--site https://vtuhub.site] [--limit 20000] [--concurrency 8]

const args = Object.fromEntries(
  process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith("--") ? [...a, [v.slice(2), all[i + 1]]] : a), []),
);
const SITE = (args.site ?? "https://vtuhub.site").replace(/\/$/, "");
const LIMIT = Number(args.limit ?? 20000);
const CONCURRENCY = Number(args.concurrency ?? 8);
const UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) vtuhub-self-crawl";
const host = new URL(SITE).host;

async function get(url, redirect = "manual") {
  const t0 = Date.now();
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect });
  const ms = Date.now() - t0;
  const type = res.headers.get("content-type") ?? "";
  const body = type.includes("html") || type.includes("xml") || type.includes("text") ? await res.text() : "";
  return { status: res.status, location: res.headers.get("location"), type, body, ms };
}

// robots.txt — the rules for User-agent: * (Googlebot has no group of its own here).
const robots = (await get(`${SITE}/robots.txt`)).body;
const disallow = [];
let applies = false;
for (const line of robots.split(/\r?\n/)) {
  const [k, ...rest] = line.split(":");
  const v = rest.join(":").trim();
  if (/^user-agent$/i.test(k.trim())) applies = v === "*" || /googlebot/i.test(v);
  else if (applies && /^disallow$/i.test(k.trim()) && v) disallow.push(v);
}
const allowed = (path) => !disallow.some((d) => path.startsWith(d));

// Sitemap URLs (index → section sitemaps).
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const sitemapUrls = new Set();
for (const sm of locs((await get(`${SITE}/sitemap.xml`)).body)) {
  if (sm.endsWith(".xml")) for (const u of locs((await get(sm)).body)) sitemapUrls.add(u.replace(/\/$/, "") || SITE);
}

const norm = (href, base) => {
  try {
    const u = new URL(href, base);
    if (u.host !== host || !/^https?:$/.test(u.protocol)) return null;
    u.hash = "";
    u.search = "";
    return u.href.replace(/\/$/, "") || SITE;
  } catch {
    return null;
  }
};

const seen = new Map(); // url -> result
const linkedFrom = new Map(); // url -> first referrer
// Crawl every sitemap URL as well as every internally linked page. This makes the
// status/noindex/canonical checks cover the full declared index, including pages that
// are accidentally orphaned from navigation.
const queue = [...new Set([SITE, ...sitemapUrls])];
linkedFrom.set(SITE, "(start)");
const issues = { broken: [], redirects: [], noindexInSitemap: [], canonicalElsewhereInSitemap: [], missingTitle: [], slow: [], blocked: [], serverErrors: [] };

async function visit(url) {
  const path = new URL(url).pathname;
  if (!allowed(path)) {
    issues.blocked.push(url);
    return;
  }
  let r;
  try {
    r = await get(url);
  } catch (e) {
    issues.serverErrors.push(`${url} (${e.message})`);
    return;
  }
  seen.set(url, r.status);
  if (r.ms > 1500) issues.slow.push(`${url} (${r.ms} ms)`);
  if (r.status >= 300 && r.status < 400) {
    const to = norm(r.location ?? "", url);
    issues.redirects.push(`${url} → ${r.status} ${r.location} (linked from ${linkedFrom.get(url)})`);
    if (to && !seen.has(to) && !queue.includes(to)) {
      linkedFrom.set(to, url);
      queue.push(to);
    }
    return;
  }
  if (r.status >= 500) issues.serverErrors.push(`${url} → ${r.status}`);
  if (r.status >= 400) {
    issues.broken.push(`${url} → ${r.status} (linked from ${linkedFrom.get(url)})`);
    return;
  }
  if (!r.type.includes("html")) return;
  const html = r.body;
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  const canonical = /<link rel="canonical" href="([^"]+)"/i.exec(html)?.[1]?.replace(/\/$/, "");
  if (!/<title>[^<]{5,}<\/title>/i.test(html)) issues.missingTitle.push(url);
  if (sitemapUrls.has(url) && noindex) issues.noindexInSitemap.push(url);
  if (sitemapUrls.has(url) && canonical && canonical !== url) issues.canonicalElsewhereInSitemap.push(`${url} → ${canonical}`);
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]+)"/gi)) {
    if (/\brel="[^"]*nofollow/i.test(m[0])) continue;
    const to = norm(m[1], url);
    if (!to || seen.has(to) || linkedFrom.has(to)) continue;
    if (/\.(pdf|png|jpe?g|svg|webp|xml|txt|css|js)$/i.test(to)) continue;
    linkedFrom.set(to, url);
    queue.push(to);
  }
}

const t0 = Date.now();
let active = 0;
await new Promise((resolve) => {
  const pump = () => {
    while (active < CONCURRENCY && queue.length && seen.size + active < LIMIT) {
      const url = queue.shift();
      if (seen.has(url)) continue;
      seen.set(url, 0);
      active++;
      visit(url).finally(() => {
        active--;
        if (seen.size % 500 === 0) console.error(`  crawled ${seen.size}…`);
        pump();
      });
    }
    if (active === 0) resolve();
  };
  pump();
});

const crawled = [...seen.entries()].filter(([, s]) => s === 200).map(([u]) => u);
const orphans = [...sitemapUrls].filter((u) => !linkedFrom.has(u));
const report = {
  site: SITE,
  seconds: Math.round((Date.now() - t0) / 1000),
  robotsDisallow: disallow,
  sitemapUrls: sitemapUrls.size,
  pagesReached: crawled.length,
  sitemapPagesChecked: [...sitemapUrls].filter((u) => seen.has(u)).length,
  inSitemapButNotLinked: orphans.length,
  broken: issues.broken.length,
  redirectsFollowed: issues.redirects.length,
  noindexInSitemap: issues.noindexInSitemap.length,
  canonicalElsewhereInSitemap: issues.canonicalElsewhereInSitemap.length,
  missingTitle: issues.missingTitle.length,
  slow: issues.slow.length,
  serverErrors: issues.serverErrors.length,
};
console.log(JSON.stringify(report, null, 2));
const show = (label, list) => list.length && console.log(`\n${label} (${list.length}):\n  ${list.slice(0, 15).join("\n  ")}`);
show("BROKEN", issues.broken);
show("SERVER ERRORS", issues.serverErrors);
show("NOINDEX BUT IN SITEMAP", issues.noindexInSitemap);
show("CANONICAL ELSEWHERE BUT IN SITEMAP", issues.canonicalElsewhereInSitemap);
show("IN SITEMAP, NOT LINKED FROM ANY CRAWLED PAGE", orphans);
show("MISSING TITLE", issues.missingTitle);
show("SLOW (>1.5 s)", issues.slow);
show("INTERNAL LINKS THAT REDIRECT", issues.redirects);
if (issues.broken.length || issues.serverErrors.length || issues.noindexInSitemap.length) process.exitCode = 1;
