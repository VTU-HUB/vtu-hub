import type { ReactNode } from "react";

export function PageHeader({
  kicker,
  title,
  description,
  meta,
  actions,
}: {
  kicker?: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 max-w-3xl">
      {kicker ? (
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
          {kicker}
        </p>
      ) : null}
      <h1 className="text-[1.875rem] font-semibold leading-tight text-foreground md:text-4xl">
        {title}
      </h1>
      {meta ? (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          {meta}
        </div>
      ) : null}
      {description ? (
        <p className="mt-4 leading-relaxed text-muted">{description}</p>
      ) : null}
      {actions ? <div className="mt-5 flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}
