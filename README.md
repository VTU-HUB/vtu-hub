<div align="center">

# VTUHub

**Free, open-source study hub for VTU students**

Every programme, semester and subject on the 2022 scheme: official syllabus, module-wise
notes, PDFs, read-aloud, calculators and VTU notices, all in one place.

[**vtuhub.site**](https://vtuhub.site) ·
[Docs](docs/README.md) ·
[Contribute](CONTRIBUTING.md) ·
[Discussions](https://github.com/VTU-HUB/vtu-hub/discussions) ·
[Report a problem](https://github.com/VTU-HUB/vtu-hub/issues/new/choose)

[![CI](https://github.com/VTU-HUB/vtu-hub/actions/workflows/ci.yml/badge.svg)](https://github.com/VTU-HUB/vtu-hub/actions/workflows/ci.yml)
[![VTU data sync](https://github.com/VTU-HUB/vtu-hub/actions/workflows/sync-vtu.yml/badge.svg)](https://github.com/VTU-HUB/vtu-hub/actions/workflows/sync-vtu.yml)
[![Code: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)
[![Notes: CC BY-SA 4.0](https://img.shields.io/badge/notes-CC%20BY--SA%204.0-lightgrey.svg)](LICENSE)

</div>

## Features

- **All 2022-scheme programmes and subjects**: course codes, titles, credits and
  elective slots, read from VTU's official scheme PDFs. The 2025 scheme is not covered yet.
- **Official syllabus**: modules, outcomes and books where the syllabus PDF could be
  parsed. Not every course has usable module text yet.
- **Module-wise notes**: 13 hand-written subjects so far (mostly CSE). Other courses
  have generated study guides and syllabus-derived practice prompts — not VTU papers.
- **PDFs**: view or download the whole course or a single module, inside the site.
- **Read aloud**: listen to the notes, with play/pause, speed and "start at module".
- **Calculators**: SGPA, CGPA, marks needed and attendance.
- **VTU notices**: exam timetables, results and calendars, synced from vtu.ac.in.
- **Kannada and Hindi** versions of the main pages.

VTUHub never hosts question papers, scanned notes or textbook PDFs. Official material
stays on [vtu.ac.in](https://vtu.ac.in).

## Quick start

Requires Node.js 22.18 or newer.

```sh
git clone https://github.com/VTU-HUB/vtu-hub.git
cd vtu-hub
npm install
npm run dev        # http://localhost:8080
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 8080 |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built site |
| `npm test` | Unit tests |
| `npm run lint` / `npm run typecheck` | ESLint / `astro check` |
| `npm run check:seo` | Audit every built page |

## Project structure

```text
src/
  data/notes/      Study notes, one Markdown file per course code   ← start here
  data/vtu/        Course, syllabus and notice data (generated, don't edit)
  data/            Subjects, programmes, search index
  pages/           Routes (Astro)
  components/      UI components
  lib/             Grading maths and the PDF builder
  scripts/         Browser scripts (PDF viewer, dropdown search)
  i18n/            English, Kannada and Hindi strings
scripts/vtu/       Sync scripts that read vtu.ac.in
docs/              Documentation
```

More detail: [Architecture](docs/architecture.md) · [Data pipeline](docs/data-pipeline.md) ·
[Features](docs/features.md) · [Deployment](docs/deployment.md)

## Contributing

Contributions are welcome, and you don't need to be a programmer.

- **Fix or improve notes:** click **Edit this page on GitHub** under any notes section
  on vtuhub.site, edit the Markdown, and propose the change.
- **Write notes for a subject:** follow [Writing notes](docs/writing-notes.md).
- **Report a wrong title, module or link:** [open an issue](https://github.com/VTU-HUB/vtu-hub/issues/new/choose).
- **Ask or suggest:** [Discussions](https://github.com/VTU-HUB/vtu-hub/discussions).

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request, and follow the
[Code of Conduct](CODE_OF_CONDUCT.md). Changes are listed in [CHANGELOG.md](CHANGELOG.md).

## Contributors

Thanks to everyone who has helped build VTUHub.

<a href="https://github.com/VTU-HUB/vtu-hub/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=VTU-HUB/vtu-hub" alt="VTUHub contributors" />
</a>

## License

Code is released under the [MIT License](LICENSE). Study notes in `src/data/notes/` are
released under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
VTUHub is an independent project and is not affiliated with Visvesvaraya
Technological University.
