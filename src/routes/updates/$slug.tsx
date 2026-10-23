import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdInArticle, AdMobile } from "@/components/ads/AdSlot";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { getUpdate, updateTypeLabel } from "@/data/updates";
import { pageHead } from "@/lib/seo";
import { formatFullDate } from "@/lib/utils";

export const Route = createFileRoute("/updates/$slug")({
  loader: ({ params }) => {
    const update = getUpdate(params.slug);
    if (!update) throw notFound();
    return { update };
  },
  head: ({ params }) => {
    const update = getUpdate(params.slug);
    return pageHead({
      title: update?.title ?? "Update",
      description: update?.summary ?? "VTU update.",
      path: `/updates/${params.slug}`,
    });
  },
  component: UpdatePage,
});

function UpdatePage() {
  const { update } = Route.useLoaderData();
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Updates", href: "/updates" }, { label: update.title }]} />
      <PageHeader
        kicker={updateTypeLabel[update.type]}
        title={update.title}
        description={update.summary}
        meta={<span>{formatFullDate(update.date)}</span>}
      />
      <Notice className="mb-8">
        Confirm on the official source:{" "}
        <a href={update.sourceUrl} className="text-primary hover:underline">
          {update.sourceLabel}
        </a>
        .
      </Notice>
      <div className="max-w-3xl space-y-4 leading-relaxed text-muted">
        {update.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <AdInArticle />
      <AdMobile />
    </Container>
  );
}
