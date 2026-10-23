import { articles } from "@/data/articles";
import { branches, semesterName, semesterSlug } from "@/data/branches";
import { resourceTypes } from "@/data/resource-types";
import { subjectPath, subjects } from "@/data/subjects";
import { tools } from "@/data/tools";
import { updates } from "@/data/updates";
import type { ResourceType, Subject } from "@/data/types";

export type SearchKind = "subject" | "resource" | "article" | "update" | "tool" | "branch" | "page";

export type SearchHit = {
  title: string;
  href: string;
  kind: SearchKind;
  subtitle: string;
  haystack: string;
};

function hit(
  title: string,
  href: string,
  kind: SearchKind,
  subtitle: string,
  extra = "",
): SearchHit {
  return {
    title,
    href,
    kind,
    subtitle,
    haystack: `${title} ${subtitle} ${extra}`.toLowerCase(),
  };
}

function typesFor(s: Subject): ResourceType[] {
  if (s.kind === "project") return [];
  if (s.kind === "lab") return ["lab-manuals", "syllabus"];
  if (s.kind === "ability") return ["syllabus"];
  const types: ResourceType[] = ["notes", "question-papers", "syllabus", "important-questions"];
  if (s.hasLab) types.push("lab-manuals");
  return types;
}

export const searchIndex: SearchHit[] = [
  hit("Home", "/", "page", "VTUHub", "vtuhub guides calculators syllabus"),
  hit("Browse VTU resources", "/vtu", "page", "Branches and schemes", "browse vtu"),
  hit("Schemes", "/schemes", "page", "2018 2021 2022", "scheme cie see"),
  hit("2022 Scheme", "/schemes/2022", "page", "Current scheme", "bxx 50 cie"),
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
  ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) =>
    hit(semesterName(n), `/semesters/${semesterSlug(n)}`, "page", "All branches", `${n} semester`),
  ),
  ...branches.map((b) =>
    hit(b.name, `/vtu/${b.slug}`, "branch", b.shortName, `${b.code} ${b.shortName}`),
  ),
  ...subjects.map((s) =>
    hit(
      `${s.name} (${s.code})`,
      subjectPath(s),
      "subject",
      `${s.branch.toUpperCase()} · ${semesterName(s.semester)} · ${s.scheme} scheme`,
      `${s.slug} ${s.shortName} ${s.code} ${s.branch}`,
    ),
  ),
  ...subjects.flatMap((s) =>
    typesFor(s).map((t) => {
      const label = resourceTypes.find((x) => x.slug === t)?.label ?? t;
      return hit(
        `${s.shortName} ${label}`,
        `${subjectPath(s)}/${t}`,
        "resource",
        `${s.code} · ${s.branch.toUpperCase()} · ${semesterName(s.semester)}`,
        `${s.slug} ${s.code} ${t} ${label}`,
      );
    }),
  ),
  ...articles.map((a) => hit(a.title, `/articles/${a.slug}`, "article", a.category, a.description)),
  ...updates.map((u) => hit(u.title, `/updates/${u.slug}`, "update", u.type, u.summary)),
  ...tools.map((t) => hit(t.name, t.href, "tool", "Calculator", t.description)),
];

const KIND_ORDER: SearchKind[] = [
  "subject",
  "resource",
  "article",
  "tool",
  "update",
  "branch",
  "page",
];

export function search(query: string, limit = 40): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const scored: { hit: SearchHit; score: number }[] = [];
  for (const item of searchIndex) {
    let score = 0;
    const title = item.title.toLowerCase();
    if (title === q) score += 50;
    if (title.includes(q)) score += 20;
    if (item.haystack.includes(q)) score += 8;
    let termsOk = true;
    for (const t of terms) {
      if (!item.haystack.includes(t)) {
        termsOk = false;
        break;
      }
      score += title.includes(t) ? 4 : 1;
    }
    if (!termsOk) continue;
    score += 6 - KIND_ORDER.indexOf(item.kind);
    scored.push({ hit: item, score });
  }
  scored.sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const out: SearchHit[] = [];
  for (const s of scored) {
    if (seen.has(s.hit.href)) continue;
    seen.add(s.hit.href);
    out.push(s.hit);
    if (out.length >= limit) break;
  }
  return out;
}

export const KIND_LABEL: Record<SearchKind, string> = {
  subject: "Subject",
  resource: "Resource",
  article: "Article",
  update: "Update",
  tool: "Tool",
  branch: "Branch",
  page: "Page",
};
