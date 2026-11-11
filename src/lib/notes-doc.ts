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
};

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
  push("h1", `${input.code} ${input.name}`);
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

  if (input.outcomes.length) {
    push("h2", "Course outcomes");
    push("p", "The semester-end paper is set against these outcomes.");
    input.outcomes.forEach((outcome) => push("li", outcome));
  }

  const book = input.textbooks[0]?.replace(/[.\s]+$/, "");
  if (!input.units.length) {
    push("h2", "Modules");
    push("p", `The parsed syllabus has no module text for ${input.code}. Check the scheme PDF on vtu.ac.in before you rely on a title.`);
  }

  for (const unit of input.units) {
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
