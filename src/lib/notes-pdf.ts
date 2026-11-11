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
  "\u0302": "-hat", "\u0304": "-bar", "\u00d8": "(none)",
  "\u0398": "Theta", "\u03a9": "Omega", "\u03c9": "omega", "\u03c1": "rho", "\u03c4": "tau", "\u03c6": "phi", "\u03a6": "Phi", "\u03c8": "psi",
  "\u03bd": "nu", "\u222b": "integral ", "\u2202": "d", "\u2207": "grad ",
  "\u03b7": "eta", "\u03ba": "kappa", "\u03c7": "chi", "\u2131": "F",
  "\u230a": "floor(", "\u230b": ")", "\u2308": "ceil(", "\u2309": ")", "\u27e8": "<", "\u27e9": ">",
  "\u22c8": " JOIN ", "\u2287": " superset of ", "\u2283": " proper superset of ", "\u2200": "for all ", "\u2203": "there exists ",
  "\u00ac": "NOT ", "\u2227": " AND ", "\u2228": " OR ", "\u2211": "Sum", "\u220f": "Product", "\u2261": "==", "\u221d": " proportional to ",
  "\u2713": "yes", "\u2717": "no", "\u00b0": " deg",
};
const SUPER: Record<string, string> = { "\u1d3f": "R", "\u1d40": "T", "\u1d57": "t", "\u1d9c": "c", "\u1d56": "p", "\u02e3": "x", "\u02b8": "y", "\u2070": "0", "\u00b9": "1", "\u00b2": "2", "\u00b3": "3", "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7", "\u2078": "8", "\u2079": "9", "\u207f": "n", "\u1d4f": "k", "\u2071": "i", "\u02b2": "j", "\u1d50": "m", "\u207a": "+", "\u207b": "-", "\u207d": "(", "\u207e": ")" };
const SUB: Record<string, string> = { "\u2080": "0", "\u2081": "1", "\u2082": "2", "\u2083": "3", "\u2084": "4", "\u2085": "5", "\u2086": "6", "\u2087": "7", "\u2088": "8", "\u2089": "9", "\u1d62": "i", "\u2c7c": "j", "\u2096": "k", "\u2099": "n", "\u2098": "m", "\u2093": "x", "\u208a": "+", "\u208b": "-", "\u2097": "l", "\u1d63": "r", "\u2090": "a", "\u2091": "e", "\u2092": "o", "\u209a": "p", "\u209b": "s", "\u209c": "t", "\u1d67": "y", "\u1d65": "v" };
const charClass = (map: Record<string, string>) => new RegExp(`[${Object.keys(map).join("")}]+`, "gu");
const SUPER_RE = charClass(SUPER);
const SUB_RE = charClass(SUB);

/** Characters in `text` that pdfText would silently drop (tests use it to guard the notes). */
export function droppedGlyphs(text: string) {
  return [...new Set(text)].filter(
    (ch) => ch.codePointAt(0)! > 0x7e && ch !== "\n" && ch !== "\r" && pdfText(`a${ch}a`).replace(/\s/g, "") === "aa",
  );
}

/** Standard PDF fonts only encode WinAnsi. Fold everything else into plain text. */
export function pdfText(value: string) {
  return value
    // Split accented letters (ï, ȳ, ŷ) into letter + mark, so the letter survives and
    // bar/hat marks become "-bar" / "-hat"; other accents are then dropped.
    .normalize("NFD")
    .replace(SUPER_RE, (m) => "^" + [...m].map((c) => SUPER[c] ?? "").join(""))
    .replace(SUB_RE, (m) => [...m].map((c) => SUB[c] ?? "").join(""))
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

  const mono = await doc.embedFont(StandardFonts.Courier);
  const CODE_BG = rgb(0.95, 0.96, 0.97);
  const BOX_BG = rgb(0.93, 0.96, 1);
  const ACCENT = rgb(0.15, 0.39, 0.92);

  // Code: monospace, indentation kept, long lines wrapped by width, on a grey band.
  const writeCode = (text: string) => {
    const size = 8.5;
    const leading = size + 3.5;
    const indent = text.match(/^ */)![0].length;
    const body = pdfText(text.trimStart()) || " ";
    const max = PAGE_W - MARGIN * 2 - 16;
    const chunks: string[] = [];
    let rest = " ".repeat(indent) + body;
    while (rest.length) {
      let take = rest.length;
      while (take > 1 && mono.widthOfTextAtSize(rest.slice(0, take), size) > max) take -= 1;
      chunks.push(rest.slice(0, take));
      rest = rest.slice(take) ? "  " + rest.slice(take) : "";
    }
    for (const chunk of chunks) {
      ensure(leading);
      page.drawRectangle({ x: MARGIN, y: y - leading + 1, width: PAGE_W - MARGIN * 2, height: leading, color: CODE_BG });
      page.drawText(chunk, { x: MARGIN + 8, y: y - size - 1, size, font: mono, color: INK });
      y -= leading;
    }
  };

  // Callout ("In short") box: tinted band with an accent bar on the left.
  const writeBox = (text: string) => {
    const size = 10;
    const leading = size + 4;
    const lines = wrap(text, regular, size, PAGE_W - MARGIN * 2 - 22);
    y -= 4;
    for (const [i, line] of lines.entries()) {
      ensure(leading);
      const top = i === 0 ? 4 : 0;
      const bottom = i === lines.length - 1 ? 4 : 0;
      page.drawRectangle({ x: MARGIN, y: y - leading - bottom, width: PAGE_W - MARGIN * 2, height: leading + top + bottom, color: BOX_BG });
      page.drawRectangle({ x: MARGIN, y: y - leading - bottom, width: 3, height: leading + top + bottom, color: ACCENT });
      page.drawText(line, { x: MARGIN + 12, y: y - size - top, size, font: i === 0 ? bold : regular, color: INK });
      y -= leading;
    }
    y -= 8;
  };

  let prev: NotesBlock["kind"] | null = null;
  for (const block of blocks) {
    if (prev === "code" && block.kind !== "code") y -= 6;
    if (block.kind === "code" && prev !== "code") y -= 4;
    prev = block.kind;
    if (block.kind === "code") {
      writeCode(block.text);
    } else if (block.kind === "quote") {
      writeBox(block.text);
    } else if (block.kind === "flow") {
      y -= 2;
      write(block.text.split(/\s*->\s*/).map((s) => `[ ${s} ]`).join("  ->  "), 9.5, bold, 8, ACCENT);
      y -= 2;
    } else if (block.kind === "row") {
      write(block.text, 9.5, regular, 8);
      page.drawLine({ start: { x: MARGIN + 8, y: y + 1 }, end: { x: PAGE_W - MARGIN, y: y + 1 }, thickness: 0.4, color: MUTED });
      y -= 3;
    } else if (block.kind === "h1") {
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
      write(block.ordered ? block.text : `- ${block.text}`, 10, regular, 12 + (block.depth ?? 0) * 14);
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
