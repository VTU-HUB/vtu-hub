import {
  attendance,
  cgpa as cgpaOf,
  cgpaToPercentage,
  courseResult,
  GRADE_SCALE,
  MARK_SPLITS,
  SPECIAL_GRADES,
  percentage,
  percentageError,
  sgpa as sgpaOf,
} from "@/lib/grades";
import {
  badCgpaRows,
  badSgpaRows,
  checkCgpaRows,
  checkMarks,
  checkNumbers,
  checkSgpaRows,
  COURSE_CREDITS,
  inRange,
  POINT_SCALE,
  readStored,
  writeStored,
} from "@/lib/calc-input";
import { calcStrings } from "@/i18n/calc";

const S = calcStrings();
const LETTERS = [...GRADE_SCALE.map((g) => g.letter), ...SPECIAL_GRADES.map((g) => g.letter)];

/**
 * Calculator inputs persist in this browser only (localStorage); nothing is sent anywhere.
 * A saved value is used only when `check` accepts its shape; anything else (corrupt,
 * from an older version, edited by hand) is ignored and the defaults are shown.
 */
const STORE = "vtuhub-calc-";
function load<T>(key: string, fallback: T, check: (v: unknown) => T | null): T {
  try {
    return readStored(localStorage.getItem(STORE + key), check) ?? fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: unknown) {
  try {
    localStorage.setItem(STORE + key, writeStored(value));
  } catch {
    /* storage blocked: calculators still work, just without memory */
  }
}

const inputClass = "h-11 w-full rounded-sm border bg-surface px-3 text-foreground";

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function resultBox(label: string, value: string, hint?: string) {
  const box = el("div", "rounded-md bg-secondary px-4 py-4");
  box.append(el("p", "text-xs font-medium uppercase tracking-wider text-muted", label));
  const v = el("p", "mt-1 font-mono text-3xl font-semibold tabular-nums", value);
  box.append(v);
  let hintEl: HTMLParagraphElement | null = null;
  if (hint) {
    hintEl = el("p", "mt-2 text-sm text-muted", hint);
    box.append(hintEl);
  }
  return { box, value: v, hint: hintEl };
}

function mountSgpa(root: HTMLElement) {
  type Row = { id: number; name: string; credits: number; letter: string };
  let rows: Row[] = load<Row[]>("sgpa", [
    { id: 1, name: S.course(1), credits: 4, letter: "A" },
    { id: 2, name: S.course(2), credits: 3, letter: "A+" },
    { id: 3, name: S.course(3), credits: 3, letter: "B+" },
    { id: 4, name: S.course(4), credits: 3, letter: "O" },
    { id: 5, name: S.lab, credits: 1, letter: "A+" },
  ], (v) => checkSgpaRows(v, LETTERS));
  const list = el("div", "space-y-3");
  const card = el("div", "rounded-lg border bg-surface p-4 md:p-5");
  card.append(list);
  const add = el(
    "button",
    "mt-4 h-11 rounded-sm border px-3 text-sm font-medium hover:bg-secondary",
    S.addCourse,
  );
  add.type = "button";
  card.append(add);
  const result = resultBox(S.sgpa, "0.00", " ");
  const wrap = el("div", "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]");
  const side = el("div", "space-y-4");
  side.append(result.box);
  const note = el("p", "text-sm text-muted");
  note.innerHTML = S.sgpaNote;
  const warn = el("p", "text-sm text-danger");
  warn.setAttribute("aria-live", "polite");
  side.append(note, warn);
  wrap.append(card, side);

  // Results refresh on every keystroke; the rows are rebuilt only on add/remove,
  // so the field being typed in is never destroyed.
  const update = () => {
    save("sgpa", rows);
    const s = sgpaOf(rows.filter((r) => inRange(r.credits, COURSE_CREDITS)));
    result.value.textContent = s.incomplete || s.value == null ? "—" : s.value.toFixed(2);
    if (result.hint) result.hint.textContent = s.incomplete ? "" : S.sgpaHint(s.points, s.credits);
    const bad = badSgpaRows(rows);
    const special = s.incomplete
      ? S.sgpaIncomplete(s.excluded.filter((e) => e.letter === "AB").map((e) => e.reason).join("; "))
      : s.excluded.length
        ? S.sgpaSpecialSkipped(s.excluded.map((e) => `${e.letter} (${e.reason})`).join("; "))
        : "";
    warn.textContent = [bad ? S.sgpaRowsSkipped(bad, COURSE_CREDITS.max) : "", special].filter(Boolean).join(" ");
  };
  const paint = () => {
    list.replaceChildren();
    for (const row of rows) {
      const line = el("div", "grid grid-cols-1 gap-2 md:grid-cols-[1fr_88px_96px_72px]");
      const name = el("input", inputClass) as HTMLInputElement;
      name.value = row.name;
      name.setAttribute("aria-label", S.courseName);
      name.addEventListener("input", () => {
        row.name = name.value;
        save("sgpa", rows);
      });
      const credits = el("input", inputClass) as HTMLInputElement;
      credits.type = "number";
      credits.min = String(COURSE_CREDITS.min);
      credits.max = String(COURSE_CREDITS.max);
      credits.value = String(row.credits);
      credits.setAttribute("aria-label", S.credits);
      credits.addEventListener("input", () => {
        row.credits = Number(credits.value);
        update();
      });
      const letter = el("select", inputClass) as HTMLSelectElement;
      letter.setAttribute("aria-label", S.letterGrade);
      const scale = el("optgroup") as HTMLOptGroupElement;
      scale.label = S.letterGrade;
      for (const g of GRADE_SCALE) {
        const opt = el("option", "", g.letter) as HTMLOptionElement;
        opt.value = g.letter;
        if (g.letter === row.letter) opt.selected = true;
        scale.append(opt);
      }
      letter.append(scale);
      const extra = el("optgroup") as HTMLOptGroupElement;
      extra.label = S.specialGrades;
      for (const g of SPECIAL_GRADES) {
        const opt = el("option", "", `${g.letter} — ${g.label}`) as HTMLOptionElement;
        opt.value = g.letter;
        if (g.letter === row.letter) opt.selected = true;
        extra.append(opt);
      }
      letter.append(extra);
      letter.addEventListener("change", () => {
        row.letter = letter.value;
        update();
      });
      const remove = el("button", "h-11 text-sm text-muted hover:text-danger", S.remove);
      remove.type = "button";
      remove.addEventListener("click", () => {
        rows = rows.filter((x) => x.id !== row.id);
        paint();
      });
      line.append(name, credits, letter, remove);
      list.append(line);
    }
    update();
  };
  add.addEventListener("click", () => {
    rows = [
      ...rows,
      {
        id: (rows.at(-1)?.id ?? 0) + 1,
        name: S.course(rows.length + 1),
        credits: 3,
        letter: "A",
      },
    ];
    paint();
  });
  root.replaceChildren(wrap);
  paint();
}

function mountCgpa(root: HTMLElement) {
  type Row = { id: number; name: string; credits: number; sgpa: number };
  let rows: Row[] = load<Row[]>("cgpa", [
    { id: 1, name: S.semester(1), credits: 20, sgpa: 8.2 },
    { id: 2, name: S.semester(2), credits: 20, sgpa: 8.6 },
    { id: 3, name: S.semester(3), credits: 21, sgpa: 8.4 },
  ], checkCgpaRows);
  const list = el("div", "space-y-3");
  const card = el("div", "rounded-lg border bg-surface p-4 md:p-5");
  card.append(list);
  const add = el(
    "button",
    "mt-4 h-11 rounded-sm border px-3 text-sm font-medium hover:bg-secondary",
    S.addSemester,
  );
  add.type = "button";
  card.append(add);
  const result = resultBox("CGPA", "0.00", " ");
  const wrap = el("div", "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]");
  const side = el("div", "space-y-4");
  const note = el("p", "text-sm text-muted");
  const warn = el("p", "text-sm text-danger");
  warn.setAttribute("aria-live", "polite");
  side.append(result.box, note, warn);
  wrap.append(card, side);
  const update = () => {
    save("cgpa", rows);
    const c = cgpaOf(rows.filter((r) => r.credits > 0 && inRange(r.sgpa, POINT_SCALE)));
    result.value.textContent = c.value.toFixed(2);
    if (result.hint) result.hint.textContent = S.creditsCounted(c.credits);
    note.innerHTML = S.cgpaNote(cgpaToPercentage(c.value).toFixed(1));
    const bad = badCgpaRows(rows);
    warn.textContent = bad ? S.cgpaRowsSkipped(bad) : "";
  };
  const paint = () => {
    list.replaceChildren();
    for (const row of rows) {
      const line = el("div", "grid grid-cols-1 gap-2 md:grid-cols-[1fr_88px_96px_72px]");
      const name = el("input", inputClass) as HTMLInputElement;
      name.value = row.name;
      name.addEventListener("input", () => {
        row.name = name.value;
        save("cgpa", rows);
      });
      const credits = el("input", inputClass) as HTMLInputElement;
      credits.type = "number";
      credits.min = "1";
      credits.value = String(row.credits);
      credits.addEventListener("input", () => {
        row.credits = Number(credits.value);
        update();
      });
      const sgpa = el("input", inputClass) as HTMLInputElement;
      sgpa.type = "number";
      sgpa.min = String(POINT_SCALE.min);
      sgpa.max = String(POINT_SCALE.max);
      sgpa.step = "0.01";
      sgpa.value = String(row.sgpa);
      sgpa.addEventListener("input", () => {
        row.sgpa = Number(sgpa.value);
        update();
      });
      const remove = el("button", "h-11 text-sm text-muted hover:text-danger", S.remove);
      remove.type = "button";
      remove.addEventListener("click", () => {
        rows = rows.filter((x) => x.id !== row.id);
        paint();
      });
      line.append(name, credits, sgpa, remove);
      list.append(line);
    }
    update();
  };
  add.addEventListener("click", () => {
    rows = [
      ...rows,
      { id: (rows.at(-1)?.id ?? 0) + 1, name: S.semester(rows.length + 1), credits: 20, sgpa: 8 },
    ];
    paint();
  });
  root.replaceChildren(wrap);
  paint();
}

function mountMarks(root: HTMLElement) {
  let scheme: "50" | "40" = "50";
  let cie = 42;
  let see = 38;
  ({ scheme, cie, see } = load("marks", { scheme, cie, see }, checkMarks));
  const card = el("div", "space-y-4 rounded-lg border bg-surface p-4 md:p-5");
  const split = el("div", "flex flex-wrap gap-2");
  card.append(el("p", "text-sm font-medium", S.schemeSplit), split);
  const grid = el("div", "grid gap-4 sm:grid-cols-2");
  const cieInput = el("input", inputClass) as HTMLInputElement;
  const seeInput = el("input", inputClass) as HTMLInputElement;
  cieInput.type = seeInput.type = "number";
  cieInput.min = seeInput.min = "0";
  const cieWrap = el("div");
  const seeWrap = el("div");
  const cieLabel = el("label", "mb-1 block text-sm font-medium");
  const seeLabel = el("label", "mb-1 block text-sm font-medium");
  cieLabel.htmlFor = "cie";
  seeLabel.htmlFor = "see";
  cieInput.id = "cie";
  seeInput.id = "see";
  cieWrap.append(cieLabel, cieInput);
  seeWrap.append(seeLabel, seeInput);
  grid.append(cieWrap, seeWrap);
  card.append(grid);
  const result = resultBox(S.totalGrade, "0 · F", " ");
  const note = el("p", "text-sm text-muted");
  note.innerHTML = S.grading;
  const wrap = el("div", "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]");
  const side = el("div", "space-y-4");
  side.append(result.box, note);
  wrap.append(card, side);
  const paint = () => {
    save("marks", { scheme, cie, see });
    const { cieMax, seeMax } = MARK_SPLITS[scheme];
    cieLabel.textContent = S.cie(cieMax);
    seeLabel.textContent = S.see(seeMax);
    cieInput.max = String(cieMax);
    seeInput.max = String(seeMax);
    // Don't overwrite a field while the user is typing in it (clearing it would snap back to 0).
    if (document.activeElement !== cieInput) cieInput.value = String(cie);
    if (document.activeElement !== seeInput) seeInput.value = String(see);
    split.replaceChildren();
    for (const s of ["50", "40"] as const) {
      const b = el(
        "button",
        `h-11 rounded-sm border px-3 text-sm font-medium ${scheme === s ? "border-primary bg-secondary" : "hover:bg-secondary"}`,
        s === "50" ? S.scheme2022 : S.scheme2018,
      );
      b.type = "button";
      b.addEventListener("click", () => {
        scheme = s;
        paint();
      });
      split.append(b);
    }
    // Out-of-range marks get a message instead of a silently capped result.
    const range = !inRange(cie, { min: 0, max: cieMax }) ? S.marksRange("CIE", cieMax)
      : !inRange(see, { min: 0, max: seeMax }) ? S.marksRange("SEE", seeMax)
      : "";
    if (range) {
      result.value.textContent = "–";
      if (result.hint) result.hint.textContent = range;
      return;
    }
    const r = courseResult(scheme, cie, see);
    const outcome = r.pass ? "pass" : !r.cieOk ? "cie" : !r.seeOk ? "see" : "total";
    result.value.textContent = `${r.total} · ${r.grade.letter}`;
    if (result.hint) {
      result.hint.textContent = S.gradeHint(r.grade.label, r.grade.point, outcome);
    }
  };
  cieInput.addEventListener("input", () => {
    cie = Number(cieInput.value);
    paint();
  });
  seeInput.addEventListener("input", () => {
    see = Number(seeInput.value);
    paint();
  });
  root.replaceChildren(wrap);
  paint();
}

function mountAttendance(root: HTMLElement) {
  let attended = 42;
  let conducted = 56;
  let target = 85;
  ({ attended, conducted, target } = load("attendance", { attended, conducted, target }, (v) =>
    checkNumbers(v, ["attended", "conducted", "target"] as const),
  ));
  const card = el("div", "grid gap-4 rounded-lg border bg-surface p-4 sm:grid-cols-3 md:p-5");
  const fields: Array<[string, string, () => number, (n: number) => void]> = [
    [S.attended, "att", () => attended, (n) => (attended = n)],
    [S.conducted, "con", () => conducted, (n) => (conducted = n)],
    [S.target, "tgt", () => target, (n) => (target = n)],
  ];
  const inputs: HTMLInputElement[] = [];
  for (const [label, id, read, write] of fields) {
    const wrap = el("div");
    const lab = el("label", "mb-1 block text-sm font-medium", label);
    lab.htmlFor = id;
    const input = el("input", inputClass) as HTMLInputElement;
    input.id = id;
    input.type = "number";
    input.min = id === "tgt" ? "1" : "0";
    if (id === "tgt") input.max = "99";
    input.value = String(read());
    input.addEventListener("input", () => {
      write(Number(input.value));
      paint();
    });
    inputs.push(input);
    wrap.append(lab, input);
    card.append(wrap);
  }
  const result = resultBox(S.attendance, "0%", " ");
  const wrap = el("div", "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]");
  wrap.append(card, result.box);
  const paint = () => {
    save("attendance", { attended, conducted, target });
    const a = attendance(attended, conducted, target);
    result.value.textContent = a.error ? "–" : `${a.pct.toFixed(1)}%`;
    if (result.hint) {
      result.hint.textContent =
        a.error === "negative" ? S.negative
        : a.error ? S.attendedTooHigh
        : a.onTrack ? S.canMiss(a.canMiss, a.target) : S.need(a.need, a.target);
    }
  };
  root.replaceChildren(wrap);
  paint();
}

function mountPercentage(root: HTMLElement) {
  let obtained = 78;
  let max = 100;
  ({ obtained, max } = load("percentage", { obtained, max }, (v) => checkNumbers(v, ["obtained", "max"] as const)));
  const card = el("div", "max-w-lg space-y-4 rounded-lg border bg-surface p-4 md:p-5");
  const grid = el("div", "grid gap-4 sm:grid-cols-2");
  const mk = (id: string, label: string, value: number, write: (n: number) => void) => {
    const wrap = el("div");
    const lab = el("label", "mb-1 block text-sm font-medium", label);
    lab.htmlFor = id;
    const input = el("input", inputClass) as HTMLInputElement;
    input.id = id;
    input.type = "number";
    input.value = String(value);
    input.addEventListener("input", () => {
      write(Number(input.value));
      paint();
    });
    wrap.append(lab, input);
    return wrap;
  };
  grid.append(
    mk("obt", S.obtained, obtained, (n) => (obtained = n)),
    mk("max", S.maximum, max, (n) => (max = n)),
  );
  const result = resultBox(S.percentage, "0%");
  const hint = el("p", "text-sm text-danger");
  hint.setAttribute("aria-live", "polite");
  card.append(grid, result.box, hint);
  const paint = () => {
    save("percentage", { obtained, max });
    const err = percentageError(obtained, max);
    result.value.textContent = err ? "–" : `${percentage(obtained, max).toFixed(2)}%`;
    hint.textContent = err === "negative" ? S.negative : err ? S.obtainedTooHigh : "";
  };
  root.replaceChildren(card);
  paint();
}

export function mountCalculators() {
  const root = document.querySelector<HTMLElement>("[data-calc]");
  if (!root) return;
  const slug = root.dataset.calc;
  if (slug === "sgpa") mountSgpa(root);
  if (slug === "cgpa") mountCgpa(root);
  if (slug === "marks") mountMarks(root);
  if (slug === "attendance") mountAttendance(root);
  if (slug === "percentage") mountPercentage(root);
}
