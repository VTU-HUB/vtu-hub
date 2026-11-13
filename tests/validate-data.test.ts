import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { codeSemester, validate } from "../scripts/vtu/validate-data.mjs";

const course = (over: Record<string, unknown> = {}) => ({
  code: "BCS301",
  title: "Mathematics for Computer Science",
  semester: 3,
  credits: 4,
  ...over,
});
const data = (courses: unknown[]) => ({
  streams: { cs: { courses: [] } },
  programs: [{ slug: "cse", name: "CSE", stream: "cs", sources: [{ url: "https://vtu.ac.in/x.pdf" }], courses }],
});

describe("codeSemester", () => {
  it("reads the semester digit from a code", () => {
    assert.equal(codeSemester("BCS301"), 3);
    assert.equal(codeSemester("BMATS101"), 1);
    assert.equal(codeSemester("BAU883"), 8);
    assert.equal(codeSemester("BCSL306B"), 3);
  });
});

describe("validate", () => {
  it("passes clean data", () => {
    const r = validate(data([course()]));
    assert.deepEqual(r.errors, []);
    assert.deepEqual(r.warnings, []);
  });

  it("fails on table cells, placeholders and cut-off titles", () => {
    const r = validate(
      data([
        course({ code: "BAU786", semester: 7, title: "Major Project Phase-II AU 0 0 12 03 100 100 400 300" }),
        course({ code: "BAU811A", semester: 8, title: "To be Announced on the VTU web portal" }),
        course({ code: "BCV501", semester: 5, title: "Engineering Mathematics for" }),
        course({ code: "BCV502", semester: 5, title: "" }),
      ]),
    );
    assert.equal(r.errors.length, 4, r.errors.join("\n"));
  });

  it("fails when the option letter was split off the code", () => {
    const r = validate(data([course({ code: "BESCK104", semester: 1, title: "C Introduction to Electronics Communication" })]));
    assert.match(r.errors[0], /option letter/);
  });

  it("fails when the semester disagrees with the code", () => {
    const r = validate(data([course({ semester: 4 })]));
    assert.match(r.errors[0], /code says 3/);
  });

  it("fails on duplicates, bad credits and malformed codes", () => {
    const r = validate(data([course(), course(), course({ code: "BCS302", credits: 40 }), course({ code: "XYZ" })]));
    assert.ok(r.errors.some((e) => /listed twice/.test(e)));
    assert.ok(r.errors.some((e) => /credits 40/.test(e)));
    assert.ok(r.errors.some((e) => /malformed/.test(e)));
  });

  it("fails when a notes file has no course", () => {
    const r = validate(data([course()]), { notesCodes: ["BPOPS103"] });
    assert.match(r.errors[0], /BPOPS103/);
  });

  it("only warns about missing credits and titles printed two ways", () => {
    const d = data([course({ credits: null })]);
    d.streams.cs.courses = [course({ title: "Maths for CS", credits: null })] as never[];
    const r = validate(d);
    assert.deepEqual(r.errors, []);
    assert.equal(r.warnings.length, 3, r.warnings.join("\n"));
  });
});
