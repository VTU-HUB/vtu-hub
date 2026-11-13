/**
 * Input checks for the in-browser calculators: which saved values to trust from
 * localStorage, and which typed values are out of range. No DOM and no "@/" imports,
 * so `node --test` can load it.
 */

/** Range the SGPA credit field accepts (0 = a non-credit course, which SGPA skips). */
export const COURSE_CREDITS = { min: 0, max: 12 } as const;
/** SGPA and CGPA are on VTU's 10-point scale. */
export const POINT_SCALE = { min: 0, max: 10 } as const;

export type SgpaRow = { id: number; name: string; credits: number; letter: string };
export type CgpaRow = { id: number; name: string; credits: number; sgpa: number };

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const isStr = (v: unknown): v is string => typeof v === "string";

/** Stored format: { v: STORE_VERSION, data }. Bump the version when a shape changes. */
export const STORE_VERSION = 2;

/**
 * Unwraps a stored value and returns it only when `check` accepts it. Version 1 stored
 * the bare value, so an unwrapped value is still read (and re-checked) for older visitors.
 */
export function readStored<T>(raw: string | null, check: (v: unknown) => T | null): T | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  const data = isObj(parsed) && parsed.v === STORE_VERSION && "data" in parsed ? parsed.data : parsed;
  return check(data);
}

export function writeStored(value: unknown) {
  return JSON.stringify({ v: STORE_VERSION, data: value });
}

function rows<T>(v: unknown, row: (r: Record<string, unknown>) => T | null): T[] | null {
  if (!Array.isArray(v) || v.length === 0 || v.length > 40) return null;
  const out: T[] = [];
  for (const r of v) {
    const ok = isObj(r) ? row(r) : null;
    if (!ok) return null; // one bad row means the whole save is suspect
    out.push(ok);
  }
  return out;
}

export function checkSgpaRows(v: unknown, letters: readonly string[]): SgpaRow[] | null {
  return rows(v, (r) =>
    isNum(r.id) && isStr(r.name) && isNum(r.credits) && isStr(r.letter) && letters.includes(r.letter)
      ? { id: r.id, name: r.name, credits: r.credits, letter: r.letter }
      : null,
  );
}

export function checkCgpaRows(v: unknown): CgpaRow[] | null {
  return rows(v, (r) =>
    isNum(r.id) && isStr(r.name) && isNum(r.credits) && isNum(r.sgpa)
      ? { id: r.id, name: r.name, credits: r.credits, sgpa: r.sgpa }
      : null,
  );
}

export function checkMarks(v: unknown): { scheme: "50" | "40"; cie: number; see: number } | null {
  return isObj(v) && (v.scheme === "50" || v.scheme === "40") && isNum(v.cie) && isNum(v.see)
    ? { scheme: v.scheme, cie: v.cie, see: v.see }
    : null;
}

export function checkNumbers<K extends string>(v: unknown, keys: readonly K[]): Record<K, number> | null {
  if (!isObj(v)) return null;
  const out = {} as Record<K, number>;
  for (const k of keys) {
    const n = v[k];
    if (!isNum(n)) return null;
    out[k] = n;
  }
  return out;
}

/** True when `n` is a real number inside [min, max]. An empty field arrives as NaN. */
export function inRange(n: number, { min, max }: { min: number; max: number }) {
  return Number.isFinite(n) && n >= min && n <= max;
}

/** Rows of the SGPA table that are left out of the result because a value is invalid. */
export function badSgpaRows(list: SgpaRow[]) {
  return list.filter((r) => !inRange(r.credits, COURSE_CREDITS)).length;
}

/** Rows of the CGPA table that are left out: credits must be above 0, SGPA within 0–10. */
export function badCgpaRows(list: CgpaRow[]) {
  return list.filter((r) => !(Number.isFinite(r.credits) && r.credits > 0) || !inRange(r.sgpa, POINT_SCALE)).length;
}
