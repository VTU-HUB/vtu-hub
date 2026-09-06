import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { articles } from "@/data/articles";
import { pageHead } from "@/lib/seo";
import { formatFullDate } from "@/lib/utils";

export const Route = createFileRoute("/articles/")({
  head: () =>
    pageHead({
      title: "Guides and articles",
      description:
        "VTU exam preparation, SGPA and CGPA, grading, and subject guides written for students.",
      path: "/articles",
    }),
  component: ArticlesIndex,
});

function ArticlesIndex() {
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Articles" }]} />
      <PageHeader
        title="Guides"
        description="Original explainers on grading, exam prep and how to use previous papers. Not university circulars."
      />
      <ul className="divide-y border-t">
        {articles.map((a) => (
          <li key={a.slug} className="py-5">
            <AppLink href={`/articles/${a.slug}`} className="block hover:text-primary">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                {a.category}
              </p>
              <h2 className="mt-1 text-lg font-semibold">{a.title}</h2>
              <p className="mt-2 text-sm text-muted">{a.description}</p>
              <p className="mt-2 text-xs text-faint">
                {formatFullDate(a.updated)} · {a.readMinutes} min read
              </p>
            </AppLink>
          </li>
        ))}
      </ul>
    </Container>
  );
}
