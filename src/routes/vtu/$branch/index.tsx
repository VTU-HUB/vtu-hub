import { createFileRoute, notFound } from "@tanstack/react-router";
import { SemesterGrid, SubjectTable } from "@/components/browse/BrowseCards";
import { AdBanner, AdMobile } from "@/components/ads/AdSlot";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getBranch } from "@/data/branches";
import { flagshipSubjects, getSubjectsByBranch } from "@/data/subjects";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/vtu/$branch/")({
  loader: ({ params }) => {
    const branch = getBranch(params.branch);
    if (!branch) throw notFound();
    return { branch };
  },
  head: ({ params }) => {
    const branch = getBranch(params.branch);
    return pageHead({
      title: `${branch?.shortName ?? "Branch"} · VTU notes and papers`,
      description: branch?.description ?? "VTU branch resources.",
      path: `/vtu/${params.branch}`,
    });
  },
  component: BranchPage,
});

function BranchPage() {
  const { branch } = Route.useLoaderData();
  const subjects = getSubjectsByBranch(branch.slug);
  const featured = flagshipSubjects().filter((s) => s.branch === branch.slug);

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "VTU", href: "/vtu" }, { label: branch.shortName }]} />
      <PageHeader
        kicker={`${branch.code} · 2022 scheme`}
        title={branch.name}
        description={branch.about}
      />
      <section>
        <h2 className="mb-4 text-lg font-semibold">Semesters</h2>
        <SemesterGrid branchSlug={branch.slug} />
      </section>
      {featured.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Core subjects</h2>
          <SubjectTable subjects={featured} />
        </section>
      ) : null}
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">All subjects</h2>
        <SubjectTable subjects={subjects} />
      </section>
      <AdBanner />
      <AdMobile />
    </Container>
  );
}
