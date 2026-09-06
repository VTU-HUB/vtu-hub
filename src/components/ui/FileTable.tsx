import { FileText } from "lucide-react";
import type { ResourceFile } from "@/data/types";
import { subjectFor } from "@/data/resources";
import { formatMonthYear } from "@/lib/utils";
import { AppLink } from "@/components/ui/AppLink";
import { subjectPath } from "@/data/subjects";
import { getResourceType } from "@/data/resource-types";

export function FileTable({
  files,
  showSubject = false,
}: {
  files: ResourceFile[];
  showSubject?: boolean;
}) {
  if (files.length === 0) return null;
  return (
    <div role="table" aria-label="Study guides" className="text-sm">
      <div
        role="row"
        className="hidden border-b py-2 text-xs font-medium uppercase tracking-wider text-faint md:grid md:grid-cols-[minmax(0,1fr)_72px_88px_108px] md:gap-4"
      >
        <span>Guide</span>
        <span>Kind</span>
        <span>Read</span>
        <span>Updated</span>
      </div>
      {files.map((f) => (
        <FileRow key={f.id} file={f} showSubject={showSubject} />
      ))}
    </div>
  );
}

function FileRow({
  file,
  showSubject,
}: {
  file: ResourceFile;
  showSubject: boolean;
}) {
  const sub = subjectFor(file);
  const type = getResourceType(file.type);
  return (
    <div role="row" className="file-row">
      <div className="flex min-w-0 items-start gap-3">
        <FileText
          className="mt-0.5 size-4 shrink-0 text-muted"
          aria-hidden="true"
          strokeWidth={1.75}
        />
        <div className="min-w-0">
          <p className="truncate font-medium text-foreground">
            <AppLink href={`/files/${file.id}`} className="hover:text-primary">
              {file.title}
            </AppLink>
          </p>
          {showSubject && sub ? (
            <p className="mt-0.5 truncate text-xs text-muted">
              <AppLink
                href={subjectPath(sub)}
                className="hover:text-foreground transition-colors duration-150"
              >
                {sub.shortName}
              </AppLink>
              <span className="text-faint">
                {" "}
                · {sub.code} · {type?.label}
              </span>
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-muted md:hidden">
              Guide · {file.readMinutes} min · {formatMonthYear(file.updated)}
            </p>
          )}
        </div>
      </div>
      <span className="hidden text-muted md:block">{file.fileType}</span>
      <span className="hidden tabular-nums text-muted md:block">
        {file.readMinutes} min
      </span>
      <span className="hidden text-muted md:block">
        {formatMonthYear(file.updated)}
      </span>
    </div>
  );
}
