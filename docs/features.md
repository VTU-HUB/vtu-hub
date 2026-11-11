# Features

| Feature | What students get | Code |
|---|---|---|
| Programme browser | Every 2022-scheme programme, grouped by stream, semester by semester | `src/pages/vtu/`, `src/components/site/Browse.astro` |
| Subject page | Course code, credits, official modules, outcomes, prescribed books, links | `src/pages/vtu/[branch]/[semester]/[subject]/index.astro` |
| Module cards | For each module: topics, **View Module N PDF**, **Download**, "Read Module N notes", "Find the textbook" | `ModulePdf.astro` |
| Study notes | Module-wise notes with "In short" boxes, flow diagrams and tables | `src/data/notes/*.md` |
| Notes PDF | Whole course or one module, generated in the browser | `src/lib/notes-doc.ts`, `src/lib/notes-pdf.ts` |
| In-site PDF viewer | PDFs open in a viewer on the page, not a new tab | `src/scripts/pdf-viewer.ts` |
| Read aloud | Listen to the notes; play/pause, stop, speed, start at a module, tap a line to jump | `ReadAloud.astro` |
| Search | Programmes, subjects, codes and guides | `src/pages/search.astro`, `src/lib/search.ts` |
| Calculators | SGPA, CGPA, marks needed, attendance | `src/lib/grades.ts`, `src/scripts/calculators.ts` |
| VTU notices | Exam timetables, results, calendars, circulars from vtu.ac.in | `src/pages/updates/` |
| Languages | Main pages in Kannada and Hindi | `src/i18n/`, `src/pages/kn/`, `src/pages/hi/` |
| Edit on GitHub | Every notes section links to its Markdown file | subject and guide pages |

## What the site deliberately does not do

- Host question papers, scanned notes or textbook PDFs. "Find the textbook" is a search
  for buying or borrowing the book; "Search official papers" searches vtu.ac.in.
- Require sign-up, or collect anything beyond anonymous analytics.
