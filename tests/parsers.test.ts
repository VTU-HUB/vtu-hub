import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { parseSchemeRows } from "../scripts/vtu/parse-scheme.mjs";
import { parseSyllabusRows } from "../scripts/vtu/parse-syllabus.mjs";

// Each fixture holds text rows from a few pages of an official VTU PDF and what the
// parser read from them when the fixture was captured (scripts/vtu/capture-fixture.mjs).
const dir = path.resolve("tests/fixtures/vtu");
const fixtures = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort() : [];

describe("VTU PDF parser regressions", () => {
  it("has fixtures", () => assert.ok(fixtures.length >= 4, `only ${fixtures.length} fixtures`));
  for (const f of fixtures) {
    const fx = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    it(`${f.replace(/\.json$/, "")}: ${fx.why}`, () => {
      const got = fx.kind === "scheme" ? parseSchemeRows(fx.rows) : Object.fromEntries(parseSyllabusRows(fx.rows));
      assert.deepEqual(JSON.parse(JSON.stringify(got)), fx.expected);
    });
  }
});
