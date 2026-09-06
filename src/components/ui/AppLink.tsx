import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AppLink({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <Link to={href as never} className={className} {...rest}>
      {children}
    </Link>
  );
}
