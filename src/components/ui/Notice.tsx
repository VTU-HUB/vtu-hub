import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Notice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <aside
      className={cn(
        "rounded-md border bg-secondary px-4 py-3 text-sm leading-relaxed text-muted",
        className,
      )}
    >
      {children}
    </aside>
  );
}
