/**
 * Every subject on the site, built from VTU's official 2022-scheme PDFs.
 *
 * The course list (code, title, credits, semester, electives) comes from
 * src/data/vtu/courses.json, written by scripts/vtu/sync-schemes.mjs and refreshed by
 * the "Sync VTU data" GitHub Action. Hand-written extras (URL slug, description, unit
 * outline) are reused from legacy-subjects.ts only when the official code AND title match.
 */
import { branches, semesterName } from "@/data/branches";
import { legacySubjects } from "@/data/legacy-subjects";
import type { BranchSlug, Subject, SubjectKind } from "@/data/types";
import { isPedagogyOutcome } from "@/lib/outcomes.mjs";
import courseData from "@/data/vtu/courses.json";
import syllabusData from "@/data/vtu/syllabus.json";

type Syllabus = {
  source: string;
  sources?: string[];
  modules: { number: number; title: string; topics: string }[];
  outcomes: string[];
  textbooks: string[];
  references: string[];
  links: string[];
};

function pdfBase(url: string) {
  try {
    return decodeURIComponent(new URL(url).pathname.split("/").pop() ?? "");
  } catch {
    return "";
  }
}

/** Programme PDF when this code is in it. Otherwise name the PDF the text actually came from. */
function syllabusLinks(code: string, semester: number, programSyllabi: string[], syl: Syllabus | undefined): { syllabusUrl?: string; moduleSourceUrl?: string } {
  if (!syl) return {};
  const sources = syl.sources?.length ? syl.sources : syl.source ? [syl.source] : [];
  const own = programSyllabi.filter((u) => sources.includes(u));
  const bySemester = own.find((u) => pdfBase(u).startsWith(String(semester)));
  const perCourse = sources.find((u) => pdfBase(u).toUpperCase().startsWith(code.toUpperCase()));
  const syllabusUrl = bySemester ?? own[0] ?? perCourse;
  if (syllabusUrl) return { syllabusUrl };
  return syl.source ? { moduleSourceUrl: syl.source } : {};
}
const syllabi = (syllabusData as { courses: Record<string, Syllabus> }).courses;

type Course = {
  code: string;
  title: string;
  semester: number;
  credits: number | null;
  type?: string | null;
  category: string;
  elective: boolean;
  group: string | null;
};

const TYPE_LABEL: Record<string, string> = {
  IPCC: "integrated theory + lab",
  PCC: "professional core",
  PCCL: "professional core lab",
  ESC: "engineering science",
  ETC: "emerging technology",
  PLC: "programming language",
  BSC: "basic science",
  PEC: "professional elective",
  OEC: "open elective",
  AEC: "ability enhancement",
  SEC: "skill enhancement",
  UHV: "universal human values",
  PROJ: "project",
  INT: "internship",
};

const CATEGORY_LABEL: Record<string, string> = {
  core: "core",
  lab: "laboratory",
  project: "project / internship",
  "professional-elective": "professional elective",
  "open-elective": "open elective",
  elective: "elective",
  ability: "ability enhancement",
  common: "common",
};

const words = (s: string) =>
  new Set(
    s
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9+]+/g, " ")
      .split(" ")
      .filter((w) => w.length > 2 && !["and", "the", "for", "with", "lab", "laboratory"].includes(w)),
  );

/** Titles agree when most of the shorter title's words appear in the longer one. */
function sameTitle(a: string, b: string) {
  const A = words(a);
  const B = words(b);
  if (!A.size || !B.size) return false;
  let hit = 0;
  for (const w of A) if (B.has(w)) hit++;
  return hit / Math.min(A.size, B.size) >= 0.6;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\+\+/g, "pp")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
}

function shortTitle(title: string) {
  const t = title.replace(/\s*\(.*?\)\s*/g, " ").trim();
  return t.length <= 28 ? t : t.split(/\s+/).slice(0, 4).join(" ");
}

function kindOf(c: Course): SubjectKind {
  if (c.category === "lab") return "lab";
  if (c.category === "project") return "project";
  if (c.category === "ability" || c.category === "common") return "ability";
  return "theory";
}

const GENERIC_UNIT = "Introduction and fundamentals";

