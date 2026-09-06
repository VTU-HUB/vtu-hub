import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdInArticle, AdMobile } from "@/components/ads/AdSlot";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FileTable } from "@/components/ui/FileTable";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { getBranch, parseSemesterSlug, semesterName } from "@/data/branches";
import { resourceTypes } from "@/data/resource-types";
import { resourceCounts, resourcesFor } from "@/data/resources";
import { getSubject, getSubjectsBySemester, subjectPath } from "@/data/subjects";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/vtu/$branch/$semester/$subject/")({
  loader: ({ params }) => {
    const branch = getBranch(params.branch);
    const n = parseSemesterSlug(params.semester);
    if (!branch || !n) throw notFound();
    const subject = getSubject(branch.slug, n, params.subject);
    if (!subject) throw notFound();
    return { branch, n, semesterSlug: params.semester, subject };
  },
  head: ({ params }) => {
    const n = parseSemesterSlug(params.semester) ?? 1;
    const subject = getSubject(params.branch, n, params.subject);
    return pageHead({
      title: subject
        ? `${subject.name} (${subject.code})`
        : params.subject,
      description: subject?.description ?? "VTU subject resources.",
      path: `/vtu/${params.branch}/${params.semester}/${params.subject}`,
    });
  },
  component: SubjectPage,
});

function SubjectPage() {
  const { branch, n, semesterSlug, subject } = Route.useLoaderData();
  const files = resourcesFor(subject.branch, subject.semester, subject.slug);
  const counts = resourceCounts(subject.branch, subject.semester, subject.slug);
  const siblings = getSubjectsBySemester(branch.slug, n).filter(
    (s) => s.slug !== subject.slug,
  );

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "VTU", href: "/vtu" },
          { label: branch.shortName, href: `/vtu/${branch.slug}` },
          { label: semesterName(n), href: `/vtu/${branch.slug}/${semesterSlug}` },
          { label: subject.shortName },
        ]}
      />
      <PageHeader
        kicker={`${subject.code} · ${branch.shortName} · ${semesterName(n)}`}
        title={subject.name}
        description={subject.description}
        meta={
          <>
            <span>{subject.credits} credits</span>
            <span>{subject.scheme} scheme</span>
            <span className="capitalize">{subject.kind}</span>
          </>
        }
      />
      <ul className="flex flex-wrap gap-2">
        {resourceTypes
          .filter((t) => counts[t.slug] > 0)
          .map((t) => (
            <li key={t.slug}>
              <AppLink
                href={`${subjectPath(subject)}/${t.slug}`}
                className="inline-flex h-11 items-center rounded-md border bg-surface px-3 text-sm font-medium hover:border-primary/40"
              >
                {t.label}
                <span className="ml-2 text-xs text-faint">{counts[t.slug]}</span>
              </AppLink>
            </li>
          ))}
      </ul>
      <Notice className="mt-6">
        Guides on this page are original VTUHub writing. We do not host
        university question-paper PDFs or scanned faculty notes. Confirm module
        titles against the official scheme PDF on vtu.ac.in.
      </Notice>
      {subject.units.length > 0 && subject.kind === "theory" ? (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Modules</h2>
          <ol className="mt-4 divide-y border-t">
            {subject.units.map((u) => (
              <li key={u.number} className="py-3.5">
                <p className="font-medium">
                  Unit {u.number} · {u.title}
                </p>
                <p className="mt-1 text-sm text-muted">{u.topics}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
      {subject.outcomes.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Outcomes</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
            {subject.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
      ) : null}
      <AdInArticle />
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">Guides</h2>
        <FileTable files={files} />
      </section>
      {siblings.length > 0 ? (
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-semibold">Same semester</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {siblings.map((s) => (
              <li key={s.slug}>
                <AppLink href={subjectPath(s)} className="text-primary hover:underline">
                  {s.shortName}
                </AppLink>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <AdMobile />
    </Container>
  );
}
