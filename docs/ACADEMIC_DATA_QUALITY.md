# Academic data quality

Course data comes only from VTU's official scheme PDFs (`scripts/vtu/sync-schemes.mjs`)
and syllabus PDFs (`scripts/vtu/sync-syllabus.mjs`). This page explains how that data is
checked and what is still known to be imperfect.

## The validator

`npm run validate:data` (`scripts/vtu/validate-data.mjs`) runs in CI on every pull request
and in the scheduled sync before anything is committed.

**Errors fail the build.** They are things a student would see as wrong:

- missing or malformed course code, missing title;
- a title holding table cells (`… 0 0 12 03 100 100`), a placeholder
  (`To be Announced on the VTU web portal`) or ending mid-phrase (`… for`, `… and`, `… -`);
- semester outside 1–8, or different from the digit in the code (BCS**3**01);
- the same code twice in one semester of one programme;
- credits that are not a whole number from 0 to 20;
- a programme with an unknown stream or no source PDF;
- a notes file whose code has no course, so the notes never show.

**Warnings do not fail.** Each needs a person to open the PDF:

- no credits parsed;
- the same code printed with different titles or credits in different PDFs;
- placeholder syllabus module titles.

Fix an error in the parser, or add the value printed in the official PDF to
`scripts/vtu/title-fixes.json` with its source in `$sources`, then re-run the sync. Never
edit `src/data/vtu/courses.json` by hand.

## Phase 1 corrections (13 November 2026)

All values below were checked against the PDF named.

| Problem | Cause | Fix |
| --- | --- | --- |
| BPOPS103 / BPOPS203 (Principles of Programming Using C) missing, so their notes never showed | The legend at the foot of `csesch.pdf` page 1 has "TD/PSB" at the titles' x; it was taken as the title column edge, so every title on the page became empty | Only "TD" labels on or above the table set the edge |
| 135 courses with no credits | "Either-or" courses (English OR Writing Skills, Kannada OR Constitution, IDT OR SFH) share one merged credits cell between their rows | Use the serial-number row's credits cell when no other course row sits on it |
| Elective options with no credits | Options looked up their slot by "105", shared by the ETC and PLC slots | Look up by the full prefix ("BPLCK105") first |
| BAU755C, BAU755D missing; BAU515B/D, BMT358A–D, BESCK104C garbled | Codes printed in 2–6 pieces ("B" "AU" "755C") | Join adjacent pieces that form a valid code |
| Automobile titles with "AU" and marks (`Major Project Phase-II AU 0 0 12 03 100 100 400 300`) | That PDF labels the column "Department (TD)" | Recognise "(TD)" labels |
| BAU803 / BAU883 internship title empty or junk | Two codes printed on one row | Measure the title band against the nearest anchor on another row |
| BCY714D, BME801C, BMM306A cut off | Option titles wrap onto a second line | Read one continuation line that starts at the title's own left edge |
| "Open Elective Course" / legend text added to titles | Headings and the abbreviation legend fell inside a title band | Skip legend rows and headings below a course row |
| BEE301 `Engineering Mathematics for` | Department-word strip also removed "EEE" | Stop before a strip leaves the title hanging or one word long |
| `Machine ry`, `Microcontroller s`, `Data Structure s`, `A erodynamics`, `C omputational` | pdfjs splits a word into touching pieces | Join touching pieces only when one side is a lone capital or a 1–2 letter tail that is not a word, so "R programming" and "Elements of" stay apart |
| `BESCK104 C Introduction…` (civil stream) | Code printed in seven pieces | Join up to eight pieces, longest first; the validator now fails on this shape |
| `(L:T:P)`, `##` and "Textile/ Silk" in titles | Header text, footnote marks and a department cell | Removed in the parser |
| Kannada pair, BMEL305, BRIL305, BTX657A | Printed jointly, overlaid or cut off in the scheme PDF | `title-fixes.json` with the printed value and its source |
| `3biotechsch.pdf` headers ("CIE Marks 50 SEE Marks 50") replaced real titles | VTU links that syllabus PDF as a scheme | Treated as junk titles |
| One slow response from vtu.ac.in failed the whole sync | No retry | 4 tries with a 60 s timeout |
| A 404 or a parse failure deleted a programme's courses (live URLs) | Sync trusted every run | Keep the last good data for that programme and report it |

Removed records: 8 automobile "To be Announced" placeholders (BAU802C/D, BAU811A–D,
BAU852A/B) and BIO358D, for which `indiotsch.pdf` prints no title. Their pages now 301 to
their semester page through `src/data/vtu/legacy-urls.json`.

New in the data because VTU's page now lists them: the **biomedical** and **aeronautical**
programmes.

## Known gaps (warnings, 13 November 2026)

| Warning | Count | Notes |
| --- | ---: | --- |
| No credits parsed | 76 | Mostly silk-technology (18), first-year streams (17), textile (16), chemical (8) |
| Same code printed with different titles | 39 | e.g. `Basics of JAVA programming` vs `Basics to JAVA programming` (VTU's own PDFs differ) |
| Placeholder syllabus module titles | 6 | e.g. BKBKK107 modules titled "1" |
| Credits differ between PDFs | 1 | BBOK407: 3 vs 2 |

Smart Agritech's 7th/8th-semester PDFs return HTTP 404 on vtu.ac.in; its earlier courses are
kept until VTU restores them.
