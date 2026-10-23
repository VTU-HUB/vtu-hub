import { GRADE_SCALE, gradeFromMarks } from "@/data/tools";

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
  let rows: Row[] = [
    { id: 1, name: "Course 1", credits: 4, letter: "A" },
    { id: 2, name: "Course 2", credits: 3, letter: "A+" },
    { id: 3, name: "Course 3", credits: 3, letter: "B+" },
    { id: 4, name: "Course 4", credits: 3, letter: "O" },
    { id: 5, name: "Lab", credits: 1, letter: "A+" },
  ];
  const list = el("div", "space-y-3");
  const card = el("div", "rounded-lg border bg-surface p-4 md:p-5");
  card.append(list);
  const add = el(
    "button",
    "mt-4 h-11 rounded-sm border px-3 text-sm font-medium hover:bg-secondary",
    "Add course",
  );
  add.type = "button";
  card.append(add);
  const result = resultBox("SGPA", "0.00", " ");
  const wrap = el("div", "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]");
  const side = el("div", "space-y-4");
  side.append(result.box);
  const note = el("p", "text-sm text-muted");
  note.innerHTML =
    'Formula: SGPA = Σ (Ci × Gi) / Σ Ci. Failed papers keep their credits in the denominator. <a class="text-primary hover:underline" href="/articles/how-vtu-sgpa-is-calculated">Full worked example</a>.';
  side.append(note);
  wrap.append(card, side);

  const paint = () => {
    list.replaceChildren();
    let num = 0;
    let den = 0;
    for (const row of rows) {
      const g = GRADE_SCALE.find((x) => x.letter === row.letter);
      if (g && row.credits > 0) {
        num += row.credits * g.point;
        den += row.credits;
      }
      const line = el("div", "grid grid-cols-1 gap-2 md:grid-cols-[1fr_88px_96px_72px]");
      const name = el("input", inputClass) as HTMLInputElement;
      name.value = row.name;
      name.setAttribute("aria-label", "Course name");
      name.addEventListener("input", () => {
        row.name = name.value;
      });
      const credits = el("input", inputClass) as HTMLInputElement;
      credits.type = "number";
      credits.min = "1";
      credits.max = "12";
      credits.value = String(row.credits);
      credits.setAttribute("aria-label", "Credits");
      credits.addEventListener("input", () => {
        row.credits = Number(credits.value);
        paint();
      });
      const letter = el("select", inputClass) as HTMLSelectElement;
      letter.setAttribute("aria-label", "Letter grade");
      for (const g of GRADE_SCALE) {
        const opt = el("option", "", g.letter) as HTMLOptionElement;
        opt.value = g.letter;
        if (g.letter === row.letter) opt.selected = true;
        letter.append(opt);
      }
      letter.addEventListener("change", () => {
        row.letter = letter.value;
        paint();
      });
      const remove = el("button", "h-11 text-sm text-muted hover:text-danger", "Remove");
      remove.type = "button";
      remove.addEventListener("click", () => {
        rows = rows.filter((x) => x.id !== row.id);
        paint();
      });
      line.append(name, credits, letter, remove);
      list.append(line);
    }
    const sgpa = den === 0 ? 0 : num / den;
    result.value.textContent = sgpa.toFixed(2);
    if (result.hint) result.hint.textContent = `Σ CiGi = ${num} · Σ Ci = ${den}`;
  };
  add.addEventListener("click", () => {
    rows = [
      ...rows,
      {
        id: (rows.at(-1)?.id ?? 0) + 1,
        name: `Course ${rows.length + 1}`,
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
  let rows: Row[] = [
    { id: 1, name: "Semester 1", credits: 20, sgpa: 8.2 },
    { id: 2, name: "Semester 2", credits: 20, sgpa: 8.6 },
    { id: 3, name: "Semester 3", credits: 21, sgpa: 8.4 },
  ];
  const list = el("div", "space-y-3");
  const card = el("div", "rounded-lg border bg-surface p-4 md:p-5");
  card.append(list);
  const add = el(
    "button",
    "mt-4 h-11 rounded-sm border px-3 text-sm font-medium hover:bg-secondary",
    "Add semester",
  );
  add.type = "button";
  card.append(add);
  const result = resultBox("CGPA", "0.00", " ");
  const wrap = el("div", "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]");
  const side = el("div", "space-y-4");
  const note = el("p", "text-sm text-muted");
  side.append(result.box, note);
  wrap.append(card, side);
  const paint = () => {
    list.replaceChildren();
    let num = 0;
    let den = 0;
    for (const row of rows) {
      if (row.credits > 0) {
        num += row.credits * row.sgpa;
        den += row.credits;
      }
      const line = el("div", "grid grid-cols-1 gap-2 md:grid-cols-[1fr_88px_96px_72px]");
      const name = el("input", inputClass) as HTMLInputElement;
      name.value = row.name;
      name.addEventListener("input", () => {
        row.name = name.value;
      });
      const credits = el("input", inputClass) as HTMLInputElement;
      credits.type = "number";
      credits.min = "1";
      credits.value = String(row.credits);
      credits.addEventListener("input", () => {
        row.credits = Number(credits.value);
        paint();
      });
      const sgpa = el("input", inputClass) as HTMLInputElement;
      sgpa.type = "number";
      sgpa.min = "0";
      sgpa.max = "10";
      sgpa.step = "0.01";
      sgpa.value = String(row.sgpa);
      sgpa.addEventListener("input", () => {
        row.sgpa = Number(sgpa.value);
        paint();
      });
      const remove = el("button", "h-11 text-sm text-muted hover:text-danger", "Remove");
      remove.type = "button";
      remove.addEventListener("click", () => {
        rows = rows.filter((x) => x.id !== row.id);
        paint();
      });
      line.append(name, credits, sgpa, remove);
      list.append(line);
    }
    const cgpa = den === 0 ? 0 : num / den;
    const pct = (cgpa - 0.75) * 10;
    result.value.textContent = cgpa.toFixed(2);
    if (result.hint) result.hint.textContent = `${den} credits counted`;
    note.innerHTML = `Informal percentage conversion (CGPA − 0.75) × 10 ≈ <span class="tabular-nums text-foreground">${pct.toFixed(1)}%</span>. Unofficial. <a class="text-primary hover:underline" href="/articles/how-to-calculate-vtu-cgpa">How CGPA is calculated</a>.`;
  };
  add.addEventListener("click", () => {
    rows = [
      ...rows,
      { id: (rows.at(-1)?.id ?? 0) + 1, name: `Semester ${rows.length + 1}`, credits: 20, sgpa: 8 },
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
  const card = el("div", "space-y-4 rounded-lg border bg-surface p-4 md:p-5");
  const split = el("div", "flex flex-wrap gap-2");
  card.append(el("p", "text-sm font-medium", "Scheme split"), split);
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
  const result = resultBox("Total / grade", "0 · F", " ");
  const note = el("p", "text-sm text-muted");
  note.innerHTML =
    '<a class="text-primary hover:underline" href="/articles/understanding-vtu-grading">Grading explained</a>.';
  const wrap = el("div", "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]");
  const side = el("div", "space-y-4");
  side.append(result.box, note);
  wrap.append(card, side);
  const paint = () => {
    const cieMax = scheme === "50" ? 50 : 40;
    const seeMax = scheme === "50" ? 50 : 60;
    cieLabel.textContent = `CIE (max ${cieMax})`;
    seeLabel.textContent = `SEE (max ${seeMax})`;
    cieInput.max = String(cieMax);
    seeInput.max = String(seeMax);
    cieInput.value = String(cie);
    seeInput.value = String(see);
    split.replaceChildren();
    for (const s of ["50", "40"] as const) {
      const b = el(
        "button",
        `h-11 rounded-sm border px-3 text-sm font-medium ${scheme === s ? "border-primary bg-secondary" : "hover:bg-secondary"}`,
        s === "50" ? "2022 scheme · 50 + 50" : "2018 scheme · 40 + 60",
      );
      b.type = "button";
      b.addEventListener("click", () => {
        scheme = s;
        paint();
      });
      split.append(b);
    }
    const total = Math.min(100, cie + see);
    const grade = gradeFromMarks(total);
    const pass = total >= 40 && grade.letter !== "F";
    result.value.textContent = `${total} · ${grade.letter}`;
    if (result.hint) {
      result.hint.textContent = `${grade.label} · ${grade.point} grade points. ${pass ? "At or above the common 40% total." : "Below the common 40% pass total."}`;
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
  const card = el("div", "grid gap-4 rounded-lg border bg-surface p-4 sm:grid-cols-3 md:p-5");
  const fields: Array<[string, string, () => number, (n: number) => void]> = [
    ["Classes attended", "att", () => attended, (n) => (attended = n)],
    ["Classes conducted", "con", () => conducted, (n) => (conducted = n)],
    ["Target %", "tgt", () => target, (n) => (target = n)],
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
  const result = resultBox("Attendance", "0%", " ");
  const wrap = el("div", "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]");
  wrap.append(card, result.box);
  const paint = () => {
    const pct = conducted === 0 ? 0 : (attended / conducted) * 100;
    const t = target / 100;
    let need = 0;
    if (pct < target && t < 1) need = Math.max(0, Math.ceil((t * conducted - attended) / (1 - t)));
    let canMiss = 0;
    if (pct >= target) canMiss = Math.max(0, Math.floor((attended - t * conducted) / t));
    result.value.textContent = `${pct.toFixed(1)}%`;
    if (result.hint) {
      result.hint.textContent =
        pct >= target
          ? `You can miss about ${canMiss} more class${canMiss === 1 ? "" : "es"} and stay at ${target}%.`
          : `You still need ${need} consecutive class${need === 1 ? "" : "es"} without absence to reach ${target}%.`;
    }
  };
  root.replaceChildren(wrap);
  paint();
}

function mountPercentage(root: HTMLElement) {
  let obtained = 78;
  let max = 100;
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
    mk("obt", "Obtained", obtained, (n) => (obtained = n)),
    mk("max", "Maximum", max, (n) => (max = n)),
  );
  const result = resultBox("Percentage", "0%");
  card.append(grid, result.box);
  const paint = () => {
    const pct = max === 0 ? 0 : (obtained / max) * 100;
    result.value.textContent = `${pct.toFixed(2)}%`;
  };
  root.replaceChildren(card);
  paint();
}

const root = document.querySelector<HTMLElement>("[data-calc]");
if (root) {
  const slug = root.dataset.calc;
  if (slug === "sgpa") mountSgpa(root);
  if (slug === "cgpa") mountCgpa(root);
  if (slug === "marks") mountMarks(root);
  if (slug === "attendance") mountAttendance(root);
  if (slug === "percentage") mountPercentage(root);
}
