// VTU's official list of 2022-23 UG programmes, their two-letter programme code and
// first-year stream. Source: "Stream-Wise UG Programs and Code" linked from
// https://vtu.ac.in/en/b-e-scheme-syllabus/
// (https://vtu.ac.in/wp-content/uploads/2023/05/Stream-Wise-UG-programs-and-Code-1.pdf).
//
// `slug` is the URL segment (/vtu/<slug>) — never change an existing one. `short` is
// the label used in menus. Programmes VTU adds later that are not listed here still
// sync: they get a slug derived from their name and no first-year stream.

export const OFFICIAL_PROGRAMS = [
  // Civil stream
  { name: "Civil Engineering", code: "CV", stream: "cv", slug: "cv", short: "Civil" },
  { name: "Ceramics and Cement Technology", code: "CC", stream: "cv", slug: "ceramics-cement", short: "Ceramics" },
  { name: "Construction Technology & Management", code: "CT", stream: "cv", slug: "construction-technology", short: "CTM" },
  { name: "Environmental Engineering", code: "EV", stream: "cv", slug: "environmental", short: "Environmental" },
  { name: "Mining Engineering", code: "MI", stream: "cv", slug: "mining", short: "Mining" },
  // Computer Science & Engineering stream
  { name: "Computer Science & Engineering", code: "CS", stream: "cs", slug: "cse", short: "CSE" },
  { name: "Computer Engineering", code: "CE", stream: "cs", slug: "computer-engineering", short: "CE" },
  { name: "Artificial Intelligence & Data Science", code: "AD", stream: "cs", slug: "ai-ds", short: "AI&DS" },
  { name: "Artificial Intelligence and Machine Learning", code: "AI", stream: "cs", slug: "aiml", short: "AIML" },
  { name: "Biotechnology", code: "BT", stream: "cs", slug: "biotechnology", short: "Biotech" },
  { name: "Computer & Communication Engineering", code: "CM", stream: "cs", slug: "computer-communication", short: "CCE" },
  { name: "Computer Science & Business System", code: "CB", stream: "cs", slug: "csbs", short: "CSBS" },
  { name: "Computer Science & Design", code: "CG", stream: "cs", slug: "cs-design", short: "CSD" },
  { name: "Computer Science & Engineering (IoT)", code: "CO", stream: "cs", slug: "cse-iot", short: "CSE-IoT" },
  { name: "CSE (Artificial Intelligence & Machine Learning)", code: "CI", stream: "cs", slug: "cse-aiml", short: "CSE-AIML" },
  { name: "CSE (Artificial Intelligence)", code: "CA", stream: "cs", slug: "cse-ai", short: "CSE-AI" },
  { name: "CSE (Cyber Security)", code: "CY", stream: "cs", slug: "cse-cyber-security", short: "CSE-CY" },
  { name: "CSE (Data Science)", code: "CD", stream: "cs", slug: "cse-ds", short: "CSE-DS" },
  { name: "CSE (IoT & Cyber Security including Block Chain Technology)", code: "IC", stream: "cs", slug: "cse-iot-cyber-blockchain", short: "CSE-ICB" },
  { name: "Data Science", code: "DS", stream: "cs", slug: "data-science", short: "DS" },
  { name: "Information Science & Engineering", code: "IS", stream: "cs", slug: "ise", short: "ISE" },
  // Electrical & Electronics stream
  { name: "Electronics & Communication Engineering", code: "EC", stream: "ee", slug: "ece", short: "ECE" },
  { name: "Biomedical Engineering", code: "BM", stream: "ee", slug: "biomedical", short: "Biomedical" },
  { name: "Electrical & Electronics Engineering", code: "EE", stream: "ee", slug: "eee", short: "EEE" },
  { name: "Electronics & Instrumentation Engineering", code: "EI", stream: "ee", slug: "eie", short: "EIE" },
  { name: "Electronics & Telecommunication Engineering", code: "ET", stream: "ee", slug: "ete", short: "ETE" },
  { name: "Industrial IoT", code: "IO", stream: "ee", slug: "industrial-iot", short: "IIoT" },
  { name: "Medical Electronics Engineering", code: "ML", stream: "ee", slug: "medical-electronics", short: "ML" },
  { name: "Electronics Engineering (VLSI Design and Technology)", code: "VL", stream: "ee", slug: "vlsi", short: "VLSI" },
  { name: "Electronics & Computer Engineering", code: "UE", stream: "ee", slug: "electronics-computer", short: "ECE (Comp)" },
  // Not in the 2022-23 stream list (added to VTU's scheme page later). Its courses are
  // ECE (BEC…) courses, so it belongs to the electrical & electronics stream.
  { name: "Electronics & Communication (Advanced Communication Technology)", code: null, stream: "ee", slug: "electronics-communication-advanced-communication", short: "ECE-ACT" },
  // Mechanical stream
  { name: "Aeronautical Engineering", code: "AE", stream: "me", slug: "aeronautical", short: "Aero" },
  { name: "Aerospace Engineering", code: "AS", stream: "me", slug: "aerospace", short: "Aerospace" },
  { name: "Agricultural Engineering", code: "AG", stream: "me", slug: "agricultural", short: "Agri" },
  { name: "Automation and Robotics", code: "AR", stream: "me", slug: "automation-robotics", short: "A&R" },
  { name: "Automobile Engineering", code: "AU", stream: "me", slug: "automobile", short: "Auto" },
  { name: "Chemical Engineering", code: "CH", stream: "me", slug: "chemical", short: "Chemical" },
  { name: "Industrial & Production Engineering", code: "IP", stream: "me", slug: "industrial-production", short: "IPE" },
  { name: "Industrial Engineering & Management", code: "IM", stream: "me", slug: "iem", short: "IEM" },
  { name: "Manufacturing Science & Engineering", code: "MS", stream: "me", slug: "manufacturing", short: "MSE" },
  { name: "Marine Engineering", code: "MR", stream: "me", slug: "marine", short: "Marine" },
  { name: "Mechanical & Smart Manufacturing Engineering", code: "MM", stream: "me", slug: "mechanical-smart-manufacturing", short: "MSM" },
  { name: "Mechanical Engineering", code: "ME", stream: "me", slug: "me", short: "ME" },
  { name: "Mechatronics", code: "MT", stream: "me", slug: "mechatronics", short: "Mechatronics" },
  { name: "Petrochem Engineering", code: "PC", stream: "me", slug: "petrochem", short: "Petrochem" },
  { name: "Robotics & Automation", code: "RA", stream: "me", slug: "robotics-automation", short: "R&A" },
  { name: "Robotics and Artificial Intelligence", code: "RI", stream: "me", slug: "robotics-ai", short: "R&AI" },
  { name: "Silk Technology", code: "ST", stream: "me", slug: "silk-technology", short: "Silk" },
  { name: "Textile Technology", code: "TX", stream: "me", slug: "textile", short: "Textile" },
  { name: "Energy Engineering", code: "ER", stream: "me", slug: "energy", short: "Energy" },
  { name: "Smart Agritech", code: "SA", stream: "me", slug: "smart-agritech", short: "Smart Agri" },
];

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/&amp;/g, "&")
    .replace(/\bengg\.?\b/g, "engineering")
    .replace(/\bagree?cultural\b/g, "agricultural")
    .replace(/\band\b|&/g, " ")
    .replace(/\bb\.?\s?e\.?\s+in\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const BY_NAME = new Map(OFFICIAL_PROGRAMS.map((p) => [norm(p.name), p]));

export function slugify(s) {
  return norm(s).replace(/\bengineering\b/g, "").trim().replace(/\s+/g, "-").slice(0, 48).replace(/-+$/, "");
}

/** Best official match for a programme name as printed on the scheme page. */
export function matchProgram(name) {
  const n = norm(name);
  if (BY_NAME.has(n)) return BY_NAME.get(n);
  // Tolerate "Engineering" being added or dropped, and minor wording differences.
  const strip = (s) => s.replace(/\bengineering\b/g, "").replace(/\s+/g, " ").trim();
  for (const [k, p] of BY_NAME) if (strip(k) === strip(n)) return p;
  return null;
}
