import type { Branch, Scheme, StreamKey } from "@/data/types";
import courseData from "@/data/vtu/courses.json";

/** Hand-written copy for the most-studied programmes. Every other programme VTU lists is added below from the synced data. */
const featuredBranches: Branch[] = [
  {
    slug: "cse",
    code: "CS",
    name: "Computer Science & Engineering",
    shortName: "CSE",
    description:
      "Free notes, important questions and syllabus maps for VTU Computer Science & Engineering: data structures, DBMS, OS, networks and more.",
    about:
      "CSE is the largest VTU programme on VTUHub. Resources follow the 2022 scheme (BCS codes) with unit-wise notes, practice questions and lab-prep guides for core subjects such as Data Structures, Operating Systems, Database Management Systems and Computer Networks.",
  },
  {
    slug: "ise",
    code: "IS",
    name: "Information Science & Engineering",
    shortName: "ISE",
    description:
      "VTU Information Science resources: programming, data, web and core IS subjects organised by semester.",
    about:
      "ISE shares most of its 3rd–5th semester core with CSE (BCS-coded courses), then adds its own BIS courses such as Advanced Java, Full Stack Development, Big Data Analytics and Information & Network Security. Course codes and credits on these pages are read from VTU's published scheme PDF.",
  },
  {
    slug: "ece",
    code: "EC",
    name: "Electronics & Communication Engineering",
    shortName: "ECE",
    description:
      "Analog, digital, signals, communication and VLSI resources for VTU Electronics & Communication.",
    about:
      "ECE pages cover network analysis, analog and digital electronics, signals and systems, and communication subjects. Lab-prep guides are listed separately from theory notes so you can open only what you need for CIE and SEE.",
  },
  {
    slug: "eee",
    code: "EE",
    name: "Electrical & Electronics Engineering",
    shortName: "EEE",
    description:
      "Electrical machines, power systems, control and circuits for VTU Electrical & Electronics students.",
    about:
      "EEE resources are grouped from circuit analysis and machines through power systems and control. Where a subject has a lab component, the lab-prep guide sits next to the theory notes on the subject page.",
  },
  {
    slug: "aiml",
    code: "AI",
    name: "Artificial Intelligence & Machine Learning",
    shortName: "AIML",
    description:
      "VTU B.E. Artificial Intelligence & Machine Learning: AI, machine learning, NLP and deep learning courses from the official 2022 scheme, semester by semester.",
    about:
      "AIML shares its 3rd-semester core with CSE, then moves to Artificial Intelligence (4th sem), Natural Language Processing and Machine Learning-I (6th) and Deep Learning & Reinforcement Learning (7th). Course codes and credits on these pages are read from VTU's published scheme PDF.",
  },
  {
    slug: "cse-aiml",
    code: "CI",
    name: "CSE (Artificial Intelligence & Machine Learning)",
    shortName: "CSE-AIML",
    description:
      "VTU CSE (AI & ML) courses from the official 2022 scheme: Artificial Intelligence, Machine Learning I & II, Deep Learning and the CSE core.",
    about:
      "CSE (AI & ML) follows the CSE core for DBMS, algorithms, networks and theory of computation, and adds AI, machine learning and deep learning courses. Course codes and credits on these pages are read from VTU's published scheme PDF.",
  },
  {
    slug: "cse-ds",
    code: "CD",
    name: "CSE (Data Science)",
    shortName: "CSE-DS",
    description:
      "VTU CSE (Data Science) courses from the official 2022 scheme: Big Data Analytics, AI & ML, statistical machine learning and the CSE core.",
    about:
      "CSE (Data Science) shares the CSE core and adds Big Data Analytics and AI & ML (6th sem), Parallel Programming and Statistical Machine Learning for Data Science (7th). Course codes and credits on these pages are read from VTU's published scheme PDF.",
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

type SyncedProgram = { slug: string; name: string; code: string | null; short: string | null; stream: string | null; courses: { semester: number }[] };
const synced = courseData.programs as SyncedProgram[];
const streamOf = (slug: string): StreamKey => (synced.find((p) => p.slug === slug)?.stream as StreamKey) ?? "other";

export const STREAMS: { key: StreamKey; name: string; short: string }[] = [
  { key: "cs", name: "Computer Science & Engineering stream", short: "Computer Science" },
  { key: "ee", name: "Electrical & Electronics stream", short: "Electrical & Electronics" },
  { key: "me", name: "Mechanical stream", short: "Mechanical & allied" },
  { key: "cv", name: "Civil stream", short: "Civil & allied" },
  { key: "other", name: "Other programmes", short: "Other" },
];

/**
 * Every 2022-scheme B.E./B.Tech programme on VTU's scheme page: the hand-written
 * featured ones first, then the rest in VTU's order, grouped by first-year stream.
 * A featured programme that stops syncing stays listed so its URLs never break.
 */
export const branches: Branch[] = (() => {
  const featured = featuredBranches.map((b) => ({ ...b, featured: true, stream: streamOf(b.slug) }));
  const rest: Branch[] = synced
    .filter((p) => !featured.some((b) => b.slug === p.slug))
    .map((p) => {
      const sems = [...new Set(p.courses.map((c) => c.semester))].sort((a, b) => a - b);
      const ord = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
      const span = sems.length ? `${ord[sems[0] - 1]}–${ord[sems.at(-1)! - 1]} semester` : "";
      return {
        slug: p.slug,
        code: p.code ?? "",
        name: p.name,
        shortName: p.short ?? p.name,
        description: `VTU ${p.name} courses from the official 2022 scheme: course codes, credits, core subjects and electives${span ? `, ${span}` : ""}.`,
        about: `${p.name} on VTU's 2022 scheme. Every course code, title and credit value on these pages is read from VTU's published scheme PDF and re-checked daily.`,
        stream: streamOf(p.slug),
        featured: false,
      };
    });
  const order = STREAMS.map((s) => s.key);
  return [...featured, ...rest].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || order.indexOf(a.stream!) - order.indexOf(b.stream!),
  );
})();

export function branchesByStream() {
  return STREAMS.map((s) => ({ ...s, branches: branches.filter((b) => b.stream === s.key) })).filter(
    (s) => s.branches.length > 0,
  );
}

export const schemes: Scheme[] = [
  {
    year: "2025",
    name: "2025 Scheme",
    description:
      "New scheme from 2025–26. First-year papers use 1B-prefix codes (1BMATS101). VTUHub lists those codes and official PDFs; 3rd–8th semester 2025 subjects are not in the catalogue yet and are not mixed with 2022 pages.",
  },
  {
    year: "2022",
    name: "2022 Scheme",
    description:
      "Catalogued 2022 B.E./B.Tech scheme on VTUHub (typically 50 CIE + 50 SEE, Bxx codes). Some official PDFs are still missing, including Smart Agritech 7th/8th.",
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

export const SEMESTER_ORD = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"] as const;

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
    return `First year on the 2022 scheme is stream-based: CSE-stream, electrical-stream, mechanical-stream and civil-stream students take their own Mathematics, Physics or Chemistry papers (for example BMATS101 for the CSE stream). Physics-cycle and chemistry-cycle batches take the science papers in opposite semesters — match the list to your admission ticket${branch ? ` for ${name}` : ""}.`;
  }
  if (n === 2) {
    return `Second semester completes the first-year cycle: Mathematics-II for your stream, the science paper you did not take in sem 1, plus engineering-science, emerging-technology and programming-language options.`;
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
    return `Seventh semester on the 2022 scheme has three core courses, one professional and one open elective, and Major Project Phase-II (6 credits). Check which elective options your college offers.`;
  }
  return `Eighth semester on the 2022 scheme is a 14–20 week industry or research internship (10 credits) plus one professional and one open elective taken as NPTEL online courses.`;
}
