import { execFileSync } from "node:child_process";

/**
 * Fallback used when git history is unavailable at build time (e.g. a shallow
 * or tarball checkout). Bump it by hand whenever the guide templates change.
 */
const FALLBACK = "2026-11-11";

/**
 * Real last-change date (YYYY-MM-DD) of the given source files, taken from git.
 * Build-time only: pages are static, so this runs once per build, never in the browser.
 */
export function lastCommitDate(...files: string[]): string {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : FALLBACK;
  } catch {
    return FALLBACK;
  }
}
