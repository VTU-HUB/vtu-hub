export const SITE_NAME = "VTUHub";
export const SITE_URL = "https://vtuhub.site";
export const SITE_TAGLINE = "Original VTU study guides, calculators and scheme explainers";
export const SITE_DESCRIPTION =
  "VTUHub is an independent study platform for Visvesvaraya Technological University students. Original subject guides, practice questions, scheme explainers and in-browser calculators — organised by branch, semester and subject. We do not host university question-paper PDFs or third-party notes.";

export const CONTACT_EMAIL = "contact@vtuhub.site";
export const COPYRIGHT_EMAIL = "copyright@vtuhub.site";
export const CORRECTIONS_EMAIL = "corrections@vtuhub.site";

export const OFFICIAL_VTU_URL = "https://vtu.ac.in";

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
