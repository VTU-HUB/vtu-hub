import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdInArticle, AdMobile } from "@/components/ads/AdSlot";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FileTable } from "@/components/ui/FileTable";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { getBranch, semesterName, semesterSlug } from "@/data/branches";
import { getResourceType } from "@/data/resource-types";
import { getResource, relatedFiles, subjectFor, typePath } from "@/data/resources";
import { subjectPath } from "@/data/subjects";
import { OFFICIAL_VTU_URL } from "@/lib/site";
import { pageHead } from "@/lib/seo";
import { formatFullDate } from "@/lib/utils";

export const Route = createFileRoute("/files/$id")({
  loader: ({ params }) => {
    const file = getResource(params.id);
    if (!file) throw notFound();
    return { file };
  },
  head: ({ params }) => {
    const file = getResource(params.id);
    return pageHead({
      title: file?.title ?? "Guide",
      description: file?.description ?? "Original VTU study guide.",
      path: `/files/${params.id}`,
    });
  },
  component: FilePage,
});

function FilePage() {
  const { file } = Route.useLoaderData();
  const branch = getBranch(file.branch);
  const type = getResourceType(file.type);
  const subject = subjectFor(file);
  const related = relatedFiles(file);
  const sem = semesterSlug(file.semester);

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Resources", href: "/resources" },
          { label: type?.label ?? file.type, href: `/resources/${file.type}` },
          { label: file.title },
        ]}
      />
      <PageHeader
        kicker={`${type?.label ?? file.type} · original guide`}
        title={file.title}
        description={file.description}
        meta={
          <>
            {branch ? <span>{branch.shortName}</span> : null}
            <span>{semesterName(file.semester)}</span>
            {subject ? <span>{subject.code}</span> : null}
            <span>{file.readMinutes} min read</span>
            <span>Updated {formatFullDate(file.updated)}</span>
          </>
        }
      />
      <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <Meta label="Branch" value={branch?.name ?? file.branch} href={`/vtu/${file.branch}`} />
        <Meta
          label="Semester"
          value={semesterName(file.semester)}
          href={`/vtu/${file.branch}/${sem}`}
        />
        {subject ? (
          <Meta
            label="Subject"
            value={`${subject.name} (${subject.code})`}
            href={subjectPath(subject)}
          />
        ) : null}
        <Meta label="Scheme" value={`${subject?.scheme ?? "2022"} scheme`} href="/schemes/2022" />
        <Meta label="Type" value={type?.label ?? file.type} href={`/resources/${file.type}`} />
        {file.unit ? <Meta label="Unit" value={`Unit ${file.unit}`} /> : null}
      </dl>
      <Notice className="mt-8">
        Original VTUHub writing. Not an official VTU circular and not a scanned university paper.
        Confirm module titles on{" "}
        <a href={OFFICIAL_VTU_URL} className="text-primary hover:underline">
          vtu.ac.in
        </a>
        .
      </Notice>
      <article className="mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted">
        {file.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {file.bullets && file.bullets.length > 0 ? (
          <ul className="list-disc space-y-1.5 pl-5">
            {file.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ) : null}
      </article>
      <AdInArticle />
      {subject ? (
        <p className="mt-8 text-sm">
          <AppLink
            href={typePath(file.branch, file.semester, file.subjectSlug, file.type)}
            className="text-primary hover:underline"
          >
            All {type?.label.toLowerCase() ?? "guides"} for {subject.shortName}
          </AppLink>
        </p>
      ) : null}
      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">Related guides</h2>
          <FileTable files={related} />
        </section>
      ) : null}
      <AdMobile />
    </Container>
  );
}

function Meta({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="rounded-md border bg-surface px-4 py-3">
      <dt className="text-xs font-medium uppercase tracking-wider text-faint">{label}</dt>
      <dd className="mt-1 font-medium">
        {href ? (
          <AppLink href={href} className="hover:text-primary">
            {value}
          </AppLink>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
