// Parses a VTU "Scheme of Teaching and Examinations" PDF into structured courses.
// Works from pdfjs text positions, not from the PDF's visual table lines, so it
// tolerates the wrapped titles and vertically centred cells VTU's PDFs use.
import { pdfRows } from "./pdf-rows.mjs";

const CODE = /^B[A-Z]{2,5}\d{3}[A-Zx]?$/;
const ROMAN = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8 };
const SEM_HEADING = /^(I|II|III|IV|V|VI|VII|VIII)\s*SEMESTER/i;
const TYPES = new Set([
  "PCC", "PCCL", "IPCC", "PEC", "OEC", "ESC", "ETC", "PLC", "BSC", "HSMC", "AEC", "SEC",
  "UHV", "MC", "INT", "PROJ", "PRJ", "SEMINAR", "NCMC", "ASC", "BS", "IPCCL", "PEC/OEC",
]);

const clean = (s) =>
  s
    .replace(/\s+/g, " ")
    .replace(/\s+([,)])/g, "$1")
    .replace(/\(\s+/g, "(")
    .trim();

/** Elective slot key: "BCS306A", "BCSL306B" and "BXX306x" all map to "306". */
const groupKey = (code) => code.replace(/^B[A-Z]+/, "").replace(/[A-Za-z]$/, "");

/** Splits a code token that pdfjs glued to its neighbour, e.g. "BCS301Mathematics". */
function splitToken(s) {
  const m = /^(B[A-Z]{2,5}\d{3}[A-Zx]?)(?=[A-Z][a-z]|\s|$)(.*)$/.exec(s);
  return m ? [m[1], m[2].trim()].filter(Boolean) : [s];
}

function flatten(rows) {
  const out = [];
  for (const r of rows) {
    const items = [];
    for (const it of r.items) {
      const parts = splitToken(it.s);
      if (parts.length === 2) {
        items.push({ ...it, s: parts[0] }, { ...it, x: it.x + 1, s: parts[1] });
      } else items.push(it);
    }
    out.push({ y: r.y, items });
  }
  return out;
}

/**
 * @returns {Promise<{ semester:number, code:string, title:string, credits:number|null,
 *   type:string|null, elective:boolean, group:string|null, page:number }[]>}
 */
export async function parseScheme(file, { defaultSemesters = [] } = {}) {
  const pages = await pdfRows(file);
  const courses = [];
  const groupSemester = new Map(); // "BCS306x" -> 3
  const pendingElectives = [];
  let semester = null;
  let semIdx = 0;

  for (const { page, rows: raw } of pages) {
    const rows = flatten(raw);
    const maxX = Math.max(...rows.flatMap((r) => r.items.map((i) => i.x + (i.w || 0))));

    // Semester headings: "III SEMESTER". First-year schemes may omit them.
    for (const r of rows) {
      const text = r.items.map((i) => i.s).join(" ");
      const m = SEM_HEADING.exec(text.trim());
      if (m) {
        semester = ROMAN[m[1].toUpperCase()];
        break;
      }
    }

    // Main-table anchors: a course code that is not in the leftmost margin.
    const anchors = [];
    for (const r of rows) {
      for (const it of r.items) {
        if (CODE.test(it.s) && it.x > 75 && it.x < maxX * 0.3) anchors.push({ y: r.y, x: it.x, code: it.s });
      }
    }
    // Right edge of the title column: the "TD:" / department column.
    const tdXs = rows.flatMap((r) => r.items).filter((it) => /^(TD\b|TD:|TD\s*\/)/.test(it.s)).map((it) => it.x);
    const titleRight = (tdXs.length ? Math.min(...tdXs) : maxX * 0.45) - 8;
    anchors.sort((a, b) => b.y - a.y);

    // Credits column = rightmost numeric column on the page.
    const creditX = maxX * 0.9;

    for (let i = 0; i < anchors.length; i++) {
      const a = anchors[i];
      const top = i === 0 ? a.y + 9 : Math.min(a.y + 9, (anchors[i - 1].y + a.y) / 2 + 4);
      const nextY = anchors[i + 1]?.y ?? -Infinity;
      const bottom = Math.max(nextY + 9, a.y - 17);
      const band = rows.filter((r) => r.y <= top && r.y > bottom);
      // Title: text right of the code, left of the department column.
      const titleParts = [];
      for (const r of band) {
        if (r.items.some((it) => /^Total$/.test(it.s))) continue;
        for (const it of r.items) {
          if (it.x > a.x + 20 && it.x < titleRight && !CODE.test(it.s)) {
            if (/^(TD|PSB)\b|^(Any Department|department|NSS coordinator|Director|Yoga Teacher)$/i.test(it.s)) continue;
            titleParts.push(it.s);
          }
        }
      }
      // Credits: nearest numeric cell in the rightmost column.
      let credits = null;
      let best = Infinity;
      for (const r of rows) {
        for (const it of r.items) {
          if (it.x >= creditX && /^\d{1,2}$/.test(it.s) && r.y > nextY - 2) {
            const d = Math.abs(r.y - a.y);
            if (d < best && d <= 14) {
              best = d;
              credits = Number(it.s);
            }
          }
        }
      }
      // Type: short upper-case token left of the code.
      let type = null;
      for (const r of band) {
        for (const it of r.items) {
          const t = it.s.replace(/[/]$/, "");
          if (it.x < a.x && TYPES.has(t.toUpperCase())) type ??= t.toUpperCase();
        }
      }
      const sem = semester ?? defaultSemesters[semIdx] ?? null;
      if (/x$/.test(a.code) && sem) groupSemester.set(groupKey(a.code), { sem, code: a.code });
      courses.push({
        semester: sem,
        code: a.code,
        title: clean(titleParts.join(" ")),
        credits,
        type,
        elective: false,
        group: /x$/.test(a.code) ? a.code : null,
        page,
      });
    }

    // Elective option lists: code in the left margin (or mid-row), title after it.
    for (const r of rows) {
      const its = r.items;
      for (let k = 0; k < its.length; k++) {
        const it = its[k];
        if (!CODE.test(it.s) || /x$/.test(it.s)) continue;
        if (anchors.some((a) => a.code === it.s && Math.abs(a.y - r.y) < 1)) continue;
        const parts = [];
        for (let j = k + 1; j < its.length && !CODE.test(its[j].s); j++) parts.push(its[j].s);
        pendingElectives.push({ code: it.s, title: clean(parts.join(" ")), page });
      }
    }
  }

  // Attach elective options to their group's semester, e.g. BCS306A -> BCS306x.
  const seen = new Set();
  for (const e of pendingElectives) {
    if (seen.has(e.code)) continue;
    if (!e.title || /BOS will publish|^-+$/i.test(e.title)) continue;
    seen.add(e.code);
    const g = groupSemester.get(groupKey(e.code));
    const parent = g ? courses.find((c) => c.code === g.code) : undefined;
    courses.push({
      semester: g?.sem ?? null,
      code: e.code,
      title: e.title,
      credits: parent?.credits ?? null,
      type: parent?.type ?? null,
      elective: true,
      group: g?.code ?? null,
      page: e.page,
    });
  }
  return courses;
}
