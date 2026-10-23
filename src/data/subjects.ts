import { branches } from "@/data/branches";
import type { Branch, BranchSlug, Subject, SubjectKind, Unit } from "@/data/types";

function units(items: [string, string][]): Unit[] {
  return items.map(([title, topics], i) => ({
    number: i + 1,
    title,
    topics,
  }));
}
const DEFAULT_UNITS = units([
  ["Introduction and fundamentals", "Scope, definitions, and the ideas this module is built on."],
  ["Core methods", "Standard techniques and worked representations used in CIE tests."],
  ["Analysis and design", "How to set up, compare, and reason about typical problems."],
  ["Advanced topics", "Extensions that often appear as SEE long-answer questions."],
  ["Applications", "Where the module shows up in labs, projects, and later subjects."],
]);
type SubjectInput = {
  branch: BranchSlug;
  semester: number;
  slug: string;
  code: string;
  name: string;
  shortName?: string;
  credits?: number;
  kind?: SubjectKind;
  hasLab?: boolean;
  flagship?: boolean;
  description: string;
  outcomes?: string[];
  units?: Unit[];
};

function s(input: SubjectInput): Subject {
  return {
    branch: input.branch,
    semester: input.semester,
    slug: input.slug,
    code: input.code,
    name: input.name,
    shortName: input.shortName ?? input.name,
    scheme: "2022",
    credits: input.credits ?? (input.kind === "lab" ? 1 : 3),
    kind: input.kind ?? "theory",
    hasLab: input.hasLab ?? input.kind === "lab",
    flagship: input.flagship ?? false,
    description: input.description,
    outcomes: input.outcomes ?? [
      `Explain the core ideas of ${input.name} as listed in the ${input.code} syllabus.`,
      `Solve typical CIE and SEE problems from this subject.`,
      `Connect this module to later subjects in the same programme.`,
    ],
    units: input.units ?? DEFAULT_UNITS,
  };
}
function firstYear(branch: BranchSlug, cycle: "physics" | "chemistry"): Subject[] {
  const b = branches.find((x) => x.slug === branch) as Branch;
  const phyFirst = cycle === "physics";
  const semA = phyFirst ? 1 : 2;
  const semB = phyFirst ? 2 : 1;
  return [
    s({
      branch,
      semester: 1,
      slug: "mathematics-i",
      code: "BMAT101",
      name: "Mathematics-I",
      shortName: "Maths-I",
      credits: 4,
      description: `Differential calculus, linear algebra and the first-semester mathematics core for VTU ${b.shortName} students.`,
      units: units([
        [
          "Differential calculus",
          "Partial derivatives, Euler's theorem, total derivatives, Jacobians.",
        ],
        ["Linear algebra", "Matrices, rank, inverse, consistency of linear systems."],
        ["Integral calculus", "Multiple integrals and applications to area and volume."],
        [
          "Ordinary differential equations",
          "First-order and higher-order linear ODEs with constant coefficients.",
        ],
        ["Applications", `Engineering models that show up in later ${b.shortName} subjects.`],
      ]),
    }),
    s({
      branch,
      semester: semA,
      slug: "applied-physics",
      code: "BPHY102",
      name: "Applied Physics",
      shortName: "Physics",
      hasLab: true,
      description: `Applied Physics for the ${phyFirst ? "physics" : "chemistry"}-cycle ${b.shortName} batch.`,
    }),
    s({
      branch,
      semester: semB,
      slug: "applied-chemistry",
      code: "BCHE102",
      name: "Applied Chemistry",
      shortName: "Chemistry",
      hasLab: true,
      description: `Engineering chemistry for VTU ${b.shortName}: water technology, electrochemistry, fuels and polymers.`,
    }),
    s({
      branch,
      semester: 1,
      slug: "programming-in-c",
      code: "BPLCK105",
      name: "Programming in C",
      shortName: "C Programming",
      hasLab: true,
      flagship: branch === "cse" || branch === "ise",
      description: `First-year C programming as taught on the VTU 2022 scheme. Covers types, control flow, functions, arrays, pointers and files.`,
    }),
    s({
      branch,
      semester: 1,
      slug: "communicative-english",
      code: "BENGK106",
      name: "Communicative English",
      shortName: "English",
      credits: 2,
      kind: "ability",
      description: `Communicative English for VTU first-year ${b.shortName}: technical writing and the language paper.`,
    }),
    s({
      branch,
      semester: 2,
      slug: "mathematics-ii",
      code: "BMAT201",
      name: "Mathematics-II",
      shortName: "Maths-II",
      credits: 4,
      description: `Integral transforms, vector calculus and the second-semester mathematics core for ${b.shortName}.`,
    }),
    s({
      branch,
      semester: 2,
      slug: "python-programming",
      code: "BPLCK205",
      name: "Introduction to Python Programming",
      shortName: "Python",
      hasLab: true,
      description: `Introductory Python for VTU ${b.shortName} — syntax, data structures, functions and plotting at first-year depth.`,
    }),
  ];
}
const cseCore: Subject[] = [
  s({
    branch: "cse",
    semester: 3,
    slug: "mathematics-for-cse",
    code: "BCS301",
    name: "Mathematics for Computer Science",
    shortName: "Maths for CSE",
    credits: 4,
    description:
      "Third-semester mathematics for VTU CSE (2022 scheme): statistical methods, random variables and numerical techniques.",
  }),
  s({
    branch: "cse",
    semester: 3,
    slug: "digital-design",
    code: "BCS302",
    name: "Digital Design and Computer Organization",
    shortName: "DDCO",
    flagship: true,
    hasLab: true,
    description:
      "Boolean algebra, combinational and sequential circuits with the processor datapath — the hardware foundation for later OS memory topics.",
  }),
  s({
    branch: "cse",
    semester: 3,
    slug: "operating-systems",
    code: "BCS303",
    name: "Operating Systems",
    shortName: "OS",
    flagship: true,
    description:
      "Operating Systems (BCS303) for VTU CSE 3rd semester. Process management, CPU scheduling, memory, deadlocks and file systems.",
  }),
  s({
    branch: "cse",
    semester: 3,
    slug: "data-structures",
    code: "BCS304",
    name: "Data Structures and Applications",
    shortName: "DSA",
    flagship: true,
    hasLab: true,
    description:
      "Data Structures and Applications (BCS304) is the core 3rd-semester CSE paper. Arrays, stacks, queues, linked lists, trees, graphs and hashing.",
  }),
  s({
    branch: "cse",
    semester: 3,
    slug: "data-structures-lab",
    code: "BCSL305",
    name: "Data Structures Laboratory",
    shortName: "DSA Lab",
    kind: "lab",
    credits: 1,
    description:
      "The DSA lab (BCSL305) implements the structures taught in BCS304. Use the lab manual as a write-up template, not as copy-paste code.",
  }),
  s({
    branch: "cse",
    semester: 3,
    slug: "oop-java",
    code: "BCS306A",
    name: "Object Oriented Programming with JAVA",
    shortName: "OOP Java",
    flagship: true,
    hasLab: true,
    description:
      "OOP with Java (BCS306A) covers classes, inheritance, interfaces, packages, exceptions and basic collections.",
  }),
  s({
    branch: "cse",
    semester: 4,
    slug: "algorithms",
    code: "BCS401",
    name: "Analysis and Design of Algorithms",
    shortName: "ADA",
    flagship: true,
    hasLab: true,
    description:
      "Asymptotic analysis plus divide-and-conquer, greedy, dynamic programming, graph algorithms and NP-completeness at VTU depth.",
  }),
  s({
    branch: "cse",
    semester: 4,
    slug: "discrete-mathematics",
    code: "BCS402",
    name: "Discrete Mathematical Structures",
    shortName: "DMS",
    description:
      "Logic, sets, relations, functions, combinatorics and graph theory as used by computer science. Proof-and-problem based.",
  }),
  s({
    branch: "cse",
    semester: 4,
    slug: "dbms",
    code: "BCS403",
    name: "Database Management Systems",
    shortName: "DBMS",
    flagship: true,
    hasLab: true,
    description:
      "Database Management Systems (BCS403) for VTU CSE 4th semester, 2022 scheme. ER modelling, the relational model, SQL, normalisation, transactions and storage.",
    outcomes: [
      "Draw ER diagrams and map them to a relational schema.",
      "Write SQL for typical university-database questions.",
      "Normalise relations to 3NF/BCNF and explain transaction properties.",
    ],
    units: units([
      ["Introduction and ER model", "Data models, schemas, ER diagrams, keys, constraints."],
      ["Relational model and SQL", "Relational algebra, DDL/DML, joins, nested queries, views."],
      ["Normalisation", "FD, 1NF–BCNF, lossless join, dependency preservation."],
      ["Transactions and concurrency", "ACID, schedules, locking, timestamps, recovery outline."],
      ["Storage and indexing", "File organisation, B+ trees, hashing, query processing idea."],
    ]),
  }),
  s({
    branch: "cse",
    semester: 4,
    slug: "ada-lab",
    code: "BCSL404",
    name: "Analysis and Design of Algorithms Laboratory",
    shortName: "ADA Lab",
    kind: "lab",
    credits: 1,
    description: "ADA laboratory implements sorting, graph and DP algorithms from BCS401.",
  }),
  s({
    branch: "cse",
    semester: 4,
    slug: "data-communication",
    code: "BCS405A",
    name: "Data Communication",
    shortName: "DC",
    description:
      "Physical and data-link ideas that later support Computer Networks in the fifth semester.",
  }),
  s({
    branch: "cse",
    semester: 5,
    slug: "computer-networks",
    code: "BCS502",
    name: "Computer Networks",
    shortName: "CN",
    flagship: true,
    hasLab: true,
    description:
      "Layered architecture, IP, TCP/UDP, routing and application protocols for VTU CSE fifth semester.",
  }),
  s({
    branch: "cse",
    semester: 5,
    slug: "software-engineering",
    code: "BCS501",
    name: "Software Engineering and Project Management",
    shortName: "SE",
    description: "Process models, requirements, design, testing and a project-management outline.",
  }),
  s({
    branch: "cse",
    semester: 5,
    slug: "theory-of-computation",
    code: "BCS503",
    name: "Theory of Computation",
    shortName: "TOC",
    description:
      "Automata, regular languages, CFGs, Turing machines and decidability at syllabus depth.",
  }),
  s({
    branch: "cse",
    semester: 5,
    slug: "web-technology",
    code: "BCS504",
    name: "Web Technology",
    shortName: "Web",
    hasLab: true,
    description: "HTML/CSS/JS and server-side outlines used in fifth-semester web electives.",
  }),
  s({
    branch: "cse",
    semester: 5,
    slug: "cn-lab",
    code: "BCSL505",
    name: "Computer Networks Laboratory",
    shortName: "CN Lab",
    kind: "lab",
    credits: 1,
    description: "Socket and protocol experiments that sit next to BCS502.",
  }),
  s({
    branch: "cse",
    semester: 6,
    slug: "machine-learning",
    code: "BCS601",
    name: "Machine Learning",
    shortName: "ML",
    flagship: true,
    hasLab: true,
    description:
      "Supervised and unsupervised methods at sixth-semester depth: regression, classification, clustering and a neural-net outline.",
  }),
  s({
    branch: "cse",
    semester: 6,
    slug: "full-stack",
    code: "BCS602",
    name: "Full Stack Development",
    shortName: "Full Stack",
    hasLab: true,
    description:
      "Client–server apps, REST and a small database-backed project as listed in the scheme.",
  }),
  s({
    branch: "cse",
    semester: 6,
    slug: "computer-graphics",
    code: "BCS603",
    name: "Computer Graphics and Visualization",
    shortName: "CG",
    description: "2D/3D pipeline, transformations, viewing and a visualisation outline.",
  }),
  s({
    branch: "cse",
    semester: 6,
    slug: "information-security",
    code: "BCS604A",
    name: "Information Security",
    shortName: "InfoSec",
    description:
      "Crypto primitives, authentication, network security and a case-question style used in SEE.",
  }),
  s({
    branch: "cse",
    semester: 6,
    slug: "machine-learning-lab",
    code: "BCSL604",
    name: "Machine Learning Laboratory",
    shortName: "ML Lab",
    kind: "lab",
    credits: 1,
    description:
      "Regression, classification, clustering and a small neural-net notebook. Record metrics.",
  }),
  s({
    branch: "cse",
    semester: 7,
    slug: "big-data-analytics",
    code: "BCS701",
    name: "Big Data Analytics",
    shortName: "Big Data",
    description: "Volume/velocity ideas, Hadoop/Spark at survey depth, and analytics workflows.",
  }),
  s({
    branch: "cse",
    semester: 7,
    slug: "internship",
    code: "BCS784",
    name: "Internship",
    shortName: "Internship",
    kind: "project",
    credits: 6,
    description:
      "The internship credit is assessed by report and presentation. VTUHub does not host employer materials.",
  }),
  s({
    branch: "cse",
    semester: 7,
    slug: "project-work-phase-1",
    code: "BCS786",
    name: "Project Work Phase-1",
    shortName: "Project-I",
    kind: "project",
    credits: 2,
    description: "Phase-1 is literature survey, problem statement and design.",
  }),
  s({
    branch: "cse",
    semester: 8,
    slug: "project-work-phase-2",
    code: "BCS888",
    name: "Project Work Phase-2",
    shortName: "Project-II",
    kind: "project",
    credits: 8,
    description: "Phase-2 is implementation, testing and the final report.",
  }),
  s({
    branch: "cse",
    semester: 8,
    slug: "technical-seminar",
    code: "BCS808",
    name: "Technical Seminar",
    shortName: "Seminar",
    kind: "project",
    credits: 1,
    description: "Seminar credit is presentation and a short report, not a downloadable paper.",
  }),
];
const iseCore: Subject[] = [
  s({
    branch: "ise",
    semester: 3,
    slug: "data-structures",
    code: "BIS304",
    name: "Data Structures and Applications",
    shortName: "DSA",
    flagship: true,
    hasLab: true,
    description:
      "ISE 3rd-semester data structures (BIS304). Same linear and non-linear structures as CSE, with IS-coded papers.",
  }),
  s({
    branch: "ise",
    semester: 3,
    slug: "operating-systems",
    code: "BIS303",
    name: "Operating Systems",
    shortName: "OS",
    flagship: true,
    description:
      "OS for ISE 3rd semester. Scheduling numericals and memory management as in the 2022 scheme.",
  }),
  s({
    branch: "ise",
    semester: 3,
    slug: "digital-design",
    code: "BIS302",
    name: "Digital Design and Computer Organization",
    shortName: "DDCO",
    hasLab: true,
    description: "DDCO for ISE. Boolean algebra through a simple datapath.",
  }),
  s({
    branch: "ise",
    semester: 3,
    slug: "oop-java",
    code: "BIS306A",
    name: "Object Oriented Programming with JAVA",
    shortName: "OOP Java",
    hasLab: true,
    description: "Java OOP for ISE 3rd semester.",
  }),
  s({
    branch: "ise",
    semester: 4,
    slug: "dbms",
    code: "BIS403",
    name: "Database Management Systems",
    shortName: "DBMS",
    flagship: true,
    hasLab: true,
    description: "DBMS for ISE 4th semester (BIS403). ER, SQL, normalisation and transactions.",
  }),
  s({
    branch: "ise",
    semester: 4,
    slug: "algorithms",
    code: "BIS401",
    name: "Analysis and Design of Algorithms",
    shortName: "ADA",
    hasLab: true,
    description: "ADA for ISE 4th semester.",
  }),
  s({
    branch: "ise",
    semester: 4,
    slug: "discrete-mathematics",
    code: "BIS402",
    name: "Discrete Mathematical Structures",
    shortName: "DMS",
    description: "Discrete mathematics for ISE.",
  }),
  s({
    branch: "ise",
    semester: 5,
    slug: "computer-networks",
    code: "BIS502",
    name: "Computer Networks",
    shortName: "CN",
    flagship: true,
    description: "Computer networks for ISE fifth semester.",
  }),
  s({
    branch: "ise",
    semester: 5,
    slug: "software-engineering",
    code: "BIS501",
    name: "Software Engineering",
    shortName: "SE",
    description: "Software engineering for ISE.",
  }),
  s({
    branch: "ise",
    semester: 5,
    slug: "web-technology",
    code: "BIS504",
    name: "Web Technology",
    shortName: "Web",
    hasLab: true,
    description: "Web technologies for ISE, with a lab component.",
  }),
  s({
    branch: "ise",
    semester: 6,
    slug: "machine-learning",
    code: "BIS601",
    name: "Machine Learning",
    shortName: "ML",
    hasLab: true,
    description: "Machine learning for ISE sixth semester.",
  }),
  s({
    branch: "ise",
    semester: 6,
    slug: "information-management",
    code: "BIS602",
    name: "Information Management",
    shortName: "IM",
    description:
      "Information management and systems ideas that distinguish ISE from CSE electives.",
  }),
];
const eceCore: Subject[] = [
  s({
    branch: "ece",
    semester: 3,
    slug: "network-analysis",
    code: "BEC302",
    name: "Network Analysis",
    shortName: "NA",
    flagship: true,
    description: "Circuit theorems, transients and two-port networks for VTU ECE 3rd semester.",
  }),
  s({
    branch: "ece",
    semester: 3,
    slug: "analog-electronics",
    code: "BEC303",
    name: "Analog Electronic Circuits",
    shortName: "AEC",
    flagship: true,
    hasLab: true,
    description: "Diodes, BJT/FET amplifiers and op-amp applications.",
  }),
  s({
    branch: "ece",
    semester: 3,
    slug: "digital-electronics",
    code: "BEC304",
    name: "Digital System Design",
    shortName: "DSD",
    hasLab: true,
    description: "Combinational and sequential digital design for ECE.",
  }),
  s({
    branch: "ece",
    semester: 4,
    slug: "signals-and-systems",
    code: "BEC401",
    name: "Signals and Systems",
    shortName: "S&S",
    flagship: true,
    description: "Continuous and discrete signals, LTI systems, Fourier and Laplace at ECE depth.",
  }),
  s({
    branch: "ece",
    semester: 4,
    slug: "control-systems",
    code: "BEC402",
    name: "Control Systems",
    shortName: "CS",
    description: "Modelling, time response, stability and compensators.",
  }),
  s({
    branch: "ece",
    semester: 5,
    slug: "digital-communication",
    code: "BEC501",
    name: "Digital Communication",
    shortName: "DC",
    flagship: true,
    description: "PCM, digital modulation, matched filters and a noise outline.",
  }),
  s({
    branch: "ece",
    semester: 5,
    slug: "vlsi",
    code: "BEC502",
    name: "VLSI Design",
    shortName: "VLSI",
    hasLab: true,
    description: "MOS, CMOS logic and a layout/FPGA outline as listed in the scheme.",
  }),
  s({
    branch: "ece",
    semester: 6,
    slug: "microwave",
    code: "BEC601",
    name: "Microwave Engineering",
    shortName: "MW",
    description: "Waveguides, microwave tubes and a radar outline at sixth-semester depth.",
  }),
];
const eeeCore: Subject[] = [
  s({
    branch: "eee",
    semester: 3,
    slug: "electric-circuit-analysis",
    code: "BEE302",
    name: "Electric Circuit Analysis",
    shortName: "ECA",
    flagship: true,
    description: "Network theorems and transients for VTU EEE 3rd semester.",
  }),
  s({
    branch: "eee",
    semester: 3,
    slug: "transformers-and-generators",
    code: "BEE303",
    name: "Transformers and Generators",
    shortName: "T&G",
    hasLab: true,
    description: "Single-phase/three-phase transformers and synchronous generators.",
  }),
  s({
    branch: "eee",
    semester: 4,
    slug: "induction-motors",
    code: "BEE401",
    name: "Induction Motors",
    shortName: "IM",
    flagship: true,
    hasLab: true,
    description: "Three-phase and single-phase induction motors, starting and speed control.",
  }),
  s({
    branch: "eee",
    semester: 4,
    slug: "power-generation",
    code: "BEE402",
    name: "Power Generation and Economics",
    shortName: "PG",
    description: "Thermal, hydro, nuclear and a tariff/economics outline.",
  }),
  s({
    branch: "eee",
    semester: 5,
    slug: "power-system-analysis",
    code: "BEE501",
    name: "Power System Analysis",
    shortName: "PSA",
    flagship: true,
    description: "Per-unit, load flow, faults and stability at fifth-semester depth.",
  }),
  s({
    branch: "eee",
    semester: 6,
    slug: "switchgear",
    code: "BEE601",
    name: "Switchgear and Protection",
    shortName: "SGP",
    description: "Relays, circuit breakers and protection of lines, transformers and machines.",
  }),
];
const meCore: Subject[] = [
  s({
    branch: "me",
    semester: 3,
    slug: "mechanics-of-materials",
    code: "BME302",
    name: "Mechanics of Materials",
    shortName: "MOM",
    flagship: true,
    description: "Stress, strain, torsion, bending and columns for VTU Mechanical 3rd semester.",
  }),
  s({
    branch: "me",
    semester: 3,
    slug: "thermodynamics",
    code: "BME303",
    name: "Engineering Thermodynamics",
    shortName: "TD",
    flagship: true,
    description: "First and second law, properties of steam and gas cycles.",
  }),
  s({
    branch: "me",
    semester: 4,
    slug: "fluid-mechanics",
    code: "BME401",
    name: "Fluid Mechanics",
    shortName: "FM",
    flagship: true,
    hasLab: true,
    description: "Statics, kinematics, Bernoulli, viscous flow and dimensional analysis.",
  }),
  s({
    branch: "me",
    semester: 4,
    slug: "manufacturing",
    code: "BME402",
    name: "Manufacturing Process",
    shortName: "MP",
    hasLab: true,
    description: "Casting, welding, forming and machining as listed in the scheme.",
  }),
  s({
    branch: "me",
    semester: 5,
    slug: "design-of-machine-elements",
    code: "BME501",
    name: "Design of Machine Elements",
    shortName: "DME",
    flagship: true,
    description:
      "Static and fatigue design of shafts, keys, couplings and joints. Cite the design data handbook your college uses.",
  }),
  s({
    branch: "me",
    semester: 6,
    slug: "heat-transfer",
    code: "BME601",
    name: "Heat Transfer",
    shortName: "HT",
    description: "Conduction, convection, radiation and heat exchangers at sixth-semester depth.",
  }),
];
const cvCore: Subject[] = [
  s({
    branch: "cv",
    semester: 3,
    slug: "strength-of-materials",
    code: "BCV302",
    name: "Strength of Materials",
    shortName: "SOM",
    flagship: true,
    description: "Axial, bending, shear and torsion for VTU Civil 3rd semester.",
  }),
  s({
    branch: "cv",
    semester: 3,
    slug: "surveying",
    code: "BCV303",
    name: "Surveying",
    shortName: "Surveying",
    hasLab: true,
    flagship: true,
    description: "Chain, compass, levelling, theodolite and a total-station outline.",
  }),
  s({
    branch: "cv",
    semester: 4,
    slug: "structural-analysis",
    code: "BCV401",
    name: "Structural Analysis",
    shortName: "SA",
    flagship: true,
    description:
      "Determinate and indeterminate structures, slope-deflection and moment distribution.",
  }),
  s({
    branch: "cv",
    semester: 4,
    slug: "concrete-technology",
    code: "BCV402",
    name: "Concrete Technology",
    shortName: "CT",
    hasLab: true,
    description:
      "Materials, mix design, fresh and hardened properties. Cite the IS code your college uses.",
  }),
  s({
    branch: "cv",
    semester: 5,
    slug: "rcc",
    code: "BCV501",
    name: "Design of RC Structural Elements",
    shortName: "RCC",
    flagship: true,
    description:
      "Limit-state design of beams, slabs, columns and footings. Always write the IS 456 clause you are using.",
  }),
  s({
    branch: "cv",
    semester: 5,
    slug: "geotechnical-engineering",
    code: "BCV502",
    name: "Geotechnical Engineering",
    shortName: "GTE",
    description: "Index properties, compaction, permeability, shear strength and bearing capacity.",
  }),
  s({
    branch: "cv",
    semester: 6,
    slug: "transportation-engineering",
    code: "BCV601",
    name: "Transportation Engineering",
    shortName: "TE",
    description: "Highway geometric design, traffic, pavements and a railway/airport outline.",
  }),
];

