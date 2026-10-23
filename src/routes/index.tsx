import { createFileRoute } from "@tanstack/react-router";
import { SearchField } from "@/components/search/SearchField";
import { AdBanner, AdMobile } from "@/components/ads/AdSlot";
import {
  BranchGrid,
  SectionHead,
  SemesterGrid,
  SemesterJump,
} from "@/components/browse/BrowseCards";
import { AppLink } from "@/components/ui/AppLink";
import { Container } from "@/components/ui/Container";
import { FileTable } from "@/components/ui/FileTable";
import { JsonLd } from "@/components/ui/JsonLd";
import { latestQuestionPapers, popularNotes } from "@/data/resources";
import { popularSubjectsMixed, subjectPath } from "@/data/subjects";
import { tools } from "@/data/tools";
import { updates } from "@/data/updates";
import { pageHead } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { formatFullDate } from "@/lib/utils";

const CATALOG = [
  { href: "/schemes", label: "Schemes" },
  { href: "/resources/study-materials", label: "Study materials" },
  { href: "/faq", label: "FAQ" },
  { href: "/sitemap", label: "Sitemap" },
] as const;

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: `${SITE_NAME} · VTU study guides, calculators and scheme explainers`,
      description: SITE_DESCRIPTION,
      path: "/",
      keywords: "VTU study guides, VTU SGPA calculator, CSE syllabus, 2022 scheme",
    }),
  component: Home,
});

function Home() {
  const popular = popularSubjectsMixed(8);
  const papers = latestQuestionPapers(6);
  const notes = popularNotes(6);

  const json = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={query}`,
      "query-input": "required name=query",
    },
  };

  return (
    <Container className="py-6 md:py-10">
      <JsonLd data={json} />
      <section className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          Independent VTU resource platform
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
          Study guides, calculators and scheme explainers — organised the way you study
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          Open a semester first. You get every branch — CSE, ISE, ECE, EEE, Mechanical and Civil.
        </p>
        <div className="mt-5 max-w-xl">
          <SearchField size="hero" />
        </div>
        <SemesterJump className="mt-5" />
      </section>

      <section className="mt-8">
        <SectionHead title="Browse by semester" href="/semesters" action="All semesters" />
        <SemesterGrid />
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {CATALOG.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              className="font-medium text-primary hover:underline"
            >
              {item.label}
            </AppLink>
          ))}
        </p>
      </section>

      <section className="mt-12">
        <SectionHead title="Browse by branch" href="/vtu" action="All branches" />
        <BranchGrid />
      </section>

      <AdBanner />
      <AdMobile />

      <section className="mt-14">
        <SectionHead title="Popular subjects" href="/vtu" />
        <ul className="divide-y border-t">
          {popular.map((s) => (
            <li key={`${s.branch}-${s.slug}`}>
              <AppLink
                href={subjectPath(s)}
                className="flex items-center gap-4 py-3.5 hover:bg-secondary/60"
              >
                <span className="w-24 shrink-0 font-mono text-xs text-muted">{s.code}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{s.name}</span>
                  <span className="block text-xs text-faint">
                    {s.branch.toUpperCase()} · Semester {s.semester}
                  </span>
                </span>
              </AppLink>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <SectionHead title="Practice questions" href="/resources/question-papers" />
        <FileTable files={papers} showSubject />
      </section>

      <section className="mt-14">
        <SectionHead title="Unit study guides" href="/resources/notes" />
        <FileTable files={notes} showSubject />
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHead title="VTU updates" href="/updates" />
          <ul className="divide-y border-t">
            {updates.slice(0, 4).map((u) => (
              <li key={u.slug} className="py-3.5">
                <AppLink href={`/updates/${u.slug}`} className="block hover:text-primary">
                  <span className="font-medium">{u.title}</span>
                  <span className="mt-1 block text-xs text-faint">{formatFullDate(u.date)}</span>
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHead title="Tools" href="/tools" />
          <ul className="divide-y border-t">
            {tools.map((t) => (
              <li key={t.slug} className="py-3.5">
                <AppLink href={t.href} className="block hover:text-primary">
                  <span className="font-medium">{t.name}</span>
                  <span className="mt-1 block text-xs text-muted">{t.description}</span>
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Container>
  );
}
