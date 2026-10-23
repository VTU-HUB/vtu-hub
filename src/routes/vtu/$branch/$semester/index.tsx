import { createFileRoute, notFound } from "@tanstack/react-router";
import { SubjectTable } from "@/components/browse/BrowseCards";
import { AdBanner, AdMobile } from "@/components/ads/AdSlot";
import { AppLink } from "@/components/ui/AppLink";
import { BranchSwitcher } from "@/components/ui/BranchSwitcher";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getBranch,
  parseSemesterSlug,
  semesterAbout,
  semesterName,
  semesterPath,
} from "@/data/branches";
import { getSubjectsBySemester } from "@/data/subjects";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/vtu/$branch/$semester/")({
  loader: ({ params }) => {
    const branch = getBranch(params.branch);
    const n = parseSemesterSlug(params.semester);
    if (!branch || !n) throw notFound();
    const subjects = getSubjectsBySemester(branch.slug, n);
    if (subjects.length === 0) throw notFound();
    return { branch, n, semesterSlug: params.semester, subjects };
  },
  head: ({ params }) => {
    const branch = getBranch(params.branch);
    const n = parseSemesterSlug(params.semester) ?? 1;
    return pageHead({
      title: `${branch?.shortName ?? "Branch"} ${semesterName(n)}`,
      description: `Subjects, notes and question papers for VTU ${branch?.shortName ?? "this branch"} ${semesterName(n)} (2022 scheme).`,
      path: `/vtu/${params.branch}/${params.semester}`,
    });
  },
  component: BranchSemesterPage,
});

function BranchSemesterPage() {
  const { branch, n, subjects } = Route.useLoaderData();
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "VTU", href: "/vtu" },
          { label: branch.shortName, href: `/vtu/${branch.slug}` },
          { label: semesterName(n) },
        ]}
      />
      <PageHeader
        kicker={`${branch.shortName} · ${branch.code}`}
        title={`${branch.shortName} · ${semesterName(n)}`}
        description={semesterAbout(n, branch)}
      />
      <Notice className="mb-6">
        You are viewing <strong className="text-foreground">{branch.shortName}</strong> for this
        semester. Other programmes have different subject codes.{" "}
        <AppLink href={semesterPath(n)} className="text-primary hover:underline">
          See all branches in {semesterName(n)}
        </AppLink>
        .
      </Notice>
      <BranchSwitcher semester={n} current={branch.slug} />
      <section className="mt-8">
        <h2 className="mb-2 text-lg font-semibold">Subjects</h2>
        <p className="mb-4 text-sm text-muted">
          {subjects.length} papers on the {branch.shortName} {semesterName(n)} card.
        </p>
        <SubjectTable subjects={subjects} />
      </section>
      <AdBanner />
      <AdMobile />
    </Container>
  );
}
