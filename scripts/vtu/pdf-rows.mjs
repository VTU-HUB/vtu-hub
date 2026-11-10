// Reads a PDF with pdfjs and groups text items into visual rows by y-coordinate.
import fs from "node:fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

/** @returns {Promise<{page:number, rows:{y:number, items:{x:number, w:number, s:string}[]}[]}[]>} */
export async function pdfRows(file, tolerance = 2.5) {
  const data = new Uint8Array(fs.readFileSync(file));
  const doc = await getDocument({ data, verbosity: 0, isEvalSupported: false }).promise;
  const pages = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const { items } = await page.getTextContent();
    const rows = [];
    for (const it of items) {
      const s = it.str.trim();
      if (!s) continue;
      const x = it.transform[4];
      const y = it.transform[5];
      let row = rows.find((r) => Math.abs(r.y - y) <= tolerance);
      if (!row) rows.push((row = { y, items: [] }));
      row.items.push({ x, w: it.width, s });
    }
    rows.sort((a, b) => b.y - a.y);
    for (const r of rows) r.items.sort((a, b) => a.x - b.x);
    pages.push({ page: p, rows });
  }
  return pages;
}
