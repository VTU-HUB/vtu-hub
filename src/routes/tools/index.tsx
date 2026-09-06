import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { tools } from "@/data/tools";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/")({
  head: () =>
    pageHead({
      title: "VTU calculators",
      description:
        "SGPA, CGPA, marks, attendance and percentage calculators for VTU students. They run in your browser.",
      path: "/tools",
    }),
  component: ToolsIndex,
});

function ToolsIndex() {
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Tools" }]} />
      <PageHeader
        title="Calculators"
        description="Local tools for SGPA, CGPA, CIE + SEE totals, attendance eligibility and percentages. Nothing is uploaded."
      />
      <ul className="grid gap-3 sm:grid-cols-2">
        {tools.map((t) => (
          <li key={t.slug}>
            <AppLink
              href={t.href}
              className="flex h-full flex-col rounded-lg border bg-surface p-4 hover:border-primary/40"
            >
              <h2 className="font-semibold">{t.name}</h2>
              <p className="mt-2 text-sm text-muted">{t.description}</p>
            </AppLink>
          </li>
        ))}
      </ul>
    </Container>
  );
}
