import { articles } from "@/data/articles";
import { branches, semesterName } from "@/data/branches";
import { resourceTypes } from "@/data/resource-types";
import { subjectPath, subjects } from "@/data/subjects";
import { tools } from "@/data/tools";
import { updates } from "@/data/updates";
import { resources } from "@/data/resources";
import type { SearchEntry, SearchKind } from "@/lib/search";

/**
 * Build-time search index, served compactly at /search-index.json and fetched by
 * the search page (importing this file client-side would ship every subject).
 */
function hit(title: string, href: string, kind: SearchKind, subtitle: string, extra = ""): SearchEntry {
  // Unique words only: title, subtitle and extra repeat a lot, and this ships to browsers.
  const words = `${title} ${subtitle} ${extra}`.toLowerCase().split(/[\s·()]+/).filter(Boolean);
  return { t: title, h: href, k: kind, s: subtitle, x: [...new Set(words)].join(" ") };
}

const branchShort = (slug: string) => branches.find((b) => b.slug === slug)?.shortName ?? slug.toUpperCase();

/** Resource-type pages that were actually built, per subject. */
const builtTypes = new Map<string, Set<string>>();
for (const r of resources) {
  const key = `${r.branch}/${r.semester}/${r.subjectSlug}`;
  builtTypes.set(key, (builtTypes.get(key) ?? new Set()).add(r.type));
}

export const searchIndex: SearchEntry[] = [
  hit("Home", "/", "page", "VTUHub", "vtuhub guides calculators syllabus"),
  hit("Browse VTU resources", "/vtu", "page", "Branches and schemes", "browse vtu"),
  hit("Coverage", "/coverage", "page", "What VTUHub has", "notes syllabus credits 2025"),
  hit("Schemes", "/schemes", "page", "2018 2021 2022 2025", "scheme cie see"),
  hit("2025 Scheme", "/schemes/2025", "page", "New scheme first year", "1bmats101 2025"),
  hit("2022 Scheme", "/schemes/2022", "page", "Catalogued scheme", "bxx 50 cie"),
  hit("2021 Scheme", "/schemes/2021", "page", "Transitional scheme", "21cs"),
  hit("2018 Scheme", "/schemes/2018", "page", "CBCS scheme", "18cs 40 60"),
  hit("FAQ", "/faq", "page", "Questions", "sgpa attendance copyright"),
  hit("Sitemap", "/sitemap", "page", "All pages", "map"),
  hit("Study materials", "/resources/study-materials", "page", "Guides", "study"),
  hit("All notes", "/resources/notes", "page", "Notes", "unit study guides"),
  hit(
    "Practice questions",
    "/resources/question-papers",
    "page",
    "Practice",
    "original practice not see papers",
  ),
  hit("Syllabus", "/resources/syllabus", "page", "Module lists", "scheme pdf"),
  hit("Lab guides", "/resources/lab-manuals", "page", "Labs", "cie experiments"),
  hit(
    "Important questions",
    "/resources/important-questions",
    "page",
    "Practice",
    "module questions",
  ),
  hit("Exam timetable guides", "/updates/exam-timetable", "page", "SEE dates", "timetable"),
  hit("Results guides", "/updates/results", "page", "Revaluation", "photocopy"),
  hit(
    "Academic calendar",
    "/updates/academic-calendar",
    "page",
    "Term dates",
    "cie last working day",
  ),
  ...branches.map((b) =>
    hit(b.name, `/vtu/${b.slug}`, "branch", b.shortName, `${b.code} ${b.shortName}`),
  ),
  ...subjects.map((s) =>
    hit(
      `${s.name} (${s.code})`,
      subjectPath(s),
      "subject",
      `${branchShort(s.branch)} · ${semesterName(s.semester)} · ${s.scheme} scheme`,
      `${s.slug} ${s.shortName} ${s.code} ${s.branch}`,
    ),
  ),
  ...subjects.flatMap((s) =>
    [...(builtTypes.get(`${s.branch}/${s.semester}/${s.slug}`) ?? [])].map((t) => {
      const label = resourceTypes.find((x) => x.slug === t)?.label ?? t;
      return hit(
        `${s.shortName} ${label}`,
        `${subjectPath(s)}/${t}`,
        "resource",
        `${s.code} · ${branchShort(s.branch)} · ${semesterName(s.semester)}`,
        `${s.slug} ${s.code} ${t} ${label}`,
      );
    }),
  ),
  ...articles.map((a) => hit(a.title, `/articles/${a.slug}`, "article", a.category, a.description)),
  ...updates.map((u) => hit(u.title, `/updates/${u.slug}`, "update", u.type, u.summary)),
  ...tools.map((t) => hit(t.name, t.href, "tool", "Calculator", t.description)),
];
