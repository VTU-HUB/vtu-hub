import { getBranch, semesterName } from "@/data/branches";
import { canonicalSubject, getSubject, subjectPath, subjects } from "@/data/subjects";
import type { ResourceFile, ResourceType, Subject, Unit } from "@/data/types";
import { lastCommitDate } from "@/lib/content-date";
import reviewedGuides from "@/data/reviewed-guides.json";

/**
 * Guides are generated from the subject data and the templates in this file, so
 * their honest "updated" date is the last commit that touched either source.
 */
const GUIDES_REVISED = lastCommitDate("src/data/resources.ts", "src/data/subjects.ts");

function branchName(slug: string) {
  return getBranch(slug)?.shortName ?? slug.toUpperCase();
}

/** Official module text, split into topics a student can revise one at a time. */
function topicClauses(topics: string) {
  const text = topics.replace(/…+$/u, "").replace(/\s+/g, " ").trim();
  if (!text) return [];
  const out: string[] = [];
  for (const sentence of text.split(/(?<=[.;])\s+/)) {
    const s = sentence.replace(/^[\s,;:–-]+/, "").replace(/[.;,…]+$/, "").trim();
    if (s.length < 18) continue;
    if (s.length <= 160) {
      out.push(s);
      continue;
    }
    const colon = s.indexOf(":");
    const list = colon >= 0 && colon < 90 ? s.slice(colon + 1) : s;
    const parts = list
      .split(/,\s+/)
      .map((p) => p.replace(/^[\s,;:–-]+/, "").replace(/[.;,…]+$/, "").trim())
      .filter((p) => p.length >= 18 && !/^(introduction|overview|basics?)$/i.test(p));
    if (parts.length >= 2) out.push(...parts);
    else out.push(s);
  }
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const item of out) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }
  return unique.slice(0, 14);
}

function questionFor(clause: string) {
  const c = clause.replace(/[.…]+$/, "").trim();
  if (/^(explain|describe|compare|discuss|define|derive|design|analyse|analyze|distinguish)\b/i.test(c)) {
    return c.endsWith(".") ? c : `${c}.`;
  }
  const lower = c.charAt(0).toLowerCase() + c.slice(1);
  if (/\b(versus|vs\.?|difference between|compared with)\b/i.test(c)) return `Compare ${lower}.`;
  return `Explain ${lower}.`;
}

function guide(
  partial: Omit<ResourceFile, "fileType" | "updated" | "readMinutes"> & {
    readMinutes?: number;
    updated?: string;
  },
): ResourceFile {
  return {
    ...partial,
    fileType: "Guide",
    readMinutes:
      partial.readMinutes ??
      Math.max(4, Math.round(partial.body.join(" ").split(/\s+/).length / 180)),
    updated: partial.updated ?? GUIDES_REVISED,
  };
}

function notesBody(sub: Subject, u: Unit): { body: string[]; bullets: string[] } {
  const clauses = topicClauses(u.topics);
  const books = sub.textbooks?.slice(0, 2).join("; ");
  return {
    body: [
      `Module ${u.number} of ${sub.name} (${sub.code}) is ${u.title}. The list below is the topic text VTU prints for this module. This page is a study sheet for that list. It is not a scanned faculty notebook and not the university PDF.`,
      books
        ? `Read each topic in ${books}, then close the book and explain it in your own words. A five-mark answer needs the definition and one diagram or step, not a paragraph copied from this page.`
        : `Read each topic in the prescribed book on the subject page, then close the book and explain it in your own words.`,
    ],
    bullets: clauses.length ? clauses : [`${u.title} — confirm the topic lines in the official syllabus PDF.`],
  };
}

function syllabusBody(sub: Subject): { body: string[]; bullets: string[] } {
  const br = branchName(sub.branch);
  const units = sub.units;
  return {
    body: [
      `This syllabus walk-through for ${sub.name} (${sub.code}) is original VTUHub writing. Credits on this card: ${sub.credits}. Programme: ${br}. Term: ${semesterName(sub.semester)}. Scheme: ${sub.scheme}.`,
      `We do not host the official scheme PDF. Download that from vtu.ac.in and match the subject code on your admission ticket before you trust any module title on this page.`,
      units.length
        ? `The ${sub.scheme} core for ${sub.shortName} is commonly taught as ${units.length} modules: ${units.map((u) => `Unit ${u.number} ${u.title}`).join("; ")}.`
        : `${sub.shortName} is a ${sub.kind} paper on this card. Confirm hours and CIE split on the scheme PDF.`,
      `CIE work for a theory paper is usually internals plus assignments; a lab companion, if any, is marked separately. ${sub.hasLab ? `${sub.shortName} lists a lab component on VTUHub — treat the lab record as its own CIE bucket.` : `${sub.shortName} is listed here as ${sub.kind} without a paired lab on this card.`}`,
      `Elective baskets and college-specific experiments do not always appear in a generic ${br} list. If the code on your ticket is not ${sub.code}, you are on the wrong page.`,
    ],
    bullets: units.flatMap((u) => {
      const clauses = topicClauses(u.topics);
      if (!clauses.length) return [`Unit ${u.number} — ${u.title}`];
      return clauses.map((c) => `Unit ${u.number} — ${u.title}: ${c}`);
    }),
  };
}