function seniorYear(
  branch: BranchSlug,
  intern: string,
  p1: string,
  p2: string,
  seminar: string,
): Subject[] {
  const b = branches.find((x) => x.slug === branch) as Branch;
  return [
    s({
      branch,
      semester: 7,
      slug: "internship",
      code: intern,
      name: "Internship / Professional Practice",
      shortName: "Internship",
      kind: "project",
      credits: 3,
      description: `Internship credit for VTU ${b.shortName}. Duration and the report format come from the college and the current circular.`,
    }),
    s({
      branch,
      semester: 7,
      slug: "project-work-phase-1",
      code: p1,
      name: "Project Work Phase-1",
      shortName: "Project-1",
      kind: "project",
      credits: 3,
      description: `Project phase-1 for ${b.shortName}: literature, problem statement and a review.`,
    }),
    s({
      branch,
      semester: 8,
      slug: "project-work-phase-2",
      code: p2,
      name: "Project Work Phase-2",
      shortName: "Project-2",
      kind: "project",
      credits: 8,
      description: `Project phase-2 for ${b.shortName}: implementation, report and viva.`,
    }),
    s({
      branch,
      semester: 8,
      slug: "technical-seminar",
      code: seminar,
      name: "Technical Seminar",
      shortName: "Seminar",
      kind: "project",
      credits: 1,
      description: `Seminar credit is a presentation and a short report for ${b.shortName}.`,
    }),
  ];
}

