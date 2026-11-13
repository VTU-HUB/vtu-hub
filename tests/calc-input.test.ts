import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  badCgpaRows,
  badSgpaRows,
  checkCgpaRows,
  checkMarks,
  checkNumbers,
  checkSgpaRows,
  inRange,
  readStored,
  writeStored,
} from "../src/lib/calc-input.ts";

const LETTERS = ["O", "A+", "A", "B+", "B", "C", "P", "F"];
const sgpaRow = { id: 1, name: "Maths", credits: 4, letter: "A" };

describe("readStored", () => {
  it("round-trips a versioned value", () => {
    assert.deepEqual(readStored(writeStored([sgpaRow]), (v) => checkSgpaRows(v, LETTERS)), [sgpaRow]);
  });
  it("still reads the old unversioned format when it is valid", () => {
    assert.deepEqual(readStored(JSON.stringify([sgpaRow]), (v) => checkSgpaRows(v, LETTERS)), [sgpaRow]);
  });
  it("rejects corrupt JSON, empty storage and wrong shapes", () => {
    const check = (v: unknown) => checkSgpaRows(v, LETTERS);
    assert.equal(readStored(null, check), null);
    assert.equal(readStored("{not json", check), null);
    assert.equal(readStored(JSON.stringify({ a: 1 }), check), null); // object, not rows
    assert.equal(readStored(JSON.stringify([]), check), null);
    assert.equal(readStored(JSON.stringify([{ ...sgpaRow, letter: "Z" }]), check), null);
    assert.equal(readStored(JSON.stringify([{ ...sgpaRow, credits: "4" }]), check), null);
    assert.equal(readStored(JSON.stringify([sgpaRow, null]), check), null);
  });
});

describe("shape checks", () => {
  it("accepts CGPA rows and rejects arrays where an object is expected", () => {
    assert.ok(checkCgpaRows([{ id: 1, name: "Sem 1", credits: 20, sgpa: 8.2 }]));
    assert.equal(checkMarks([]), null);
    assert.deepEqual(checkMarks({ scheme: "50", cie: 40, see: 30 }), { scheme: "50", cie: 40, see: 30 });
    assert.equal(checkMarks({ scheme: "60", cie: 40, see: 30 }), null);
    assert.deepEqual(checkNumbers({ obtained: 5, max: 10 }, ["obtained", "max"]), { obtained: 5, max: 10 });
    assert.equal(checkNumbers({ obtained: 5 }, ["obtained", "max"]), null);
  });
});

describe("range checks", () => {
  it("treats empty fields (NaN) as out of range", () => {
    assert.equal(inRange(Number.NaN, { min: 0, max: 10 }), false);
    assert.equal(inRange(10, { min: 0, max: 10 }), true);
  });
  it("counts rows the calculators leave out", () => {
    assert.equal(badSgpaRows([sgpaRow, { ...sgpaRow, credits: 15 }, { ...sgpaRow, credits: -1 }]), 2);
    assert.equal(
      badCgpaRows([
        { id: 1, name: "", credits: 20, sgpa: 8 },
        { id: 2, name: "", credits: 0, sgpa: 8 },
        { id: 3, name: "", credits: 20, sgpa: 11 },
      ]),
      2,
    );
  });
});
