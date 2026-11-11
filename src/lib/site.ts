export const SITE_NAME = "VTUHub";
export const SITE_URL = "https://vtuhub.site";
export const SITE_TAGLINE = "Original VTU study guides, calculators and scheme explainers";
export const SITE_DESCRIPTION =
  "VTUHub is an independent study platform for Visvesvaraya Technological University students. Original subject guides, practice questions, scheme explainers and in-browser calculators — organised by branch, semester and subject. We do not host university question-paper PDFs or third-party notes.";

/** One inbox for everything: questions, corrections, copyright notices and ads. */
export const CONTACT_EMAIL = "vtuhub2021@gmail.com";
export const COPYRIGHT_EMAIL = CONTACT_EMAIL;
export const CORRECTIONS_EMAIL = CONTACT_EMAIL;

export const OFFICIAL_VTU_URL = "https://vtu.ac.in";

/** Open-source repository: anyone can edit notes through GitHub. */
export const GITHUB_URL = "https://github.com/nishanth-kj/vtu-hub";
export const DISCUSSIONS_URL = `${GITHUB_URL}/discussions`;
export const NEW_ISSUE_URL = `${GITHUB_URL}/issues/new/choose`;

/** GitHub's web editor for one notes file (forks automatically for non-members). */
export function notesEditUrl(code: string) {
  return `${GITHUB_URL}/edit/main/src/data/notes/${code.toUpperCase()}.md`;
}

/** GitHub's "create file" page, pre-filled with a notes skeleton for a new course. */
export function notesNewUrl(code: string, title: string, modules: { number: number; title: string }[]) {
  const body = [
    "---",
    `code: ${code.toUpperCase()}`,
    `title: ${title}`,
    "updated: YYYY-MM-DD   # today's date",
    "---",
    "",
    ...modules.flatMap((m) => [`## Module ${m.number} — ${m.title}`, "", "> **In short:** ", "", "### ", "", ""]),
    "## Exam tips",
    "",
    "- ",
    "",
  ].join("\n");
  const q = new URLSearchParams({ filename: `${code.toUpperCase()}.md`, value: body });
  return `${GITHUB_URL}/new/main/src/data/notes?${q.toString()}`;
}

export function absUrl(path: string) {
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

/** Default social share image. Every page that sets an image must also set alt text. */
export const OG_IMAGE = {
  path: "/og.jpg",
  width: 1200,
  height: 675,
  type: "image/jpeg",
  alt: "VTUHub logo above a stack of ruled study cards with a blue tab, captioned Notes, Papers, Syllabus for VTU students",
} as const;

export const LOGO = { path: "/icon-512.png", width: 512, height: 512, alt: "VTUHub logo: two blue and white study pages" } as const;
