export type BranchSlug = "cse" | "ise" | "ece" | "eee" | "me" | "cv";

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
  credits: number;
  kind: SubjectKind;
  hasLab: boolean;
  flagship: boolean;
  description: string;
  outcomes: string[];
  units: Unit[];
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
