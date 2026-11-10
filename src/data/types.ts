/** URL segment of a programme (/vtu/<slug>). Programmes come from VTU's scheme page. */
export type BranchSlug = string;

/** First-year engineering stream on the 2022 scheme. */
export type StreamKey = "cs" | "ee" | "me" | "cv" | "other";

export type SchemeYear = "2022" | "2021" | "2018";

export type ResourceType =
  "notes" | "question-papers" | "syllabus" | "lab-manuals" | "important-questions";

export type SubjectKind = "theory" | "lab" | "project" | "ability";

export type Branch = {
  slug: BranchSlug;
  code: string;
  name: string;
  shortName: string;
  description: string;
  about: string;
  stream?: StreamKey;
  /** Shown first in menus (the most-studied programmes). */
  featured?: boolean;
};

export type Scheme = {
  year: SchemeYear;
  name: string;
  description: string;
};

export type Unit = {
  number: number;
  title: string;
  topics: string;
};

export type Subject = {
  branch: BranchSlug;
  semester: number;
  slug: string;
  code: string;
  name: string;
  shortName: string;
  scheme: SchemeYear;
  /** null when the official scheme PDF does not print a credit value for this course. */
  credits: number | null;
  kind: SubjectKind;
  hasLab: boolean;
  flagship: boolean;
  description: string;
  outcomes: string[];
  units: Unit[];
  /** True when the unit outline was written for this exact course (not the generic placeholder). */
  hasUnitOutline?: boolean;
  /** Elective option inside a slot such as "515x" (Professional Elective) — undefined for core courses. */
  electiveGroup?: string;
  /** Category from the official scheme: core, lab, professional-elective, open-elective, … */
  category?: string;
  /** Course type as printed in the scheme (IPCC, PCC, PCCL, ESC, …). */
  courseType?: string;
  /** Official scheme PDF this course was read from. */
  sourceUrl?: string;
  /** Official syllabus PDF the modules / outcomes / books were read from. */
  syllabusUrl?: string;
  /** Prescribed textbooks and reference books, as printed in the VTU syllabus. */
  textbooks?: string[];
  references?: string[];
  /** Web links / NPTEL / video lectures listed in the VTU syllabus. */
  links?: string[];
};

export type ResourceFile = {
  id: string;
  subjectSlug: string;
  branch: BranchSlug;
  semester: number;
  type: ResourceType;
  title: string;
  description: string;
  fileType: "Guide";
  readMinutes: number;
  updated: string;
  year?: number;
  unit?: number;
  body: string[];
  bullets?: string[];
};

export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { caption?: string; headers: string[]; rows: string[][] };
  note?: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string;
  updated: string;
  readMinutes: number;
  relatedSubjectSlugs?: string[];
  sections: ArticleSection[];
};

export type UpdateType = "notification" | "exam-timetable" | "results" | "academic-calendar";

export type VtuUpdate = {
  slug: string;
  title: string;
  date: string;
  type: UpdateType;
  summary: string;
  body: string[];
  sourceLabel: string;
  sourceUrl: string;
};

export type ToolDef = {
  slug: string;
  name: string;
  description: string;
  href: string;
};