const iseMore: Subject[] = [
  s({
    branch: "ise",
    semester: 3,
    slug: "mathematics-for-ise",
    code: "BIS301",
    name: "Mathematics for Information Science",
    shortName: "Maths for ISE",
    credits: 4,
    description:
      "Third-semester mathematics for VTU ISE (2022 scheme): statistics, transforms and numerical methods.",
  }),
  s({
    branch: "ise",
    semester: 3,
    slug: "data-structures-lab",
    code: "BISL305",
    name: "Data Structures Laboratory",
    shortName: "DSA Lab",
    kind: "lab",
    credits: 1,
    description: "ISE data-structures lab accompanying BIS304.",
  }),
  s({
    branch: "ise",
    semester: 4,
    slug: "ada-lab",
    code: "BISL404",
    name: "Algorithms Laboratory",
    shortName: "ADA Lab",
    kind: "lab",
    credits: 1,
    description: "Algorithm implementations for ISE fourth semester.",
  }),
  s({
    branch: "ise",
    semester: 5,
    slug: "cn-lab",
    code: "BISL505",
    name: "Computer Networks Laboratory",
    shortName: "CN Lab",
    kind: "lab",
    credits: 1,
    description: "Network experiments that sit next to BIS502.",
  }),
  s({
    branch: "ise",
    semester: 6,
    slug: "full-stack",
    code: "BIS603",
    name: "Full Stack Development",
    shortName: "Full Stack",
    hasLab: true,
    description: "Client–server apps for ISE sixth semester.",
  }),
  s({
    branch: "ise",
    semester: 7,
    slug: "big-data-analytics",
    code: "BIS701",
    name: "Big Data Analytics",
    shortName: "Big Data",
    description: "Analytics workflows and distributed data ideas at ISE seventh-semester depth.",
  }),
];

