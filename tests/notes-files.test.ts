/**
 * Checks every real notes file in src/data/notes/: structure, PDF symbols and
 * that each module PDF can be built. Add a notes file and it is tested here
 * automatically.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { markdownBlocks, moduleMarkdown, notesBlocks, type NotesInput } from "../src/lib/notes-doc.ts";
import { droppedGlyphs, renderNotesPdf } from "../src/lib/notes-pdf.ts";

const dir = path.resolve("src/data/notes");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

function frontmatter(src: string) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(src);
  if (!m) return null;
  const out: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^(\w+):\s*"?(.*?)"?\s*$/.exec(line);
    if (kv) out[kv[1]] = kv[2];
  }
  return { data: out, body: src.slice(m[0].length) };
}

describe("notes files", () => {
  it("exist", () => assert.ok(files.length > 0));

  for (const file of files) {
    const src = fs.readFileSync(path.join(dir, file), "utf8");
    const fm = frontmatter(src);
    const code = file.replace(/\.md$/, "");

    describe(file, () => {
      it("has frontmatter with a matching code, a title and a valid date", () => {
        assert.ok(fm, "missing --- frontmatter ---");
        assert.equal(fm.data.code, code, "frontmatter code must match the file name");
        assert.ok(fm.data.title, "missing title");
        assert.match(fm.data.updated ?? "", /^\d{4}-\d{2}-\d{2}$/, "updated must be YYYY-MM-DD");
      });

      it("has Module 1…N headings in order, each with content and an In short box", () => {
        const heads = [...fm!.body.matchAll(/^## Module (\d+)\b/gm)].map((m) => Number(m[1]));
        assert.ok(heads.length >= 1, "no ## Module headings");
        assert.deepEqual(heads, heads.map((_, i) => i + 1), "modules must be numbered 1, 2, 3… in order");
        for (const n of heads) {
          const section = moduleMarkdown(fm!.body, n);
          assert.ok(section.split("\n").length > 5, `Module ${n} is empty`);
          assert.match(section, /^> \*\*In short:\*\*/m, `Module ${n} has no "> **In short:**" box`);
        }
      });

      it("has balanced code fences and well-formed flow blocks", () => {
        const fences = fm!.body.match(/^```/gm) ?? [];
        assert.equal(fences.length % 2, 0, "unclosed ``` code fence");
        for (const m of fm!.body.matchAll(/^```flow\r?\n([\s\S]*?)^```/gm)) {
          for (const line of m[1].split(/\r?\n/).filter((l) => l.trim())) {
            assert.ok(line.includes("->"), `flow line without an arrow: "${line}"`);
          }
        }
      });

      it("uses no symbol that the PDF would silently drop", () => {
        assert.deepEqual(droppedGlyphs(src), [], "add these characters to the maps in src/lib/notes-pdf.ts");
      });

      it("keeps code blocks as code in the PDF", () => {
        const blocks = markdownBlocks(fm!.body);
        // Opening fences only (every other ``` line), excluding ```flow.
        const openers = (fm!.body.match(/^```.*$/gm) ?? []).filter((_, i) => i % 2 === 0);
        const hasFence = openers.some((o) => o.trim() !== "```flow");
        if (hasFence) assert.ok(blocks.some((b) => b.kind === "code"));
        assert.ok(!blocks.some((b) => b.text.startsWith("```")));
      });

      it("builds a valid PDF for every module", async () => {
        const heads = [...fm!.body.matchAll(/^## Module (\d+)\s+—\s+(.*)$/gm)];
        const input: NotesInput = {
          filename: `${code.toLowerCase()}-notes.pdf`,
          code,
          name: fm!.data.title,
          programme: "Test",
          semester: "Test",
          scheme: "2022",
          credits: null,
          description: "",
          textbooks: [],
          references: [],
          outcomes: [],
          units: heads.map((m) => ({ number: Number(m[1]), title: m[2], topics: m[2] })),
          notesMarkdown: fm!.body,
        };
        for (const unit of input.units) {
          const blocks = notesBlocks({ ...input, module: unit.number });
          assert.ok(blocks.some((b) => b.kind === "h2" && b.text.startsWith(`Module ${unit.number}`)));
          const bytes = await renderNotesPdf(blocks, { title: "t", code, name: input.name });
          assert.ok(bytes.length > 1000);
        }
      });
    });
  }
});
