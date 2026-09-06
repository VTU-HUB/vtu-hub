import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { KIND_LABEL, search } from "@/data/search-index";
import { cn } from "@/lib/utils";

export function SearchField({
  size = "header",
  initialQuery = "",
  autoFocus = false,
  onSubmitNavigate = true,
  live = true,
}: {
  size?: "header" | "hero" | "page";
  initialQuery?: string;
  autoFocus?: boolean;
  onSubmitNavigate?: boolean;
  live?: boolean;
}) {
  const [q, setQ] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const id = useId();
  const listId = `${id}-list`;
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQ(initialQuery);
  }, [initialQuery]);

  const hits = useMemo(() => (live && q.trim() ? search(q, 8) : []), [q, live]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function go(href?: string) {
    setOpen(false);
    if (href) {
      void navigate({ to: href as never });
      return;
    }
    const query = q.trim();
    if (!query) return;
    void navigate({ to: "/search", search: { q: query } });
  }

  const isHero = size === "hero" || size === "page";

  return (
    <div ref={wrapRef} className={cn("relative", isHero ? "w-full" : "w-full max-w-sm")}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmitNavigate) go();
        }}
      >
        <label htmlFor={id} className="sr-only">
          Search VTU resources
        </label>
        <Search
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint",
            isHero ? "size-5" : "size-4",
          )}
          aria-hidden="true"
          strokeWidth={1.75}
        />
        <input
          id={id}
          type="search"
          value={q}
          autoFocus={autoFocus}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder={
            isHero
              ? "Search subjects, papers, notes..."
              : "Search notes, subjects, papers..."
          }
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open && hits.length > 0}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className={cn(
            "w-full rounded-md border bg-surface text-foreground placeholder:text-faint transition-colors duration-150",
            isHero
              ? "h-12 pl-11 pr-4 md:h-14 md:text-[15px]"
              : "h-10 pl-9 pr-3 text-sm",
          )}
        />
      </form>
      {live && open && hits.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-40 mt-2 max-h-80 w-full overflow-auto rounded-md border bg-surface py-1 shadow-sm"
        >
          {hits.map((h) => (
            <li key={h.href} role="option">
              <button
                type="button"
                onClick={() => go(h.href)}
                className="flex w-full flex-col items-start gap-0.5 px-3 py-2.5 text-left hover:bg-secondary"
              >
                <span className="text-sm font-medium text-foreground">{h.title}</span>
                <span className="text-xs text-muted">
                  {KIND_LABEL[h.kind]} · {h.subtitle}
                </span>
              </button>
            </li>
          ))}
          {q.trim() ? (
            <li className="border-t">
              <button
                type="button"
                onClick={() => go()}
                className="flex w-full px-3 py-2.5 text-left text-sm text-primary hover:bg-secondary"
              >
                View all results for “{q.trim()}”
              </button>
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
