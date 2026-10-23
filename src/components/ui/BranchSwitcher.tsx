import { AppLink } from "@/components/ui/AppLink";
import { branches, semesterPath, semesterSlug } from "@/data/branches";
import type { Branch, BranchSlug } from "@/data/types";
import { cn } from "@/lib/utils";

export function BranchSwitcher({ semester, current }: { semester: number; current?: BranchSlug }) {
  const sem = semesterSlug(semester);
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-faint">Branch</p>
      <div className="flex flex-wrap gap-2" role="navigation" aria-label="Switch branch">
        <AppLink
          href={semesterPath(semester)}
          aria-current={!current ? "page" : undefined}
          className={cn(
            "inline-flex h-11 items-center rounded-md border px-3 text-sm font-medium transition-colors duration-150",
            !current
              ? "border-primary bg-secondary text-foreground"
              : "bg-surface text-muted hover:border-primary/40 hover:text-foreground",
          )}
        >
          All branches
        </AppLink>
        {branches.map((b: Branch) => {
          const active = current === b.slug;
          return (
            <AppLink
              key={b.slug}
              href={`/vtu/${b.slug}/${sem}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex h-11 items-center rounded-md border px-3 text-sm font-medium transition-colors duration-150",
                active
                  ? "border-primary bg-secondary text-foreground"
                  : "bg-surface text-muted hover:border-primary/40 hover:text-foreground",
              )}
            >
              {b.shortName}
            </AppLink>
          );
        })}
      </div>
    </div>
  );
}