function describe(c: Course, programName: string) {
  const kind = (c.type && TYPE_LABEL[c.type]) || CATEGORY_LABEL[c.category] || "course";
  const credits = c.credits != null ? `${c.credits}-credit ` : "";
  const elective = c.elective && c.group ? ` It is one of the options in elective slot ${c.group}.` : "";
  return `${c.title} (${c.code}) is a ${credits}${kind} course in the ${semesterName(c.semester)} of VTU's 2022-scheme ${programName} programme.${elective}`;
}

function build(): Subject[] {
  const out: Subject[] = [];
  const programs = courseData.programs as {
    slug: string;
    name: string;
    stream: string | null;
    sources: { url: string }[];
    syllabi?: string[];
    courses: Course[];
  }[];
  const streams = courseData.streams as Record<string, { sources: { url: string }[]; courses: Course[] }>;

  for (const p of programs) {
    const branch = branches.find((b) => b.slug === p.slug);
    if (!branch) continue;
    const firstYear = p.stream && streams[p.stream] ? streams[p.stream] : null;
    const list: { c: Course; source: string }[] = [
      ...(firstYear?.courses ?? []).map((c) => ({ c, source: firstYear!.sources[0]?.url ?? "" })),
      ...p.courses.map((c) => ({ c, source: p.sources[0]?.url ?? "" })),
    ];
    const used = new Set<string>();
    for (const { c, source } of list) {
      const legacy = legacySubjects.find(
        (l) => l.branch === p.slug && l.code === c.code && sameTitle(l.name, c.title),
      );
      let slug = legacy?.slug ?? slugify(c.title);
      if (used.has(`${c.semester}/${slug}`)) slug = `${slug}-${c.code.toLowerCase()}`;
      used.add(`${c.semester}/${slug}`);
      const kind = kindOf(c);
      // Modules from VTU's official syllabus win; a hand-written outline is the fallback.
      const syl = syllabi[c.code];
      const officialUnits = syl && syl.modules.length >= 3 ? syl.modules : null;
      const links = syllabusLinks(c.code, c.semester, p.syllabi ?? [], syl);
      const hasOutline = Boolean(officialUnits) || Boolean(legacy && legacy.units[0]?.title !== GENERIC_UNIT);
      out.push({
        branch: p.slug as BranchSlug,
        semester: c.semester,
        slug,
        code: c.code,
        name: c.title,
        shortName: legacy?.shortName ?? shortTitle(c.title),
        scheme: "2022",
        credits: c.credits,
        kind,
        hasLab: kind === "lab" || c.type === "IPCC",
        flagship: Boolean(legacy?.flagship) && !c.elective,
        description: describe(c, branch.name) + (officialUnits ? ` Its ${officialUnits.length} modules cover ${officialUnits.map((u) => u.title).slice(0, 3).join(", ")}${officialUnits.length > 3 ? " and more" : ""}.` : ""),
        outcomes: (syl?.outcomes ?? []).filter((o) => !isPedagogyOutcome(o)),
        units: officialUnits ?? (hasOutline ? legacy!.units : []),
        hasUnitOutline: hasOutline,
        syllabusUrl: links.syllabusUrl,
        moduleSourceUrl: links.moduleSourceUrl,
        textbooks: syl?.textbooks ?? [],
        references: syl?.references ?? [],
        links: syl?.links ?? [],
        electiveGroup: c.elective && c.group ? c.group : undefined,
        category: c.category,
        courseType: c.type ?? undefined,
        sourceUrl: source,
      });
    }
  }
  return out;
}

export const subjects: Subject[] = build();

function getSubjectsByBranch(branch: BranchSlug) {
  return subjects.filter((x) => x.branch === branch);
}
function getSubjectsBySemester(branch: BranchSlug, semester: number) {
  return subjects.filter((x) => x.branch === branch && x.semester === semester);
}
function branchesForSemester(semester: number) {
  const present = new Set(subjects.filter((x) => x.semester === semester).map((x) => x.branch));
  return branches.filter((b) => present.has(b.slug));
}
function countSubjects(branch: BranchSlug, semester?: number) {
  return subjects.filter((x) => x.branch === branch && (semester == null || x.semester === semester)).length;
}
function getSubject(branch: string, semester: number, slug: string): Subject | undefined {
  return subjects.find((x) => x.branch === branch && x.semester === semester && x.slug === slug);
}
function subjectPath(sub: Subject) {
  const ord = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"][sub.semester - 1];
  return `/vtu/${sub.branch}/${ord}-semester/${sub.slug}`;
}

