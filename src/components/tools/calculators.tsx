import { useMemo, useState } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { GRADE_SCALE, gradeFromMarks } from "@/data/tools";
import { cn } from "@/lib/utils";

const LETTERS = GRADE_SCALE.map((g) => g.letter);
const inputClass = "h-11 w-full rounded-sm border bg-surface px-3 text-foreground";

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-lg border bg-surface p-4 md:p-5", className)}>{children}</div>;
}

function Result({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-md bg-secondary px-4 py-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 font-mono text-3xl font-semibold tabular-nums">{value}</p>
      {hint ? <p className="mt-2 text-sm text-muted">{hint}</p> : null}
    </div>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium">
      {children}
    </label>
  );
}

export function SgpaCalculator() {
  const [rows, setRows] = useState([
    { id: 1, name: "Course 1", credits: 4, letter: "A" },
    { id: 2, name: "Course 2", credits: 3, letter: "A+" },
    { id: 3, name: "Course 3", credits: 3, letter: "B+" },
    { id: 4, name: "Course 4", credits: 3, letter: "O" },
    { id: 5, name: "Lab", credits: 1, letter: "A+" },
  ]);
  const result = useMemo(() => {
    let num = 0;
    let den = 0;
    for (const r of rows) {
      const g = GRADE_SCALE.find((x) => x.letter === r.letter);
      if (!g || r.credits <= 0) continue;
      num += r.credits * g.point;
      den += r.credits;
    }
    return { sgpa: den === 0 ? 0 : num / den, credits: den, points: num };
  }, [rows]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <Card>
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_88px_96px_40px]">
              <input
                className={inputClass}
                value={r.name}
                aria-label="Course name"
                onChange={(e) =>
                  setRows((rs) =>
                    rs.map((x) => (x.id === r.id ? { ...x, name: e.target.value } : x)),
                  )
                }
              />
              <input
                className={inputClass}
                type="number"
                min={1}
                max={12}
                value={r.credits}
                aria-label="Credits"
                onChange={(e) =>
                  setRows((rs) =>
                    rs.map((x) => (x.id === r.id ? { ...x, credits: Number(e.target.value) } : x)),
                  )
                }
              />
              <select
                className={inputClass}
                value={r.letter}
                aria-label="Letter grade"
                onChange={(e) =>
                  setRows((rs) =>
                    rs.map((x) => (x.id === r.id ? { ...x, letter: e.target.value } : x)),
                  )
                }
              >
                {LETTERS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
              <button
                type="button"
                className="h-11 text-sm text-muted hover:text-danger"
                onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}
                aria-label="Remove course"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 h-11 rounded-sm border px-3 text-sm font-medium hover:bg-secondary"
          onClick={() =>
            setRows((rs) => [
              ...rs,
              {
                id: (rs.at(-1)?.id ?? 0) + 1,
                name: `Course ${rs.length + 1}`,
                credits: 3,
                letter: "A",
              },
            ])
          }
        >
          Add course
        </button>
      </Card>
      <div className="space-y-4">
        <Result
          label="SGPA"
          value={result.sgpa.toFixed(2)}
          hint={`Σ CiGi = ${result.points} · Σ Ci = ${result.credits}`}
        />
        <p className="text-sm text-muted">
          Formula: SGPA = Σ (Ci × Gi) / Σ Ci. Failed papers keep their credits in the denominator.{" "}
          <AppLink
            href="/articles/how-vtu-sgpa-is-calculated"
            className="text-primary hover:underline"
          >
            Full worked example
          </AppLink>
          .
        </p>
      </div>
    </div>
  );
}

export function CgpaCalculator() {
  const [rows, setRows] = useState([
    { id: 1, name: "Semester 1", credits: 20, sgpa: 8.2 },
    { id: 2, name: "Semester 2", credits: 20, sgpa: 8.6 },
    { id: 3, name: "Semester 3", credits: 21, sgpa: 8.4 },
  ]);
  const result = useMemo(() => {
    let num = 0;
    let den = 0;
    for (const r of rows) {
      if (r.credits <= 0) continue;
      num += r.credits * r.sgpa;
      den += r.credits;
    }
    const cgpa = den === 0 ? 0 : num / den;
    return { cgpa, credits: den, approxPct: (cgpa - 0.75) * 10 };
  }, [rows]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <Card>
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_88px_96px_40px]">
              <input
                className={inputClass}
                value={r.name}
                aria-label="Semester"
                onChange={(e) =>
                  setRows((rs) =>
                    rs.map((x) => (x.id === r.id ? { ...x, name: e.target.value } : x)),
                  )
                }
              />
              <input
                className={inputClass}
                type="number"
                min={1}
                value={r.credits}
                aria-label="Semester credits"
                onChange={(e) =>
                  setRows((rs) =>
                    rs.map((x) => (x.id === r.id ? { ...x, credits: Number(e.target.value) } : x)),
                  )
                }
              />
              <input
                className={inputClass}
                type="number"
                min={0}
                max={10}
                step={0.01}
                value={r.sgpa}
                aria-label="SGPA"
                onChange={(e) =>
                  setRows((rs) =>
                    rs.map((x) => (x.id === r.id ? { ...x, sgpa: Number(e.target.value) } : x)),
                  )
                }
              />
              <button
                type="button"
                className="h-11 text-sm text-muted hover:text-danger"
                onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}
                aria-label="Remove semester"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 h-11 rounded-sm border px-3 text-sm font-medium hover:bg-secondary"
          onClick={() =>
            setRows((rs) => [
              ...rs,
              {
                id: (rs.at(-1)?.id ?? 0) + 1,
                name: `Semester ${rs.length + 1}`,
                credits: 20,
                sgpa: 8,
              },
            ])
          }
        >
          Add semester
        </button>
      </Card>
      <div className="space-y-4">
        <Result
          label="CGPA"
          value={result.cgpa.toFixed(2)}
          hint={`${result.credits} credits counted`}
        />
        <p className="text-sm text-muted">
          Informal percentage conversion (CGPA − 0.75) × 10 ≈{" "}
          <span className="tabular-nums text-foreground">{result.approxPct.toFixed(1)}%</span>.
          Unofficial.{" "}
          <AppLink
            href="/articles/how-to-calculate-vtu-cgpa"
            className="text-primary hover:underline"
          >
            How CGPA is calculated
          </AppLink>
          .
        </p>
      </div>
    </div>
  );
}

