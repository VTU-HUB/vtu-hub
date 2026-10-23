import { createFileRoute } from "@tanstack/react-router";
import { AdBanner, AdMobile } from "@/components/ads/AdSlot";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FileTable } from "@/components/ui/FileTable";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { resourceTypes } from "@/data/resource-types";
import { studyMaterials } from "@/data/resources";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/resources/study-materials")({
  head: () =>
    pageHead({
      title: "VTU study materials",
      description:
        "Unit notes, important questions and lab manuals for VTU programmes, grouped so you can study one subject at a time.",
      path: "/resources/study-materials",
    }),
  component: StudyMaterials,
});

function StudyMaterials() {
  const files = studyMaterials(48);
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs
        items={[{ label: "Resources", href: "/resources" }, { label: "Study materials" }]}
      />
      <PageHeader
        title="Study materials"
        description="Original unit guides, important questions and lab-prep checklists. Official previous papers stay with VTU and your college — we do not host those PDFs."
      />
      <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted">
        <p>
          Study materials on VTUHub are original guides organised by subject, then by module. Open
          the subject page when you need the syllabus sitting next to the notes — that pairing is
          how you catch a module the class skipped.
        </p>
        <p>
          Important-question lists are drill prompts written here. They are not a leak. Lab guides
          are prep checklists; follow your college instructor for equipment and the signed manual.
        </p>
      </div>
      <ul className="mt-8 flex flex-wrap gap-2">
        {resourceTypes.map((t) => (
          <li key={t.slug}>
            <AppLink
              href={`/resources/${t.slug}`}
              className="inline-flex h-11 items-center rounded-md border bg-surface px-3 text-sm font-medium hover:border-primary/40"
            >
              {t.label}
            </AppLink>
          </li>
        ))}
      </ul>
      <Notice className="mt-8">
        Original VTUHub writing. Confirm module titles against the official scheme PDF on vtu.ac.in.
      </Notice>
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Recent guides</h2>
        <FileTable files={files} showSubject />
      </section>
      <AdBanner />
      <AdMobile />
    </Container>
  );
}
