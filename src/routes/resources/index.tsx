import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { resourceTypes } from "@/data/resource-types";
import { resourcesByType } from "@/data/resources";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/resources/")({
  head: () =>
    pageHead({
      title: "Resources",
      description:
        "Original VTU study guides, practice questions, syllabus walk-throughs and lab-prep checklists organised by type.",
      path: "/resources",
    }),
  component: ResourcesIndex,
});

function ResourcesIndex() {
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Resources" }]} />
      <PageHeader
        title="Resources"
        description="Original unit guides, practice questions, syllabus maps and lab-prep checklists. Grouped by type, then linked back to the subject page. We do not host university PDFs."
      />
      <ul className="grid gap-3 sm:grid-cols-2">
        {resourceTypes.map((t) => {
          const count = resourcesByType(t.slug).length;
          return (
            <li key={t.slug}>
              <AppLink
                href={`/resources/${t.slug}`}
                className="flex h-full flex-col rounded-lg border bg-surface p-4 hover:border-primary/40"
              >
                <h2 className="font-semibold">{t.label}</h2>
                <p className="mt-2 text-sm text-muted">{t.description}</p>
                <p className="mt-3 text-xs text-faint">{count} files</p>
              </AppLink>
            </li>
          );
        })}
        <li>
          <AppLink
            href="/resources/study-materials"
            className="flex h-full flex-col rounded-lg border bg-surface p-4 hover:border-primary/40"
          >
            <h2 className="font-semibold">Study materials</h2>
            <p className="mt-2 text-sm text-muted">
              Notes, important questions and lab manuals on one shelf, with
              context for how to use them before CIE and SEE.
            </p>
          </AppLink>
        </li>
      </ul>
    </Container>
  );
}
