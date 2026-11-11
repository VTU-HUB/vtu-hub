/**
 * Revision notes for one subject. The text is original. It follows the module
 * lines VTU prints and names the textbooks VTU prescribes. It does not copy
 * those books.
 */

export type NotesUnit = { number: number; title: string; topics: string };

export type NotesInput = {
  filename: string;
  code: string;
  name: string;
  programme: string;
  semester: string;
  scheme: string;
  credits: number | null;
  description: string;
  textbooks: string[];
  references: string[];
  outcomes: string[];
  units: NotesUnit[];
  /** Raw Markdown of the hand-written notes, when the course has them. */
  notesMarkdown?: string;
  /** When set, the PDF holds only this module (1-based), not the whole course. */
  module?: number;
};

/** The "## Module N" section of the notes Markdown, heading included, or "" if absent. */
export function moduleMarkdown(md: string, n: number): string {
  const lines = md.split(/\r?\n/);
  const head = new RegExp(`^##\\s+Module\\s+${n}\\b`, "i");
  const start = lines.findIndex((l) => head.test(l));
  if (start < 0) return "";
  let end = lines.findIndex((l, i) => i > start && /^##\s/.test(l));
  if (end < 0) end = lines.length;
  return lines.slice(start, end).join("\n").trim();
}

export function moduleFilename(code: string, slug: string, n: number) {
  return notesFilename(code, slug).replace(/-notes\.pdf$/, `-module-${n}-notes.pdf`);
}

/** Turns the notes Markdown (## / ### headings, lists, paragraphs, code) into PDF blocks. */
export function markdownBlocks(md: string): NotesBlock[] {
  const out: NotesBlock[] = [];
  const inline = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();
  let para: string[] = [];
  const flush = () => {
    if (para.length) out.push({ kind: "p", text: inline(para.join(" ")) });
    para = [];
  };
  let inCode = false;
  let flow = false;
  for (const raw of md.replace(/\r\n/g, "\n").split("\n")) {
    let line = raw.trimEnd();
    if (line.startsWith("```")) {
      flush();
      flow = !inCode && line.slice(3).trim() === "flow";
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      if (line.trim()) out.push({ kind: "li", text: flow ? `Flow: ${line.trim()}` : line.trim() });
      continue;
    }
    // Tables: skip the |---| rule and print each row as "cell | cell".
    if (/^\s*\|[\s:|-]+\|\s*$/.test(line)) continue;
    if (/^\s*\|.*\|\s*$/.test(line)) {
      flush();
      const cells = line.trim().slice(1, -1).split("|").map((c) => inline(c)).filter(Boolean);
      out.push({ kind: "li", text: cells.join("  |  ") });
      continue;
    }
    // Callout boxes ("> **In short:** …") print as plain paragraphs.
    line = line.replace(/^\s*>\s?/, "");
    const h = /^(#{2,3})\s+(.*)$/.exec(line);
    const li = /^\s*(?:[-*]|\d+\.)\s+(.*)$/.exec(line);
    if (h) {
      flush();
      out.push({ kind: h[1].length === 2 ? "h2" : "h3", text: inline(h[2]) });
    } else if (li) {
      flush();
      out.push({ kind: "li", text: inline(li[1]) });
    } else if (!line.trim()) flush();
    else para.push(line.trim());
  }
  flush();
  return out.filter((b) => b.text);
}

export type NotesBlock = { kind: "h1" | "h2" | "h3" | "p" | "li"; text: string };

export function notesFilename(code: string, slug: string) {
  const safe = `${code}-${slug}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${safe || "subject"}-notes.pdf`;
}

/** Official module text, split into topics a student can revise one at a time. */
export function topicClauses(topics: string) {
  const text = topics.replace(/…+$/u, "").replace(/\s+/g, " ").trim();
  if (!text) return [];
  const out: string[] = [];
  for (const sentence of text.split(/(?<=[.;])\s+/)) {
    const s = sentence.replace(/^[\s,;:–-]+/, "").replace(/[.;,…]+$/, "").trim();
    if (s.length < 18) continue;
    const colon = s.indexOf(":");
    const list = colon >= 0 && colon < 90 ? s.slice(colon + 1) : s.length > 160 ? s : "";
    const parts = list
      ? list
          .split(/,\s+/)
          .map((p) => p.replace(/^[\s,;:–-]+/, "").replace(/[.;,…]+$/, "").trim())
          .filter((p) => p.length >= 18 && !/^(introduction|overview|basics?)$/i.test(p))
      : [];
    if (parts.length >= 1 && (colon >= 0 || s.length > 160)) out.push(...parts);
    else out.push(s);
  }
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const item of out) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }
  return unique.slice(0, 14);
}

function questionFor(clause: string) {
  const c = clause.replace(/[.…]+$/, "").trim();
  if (/^(explain|describe|compare|discuss|define|derive|design|analyse|analyze|distinguish)\b/i.test(c)) {
    return c.endsWith(".") ? c : `${c}.`;
  }
  const lower = c.charAt(0).toLowerCase() + c.slice(1);
  if (/\b(versus|vs\.?|difference between|compared with)\b/i.test(c)) return `Compare ${lower}.`;
  return `Explain ${lower}.`;
}