/**
 * The same course (e.g. BCS301) is taught in many programmes. Its page under the
 * programme that owns the code prefix (BCS → CSE, BIS → ISE, BEC → ECE…) is canonical;
 * copies elsewhere point their canonical URL there, so search engines see one page.
 */
const PREFIX_OWNER: Record<string, string> = {
  CS: "cse", IS: "ise", AI: "aiml", AD: "aiml", EC: "ece", EE: "eee", ME: "me", CV: "cv",
};
function canonicalSubject(sub: Subject): Subject {
  const same = subjects.filter((x) => x.code === sub.code && x.semester === sub.semester);
  if (same.length < 2) return sub;
  const prefix = /^B([A-Z]{2})/.exec(sub.code)?.[1] ?? "";
  const owner = PREFIX_OWNER[prefix];
  return (
    same.find((x) => x.branch === owner) ??
    same.find((x) => branches.findIndex((b) => b.slug === x.branch) >= 0 && x.hasUnitOutline) ??
    [...same].sort(
      (a, b) => branches.findIndex((x) => x.slug === a.branch) - branches.findIndex((x) => x.slug === b.branch),
    )[0]
  );
}

/** "4 credits", "1 credit", or "" when the scheme PDF prints no credit value. */
function creditsLabel(credits: number | null) {
  return credits == null ? "" : `${credits} credit${credits === 1 ? "" : "s"}`;
}

const SLOT_NAME: Record<string, string> = {
  "professional-elective": "Professional elective",
  "open-elective": "Open elective",
  lab: "Ability enhancement / skill lab",
  ability: "Ability enhancement course",
  elective: "Elective",
};

/**
 * A semester's subjects in the order VTU's scheme lays them out: core papers, labs,
 * each elective slot with its options, projects/internship, then common courses.
 */
function groupSubjects(list: Subject[]) {
  const core = list.filter((s) => !s.electiveGroup && s.kind === "theory");
  const labs = list.filter((s) => !s.electiveGroup && s.kind === "lab");
  const projects = list.filter((s) => !s.electiveGroup && s.kind === "project");
  const common = list.filter((s) => !s.electiveGroup && s.kind === "ability");
  const slots = new Map<string, Subject[]>();
  for (const s of list.filter((x) => x.electiveGroup)) {
    const key = s.electiveGroup!;
    slots.set(key, [...(slots.get(key) ?? []), s]);
  }
  const groups: { id: string; title: string; note?: string; subjects: Subject[] }[] = [];
  if (core.length) groups.push({ id: "core", title: "Core courses", subjects: core });
  if (labs.length) groups.push({ id: "labs", title: "Laboratories", subjects: labs });
  for (const [slot, opts] of slots) {
    const name = SLOT_NAME[opts[0].category ?? "elective"] ?? "Elective";
    groups.push({
      id: `slot-${slot}`,
      title: `${name} (choose one) · ${slot.replace(/x$/i, "")}x`,
      note: `Your college offers one or more of these ${opts.length} options for this slot.`,
      subjects: opts,
    });
  }
  if (projects.length) groups.push({ id: "projects", title: "Projects & internship", subjects: projects });
  if (common.length) groups.push({ id: "common", title: "Common & ability-enhancement courses", subjects: common });
  return groups;
}

function flagshipSubjects() {
  return subjects.filter((x) => x.flagship);
}
/** One (or more) flagship subject per branch so the home list is not CSE-only. */
function popularSubjectsMixed(limit = 8): Subject[] {
  const buckets = new Map<string, Subject[]>();
  for (const s of flagshipSubjects()) {
    const list: Subject[] = buckets.get(s.branch) ?? [];
    list.push(s);
    buckets.set(s.branch, list);
  }
  const out: Subject[] = [];
  let i = 0;
  while (out.length < limit) {
    let added = false;
    for (const list of buckets.values())
      if (list[i]) {
        out.push(list[i]);
        added = true;
        if (out.length >= limit) break;
      }
    if (!added) break;
    i += 1;
  }
  return out;
}

export {
  getSubjectsByBranch,
  getSubjectsBySemester,
  branchesForSemester,
  countSubjects,
  getSubject,
  subjectPath,
  canonicalSubject,
  creditsLabel,
  groupSubjects,
  flagshipSubjects,
  popularSubjectsMixed,
};
