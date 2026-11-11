# Architecture

VTUHub is a **fully static** [Astro](https://astro.build) site. Every page is built
ahead of time into `dist/` and served as plain files. There is no server code,
database or login.

```text
vtu.ac.in ──(sync scripts, GitHub Actions cron)──▶ src/data/vtu/*.json
                                                      │
src/data/notes/*.md (hand-written notes) ─────────────┤
                                                      ▼
                                   src/data/*.ts (subjects, branches, resources)
                                                      │
                                         src/pages/** (Astro routes)
                                                      │
                                        astro build ──▶ dist/ (about 11,000 pages)
                                                      │
                                       Cloudflare Workers static assets
```

## URLs

`build.format: "file"` and no trailing slash: `/vtu/cse` is `dist/vtu/cse.html`.

| URL | Page |
|---|---|
| `/vtu` | All programmes |
| `/vtu/<branch>` | One programme, all semesters |
| `/vtu/<branch>/<n>th-semester` | Subjects of one semester |
| `/vtu/<branch>/<n>th-semester/<subject>` | Subject page: syllabus, module PDFs, notes, books |
| `/files/<id>` | Generated study guide (noindex unless reviewed) |
| `/updates` | VTU notices |
| `/calculators/*` | SGPA, CGPA, marks, attendance |
| `/kn/*`, `/hi/*` | Kannada and Hindi versions |
| `/contribute` | How to contribute |

## Data layer (`src/data/`)

| File | Role |
|---|---|
| `vtu/courses.json` | Programmes and courses from the official scheme PDFs (generated) |
| `vtu/syllabus.json` | Modules, outcomes and books from the syllabus PDFs (generated) |
| `vtu/notices.json` | VTU notices (generated) |
| `subjects.ts` | Joins courses and syllabus into `Subject` objects; canonical copy for shared courses |
| `branches.ts` | Programmes, streams, semester helpers |
| `notes.ts` | Loads `notes/*.md` with `import.meta.glob`; `notesFor(code)` |
| `resources.ts` | Generated guides under `/files`; `reviewed-guides.json` controls indexing |
| `legacy-subjects.ts`, `vtu/legacy-urls.json` | Old URLs kept as 301 redirects |

A course shared by several programmes (for example BCS502 in CSE, ISE and AIML) has one
**canonical** page (the programme that owns its prefix). The others point their
canonical link to it.

## Notes, PDFs and read-aloud

- **Markdown notes** render through Astro's Markdown pipeline. `notesHtml()` in
  `src/data/notes.ts` turns ` ```flow ` blocks into flow diagrams. Blockquotes are styled as "In short" boxes
  (`.notes-prose` in `src/styles.css`).
- **PDFs** are generated in the browser, never stored:
  - `src/lib/notes-doc.ts` turns the subject and its notes Markdown into blocks.
    `module` limits the PDF to one module.
  - `src/lib/notes-pdf.ts` lays the blocks out with pdf-lib. `pdfText` folds symbols into
    the ASCII the standard fonts support.
  - `src/scripts/download-notes.ts` handles the buttons. It lazy-loads pdf-lib.
  - `src/scripts/pdf-viewer.ts` shows the PDF inside the site with pdf.js.
  - Components: `NotesPdf.astro` (whole course) and `ModulePdf.astro` (one module).
- **Read aloud:** `src/components/site/ReadAloud.astro` uses the browser's
  `speechSynthesis`. It reads block by block, so pause and resume work on Android too.

## Search

`src/data/search-index.ts` builds a compact index at build time, served as
`/search-index.json`. `src/lib/search.ts` searches it in the browser.

## Styling and UI

Tailwind CSS 4, with design tokens in `src/styles.css` (`--vt-*`). Every `<select>` is
upgraded to a searchable dropdown by `src/scripts/select-search.ts`.

## Tests

`tests/*.test.ts` run with Node's built-in test runner and TypeScript stripping:

- `grades.test.ts`: SGPA, CGPA and pass rules
- `notes-pdf.test.ts`: notes Markdown → PDF, per-module PDFs, symbol folding