const eceMore: Subject[] = [
  s({
    branch: "ece",
    semester: 3,
    slug: "mathematics-for-ece",
    code: "BEC301",
    name: "Mathematics for ECE",
    shortName: "Maths for ECE",
    credits: 4,
    description: "Transforms, complex variables and numerical methods for VTU ECE third semester.",
  }),
  s({
    branch: "ece",
    semester: 3,
    slug: "electromagnetics",
    code: "BEC305",
    name: "Electromagnetic Field Theory",
    shortName: "EMFT",
    description: "Electrostatics, magnetostatics and Maxwell at ECE third-semester depth.",
  }),
  s({
    branch: "ece",
    semester: 4,
    slug: "analog-communication",
    code: "BEC403",
    name: "Analog Communication",
    shortName: "AC",
    hasLab: true,
    description: "AM, FM, noise and analog receivers for ECE fourth semester.",
  }),
  s({
    branch: "ece",
    semester: 5,
    slug: "digital-signal-processing",
    code: "BEC503",
    name: "Digital Signal Processing",
    shortName: "DSP",
    hasLab: true,
    flagship: true,
    description: "DFT, FFT, FIR/IIR filters and a DSP-lab companion for ECE fifth semester.",
  }),
  s({
    branch: "ece",
    semester: 6,
    slug: "antennas",
    code: "BEC602",
    name: "Antennas and Propagation",
    shortName: "Antennas",
    description: "Antenna parameters, arrays and radio-wave propagation.",
  }),
  s({
    branch: "ece",
    semester: 7,
    slug: "embedded-systems",
    code: "BEC701",
    name: "Embedded Systems",
    shortName: "Embedded",
    hasLab: true,
    description:
      "Microcontrollers, peripherals and a small embedded project at seventh-semester depth.",
  }),
];

