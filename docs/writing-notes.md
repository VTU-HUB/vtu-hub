# Writing notes

Notes are the most useful thing you can add. Each subject's notes are one Markdown
file: `src/data/notes/<COURSE CODE>.md`, for example `src/data/notes/BCS502.md`.
The file appears automatically on every subject page with that course code (for
example, BCS502 shows on the CSE, ISE and AIML pages), inside the PDFs, and in the
read-aloud player.

## 1. Find the official modules

Open the subject on vtuhub.site, for example
`/vtu/cse/5th-semester/computer-networks`. The **syllabus** section lists VTU's
official modules and topics, and the books VTU prescribes. Your notes must cover
exactly those modules, in that order.

## 2. Create the file

~~~md
---
code: BCS502
title: Computer Networks
updated: 2026-11-12
textbook: "Behrouz A. Forouzan, Data Communications and Networking (5th Ed.)"
---

## Module 1 — Introduction, network models and the physical layer

> **In short:** two or three plain sentences that explain the whole module.

### Data communications

Explanation…

## Module 2 — Data link layer

…

## Exam tips

- …
~~~

| Field | Meaning |
|---|---|
| `code` | The VTU course code, in capitals. Must match the file name. |
| `title` | The course title. |
| `updated` | The date you last changed the notes (YYYY-MM-DD). Change it only when you change the content. |
| `textbook` | The book the notes follow most closely. Optional. |

## 3. Structure

- `## Module N — Short title`: one per module. Keep the exact form `Module N`,
  because the Module PDF buttons and the "Read Module N notes" links depend on it.
- `> **In short:** …` straight after each module heading: the whole module in
  two or three simple sentences. It shows as a highlighted box.
- `### Topic`: one per topic in VTU's module text.
- `## Exam tips`: last section, what to practise.

## 4. Style: simple and easy

- Short sentences. Explain as if to a classmate who missed the lecture.
- **Bold** the key term the first time it appears.
- One idea per bullet. Use numbered lists for steps.
- Use a **table** to compare things (TCP vs UDP).
- Use a **flow diagram** for any process or sequence. Each line is one row; `->`
  draws an arrow:

  ~~~md
  ```flow
  Client: SYN -> Server: SYN + ACK -> Client: ACK -> Connection open
  ```
  ~~~

- Use a code block for programs (C, Verilog, SQL).
- Maths symbols (→ ≤ ε Σ ⁿ) are fine. The PDF spells them out.

## 5. What is not allowed

- **Copying.** Write everything in your own words. Don't paste from textbooks,
  other websites, question-paper solutions or slides.
- **Files.** No PDFs, images of notes, or question papers. The site makes its own PDFs.
- **Invented VTU facts.** Don't state marks, dates or rules that aren't in VTU's
  documents.
- **Copying exam questions.** You can name typical question *types* in Exam tips,
  but don't reproduce question papers.

## 6. Check it

~~~sh
npm run dev
# open http://localhost:8080/vtu/cse/5th-semester/computer-networks
npm test && npm run build
~~~

Check the notes render, the module buttons work, and **View Module 1 PDF** shows
your text. Then open a pull request. See [CONTRIBUTING.md](../CONTRIBUTING.md).
