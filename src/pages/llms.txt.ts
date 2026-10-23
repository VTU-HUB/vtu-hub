import { articles } from "@/data/articles";
import { branches, schemes, semesterName, semesterPath } from "@/data/branches";
import { faqs } from "@/data/faq";
import { resourceTypes } from "@/data/resource-types";
import { subjectPath, subjects } from "@/data/subjects";
import { tools } from "@/data/tools";
import { updates } from "@/data/updates";
import { absUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const prerender = true;

export function GET() {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "VTUHub is an independent study site for Visvesvaraya Technological University, Belagavi, Karnataka, India. It is not vtu.ac.in. Official dates, results and scheme PDFs stay on the university site.",
    "",
    "## Start here",
    `- [Home](${absUrl("/")})`,
    `- [Browse](${absUrl("/vtu")})`,
    `- [Semesters](${absUrl("/semesters")})`,
    `- [Schemes](${absUrl("/schemes")})`,
    `- [FAQ](${absUrl("/faq")})`,
    `- [Tools](${absUrl("/tools")})`,
    "",
    "## Schemes",
    ...schemes.map((s) => `- [${s.name}](${absUrl(`/schemes/${s.year}`)}): ${s.description}`),
    "",
    "## Branches",
    ...branches.map((b) => `- [${b.name}](${absUrl(`/vtu/${b.slug}`)}): ${b.description}`),
    "",
    "## Semesters",
    ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `- [${semesterName(n)}](${absUrl(semesterPath(n))})`),
    "",
    "## Resource types",
    ...resourceTypes.map((t) => `- [${t.label}](${absUrl(`/resources/${t.slug}`)}): ${t.description}`),
    "",
    "## Tools",
    ...tools.map((t) => `- [${t.name}](${absUrl(t.href)}): ${t.description}`),
    "",
    "## Articles",
    ...articles.map((a) => `- [${a.title}](${absUrl(`/articles/${a.slug}`)}): ${a.description}`),
    "",
    "## Updates",
    ...updates.map((u) => `- [${u.title}](${absUrl(`/updates/${u.slug}`)}): ${u.summary}`),
    "",
    "## FAQ",
    ...faqs.map((f) => `- ${f.q} ${f.a.join(" ")}`),
    "",
    "## Subjects",
    ...subjects.map((s) => `- [${s.code} ${s.name}](${absUrl(subjectPath(s))}): ${s.description}`),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
