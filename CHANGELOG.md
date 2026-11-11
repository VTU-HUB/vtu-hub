# Changelog

All notable changes to VTUHub. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); dates are the day the
change reached `main`. Automatic data syncs (notices, schemes, syllabus) are not
listed.

## [Unreleased]

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

### Fixed

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
