import { absUrl, CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

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
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description: SITE_DESCRIPTION,
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
