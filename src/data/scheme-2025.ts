/**
 * 2025-scheme inventory. Subject pages and the 2022 catalogue stay separate.
 * Codes and titles are copied from VTU's published 2025 scheme index, not guessed.
 * Official hub: https://vtu.ac.in/b-e-scheme-syllabus/
 */
export const SCHEME_2025_SOURCE = "https://vtu.ac.in/b-e-scheme-syllabus/";
export const SCHEME_2025_REGS = "https://vtu.ac.in/wp-content/uploads/2026/05/B.E.B.Tech2025.pdf";

export type Scheme2025Status = "listed" | "not-in-catalogue";

export const scheme2025Status = {
  firstYear: "listed" as Scheme2025Status,
  laterSemesters: "not-in-catalogue" as Scheme2025Status,
  mixedWith2022: false,
};

/** First-year 2025 Applied Mathematics papers named on VTU's scheme page. */
export const scheme2025FirstYear = [
  {
    code: "1BMATC101",
    title: "Differential Calculus And Linear Algebra: CV Stream",
    semester: 1,
    stream: "CV",
    syllabus: "https://vtu.ac.in/b-e-scheme-syllabus/",
  },
  {
    code: "1BMATM101",
    title: "Differential Calculus and Linear Algebra: ME Stream",
    semester: 1,
    stream: "ME",
    syllabus: "https://vtu.ac.in/b-e-scheme-syllabus/",
  },
  {
    code: "1BMATE101",
    title: "Differential Calculus And Linear Algebra: EEE stream",
    semester: 1,
    stream: "EEE",
    syllabus: "https://vtu.ac.in/b-e-scheme-syllabus/",
  },
  {
    code: "1BMATS101",
    title: "Calculus and Linear Algebra: CSE Stream",
    semester: 1,
    stream: "CSE",
    syllabus: "https://vtu.ac.in/pdf/UG2024/1BMATS101.pdf",
  },
  {
    code: "1BMATC201",
    title: "Differential Calculus and Numerical Methods: CV Stream",
    semester: 2,
    stream: "CV",
    syllabus: "https://vtu.ac.in/b-e-scheme-syllabus/",
  },
  {
    code: "1BMATM201",
    title: "Multivariable Calculus and Numerical Methods: ME Stream",
    semester: 2,
    stream: "ME",
    syllabus: "https://vtu.ac.in/b-e-scheme-syllabus/",
  },
  {
    code: "1BMATE201",
    title: "Calculus, Laplace Transform And Numerical Techniques: EEE stream",
    semester: 2,
    stream: "EEE",
    syllabus: "https://vtu.ac.in/b-e-scheme-syllabus/",
  },
] as const;
