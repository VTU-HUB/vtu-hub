/**
 * Contributors, read from git history at build time. Pure helpers plus one git reader;
 * no `@/` imports so `node --test` and scripts/sync-contributors.mjs can load this file.
 *
 * Privacy: email addresses are only used to recognise a GitHub account and to merge
 * identities. They never leave this module: no field of `Contributor` holds one.
 */
import { execFileSync } from "node:child_process";

export type Area = "notes" | "data" | "code" | "docs";
export const AREAS: readonly Area[] = ["notes", "data", "code", "docs"];

export type RawCommit = {
  sha: string;
  name: string;
  email: string;
  date: string;
  subject: string;
  coAuthors: { name: string; email: string }[];
  files: { path: string; additions: number; deletions: number }[];
};

export type ContributionEntry = {
  sha: string;
  date: string;
  subject: string;
  additions: number;
  deletions: number;
  files: number;
  areas: Area[];
  /** Credited through a Co-authored-by line rather than as the commit author. */
  coAuthor: boolean;
};

export type Contributor = {
  slug: string;
  name: string;
  /** GitHub username, when the history shows one. */
  login: string | null;
  /** Numeric GitHub user id (from a noreply address), used for the avatar URL. */
  githubId: string | null;
  commits: number;
  additions: number;
  deletions: number;
  /** Course codes of notes files (src/data/notes/<CODE>.md) this person changed. */
  notes: string[];
  areas: Record<Area, number>;
  first: string;
  last: string;
  history: ContributionEntry[];
};

const RS = "\x1e";
const US = "\x1f";
const GS = "\x1d";
export const GIT_LOG_FORMAT = `${RS}%H${US}%an${US}%ae${US}%cs${US}%s${US}%(trailers:key=Co-authored-by,valueonly,separator=%x1d)`;

/** Parses `git log --no-merges --numstat --format=GIT_LOG_FORMAT`. */
export function parseGitLog(text: string): RawCommit[] {
  const out: RawCommit[] = [];
  for (const chunk of text.split(RS)) {
    if (!chunk.trim()) continue;
    const nl = chunk.indexOf("\n");
    const head = nl === -1 ? chunk : chunk.slice(0, nl);
    const body = nl === -1 ? "" : chunk.slice(nl + 1);
    const [sha, name, email, date, subject, trailers = ""] = head.split(US);
    if (!sha || !/^[0-9a-f]{7,40}$/.test(sha)) continue;
    const coAuthors = trailers
      .split(GS)
      .map((t) => t.trim().match(/^(.*?)\s*<([^>]+)>$/))
      .filter((m): m is RegExpMatchArray => !!m)
      .map((m) => ({ name: m[1].trim(), email: m[2].trim() }));
    const files = body
      .split("\n")
      .map((l) => l.match(/^(\d+|-)\t(\d+|-)\t(.+)$/))
      .filter((m): m is RegExpMatchArray => !!m)
      .map((m) => ({
        path: renamedPath(m[3]),
        additions: m[1] === "-" ? 0 : Number(m[1]),
        deletions: m[2] === "-" ? 0 : Number(m[2]),
      }));
    out.push({ sha, name: name.trim(), email: email.trim().toLowerCase(), date, subject: subject.trim(), coAuthors, files });
  }
  return out;
}

