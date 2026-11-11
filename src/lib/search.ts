/**
 * Client-side search over the compact index served at /search-index.json.
 * No data imports here — the index is fetched, so the search page stays small.
 */

export type SearchKind = "subject" | "resource" | "article" | "update" | "tool" | "branch" | "page";

/** Compact entry: t = title, h = href, k = kind, s = subtitle, x = lower-case haystack. */
export type SearchEntry = { t: string; h: string; k: SearchKind; s: string; x: string };

const KIND_ORDER: SearchKind[] = ["subject", "resource", "article", "tool", "update", "branch", "page"];

export const KIND_LABEL: Record<SearchKind, string> = {
  subject: "Subject",
  resource: "Resource",
  article: "Article",
  update: "Update",
  tool: "Tool",
  branch: "Branch",
  page: "Page",
};

export function search(index: SearchEntry[], query: string, limit = 40): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const scored: { hit: SearchEntry; score: number }[] = [];
  for (const item of index) {
    const title = item.t.toLowerCase();
    let score = 0;
    if (title === q) score += 50;
    if (title.includes(q)) score += 20;
    if (item.x.includes(q)) score += 8;
    let termsOk = true;
    for (const t of terms) {
      if (!item.x.includes(t)) {
        termsOk = false;
        break;
      }
      score += title.includes(t) ? 4 : 1;
    }
    if (!termsOk) continue;
    score += 6 - KIND_ORDER.indexOf(item.k);
    scored.push({ hit: item, score });
  }
  scored.sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const out: SearchEntry[] = [];
  for (const s of scored) {
    if (seen.has(s.hit.h)) continue;
    seen.add(s.hit.h);
    out.push(s.hit);
    if (out.length >= limit) break;
  }
  return out;
}
