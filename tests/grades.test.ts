import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  attendance,
  cgpa,
  cgpaToPercentage,
  courseResult,
  gradeFromMarks,
  percentage,
  percentageError,
  sgpa,
} from "../src/lib/grades.ts";

describe("gradeFromMarks", () => {
  it("maps every band boundary on the VTU 10-point scale", () => {
    const cases: [number, string][] = [
      [100, "O"], [90, "O"], [89, "A+"], [80, "A+"], [79, "A"], [70, "A"],
      [69, "B+"], [60, "B+"], [59, "B"], [55, "B"], [54, "C"], [50, "C"],
      [49, "P"], [40, "P"], [39, "F"], [0, "F"],
    ];
    for (const [marks, letter] of cases) assert.equal(gradeFromMarks(marks).letter, letter, `${marks}`);
  });
  it("treats NaN as zero", () => assert.equal(gradeFromMarks(NaN).letter, "F"));
});

describe("sgpa", () => {
  it("is the credit-weighted mean of grade points", () => {
    const r = sgpa([
      { credits: 4, letter: "A" }, // 32
      { credits: 3, letter: "A+" }, // 27
      { credits: 3, letter: "B+" }, // 21
      { credits: 3, letter: "O" }, // 30
      { credits: 1, letter: "A+" }, // 9
    ]);
    assert.equal(r.points, 119);
    assert.equal(r.credits, 14);
    assert.equal(r.value.toFixed(2), "8.50");
  });
  it("keeps failed credits in the denominator", () => {
    assert.equal(sgpa([{ credits: 4, letter: "O" }, { credits: 4, letter: "F" }]).value, 5);
  });
  it("skips zero-credit rows and unknown letters, and returns 0 when empty", () => {
    assert.equal(sgpa([{ credits: 0, letter: "O" }, { credits: 3, letter: "Z" }]).value, 0);
    assert.equal(sgpa([]).value, 0);
  });
  it("leaves DX AU AB PP NP IC out of SGPA (22OB 6.2) and explains why", () => {
    const r = sgpa([
      { credits: 4, letter: "A" },
      { credits: 3, letter: "DX" },
      { credits: 2, letter: "AB" },
      { credits: 1, letter: "PP" },
    ]);
    assert.equal(r.value, 8);
    assert.equal(r.credits, 4);
    assert.deepEqual(r.excluded.map((e) => e.letter), ["DX", "AB", "PP"]);
  });
});

describe("cgpa", () => {
  it("weights each semester by its credits", () => {
    const r = cgpa([{ credits: 20, sgpa: 8 }, { credits: 25, sgpa: 9 }]);
    assert.equal(r.credits, 45);
    assert.equal(r.value.toFixed(4), ((160 + 225) / 45).toFixed(4));
  });
  it("converts to percentage with CGPA × 10 (2022 Regulations, 22OB 6.7)", () => {
    assert.equal(cgpaToPercentage(8.2).toFixed(1), "82.0"); // the regulation's own example
    assert.equal(cgpaToPercentage(8.5).toFixed(1), "85.0");
    assert.equal(cgpaToPercentage(6), 60);
    assert.equal(cgpaToPercentage(10), 100);
    assert.equal(cgpaToPercentage(0), 0);
  });
  it("clamps out-of-range and non-numeric CGPA", () => {
    assert.equal(cgpaToPercentage(12), 100);
    assert.equal(cgpaToPercentage(-1), 0);
    assert.equal(cgpaToPercentage(Number.NaN), 0);
  });
});

describe("courseResult (2022 scheme, 50 + 50)", () => {
  it("passes when CIE ≥ 20, SEE ≥ 17.5 and total ≥ 40", () => {
    const r = courseResult("50", 20, 20);
    assert.equal(r.pass, true);
    assert.equal(r.grade.letter, "P");
  });
  it("fails on SEE below 35% even with a high total", () => {
    const r = courseResult("50", 45, 15);
    assert.equal(r.total, 60);
    assert.equal(r.seeOk, false);
    assert.equal(r.grade.letter, "F");
  });
  it("fails on CIE below 40% even with a high total", () => {
    const r = courseResult("50", 19, 40);
    assert.equal(r.cieOk, false);
    assert.equal(r.grade.letter, "F");
  });
  it("fails on total below 40 when both components clear their minimums", () => {
    const r = courseResult("50", 20, 18);
    assert.equal(r.cieOk && r.seeOk, true);
    assert.equal(r.pass, false);
  });
  it("clamps marks to each component's maximum", () => {
    assert.equal(courseResult("50", 80, 80).total, 100);
    assert.equal(courseResult("50", -5, 30).total, 30);
  });
});

describe("courseResult (2018 scheme, 40 + 60)", () => {
  // 18OB 8.1(b) CIE 40% of 40 = 16; 18OB 8.9(e) SEE 35% of 60 = 21 and total ≥ 40.
  it("uses 16/40 CIE and 21/60 SEE minimums from 18OB 8.1(b) and 8.9(e)", () => {
    assert.equal(courseResult("40", 30, 21).grade.letter, "C");
    assert.equal(courseResult("40", 30, 20).seeOk, false);
    assert.equal(courseResult("40", 15, 50).cieOk, false);
    assert.equal(courseResult("40", 16, 21).pass, false); // 37 total
    assert.equal(courseResult("40", 16, 24).pass, true); // 40 total, both minima
  });
});

describe("attendance", () => {
  it("counts the consecutive classes needed to reach the target", () => {
    const r = attendance(42, 56, 85);
    assert.equal(r.pct, 75);
    assert.equal(r.need, 38); // 80/94 = 85.1%, 79/93 = 84.9%
  });
  it("counts the classes that can be missed while staying on target", () => {
    assert.equal(attendance(90, 100, 85).canMiss, 5); // 90/105 = 85.7%, 90/106 = 84.9%
    assert.equal(attendance(85, 100, 85).canMiss, 0);
    assert.equal(attendance(85, 100, 85).onTrack, true);
  });
  it("clamps a 0% or 100% target instead of dividing by zero", () => {
    assert.ok(Number.isFinite(attendance(10, 20, 0).canMiss));
    assert.ok(Number.isFinite(attendance(10, 20, 100).need));
  });
  it("returns 0% when no classes were held", () => assert.equal(attendance(0, 0, 85).pct, 0));
});

describe("percentage", () => {
  it("divides and guards a zero maximum", () => {
    assert.equal(percentage(78, 100), 78);
    assert.equal(percentage(5, 0), 0);
  });
});

describe("input validation", () => {
  it("flags attended > conducted and caps the percentage at 100", () => {
    const r = attendance(60, 50, 85);
    assert.equal(r.error, "attended-gt-conducted");
    assert.equal(r.pct, 100);
  });
  it("flags negative attendance input", () => assert.equal(attendance(-1, 10, 85).error, "negative"));
  it("accepts valid attendance input", () => assert.equal(attendance(42, 56, 85).error, null));
  it("flags obtained > max and negative marks", () => {
    assert.equal(percentageError(110, 100), "obtained-gt-max");
    assert.equal(percentageError(-5, 100), "negative");
    assert.equal(percentageError(78, 100), null);
  });
});
