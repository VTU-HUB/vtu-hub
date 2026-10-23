import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticleBody } from "@/components/content/ArticleBody";
import { AdInArticle, AdMobile } from "@/components/ads/AdSlot";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getArticle, relatedArticles } from "@/data/articles";
import { pageHead } from "@/lib/seo";
import { formatFullDate } from "@/lib/utils";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article, related: relatedArticles(article.slug) };
  },
  head: ({ params }) => {
    const article = getArticle(params.slug);
    return pageHead({
      title: article?.title ?? "Article",
      description: article?.description ?? "VTUHub guide.",
      path: `/articles/${params.slug}`,
    });
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData();
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Articles", href: "/articles" }, { label: article.title }]} />
      <PageHeader
        kicker={article.category}
        title={article.title}
        description={article.description}
        meta={
          <>
            <span>Updated {formatFullDate(article.updated)}</span>
            <span>{article.readMinutes} min read</span>
          </>
        }
      />
      <AdInArticle />
      <ArticleBody sections={article.sections} />
      {related.length > 0 ? (
        <aside className="mt-12 max-w-3xl border-t pt-8">
          <h2 className="text-lg font-semibold">Related</h2>
          <ul className="mt-3 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <AppLink
                  href={`/articles/${r.slug}`}
                  className="text-sm text-primary hover:underline"
                >
                  {r.title}
                </AppLink>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
      <AdMobile />
    </Container>
  );
}
