/**
 * Official VTU notices (exam timetables, results/revaluation, academic calendars,
 * circulars), synced from vtu.ac.in's public API by scripts/vtu/sync-notices.mjs.
 * Titles and dates are VTU's; the site only links to the official post and PDF.
 */
import data from "@/data/vtu/notices.json";

export type NoticeType = "exam-timetable" | "results" | "academic-calendar" | "notifications";

export type Notice = {
  id: number;
  date: string;
  title: string;
  type: NoticeType;
  url: string;
  attachments: { url: string; label: string }[];
};

export const notices = data.notices as Notice[];

export const NOTICE_LABEL: Record<NoticeType, string> = {
  "exam-timetable": "Timetable",
  results: "Results",
  "academic-calendar": "Calendar",
  notifications: "Circular",
};

export function latestNotices(limit = 6, type?: NoticeType) {
  return notices.filter((n) => !type || n.type === type).slice(0, limit);
}

/** Date of the newest notice — shown as "updated" on pages that list them. */
export const noticesUpdated = notices[0]?.date ?? "";

/** Official VTU services students use most. All links go to vtu.ac.in. */
export const OFFICIAL_LINKS = [
  { label: "Results portal", href: "https://results.vtu.ac.in/", hint: "Semester results" },
  { label: "Exam timetables", href: "https://vtu.ac.in/en/category/examination/time-table/", hint: "Official timetable circulars" },
  { label: "Exam circulars", href: "https://vtu.ac.in/en/category/examination/", hint: "Revaluation, fees, ODE" },
  { label: "Academic calendar", href: "https://vtu.ac.in/academic-calendar/", hint: "Term dates" },
  { label: "Scheme & syllabus", href: "https://vtu.ac.in/en/b-e-scheme-syllabus/", hint: "All scheme PDFs" },
  { label: "Exam application", href: "https://prexam.vtu.ac.in/", hint: "Apply for exams" },
] as const;
