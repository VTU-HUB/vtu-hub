import { absUrl, CONTACT_EMAIL, GITHUB_URL, LOGO, OG_IMAGE, SITE_ALT_NAMES, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export type Crumb = { label: string; href?: string };
export type FaqItem = { q: string; a: string };

export function pageTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
}

export function organizationLd() {
  return {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [...SITE_ALT_NAMES],
    url: SITE_URL,
    sameAs: [GITHUB_URL],
    email: CONTACT_EMAIL,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: absUrl(LOGO.path),
      contentUrl: absUrl(LOGO.path),
      width: LOGO.width,
      height: LOGO.height,
      caption: LOGO.alt,
    },
    image: {
      "@type": "ImageObject",
      url: absUrl(OG_IMAGE.path),
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
      caption: OG_IMAGE.alt,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Karnataka" },
      { "@type": "Country", name: "India" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Belagavi",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Visvesvaraya Technological University",
      "VTU 2022 scheme",
      "SGPA",
      "CGPA",
      "Computer Science and Engineering",
      "Information Science and Engineering",
      "Electronics and Communication Engineering",
      "Electrical and Electronics Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
    ],
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: [...SITE_ALT_NAMES],
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absUrl(c.href) } : {}),
    })),
  };
}

export function faqLd(faqs: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function graphLd(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationLd(), websiteLd(), ...nodes],
  };
}

/** Longest title body that still fits ~65 chars once " · VTUHub" is appended. */
const TITLE_BUDGET = 65 - ` · ${SITE_NAME}`.length;

/** Returns the first candidate that fits the SERP title budget (falls back to the last one). */
export function fitTitle(...candidates: string[]) {
  return candidates.find((c) => c.length <= TITLE_BUDGET) ?? candidates[candidates.length - 1];
}

/** Trims a meta description to <= max chars at a sentence or word boundary. */
export function clampDesc(text: string, max = 158) {
  const s = text.replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]$/, "")}…`;
}
