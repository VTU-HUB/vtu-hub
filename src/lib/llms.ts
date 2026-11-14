import { articles } from "@/data/articles";
import { branches, schemes, semesterName, semesterPath } from "@/data/branches";
import { faqs } from "@/data/faq";
import { resourceTypes } from "@/data/resource-types";
import { subjectPath, subjects } from "@/data/subjects";
import { tools } from "@/data/tools";
import { updates } from "@/data/updates";
import { absUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

/** How many recent updates /llms.txt lists; /llms-full.txt lists all of them. */
const SHORT_UPDATES = 20;

/**
 * /llms.txt is a short index (llmstxt.org): sections and links only.
 * /llms-full.txt adds every subject and every update, for agents that want the whole catalogue.
 */
export function llmsText(full: boolean): string {
  const shownUpdates = full ? updates : updates.slice(0, SHORT_UPDATES);
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
    `- [Coverage](${absUrl("/coverage")})`,
    `- [FAQ](${absUrl("/faq")})`,
    `- [Tools](${absUrl("/tools")})`,
    full
      ? `- [Short index](${absUrl("/llms.txt")})`
      : `- [Full catalogue: every subject and update](${absUrl("/llms-full.txt")})`,
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
    full ? "## Updates" : `## Latest updates`,
    ...shownUpdates.map((u) => `- [${u.title}](${absUrl(`/updates/${u.slug}`)}): ${u.summary}`),
    ...(full || updates.length <= SHORT_UPDATES ? [] : [`- [All ${updates.length} updates](${absUrl("/updates")})`]),
    "",
    "## FAQ",
    ...(full ? faqs.map((f) => `- ${f.q} ${f.a.join(" ")}`) : faqs.map((f) => `- ${f.q}`)),
    ...(full ? [] : [`- [Answers](${absUrl("/faq")})`]),
    "",
  ];
  if (full) {
    lines.push("## Subjects", ...subjects.map((s) => `- [${s.code} ${s.name}](${absUrl(subjectPath(s))}): ${s.description}`), "");
  }
  return lines.join("\n");
}

export function llmsResponse(full: boolean) {
  return new Response(llmsText(full), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
