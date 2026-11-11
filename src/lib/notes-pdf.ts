import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { NotesBlock } from "./notes-doc.ts";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 50;
const BOTTOM = 52;

const INK = rgb(0.12, 0.14, 0.18);
const MUTED = rgb(0.38, 0.4, 0.45);

// Maths and logic symbols used in the notes, spelled out so they survive the
// ASCII-only standard fonts instead of silently disappearing.
const SYMBOLS: Record<string, string> = {
  "\u2192": "->", "\u2190": "<-", "\u21d2": "=>", "\u21d4": "<=>", "\u2194": "<->", "\u22a2": "|-",
  "\u2264": "<=", "\u2265": ">=", "\u2260": "!=", "\u2248": "~", "\u00d7": "x", "\u00f7": "/", "\u00b7": ".", "\u2212": "-", "\u00b1": "+/-",
  "\u2295": " XOR ", "\u2032": "'", "\u221e": "infinity", "\u221a": "sqrt",
  "\u2208": " in ", "\u2209": " not in ", "\u2286": " subset of ", "\u2282": " proper subset of ", "\u222a": " U ", "\u22c3": " U ", "\u2229": " n ", "\u2205": "{}",
  "\u03b5": "eps", "\u03a3": "Sigma", "\u03c3": "sigma", "\u03b4": "delta", "\u0394": "Delta", "\u03b3": "gamma", "\u0393": "Gamma", "\u03b1": "alpha",
  "\u03b2": "beta", "\u03bb": "lambda", "\u03bc": "mu", "\u03c0": "pi", "\u03b8": "theta", "\u03a0": "Pi",
  "\u0302": "^",
};
const SUPER: Record<string, string> = { "\u2070": "0", "\u00b9": "1", "\u00b2": "2", "\u00b3": "3", "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7", "\u2078": "8", "\u2079": "9", "\u207f": "n", "\u1d4f": "k", "\u2071": "i", "\u02b2": "j", "\u1d50": "m", "\u207a": "+", "\u207b": "-", "\u207d": "(", "\u207e": ")" };
const SUB: Record<string, string> = { "\u2080": "0", "\u2081": "1", "\u2082": "2", "\u2083": "3", "\u2084": "4", "\u2085": "5", "\u2086": "6", "\u2087": "7", "\u2088": "8", "\u2089": "9", "\u1d62": "i", "\u2c7c": "j", "\u2096": "k", "\u2099": "n", "\u2098": "m", "\u2093": "x", "\u208a": "+", "\u208b": "-" };

/** Standard PDF fonts only encode WinAnsi. Fold everything else into plain text. */
export function pdfText(value: string) {
  return value
    .replace(/[\u2070\u00b9\u00b2\u00b3\u2074-\u2079\u207f\u1d4f\u2071\u02b2\u1d50\u207a\u207b\u207d\u207e]+/g, (m) => "^" + [...m].map((c) => SUPER[c] ?? "").join(""))
    .replace(/[\u2080-\u2089\u1d62\u2c7c\u2096\u2099\u2098\u2093\u208a\u208b]+/g, (m) => [...m].map((c) => SUB[c] ?? "").join(""))
    .replace(/[^\x20-\x7e\n]/g, (c) => SYMBOLS[c] ?? c)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00a0/g, " ")
    .replace(/[•●▪◦]/g, "-")
    .replace(/[^\n\x20-\x7e]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = pdfText(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  const pushLong = (word: string) => {
    let rest = word;
    while (rest) {
      let take = rest.length;
      while (take > 1 && font.widthOfTextAtSize(rest.slice(0, take), size) > maxWidth) take -= 1;
      lines.push(rest.slice(0, take));
      rest = rest.slice(take);
    }
  };
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(trial, size) <= maxWidth) {
      line = trial;
      continue;
    }
    if (line) lines.push(line);
    if (font.widthOfTextAtSize(word, size) > maxWidth) {
      pushLong(word);
      line = "";
    } else {
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

export async function renderNotesPdf(
  blocks: NotesBlock[],
  meta: { title: string; code: string; name: string },
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(pdfText(meta.title));
  doc.setAuthor("VTUHub");
  doc.setSubject("Original revision notes from the official VTU syllabus and the prescribed textbooks");
  doc.setCreator("VTUHub");
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page: PDFPage = doc.addPage([PAGE_W, PAGE_H]);
  let pageNum = 1;
  let y = PAGE_H - MARGIN;
  const footers: PDFPage[] = [];

  const footer = () => {
    if (footers.includes(page)) return;
    footers.push(page);
    const label = pdfText(`VTUHub original notes · ${meta.code} · ${pageNum}`);
    page.drawText(label, { x: MARGIN, y: 32, size: 8, font: regular, color: MUTED });
  };

  const nextPage = () => {
    footer();
    page = doc.addPage([PAGE_W, PAGE_H]);
    pageNum += 1;
    y = PAGE_H - MARGIN;
    const running = pdfText(`${meta.code} ${meta.name}`);
    page.drawText(running, { x: MARGIN, y: y - 9, size: 9, font: regular, color: MUTED });
    y -= 22;
  };

  const ensure = (height: number) => {
    if (y - height < BOTTOM) nextPage();
  };

  const write = (text: string, size: number, font: PDFFont, indent: number, color = INK) => {
    const lines = wrap(text, font, size, PAGE_W - MARGIN * 2 - indent);
    const leading = size + 4;
    for (const line of lines) {
      ensure(leading);
      page.drawText(line, { x: MARGIN + indent, y: y - size, size, font, color });
      y -= leading;
    }
  };

  for (const block of blocks) {
    if (block.kind === "h1") {
      y -= 4;
      write(block.text, 18, bold, 0);
      y -= 6;
    } else if (block.kind === "h2") {
      y -= 12;
      write(block.text, 13, bold, 0);
      y -= 4;
    } else if (block.kind === "h3") {
      y -= 8;
      write(block.text, 11, bold, 0);
      y -= 2;
    } else if (block.kind === "li") {
      y -= 1;
      write(`- ${block.text}`, 10, regular, 12);
      y -= 1;
    } else {
      y -= 2;
      write(block.text, 10, regular, 0);
      y -= 3;
    }
  }

  footer();
  return doc.save();
}
