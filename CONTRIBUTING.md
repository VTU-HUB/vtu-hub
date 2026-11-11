# Contributing to VTUHub

Thanks for helping VTU students. Anyone can contribute: fix a typo in the notes,
write notes for a subject, report a wrong course title, or improve the code.

- **Questions and ideas:** [GitHub Discussions](https://github.com/nishanth-kj/vtu-hub/discussions)
- **Something is wrong on the site:** [open an issue](https://github.com/nishanth-kj/vtu-hub/issues/new/choose)
- **Full docs:** [docs/](docs/README.md)

## The quickest contribution: edit a note on GitHub

Every notes section on vtuhub.site has an **Edit this page on GitHub** link.

1. Click it. GitHub opens the Markdown file, for example `src/data/notes/BCS502.md`.
2. Click the pencil icon. GitHub makes a copy (a fork) for you automatically.
3. Make your change and choose **Propose changes**, then **Create pull request**.

You don't need to install anything. A maintainer reviews it, and once merged the
site rebuilds by itself.

## Writing notes for a new subject

Notes are plain Markdown, one file per VTU course code, in `src/data/notes/`.
Read [docs/writing-notes.md](docs/writing-notes.md) for the full format. In short:

~~~md
---
code: BCS502
title: Computer Networks
updated: 2026-11-12
textbook: "Author, Book title (Edition)"
---

## Module 1 — Title of the module

> **In short:** two or three plain sentences that explain the whole module.

### First topic

Simple explanation, short bullet points, a table or a flow diagram:

```flow
Step one -> Step two -> Step three
```

## Exam tips

- What students should practise.
~~~

Rules for notes:

- **Follow VTU's official module list** for that course (shown on the subject page).
  One `## Module N — …` heading per module, in order.
- **Write in your own words.** Never paste from textbooks, other websites, PDFs or
  slides. Copied text is removed, because it breaks copyright and gets the site
  penalised by Google.
- **Keep it simple.** Short sentences, bold the key terms, one idea per bullet.
- **No uploaded files.** Do not add question papers, scanned notes or textbook PDFs.
  The site generates its own PDFs from the Markdown.
- **No invented facts about VTU** (marks, dates, rules). Link to vtu.ac.in instead.

## Working on the code

You need Node.js 22.18 or newer.

```sh
git clone https://github.com/nishanth-kj/vtu-hub.git
cd vtu-hub
npm install
npm run dev          # http://localhost:8080
```

Before opening a pull request, run everything CI runs:

```sh
npm run lint && npm run typecheck && npm test && npm run build && npm run check:seo
```

Read [AGENTS.md](AGENTS.md) for the hard rules (static only, URL format, no hosted
VTU documents, course data only from the sync scripts, translations, line endings).
[docs/architecture.md](docs/architecture.md) explains how the pieces fit together.

## Pull request checklist

- [ ] One topic per pull request, with a clear title.
- [ ] All checks above pass.
- [ ] No files from other sources (PDFs, copied text, images you don't own).
- [ ] New English UI strings also have Kannada and Hindi versions (`src/i18n/`).
- [ ] [CHANGELOG.md](CHANGELOG.md) updated under **Unreleased** for visible changes.

## Licence

By contributing you agree that your code is released under the MIT License and your
notes under CC BY-SA 4.0, as described in [LICENSE](LICENSE).

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).
