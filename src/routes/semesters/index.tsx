import { createFileRoute } from "@tanstack/react-router";
import { SemesterGrid } from "@/components/browse/BrowseCards";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/semesters/")({
  head: () =>
    pageHead({
      title: "Browse by semester",
      description:
        "Open a VTU semester to see every branch that runs that term — CSE, ISE, ECE, EEE, Mechanical and Civil — then pick your programme.",
      path: "/semesters",
    }),
  component: SemestersIndex,
});

function SemestersIndex() {
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Semesters" }]} />
      <PageHeader
        kicker="All programmes"
        title="Browse by semester"
        description="Each semester page lists the branches that run that term. You choose the branch after you open the semester — nothing defaults to CSE."
      />
      <SemesterGrid />
    </Container>
  );
}
