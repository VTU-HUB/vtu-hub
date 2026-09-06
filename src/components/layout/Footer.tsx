import { AppLink } from "@/components/ui/AppLink";
import { Logo } from "@/components/layout/Logo";
import { footerInfo, footerResources } from "@/data/nav";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-10 sm:px-5 md:grid-cols-[1.2fr_1fr_1fr] md:px-6 lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Independent VTU student resource platform. Not affiliated with
            Visvesvaraya Technological University.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-faint">
            Resources
          </p>
          <ul className="mt-3 space-y-2">
            {footerResources.map((l) => (
              <li key={l.href}>
                <AppLink
                  href={l.href}
                  className="text-sm text-muted transition-colors duration-150 hover:text-foreground"
                >
                  {l.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-faint">
            Information
          </p>
          <ul className="mt-3 space-y-2">
            {footerInfo.map((l) => (
              <li key={l.href}>
                <AppLink
                  href={l.href}
                  className="text-sm text-muted transition-colors duration-150 hover:text-foreground"
                >
                  {l.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-faint sm:px-5 md:px-6 lg:px-8">
          <p>© {year} VTUHub</p>
          <p>Independent student resource platform</p>
        </div>
      </div>
    </footer>
  );
}
