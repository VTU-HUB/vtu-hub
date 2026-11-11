#!/usr/bin/env node
// Downloads VTU's official 2022-scheme "Scheme of Teaching and Examinations" PDFs,
// parses every course (code, title, credits, semester, elective group) and writes
// src/data/vtu/courses.json. The file is only rewritten when the parsed data changes.
//
// Sources are the PDFs linked from https://vtu.ac.in/en/b-e-scheme-syllabus/.
// Usage: node scripts/vtu/sync-schemes.mjs
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseScheme } from "./parse-scheme.mjs";
import { matchProgram, slugify } from "./programs.mjs";

const OUT = path.resolve("src/data/vtu/courses.json");
const FIXES = JSON.parse(fs.readFileSync(new URL("./title-fixes.json", import.meta.url), "utf8"));
const CACHE = path.join(os.tmpdir(), "vtuhub-scheme-pdfs");
const UA = { "User-Agent": "vtuhub-sync/1.0 (+https://vtuhub.site/about)" };
const BASE = "https://vtu.ac.in/pdf";

/** First-year (I & II sem) scheme per engineering stream. */
const STREAMS = {
  cs: { name: "CSE stream", url: `${BASE}/2022syll/csesch.pdf` },
  ee: { name: "Electrical / Electronics stream", url: `${BASE}/2022syll/elecsch.pdf` },
  me: { name: "Mechanical stream", url: `${BASE}/2022syll/mechsch.pdf` },
  cv: { name: "Civil stream", url: `${BASE}/2022syll/cvsch.pdf` },
};

const SCHEME_PAGE = "https://vtu.ac.in/en/b-e-scheme-syllabus/";

/**
 * Reads the live scheme & syllabus page and returns every 2022-scheme programme row:
 * its printed name, its III–VIII scheme PDFs and its syllabus PDFs. New programmes
 * VTU adds to the table are picked up automatically.
 */
async function discoverPrograms() {
  const res = await fetch(SCHEME_PAGE, { headers: UA });
  if (!res.ok) throw new Error(`${SCHEME_PAGE} → HTTP ${res.status}`);
  const html = await res.text();
  const rows = [];
  for (const m of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const row = m[1];
    if (!row.includes("/pdf/2022_3to8/")) continue;
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => c[1]);
    if (cells.length < 3) continue;
    const name = cells[1]
      .split(/<br\s*\/?>/i)[0]
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&#8211;|&#8212;/g, "-")
      .replace(/\s+/g, " ")
      .trim();
    const links = [...row.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)].map((a) => ({
      url: a[1].replace(/^http:/, "https:"),
      text: a[2].replace(/<[^>]+>/g, "").trim(),
    }));
    const official = (u) => /^https:\/\/vtu\.ac\.in\/pdf\/2022_3to8\//.test(u);
    const schemes = links.filter(
      (l) => official(l.url) && /(sch|ch)\d*\.pdf$/i.test(l.url) && !/syl|circ|cir|manual/i.test(l.url),
    );
    const syllabi = links.filter((l) => official(l.url) && /syl+\.pdf$|scyll\.pdf$/i.test(l.url));
    if (!name || schemes.length === 0) continue;
    if (/^bachelor of design|^b\.?\s?des/i.test(name)) continue; // B.Des is not a B.E./B.Tech programme
    rows.push({ name, schemes: [...new Set(schemes.map((s) => s.url))], syllabi: [...new Set(syllabi.map((s) => s.url))] });
  }
  if (rows.length < 20) throw new Error(`Only ${rows.length} programmes found on the scheme page — layout changed?`);
  return rows;
}

// Mandatory non-credit activities (NSS, PE, Yoga, IKS) are not study subjects.
const NON_CREDIT = /^B(NSK|PEK|YOK|IKS)\d{3}$/;
const JUNK_TITLE = /^(shall have|see shall|[-,]|bos will publish|th th to be completed)/i;

async function download(url) {
  fs.mkdirSync(CACHE, { recursive: true });
  const file = path.join(CACHE, path.basename(new URL(url).pathname));
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.subarray(0, 5).toString() !== "%PDF-") throw new Error(`${url} is not a PDF`);
  fs.writeFileSync(file, buf);
  return { file, sha256: crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16) };
}

