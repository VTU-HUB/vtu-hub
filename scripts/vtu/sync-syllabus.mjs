#!/usr/bin/env node
// Downloads every official 2022-scheme syllabus PDF (the per-programme semester syllabi
// recorded in courses.json, plus the per-course first-year PDFs on the scheme page) and
// writes, per course code: VTU's five modules, course outcomes, prescribed textbooks,
// reference books and web links — src/data/vtu/syllabus.json.
// A partial failure never deletes good data: courses whose PDF failed keep their previous
// entry, a course that suddenly has fewer modules keeps the old one, and the file is not
// written at all when too many PDFs fail or a programme's coverage drops sharply.
// Usage: node scripts/vtu/sync-syllabus.mjs [--accept-regressions] [--force]
//        (run after sync-schemes.mjs)
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseSyllabus } from "./parse-syllabus.mjs";
import { fetchRetry } from "./net.mjs";
import { coverageByProgramme, mergeSyllabus, syncProblems, syncSummary } from "./syllabus-merge.mjs";

const OUT = path.resolve("src/data/vtu/syllabus.json");
const COURSES = path.resolve("src/data/vtu/courses.json");
const CACHE = path.join(os.tmpdir(), "vtuhub-syllabus-pdfs");
const SCHEME_PAGE = "https://vtu.ac.in/en/b-e-scheme-syllabus/";
const CONCURRENCY = 4;

const courses = JSON.parse(fs.readFileSync(COURSES, "utf8"));
const PREVIOUS = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")).courses ?? {} : {};
const FORCE = process.argv.includes("--force");

/** Guess a missing semester file from the names VTU already uses for that programme. */
function syllabusCandidates(program) {
  const existing = new Set(program.syllabi ?? []);
  const stems = new Map();
  const covered = new Set();
  for (const url of existing) {
    let base = "";
    try {
      base = decodeURIComponent(new URL(url).pathname.split("/").pop() ?? "");
    } catch {
      continue;
    }
    const m = /^(\d)([a-z0-9]+)syll\.pdf$/i.exec(base);
    if (!m) continue;
    covered.add(Number(m[1]));
    const stem = m[2].toLowerCase();
    stems.set(stem, (stems.get(stem) ?? 0) + 1);
  }
  const stem = [...stems.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0];
  if (!stem) return [];
  const sems = new Set((program.courses ?? []).map((c) => c.semester).filter((n) => n >= 3 && n <= 8));
  const out = [];
  for (const n of [...sems].sort()) {
    if (covered.has(n)) continue;
    const url = `https://vtu.ac.in/pdf/2022_3to8/${n}${stem}syll.pdf`;
    if (!existing.has(url)) out.push(url);
  }
  return out;
}

const probes = [];
for (const program of courses.programs) {
  for (const url of syllabusCandidates(program)) probes.push({ program, url });
}

async function fetchPdf(url) {
  fs.mkdirSync(CACHE, { recursive: true });
  const file = path.join(CACHE, path.basename(new URL(url).pathname));
  if (fs.existsSync(file)) {
    const cached = fs.readFileSync(file);
    if (cached.subarray(0, 5).toString() === "%PDF-") return file;
  }
  const res = await fetchRetry(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.subarray(0, 5).toString() !== "%PDF-") throw new Error("not a PDF");
  fs.writeFileSync(file, buf);
  return file;
}

let foundSyllabi = 0;
async function probeWorker() {
  while (probes.length) {
    const item = probes.shift();
    if (!item) return;
    try {
      await fetchPdf(item.url);
      item.program.syllabi = [...new Set([...(item.program.syllabi ?? []), item.url])];
      foundSyllabi++;
      console.log(`found ${item.url}`);
    } catch {
      /* VTU does not publish this semester file */
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, probeWorker));
if (foundSyllabi) {
  fs.writeFileSync(COURSES, JSON.stringify(courses, null, 2) + "\n");
  console.log(`courses.json: added ${foundSyllabi} syllabus PDFs`);
}

const urls = new Set(courses.programs.flatMap((p) => p.syllabi ?? []));

// First-year course syllabi are one PDF per course: /pdf/2022syll/<CODE>.pdf
let page = "";
try {
  const res = await fetchRetry(SCHEME_PAGE);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  page = await res.text();
} catch (e) {
  console.warn(`scheme page unavailable (${e.message}); using the PDFs from the previous run`);
}
// Every PDF the previous run read is tried again, so a page change or outage cannot
// silently drop courses: a PDF that is gone fails, and its courses keep their old entry.
for (const entry of Object.values(PREVIOUS)) for (const u of entry.sources ?? [entry.source]) if (u) urls.add(u);
for (const m of page.matchAll(/https?:\/\/vtu\.ac\.in\/pdf\/2022syll\/(B[A-Z0-9]+)\.pdf/gi)) urls.add(m[0].replace(/^http:/, "https:"));

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
        if (!prev) {
          out[code] = { source: url, sources: [url], ...s };
          continue;
        }
        const sources = [...new Set([...(prev.sources ?? [prev.source]), url])];
        if (prev.modules.length >= s.modules.length) out[code] = { ...prev, sources };
        else out[code] = { source: url, sources, ...s };
      }
    } catch (e) {
      failed.push({ url, reason: e.message });
    }
    if (++done % 20 === 0) console.log(`  ${done}/${urls.size} PDFs`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const failedSources = failed.map((f) => f.url).sort();
for (const f of failed) console.warn(`failed — ${f.url}: ${f.reason}`);
const { courses: merged, report } = mergeSyllabus(PREVIOUS, out, {
  failedSources,
  acceptRegressions: process.argv.includes("--accept-regressions"),
});
const codes = Object.keys(merged);
const problems = syncProblems({
  report,
  prevCoverage: coverageByProgramme(courses.programs, PREVIOUS),
  nextCoverage: coverageByProgramme(courses.programs, merged),
  sources: urls.size,
  failed: failed.length,
  total: codes.length,
});
const summary = syncSummary({ report, failedSources, sources: urls.size, total: codes.length, problems });
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
if (problems.length && !FORCE) {
  console.error("\nsyllabus.json NOT written. Fix the cause, or re-run with --force after checking the PDFs.");
  process.exit(1);
}

const next = JSON.stringify({ scheme: "2022", source: SCHEME_PAGE, courses: merged }, null, 2) + "\n";
const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8").replace(/\r\n/g, "\n") : "";
if (prev === next) console.log(`syllabus: unchanged (${codes.length} courses)`);
else {
  fs.writeFileSync(OUT, next);
  const withModules = codes.filter((c) => merged[c].modules.length >= 4).length;
  console.log(`syllabus: wrote ${codes.length} courses (${withModules} with 4–5 modules) from ${urls.size} PDFs`);
}
