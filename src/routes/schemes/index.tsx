import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { schemes } from "@/data/branches";
import { schemePages } from "@/data/scheme-pages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/schemes/")({
  head: () =>
    pageHead({
      title: "VTU schemes — 2022, 2021 and 2018",
      description:
        "How VTU 2022, 2021 and 2018 schemes differ: subject codes, CIE/SEE splits and which papers to practise.",
      path: "/schemes",
    }),
  component: SchemesIndex,
});

function SchemesIndex() {
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Schemes" }]} />
      <PageHeader
        title="VTU schemes"
        description="A scheme is the regulation your batch is examined under. Match the year on your admission ticket before you download notes or punch numbers into the marks calculator."
      />
      <ul className="grid gap-3 md:grid-cols-3">
        {schemes.map((s) => {
          const extra = schemePages[s.year];
          return (
            <li key={s.year}>
              <AppLink
                href={`/schemes/${s.year}`}
                className="flex h-full flex-col rounded-lg border bg-surface p-4 hover:border-primary/40"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted">{s.year}</p>
                <h2 className="mt-1 font-semibold">{s.name}</h2>
                <p className="mt-2 text-sm text-muted">{s.description}</p>
                <p className="mt-3 text-xs text-faint">{extra.cieSee}</p>
              </AppLink>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
