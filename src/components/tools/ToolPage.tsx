import type { ReactNode } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { tools } from "@/data/tools";

export function ToolPage({
  slug,
  children,
  extra,
}: {
  slug: string;
  children: ReactNode;
  extra?: ReactNode;
}) {
  const tool = tools.find((t) => t.slug === slug)!;
  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: tool.name }]} />
      <PageHeader title={tool.name} description={tool.description} />
      {children}
      {extra}
      <aside className="mt-10 rounded-md border bg-secondary px-4 py-3 text-sm text-muted">
        These calculators run in your browser. VTUHub does not store USNs, marks or attendance.
      </aside>
      <ul className="mt-8 flex flex-wrap gap-3 text-sm">
        {tools
          .filter((t) => t.slug !== slug)
          .map((t) => (
            <li key={t.slug}>
              <AppLink href={t.href} className="text-primary hover:underline">
                {t.name}
              </AppLink>
            </li>
          ))}
      </ul>
    </Container>
  );
}
