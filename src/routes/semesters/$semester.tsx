import { createFileRoute, notFound } from "@tanstack/react-router";
import { BranchGrid } from "@/components/browse/BrowseCards";
import { AdBanner, AdMobile } from "@/components/ads/AdSlot";
import { BranchSwitcher } from "@/components/ui/BranchSwitcher";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { parseSemesterSlug, semesterAbout, semesterName } from "@/data/branches";
import { branchesForSemester } from "@/data/subjects";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/semesters/$semester")({
  loader: ({ params }) => {
    const n = parseSemesterSlug(params.semester);
    if (!n) throw notFound();
    const list = branchesForSemester(n);
    if (list.length === 0) throw notFound();
    return { n, slug: params.semester, branches: list };
  },
  head: ({ params }) => {
    const n = parseSemesterSlug(params.semester) ?? 1;
    const list = branchesForSemester(n);
    return pageHead({
      title: `${semesterName(n)} · all VTU branches`,
      description: `Pick a branch for ${semesterName(n)}: ${list.map((b) => b.shortName).join(", ")}. Subjects, notes and question papers follow the branch you choose.`,
      path: `/semesters/${params.semester}`,
    });
  },
  component: SemesterHub,
});

function SemesterHub() {
  const { n } = Route.useLoaderData();
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Semesters", href: "/semesters" },
          { label: semesterName(n) },
        ]}
      />
      <PageHeader
        kicker="All branches"
        title={semesterName(n)}
        description={semesterAbout(n)}
      />
      <Notice className="mb-8">
        This page is the semester hub. Choose your branch below to open subjects
        and files for that programme. VTUHub never assumes Computer Science.
      </Notice>
      <BranchSwitcher semester={n} />
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Branches in this semester</h2>
        <BranchGrid semester={n} />
      </div>
      <AdBanner />
      <AdMobile />
    </Container>
  );
}
