#!/usr/bin/env node
// Academic exception register: every known gap or conflict in the course data, with the
// PDF it came from and room for a human to record what VTU actually prints.
//
// Detected automatically (re-run after every sync): missing credits, a code printed with
// different titles, a code with different credits, and placeholder module titles.
// Kept by hand in scripts/vtu/exceptions.json for each item: `expected` (the value printed
// in the official PDF), `resolution`, `reviewer`, `verifiedOn` and `note`. Those fields
// survive re-runs. Nothing here changes the data the site shows: a resolved value goes
// into scripts/vtu/title-fixes.json or a parser fix, then the sync is re-run.
//
// Usage: node scripts/vtu/exceptions.mjs [--check]
//   --check  exit 1 when a detected issue is not in the register (used by CI)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const RESOLUTIONS = ["open", "confirmed-in-source", "parser-fix", "title-fix", "not-in-source", "non-credit"];
const HUMAN = ["expected", "resolution", "reviewer", "verifiedOn", "note"];

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/**
 * @param {{ streams: Record<string, {courses: any[]}>, programs: any[] }} courses
 * @param {Record<string, any>} syllabus
 * @returns {Record<string, any>} detected items keyed "<kind>:<code>[:<extra>]"
 */
export function detectExceptions(courses, syllabus = {}) {
  const sourcesOf = new Map();
  const rows = [];
  for (const [k, s] of Object.entries(courses.streams ?? {})) {
    for (const c of s.courses ?? []) rows.push({ where: `first-year ${k} stream`, sources: s.url ? [s.url] : [], c });
  }
  for (const p of courses.programs ?? []) {
    sourcesOf.set(p.slug, (p.sources ?? []).map((s) => s.url ?? s));
    for (const c of p.courses ?? []) rows.push({ where: p.slug, sources: sourcesOf.get(p.slug), c });
  }
  const byCode = new Map();
  for (const r of rows) (byCode.get(r.c.code) ?? byCode.set(r.c.code, []).get(r.c.code)).push(r);

  const items = {};
  const uniq = (a) => [...new Set(a)].sort();
  for (const [code, list] of byCode) {
    const semester = list[0].c.semester;
    const missing = list.filter((r) => r.c.credits == null);
    if (missing.length === list.length) {
      // An option code (BPLCK205A) usually shares the credits printed once for its slot.
      const option = /\d[A-Z]$/.test(code);
      items[`missing-credits:${code}`] = {
        kind: "missing-credits",
        code,
        semester,
        title: list[0].c.title,
        programmes: uniq(missing.map((r) => r.where)),
        sources: uniq(missing.flatMap((r) => r.sources)),
        parsed: null,
        evidence: option
          ? "Elective option: the scheme prints credits once for the elective slot, not per option."
          : "No credit value read from any PDF that lists this code.",
      };
    }
    const titles = uniq(list.map((r) => r.c.title));
    if (new Set(titles.map(norm)).size > 1) {
      items[`title-variants:${code}`] = {
        kind: "title-variants",
        code,
        semester,
        parsed: titles.map((t) => ({ value: t, programmes: uniq(list.filter((r) => r.c.title === t).map((r) => r.where)) })),
        sources: uniq(list.flatMap((r) => r.sources)),
        evidence: "Different PDFs print different wording; check whether it is one course or a parser problem.",
      };
    }
    const credits = uniq(list.map((r) => r.c.credits).filter((x) => x != null));
    if (credits.length > 1) {
      items[`credit-conflict:${code}`] = {
        kind: "credit-conflict",
        code,
        semester,
        title: list[0].c.title,
        parsed: credits.map((v) => ({
          value: v,
          programmes: uniq(list.filter((r) => r.c.credits === v).map((r) => r.where)),
          sources: uniq(list.filter((r) => r.c.credits === v).flatMap((r) => r.sources)),
        })),
        evidence: "Programmes' scheme PDFs print different credits for the same code.",
      };
    }
  }
  for (const [code, s] of Object.entries(syllabus)) {
    if (!byCode.has(code)) continue;
    for (const m of s.modules ?? []) {
      if (m.title && m.title.trim().length >= 3) continue;
      items[`placeholder-module:${code}:${m.number}`] = {
        kind: "placeholder-module",
        code,
        semester: byCode.get(code)[0].c.semester,
        parsed: m.title ?? "",
        sources: s.sources ?? [s.source],
        evidence: `Module ${m.number} has no readable title in the syllabus PDF.`,
      };
    }
  }
  return items;
}

