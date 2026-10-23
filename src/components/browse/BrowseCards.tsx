import { ChevronRight } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";
import {
  branches,
  branchPath,
  branchSemesterPath,
  SEMESTER_ORD,
  semesterName,
  semesterPath,
} from "@/data/branches";
import {
  branchesForSemester,
  countSubjects,
  getSubjectsBySemester,
  subjectPath,
} from "@/data/subjects";
import type { Branch, BranchSlug, Subject } from "@/data/types";

export function BranchGrid({ semester }: { semester?: number }) {
  const list = semester ? branchesForSemester(semester) : branches;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((b) => (
        <li key={b.slug}>
          <BranchCard branch={b} semester={semester} />
        </li>
      ))}
    </ul>
  );
}

export function BranchCard({ branch, semester }: { branch: Branch; semester?: number }) {
  const href = semester ? branchSemesterPath(branch.slug, semester) : branchPath(branch.slug);
  const count = countSubjects(branch.slug, semester);
  const preview =
    semester != null
      ? getSubjectsBySemester(branch.slug, semester)
          .filter((s) => s.kind === "theory")
          .slice(0, 3)
          .map((s) => s.shortName)
          .join(" · ")
      : null;
  return (
    <AppLink
      href={href}
      className="group flex h-full flex-col rounded-lg border bg-surface p-4 transition-colors duration-150 hover:border-primary/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">{branch.code}</p>
          <h3 className="mt-1 font-semibold text-foreground">{branch.shortName}</h3>
        </div>
        <ChevronRight
          className="mt-1 size-4 shrink-0 text-faint transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 text-sm text-muted">{branch.name}</p>
      <p className="mt-3 text-xs text-faint">
        {count} subject{count === 1 ? "" : "s"}
        {semester ? ` in ${semesterName(semester)}` : ""}
      </p>
      {preview ? <p className="mt-1 line-clamp-2 text-xs text-muted">{preview}</p> : null}
    </AppLink>
  );
}

export function SemesterJump({ className }: { className?: string }) {
  return (
    <nav aria-label="Jump to a semester" className={className}>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
        Open a semester — all branches
      </p>
      <ul className="flex flex-wrap gap-2">
        {SEMESTER_ORD.map((label, i) => {
          const n = i + 1;
          return (
            <li key={n}>
              <AppLink
                href={semesterPath(n)}
                className="inline-flex h-11 min-w-11 items-center justify-center rounded-md border bg-surface px-3 text-sm font-semibold transition-colors duration-150 hover:border-primary/40"
              >
                {label}
              </AppLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SemesterGrid({ branchSlug }: { branchSlug?: string }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
        const href = branchSlug ? branchSemesterPath(branchSlug, n) : semesterPath(n);
        const count = branchSlug
          ? countSubjects(branchSlug as BranchSlug, n)
          : branchesForSemester(n).length;
        const names = branchSlug
          ? null
          : branchesForSemester(n)
              .map((b) => b.shortName)
              .join(" · ");
        return (
          <li key={n}>
            <AppLink
              href={href}
              className="flex h-full flex-col rounded-lg border bg-surface p-4 transition-colors duration-150 hover:border-primary/40"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                Semester
              </span>
              <span className="mt-1 text-xl font-semibold">{semesterName(n)}</span>
              <span className="mt-2 text-xs text-faint">
                {branchSlug
                  ? `${count} subject${count === 1 ? "" : "s"}`
                  : (names ?? `${count} branches`)}
              </span>
            </AppLink>
          </li>
        );
      })}
    </ul>
  );
}

export function SubjectTable({ subjects }: { subjects: Subject[] }) {
  if (subjects.length === 0) {
    return null;
  }
  return (
    <ul className="divide-y border-t">
      {subjects.map((s) => (
        <li key={`${s.branch}-${s.slug}`}>
          <AppLink
            href={subjectPath(s)}
            className="flex items-center gap-4 py-3.5 transition-colors duration-150 hover:bg-secondary/60"
          >
            <span className="w-24 shrink-0 font-mono text-xs text-muted">{s.code}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-foreground">{s.name}</span>
              <span className="block text-xs text-faint">
                {s.credits} credit{s.credits === 1 ? "" : "s"} · {s.kind}
                {s.hasLab ? " · has lab" : ""}
              </span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-faint" aria-hidden="true" />
          </AppLink>
        </li>
      ))}
    </ul>
  );
}

export function SectionHead({
  title,
  href,
  action,
}: {
  title: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="text-lg font-semibold md:text-xl">{title}</h2>
      {href ? (
        <AppLink href={href} className="text-sm font-medium text-primary hover:underline">
          {action ?? "View all"}
        </AppLink>
      ) : null}
    </div>
  );
}