const eeeMore: Subject[] = [
  s({
    branch: "eee",
    semester: 3,
    slug: "mathematics-for-eee",
    code: "BEE301",
    name: "Mathematics for EEE",
    shortName: "Maths for EEE",
    credits: 4,
    description: "Linear algebra, transforms and numerical methods for VTU EEE third semester.",
  }),
  s({
    branch: "eee",
    semester: 3,
    slug: "analog-electronics-eee",
    code: "BEE304",
    name: "Analog Electronic Circuits",
    shortName: "AEC",
    hasLab: true,
    description: "Diodes, BJT/FET amplifiers and op-amps for EEE.",
  }),
  s({
    branch: "eee",
    semester: 4,
    slug: "electrical-measurements",
    code: "BEE403",
    name: "Electrical Measurements",
    shortName: "EM",
    description: "Instruments, bridges and transducers used in EEE measurements papers.",
  }),
  s({
    branch: "eee",
    semester: 5,
    slug: "control-systems-eee",
    code: "BEE502",
    name: "Control Systems",
    shortName: "CS",
    flagship: true,
    description: "Modelling, time response, stability and compensators for EEE fifth semester.",
  }),
  s({
    branch: "eee",
    semester: 6,
    slug: "power-electronics",
    code: "BEE602",
    name: "Power Electronics",
    shortName: "PE",
    hasLab: true,
    description: "Choppers, inverters, converters and drives at sixth-semester depth.",
  }),
  s({
    branch: "eee",
    semester: 7,
    slug: "high-voltage",
    code: "BEE701",
    name: "High Voltage Engineering",
    shortName: "HV",
    description: "Breakdown, generation and measurement of high voltages, and insulation testing.",
  }),
];