function practiceBody(sub: Subject): { body: string[]; bullets: string[] } {
  const fromTopics = sub.units.flatMap((u) => topicClauses(u.topics).slice(0, 2).map((c) => `Module ${u.number}: ${questionFor(c)}`));
  const qs = fromTopics.length ? fromTopics : sub.units.map((u) => `Module ${u.number}: Explain ${u.title}.`);
  return {
    body: [
      `These are original practice questions for ${sub.name} (${sub.code}), one for each official module topic. This is not a scanned VTU semester-end paper and not a photocopy of a university booklet.`,
      `Official previous papers stay on vtu.ac.in. Write each answer in twelve minutes, then mark it against the topic list on the syllabus page.`,
    ],
    bullets: qs.slice(0, 12),
  };
}

function importantBody(sub: Subject): { body: string[]; bullets: string[] } {
  return {
    body: [
      `These important questions for ${sub.name} (${sub.code}) are compiled by VTUHub from the module list — not copied from a paid “question bank” PDF and not a paper leak.`,
      `High-frequency SEE themes in ${sub.shortName} follow the unit titles. If you can answer the list below in full sentences, you have coverage. If you can only recognise the title, you do not.`,
      `Drill plan: two questions a night in the last ten days before SEE, handwritten, then compared with class notes. Do not highlight a PDF.`,
    ],
    bullets: (() => {
      const fromTopics = sub.units.flatMap((u) => topicClauses(u.topics).slice(0, 3).map((c) => `Module ${u.number} (${u.title}): ${questionFor(c)}`)).slice(0, 15);
      return fromTopics.length ? fromTopics : sub.units.map((u) => `Module ${u.number} (${u.title}): Explain ${u.title}.`);
    })(),
  };
}

function labBody(sub: Subject): { body: string[]; bullets: string[] } {
  return {
    body: [
      `This lab-prep guide for ${sub.name} (${sub.code}) is original VTUHub writing. It is not your college’s signed lab manual, not a scanned observation book, and not equipment-specific procedure for a particular bench.`,
      `CIE lab marks in a typical ${branchName(sub.branch)} department split across performance, record and viva. Before the session, write the aim, the apparatus your lab actually has, and the observation-table headings in the record. Do not wait until the viva week.`,
      `Follow the instructor for voltage, load, software version and submission format. A generic write-up that ignores the kit in front of you is how students lose the performance mark.`,
      `If this subject also has theory (${sub.kind === "theory" ? "it does on this card" : "check the subject page"}), keep the lab record and the theory notes in separate folders. Examiners treat them as different CIE buckets.`,
    ],
    bullets: [
      "Aim and apparatus written before you enter the lab.",
      "Observation table headed with units.",
      "One result discussed in two sentences — error sources, not adjectives.",
      "Viva: explain the circuit or algorithm without reading the record.",
    ],
  };
}

function buildForSubject(sub: Subject): ResourceFile[] {
  // No generated guides for elective options, common/non-core courses, or any course
  // without a unit outline written for it — that would be filler built on placeholder units.
  // A course shared by several programmes gets guides once, under its canonical page.
  if (canonicalSubject(sub) !== sub) return [];
  if (sub.electiveGroup || !sub.hasUnitOutline) {
    return sub.kind === "lab" && !sub.electiveGroup ? buildLab(sub) : [];
  }
  const out: ResourceFile[] = [];
  const b = sub.branch;
  const sem = sub.semester;
  const slug = sub.slug;
  const sy = syllabusBody(sub);

  out.push(
    guide({
      id: `${b}-${slug}-syllabus`,
      subjectSlug: slug,
      branch: b,
      semester: sem,
      type: "syllabus",
      title: `${sub.code} ${sub.shortName} syllabus walk-through`,
      description: `Original module map for ${sub.name}. Verify titles against the ${sub.scheme} scheme PDF on vtu.ac.in.`,
      body: sy.body,
      bullets: sy.bullets,
      readMinutes: 6,
    }),
  );

  if (sub.kind === "lab") {
    const lab = labBody(sub);
    out.push(
      guide({
        id: `${b}-${slug}-lab`,
        subjectSlug: slug,
        branch: b,
        semester: sem,
        type: "lab-manuals",
        title: `${sub.shortName} lab-prep guide`,
        description: `Original lab-prep checklist for ${sub.name}. Not a college manual.`,
        body: lab.body,
        bullets: lab.bullets,
        readMinutes: 7,
      }),
    );
    return out;
  }

  if (sub.kind === "project" || sub.kind === "ability") {
    return out;
  }

  for (const u of sub.units) {
    const n = notesBody(sub, u);
    out.push(
      guide({
        id: `${b}-${slug}-notes-u${u.number}`,
        subjectSlug: slug,
        branch: b,
        semester: sem,
        type: "notes",
        title: `${sub.shortName} Unit ${u.number} — ${u.title}`,
        description: `Original study guide for Unit ${u.number} (${u.title}) in ${sub.code}.`,
        unit: u.number,
        body: n.body,
        bullets: n.bullets,
        readMinutes: 7,
      }),
    );
  }

  const iq = importantBody(sub);
  out.push(
    guide({
      id: `${b}-${slug}-iq`,
      subjectSlug: slug,
      branch: b,
      semester: sem,
      type: "important-questions",
      title: `${sub.shortName} important questions`,
      description: `Original module-wise drill list for ${sub.code}. Not a paper leak.`,
      body: iq.body,
      bullets: iq.bullets,
      readMinutes: 8,
    }),
  );

  const pq = practiceBody(sub);
  out.push(
    guide({
      id: `${b}-${slug}-practice`,
      subjectSlug: slug,
      branch: b,
      semester: sem,
      type: "question-papers",
      title: `${sub.code} original practice set`,
      description: `Original timed practice for ${sub.name}. We do not host VTU SEE paper PDFs.`,
      year: 2026,
      body: pq.body,
      bullets: pq.bullets,
      readMinutes: 10,
    }),
  );

  if (sub.hasLab) {
    const lab = labBody(sub);
    out.push(
      guide({
        id: `${b}-${slug}-lab`,
        subjectSlug: slug,
        branch: b,
        semester: sem,
        type: "lab-manuals",
        title: `${sub.shortName} lab-prep guide`,
        description: `Original lab-prep checklist for ${sub.name}. Follow your instructor for equipment.`,
        body: lab.body,
        bullets: lab.bullets,
        readMinutes: 7,
      }),
    );
  }

  return out;
}

