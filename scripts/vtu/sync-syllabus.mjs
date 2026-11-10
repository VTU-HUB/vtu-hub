#!/usr/bin/env node
// Downloads every official 2022-scheme syllabus PDF (the per-programme semester syllabi
// recorded in courses.json, plus the per-course first-year PDFs on the scheme page) and
// writes, per course code: VTU's five modules, course outcomes, prescribed textbooks,
// reference books and web links — src/data/vtu/syllabus.json.
// Usage: node scripts/vtu/sync-syllabus.mjs   (run after sync-schemes.mjs)
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseSyllabus } from "./parse-syllabus.mjs";

const OUT = path.resolve("src/data/vtu/syllabus.json");
const COURSES = path.resolve("src/data/vtu/courses.json");
const CACHE = path.join(os.tmpdir(), "vtuhub-syllabus-pdfs");
const UA = { "User-Agent": "vtuhub-sync/1.0 (+https://vtuhub.site/about)" };
const SCHEME_PAGE = "https://vtu.ac.in/en/b-e-scheme-syllabus/";
const CONCURRENCY = 4;

const courses = JSON.parse(fs.readFileSync(COURSES, "utf8"));
const urls = new Set(courses.programs.flatMap((p) => p.syllabi ?? []));

// First-year course syllabi are one PDF per course: /pdf/2022syll/<CODE>.pdf
const page = await (await fetch(SCHEME_PAGE, { headers: UA })).text();
for (const m of page.matchAll(/https?:\/\/vtu\.ac\.in\/pdf\/2022syll\/(B[A-Z0-9]+)\.pdf/gi)) urls.add(m[0].replace(/^http:/, "https:"));

async function fetchPdf(url) {
  fs.mkdirSync(CACHE, { recursive: true });
  const file = path.join(CACHE, path.basename(new URL(url).pathname));
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.subarray(0, 5).toString() !== "%PDF-") throw new Error("not a PDF");
  fs.writeFileSync(file, buf);
  return file;
}

const out = {};
const failed = [];
const queue = [...urls].sort();
let done = 0;
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    try {
      const parsed = await parseSyllabus(await fetchPdf(url));
      for (const [code, s] of parsed) {
        if (s.modules.length < 3 && !s.outcomes.length) continue; // labs/activity courses with no module text
        const prev = out[code];
        if (prev && prev.modules.length >= s.modules.length) continue;
        out[code] = { source: url, ...s };
      }
    } catch (e) {
      failed.push(`${url}: ${e.message}`);
    }
    if (++done % 20 === 0) console.log(`  ${done}/${urls.size} PDFs`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const codes = Object.keys(out).sort();
for (const f of failed) console.warn(`failed — ${f}`);
if (codes.length < 300) throw new Error(`Only ${codes.length} course syllabi parsed — refusing to overwrite.`);

const sorted = Object.fromEntries(codes.map((c) => [c, out[c]]));
const next = JSON.stringify({ scheme: "2022", source: SCHEME_PAGE, courses: sorted }, null, 2) + "\n";
const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8").replace(/\r\n/g, "\n") : "";
if (prev === next) console.log(`syllabus: unchanged (${codes.length} courses)`);
else {
  fs.writeFileSync(OUT, next);
  const withModules = codes.filter((c) => out[c].modules.length >= 4).length;
  console.log(`syllabus: wrote ${codes.length} courses (${withModules} with 4–5 modules) from ${urls.size} PDFs`);
}
