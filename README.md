# VTUHub

Independent study site for Visvesvaraya Technological University (VTU) students: original subject guides, scheme explainers and in-browser SGPA / CGPA / marks / attendance calculators, organised by branch, semester and subject. Live at [vtuhub.site](https://vtuhub.site).

VTUHub does not host university question papers, scanned notes or any VTU documents. Everything on the site is original writing that points students back to [vtu.ac.in](https://vtu.ac.in) for official material.

## Stack

- [Astro 7](https://astro.build), fully static (`output: "static"`, `build.format: "file"`)
- Tailwind CSS 4
- Deployed as static assets on Cloudflare Workers ([wrangler.jsonc](wrangler.jsonc))
- English, Kannada (`/kn`) and Hindi (`/hi`) for the main pages

## Getting started

Requires Node 22.18 or newer (the tests use Node's built-in TypeScript support).

```sh
npm install
npm run dev        # http://localhost:8080
```

| Command             | What it does                                           |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Dev server on port 8080                                |
| `npm run build`     | Static build into `dist/` (about 2,000 pages)          |
| `npm run preview`   | Serve the built `dist/`                                |
| `npm test`          | Unit tests for the grading maths (`tests/`)            |
| `npm run typecheck` | `astro check`                                          |
| `npm run lint`      | ESLint                                                 |
| `npm run check:seo` | Audits every page in `dist/` (titles, meta, links)     |
| `npm run icons`     | Regenerates favicons and app icons                     |

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs lint, typecheck, tests, build and the SEO check on every pull request.

## Where things live

| Path                         | Contents                                                                 |
| ---------------------------- | ------------------------------------------------------------------------ |
| `src/data/branches.ts`       | Branches and semester helpers                                            |
| `src/data/subjects.ts`       | Every subject: code, credits, scheme, units                              |
| `src/data/resources.ts`      | Generates the `/files/*` study guides from subjects + templates          |
| `src/data/reviewed-guides.json` | Guide IDs a person has reviewed — only these are indexed by search engines |
| `src/data/articles.ts`       | Hand-written articles under `/articles`                                  |
| `src/data/updates.ts`        | Exam / results / calendar explainers under `/updates`                   |
| `src/lib/grades.ts`          | Pure grading maths (SGPA, CGPA, pass rules, attendance) — tested         |
| `src/scripts/calculators.ts` | Calculator UI, uses `src/lib/grades.ts`                                  |
| `src/i18n/`                  | UI strings and translations                                              |
| `src/data/ads.ts`            | AdSense config — paste a `ca-pub-…` id to enable                         |
| `src/data/analytics.ts`      | Cloudflare Web Analytics token — empty means off                         |

## Live VTU data (automatic)

The site's course and notice data comes straight from vtu.ac.in and refreshes itself:

| Data | Script | Source | Output |
| --- | --- | --- | --- |
| Every 2022-scheme programme, course code, title, credits, elective slot | `scripts/vtu/sync-schemes.mjs` | Scheme PDFs discovered on [vtu.ac.in/en/b-e-scheme-syllabus](https://vtu.ac.in/en/b-e-scheme-syllabus/) | `src/data/vtu/courses.json` |
| Exam timetables, results/revaluation, calendars, circulars | `scripts/vtu/sync-notices.mjs` | vtu.ac.in WordPress REST API | `src/data/vtu/notices.json` |

[`.github/workflows/sync-vtu.yml`](.github/workflows/sync-vtu.yml) runs notices every 6 hours and schemes daily, builds and checks the site, and commits only when VTU's data actually changed — which triggers the Cloudflare deploy. Run either script by hand with `node scripts/vtu/sync-notices.mjs` / `node scripts/vtu/sync-schemes.mjs`.

- A programme whose PDF parses badly is **skipped and reported**, never guessed. CSE, ISE, ECE, EEE, ME and Civil must always sync or the run fails without writing.
- Known PDF typos and unreadable title cells are corrected in `scripts/vtu/title-fixes.json` (only with the value printed in the official PDF).
- Official programme names, codes and first-year streams: `scripts/vtu/programs.mjs`. Never change an existing `slug` — it is the URL.
- Old URLs from before the switch are kept alive by 301s generated from `src/data/vtu/legacy-urls.json` into `dist/_redirects` at build time.
- A course shared by several programmes (e.g. BCS301) has one canonical page (the programme that owns the code prefix); copies point their canonical there and stay out of the sitemap.

## Search engines, analytics and ads

- `/sitemap.xml` (and `/sitemap-index.xml`) list every indexable page; both are in `robots.txt`.
- Verification codes for Google Search Console, Bing and Yandex: `siteVerification` in `src/data/analytics.ts`.
- Google Analytics 4 / Cloudflare Web Analytics: `analyticsConfig` in the same file (empty = off; the privacy policy updates itself).
- IndexNow (Bing, Yandex…): `.github/workflows/indexnow.yml` submits every sitemap URL after each deploy of `main`. Key file: `public/0f64dbc213419a25149e73d56cf9b2ec.txt`.
- AdSense: put the `ca-pub-…` id in `src/data/ads.ts`; `/ads.txt` is generated from it.

## Content and indexing rules

- **Generated guides are `noindex` by default.** The `/files/*` pages and the subject resource-type pages are built from templates, so they stay out of search and out of the sitemap until reviewed. To publish one: rewrite or review it, then add its id to `src/data/reviewed-guides.json`. The sitemap reads each built page's robots tag, so it always matches.
- **Dates are real.** Generated guides show the last git commit that touched `resources.ts` or `subjects.ts`. Articles and updates carry hand-set dates — change them only when the text actually changes.
- **No official documents.** Never add VTU question papers, scheme PDFs or third-party notes. Link to vtu.ac.in instead.
- **Subject data must be verified** against the official VTU scheme PDF before it is added.

## Deploying

Cloudflare Workers Builds deploys `main` automatically (`npm run build`, then serves `dist/`). Preview builds run for other branches.
