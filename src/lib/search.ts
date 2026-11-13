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

const CODE = /^[a-z0-9]{2,6}\d{3}[a-z]?$/i;

/** One-character edit distance. Used only to recover a mistyped course code. */
export function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j];
      row[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, row[j], row[j - 1]);
      prev = cur;
    }
  }
  return row[b.length];
}

export function search(index: SearchEntry[], query: string, limit = 40): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const code = CODE.test(q.replace(/\s+/g, "")) ? q.replace(/\s+/g, "") : "";
  const scored: { hit: SearchEntry; score: number }[] = [];
  for (const item of index) {
    const title = item.t.toLowerCase();
    let score = 0;
    const titleCode = title.match(/[a-z]{2,6}\d{3}[a-z]?/i)?.[0]?.toLowerCase() ?? "";
    const fuzzyCode = Boolean(code && item.k === "subject" && titleCode && Math.abs(titleCode.length - code.length) <= 1 && levenshtein(titleCode, code) === 1);
    if (code && (title.includes(code) || item.x.split(" ").includes(code))) {
      score += item.k === "subject" ? 80 : 40;
    } else if (fuzzyCode) score += 25;
    if (title === q) score += 50;
    if (title.includes(q)) score += 20;
    if (item.x.includes(q)) score += 8;
    let termsOk = true;
    for (const t of terms) {
      if (item.x.includes(t)) {
        score += title.includes(t) ? 4 : 1;
        continue;
      }
      if (fuzzyCode && t === code) continue;
      termsOk = false;
      break;
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
