#!/usr/bin/env node
// Saves a parser regression fixture: the text rows of a few pages of an official VTU PDF
// (positions and strings only, no PDF) plus what the parser reads from them today.
// tests/parsers.test.ts re-parses the rows and fails if the output changes.
//
// Usage: node scripts/vtu/capture-fixture.mjs <scheme|syllabus> <pdf url> <pages, e.g. 2,3> <name> "<why>"
// After a deliberate parser improvement, re-capture the fixture and review the diff.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pdfRows } from "./pdf-rows.mjs";
import { parseSchemeRows } from "./parse-scheme.mjs";
import { parseSyllabusRows } from "./parse-syllabus.mjs";
import { fetchRetry } from "./net.mjs";

const [kind, url, pageList, name, why] = process.argv.slice(2);
if (!["scheme", "syllabus"].includes(kind) || !url || !pageList || !name) {
  console.error('Usage: node scripts/vtu/capture-fixture.mjs <scheme|syllabus> <pdf url> <pages> <name> "<why>"');
  process.exit(1);
}
const cacheDir = path.join(os.tmpdir(), kind === "scheme" ? "vtuhub-scheme-pdfs" : "vtuhub-syllabus-pdfs");
const file = path.join(cacheDir, path.basename(new URL(url).pathname));
if (!fs.existsSync(file)) {
  const res = await fetchRetry(url);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}
const wanted = new Set(pageList.split(",").map(Number));
const round = (n) => Math.round(n * 100) / 100;
const pages = (await pdfRows(file))
  .filter((p) => wanted.has(p.page))
  .map((p) => ({ page: p.page, rows: p.rows.map((r) => ({ y: round(r.y), items: r.items.map((i) => ({ x: round(i.x), w: round(i.w), s: i.s })) })) }));
const expected = kind === "scheme" ? parseSchemeRows(pages) : Object.fromEntries(parseSyllabusRows(pages));
const out = path.resolve("tests/fixtures/vtu", `${name}.json`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify({ kind, source: url, pages: [...wanted], why: why ?? "", expected, rows: pages }) + "\n");
console.log(`wrote ${path.relative(process.cwd(), out)} (${kind === "scheme" ? expected.length : Object.keys(expected).length} courses)`);
