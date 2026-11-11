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

export function hasNotes(code: string) {
  return byCode.has(code.toUpperCase());
}

export const notesCodes = [...byCode.keys()].sort();
