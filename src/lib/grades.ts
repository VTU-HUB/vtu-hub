/**
 * Pure VTU grading maths shared by the calculators and the tool pages.
 * No DOM and no "@/" imports, so `node --test` can load it directly.
 */

export const GRADE_SCALE = [
  { letter: "O", label: "Outstanding", min: 90, point: 10 },
  { letter: "A+", label: "Excellent", min: 80, point: 9 },
  { letter: "A", label: "Very Good", min: 70, point: 8 },
  { letter: "B+", label: "Good", min: 60, point: 7 },
  { letter: "B", label: "Above Average", min: 55, point: 6 },
  { letter: "C", label: "Average", min: 50, point: 5 },
  { letter: "P", label: "Pass", min: 40, point: 4 },
  { letter: "F", label: "Fail", min: 0, point: 0 },
] as const;

export type Grade = (typeof GRADE_SCALE)[number];
const FAIL = GRADE_SCALE[GRADE_SCALE.length - 1];

const finite = (n: number) => (Number.isFinite(n) ? n : 0);

export function gradeFromMarks(total: number): Grade {
  return GRADE_SCALE.find((g) => finite(total) >= g.min) ?? FAIL;
}

/** Credit-weighted mean of grade points. Rows with an unknown letter or no credits are skipped. */
export function sgpa(courses: { credits: number; letter: string }[]) {
  let points = 0;
  let credits = 0;
  for (const c of courses) {
    const g = GRADE_SCALE.find((x) => x.letter === c.letter);
    const cr = finite(c.credits);
    if (g && cr > 0) {
      points += cr * g.point;
      credits += cr;
    }
  }
  return { value: credits === 0 ? 0 : points / credits, points, credits };
}

/** Credit-weighted mean of semester SGPAs. */
export function cgpa(semesters: { credits: number; sgpa: number }[]) {
  let sum = 0;
  let credits = 0;
  for (const s of semesters) {
    const cr = finite(s.credits);
    if (cr > 0) {
      sum += cr * finite(s.sgpa);
      credits += cr;
    }
  }
  return { value: credits === 0 ? 0 : sum / credits, credits };
}

/** Highest grade point on VTU's 10-point scale. */
export const CGPA_MAX = 10;

/**
 * VTU B.E./B.Tech Regulations 2022, clause 22OB 6.7: "Percentage of marks secured,
 * M = CGPA Earned x 10" (illustration: 8.20 → 82.0 %). The clause also says there is
 * no formula as such and this one "may be used" for employment and higher studies.
 * Older schemes have their own regulations; this is the 2022-scheme conversion only.
 * Out-of-range input is clamped to 0–10.
 */
export function cgpaToPercentage(value: number) {
  return Math.min(CGPA_MAX, Math.max(0, finite(value))) * 10;
}

/** CIE/SEE maxima per scheme. 2022: 50 + 50. 2018: 40 + 60. */
export const MARK_SPLITS = {
  "50": { cieMax: 50, seeMax: 50 },
  "40": { cieMax: 40, seeMax: 60 },
} as const;

/**
 * Course result under the VTU pass rules: at least 40% of the CIE maximum,
 * at least 35% of the SEE maximum, and at least 40/100 overall. Failing any
 * one of them is an F regardless of the total.
 */
export function courseResult(split: keyof typeof MARK_SPLITS, cie: number, see: number) {
  const { cieMax, seeMax } = MARK_SPLITS[split];
  const c = Math.min(cieMax, Math.max(0, finite(cie)));
  const s = Math.min(seeMax, Math.max(0, finite(see)));
  const total = c + s;
  const cieOk = c >= 0.4 * cieMax;
  const seeOk = s >= 0.35 * seeMax;
  const pass = cieOk && seeOk && total >= 40;
  return { total, cieOk, seeOk, pass, grade: pass ? gradeFromMarks(total) : FAIL };
}

/**
 * Attendance percentage, plus how many consecutive classes are still needed to
 * reach the target, or how many can be missed while staying at or above it.
 */
export function attendance(attended: number, conducted: number, target: number) {
  // Validation result for the UI; the numbers below are still computed (clamped) so
  // the page never shows NaN, but `error` says the input itself is wrong.
  const error: "negative" | "attended-gt-conducted" | null =
    finite(attended) < 0 || finite(conducted) < 0
      ? "negative"
      : finite(attended) > finite(conducted)
        ? "attended-gt-conducted"
        : null;
  const c = Math.max(0, finite(conducted));
  const a = Math.min(c, Math.max(0, finite(attended)));
  // A 100% target is excluded: after a single absence it can never be reached again.
  const tgt = Math.min(99, Math.max(1, finite(target)));
  const t = tgt / 100;
  const pct = c === 0 ? 0 : (a / c) * 100;
  const onTrack = pct >= tgt;
  return {
    error,
    pct,
    target: tgt,
    onTrack,
    need: onTrack ? 0 : Math.max(0, Math.ceil((t * c - a) / (1 - t))),
    canMiss: onTrack ? Math.max(0, Math.floor((a - t * c) / t + 1e-9)) : 0,
  };
}

export function percentage(obtained: number, max: number) {
  const m = finite(max);
  return m === 0 ? 0 : (finite(obtained) / m) * 100;
}

/** Input problem for the percentage calculator, or null when the inputs make sense. */
export function percentageError(obtained: number, max: number): "negative" | "obtained-gt-max" | null {
  if (finite(obtained) < 0 || finite(max) < 0) return "negative";
  if (finite(obtained) > finite(max)) return "obtained-gt-max";
  return null;
}
