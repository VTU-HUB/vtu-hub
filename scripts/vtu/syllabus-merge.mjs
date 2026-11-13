// Pure helpers for sync-syllabus.mjs: merge a fresh parse with the previous
// syllabus.json so a partial download failure never deletes good data, and decide
// whether the result is safe to write. No I/O, so tests/sync-guards.test.ts can load it.

/** Sources an entry was read from. */
const sourcesOf = (e) => (e?.sources?.length ? e.sources : e?.source ? [e.source] : []);

/**
 * @param {Record<string, any>} prev  previous syllabus.json "courses"
 * @param {Record<string, any>} fresh this run's parse
 * @param {{ failedSources?: string[], acceptRegressions?: boolean }} [opts]
 */
export function mergeSyllabus(prev, fresh, { failedSources = [], acceptRegressions = false } = {}) {
  const failed = new Set(failedSources);
  const courses = {};
  const report = { added: [], removed: [], kept: [], regressions: [] };

  for (const [code, entry] of Object.entries(fresh)) {
    const old = prev[code];
    if (!old) report.added.push(code);
    const was = old?.modules?.length ?? 0;
    const now = entry.modules?.length ?? 0;
    // VTU syllabi do not lose modules; fewer modules than last time is a parser or
    // download problem, so keep the old entry unless told the drop is real.
    if (old && now < was && was >= 3 && !acceptRegressions) {
      courses[code] = old;
      report.regressions.push({ code, was, now });
    } else courses[code] = entry;
  }
  for (const [code, old] of Object.entries(prev)) {
    if (code in courses) continue;
    if (sourcesOf(old).some((s) => failed.has(s))) {
      courses[code] = old; // its PDF failed this run: keep the last good copy
      report.kept.push(code);
    } else report.removed.push(code);
  }
  const sorted = Object.fromEntries(Object.keys(courses).sort().map((c) => [c, courses[c]]));
  for (const k of Object.keys(report)) report[k].sort((a, b) => String(a.code ?? a).localeCompare(String(b.code ?? b)));
  return { courses: sorted, report };
}

/** Per programme: how many of its course codes have syllabus modules. */
export function coverageByProgramme(programs, courses) {
  const out = {};
  for (const p of programs ?? []) {
    const codes = [...new Set((p.courses ?? []).map((c) => c.code))];
    out[p.slug] = { codes: codes.length, covered: codes.filter((c) => (courses[c]?.modules?.length ?? 0) >= 3).length };
  }
  return out;
}

/**
 * Reasons not to write this run's result. Empty means safe.
 * @param {{ report: ReturnType<typeof mergeSyllabus>["report"], prevCoverage: Record<string, {codes:number, covered:number}>,
 *   nextCoverage: Record<string, {codes:number, covered:number}>, sources: number, failed: number, total: number }} run
 */
export function syncProblems(run, { maxFailedShare = 0.2, maxRemoved = 25, maxCoverageDrop = 0.1, minCourses = 300 } = {}) {
  const problems = [];
  if (run.sources && run.failed / run.sources > maxFailedShare)
    problems.push(`${run.failed} of ${run.sources} syllabus PDFs failed (more than ${Math.round(maxFailedShare * 100)}%)`);
  if (run.total < minCourses) problems.push(`only ${run.total} course syllabi after merging (minimum ${minCourses})`);
  if (run.report.removed.length > maxRemoved)
    problems.push(`${run.report.removed.length} course codes would disappear although their PDFs downloaded (limit ${maxRemoved})`);
  for (const [slug, before] of Object.entries(run.prevCoverage)) {
    const after = run.nextCoverage[slug];
    if (!after || before.covered < 5) continue;
    const drop = before.covered / before.codes - after.covered / Math.max(1, after.codes);
    if (drop > maxCoverageDrop)
      problems.push(`${slug}: syllabus coverage would fall from ${before.covered}/${before.codes} to ${after.covered}/${after.codes}`);
  }
  return problems;
}

/** Markdown summary for the log and the GitHub Actions job summary. */
export function syncSummary({ report, failedSources, sources, total, problems }) {
  const list = (items, fmt = (x) => x) => (items.length ? items.slice(0, 40).map((x) => `- ${fmt(x)}`).join("\n") + (items.length > 40 ? `\n- … ${items.length - 40} more` : "") : "- none");
  return [
    `## Syllabus sync`,
    ``,
    `${total} courses · ${sources} PDFs · ${failedSources.length} failed`,
    problems.length ? `\n**Not written:**\n${list(problems)}` : "",
    `\n### Failed PDFs (previous data kept)\n${list(failedSources)}`,
    `\n### New course codes\n${list(report.added)}`,
    `\n### Removed course codes\n${list(report.removed)}`,
    `\n### Kept from the previous run\n${list(report.kept)}`,
    `\n### Fewer modules than before (previous kept)\n${list(report.regressions, (r) => `${r.code}: ${r.was} → ${r.now}`)}`,
  ].join("\n");
}
