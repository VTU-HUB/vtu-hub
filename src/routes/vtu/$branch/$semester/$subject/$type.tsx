import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdInArticle, AdMobile } from "@/components/ads/AdSlot";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { FileTable } from "@/components/ui/FileTable";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { getBranch, parseSemesterSlug, semesterName } from "@/data/branches";
import { getResourceType, isResourceType } from "@/data/resource-types";
import { resourcesFor } from "@/data/resources";
import { getSubject, subjectPath } from "@/data/subjects";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/vtu/$branch/$semester/$subject/$type")({
  loader: ({ params }) => {
    const branch = getBranch(params.branch);
    const n = parseSemesterSlug(params.semester);
    if (!branch || !n || !isResourceType(params.type)) throw notFound();
    const subject = getSubject(branch.slug, n, params.subject);
    const type = getResourceType(params.type);
    if (!subject || !type) throw notFound();
    const files = resourcesFor(subject.branch, subject.semester, subject.slug, type.slug);
    return { branch, n, semesterSlug: params.semester, subject, type, files };
  },
  head: ({ params }) => {
    const n = parseSemesterSlug(params.semester) ?? 1;
    const subject = getSubject(params.branch, n, params.subject);
    const type = getResourceType(params.type);
    const branch = getBranch(params.branch);
    return pageHead({
      title: `${subject?.shortName ?? "Subject"} ${type?.label ?? "files"}`,
      description: `${type?.label ?? "Files"} for ${subject?.name ?? params.subject} — VTU ${branch?.shortName ?? params.branch} ${semesterName(n)}.`,
      path: `/vtu/${params.branch}/${params.semester}/${params.subject}/${params.type}`,
    });
  },
  component: TypePage,
});

function TypePage() {
  const { branch, n, semesterSlug, subject, type, files } = Route.useLoaderData();
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "VTU", href: "/vtu" },
          { label: branch.shortName, href: `/vtu/${branch.slug}` },
          { label: semesterName(n), href: `/vtu/${branch.slug}/${semesterSlug}` },
          { label: subject.shortName, href: subjectPath(subject) },
          { label: type.label },
        ]}
      />
      <PageHeader
        kicker={subject.code}
        title={`${subject.shortName} ${type.label}`}
        description={type.description}
      />
      <Notice className="mb-6">
        Original study guides. Official SEE papers and college manuals are issued by VTU and your
        department — we do not host those PDFs.
      </Notice>
      {files.length === 0 ? (
        <EmptyState
          title={`No ${type.label.toLowerCase()} yet`}
          body="This subject does not have files of this type on VTUHub."
          action={
            <AppLink href={subjectPath(subject)} className="text-sm text-primary hover:underline">
              Back to subject
            </AppLink>
          }
        />
      ) : (
        <FileTable files={files} />
      )}
      <AdInArticle />
      <AdMobile />
    </Container>
  );
}
