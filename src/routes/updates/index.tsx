import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { updates, updateTypeLabel } from "@/data/updates";
import { pageHead } from "@/lib/seo";
import { formatFullDate } from "@/lib/utils";

export const Route = createFileRoute("/updates/")({
  head: () =>
    pageHead({
      title: "VTU updates",
      description:
        "Guides to reading VTU exam timetables, results, revaluation and academic calendars. Confirm dates on vtu.ac.in.",
      path: "/updates",
    }),
  component: UpdatesIndex,
});

function UpdatesIndex() {
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Updates" }]} />
      <PageHeader
        title="VTU updates"
        description="How to read official circulars — timetables, results, calendars. VTUHub does not publish university dates."
      />
      <Notice className="mb-8">
        Dates and PDFs that count live on{" "}
        <a href="https://vtu.ac.in" className="text-primary hover:underline">
          vtu.ac.in
        </a>
        . These pages explain how to use them.
      </Notice>
      <ul className="mb-8 flex flex-wrap gap-2">
        {(
          [
            ["notification", "Notifications", "/updates/notifications"],
            ["exam-timetable", "Exam timetable", "/updates/exam-timetable"],
            ["results", "Results", "/updates/results"],
            ["academic-calendar", "Academic calendar", "/updates/academic-calendar"],
          ] as const
        ).map(([key, label, href]) => (
          <li key={key}>
            <AppLink
              href={href}
              className="inline-flex h-11 items-center rounded-md border bg-surface px-3 text-sm font-medium hover:border-primary/40"
            >
              {label}
            </AppLink>
          </li>
        ))}
      </ul>
      <ul className="divide-y border-t">
        {updates.map((u) => (
          <li key={u.slug} className="py-5">
            <AppLink href={`/updates/${u.slug}`} className="block hover:text-primary">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                {updateTypeLabel[u.type]} · {formatFullDate(u.date)}
              </p>
              <h2 className="mt-1 text-lg font-semibold">{u.title}</h2>
              <p className="mt-2 text-sm text-muted">{u.summary}</p>
            </AppLink>
          </li>
        ))}
      </ul>
    </Container>
  );
}
