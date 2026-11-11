import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PDFDocument } from "pdf-lib";
import { notesBlocks, notesFilename, type NotesInput } from "../src/lib/notes-doc.ts";
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
