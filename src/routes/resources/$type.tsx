import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdBanner, AdMobile } from "@/components/ads/AdSlot";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FileTable } from "@/components/ui/FileTable";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { branches } from "@/data/branches";
import { getResourceType, isResourceType } from "@/data/resource-types";
import { resourcesByType } from "@/data/resources";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/resources/$type")({
  loader: ({ params }) => {
    if (!isResourceType(params.type)) throw notFound();
    const type = getResourceType(params.type);
    if (!type) throw notFound();
    const files = resourcesByType(type.slug);
    return { type, files };
  },
  head: ({ params }) => {
    const type = getResourceType(params.type);
    return pageHead({
      title: `VTU ${type?.label ?? "resources"}`,
      description: type?.description ?? "VTU study files.",
      path: `/resources/${params.type}`,
    });
  },
  component: ResourceTypePage,
});

function ResourceTypePage() {
  const { type, files } = Route.useLoaderData();
  const [branch, setBranch] = useState("");
  const shown = (branch ? files.filter((f) => f.branch === branch) : files).slice(0, 80);
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: type.label }]} />
      <PageHeader title={type.label} description={type.description} />
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter by branch">
        <button
          type="button"
          onClick={() => setBranch("")}
          className={cn(
            "inline-flex h-11 items-center rounded-md border px-3 text-sm font-medium",
            branch === "" ? "border-primary bg-secondary" : "bg-surface hover:border-primary/40",
          )}
        >
          All branches
        </button>
        {branches.map((b) => (
          <button
            key={b.slug}
            type="button"
            onClick={() => setBranch(b.slug)}
            className={cn(
              "inline-flex h-11 items-center rounded-md border px-3 text-sm font-medium",
              branch === b.slug
                ? "border-primary bg-secondary"
                : "bg-surface hover:border-primary/40",
            )}
          >
            {b.shortName}
          </button>
        ))}
      </div>
      <Notice className="mb-6">
        {shown.length} original guides shown. Open a subject for the full list. We do not host
        university paper PDFs.{" "}
        <AppLink href="/resources/study-materials" className="text-primary hover:underline">
          Study materials
        </AppLink>
      </Notice>
      <FileTable files={shown} showSubject />
      <AdBanner />
      <AdMobile />
    </Container>
  );
}