/** Semester from the course code: BCS301 → 3, BMATS101 → 1, BXX883 → 8. */
function semesterFromCode(code) {
  const m = /^B[A-Z]+?(\d)\d{2}[A-Za-z]?$/.exec(code);
  const n = m ? Number(m[1]) : NaN;
  return n >= 1 && n <= 8 ? n : null;
}

const DEPT_WORDS = "EEE|ME|CV|EC|CS|CSE|IS|Maths|Physics|Chemistry|Phy|Chem|Mech|Any ?Dept|Any|Engg\\.?(?: dept)?|Dept|OR|Humanities";

function cleanTitle(code, raw) {
  if (FIXES.titles[code]) return FIXES.titles[code];
  let t = raw
    .replace(/(\s+\d{1,2})+(\s*\(?\d+\s*-\s*\d+\s*weeks\)?)?\s*$/i, "") // trailing L-T-P / hours
    .replace(/\s\d \d \d\s/g, " ") // L-T-P that landed mid-title
    // Note: words pdfjs splits after one letter ("L ogic") are fixed per course in
    // title-fixes.json — a blanket rule also merged real ones ("R programming", "I for").
    .replace(/^(#\s*|(ME|EEE|AV|Dept)\s+|Civil\/[A-Za-z/]+(\s+Engg)?\s+)/, "")
    .replace(/\bfor(?=[A-Z])/g, "for ");
  // Department / paper-setting-board words that pdfjs placed on the title line.
  for (let i = 0; i < 3; i++) t = t.replace(new RegExp(`\\s+(${DEPT_WORDS})\\s*$`, "i"), "");
  return t.replace(/\s{2,}/g, " ").trim();
}

function category(code, type, title) {
  if (/lab/i.test(title) || /^B[A-Z]+L\d/.test(code) || /\d{3}L$/.test(code)) return "lab";
  if (/\b(mini project|project phase|major project|project work|internship|technical seminar)\b/i.test(title) || type === "PROJ" || type === "INT") return "project";
  if (type === "PEC") return "professional-elective";
  if (type === "OEC") return "open-elective";
  if (type === "AEC" || type === "SEC" || /ability enhancement/i.test(title)) return "ability";
  if (type === "UHV" || /K\d{3}[A-Z]?$/.test(code)) return "common";
  return "core";
}

function normalise(parsed, { firstYear }) {
  const byCode = new Map();
  for (const raw of parsed) {
    const c = { ...raw, code: FIXES.codes[raw.code] ?? raw.code };
    if (/^BXX/.test(c.code) || NON_CREDIT.test(c.code) || /x$/.test(c.code)) continue;
    const semester = semesterFromCode(c.code);
    if (!semester || (firstYear ? semester > 2 : semester < 3)) continue;
    const title = cleanTitle(c.code, c.title);
    if (!title || JUNK_TITLE.test(title) || title.length < 3) continue;
    const prev = byCode.get(c.code);
    if (prev && prev.title.length >= title.length && prev.credits != null) continue;
    byCode.set(c.code, {
      code: c.code,
      title,
      semester,
      credits: c.credits ?? prev?.credits ?? null,
      type: c.type ?? prev?.type ?? null,
      category: c.elective ? (c.group && /6\d\dx|7\d\dx|8\d\dx|5\d\dx/.test(c.group) ? category(c.code, c.type, title) : "elective") : category(c.code, c.type, title),
      elective: c.elective,
      group: c.group ? c.group.replace(/^B[A-Z]+/, "") : null,
    });
  }
  return [...byCode.values()].sort((a, b) => a.semester - b.semester || a.code.localeCompare(b.code));
}

/** A programme VTU adds that is not in programs.mjs: infer its stream from its own course codes. */
function streamFromCodes(courses) {
  const PREFIX = { cs: /^B(CS|IS|AI|AD|DS|CI|CD|CY|CG|CB|CO|IC|CE)\d/, ee: /^B(EC|EE|EI|ET|ML|BM|VL|IO|UE)\d/, me: /^B(ME|AE|AS|AU|AG|CH|IP|IM|MR|MT|RA|RI|ST|TX)\d/, cv: /^B(CV|EV|CT|MI)\d/ };
  const votes = Object.fromEntries(Object.keys(PREFIX).map((k) => [k, 0]));
  for (const c of courses) for (const [k, re] of Object.entries(PREFIX)) if (re.test(c.code)) votes[k]++;
  const [best, n] = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
  return n >= 3 ? best : null;
}

/** "Electronics Communication (Advanced Communication Technology)" → "EC (ACT)". */
function shortLabel(name) {
  const initials = (s) =>
    s
      .split(/\s+/)
      .filter((w) => /^[A-Z]/.test(w) && !/^(And|Of|The|In|For|Engineering)$/i.test(w))
      .map((w) => w[0])
      .join("");
  const m = /^(.*?)\s*\((.*)\)\s*$/.exec(name);
  return m ? `${initials(m[1])} (${initials(m[2])})` : initials(name) || name.slice(0, 12);
}

function check(slug, courses, sems) {
  for (const s of sems) {
    const core = courses.filter((c) => c.semester === s && !c.elective);
    if (core.length < 3) throw new Error(`${slug}: only ${core.length} core courses parsed for semester ${s} — PDF layout changed?`);
  }
}

const streams = {};
for (const [key, s] of Object.entries(STREAMS)) {
  const { file, sha256 } = await download(s.url);
  const courses = normalise(await parseScheme(file), { firstYear: true });
  check(`stream ${key}`, courses, [1, 2]);
  streams[key] = { name: s.name, sources: [{ url: s.url, sha256 }], courses };
  console.log(`stream ${key}: ${courses.length} courses`);
}

const programs = [];
const skipped = [];
const seenSlugs = new Set();
for (const row of await discoverPrograms()) {
  const official = matchProgram(row.name);
  let slug = official?.slug ?? slugify(row.name);
  if (seenSlugs.has(slug)) {
    skipped.push(`${row.name}: duplicate row for ${slug}`);
    continue;
  }
  const sources = [];
  const parsed = [];
  try {
    for (const url of row.schemes) {
      try {
        const { file, sha256 } = await download(url);
        sources.push({ url, sha256 });
        parsed.push(...(await parseScheme(file)));
      } catch (e) {
        // One dead link on VTU's page (it happens) should not drop the whole programme.
        skipped.push(`${row.name}: ${e.message}`);
      }
    }
    const courses = normalise(parsed, { firstYear: false });
    const sems = [...new Set(courses.filter((c) => !c.elective).map((c) => c.semester))];
    // Programmes whose scheme PDFs only cover some semesters are kept with what exists,
    // but a scheme that yields almost nothing is a parse failure, not data.
    if (courses.filter((c) => !c.elective).length < 8) throw new Error(`only ${courses.length} courses parsed`);
    check(slug, courses, sems.filter((s) => s >= 3 && s <= 7));
    seenSlugs.add(slug);
    programs.push({
      slug,
      name: official?.name ?? row.name,
      printedName: row.name,
      code: official?.code ?? null,
      short: official?.short ?? shortLabel(row.name),
      stream: official?.stream ?? streamFromCodes(courses),
      sources,
      syllabi: row.syllabi,
      semesters: sems.sort((a, b) => a - b),
      courses,
    });
    console.log(`${slug}: ${courses.length} courses, sems ${sems.join(",")}${official ? "" : "  (not in official stream list)"}`);
  } catch (e) {
    skipped.push(`${row.name}: ${e.message}`);
  }
}
for (const s of skipped) console.warn(`skipped — ${s}`);
// The programmes the site already links to must always sync; anything else is best-effort.
for (const required of ["cse", "ise", "ece", "eee", "me", "cv"]) {
  if (!programs.some((p) => p.slug === required)) throw new Error(`required programme ${required} did not sync`);
}

// The same common course (e.g. BENGK106) appears in several stream PDFs; when one PDF's
// credits cell did not parse, take the value another official PDF gives for that code.
const creditsByCode = new Map();
for (const list of [...Object.values(streams).map((s) => s.courses), ...programs.map((p) => p.courses)]) {
  for (const c of list) if (c.credits != null && !creditsByCode.has(c.code)) creditsByCode.set(c.code, c.credits);
}
for (const list of [...Object.values(streams).map((s) => s.courses), ...programs.map((p) => p.courses)]) {
  for (const c of list) if (c.credits == null) c.credits = creditsByCode.get(c.code) ?? null;
}

const next =
  JSON.stringify({ scheme: "2022", source: "https://vtu.ac.in/en/b-e-scheme-syllabus/", streams, programs }, null, 2) + "\n";
const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
if (prev === next) console.log("courses: unchanged");
else {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, next);
  console.log("courses: written");
}