/** Merges fresh detections with the register, keeping the human-reviewed fields. */
export function mergeRegister(register, detected) {
  const items = {};
  const gone = [];
  for (const [key, d] of Object.entries(detected).sort(([a], [b]) => a.localeCompare(b))) {
    const old = register[key] ?? {};
    items[key] = { ...d };
    for (const f of HUMAN) items[key][f] = old[f] ?? (f === "resolution" ? "open" : null);
  }
  for (const key of Object.keys(register)) if (!(key in detected)) gone.push(key);
  return { items, gone };
}

export function summarise(items) {
  const byKind = {};
  for (const it of Object.values(items)) {
    const k = (byKind[it.kind] ??= { total: 0, open: 0 });
    k.total++;
    if (it.resolution === "open") k.open++;
  }
  return byKind;
}

function markdown(items) {
  const kinds = summarise(items);
  const out = [
    "# Academic exception register",
    "",
    "Generated by `node scripts/vtu/exceptions.mjs` from `scripts/vtu/exceptions.json`. Do not edit this file; edit the",
    "`expected`, `resolution`, `reviewer`, `verifiedOn` and `note` fields in the JSON after checking the official PDF.",
    "",
    "| Kind | Items | Open |",
    "| --- | ---: | ---: |",
    ...Object.entries(kinds).map(([k, v]) => `| ${k} | ${v.total} | ${v.open} |`),
    "",
    "Resolutions: " + RESOLUTIONS.map((r) => `\`${r}\``).join(", ") + ".",
  ];
  const cell = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\s+/g, " ");
  const pdfs = (list) => (list ?? []).map((u) => `[${path.basename(u)}](${u})`).join(" ");
  for (const kind of Object.keys(kinds)) {
    out.push("", `## ${kind}`, "", "| Code | Sem | Parsed | Programmes / PDFs | Expected | Resolution | Reviewer | Verified |", "| --- | ---: | --- | --- | --- | --- | --- | --- |");
    for (const it of Object.values(items).filter((i) => i.kind === kind)) {
      const parsed = Array.isArray(it.parsed)
        ? it.parsed.map((p) => `${p.value} (${p.programmes.length})`).join(" / ")
        : it.parsed ?? `${it.title ?? ""} — none`;
      const where = it.programmes ? `${it.programmes.join(", ")} · ${pdfs(it.sources)}` : pdfs(it.sources);
      out.push(`| ${it.code} | ${it.semester} | ${cell(parsed)} | ${cell(where)} | ${cell(it.expected)} | ${it.resolution} | ${cell(it.reviewer)} | ${cell(it.verifiedOn)} |`);
    }
  }
  return out.join("\n") + "\n";
}

// CLI
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const read = (p) => JSON.parse(fs.readFileSync(path.resolve(p), "utf8"));
  const REG = path.resolve("scripts/vtu/exceptions.json");
  const register = fs.existsSync(REG) ? read(REG).items ?? {} : {};
  const detected = detectExceptions(read("src/data/vtu/courses.json"), read("src/data/vtu/syllabus.json").courses ?? {});
  const missing = Object.keys(detected).filter((k) => !(k in register));
  if (process.argv.includes("--check")) {
    if (missing.length) {
      console.error(`${missing.length} data issue(s) not in the exception register:\n  ${missing.slice(0, 20).join("\n  ")}`);
      console.error("Run: node scripts/vtu/exceptions.mjs   (then review the new items)");
      process.exit(1);
    }
    console.log(`✓ Exception register covers all ${Object.keys(detected).length} detected issues`);
  } else {
    const { items, gone } = mergeRegister(register, detected);
    const doc = {
      $about: "Known gaps and conflicts in VTUHub's course data. Regenerate with node scripts/vtu/exceptions.mjs; edit only expected/resolution/reviewer/verifiedOn/note.",
      items,
    };
    fs.writeFileSync(REG, JSON.stringify(doc, null, 2) + "\n");
    fs.writeFileSync(path.resolve("docs/ACADEMIC_EXCEPTIONS.md"), markdown(items));
    for (const [k, v] of Object.entries(summarise(items))) console.log(`  ${k}: ${v.total} (${v.open} open)`);
    if (missing.length) console.log(`  ${missing.length} new item(s) added as open`);
    if (gone.length) console.log(`  ${gone.length} item(s) no longer detected and removed:\n    ${gone.join("\n    ")}`);
  }
}
