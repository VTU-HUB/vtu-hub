import { createFileRoute } from "@tanstack/react-router";
import { SearchField } from "@/components/search/SearchField";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { KIND_LABEL, search } from "@/data/search-index";
import { pageHead } from "@/lib/seo";

type SearchParams = { q: string };

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : "",
  }),
  head: () =>
    pageHead({
      title: "Search",
      description: "Search VTUHub for subjects, study guides, tools and articles.",
      path: "/search",
      noindex: true,
    }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const hits = q.trim() ? search(q, 40) : [];
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Search" }]} />
      <PageHeader title="Search" description="Subjects, guides, branches, tools and articles." />
      <div className="max-w-xl">
        <SearchField size="page" initialQuery={q} live={false} />
      </div>
      {q.trim() && hits.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No matches"
            body="Try a subject code (BCS304), a branch (ECE) or a tool (SGPA)."
          />
        </div>
      ) : null}
      {hits.length > 0 ? (
        <ul className="mt-8 divide-y border-t">
          {hits.map((h) => (
            <li key={h.href}>
              <AppLink href={h.href} className="block py-3.5 hover:bg-secondary/60">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  {KIND_LABEL[h.kind]}
                </p>
                <p className="mt-1 font-medium">{h.title}</p>
                <p className="text-sm text-muted">{h.subtitle}</p>
              </AppLink>
            </li>
          ))}
        </ul>
      ) : null}
    </Container>
  );
}