function buildLab(sub: Subject): ResourceFile[] {
  const lab = labBody(sub);
  return [
    guide({
      id: `${sub.branch}-${sub.slug}-lab`,
      subjectSlug: sub.slug,
      branch: sub.branch,
      semester: sub.semester,
      type: "lab-manuals",
      title: `${sub.shortName} lab-prep guide`,
      description: `Original lab-prep checklist for ${sub.name}. Not a college manual.`,
      body: lab.body,
      bullets: lab.bullets,
      readMinutes: 7,
    }),
  ];
}

export const resources: ResourceFile[] = subjects.flatMap(buildForSubject);

export function resourcesFor(branch: string, semester: number, slug: string, type?: ResourceType) {
  return resources.filter(
    (r) =>
      r.branch === branch &&
      r.semester === semester &&
      r.subjectSlug === slug &&
      (type ? r.type === type : true),
  );
}

export function resourcesByType(type: ResourceType) {
  return resources.filter((r) => r.type === type);
}

export function latestQuestionPapers(limit = 8) {
  return [...resources]
    .filter((r) => r.type === "question-papers")
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .slice(0, limit);
}

export function popularNotes(limit = 6) {
  const flagshipSlugs = new Set(
    subjects.filter((s) => s.flagship).map((s) => `${s.branch}:${s.slug}`),
  );
  return resources
    .filter(
      (r) =>
        r.type === "notes" && r.unit === 1 && flagshipSlugs.has(`${r.branch}:${r.subjectSlug}`),
    )
    .slice(0, limit);
}

export function resourceCounts(branch: string, semester: number, slug: string) {
  const list = resourcesFor(branch, semester, slug);
  const counts = {
    notes: 0,
    "question-papers": 0,
    syllabus: 0,
    "lab-manuals": 0,
    "important-questions": 0,
    total: list.length,
  };
  for (const r of list) counts[r.type] += 1;
  return counts;
}

export function subjectFor(file: ResourceFile) {
  return getSubject(file.branch, file.semester, file.subjectSlug);
}

const REVIEWED = new Set<string>(reviewedGuides.ids);

/**
 * Generated template guides are noindex until someone reviews them and adds the
 * id to src/data/reviewed-guides.json — thin, near-duplicate pages at scale hurt
 * the whole site in search and in AdSense review.
 */
export function isIndexable(file: ResourceFile) {
  return REVIEWED.has(file.id);
}

export function getResource(id: string) {
  return resources.find((r) => r.id === id);
}

export function relatedFiles(file: ResourceFile, limit = 6) {
  return resources
    .filter(
      (r) =>
        r.id !== file.id &&
        r.branch === file.branch &&
        r.semester === file.semester &&
        r.subjectSlug === file.subjectSlug,
    )
    .slice(0, limit);
}

export function studyMaterials(limit = 40) {
  return resources
    .filter(
      (r) => r.type === "notes" || r.type === "important-questions" || r.type === "lab-manuals",
    )
    .slice(0, limit);
}

export function typePath(branch: string, semester: number, slug: string, type: ResourceType) {
  const sub = getSubject(branch, semester, slug);
  if (!sub) return "/resources";
  return `${subjectPath(sub)}/${type}`;
}
