import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { syllabusInCatalogue } from "../src/lib/coverage-count.ts";

describe("syllabusInCatalogue", () => {
  it("counts only codes that are in the catalogue", () => {
    const syl = {
      BCS304: { modules: [{}, {}, {}], outcomes: ["a"], textbooks: ["t"] },
      GHOST: { modules: [{}, {}, {}], outcomes: ["a"], textbooks: ["t"] },
      BCS301: { modules: [{}], outcomes: [], textbooks: [] },
    };
    const r = syllabusInCatalogue(["BCS304", "BCS301"], syl);
    assert.equal(r.withModules, 1);
    assert.equal(r.withOutcomes, 1);
    assert.equal(r.withBooks, 1);
  });
});
