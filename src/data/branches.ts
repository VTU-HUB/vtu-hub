import type { Branch, BranchSlug, Scheme } from "@/data/types";

export const branches: Branch[] = [
  {
    slug: "cse",
    code: "CS",
    name: "Computer Science & Engineering",
    shortName: "CSE",
    description:
      "Notes, question papers and syllabus for VTU Computer Science & Engineering — data structures, DBMS, OS, networks and more.",
    about:
      "CSE is the largest VTU programme on VTUHub. Resources follow the 2022 scheme (BCS codes) with unit-wise notes, previous question papers and lab manuals for core subjects such as Data Structures, Operating Systems, Database Management Systems and Computer Networks.",
  },
  {
    slug: "ise",
    code: "IS",
    name: "Information Science & Engineering",
    shortName: "ISE",
    description:
      "VTU Information Science resources: programming, data, web and core IS subjects organised by semester.",
    about:
      "ISE shares several foundations with CSE but emphasises information systems, web technologies and data. VTUHub keeps ISE on its own branch path so you can filter by BIS-coded 2022-scheme subjects without mixing CS and IS electives.",
  },
  {
    slug: "ece",
    code: "EC",
    name: "Electronics & Communication Engineering",
    shortName: "ECE",
    description:
      "Analog, digital, signals, communication and VLSI resources for VTU Electronics & Communication.",
    about:
      "ECE pages cover network analysis, analog and digital electronics, signals and systems, and communication subjects. Lab manuals are listed separately from theory notes so you can download only what you need for CIE and SEE.",
  },
  {
    slug: "eee",
    code: "EE",
    name: "Electrical & Electronics Engineering",
    shortName: "EEE",
    description:
      "Electrical machines, power systems, control and circuits for VTU Electrical & Electronics students.",
    about:
      "EEE resources are grouped from circuit analysis and machines through power systems and control. Where a subject has a lab component, the lab manual sits next to the theory notes on the subject page.",
  },
  {
    slug: "me",
    code: "ME",
    name: "Mechanical Engineering",
    shortName: "ME",
    description:
      "Thermodynamics, SOM, fluids, manufacturing and design resources for VTU Mechanical Engineering.",
    about:
      "Mechanical pages collect core thermal, design and manufacturing subjects. Notes are split by unit so you can study one module at a time before a CIE test or the semester-end exam.",
  },
  {
    slug: "cv",
    code: "CV",
    name: "Civil Engineering",
    shortName: "Civil",
    description:
      "Structures, surveying, geotechnical and transportation resources for VTU Civil Engineering.",
    about:
      "Civil resources cover strength of materials, surveying, structural analysis, RCC and geotechnical subjects. Always confirm IS-code and syllabus versions against the current VTU scheme PDF.",
  },
];

export const schemes: Scheme[] = [
  {
    year: "2022",
    name: "2022 Scheme",
    description:
      "Current scheme for most VTU programmes. Theory papers typically use 50 CIE + 50 SEE. Subject codes use the Bxx prefix (BCS, BIS, BEC, BEE, BME, BCV).",
  },
  {
    year: "2021",
    name: "2021 Scheme",
    description:
      "Transitional scheme still appearing on older question papers. Codes often look like 21CS / 21EC. Grading remains 10-point.",
  },
  {
    year: "2018",
    name: "2018 Scheme",
    description:
      "Older CBCS scheme (18CS, 18EC, …) with 40 CIE + 60 SEE. Many previous papers on VTUHub are from this scheme and remain useful for practice.",
  },
];

export const SEMESTER_ORD = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
] as const;

export function semesterSlug(n: number) {
  return `${SEMESTER_ORD[n - 1]}-semester`;
}

export function semesterName(n: number) {
  return `${SEMESTER_ORD[n - 1]} Semester`;
}

export function semesterPath(n: number) {
  return `/semesters/${semesterSlug(n)}`;
}

export function branchPath(slug: string) {
  return `/vtu/${slug}`;
}

export function branchSemesterPath(slug: string, n: number) {
  return `/vtu/${slug}/${semesterSlug(n)}`;
}

export function parseSemesterSlug(slug: string): number | null {
  const i = SEMESTER_ORD.findIndex((o) => slug === `${o}-semester`);
  return i === -1 ? null : i + 1;
}

export function getBranch(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}

export function getScheme(year: string): Scheme | undefined {
  return schemes.find((s) => s.year === year);
}

export function isSchemeYear(s: string): s is Scheme["year"] {
  return schemes.some((x) => x.year === s);
}

export function semesterAbout(n: number, branch?: Branch): string {
  const name = branch?.shortName ?? "engineering";
  if (n === 1) {
    return `First semester mixes mathematics, a science-cycle paper, programming and an ability-enhancement course. Physics-cycle and chemistry-cycle batches take Applied Physics and Applied Chemistry in opposite order — match the subject list to your admission ticket${branch ? ` for ${name}` : ""}.`;
  }
  if (n === 2) {
    return `Second semester closes the first-year science cycle and adds Mathematics-II plus an introductory programming paper. Use these notes with the 2022-scheme module list.`;
  }
  if (n === 3) {
    return `Third semester is where ${name} becomes a specialised programme. Core papers start here. Most students treat this as the first “real” SEE.`;
  }
  if (n === 4) {
    return `Fourth semester continues the 2022-scheme core. DBMS, algorithms, signals or thermal papers typically sit here depending on branch.`;
  }
  if (n === 5) {
    return `Fifth semester introduces professional-core and elective papers. Lab CIE load is higher; keep lab manuals separate from theory notes.`;
  }
  if (n === 6) {
    return `Sixth semester usually finishes the core and opens departmental electives. Check your scheme PDF for the elective basket — VTUHub lists common cores.`;
  }
  if (n === 7) {
    return `Seventh semester is internship, project phase-1 and a lighter theory load on most 2022-scheme programmes. Elective codes vary by college.`;
  }
  return `Eighth semester is project phase-2, seminar and remaining electives. There is little to download for project credit — the work has to be yours.`;
}
