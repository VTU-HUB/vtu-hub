#!/usr/bin/env node
// Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver…).
// One POST notifies all participating engines. Google does not use IndexNow — submit
// the sitemap once in Search Console and Google re-reads it on its own.
//
// Usage: node scripts/indexnow.mjs [--dry-run]
// Requires the key file public/<key>.txt to be live on the site first.

const SITE = "https://vtuhub.site";
const KEY = "0f64dbc213419a25149e73d56cf9b2ec";
const dryRun = process.argv.includes("--dry-run");

async function text(url) {
  const res = await fetch(url, { headers: { "User-Agent": "vtuhub-indexnow/1.0" } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

const keyBody = (await text(`${SITE}/${KEY}.txt`)).trim();
if (keyBody !== KEY) throw new Error(`Key file on ${SITE} does not match — deploy first.`);

const index = await text(`${SITE}/sitemap-index.xml`);
const urls = [];
for (const sm of locs(index)) urls.push(...locs(await text(sm)));
console.log(`Found ${urls.length} URLs in the sitemap.`);
if (dryRun || urls.length === 0) process.exit(0);

// IndexNow accepts up to 10,000 URLs per request.
for (let i = 0; i < urls.length; i += 10000) {
  const batch = urls.slice(i, i + 10000);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: batch }),
  });
  console.log(`IndexNow: ${batch.length} URLs → HTTP ${res.status} ${res.statusText}`);
  if (res.status >= 400) process.exitCode = 1;
}
