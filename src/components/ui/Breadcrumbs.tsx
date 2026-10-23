import { ChevronRight } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE_URL } from "@/lib/site";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <JsonLd data={json} />
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1">
              {i > 0 ? <ChevronRight className="size-3 text-faint" aria-hidden="true" /> : null}
              {c.href && !last ? (
                <AppLink
                  href={c.href}
                  className="hover:text-foreground transition-colors duration-150"
                >
                  {c.label}
                </AppLink>
              ) : (
                <span
                  className={last ? "text-foreground" : undefined}
                  aria-current={last ? "page" : undefined}
                >
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
