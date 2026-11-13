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

/** Codes and slot codes, including joint ones like "BTX/ST714x" that CODE does not match. */
const SLOT_LIKE = /^B[A-Z]{1,5}(\/[A-Z]{1,5})?\d{3}[A-Za-z]?\/?$/;
/** Headings above the elective option lists. */
const HEADING = /^((Professional|Open) Elective Courses?|Ability Enhancement Course|Skill (Enhancement|Development) Course|Engineering Science Course)\b/i;
/** The abbreviation legend under each table: items like ": Professional Core Course,". */
const isLegend = (row) => row.items.some((it) => /^:\s*\S/.test(it.s));

/**
 * Joins title pieces. Pieces that touch on the same line are one word pdfjs split
 * ("A" + "erodynamics", "M" + "aterials"); a real gap is a space ("R programming").
 */
function joinParts(parts) {
  let out = "";
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const q = parts[i - 1];
    // Touching alone is not enough: some PDFs keep the space inside the piece
    // ("Basic Electronics" + "for"). Join only a lone capital ("A" + "erodynamics") or a
    // one- or two-letter tail that is not a word ("Machine" + "ry", "Microcontroller" + "s").
    const split = q && (/^[A-Z]$/.test(q.s) || (/^[a-z]{1,2}$/.test(p.s) && !/^(of|to|in|on|at|by|as|or|an|is|it|be)$/.test(p.s)));
    const touching = split && Math.abs(q.y - p.y) < 1 && q.w > 0 && p.x - (q.x + q.w) < 0.8 && /[A-Za-z]$/.test(q.s) && /^[a-z]/.test(p.s);
    out += (i === 0 ? "" : touching ? "" : " ") + p.s;
  }
  return out;
}

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

/**
 * Joins a code pdfjs split into pieces on one row, e.g. "B" "AU" "755C" -> "BAU755C"
 * (automobile scheme, page 5), "B" "E" "C" "613D" (6ecesch.pdf) or even
 * "B" "AU" "5" "15" "B" (BAU515B) and "B" "ESC" "K" "1" "0" "4" "C" (cvsch.pdf p9).
 * Longest first, so the option letter is never left behind. Only pieces a few points apart are joined, and only when
 * the result is a valid code, so ordinary words are never merged.
 */
function joinSplitCodes(items) {
  const out = [];
  for (let i = 0; i < items.length; i++) {
    let joined = null;
    for (let n = 8; n >= 2 && !joined; n--) {
      const parts = items.slice(i, i + n);
      if (parts.length < n || !/^B/.test(parts[0].s)) continue;
      const close = parts.every((p, k) => k === 0 || p.x - (parts[k - 1].x + (parts[k - 1].w || 0)) < 6);
      const s = parts.map((p) => p.s).join("");
      if (close && CODE.test(s)) joined = { ...parts[0], s, n };
    }
    // "BESCK104" then "C" a little further right: the option letter of BESCK104C.
    const next = items[i + 1];
    if (!joined && next && /^B[A-Z]{2,5}\d{3}$/.test(items[i].s) && /^[A-Z]$/.test(next.s) && next.x - (items[i].x + (items[i].w || 0)) < 12) {
      joined = { ...items[i], s: items[i].s + next.s, n: 2 };
    }
    if (joined) {
      out.push(joined);
      i += joined.n - 1;
    } else out.push(items[i]);
  }
  return out;
}

