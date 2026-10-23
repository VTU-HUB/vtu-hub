import { Link } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { SearchField } from "@/components/search/SearchField";

export function NotFound() {
  return (
    <Container className="py-16 md:py-24">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">404</p>
      <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-lg text-muted">
        That URL is not a VTUHub page. Search for a subject, or browse by branch and semester.
      </p>
      <div className="mt-6 max-w-xl">
        <SearchField size="hero" autoFocus />
      </div>
      <p className="mt-6 text-sm">
        <Link to="/" className="text-primary hover:underline">
          Back to home
        </Link>
        <span className="text-faint"> · </span>
        <Link to="/vtu" className="text-primary hover:underline">
          Browse resources
        </Link>
      </p>
    </Container>
  );
}
