#!/usr/bin/env node
// Pulls the latest official VTU exam / timetable / calendar / regulation notices from
// vtu.ac.in's public WordPress REST API and writes src/data/vtu/notices.json.
// Only titles, dates and links are stored — the site links out to the official post
// and PDF, it never re-hosts them. The file is rewritten only when the data changes,
// so the daily cron makes a commit only when VTU actually publishes something.
import fs from "node:fs";
import path from "node:path";

const API = "https://vtu.ac.in/en/wp-json/wp/v2/posts";
const OUT = path.resolve("src/data/vtu/notices.json");
const UA = { "User-Agent": "vtuhub-sync/1.0 (+https://vtuhub.site/about)" };

// WordPress category ids on vtu.ac.in (from /wp-json/wp/v2/categories).
const CATEGORIES = { examination: 87, timetable: 90, calendar: 106, regulation: 89 };
const PER_CATEGORY = 60;

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—" };
function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Only official VTU hosts are kept as links. */
function isOfficial(url) {
  try {
    const h = new URL(url).hostname;
    return h === "vtu.ac.in" || h.endsWith(".vtu.ac.in");
  } catch {
    return false;
  }
}

function attachments(html) {
  const out = [];
  const seen = new Set();
  for (const m of html.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([^<]*)<\/a>/gi)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (!isOfficial(url) || seen.has(url)) continue;
    seen.add(url);
    out.push({ url, label: decode(m[2]) || "PDF" });
  }
  return out.slice(0, 5);
}

function classify(title, cats) {
  const t = title.toLowerCase();
  if (cats.includes(CATEGORIES.timetable) || /time ?table/.test(t)) return "exam-timetable";
  if (/result|revaluation|photo ?cop|challenge valuation/.test(t)) return "results";
  if (cats.includes(CATEGORIES.calendar) || /calendar/.test(t)) return "academic-calendar";
  return "notifications";
}

async function fetchCategory(id) {
  const url = `${API}?categories=${id}&per_page=${PER_CATEGORY}&orderby=date&order=desc&_fields=id,date,link,title,content,categories`;
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

const byId = new Map();
for (const id of Object.values(CATEGORIES)) {
  for (const p of await fetchCategory(id)) {
    if (byId.has(p.id) || !isOfficial(p.link)) continue;
    const title = decode(p.title?.rendered ?? "");
    if (!title) continue;
    byId.set(p.id, {
      id: p.id,
      date: p.date.slice(0, 10),
      title,
      type: classify(title, p.categories ?? []),
      url: p.link,
      attachments: attachments(p.content?.rendered ?? ""),
    });
  }
}

const notices = [...byId.values()].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id).slice(0, 200);
if (notices.length < 10) throw new Error(`Only ${notices.length} notices fetched — refusing to overwrite.`);

const next = JSON.stringify({ source: "https://vtu.ac.in", notices }, null, 2) + "\n";
const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
if (prev === next) {
  console.log(`notices: unchanged (${notices.length})`);
} else {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, next);
  console.log(`notices: wrote ${notices.length} (newest ${notices[0].date})`);
}
