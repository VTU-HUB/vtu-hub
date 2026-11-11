# Data pipeline

All VTU facts on the site (course codes, titles, credits, modules, books, notices) come
from vtu.ac.in through scripts in `scripts/vtu/`. **Never edit `src/data/vtu/*.json` by
hand.** Fix the script and run it again.

| Script | Reads | Writes | Schedule ([sync-vtu.yml](../.github/workflows/sync-vtu.yml)) |
|---|---|---|---|
| `sync-notices.mjs` | vtu.ac.in WordPress REST API (exam, timetable, calendar, regulation categories) | `notices.json` | every 6 hours |
| `sync-schemes.mjs` | Scheme PDFs found on vtu.ac.in/en/b-e-scheme-syllabus | `courses.json` | daily |
| `sync-syllabus.mjs` | Syllabus PDFs for each programme | `syllabus.json` (and syllabus links in `courses.json`) | weekly |

Each job commits only when the data changed.

## How PDFs are parsed

1. `pdf-rows.mjs` reads text items with pdfjs and groups them into rows by their y position.
2. `parse-scheme.mjs` finds course rows by their code pattern, then reads the title
   column and the credits column. Elective lists become slots (`groupKey`).
3. `parse-syllabus.mjs` finds each course's block, then its modules, outcomes,
   textbooks, references and web links. `STAMPS` strips page stamps VTU prints on
   every page (template names, dates, `@#@#@ 1 12082024`, `-! -! 1`).

## Fixing a wrong title

If the parser splits or garbles a title, add the exact title printed in the official PDF
to `scripts/vtu/title-fixes.json`:

```json
{ "titles": { "BCS502": "Computer Networks" } }
```

If a URL changes because of the fix, add the old URL to `src/data/vtu/legacy-urls.json`
so it redirects with a 301. Never change a programme slug in `programs.mjs`; slugs are URLs.

## Running locally

```sh
node scripts/vtu/sync-notices.mjs
node scripts/vtu/sync-schemes.mjs
node scripts/vtu/sync-syllabus.mjs   # caches PDFs in your temp folder
```

## Known gaps

- Biomedical (semesters 5–8) and Telecommunication: VTU's PDFs are scanned images,
  so there is no text to parse.
- Aeronautical: the scheme PDF parses only partly.
- Smart Agritech: the scheme link on vtu.ac.in returns 404.
- Only the 2022 scheme is synced.
