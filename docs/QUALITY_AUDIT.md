# VTUHub quality audit — Phase 0 baseline

Audit date: 13 November 2026 · Commit audited: `f0d919e` (main, after #5) ·
Method: source inspection, a fresh local build, scripts run against `dist/`, and spot
checks on the live site (https://vtuhub.site) in a browser.

Every number below was measured unless the row says **not measured**. Nothing in this
document is an estimate dressed as a measurement.

## 1. Summary

| Area          | Current status                                                                                                                                               | Problems                                                                                                                                                                      | Priority     | Proposed solution                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| Architecture  | Astro 7 static site, 11,041 pages, 44 s build, Cloudflare Workers static assets. No backend, no secrets.                                                     | `Astro.url.pathname` includes `.html` at build time in 2 places (header active state, legacy semester pages).                                                                 | Low          | Derive paths from route params, not `Astro.url`.                                                                  |
| Academic data | 41 programmes, 1,720 unique course codes (5,068 programme-course records) from official scheme PDFs. Syllabus modules for 916 codes.                         | Parser leaks table cells into titles; merged elective cells drop courses; 1,569 records with no credits; 45 codes with conflicting titles; BPOPS103 missing from course data. | **Critical** | Fix `scripts/vtu/sync-schemes.mjs` and `title-fixes.json` against the PDFs; add a data validator to CI (Phase 1). |
| Content       | 13 notes files cover 12 course codes (0.7 % of codes). Every other course is syllabus plus a generated study frame.                                          | The BPOPS103 notes never show (no course page). Coverage is CSE-core only.                                                                                                    | **Critical** | Fix BPOPS103 first; write notes per programme from the official syllabus (Phase 2).                               |
| SEO           | Titles, descriptions, canonicals, hreflang, JSON-LD and a sectioned sitemap are all generated. `check:seo`: 0 errors. Sitemap and robots meta agree exactly. | 88 indexable subject titles over 65 chars; 4 descriptions over 165; 154 thin kn/hi pages; Search Console not connected here.                                                  | High         | Phase 10; get Search Console data before more on-page work.                                                       |
| UI/UX         | Branch-first navigation; 9 of 10 sampled pages fit 320 px.                                                                                                   | Notes pages scroll sideways at 320 px (code blocks); `/kn` 2 px overflow; branch menu item not marked current on its own page.                                                | High         | Fix the grid `min-width` on the notes column; derive header path from params (Phase 8).                           |
| Performance   | Pages ship little JS: 2.5 kB shared module, PDF code (1.7 MB) loads only on demand. HTML: 67 kB home, 124 kB subject page with notes.                        | Core Web Vitals **not measured**. GTM loads on every page.                                                                                                                    | High         | Measure with CrUX/Search Console or Lighthouse before changing anything (Phase 11).                               |
| Accessibility | `check:seo` enforces `lang`, one `h1`, image alt, labelled SVGs, OG alt: 0 errors on 11,041 pages.                                                           | Contrast, keyboard flow and screen-reader output **not measured**. Many controls under 24 px (needs manual review: inline links are exempt from WCAG 2.5.8).                  | High         | Manual WCAG 2.2 AA pass on the main page types (Phase 8).                                                         |
| Security      | No server code, no secrets in the repo, no env vars in browser code. `npm audit --omit=dev`: 0 vulnerabilities.                                              | 7 moderate advisories in dev-only tooling (`typescript-eslint` → `minimatch`).                                                                                                | Low          | Bump `typescript-eslint` when a non-breaking fix lands.                                                           |
| Testing       | 119 unit tests pass (grades, notes files, PDF, titles). Lint and typecheck clean. CI runs lint, typecheck, test, build, `check:seo` on every PR.             | No academic-data validation in CI; no internal-link check in CI.                                                                                                              | **Critical** | Add data validator (Phase 1) and route audit (this PR's script) to CI (Phase 13).                                 |

## 2. Architecture

| Item           | Finding                                                                                                                                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework      | Astro `^7.4.8` (7.4.11 available), `output: "static"`, `build.format: "file"`, `trailingSlash: "never"`.                                                                                                                                                          |
| Styling        | Tailwind CSS 4 via `@tailwindcss/vite`; tokens as CSS variables in `src/styles.css`; one 46 kB stylesheet.                                                                                                                                                        |
| Runtime deps   | 5 (`astro`, `@astrojs/sitemap`, `tailwindcss`, `@tailwindcss/vite`, `pdf-lib`). `pdfjs-dist` is a dev dep bundled for the in-site viewer.                                                                                                                         |
| Pages          | `src/pages/` routes; shared layout `src/layouts/Base.astro` (all meta, hreflang, JSON-LD); 15 components in `src/components/site/`.                                                                                                                               |
| Academic data  | Generated: `src/data/vtu/courses.json`, `syllabus.json`, `notices.json` by `scripts/vtu/sync-*.mjs` (scheduled in `sync-vtu.yml`: notices every 6 h, schemes daily, syllabus weekly). Hand-maintained: `legacy-subjects.ts` (old slugs only), `title-fixes.json`. |
| Notes          | Markdown per course code in `src/data/notes/`; PDFs built in the browser (`src/lib/notes-pdf.ts`, `pdf-lib`).                                                                                                                                                     |
| Search         | Static JSON index (`/search-index.json`) filtered client-side.                                                                                                                                                                                                    |
| SEO            | `src/lib/seo-doc.ts` (titles, JSON-LD), sitemap integration with a robots-aware filter and per-section split in `astro.config.mjs`, `scripts/check-seo.mjs`.                                                                                                      |
| Deploy         | `wrangler.jsonc` (Workers static assets, `auto-trailing-slash`, `404-page`). Deployment status is visible only in Cloudflare; the live site served #5's titles on 13 Nov, so that deploy succeeded.                                                               |
| PWA            | `site.webmanifest` with icons; **no service worker** (no offline support).                                                                                                                                                                                        |
| Auth / backend | None.                                                                                                                                                                                                                                                             |

Code-level issues found:

- `src/components/site/Header.astro:32` and `src/pages/semesters/[semester].astro:19` use
  `Astro.url.pathname`, which is `/vtu/cse.html` at build time. Effect: the current branch is
  not highlighted in the branch menu on its own page, and the 8 legacy `/semesters/*` pages
  emit `og:url`/hreflang/self links ending in `.html` (the only broken internal links found).

## 3. Routes

Measured with `node scripts/audit-routes.mjs` (added in this PR) on the fresh build.

| Page type                                                             |      Pages | Indexable | Canonical elsewhere | In sitemap | Thin indexable (<150 words) | Median words |
| --------------------------------------------------------------------- | ---------: | --------: | ------------------: | ---------: | --------------------------: | -----------: |
| Subject (`/vtu/{branch}/{sem}/{subject}`)                             |      5,068 |     5,068 |               3,348 |      1,720 |                           0 |          584 |
| Subject resource type (`…/notes`, `…/syllabus`, …)                    |      1,722 |         0 |                   0 |          0 |                           0 |           90 |
| Guide (`/files/*`)                                                    |      3,113 |         0 |                   0 |          0 |                           0 |          440 |
| Semester (`/vtu/{branch}/{sem}`)                                      |        310 |       310 |                   0 |        310 |                          20 |          288 |
| Programme (`/vtu/{branch}`)                                           |         41 |        41 |                   0 |         41 |                           0 |        1,402 |
| Translated kn/hi                                                      |        718 |       718 |                   0 |        718 |                         154 |          206 |
| Tools                                                                 |          6 |         6 |                   0 |          6 |   6 (calculators are forms) |          111 |
| Articles / updates / schemes / resources / site pages / home / `/vtu` |         54 |        52 |                   0 |         52 |                           4 |            — |
| Legacy `/semesters/*`                                                 |          9 |         0 |                   9 |          0 |                           — |           21 |
| **Total**                                                             | **11,041** | **6,195** |           **3,357** |  **2,847** |                             |              |

- Indexable, self-canonical pages missing from the sitemap: **0**. Sitemap URLs that are
  noindex or canonical elsewhere: **0**.
- Duplicate meta descriptions among indexable canonical pages: **0**. Duplicate titles: **0**
  (fixed in #5).
- Broken internal links: **8**, all the legacy semester self-links above.
- Orphan pages (no inbound link): **1** site page.
- 3,348 subject pages are first-year/shared courses that point their canonical at one owner
  programme; they are indexable but only the canonical copy is in the sitemap. That is
  intended.
- HTTP status of live URLs: **not measured** in this audit. `scripts/crawl.mjs` does this
  against production; run it before Phase 10.

## 4. Academic data (generated JSON vs. its own rules)

Measured by reading `courses.json`/`syllabus.json`. These are internal-consistency checks; a
line-by-line comparison against every official PDF is Phase 1 work and was **not done** here.

| Check                                                      |                                                                                                                                Result |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------: |
| Programmes / course records / unique codes / unique titles |                                                                                                            41 / 5,068 / 1,720 / 1,352 |
| Missing code, missing title, semester outside 1–8          |                                                                                                                             0 / 0 / 0 |
| Duplicate code within one programme and semester           |                                                                                                                                     0 |
| Records with no credits                                    |            **1,569** (mostly first-year stream baskets: CS 36/58, EE 41/67, ME 36/59, CV 35/53; also silk 18, textile 16, chemical 8) |
| Codes printed with different titles in different PDFs      |                                                                                                                                **45** |
| Codes with conflicting credits                             |                                                                                                                   1 (BBOK407: 3 vs 2) |
| Titles with table cells leaked in                          | **≥ 9**, e.g. `BAU786 Major Project Phase-II AU 0 0 12 03 100 100 400 300`, `BAU883 0 0 12 03 100 100 200 20 weeks)`, `BMT883 weeks)` |
| Two elective cells merged into one record                  |                 2 (`BAU755A … B AU 755C Human Resource Management`, `BAU755B … B AU 755D …`) — so BAU755C and BAU755D are **missing** |
| Titles ending mid-phrase in the data                       |                                                    4, e.g. `Engineering Mathematics for`, `Cyber Security Management, Compliance and` |
| L:T:P pattern inside the title                             |                                                                                                        24 (display now strips it, #5) |
| All-lower-case titles                                      |                                                                                                      49 (display now title-cases, #5) |
| Word split by a PDF line break                             |                                                                                                                      1 (`Machine ry`) |
| Syllabus: codes with ≥ 3 modules / fewer / none            |                                                                                                                       916 / 122 / 682 |
| Syllabus module titles that are placeholders               |                                                                                       9 (e.g. `BKBKK107 M1–M5: "1"`, `TREES(Cont..)`) |
| Notes files whose code has no course page                  |                                                                      **1: BPOPS103** (in `syllabus.json`, absent from `courses.json`) |

Programmes with weak syllabus coverage (modules for under 40 % of their codes):
biotechnology 27/126, eie 46/143, industrial-iot 31/87, vlsi 51/142, iem 30/126.

## 5. Content coverage

| Measure                              |                                                               Value |
| ------------------------------------ | ------------------------------------------------------------------: |
| Course codes with written notes      |                                                 12 of 1,720 (0.7 %) |
| Programmes with any notes            |                   CSE and the programmes that share those CSE codes |
| Codes with official syllabus modules |                                                          916 (53 %) |
| PYQs hosted                          |                     0 by design (official papers stay on vtu.ac.in) |
| Practice / important questions       | Generated study frames for every subject, `noindex` unless reviewed |

Subject pages already say "Notes" in the title only when notes exist (#5). The body of a
syllabus-only page still says "Every module with a study frame", which is honest but easy
to miss. A per-programme coverage report is Phase 2.

## 6. Mobile (live site, 320 px wide)

| Page                                                | Horizontal overflow             | Controls under 24 px |
| --------------------------------------------------- | ------------------------------- | -------------------: |
| `/`                                                 | none                            |                    0 |
| `/vtu`, `/vtu/cse`, `/vtu/cse/3rd-semester`         | none                            |                 8–12 |
| `/vtu/cse/3rd-semester/data-structures` (has notes) | **yes, 397 px** (C code blocks) |                   39 |
| `/tools/sgpa`, `/faq`, `/search?q=bcs304`           | none                            |                 7–12 |
| `/updates`                                          | none                            |                   38 |
| `/kn`                                               | **yes, 322 px**                 |                   16 |

Other widths (360–1440 px) **not measured**.

## 7. Performance

| Measure                     | Value                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| Build time (local, Windows) | 44 s for 11,041 pages                                                                            |
| Shared JS on every page     | `page.*.js` 2.5 kB + Google Tag Manager (third party)                                            |
| Heavy JS                    | `pdf.worker` 1.38 MB, `notes-pdf` 425 kB, `pdf-viewer` 330 kB — loaded only when a PDF is opened |
| Stylesheet                  | 46 kB, one file                                                                                  |
| HTML size                   | home 67 kB, subject with notes 124 kB, SGPA tool 30 kB                                           |
| Images in pages             | 0 `<img>` (icons are inline SVG: 109,823 across the build)                                       |
| LCP / INP / CLS             | **not measured** (no CrUX, Search Console or Lighthouse run in this audit)                       |

## 8. Dependencies

`npm outdated`: patch/minor updates available for `astro` (7.4.11), `tailwindcss`/
`@tailwindcss/vite` (4.3.5), `vite`, `prettier`, `typescript-eslint`. Major updates exist for
`eslint` 10, `typescript` 7, `pdfjs-dist` 6 — not urgent, each needs its own test pass.

## 9. Not measured in this audit

Search Console clicks, impressions and index coverage · Core Web Vitals (lab or field) ·
colour contrast · keyboard and screen-reader behaviour · live HTTP status of every URL ·
widths other than 320 px · a field-by-field comparison with every official scheme PDF.

## 10. Recommended order

1. **Phase 1 (critical):** add BPOPS103 to the course data so its notes appear; fix the
   automobile-scheme parsing (leaked cells, merged electives); resolve the 45 title conflicts
   and missing first-year credits against the PDFs; add a data validator that fails CI.
2. **Phase 8 quick fixes:** notes code-block overflow at 320 px; `Astro.url.pathname` bug.
3. **Phase 13:** run `scripts/audit-routes.mjs` in CI once the 8 broken links are fixed.
4. **Phase 2:** notes for the next programme, written from its official syllabus.
5. Phases 3–7 (dashboard, practice, revision, search) only after the data is trustworthy.

## How to reproduce

```sh
npm run lint && npm run typecheck && npm test && npm run build && npm run check:seo
npm run audit:routes -- --csv routes.csv   # route inventory, exits 1 on broken links
npm audit --omit=dev && npm outdated
```
