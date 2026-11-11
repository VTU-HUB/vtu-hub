import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PDFDocument } from "pdf-lib";
import { moduleFilename, moduleMarkdown, notesBlocks, notesFilename, type NotesInput } from "../src/lib/notes-doc.ts";
import { pdfText, renderNotesPdf } from "../src/lib/notes-pdf.ts";

const dbms: NotesInput = {
  filename: "bcs403-dbms-notes.pdf",
  code: "BCS403",
  name: "Database Management Systems",
  programme: "Computer Science & Engineering",
  semester: "4th Semester",
  scheme: "2022",
  credits: 4,
  description: "Relational databases, SQL and normalisation.",
  textbooks: [
    "Fundamentals of Database Systems, Ramez Elmasri and Shamkant B. Navathe, 7th Edition, 2017, Pearson.",
    "Database management systems, Ramakrishnan, and Gehrke, 3rd Edition, 2014, McGraw Hill.",
  ],
  references: ["Database System Concepts, Silberschatz, Korth and Sudarshan."],
  outcomes: ["Describe the basic elements of a relational database management system."],
  units: [
    {
      number: 1,
      title: "Introduction to Databases",
      topics:
        "Introduction to Databases: Introduction, Characteristics of database approach, Advantages of using the DBMS approach. Mapping Conceptual Design into a Logical Design: Relational Database Design using ER to Relational Mapping.",
    },
  ],
};

describe("notesBlocks", () => {
  const text = notesBlocks(dbms).map((b) => b.text).join("\n");

  it("names every prescribed book and the official topic", () => {
    assert.match(text, /Elmasri/);
    assert.match(text, /Ramakrishnan/);
    assert.match(text, /Silberschatz/);
    assert.match(text, /Characteristics of database approach/);
    assert.match(text, /Relational Database Design using ER to Relational Mapping/);
  });

  it("asks a real question and skips the old filler line", () => {
    assert.match(text, /Explain characteristics of database approach/i);
    assert.match(text, /Explain advantages of using the DBMS approach/i);
    assert.match(text, /Explain relational Database Design using ER to Relational Mapping/i);
    assert.doesNotMatch(text, /Work one problem that uses/);
  });

  it("still builds a PDF when the syllabus has no modules", () => {
    const blocks = notesBlocks({ ...dbms, units: [], textbooks: [], references: [], outcomes: [] });
    const joined = blocks.map((b) => b.text).join("\n");
    assert.match(joined, /no module text/);
    assert.match(joined, /does not name a textbook/);
  });
});

describe("renderNotesPdf", () => {
  it("writes a multi-page PDF for the subject", async () => {
    const bytes = await renderNotesPdf(notesBlocks(dbms), {
      title: "BCS403 Database Management Systems notes",
      code: "BCS403",
      name: "Database Management Systems",
    });
    assert.equal(Buffer.from(bytes.subarray(0, 5)).toString(), "%PDF-");
    const doc = await PDFDocument.load(bytes);
    assert.ok(doc.getPageCount() >= 1);
    assert.equal(doc.getTitle(), "BCS403 Database Management Systems notes");
  });

  it("folds characters the PDF font cannot draw", () => {
    assert.equal(pdfText("“SQL” — • notes…"), '"SQL" - - notes...');
  });
});

describe("notesFilename", () => {
  it("uses the course code and slug", () => {
    assert.equal(notesFilename("BCS403", "dbms"), "bcs403-dbms-notes.pdf");
  });
});

describe("hand-written notes in the PDF", () => {
  const md = [
    "## Module 1 — Stacks",
    "",
    "A **stack** is LIFO; `push` adds at the top.",
    "",
    "- Overflow when full",
    "",
    "```c",
    "stack[++top] = x;",
    "```",
    "",
    "### Postfix",
    "Scan left to right.",
  ].join("\n");

  it("turns headings, paragraphs, bullets and code into blocks without Markdown symbols", () => {
    const blocks = notesBlocks({ ...dbms, notesMarkdown: md });
    const texts = blocks.map((b) => `${b.kind}:${b.text}`);
    assert.ok(texts.includes("h2:Module 1 — Stacks"));
    assert.ok(texts.includes("p:A stack is LIFO; push adds at the top."));
    assert.ok(texts.includes("li:Overflow when full"));
    assert.ok(texts.includes("li:stack[++top] = x;"));
    assert.ok(texts.includes("h3:Postfix"));
    // The generic per-topic study frame is replaced by the real notes.
    assert.ok(!texts.some((t) => t.startsWith("p:Practice:")));
  });

  it("renders a valid PDF from the notes", async () => {
    const bytes = await renderNotesPdf(notesBlocks({ ...dbms, notesMarkdown: md }), { title: "t", code: "BCS403", name: "DBMS" });
    const doc = await PDFDocument.load(bytes);
    assert.ok(doc.getPageCount() >= 1);
  });
});

describe("per-module notes PDF", () => {
  const md = ["## Module 1 — Basics", "One text.", "", "## Module 2 — More", "Two text.", "", "## Exam tips", "Tip."].join("\n");

  it("extracts only the requested module section", () => {
    assert.equal(moduleMarkdown(md, 1), "## Module 1 — Basics\nOne text.");
    assert.equal(moduleMarkdown(md, 2), "## Module 2 — More\nTwo text.");
    assert.equal(moduleMarkdown(md, 9), "");
  });

  it("builds a PDF with just that module and a module filename", () => {
    const units = [...dbms.units, { number: 2, title: "More", topics: "More topics." }];
    const texts = notesBlocks({ ...dbms, units, notesMarkdown: md, module: 2 }).map((b) => `${b.kind}:${b.text}`);
    assert.ok(texts.some((t) => t.startsWith("h1:") && t.endsWith("Module 2")));
    assert.ok(texts.includes("p:Two text."));
    assert.ok(!texts.includes("p:One text."));
    assert.equal(moduleFilename("BCS403", "dbms", 2), "bcs403-dbms-module-2-notes.pdf");
  });

  it("falls back to the study frame for one module when there are no notes", () => {
    const texts = notesBlocks({ ...dbms, module: 1 }).map((b) => b.text);
    assert.ok(texts.some((t) => t.startsWith("Module 1")));
    assert.ok(!texts.some((t) => t.startsWith("Module 2")));
  });
});
