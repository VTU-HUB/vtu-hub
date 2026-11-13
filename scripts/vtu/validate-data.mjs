#!/usr/bin/env node
// Validates the generated academic data (src/data/vtu/courses.json, syllabus.json) and
// the notes folder. Errors are things a student would see as wrong (a broken title, a
// course in the wrong semester, notes that never show); they fail CI. Warnings are known
// gaps in VTU's PDFs or our parser (missing credits, titles printed two ways) that need a
// human to check the PDF; they are reported but do not fail.
//
// Usage: node scripts/vtu/validate-data.mjs [--verbose]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const CODE_RE = /^B[A-Z]{2,6}\d{3}[A-Z]?$/;
/** Semester digit inside a code: BCS301 -> 3, BMATS101 -> 1. */
export const codeSemester = (code) => Number(/^B[A-Z]+?(\d)\d{2}[A-Z]?$/.exec(code)?.[1] ?? NaN);

const DANGLING = /(\s(and|of|for|to|in|the|with|on|or)|[,:;&–-])$/i;
const NUMBER_RUN = /(^|\s)\d{1,3}(\s\d{1,3}){2,}(\s|$)/;
/** Words from the legend and notes printed under the scheme tables. */
const LEGEND_TEXT = /\b(Refers to|Credit for|Teaching[–-]Learning hours?|Note:)/i;
const PLACEHOLDER =/^(to be announced|bos will publish|shall have|-+$)/i;

/**
 * @param {{ streams: Record<string, {courses: any[]}>, programs: any[] }} courses
 * @param {{ syllabus?: Record<string, any>, notesCodes?: string[] }} [extra]
 * @returns {{ errors: string[], warnings: string[], stats: Record<string, number> }}
 */
export function validate(courses, { syllabus = {}, notesCodes = [] } = {}) {
  const errors = [];
  const warnings = [];
  const lists = [
    ...Object.entries(courses.streams ?? {}).map(([k, s]) => [`stream ${k}`, s.courses ?? []]),
    ...(courses.programs ?? []).map((p) => [p.slug, p.courses ?? []]),
  ];
  const streamKeys = new Set(Object.keys(courses.streams ?? {}));
  const byCode = new Map();

  for (const p of courses.programs ?? []) {
    if (!p.slug || !p.name) errors.push(`programme without slug or name: ${JSON.stringify(p).slice(0, 80)}`);
    if (p.stream && !streamKeys.has(p.stream)) errors.push(`${p.slug}: unknown stream "${p.stream}"`);
    if (!p.sources?.length) errors.push(`${p.slug}: no source PDF recorded`);
  }

  for (const [where, list] of lists) {
    const seen = new Set();
    for (const c of list) {
      const id = `${where} ${c.code ?? "?"}`;
      if (!c.code || !CODE_RE.test(c.code)) errors.push(`${id}: malformed course code`);
      const t = (c.title ?? "").trim();
      if (t.length < 3) errors.push(`${id}: missing title`);
      else {
        if (PLACEHOLDER.test(t)) errors.push(`${id}: placeholder title "${t}"`);
        if (NUMBER_RUN.test(t)) errors.push(`${id}: table cells in title "${t}"`);
        if (DANGLING.test(t)) errors.push(`${id}: title ends mid-phrase "${t}"`);
        if (LEGEND_TEXT.test(t) || t.length > 120) errors.push(`${id}: table legend or notes in title "${t.slice(0, 90)}…"`);
        // "BESCK104" + "C Introduction to …": the option letter was split off the code.
        if (/\d$/.test(c.code ?? "") && /^[A-Z]\s/.test(t)) errors.push(`${id}: option letter split from the code "${t}"`);
        if (/\b([A-Za-z]{2,})\s+\1\b/i.test(t)) warnings.push(`${id}: repeated word in title "${t}"`);
      }
      if (!(c.semester >= 1 && c.semester <= 8)) errors.push(`${id}: semester ${c.semester} outside 1-8`);
      else if (c.code && codeSemester(c.code) !== c.semester) errors.push(`${id}: semester ${c.semester} but code says ${codeSemester(c.code)}`);
      if (c.credits == null) warnings.push(`${id}: no credits parsed`);
      else if (!Number.isInteger(c.credits) || c.credits < 0 || c.credits > 20) errors.push(`${id}: credits ${c.credits} out of range`);
      const key = `${c.semester}/${c.code}`;
      if (seen.has(key)) errors.push(`${id}: listed twice in semester ${c.semester}`);
      seen.add(key);
      if (c.code) (byCode.get(c.code) ?? byCode.set(c.code, []).get(c.code)).push({ where, c });
    }
  }

  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  for (const [code, rows] of byCode) {
    const titles = [...new Set(rows.map((r) => r.c.title))];
    if (new Set(titles.map(norm)).size > 1) warnings.push(`${code}: printed with ${titles.length} titles: ${titles.join(" | ")}`);
    const credits = [...new Set(rows.map((r) => r.c.credits).filter((x) => x != null))];
    if (credits.length > 1) warnings.push(`${code}: credits differ between PDFs: ${credits.join(" / ")}`);
  }

  for (const code of notesCodes) {
    if (!byCode.has(code)) errors.push(`notes ${code}.md: no course with this code, so the notes never show`);
  }
  let withModules = 0;
  for (const code of byCode.keys()) {
    const mods = syllabus[code]?.modules ?? [];
    if (mods.length >= 3) withModules++;
    for (const m of mods) {
      if (!m.title || m.title.trim().length < 3) warnings.push(`${code} module ${m.number}: placeholder module title "${m.title}"`);
    }
  }

  return {
    errors,
    warnings,
    stats: {
      programmes: (courses.programs ?? []).length,
      records: lists.reduce((n, [, l]) => n + l.length, 0),
      codes: byCode.size,
      withCredits: [...byCode.values()].filter((rows) => rows.some((r) => r.c.credits != null)).length,
      withModules,
      notes: notesCodes.length,
    },
  };
}

// CLI
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const read = (p) => JSON.parse(fs.readFileSync(path.resolve(p), "utf8"));
  const courses = read("src/data/vtu/courses.json");
  const syllabus = read("src/data/vtu/syllabus.json").courses ?? {};
  const notesCodes = fs
    .readdirSync(path.resolve("src/data/notes"))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, "").toUpperCase());
  const { errors, warnings, stats } = validate(courses, { syllabus, notesCodes });
  const verbose = process.argv.includes("--verbose");
  console.log(
    `Academic data: ${stats.programmes} programmes · ${stats.records} course records · ${stats.codes} codes · ` +
      `${stats.withCredits} with credits · ${stats.withModules} with syllabus modules · ${stats.notes} notes files`,
  );
  const show = (label, list) => {
    console.log(`\n${label}: ${list.length}`);
    for (const m of verbose ? list : list.slice(0, 15)) console.log(`  - ${m}`);
    if (!verbose && list.length > 15) console.log(`  … ${list.length - 15} more (use --verbose)`);
  };
  show("WARN (check against the official PDF)", warnings);
  show("ERROR", errors);
  if (errors.length) {
    console.log("\nFix the parser in scripts/vtu/ or add the printed value to scripts/vtu/title-fixes.json, then re-run the sync.");
    process.exit(1);
  }
  console.log("\n✓ No errors");
}
