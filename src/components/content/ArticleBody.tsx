import { Notice } from "@/components/ui/Notice";
import type { ArticleSection } from "@/data/types";

export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="max-w-3xl space-y-10">
      {sections.map((sec) => (
        <section key={sec.heading}>
          <h2 className="text-xl font-semibold">{sec.heading}</h2>
          {sec.paragraphs?.map((p) => (
            <p key={p} className="mt-3 leading-relaxed text-muted">
              {p}
            </p>
          ))}
          {sec.bullets ? (
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
              {sec.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          {sec.table ? (
            <div className="mt-4 overflow-x-auto">
              {sec.table.caption ? (
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-faint">
                  {sec.table.caption}
                </p>
              ) : null}
              <table className="w-full min-w-[32rem] border-collapse text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase tracking-wider text-faint">
                    {sec.table.headers.map((h) => (
                      <th key={h} className="px-3 py-2 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sec.table.rows.map((row, i) => (
                    <tr key={i} className="border-b">
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2.5 text-muted">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          {sec.note ? <Notice className="mt-4">{sec.note}</Notice> : null}
        </section>
      ))}
    </div>
  );
}