/** numstat prints renames as "dir/{old => new}/file" or "old => new". */
function renamedPath(p: string) {
  return p.replace(/\{[^{}]*? => ([^{}]*)\}/g, "$1").replace(/^.* => /, "").replace(/\/\//g, "/");
}

/** "138886231+nishanth-kj@users.noreply.github.com" -> { login, id }. */
export function githubFromEmail(email: string): { login: string; id: string | null } | null {
  const m = email.toLowerCase().match(/^(?:(\d+)\+)?([a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\[bot\])?)@users\.noreply\.github\.com$/);
  return m ? { login: m[2], id: m[1] ?? null } : null;
}

const AUTOMATED = /\[bot\]$|(^|[-_ ])bot$|^(github-actions|dependabot|renovate|actions-user)$|^(grok|claude|copilot|chatgpt|openai|codex|gemini|cursor|devin)\b/i;

/** Bots, CI accounts and AI tools are not thanked as contributors. */
export function isAutomated(name: string, email = "") {
  const gh = githubFromEmail(email);
  return AUTOMATED.test(name.trim()) || (gh !== null && AUTOMATED.test(gh.login)) || /@(anthropic|openai)\.com$/i.test(email);
}

/** Notes file path -> course code, or null. */
export function notesCode(path: string) {
  const m = path.match(/^src\/data\/notes\/([A-Za-z0-9]+)\.md$/);
  return m ? m[1].toUpperCase() : null;
}

export function areaOf(path: string): Area {
  if (notesCode(path)) return "notes";
  if (/^(src\/data|scripts\/vtu)\//.test(path)) return "data";
  if (/^docs\/|\.md$/i.test(path)) return "docs";
  return "code";
}

export function slugify(s: string) {
  return (
    s
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "contributor"
  );
}

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

type Person = { key: string; login: string | null; githubId: string | null; names: Map<string, number> };

/**
 * Groups commits by person. A GitHub noreply address gives the login; other addresses
 * are merged into that login when the same name (or the login itself) was used with it
 * and the name points at exactly one login.
 */
export function buildContributors(commits: RawCommit[]): Contributor[] {
  const loginsByName = new Map<string, Set<string>>();
  const idByLogin = new Map<string, string>();
  const allIdents = commits.flatMap((c) => [{ name: c.name, email: c.email }, ...c.coAuthors]);
  for (const { name, email } of allIdents) {
    const gh = githubFromEmail(email);
    if (!gh) continue;
    if (gh.id) idByLogin.set(gh.login, gh.id);
    const set = loginsByName.get(norm(name)) ?? new Set<string>();
    set.add(gh.login);
    loginsByName.set(norm(name), set);
    loginsByName.set(gh.login, new Set([gh.login]));
  }
  const loginByEmail = new Map<string, string>();
  for (const { name, email } of allIdents) {
    const gh = githubFromEmail(email);
    if (gh) continue;
    const set = loginsByName.get(norm(name));
    if (set?.size === 1) loginByEmail.set(email, [...set][0]);
  }

  const people = new Map<string, Person & { entries: Map<string, { c: RawCommit; coAuthor: boolean }> }>();
  const credit = (name: string, email: string, c: RawCommit, coAuthor: boolean) => {
    if (!name || isAutomated(name, email)) return;
    const login = githubFromEmail(email)?.login ?? loginByEmail.get(email) ?? (loginsByName.get(norm(name))?.size === 1 ? [...loginsByName.get(norm(name))!][0] : null);
    const key = login ? `gh:${login}` : `name:${norm(name)}`;
    let p = people.get(key);
    if (!p) {
      p = { key, login, githubId: login ? (idByLogin.get(login) ?? null) : null, names: new Map(), entries: new Map() };
      people.set(key, p);
    }
    p.names.set(name, (p.names.get(name) ?? 0) + 1);
    if (!p.entries.has(c.sha)) p.entries.set(c.sha, { c, coAuthor });
  };
  for (const c of commits) {
    credit(c.name, c.email, c, false);
    for (const a of c.coAuthors) credit(a.name, a.email, c, true);
  }

  const result: Contributor[] = [];
  for (const p of people.values()) {
    const history = [...p.entries.values()]
      .map(({ c, coAuthor }): ContributionEntry => ({
        sha: c.sha,
        date: c.date,
        subject: c.subject,
        additions: c.files.reduce((n, f) => n + f.additions, 0),
        deletions: c.files.reduce((n, f) => n + f.deletions, 0),
        files: c.files.length,
        areas: AREAS.filter((a) => c.files.some((f) => areaOf(f.path) === a)),
        coAuthor,
      }))
      .sort((a, b) => b.date.localeCompare(a.date) || a.sha.localeCompare(b.sha));
    const areas = Object.fromEntries(AREAS.map((a) => [a, history.filter((h) => h.areas.includes(a)).length])) as Record<Area, number>;
    const notes = new Set<string>();
    for (const { c } of p.entries.values()) for (const f of c.files) {
      const code = notesCode(f.path);
      if (code) notes.add(code);
    }
    // Most-used spelling of the name, preferring one that is not just the login.
    const name = [...p.names.entries()].sort((a, b) => Number(norm(a[0]) === p.login) - Number(norm(b[0]) === p.login) || b[1] - a[1] || a[0].localeCompare(b[0]))[0][0];
    const dates = history.map((h) => h.date).sort();
    result.push({
      slug: p.login ? slugify(p.login) : slugify(name),
      name,
      login: p.login,
      githubId: p.githubId,
      commits: history.length,
      additions: history.reduce((n, h) => n + h.additions, 0),
      deletions: history.reduce((n, h) => n + h.deletions, 0),
      notes: [...notes].sort(),
      areas,
      first: dates[0],
      last: dates[dates.length - 1],
      history,
    });
  }
  result.sort((a, b) => b.commits - a.commits || b.last.localeCompare(a.last) || a.name.localeCompare(b.name));
  // Slugs are URLs; make them unique without depending on sort order of ties.
  const seen = new Map<string, number>();
  for (const c of result) {
    const n = (seen.get(c.slug) ?? 0) + 1;
    seen.set(c.slug, n);
    if (n > 1) c.slug = `${c.slug}-${n}`;
  }
  return result;
}

/**
 * Contributors from the local git history, or null when it is missing or shallow
 * (a shallow clone would undercount everyone, so the caller falls back to a snapshot).
 */
export function contributorsFromGit(cwd = process.cwd()): Contributor[] | null {
  try {
    const git = (args: string[]) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 });
    if (git(["rev-parse", "--is-shallow-repository"]).trim() !== "false") return null;
    const list = buildContributors(parseGitLog(git(["log", "--no-merges", "--numstat", `--format=${GIT_LOG_FORMAT}`])));
    return list.length ? list : null;
  } catch {
    return null;
  }
}

/** The GitHub avatar for a contributor, or null when no account is known. */
export function avatarUrl(c: Pick<Contributor, "login" | "githubId">, size = 96) {
  if (c.githubId) return `https://avatars.githubusercontent.com/u/${c.githubId}?s=${size}&v=4`;
  if (c.login) return `https://github.com/${c.login}.png?size=${size}`;
  return null;
}

export function initials(name: string) {
  const parts = name.trim().split(/[\s._-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "?") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}