export function MarksCalculator() {
  const [scheme, setScheme] = useState<"50" | "40">("50");
  const [cie, setCie] = useState(42);
  const [see, setSee] = useState(38);
  const cieMax = scheme === "50" ? 50 : 40;
  const seeMax = scheme === "50" ? 50 : 60;
  const total = Math.min(100, cie + see);
  const grade = gradeFromMarks(total);
  const pass = total >= 40 && grade.letter !== "F";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <Card className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium">Scheme split</p>
          <div className="flex flex-wrap gap-2">
            {(["50", "40"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScheme(s)}
                className={cn(
                  "h-11 rounded-sm border px-3 text-sm font-medium",
                  scheme === s ? "border-primary bg-secondary" : "hover:bg-secondary",
                )}
              >
                {s === "50" ? "2022 scheme · 50 + 50" : "2018 scheme · 40 + 60"}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="cie">CIE (max {cieMax})</FieldLabel>
            <input
              id="cie"
              className={inputClass}
              type="number"
              min={0}
              max={cieMax}
              value={cie}
              onChange={(e) => setCie(Number(e.target.value))}
            />
          </div>
          <div>
            <FieldLabel htmlFor="see">SEE (max {seeMax})</FieldLabel>
            <input
              id="see"
              className={inputClass}
              type="number"
              min={0}
              max={seeMax}
              value={see}
              onChange={(e) => setSee(Number(e.target.value))}
            />
          </div>
        </div>
      </Card>
      <div className="space-y-4">
        <Result
          label="Total / grade"
          value={`${total} · ${grade.letter}`}
          hint={`${grade.label} · ${grade.point} grade points. ${pass ? "At or above the common 40% total." : "Below the common 40% pass total."}`}
        />
        <p className="text-sm text-muted">
          <AppLink
            href="/articles/understanding-vtu-grading"
            className="text-primary hover:underline"
          >
            Grading explained
          </AppLink>
          .
        </p>
      </div>
    </div>
  );
}

export function AttendanceCalculator() {
  const [attended, setAttended] = useState(42);
  const [conducted, setConducted] = useState(56);
  const [target, setTarget] = useState(85);
  const pct = conducted === 0 ? 0 : (attended / conducted) * 100;
  const t = target / 100;
  let need = 0;
  if (pct < target && t < 1) {
    need = Math.ceil((t * conducted - attended) / (1 - t));
    if (need < 0) need = 0;
  }
  let canMiss = 0;
  if (pct >= target) {
    canMiss = Math.floor((attended - t * conducted) / t);
    if (canMiss < 0) canMiss = 0;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <Card className="grid gap-4 sm:grid-cols-3">
        <div>
          <FieldLabel htmlFor="att">Classes attended</FieldLabel>
          <input
            id="att"
            className={inputClass}
            type="number"
            min={0}
            value={attended}
            onChange={(e) => setAttended(Number(e.target.value))}
          />
        </div>
        <div>
          <FieldLabel htmlFor="con">Classes conducted</FieldLabel>
          <input
            id="con"
            className={inputClass}
            type="number"
            min={0}
            value={conducted}
            onChange={(e) => setConducted(Number(e.target.value))}
          />
        </div>
        <div>
          <FieldLabel htmlFor="tgt">Target %</FieldLabel>
          <input
            id="tgt"
            className={inputClass}
            type="number"
            min={1}
            max={99}
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
          />
        </div>
      </Card>
      <Result
        label="Attendance"
        value={`${pct.toFixed(1)}%`}
        hint={
          pct >= target
            ? `You can miss about ${canMiss} more class${canMiss === 1 ? "" : "es"} and stay at ${target}%.`
            : `You still need ${need} consecutive class${need === 1 ? "" : "es"} without absence to reach ${target}%.`
        }
      />
    </div>
  );
}

export function PercentageCalculator() {
  const [obtained, setObtained] = useState(78);
  const [max, setMax] = useState(100);
  const pct = max === 0 ? 0 : (obtained / max) * 100;
  return (
    <Card className="max-w-lg space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="obt">Obtained</FieldLabel>
          <input
            id="obt"
            className={inputClass}
            type="number"
            value={obtained}
            onChange={(e) => setObtained(Number(e.target.value))}
          />
        </div>
        <div>
          <FieldLabel htmlFor="max">Maximum</FieldLabel>
          <input
            id="max"
            className={inputClass}
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
        </div>
      </div>
      <Result label="Percentage" value={`${pct.toFixed(2)}%`} />
    </Card>
  );
}
