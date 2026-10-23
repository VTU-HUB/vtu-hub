import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { branches, semesterName, semesterPath, schemes } from "@/data/branches";
import { articles } from "@/data/articles";
import { resourceTypes } from "@/data/resource-types";
import { tools } from "@/data/tools";
import { updates } from "@/data/updates";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () =>
    pageHead({
      title: "Sitemap",
      description:
        "All major VTUHub sections: branches, semesters, resources, tools, updates and legal pages.",
      path: "/sitemap",
    }),
  component: HtmlSitemap,
});

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-3 columns-1 gap-x-8 text-sm sm:columns-2 md:columns-3">{children}</ul>
    </section>
  );
}

function Item({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li className="break-inside-avoid py-1">
      <AppLink href={href} className="text-primary hover:underline">
        {children}
      </AppLink>
    </li>
  );
}

function HtmlSitemap() {
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Sitemap" }]} />
      <PageHeader
        title="Sitemap"
        description="A human-readable map of VTUHub. The machine-readable file is /sitemap.xml."
      />
      <Group title="Start">
        <Item href="/">Home</Item>
        <Item href="/vtu">Browse VTU</Item>
        <Item href="/search">Search</Item>
        <Item href="/faq">FAQ</Item>
        <Item href="/schemes">Schemes</Item>
        <Item href="/semesters">Semesters</Item>
      </Group>
      <Group title="Schemes">
        {schemes.map((s) => (
          <Item key={s.year} href={`/schemes/${s.year}`}>
            {s.name}
          </Item>
        ))}
      </Group>
      <Group title="Branches">
        {branches.map((b) => (
          <Item key={b.slug} href={`/vtu/${b.slug}`}>
            {b.shortName}
          </Item>
        ))}
      </Group>
      <Group title="Semesters">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <Item key={n} href={semesterPath(n)}>
            {semesterName(n)}
          </Item>
        ))}
      </Group>
      <Group title="Resources">
        <Item href="/resources">All resources</Item>
        {resourceTypes.map((t) => (
          <Item key={t.slug} href={`/resources/${t.slug}`}>
            {t.label}
          </Item>
        ))}
        <Item href="/resources/study-materials">Study materials</Item>
      </Group>
      <Group title="Tools">
        {tools.map((t) => (
          <Item key={t.slug} href={t.href}>
            {t.name}
          </Item>
        ))}
      </Group>
      <Group title="Articles">
        {articles.map((a) => (
          <Item key={a.slug} href={`/articles/${a.slug}`}>
            {a.title}
          </Item>
        ))}
      </Group>
      <Group title="Updates">
        <Item href="/updates/notifications">Notifications</Item>
        <Item href="/updates/exam-timetable">Exam timetable</Item>
        <Item href="/updates/results">Results</Item>
        <Item href="/updates/academic-calendar">Academic calendar</Item>
        {updates.map((u) => (
          <Item key={u.slug} href={`/updates/${u.slug}`}>
            {u.title}
          </Item>
        ))}
      </Group>
      <Group title="Information">
        <Item href="/about">About</Item>
        <Item href="/contact">Contact</Item>
        <Item href="/privacy-policy">Privacy policy</Item>
        <Item href="/terms">Terms</Item>
        <Item href="/disclaimer">Disclaimer</Item>
        <Item href="/copyright">Copyright</Item>
      </Group>
    </Container>
  );
}
