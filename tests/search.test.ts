import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { levenshtein, search, type SearchEntry } from "../src/lib/search.ts";

const hit = (t: string, h: string, k: SearchEntry["k"] = "subject"): SearchEntry => ({
  t,
  h,
  k,
  s: "",
  x: t.toLowerCase(),
});

describe("levenshtein", () => {
  it("is 0 for equal strings and 1 for a single substitution", () => {
    assert.equal(levenshtein("bcs304", "bcs304"), 0);
    assert.equal(levenshtein("bcs304", "bcs305"), 1);
    assert.equal(levenshtein("bcs403", "bcs430"), 2);
  });
});

describe("search", () => {
  const index = [
    hit("Data Structures (BCS304)", "/vtu/cse/3rd-semester/data-structures"),
    hit("Operating Systems (BCS303)", "/vtu/cse/3rd-semester/operating-systems"),
    hit("SGPA calculator", "/tools/sgpa", "tool"),
  ];
  it("ranks an exact course code first", () => {
    assert.equal(search(index, "BCS304")[0].h, "/vtu/cse/3rd-semester/data-structures");
  });
  it("still finds a one-letter mistyped code, below an exact match", () => {
    const rows = search(index, "BCS305");
    assert.ok(rows.some((r) => r.h.includes("data-structures")));
  });
});