const meMore: Subject[] = [
  s({
    branch: "me",
    semester: 3,
    slug: "mathematics-for-me",
    code: "BME301",
    name: "Mathematics for Mechanical Engineering",
    shortName: "Maths for ME",
    credits: 4,
    description:
      "Differential equations, Laplace and numerical methods for VTU Mechanical third semester.",
  }),
  s({
    branch: "me",
    semester: 3,
    slug: "material-science",
    code: "BME304",
    name: "Material Science and Engineering",
    shortName: "MSE",
    description: "Crystal structure, phase diagrams, heat treatment and mechanical properties.",
  }),
  s({
    branch: "me",
    semester: 4,
    slug: "kinematics-of-machines",
    code: "BME403",
    name: "Kinematics of Machines",
    shortName: "KOM",
    description: "Mechanisms, velocity and acceleration diagrams, cams and gears.",
  }),
  s({
    branch: "me",
    semester: 5,
    slug: "dynamics-of-machines",
    code: "BME502",
    name: "Dynamics of Machines",
    shortName: "DOM",
    description: "Balancing, governors, gyroscopes and vibration at fifth-semester depth.",
  }),
  s({
    branch: "me",
    semester: 6,
    slug: "cad-cam",
    code: "BME602",
    name: "CAD / CAM",
    shortName: "CAD/CAM",
    hasLab: true,
    description: "Geometric modelling, CNC and a CAM outline as listed in the scheme.",
  }),
  s({
    branch: "me",
    semester: 7,
    slug: "finite-element-method",
    code: "BME701",
    name: "Finite Element Methods",
    shortName: "FEM",
    description:
      "One- and two-dimensional elements, stiffness assembly and a thermal/structural outline.",
  }),
];

