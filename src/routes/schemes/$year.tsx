import { createFileRoute, notFound } from "@tanstack/react-router";
import { BranchGrid } from "@/components/browse/BrowseCards";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { getScheme, isSchemeYear, schemes } from "@/data/branches";
import { schemePages } from "@/data/scheme-pages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/schemes/$year")({
  loader: ({ params }) => {
    if (!isSchemeYear(params.year)) throw notFound();
    const scheme = getScheme(params.year);
    if (!scheme) throw notFound();
    return { scheme };
  },
  head: ({ params }) => {
    const scheme = getScheme(params.year);
    return pageHead({
      title: scheme?.name ?? "Scheme",
      description: scheme?.description ?? "VTU scheme guide.",
      path: `/schemes/${params.year}`,
    });
  },
  component: SchemePage,
});

function SchemePage() {
  const { scheme } = Route.useLoaderData();
  const extra = schemePages[scheme.year];
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Schemes", href: "/schemes" }, { label: scheme.name }]} />
      <PageHeader
        kicker={`${scheme.year} regulation`}
        title={scheme.name}
        description={scheme.description}
        meta={
          <>
            <span>{extra.cieSee}</span>
            <span>{extra.who}</span>
          </>
        }
      />
      <Notice>
        Confirm the scheme printed on your exam admission ticket. VTUHub organises current notes
        around the 2022 basket; older papers stay useful for practice.
      </Notice>
      <p className="mt-6 text-sm text-muted">Typical codes: {extra.codes}</p>
      {extra.sections.map((sec) => (
        <section key={sec.heading} className="mt-10 max-w-3xl">
          <h2 className="text-lg font-semibold">{sec.heading}</h2>
          {sec.paragraphs.map((p) => (
            <p key={p} className="mt-3 leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </section>
      ))}
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">Browse a branch</h2>
        <BranchGrid />
      </section>
      <ul className="mt-10 flex flex-wrap gap-3 text-sm">
        {schemes
          .filter((s) => s.year !== scheme.year)
          .map((s) => (
            <li key={s.year}>
              <AppLink href={`/schemes/${s.year}`} className="text-primary hover:underline">
                {s.name}
              </AppLink>
            </li>
          ))}
      </ul>
    </Container>
  );
}
