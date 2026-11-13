#!/usr/bin/env node
// Pulls the latest official VTU exam / timetable / calendar / regulation notices from
// vtu.ac.in's public WordPress REST API and writes src/data/vtu/notices.json.
// Only titles, dates and links are stored — the site links out to the official post
// and PDF, it never re-hosts them. The file is rewritten only when the data changes,
// so the daily cron makes a commit only when VTU actually publishes something.
//
// Safety: every request has a timeout and retries; a category that still fails keeps its
// notices from the previous run; duplicate ids/URLs are dropped; and the file is not
// written when the total falls sharply compared with last time.
import fs from "node:fs";
import path from "node:path";
import { fetchRetry } from "./net.mjs";

const API = "https://vtu.ac.in/en/wp-json/wp/v2/posts";
const OUT = path.resolve("src/data/vtu/notices.json");
const PREVIOUS = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")).notices ?? [] : [];
const FORCE = process.argv.includes("--force");

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
  const res = await fetchRetry(url, { timeout: 45_000 });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("unexpected response (not a list of posts)");
  return data;
}

const byId = new Map();
const seenUrls = new Set();
const report = [];
let duplicates = 0;
for (const [name, id] of Object.entries(CATEGORIES)) {
  let posts;
  try {
    posts = await fetchCategory(id);
  } catch (e) {
    // Keep what we had for this category rather than dropping it.
    const kept = PREVIOUS.filter((n) => (n.categories ?? []).includes(id));
    report.push({ name, fetched: 0, error: e.message, kept: kept.length });
    for (const n of kept) {
      if (byId.has(n.id) || seenUrls.has(n.url)) continue;
      byId.set(n.id, n);
      seenUrls.add(n.url);
    }
    continue;
  }
  let added = 0;
  for (const p of posts) {
    if (!isOfficial(p.link)) continue;
    if (byId.has(p.id) || seenUrls.has(p.link)) {
      // Posts filed under two categories are expected; record that they share it.
      const n = byId.get(p.id);
      if (n && !n.categories.includes(id)) n.categories.push(id);
      else duplicates++;
      continue;
    }
    const title = decode(p.title?.rendered ?? "");
    if (!title) continue;
    byId.set(p.id, {
      id: p.id,
      date: p.date.slice(0, 10),
      title,
      type: classify(title, p.categories ?? []),
      url: p.link,
      categories: [id],
      attachments: attachments(p.content?.rendered ?? ""),
    });
    seenUrls.add(p.link);
    added++;
  }
  report.push({ name, fetched: posts.length, added });
}

const notices = [...byId.values()].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id).slice(0, 200);
for (const r of report)
  console.log(`  ${r.name}: ${r.error ? `FAILED (${r.error}) — kept ${r.kept} from last run` : `${r.fetched} fetched, ${r.added} new here`}`);
if (duplicates) console.log(`  ${duplicates} duplicate posts skipped`);

const problems = [];
if (notices.length < 10) problems.push(`only ${notices.length} notices`);
if (PREVIOUS.length >= 50 && notices.length < PREVIOUS.length * 0.6)
  problems.push(`total fell from ${PREVIOUS.length} to ${notices.length}`);
if (report.every((r) => r.error)) problems.push("every category failed");
if (problems.length && !FORCE) {
  console.error(`notices.json NOT written: ${problems.join("; ")}. Re-run with --force after checking vtu.ac.in.`);
  process.exit(1);
}

const next = JSON.stringify({ source: "https://vtu.ac.in", notices }, null, 2) + "\n";
const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
if (prev === next) {
  console.log(`notices: unchanged (${notices.length})`);
} else {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, next);
  console.log(`notices: wrote ${notices.length} (newest ${notices[0].date})`);
}