function flatten(rows) {
  const out = [];
  for (const r of rows) {
    const items = [];
    for (const it of joinSplitCodes(r.items)) {
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
    // Right edge of the title column: the "TD:" / department column (a header label or a
    // "TD: BT" cell in each row). Labels below the table do not count: the footnote legend
    // at the foot of csesch.pdf page 1 has "TD/PSB" at the titles' own x, which used to cut
    // every title on that page to "" (that is how BPOPS103 was dropped).
    const lastRowY = anchors.length ? Math.min(...anchors.map((a) => a.y)) : -Infinity;
    const tdXs = rows
      .filter((r) => r.y >= lastRowY - 20)
      .flatMap((r) => r.items)
      // "TD/PSB", "TD:" or, in the automobile/mechanical PDFs, "Department (TD)".
      .filter((it) => /^(TD\b|TD:|TD\s*\/)|\(TD\)/.test(it.s))
      .map((it) => it.x);
    const titleRight = (tdXs.length ? Math.min(...tdXs) : maxX * 0.45) - 8;
    anchors.sort((a, b) => b.y - a.y);

    // Credits column = rightmost numeric column on the page.
    const creditX = maxX * 0.9;

    for (let i = 0; i < anchors.length; i++) {
      const a = anchors[i];
      // Two codes printed on one row (BAU803 over BAU883: the same internship) share a
      // band, so measure against the nearest anchor on a different row.
      const prev = anchors.slice(0, i).reverse().find((o) => Math.abs(o.y - a.y) > 1);
      const next = anchors.slice(i + 1).find((o) => Math.abs(o.y - a.y) > 1);
      const top = prev ? Math.min(a.y + 9, (prev.y + a.y) / 2 + 4) : a.y + 9;
      const nextY = next?.y ?? -Infinity;
      const bottom = Math.max(nextY + 9, a.y - 17);
      const band = rows.filter((r) => r.y <= top && r.y > bottom);
      // Title: text right of the code, left of the department column.
      const titleParts = [];
      for (const r of band) {
        if (r.items.some((it) => /^Total$/.test(it.s))) continue;
        // The abbreviation legend under the table ("PCCL : Professional Core Course…").
        if (isLegend(r)) continue;
        // The next section's centred heading below this row ("Open Elective Course"). Only
        // below: a slot's own wrapped title can sit above its code ("Ability Enhancement…").
        if (r.y < a.y - 6 && HEADING.test(r.items.map((x) => x.s).join(" ").trim())) continue;
        // A row that holds another course or slot code ("BTX/ST714x") is the next row.
        if (r.y < a.y - 1 && r.items.some((it) => it.s !== a.code && SLOT_LIKE.test(it.s))) continue;
        for (const it of r.items) {
          if (it.x > a.x + 20 && it.x < titleRight && !CODE.test(it.s)) {
            // Department cells. "Textile/ Silk" sits left of its centred "Department (TD)"
            // label in textsch.pdf/silksch.pdf, so the column edge alone does not exclude it.
            if (/^(TD|PSB)\b|^(Any Department|department|NSS coordinator|Director|Yoga Teacher|Textile\/ ?Silk)$/i.test(it.s)) continue;
            titleParts.push({ ...it, y: r.y });
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
      // "Either-or" courses (BENGK106 OR BPWSK106, Kannada OR Constitution, …) share one
      // merged credits cell, printed on the serial-number row between them and up to
      // ~21 pt from each course row. Use that row only when it carries a serial number
      // in the Sl. column and no course row sits on it (so it is not another course's).
      if (credits == null) {
        const minAnchorX = Math.min(...anchors.map((x) => x.x));
        best = Infinity;
        for (const r of rows) {
          const d = Math.abs(r.y - a.y);
          if (d > 24 || d >= best) continue;
          const serial = r.items.some((it) => it.x < minAnchorX - 30 && /^\d{1,2}$/.test(it.s));
          const cell = r.items.find((it) => it.x >= creditX && /^\d{1,2}$/.test(it.s));
          const owned = anchors.some((o) => Math.abs(o.y - r.y) <= 6);
          if (serial && cell && !owned) {
            best = d;
            credits = Number(cell.s);
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
      // Record every slot, even when no semester heading was found (first-year PDFs), so
      // its options can inherit credits. Exact prefix ("BPLCK105") first: "105" alone is
      // shared by the ETC and PLC slots of the same semester.
      if (/x$/.test(a.code)) {
        groupSemester.set(a.code.slice(0, -1), { sem, code: a.code });
        if (!groupSemester.has(groupKey(a.code))) groupSemester.set(groupKey(a.code), { sem, code: a.code });
      }
      courses.push({
        semester: sem,
        code: a.code,
        title: clean(joinParts(titleParts)),
        credits,
        type,
        elective: false,
        group: /x$/.test(a.code) ? a.code : null,
        page,
      });
    }

    // Elective option lists: code in the left margin (or mid-row), title after it.
    for (let ri = 0; ri < rows.length; ri++) {
      const r = rows[ri];
      const its = r.items;
      for (let k = 0; k < its.length; k++) {
        const it = its[k];
        if (!CODE.test(it.s) || /x$/.test(it.s)) continue;
        if (anchors.some((a) => a.code === it.s && Math.abs(a.y - r.y) < 1)) continue;
        const parts = [];
        let j = k + 1;
        for (; j < its.length && !CODE.test(its[j].s); j++) parts.push({ ...its[j], y: r.y });
        // A long option title wraps onto the next line, under its own column
        // ("…Compliance and" / "Governance", "(Available in" / "NPTEL)").
        const below = rows[ri + 1];
        const left = its[k + 1]?.x ?? it.x;
        const right = j < its.length ? its[j].x : Infinity;
        // A wrapped line starts at the title's own left edge; section headings ("Open
        // Elective Course") are centred and never line up with it.
        if (parts.length && below && r.y - below.y < 13 && !isLegend(below) && !below.items.some((b) => CODE.test(b.s))) {
          const start = below.items.findIndex((b) => Math.abs(b.x - left) <= 8);
          // …and nothing sits left of it in that column ("Ability Enhancement Course – III":
          // the heading's "– III" lines up by chance, but the heading starts further left).
          const clear = below.items.every((b) => b.x >= left - 8);
          if (start >= 0 && clear) for (const b of below.items.slice(start)) if (b.x < right) parts.push({ ...b, y: below.y });
        }
        pendingElectives.push({ code: it.s, title: clean(joinParts(parts)), page });
      }
    }
  }

  // Attach elective options to their group's semester, e.g. BCS306A -> BCS306x.
  const seen = new Set();
  for (const e of pendingElectives) {
    if (seen.has(e.code)) continue;
    if (!e.title || /BOS will publish|^-+$/i.test(e.title)) continue;
    seen.add(e.code);
    const g = groupSemester.get(e.code.slice(0, -1)) ?? groupSemester.get(groupKey(e.code));
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
