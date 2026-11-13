import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  areaOf,
  avatarUrl,
  buildContributors,
  githubFromEmail,
  initials,
  isAutomated,
  notesCode,
  parseGitLog,
  type RawCommit,
} from "../src/lib/contributors.ts";

const RS = "\x1e";
const US = "\x1f";
const GS = "\x1d";
const logEntry = (sha: string, name: string, email: string, date: string, subject: string, trailers: string[], numstat: string[]) =>
  `${RS}${[sha, name, email, date, subject, trailers.join(GS)].join(US)}\n\n${numstat.join("\n")}\n`;

const commit = (over: Partial<RawCommit>): RawCommit => ({
  sha: "a".repeat(40),
  name: "Asha Rao",
  email: "asha@example.com",
  date: "2026-10-01",
  subject: "docs: fix typo",
  coAuthors: [],
  files: [{ path: "README.md", additions: 1, deletions: 1 }],
  ...over,
});

describe("parseGitLog", () => {
  it("reads fields, numstat lines, binary files, renames and co-authors", () => {
    const text =
      logEntry("1".repeat(40), "Asha Rao", "Asha@Example.com", "2026-10-02", "notes: BCS301 module 2", ["Ravi K <ravi@example.com>"], [
        "10\t2\tsrc/data/notes/BCS301.md",
        "-\t-\tpublic/og.jpg",
        "3\t3\tsrc/{old => new}/file.ts",
      ]) + logEntry("2".repeat(40), "Ravi K", "ravi@example.com", "2026-10-01", "fix", [], []);
    const [a, b] = parseGitLog(text);
    assert.equal(a.email, "asha@example.com");
    assert.deepEqual(a.coAuthors, [{ name: "Ravi K", email: "ravi@example.com" }]);
    assert.deepEqual(
      a.files.map((f) => [f.path, f.additions, f.deletions]),
      [
        ["src/data/notes/BCS301.md", 10, 2],
        ["public/og.jpg", 0, 0],
        ["src/new/file.ts", 3, 3],
      ],
    );
    assert.equal(b.files.length, 0);
  });
});

describe("identity helpers", () => {
  it("reads a GitHub login and id from noreply addresses only", () => {
    assert.deepEqual(githubFromEmail("138886231+nishanth-kj@users.noreply.github.com"), { login: "nishanth-kj", id: "138886231" });
    assert.deepEqual(githubFromEmail("octocat@users.noreply.github.com"), { login: "octocat", id: null });
    assert.equal(githubFromEmail("someone@gmail.com"), null);
  });
  it("skips bots and AI tools but not people whose names end in -bot letters", () => {
    for (const n of ["vtuhub-bot", "dependabot[bot]", "github-actions", "Grok", "Claude", "Copilot"]) assert.ok(isAutomated(n), n);
    assert.ok(isAutomated("Someone", "noreply@anthropic.com"));
    assert.ok(!isAutomated("Abbot Kumar"));
    assert.ok(!isAutomated("Asha Rao"));
  });
  it("classifies paths", () => {
    assert.equal(notesCode("src/data/notes/bcs301.md"), "BCS301");
    assert.equal(notesCode("src/data/notes.ts"), null);
    assert.equal(areaOf("src/data/notes/BCS301.md"), "notes");
    assert.equal(areaOf("src/data/vtu/courses.json"), "data");
    assert.equal(areaOf("scripts/vtu/parse-scheme.mjs"), "data");
    assert.equal(areaOf("docs/QUALITY_AUDIT.md"), "docs");
    assert.equal(areaOf("src/pages/index.astro"), "code");
  });
  it("builds avatars and initials", () => {
    assert.match(avatarUrl({ login: "x", githubId: "42" })!, /\/u\/42\?/);
    assert.match(avatarUrl({ login: "x", githubId: null })!, /github\.com\/x\.png/);
    assert.equal(avatarUrl({ login: null, githubId: null }), null);
    assert.equal(initials("Asha Rao"), "AR");
    assert.equal(initials("nishanth-kj"), "NK");
  });
});

describe("buildContributors", () => {
  const owner = "138886231+nishanth-kj@users.noreply.github.com";
  const list = buildContributors([
    commit({ sha: "1".repeat(40), name: "Nishanth", email: owner, date: "2026-11-13", files: [{ path: "src/data/notes/BCS301.md", additions: 5, deletions: 1 }] }),
    commit({ sha: "2".repeat(40), name: "Nishanth", email: "personal@example.com", date: "2026-09-06" }),
    commit({ sha: "3".repeat(40), name: "nishanth-kj", email: "personal@example.com", date: "2026-10-01" }),
    commit({ sha: "4".repeat(40), name: "Asha Rao", email: "asha@example.com", coAuthors: [{ name: "Nishanth", email: owner }] }),
    commit({ sha: "5".repeat(40), name: "vtuhub-bot", email: "vtuhub-bot@users.noreply.github.com" }),
    commit({ sha: "6".repeat(40), name: "Grok", email: "grok-export@users.noreply.github.com" }),
  ]);

  it("merges a person's addresses into the GitHub account and drops bots", () => {
    assert.deepEqual(
      list.map((c) => [c.slug, c.name, c.commits]),
      [
        ["nishanth-kj", "Nishanth", 4],
        ["asha-rao", "Asha Rao", 1],
      ],
    );
  });

  it("records notes, areas, dates and co-authorship", () => {
    const n = list[0];
    assert.deepEqual(n.notes, ["BCS301"]);
    assert.equal(n.first, "2026-09-06");
    assert.equal(n.last, "2026-11-13");
    assert.equal(n.areas.notes, 1);
    assert.equal(n.history[0].date, "2026-11-13");
    assert.equal(n.history.find((h) => h.sha === "4".repeat(40))?.coAuthor, true);
    assert.equal(n.githubId, "138886231");
  });

  it("never exposes an email address", () => {
    assert.doesNotMatch(JSON.stringify(list), /@/);
  });

  it("gives every contributor a unique slug", () => {
    const twins = buildContributors([
      commit({ sha: "7".repeat(40), name: "Asha Rao", email: "a@example.com" }),
      commit({ sha: "8".repeat(40), name: "Asha  Rao!", email: "b@example.com" }),
    ]);
    assert.equal(new Set(twins.map((c) => c.slug)).size, twins.length);
  });
});
