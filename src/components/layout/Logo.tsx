import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 text-foreground no-underline"
      aria-label="VTUHub home"
    >
      <span
        className="relative grid size-8 place-items-center rounded-md bg-primary"
        aria-hidden="true"
      >
        <span className="absolute left-1.5 top-1.5 h-4 w-3 rounded-[2px] bg-primary-foreground/50" />
        <span className="absolute left-2.5 top-2.5 h-4 w-3 rounded-[2px] bg-primary-foreground" />
      </span>
      <span className="font-semibold tracking-tight">
        VTU<span className="text-primary">Hub</span>
        {!compact ? <span className="sr-only"> — VTU student resources</span> : null}
      </span>
    </Link>
  );
}
