# Changelog

All notable changes to VTUHub. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); dates are the day the
change reached `main`. Automatic data syncs (notices, schemes, syllabus) are not
listed.

## [Unreleased]

### Changed

- GitHub links (footer, Contribute, schema, clone URLs, issue templates) now point to
  [`VTU-HUB/vtu-hub`](https://github.com/VTU-HUB/vtu-hub).

### Fixed (data pipeline)

- Syllabus sync keeps previously parsed courses when a PDF download fails, and refuses
  to write on a module-count regression or a coverage drop.
- Notice sync retries timed-out category fetches and keeps the last good notices for a
  failed category.
- Legend text no longer leaks into titles (BRI358B); those URLs 301 to the semester page.
- Academic exception register (`docs/ACADEMIC_EXCEPTIONS.md`) tracks remaining credit,
  title and placeholder warnings instead of auto-picking a value.

### Added

- A "Thank you, contributors" section at the bottom of the home page (English, Kannada,
  Hindi) and a `/contributors` page listing everyone who has contributed, sortable by
  contributions, most recent, notes, lines changed or name. Each person has a
  `/contributors/<github-username>` page with their notes, areas and every commit
  (`noindex`, as it is mostly a list). Data comes from git history at build time,
  bots and AI tools excluded, with no email addresses published; `npm run
  sync:contributors` refreshes the snapshot used on shallow clones.

### Fixed (course data)

- BPOPS103 / BPOPS203 Principles of Programming Using C now have pages, so the BPOPS103
  notes finally show.
- 135 courses gained their credits (either-or courses and elective options).
- Automobile, chemical, textile, silk, ECE, civil and aeronautical titles no longer carry
  table cells, department names or split words; BAU755C and BAU755D now exist.
- New programmes from VTU's page: Biomedical and Aeronautical.
- `npm run validate:data` checks the course data in CI and before every scheduled sync;
  see `docs/ACADEMIC_DATA_QUALITY.md`.
- Pages for 9 placeholder records VTU never titled now redirect to their semester page.

### Changed (SEO)

- "VTU Hub" is now a schema.org `alternateName` of the site, and the home page
  title leads with "VTUHub (VTU Hub)" in English, Kannada and Hindi.
- Subject page titles say "Notes" only when the course has notes; otherwise
  "Syllabus & Modules". Every title keeps the branch, so first-year courses
  shared across programmes no longer repeat the same title.
- Course names drop the printed L:T:P pattern, all-lowercase names get capitals,
  and short names never end on "and", "of" or "with". URLs are unchanged.

### Added

- Module-wise PDFs: every module card has **View Module N PDF** and **Download**.
- In-page PDF viewer: PDFs open inside the site (pdf.js), on phones too.
- **Listen** player: reads the notes aloud with play/pause, stop, speed and
  "start at module". It highlights the line being read.
- "In short" summary boxes and flow diagrams (` ```flow ` blocks) in the notes.
- Notes for BCS502 Computer Networks, BCS503 Theory of Computation and BCS302
  Digital Design and Computer Organization.
- Notes now also show on the `/files/…` guide pages, not only in the PDF.
- Open-source project files: LICENSE (MIT code, CC BY-SA 4.0 notes), CONTRIBUTING,
  CODE_OF_CONDUCT, SECURITY, issue and pull-request templates, and `docs/`.
- "Edit this page on GitHub" links on notes, plus a `/contribute` page.

### Added (notes)

- New notes: BCS501 Software Engineering & Project Management, BCS602 Machine
  Learning and BCS402 Microcontrollers.
- New notes: BPOPS103 Principles of Programming Using C (first year), BCS601
  Cloud Computing and BCS301 Mathematics for CSE (13 subjects in total).
- Syllabus parser: removes "16-2-2023" revision stamps and empty "( of
  Pedagogy)" module titles, so first-year modules get real titles.
- Every module of every note now has an "In short" box and at least one flow
  diagram; the notes test enforces both for new notes.
- PDF keeps accented letters and bar/hat marks (x̄ → "x-bar", ŷ → "y-hat").

### Fixed

- Notes accuracy review (all 7 subjects):
  - BCS304: memory-safe `malloc`/`realloc`/`free` example; Optimal BST recurrence
    now states its index convention; circular-queue capacity and sentinel caveats.
  - BCS303: deadlock detection algorithm (Request matrix, wait-for graph) separated
    from Banker's avoidance; Swap vs compare-and-swap; blocking semaphore; Peterson's
    memory-model caveat.
  - BCS403: correct BCNF/3NF decomposition (R − (Y − X)) with a worked example;
    isolation-level table; CAP and `CREATE ASSERTION` caveats.
  - BCS503: ε-NFA start state, ε in CNF, full pumping-lemma proof for 0ⁿ1ⁿ2ⁿ, TM
    accept/reject/loop, Church–Turing wording, "+ means union" notation.
  - BCS401: Master theorem assumptions, Θ(n + k) distribution counting, DP base
    cases, subset-sum and knapsack-bound assumptions, approximation ratio, TSP count.
  - BCS502: checksum scope by protocol, 0.0.0.0, SMTP submission ports, FTP
    active/passive, HTTP/3, stop-and-wait assumptions with a worked example.
  - BCS302: AMAT definitions with an example, carry look-ahead expansion, cache-hit
    vs miss in pipelines, instruction-hazard terminology.
- SGPA/CGPA calculators no longer lose the field you are typing in; the marks
  calculator no longer snaps a cleared field back to 0.
- Attendance and percentage calculators reject impossible input (attended >
  conducted, marks > maximum, negatives) with a message.
- PDF export: code blocks in monospace with indentation, tables as rows, "In short"
  boxes, flow rows and numbered/nested lists; Θ, Ω, ⌊⌋, ⋈ and other symbols no
  longer vanish.
- Syllabus books: edition ordinals ("9th edition") and quotes cleaned; 29 broken
  web links (cut at "(" or at "https://www") fixed or dropped.
- Google Tag Manager snippet now sends the `gtm.js` start event.
- Sitemap filter fails closed when a built page cannot be read; the SEO checker
  only accepts an SVG `<title>` inside that SVG.
- Generated "important questions" no longer claim to be high-frequency SEE topics.

### Added (tests)

- `tests/notes-files.test.ts`: checks every notes file (frontmatter, module order,
  In short boxes, code fences, PDF symbols, a PDF per module). 76 tests in total.

- PDF text lost maths symbols (→, ≤, ε, Σ, ⊕, superscripts). They are now spelled
  out (`->`, `<=`, `eps`, `^n`).
- Page stamps from VTU's syllabus PDFs (`@#@#@ 1 12082024`, `-! -! 1`) leaked
  into module titles and books for about 80 courses. The parser now strips them.

## 2026-11-11

### Added

- Module-wise study notes system (`src/data/notes/*.md`), with notes for BCS304
  Data Structures, BCS303 Operating Systems, BCS403 DBMS and BCS401 ADA.
- Prescribed textbooks and reference books shown with the notes; notes included
  in the downloadable PDF.
- Notes PDF download for every subject.
- Official syllabus modules, outcomes, textbooks and links for every course,
  synced from VTU's syllabus PDFs.
- Structured sitemap split by section, with an XSL stylesheet.
- Searchable dropdowns across the site; themed scrollbars.
- Google Analytics 4 tag.

### Fixed

- Course titles split by the PDF parser; renamed URLs get 301 redirects.
- The scheme sync no longer drops previously discovered syllabus PDFs.
- Hub pages and FAQs describe all programmes, not six branches (en/kn/hi).
- Duplicate badge on Electronics & Communication (Advanced Communication Technology).

## 2026-11-10

### Added

- Kannada (`/kn`) and Hindi (`/hi`) pages.
- Beginner-friendly landing page and simpler navigation.
- Image alt text and keyword-led titles for SEO.

### Fixed

- Deploy settings and canonical redirects.

## 2026-10-23

### Changed

- Migrated to an Astro static site; removed the unused TanStack app.

### Fixed

- Calculator scripts mount inside the base layout.
- Theme toggle shows a moon and sun icon.

## 2026-09-06

- First version.
