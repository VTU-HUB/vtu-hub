/**
 * Live counts of what VTUHub actually has. Used by /coverage and the About page.
 * Built from the same JSON the site renders — never a hand-typed total.
 */
import { branches } from "@/data/branches";
import { notesCodes } from "@/data/notes";
import { resources } from "@/data/resources";
import { subjects } from "@/data/subjects";
import { syllabusInCatalogue } from "@/lib/coverage-count";
import courseData from "@/data/vtu/courses.json";
import syllabusData from "@/data/vtu/syllabus.json";

type SyllabusEntry = { modules?: { title?: string }[]; outcomes?: string[]; textbooks?: string[] };

export { syllabusInCatalogue };

export function coverageStats() {
  const programs = (courseData as { programs?: { slug: string; courses: unknown[] }[] }).programs ?? [];
  const streams = Object.values((courseData as { streams?: Record<string, { courses: unknown[] }> }).streams ?? {});
  const records = programs.reduce((n, p) => n + (p.courses?.length ?? 0), 0) + streams.reduce((n, s) => n + (s.courses?.length ?? 0), 0);
  const unique = new Set(subjects.map((s) => s.code));
  const withCredits = new Set(subjects.filter((s) => s.credits != null).map((s) => s.code));
  const syl = (syllabusData as { courses: Record<string, SyllabusEntry> }).courses;
  const inCat = syllabusInCatalogue(unique, syl);
  const notes = notesCodes.length;
  const generatedSubjects = new Set(resources.map((r) => `${r.branch}/${r.semester}/${r.subjectSlug}`)).size;
  return {
    programmes: branches.length,
    records,
    uniqueCodes: unique.size,
    withCredits: withCredits.size,
    withModules: inCat.withModules,
    withOutcomes: inCat.withOutcomes,
    withBooks: inCat.withBooks,
    notes,
    generatedGuides: generatedSubjects,
    generatedFiles: resources.length,
    scheme: "2022",
    scheme2025: "partial — first-year codes listed, 3rd–8th not in the catalogue",
  };
}
