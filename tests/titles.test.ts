import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cleanCourseTitle, shortCourseTitle } from "../src/lib/titles.ts";

describe("cleanCourseTitle", () => {
  it("drops the printed L:T:P credit pattern", () => {
    assert.equal(
      cleanCourseTitle("Building Information Modelling in Civil Engineering – Basics (0:0:2)"),
      "Building Information Modelling in Civil Engineering – Basics",
    );
  });
  it("title-cases titles printed in lower case", () => {
    assert.equal(cleanCourseTitle("Design of formwork and scaffolding"), "Design of Formwork and Scaffolding");
    assert.equal(
      cleanCourseTitle("Building services-hvac,acoustics and fire safety"),
      "Building Services-Hvac, Acoustics and Fire Safety",
    );
  });
  it("keeps mixed-case titles and acronyms as printed", () => {
    assert.equal(cleanCourseTitle("Introduction to Internet of Things (IOT)"), "Introduction to Internet of Things (IOT)");
    assert.equal(cleanCourseTitle("Basics to JAVA programming"), "Basics to JAVA programming");
    assert.equal(cleanCourseTitle("MERN"), "MERN");
    assert.equal(cleanCourseTitle("Object Oriented Programming with C++"), "Object Oriented Programming with C++");
  });
  it("normalises spacing and trailing punctuation", () => {
    assert.equal(cleanCourseTitle("  Rural ,Urban  Planning -"), "Rural, Urban Planning");
  });
});

describe("shortCourseTitle", () => {
  it("keeps titles that fit", () => {
    assert.equal(shortCourseTitle("Object Oriented Programming with Java"), "Object Oriented Programming with Java");
    assert.equal(shortCourseTitle("Analysis & Design of Algorithms"), "Analysis & Design of Algorithms");
  });
  it("never ends on a connecting word or symbol", () => {
    for (const raw of [
      "Rural, Urban Planning and Architecture and Landscape Design Principles",
      "Sustainable Design Concept for Building Services and Energy Systems",
      "Construction Equipment, Plants and Machinery Management Practice",
      "Signal Conditioning, Supervisory Control & Data Acquisition System (SCADA)",
    ]) {
      const s = shortCourseTitle(raw);
      assert.ok(s.length <= 40, s);
      assert.doesNotMatch(s, /\b(and|of|for|with|to|in|the)$|[,&:–-]$/i, s);
    }
  });
  it("drops parentheses", () => {
    assert.equal(shortCourseTitle("Introduction to Internet of Things (IOT)"), "Introduction to Internet of Things");
  });
});
