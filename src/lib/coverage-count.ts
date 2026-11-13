/** Module/outcome/book counts for codes that are actually in the current catalogue. */
export function syllabusInCatalogue(
  codes: Iterable<string>,
  syl: Record<string, { modules?: unknown[]; outcomes?: unknown[]; textbooks?: unknown[] }>,
) {
  let withModules = 0;
  let withOutcomes = 0;
  let withBooks = 0;
  for (const code of codes) {
    const c = syl[code];
    if (!c) continue;
    if ((c.modules?.length ?? 0) >= 3) withModules += 1;
    if ((c.outcomes?.length ?? 0) > 0) withOutcomes += 1;
    if ((c.textbooks?.length ?? 0) > 0) withBooks += 1;
  }
  return { withModules, withOutcomes, withBooks };
}
