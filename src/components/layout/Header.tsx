import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SearchField } from "@/components/search/SearchField";
import { AppLink } from "@/components/ui/AppLink";
import { mainNav } from "@/data/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-3 px-4 sm:px-5 md:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Primary" className="ml-4 hidden items-center gap-0.5 lg:flex">
          {mainNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <AppLink
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-150",
                  active ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
              </AppLink>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <div className="hidden md:block">
            <SearchField size="header" />
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-sm text-foreground hover:bg-secondary md:hidden"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="size-5" />
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-sm text-foreground hover:bg-secondary lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {searchOpen ? (
        <div className="border-t bg-background px-4 py-3 md:hidden">
          <SearchField size="hero" autoFocus />
        </div>
      ) : null}
      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-background lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <nav className="flex flex-col px-4 py-4">
            <Link to="/" className="flex h-12 items-center border-b font-medium">
              Home
            </Link>
            {mainNav.map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                className="flex h-12 items-center border-b font-medium"
              >
                {item.label}
              </AppLink>
            ))}
            <Link
              to="/search"
              search={{ q: "" }}
              className="flex h-12 items-center border-b font-medium"
            >
              Search
            </Link>
            <Link to="/faq" className="flex h-12 items-center border-b font-medium">
              FAQ
            </Link>
            <Link to="/schemes" className="flex h-12 items-center border-b font-medium">
              Schemes
            </Link>
            <Link to="/about" className="flex h-12 items-center font-medium text-muted">
              About
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
