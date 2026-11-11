/**
 * Hand-written study notes, one Markdown file per VTU course code in src/data/notes/.
 * Each file follows the official modules of that course (from syllabus.json) and is
 * shown on every subject page with that code. Add a subject by adding <CODE>.md.
 */
import type { MarkdownInstance } from "astro";

export type NotesMeta = {
  code: string;
  title: string;
  /** Date the notes were last revised (YYYY-MM-DD). */
  updated: string;
  /** Book the notes follow most closely. */
  textbook?: string;
};

const files = import.meta.glob<MarkdownInstance<NotesMeta>>("./notes/*.md", { eager: true });

const byCode = new Map<string, MarkdownInstance<NotesMeta>>();
for (const file of Object.values(files)) byCode.set(file.frontmatter.code.toUpperCase(), file);

export function notesFor(code: string) {
  return byCode.get(code.toUpperCase());
}

const decode = (s: string) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** One ```flow block → rows of boxes joined by arrows ("->" separates the steps). */
export function flowHtml(source: string) {
  const rows = source
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const nodes = line.split(/\s*->\s*/).filter(Boolean);
      const parts = nodes.map(
        (n, i) => `${i ? '<span class="flow-arrow" aria-hidden="true">→</span>' : ""}<span class="flow-node">${esc(n)}</span>`,
      );
      return `<div class="flow-row" role="listitem" aria-label="${esc(nodes.join(", then "))}">${parts.join("")}</div>`;
    });
  return `<div class="flow" role="list">${rows.join("")}</div>`;
}

/** Rendered notes HTML, with ```flow code blocks turned into flow diagrams. */
export async function notesHtml(code: string) {
  const file = notesFor(code);
  if (!file) return "";
  const html = await file.compiledContent();
  return html.replace(/<pre><code class="language-flow">([\s\S]*?)<\/code><\/pre>/g, (_, body: string) => flowHtml(decode(body)));
}

export function hasNotes(code: string) {
  return byCode.has(code.toUpperCase());
}

export const notesCodes = [...byCode.keys()].sort();
