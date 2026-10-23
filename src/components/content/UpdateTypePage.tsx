import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { updates, updateTypeLabel } from "@/data/updates";
import type { UpdateType } from "@/data/types";
import { pageHead } from "@/lib/seo";
import { formatFullDate } from "@/lib/utils";

const PATH: Record<UpdateType, string> = {
  notification: "/updates/notifications",
  "exam-timetable": "/updates/exam-timetable",
  results: "/updates/results",
  "academic-calendar": "/updates/academic-calendar",
};

const ABOUT: Record<UpdateType, string> = {
  notification:
    "How to read university notices — exam applications, scheme circulars and portal messages. Confirm the PDF on vtu.ac.in.",
  "exam-timetable":
    "How to match scheme, subject code and sitting on a SEE timetable. VTUHub does not set exam dates.",
  results:
    "Result announcement, photocopies and revaluation windows explained. Deadlines are only valid on the official circular.",
  "academic-calendar":
    "Term start, CIE slots and last working day. Colleges can be stricter than the university PDF — follow the stricter one for attendance.",
};

export function UpdateTypePage({ type }: { type: UpdateType }) {
  const list = updates.filter((u) => u.type === type);
  const label = updateTypeLabel[type];
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Updates", href: "/updates" }, { label }]} />
      <PageHeader title={label} description={ABOUT[type]} />
      <Notice className="mb-8">
        Official dates and PDFs live on{" "}
        <a href="https://vtu.ac.in" className="text-primary hover:underline">
          vtu.ac.in
        </a>
        .
      </Notice>
      {list.length === 0 ? (
        <p className="text-sm text-muted">No guides in this category yet.</p>
      ) : (
        <ul className="divide-y border-t">
          {list.map((u) => (
            <li key={u.slug} className="py-5">
              <AppLink href={`/updates/${u.slug}`} className="block hover:text-primary">
                <p className="text-xs text-faint">{formatFullDate(u.date)}</p>
                <h2 className="mt-1 text-lg font-semibold">{u.title}</h2>
                <p className="mt-2 text-sm text-muted">{u.summary}</p>
              </AppLink>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

UpdateTypePage.head = (type: UpdateType) =>
  pageHead({
    title: `VTU ${updateTypeLabel[type].toLowerCase()}`,
    description: ABOUT[type],
    path: PATH[type],
  });