const cvMore: Subject[] = [
  s({
    branch: "cv",
    semester: 3,
    slug: "mathematics-for-cv",
    code: "BCV301",
    name: "Mathematics for Civil Engineering",
    shortName: "Maths for Civil",
    credits: 4,
    description: "Numerical methods and statistics used in VTU Civil third semester.",
  }),
  s({
    branch: "cv",
    semester: 3,
    slug: "fluid-mechanics-cv",
    code: "BCV304",
    name: "Fluid Mechanics and Hydraulics",
    shortName: "FMH",
    hasLab: true,
    description: "Hydrostatics, flow in pipes and open channels for Civil third semester.",
  }),
  s({
    branch: "cv",
    semester: 4,
    slug: "hydrology",
    code: "BCV403",
    name: "Engineering Hydrology",
    shortName: "Hydrology",
    description: "Rainfall, runoff, hydrographs and reservoir sizing at fourth-semester depth.",
  }),
  s({
    branch: "cv",
    semester: 5,
    slug: "environmental-engineering",
    code: "BCV503",
    name: "Environmental Engineering",
    shortName: "EE",
    description: "Water supply, treatment and wastewater as listed in the Civil scheme.",
  }),
  s({
    branch: "cv",
    semester: 6,
    slug: "quantity-surveying",
    code: "BCV602",
    name: "Quantity Surveying and Contract Management",
    shortName: "QS",
    description:
      "Estimation, rate analysis and a contracts outline. Follow the IS/KPWD schedule your college uses.",
  }),
  s({
    branch: "cv",
    semester: 7,
    slug: "design-of-steel-structures",
    code: "BCV701",
    name: "Design of Steel Structures",
    shortName: "DSS",
    flagship: true,
    description:
      "Limit-state design of tension, compression and flexural steel members. Cite IS 800.",
  }),
];

