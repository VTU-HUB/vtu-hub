/**
 * Display clean-up for course titles read from VTU's scheme PDFs. Only spacing, casing
 * and the printed L:T:P credit pattern change; the words stay as VTU printed them.
 * URLs (slugs) are built from the raw title elsewhere and never from these helpers.
 * No `@/` imports so `node --test` can load this file.
 */

/** Words left lower case inside a title, and never allowed to end a shortened title. */
const SMALL = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "via", "with"]);
const DANGLING = /[\s,:;&/–—-]+$/;

/** "Design of formwork and scaffolding (0:0:2)" -> "Design of Formwork and Scaffolding". */
export function cleanCourseTitle(raw: string): string {
  let t = raw
    .replace(/\(\s*\d+\s*:\s*\d+\s*:\s*\d+(?:\s*:\s*\d+)?\s*\)/g, " ") // L:T:P(:S) pattern
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(DANGLING, "");
  // Title-case only titles printed (almost) all in lower case; mixed-case titles keep
  // VTU's casing so acronyms such as "IoT", "C++" or "MERN" are left alone.
  const words = t.split(" ");
  const upperAfterFirst = words.slice(1).some((w) => /^[A-Z]/.test(w));
  if (!upperAfterFirst && words.length > 1) {
    t = words
      .map((w, i) =>
        i > 0 && SMALL.has(w.toLowerCase())
          ? w.toLowerCase()
          : w.replace(/(^|[-/(])([a-z])/g, (_, p: string, c: string) => p + c.toUpperCase()),
      )
      .join(" ");
  }
  return t;
}

/**
 * Short label for breadcrumbs and SERP titles. Keeps the whole title when it fits;
 * otherwise cuts at a word boundary and never ends on "and", "of", "with", "&", etc.
 */
export function shortCourseTitle(raw: string, max = 40): string {
  const t = cleanCourseTitle(raw.replace(/\s*\([^)]*\)\s*/g, " "));
  if (t.length <= max) return t;
  const words = t.split(" ");
  const kept: string[] = [];
  for (const w of words) {
    if ([...kept, w].join(" ").length > max) break;
    kept.push(w);
  }
  while (kept.length > 1 && (SMALL.has(kept[kept.length - 1].toLowerCase()) || DANGLING.test(kept[kept.length - 1]) || /^[&–—-]$/.test(kept[kept.length - 1]))) {
    kept.pop();
  }
  const out = kept.join(" ").replace(DANGLING, "");
  return out || words[0];
}
