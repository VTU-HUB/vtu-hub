import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { coverageByProgramme, mergeSyllabus, syncProblems } from "../scripts/vtu/syllabus-merge.mjs";
import { detectExceptions, mergeRegister } from "../scripts/vtu/exceptions.mjs";

const mods = (n: number) => Array.from({ length: n }, (_, i) => ({ number: i + 1, title: `Module ${i + 1} topic` }));
const entry = (src: string, n = 5) => ({ source: src, sources: [src], modules: mods(n), outcomes: [] });

describe("mergeSyllabus", () => {
  const prev = { BCS301: entry("a.pdf"), BCS302: entry("b.pdf"), BCS303: entry("c.pdf") };

  it("keeps courses whose PDF failed instead of deleting them", () => {
    const { courses, report } = mergeSyllabus(prev, { BCS301: entry("a.pdf") }, { failedSources: ["b.pdf"] });
    assert.deepEqual(Object.keys(courses), ["BCS301", "BCS302"]);
    assert.deepEqual(report.kept, ["BCS302"]);
    assert.deepEqual(report.removed, ["BCS303"]);
  });

  it("keeps the previous entry when a course suddenly has fewer modules", () => {
    const { courses, report } = mergeSyllabus(prev, { ...prev, BCS301: entry("a.pdf", 2) });
    assert.equal(courses.BCS301.modules.length, 5);
    assert.deepEqual(report.regressions, [{ code: "BCS301", was: 5, now: 2 }]);
    const accepted = mergeSyllabus(prev, { ...prev, BCS301: entry("a.pdf", 2) }, { acceptRegressions: true });
    assert.equal(accepted.courses.BCS301.modules.length, 2);
  });

  it("reports new codes", () => {
    const { report } = mergeSyllabus(prev, { ...prev, BCS304: entry("d.pdf") });
    assert.deepEqual(report.added, ["BCS304"]);
  });
});

describe("syncProblems", () => {
  const programs = [{ slug: "cse", courses: ["BCS301", "BCS302", "BCS303", "BCS304", "BCS305", "BCS306"].map((code) => ({ code })) }];
  const full = Object.fromEntries(programs[0].courses.map((c) => [c.code, entry("x.pdf")]));
  const empty = { added: [], removed: [], kept: [], regressions: [] };
  const base = { report: empty, prevCoverage: coverageByProgramme(programs, full), sources: 100, failed: 0, total: 500 };

  it("passes a normal run", () => {
    assert.deepEqual(syncProblems({ ...base, nextCoverage: coverageByProgramme(programs, full) }), []);
  });
  it("refuses when too many PDFs fail, too many codes vanish or coverage drops", () => {
    const { BCS301, BCS302, ...rest } = full;
    void BCS301;
    void BCS302;
    const p = syncProblems({
      ...base,
      failed: 30,
      report: { ...empty, removed: Array.from({ length: 30 }, (_, i) => `BX${i}`) },
      nextCoverage: coverageByProgramme(programs, rest),
    });
    assert.equal(p.length, 3, p.join("\n"));
  });
});

describe("exception register", () => {
  const courses = {
    streams: { cs: { courses: [{ code: "BPLCK205A", title: "Web Programming", semester: 2, credits: null }] } },
    programs: [
      { slug: "cv", sources: [{ url: "https://vtu.ac.in/pdf/2022_3to8/civsch.pdf" }], courses: [{ code: "BBOK407", title: "Biology For Engineers", semester: 4, credits: 3 }] },
      { slug: "aiml", sources: [{ url: "https://vtu.ac.in/pdf/2022_3to8/aimlsch.pdf" }], courses: [{ code: "BBOK407", title: "Biology for Computer Science", semester: 4, credits: 2 }] },
    ],
  };

  it("detects missing credits, credit conflicts and title variants with their PDFs", () => {
    const d = detectExceptions(courses);
    assert.deepEqual(Object.keys(d).sort(), ["credit-conflict:BBOK407", "missing-credits:BPLCK205A", "title-variants:BBOK407"]);
    assert.match(d["missing-credits:BPLCK205A"].evidence, /Elective option/);
    assert.deepEqual(
      d["credit-conflict:BBOK407"].parsed.map((p: { value: number; programmes: string[] }) => [p.value, p.programmes]),
      [
        [2, ["aiml"]],
        [3, ["cv"]],
      ],
    );
  });

  it("keeps reviewer fields across re-runs and drops items that are fixed", () => {
    const d = detectExceptions(courses);
    const reviewed = {
      "credit-conflict:BBOK407": { resolution: "confirmed-in-source", expected: "3 (cv), 2 (aiml)", reviewer: "x", verifiedOn: "2026-11-13" },
      "missing-credits:BGONE101": { resolution: "open" },
    };
    const { items, gone } = mergeRegister(reviewed, d);
    assert.equal(items["credit-conflict:BBOK407"].resolution, "confirmed-in-source");
    assert.equal(items["credit-conflict:BBOK407"].reviewer, "x");
    assert.equal(items["missing-credits:BPLCK205A"].resolution, "open");
    assert.deepEqual(gone, ["missing-credits:BGONE101"]);
  });
});