function frame(clause: string) {
  const c = clause.replace(/[.…]+$/, "").trim();
  const lines = [`Definition: say what ${c} means in one sentence a classmate who missed the lecture can use.`];
  if (/\b(versus|vs\.?|difference|compare|comparison)\b/i.test(c)) {
    lines.push("Comparison: two columns, three rows, and one line on when you pick each side.");
  } else if (/\b(algorithm|procedure|steps|protocol|method|technique|process|locking|scheduling)\b/i.test(c)) {
    lines.push("Steps: number the method. Under each step write the input and what changes.");
  } else if (/\b(sql|query|select|join|normal form|entity|schema|model|table|key)\b/i.test(c)) {
    lines.push("Worked piece: one small example (a table, a query, or a diagram) with the keys labelled.");
  } else if (/\b(theorem|proof|derive|formula|equation|transform|law)\b/i.test(c)) {
    lines.push("Derivation: start from the known line, write each step, and box the final expression.");
  } else {
    lines.push("Parts: break the syllabus line into the nouns it names and give each noun one sentence.");
  }
  lines.push("Example: take one example from the prescribed textbook, or from a system you have used, and put the topic name in the sentence.");
  lines.push("Limit: one case where this idea does not apply, or one mistake that loses the mark.");
  return lines;
}

export function notesBlocks(input: NotesInput): NotesBlock[] {
  const blocks: NotesBlock[] = [];
  const push = (kind: NotesBlock["kind"], text: string) => {
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean) blocks.push({ kind, text: clean });
  };

  const credit = input.credits != null ? `${input.credits} credit${input.credits === 1 ? "" : "s"}` : "";
  const only = input.module != null ? input.units.find((u) => u.number === input.module) : undefined;
  push("h1", only ? `${input.code} ${input.name} — Module ${only.number}` : `${input.code} ${input.name}`);
  push(
    "p",
    [input.programme, input.semester, `${input.scheme} scheme`, credit].filter(Boolean).join(" · ") + ".",
  );
  push(
    "p",
    "These are original VTUHub revision notes. They follow the module text VTU prints and name every textbook and reference book in that syllabus. They are not a scan of those books and not a university paper. Read the book for the figures, proofs and exercises, then use this PDF to write the answer with the book closed.",
  );
  if (input.description) push("p", input.description);

  push("h2", "Textbooks");
  if (input.textbooks.length) {
    push("p", "VTU names these books for this course. The notes below point at the first one for each topic. Read the others when a topic is thin in the first book.");
    input.textbooks.forEach((book, i) => push("li", `${i + 1}. ${book}`));
  } else {
    push("p", "The parsed syllabus does not name a textbook. Use the book your faculty assigned, and still revise every module below against it.");
  }

  if (input.references.length) {
    push("h2", "Reference books");
    input.references.forEach((book, i) => push("li", `${i + 1}. ${book}`));
  }

  if (input.outcomes.length && !only) {
    push("h2", "Course outcomes");
    push("p", "The semester-end paper is set against these outcomes.");
    input.outcomes.forEach((outcome) => push("li", outcome));
  }

  const book = input.textbooks[0]?.replace(/[.\s]+$/, "");
  if (!input.units.length) {
    push("h2", "Modules");
    push("p", `The parsed syllabus has no module text for ${input.code}. Check the scheme PDF on vtu.ac.in before you rely on a title.`);
  }

  // Hand-written notes (src/data/notes/<CODE>.md) replace the generic study frame.
  const section = only && input.notesMarkdown ? moduleMarkdown(input.notesMarkdown, only.number) : "";
  if (only && section) {
    push("p", `Official topic text: ${only.topics}`);
    blocks.push(...markdownBlocks(section));
    push("h2", "Before the exam");
    push("li", `Rewrite Module ${only.number} from memory, then check it against these notes and the textbook.`);
    push("p", "Official papers stay on vtu.ac.in. VTUHub does not host them.");
    return blocks;
  }
  if (input.notesMarkdown && !only) {
    blocks.push(...markdownBlocks(input.notesMarkdown));
    push("h2", "Before the exam");
    push("li", "Rewrite one module from memory, then check it against these notes and the textbook.");
    push("p", "Official papers stay on vtu.ac.in. VTUHub does not host them.");
    return blocks;
  }

  for (const unit of only ? [only] : input.units) {
    push("h2", `Module ${unit.number} — ${unit.title}`);
    if (unit.topics) push("p", `Official topic text: ${unit.topics}`);
    const clauses = topicClauses(unit.topics);
    const items = clauses.length ? clauses : unit.title ? [unit.title] : [];
    for (const clause of items) {
      push("h3", clause);
      push(
        "p",
        book
          ? `Read this topic in ${book}, in the part of the book that teaches ${unit.title}.`
          : `Read this topic in the prescribed book, in the part that teaches ${unit.title}.`,
      );
      for (const line of frame(clause)) push("li", line);
      push("p", `Practice: ${questionFor(clause)}`);
    }
  }

  push("h2", "Before the exam");
  push("li", "Rewrite one module from memory, then check it against the official topic text in this PDF.");
  push("li", "For each textbook above, mark the chapters you actually read. An unread book does not count as revision.");
  push("p", "Official papers stay on vtu.ac.in. VTUHub does not host them.");
  return blocks;
}