export const subjects: Subject[] = [
  ...(["cse", "ise", "ece"] as BranchSlug[]).flatMap((b) => firstYear(b, "physics")),
  ...(["eee", "me", "cv"] as BranchSlug[]).flatMap((b) => firstYear(b, "chemistry")),
  ...cseCore,
  ...iseCore,
  ...iseMore,
  ...seniorYear("ise", "BIS704", "BIS714", "BIS802", "BIS808"),
  ...eceCore,
  ...eceMore,
  ...seniorYear("ece", "BEC704", "BEC714", "BEC802", "BEC808"),
  ...eeeCore,
  ...eeeMore,
  ...seniorYear("eee", "BEE704", "BEE714", "BEE802", "BEE808"),
  ...meCore,
  ...meMore,
  ...seniorYear("me", "BME704", "BME714", "BME802", "BME808"),
  ...cvCore,
  ...cvMore,
  ...seniorYear("cv", "BCV704", "BCV714", "BCV802", "BCV808"),
];
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
  return subjects.filter(
    (x) => x.branch === branch && (semester == null || x.semester === semester),
  ).length;
}
function getSubject(branch: string, semester: number, slug: string): Subject | undefined {
  return subjects.find((x) => x.branch === branch && x.semester === semester && x.slug === slug);
}
function subjectPath(sub: Subject) {
  const ord = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"][sub.semester - 1];
  return `/vtu/${sub.branch}/${ord}-semester/${sub.slug}`;
}
function flagshipSubjects() {
  return subjects.filter((x) => x.flagship);
}
/** One (or more) flagship subject per branch so the home list is not CSE-only. */
function popularSubjectsMixed(limit = 8): Subject[] {
  const buckets = new Map<BranchSlug, Subject[]>();
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
  flagshipSubjects,
  popularSubjectsMixed,
};
