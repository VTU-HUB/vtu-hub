import type { VtuUpdate } from "@/data/types";

export const updates: VtuUpdate[] = [
  {
    slug: "odd-semester-exam-timetable-2026",
    title: "Odd semester SEE timetable — how to read it",
    date: "2026-08-28",
    type: "exam-timetable",
    summary:
      "VTU typically publishes the semester-end exam timetable a few weeks before the first paper. Use this page as a reading guide, then confirm dates on the official portal.",
    body: [
      "Semester-end examination (SEE) dates are set by Visvesvaraya Technological University and published on vtu.ac.in. VTUHub does not set, change, or guarantee those dates.",
      "When a timetable PDF appears, match three fields before you plan travel: your scheme year (2018 / 2021 / 2022), your subject code (for example BCS304, not only the subject name), and whether the paper is a regular or arrear sitting.",
      "Subject names collide across branches. Discrete Mathematics for CSE is not the same paper as Discrete Mathematics for another programme if the codes differ. Always search the PDF by code.",
      "CIE lab exams and theory SEE are separate calendars. A lab batch scheduled by your college does not move the university theory paper.",
      "If two of your papers fall on the same day, that clash is resolved only by the university — write to your college exam section with the official PDF attached.",
    ],
    sourceLabel: "VTU official website",
    sourceUrl: "https://vtu.ac.in",
  },
  {
    slug: "see-results-how-revaluation-works",
    title: "SEE results, photocopies and revaluation — student checklist",
    date: "2026-08-14",
    type: "results",
    summary:
      "A practical walk-through of result announcement, applying for a photocopy, and revaluation windows. Deadlines are only valid on the official circular.",
    body: [
      "Results are published by VTU, not by colleges and not by VTUHub. Your college may mirror a notice, but the marks that count are on the university result portal.",
      "After results, VTU usually opens a short window to apply for a digital photocopy of the answer script, then a separate window for revaluation. Those two fees and dates are not the same.",
      "Photocopy is useful when you want to see whether a question was left unvalued or a total was added wrongly. Revaluation can raise, lower, or leave a mark unchanged.",
      "Keep screenshots of the application receipt and UTR. If a portal timeout happens, the receipt is what your principal's office can chase.",
      "VTUHub never collects revaluation fees and never asks for your USN password.",
    ],
    sourceLabel: "VTU official website",
    sourceUrl: "https://vtu.ac.in",
  },
  {
    slug: "academic-calendar-odd-even-2026",
    title: "Reading the VTU academic calendar (odd and even semester)",
    date: "2026-07-30",
    type: "academic-calendar",
    summary:
      "Term start, CIE slots, last working day and SEE typically sit on one circular. Here is how to extract the dates that actually affect you.",
    body: [
      "The academic calendar is a university circular. Colleges overlay internships, fests and lab batches on top of it, so your department notice board can be stricter than the university PDF — follow the stricter one for attendance.",
      "Four dates matter for most students: commencement of term, CIE-1, CIE-2, last working day. SEE theory dates come later as a separate timetable.",
      "Attendance eligibility (commonly 85% in many VTU colleges) is computed up to the last working day unless your college specifies otherwise.",
      "Project and internship calendars for 7th and 8th semester are often annexures, not the main table. Scroll the full PDF.",
      "Calendars are revised. If you printed an April version in July, throw it away and re-download from vtu.ac.in.",
    ],
    sourceLabel: "VTU official website",
    sourceUrl: "https://vtu.ac.in",
  },
  {
    slug: "2022-scheme-cie-see-split",
    title: "CIE and SEE marks split on the 2022 scheme",
    date: "2026-07-12",
    type: "notification",
    summary:
      "Most 2022-scheme theory papers use 50 CIE + 50 SEE. Passing rules still depend on the scheme circular for your batch — verify before you assume.",
    body: [
      "Students mixing 2018-scheme papers (40 + 60) with 2022-scheme papers (50 + 50) lose marks in the marks calculator by using the wrong split. Check the scheme printed on your exam admission ticket.",
      "CIE usually includes internal tests, assignments and quizzes as your college maps them. The university sets the ceiling (commonly 50); the college sets the internal recipe.",
      "A high CIE does not bypass a SEE minimum if your scheme requires one. Read the grading circular, not a WhatsApp forward.",
      "Lab CIE is separate from theory CIE. Passing a lab does not pass the theory paper of a linked subject.",
      "VTUHub calculators let you switch 50/50 and 40/60 so you can model both. They do not replace the circular.",
    ],
    sourceLabel: "VTU scheme & grading circulars",
    sourceUrl: "https://vtu.ac.in",
  },
  {
    slug: "exam-application-and-usn",
    title: "Exam applications, USN and admission tickets",
    date: "2026-06-22",
    type: "notification",
    summary:
      "Colleges file exam applications on your behalf in most cases. Your job is to verify subject codes and keep the admission ticket.",
    body: [
      "The USN is issued by the university through the college. VTUHub cannot generate, recover or edit a USN.",
      "When the college opens the exam application window, check every registered code. A missing arrear code is harder to fix after the window closes.",
      "The admission ticket is the document you carry to SEE. Subject names on it can be abbreviated; the code is what the invigilator matches.",
      "If a summary here disagrees with a PDF, ignore this page. Then use the contact page so we can correct the summary.",
      "VTUHub is not affiliated with Visvesvaraya Technological University, its Belagavi office, or any affiliated college.",
    ],
    sourceLabel: "VTU official website",
    sourceUrl: "https://vtu.ac.in",
  },
];

export function getUpdate(slug: string) {
  return updates.find((u) => u.slug === slug);
}

export const updateTypeLabel: Record<VtuUpdate["type"], string> = {
  notification: "Notification",
  "exam-timetable": "Exam timetable",
  results: "Results",
  "academic-calendar": "Academic calendar",
};
