import { createFileRoute } from "@tanstack/react-router";
import {
  BranchGrid,
  SemesterGrid,
  SemesterJump,
  SectionHead,
} from "@/components/browse/BrowseCards";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { schemes } from "@/data/branches";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/vtu/")({
  head: () =>
    pageHead({
      title: "Browse VTU resources",
      description:
        "Browse VTU notes, question papers and syllabus by branch, semester and 2022 / 2021 / 2018 scheme.",
      path: "/vtu",
    }),
  component: VtuIndex,
});

function VtuIndex() {
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "VTU" }]} />
      <PageHeader
        title="Browse VTU resources"
        description="Open a semester to see every branch, or pick a programme for subject codes. Semesters do not default to CSE."
      />
      <SemesterJump className="mb-8" />
      <section>
        <SectionHead title="Semesters" href="/semesters" />
        <p className="mb-4 max-w-2xl text-sm text-muted">
          Each semester lists CSE, ISE, ECE, EEE, Mechanical and Civil. It does
          not open Computer Science automatically.
        </p>
        <SemesterGrid />
      </section>
      <section className="mt-14">
        <SectionHead title="Branches" />
        <BranchGrid />
      </section>
      <section className="mt-14">
        <SectionHead title="Schemes" href="/schemes" />
        <ul className="grid gap-3 md:grid-cols-3">
          {schemes.map((s) => (
            <li key={s.year}>
              <AppLink
                href={`/schemes/${s.year}`}
                className="block h-full rounded-lg border bg-surface p-4 hover:border-primary/40"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  {s.year}
                </p>
                <h3 className="mt-1 font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm text-muted">{s.description}</p>
              </AppLink>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
