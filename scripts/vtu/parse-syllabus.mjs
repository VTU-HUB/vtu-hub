// Parses a VTU 2022-scheme syllabus PDF (one or many courses) into, per course code:
// five module topic summaries and the course outcomes, exactly as VTU prints them.
import { pdfRows } from "./pdf-rows.mjs";

const CODE_LINE = /Course\s*Code\s*:?\s*(B[A-Z]{2,5}\d{3}[A-Z]?)\b/i;
const MODULE_LINE = /^\s*(?:MODULE|Module)\s*[-–:.]?\s*([1-5]|I{1,3}|IV|V)\b\s*[:\-–.]?\s*(.*)$/;
const ROMAN = { I: 1, II: 2, III: 3, IV: 4, V: 5 };
const STOP = /^(Course\s*outcomes?|Course\s*Outcome|Suggested\s+Learning|PRACTICAL\s+COMPONENT|Assessment\s+Details|Teaching-?Learning|Activity\s+Based|Web\s+links|Textbooks?\b|Text\s+Books?\b|Reference\s+Books?\b|Program\s+Outcome|Sl\.?\s*NO)/i;
const NOISE = /^(Text\s*Book|Reference\s*Book|Textbook|Chapter\s*[-\d]|RBT|Teaching\s+Hours|\d+\s*(Hours?|Hrs?)\.?$|Pedagogy|Chalk\s+and\s+Talk|\d{1,3}$|[\d.\s]+$)/i;

// Template stamps VTU's PDFs repeat on every page.
const STAMPS = [
  /MKV-?TEMPLATE[^)]*\)?/gi,
  /\bIPCC\s*\(\d{2}\.\d{2}\.\d{4}\)/gi,
  /\bAnnexure-?\s*[IVX]+\b(\s+\d+\b)?/gi,
  /@#\s*\d+\s*\d*/g,
  /\bNo\.?\s*of\s*Hours\s*:?\s*\d+/gi,
  /\b\d{2}\.\d{2}\.\d{4}\b/g,
];
const unstamp = (s) => STAMPS.reduce((t, re) => t.replace(re, " "), s);

// Course outcomes start with an action verb ("Explain…", "Apply…").
const OUTCOME_VERB =
  /^(Explain|Apply|Analy[sz]e|Design|Develop|Demonstrate|Use|Utili[sz]e|Compare|Identify|Describe|Illustrate|Implement|Solve|Understand|Evaluate|Construct|Make|Interpret|Create|Communicate|Build|Determine|Discuss|Model|Summari[sz]e|Classify|Calculate|Compute|Estimate|Examine|Formulate|Outline|Recogni[sz]e|Infer|Choose|Select|Perform|Conduct|Comprehend|Gain|Acquire|Learn|Know|Plan|Write|Test|Simulate|Measure|Investigate|Assess|Distinguish|Define|Relate|Adapt|Appreciate|Inculcate|Realize|Realise|Practice|Practise|Present|Prepare|Program|Familiari[sz]e|Visuali[sz]e|Derive|Recall|State|Elucidate|Differentiate|Characteri[sz]e|Predict|Verify|Validate|Install|Configure|Deploy|Manage|Operate)\b/;

const tidy = (s) =>
  unstamp(s)
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:)])/g, "$1")
    .replace(/\(\s+/g, "(")
    .replace(/\b\d+\s*(Hours?|Hrs?)\b\.?/gi, "")
    .trim();

function titleCase(s) {
  return s
    .toLowerCase()
    .replace(/\b([a-z])/g, (m) => m.toUpperCase())
    .replace(/\b(And|Of|The|In|For|To|With|On|An|A|Using)\b/g, (m) => m.toLowerCase())
    .replace(/^./, (m) => m.toUpperCase());
}

/** Short heading for a module: an explicit "Module-1: Title", else its first CAPS phrase. */
function moduleTitle(inline, body) {
  const explicit = tidy(inline).replace(/^[:\-–.\s]+/, "").replace(/\s*\(?\d+\s*(Hours?|Hrs?)\)?\s*$/i, "");
  if (explicit && explicit.length > 3 && !/^\d|^(Hours?|Hrs?)\b/i.test(explicit)) return explicit.slice(0, 90);
  const caps = /^([A-Z][A-Z0-9 &/,()'.-]{2,80}?)\s*:/.exec(body);
  if (caps && caps[1] === caps[1].toUpperCase())
    return titleCase(caps[1].replace(/\s*\(cont[d.]*\)?\.*$/i, "").trim()).replace(/\bSql\b/, "SQL");
  const head = /^([^:]{3,80}):/.exec(body);
  if (head) return head[1].trim();
  const first = body.split(/[.;]/)[0];
  return first.length <= 80 ? first : `${first.slice(0, 77).replace(/\s+\S*$/, "")}…`;
}

/** "1. Author, Title, Edition, Publisher, Year." entries from a textbook/reference list. */
function bookEntries(lines) {
  const out = [];
  for (const raw of lines) {
    const line = tidy(raw);
    const m = /^(?:\d+[.)]|•|-)\s*(.{12,})$/.exec(line);
    if (m) out.push(m[1]);
    else if (out.length && line && !/^(Web|Activity|Text|Reference|Suggested)/i.test(line) && line.length < 160)
      out[out.length - 1] += ` ${line}`;
  }
  return out
    .map((b) => b.replace(/\s+/g, " ").trim())
    .filter((b) => /[A-Za-z]{3}/.test(b) && b.length < 260 && !/https?:/.test(b))
    .slice(0, 5);
}

function summarise(text, max = 420) {
  const t = tidy(text);
  if (t.length <= max) return t;
  return `${t.slice(0, max).replace(/\s+\S*$/, "").replace(/[,;:]$/, "")}…`;
}

/**
 * @returns {Promise<Map<string, {modules:{number:number,title:string,topics:string}[], outcomes:string[],
 *   textbooks:string[], references:string[], links:string[]}>>}
 */
export async function parseSyllabus(file) {
  const pages = await pdfRows(file);
  const lines = [];
  for (const { rows } of pages) for (const r of rows) lines.push(r.items.map((i) => i.s).join(" "));

  const result = new Map();
  let i = 0;
  while (i < lines.length) {
    const m = CODE_LINE.exec(lines[i]);
    if (!m) {
      i++;
      continue;
    }
    const code = m[1].toUpperCase();
    let end = i + 1;
    while (end < lines.length && !CODE_LINE.test(lines[end])) end++;
    const block = lines.slice(i + 1, end);
    i = end;

    const modules = [];
    let cur = null;
    let stopped = false;
    const outcomes = [];
    let inOutcomes = false;
    // Book and web-link sections, collected independently of the module walk.
    const texts = [];
    const refs = [];
    const links = new Set();
    let section = null;
    for (const raw of block) {
      const line = unstamp(raw).trim();
      if (/^(Text\s*Books?|Textbooks?)\b/i.test(line)) section = "text";
      else if (/^Reference\s*Books?\b/i.test(line)) section = "ref";
      else if (/^Web\s*links?/i.test(line)) section = "web";
      else if (/^(Activity\s+Based|Teaching-?Learning|Assessment|Course\s*outcome|Program\s*Outcome|PRACTICAL)/i.test(line)) section = null;
      else if (section === "text") texts.push(line);
      else if (section === "ref") refs.push(line);
      for (const u of line.matchAll(/https?:\/\/[^\s<>"')]+/g)) {
        const url = u[0].replace(/[.,;]+$/, "");
        // Links split across a line break in the PDF are unusable — drop them.
        if (/[-_=?&/]$/.test(url) || /youtube\.com\/watch\?v=(?![\w-]{11}\b)/.test(url)) continue;
        if (section === "web" || /nptel|swayam|youtube|youtu\.be|coursera|edx|geeksforgeeks|w3schools|tutorialspoint|ocw\.mit/i.test(url)) links.add(url);
      }
    }
    for (const raw of block) {
      const line = unstamp(raw).trim();
      const mm = MODULE_LINE.exec(line);
      if (mm && line.length < 140) {
        if (cur) modules.push(cur);
        const n = ROMAN[mm[1]] ?? Number(mm[1]);
        cur = { number: n, inline: mm[2] ?? "", body: [] };
        stopped = false;
        inOutcomes = false;
        continue;
      }
      if (/^Course\s*outcomes?/i.test(line)) {
        if (cur) modules.push(cur);
        cur = null;
        inOutcomes = true;
        continue;
      }
      if (inOutcomes) {
        const co = /^(?:CO\s*-?\s*\d+[.:)]?|\d+[.)]|•|-)?\s*(.{8,})$/.exec(line);
        const text = co ? tidy(co[1]) : "";
        const teachingNote = /video|animation|lecture|teaching|chalk|\bmarks?\b|experiment|critical thinking|viva|record/i;
        if (text && OUTCOME_VERB.test(text) && !teachingNote.test(text)) outcomes.push(text);
        else if (outcomes.length && /^[a-z(]/.test(line)) outcomes[outcomes.length - 1] += ` ${tidy(line)}`;
        else if (STOP.test(line) && !/^Course\s*outcome/i.test(line)) inOutcomes = false;
        if (outcomes.length >= 8) inOutcomes = false;
        continue;
      }
      if (!cur || stopped) continue;
      if (STOP.test(line)) {
        stopped = true;
        continue;
      }
      if (NOISE.test(line)) continue;
      cur.body.push(line);
    }
    if (cur) modules.push(cur);

    const clean = [];
    for (const mod of modules) {
      const body = tidy(mod.body.join(" "));
      if (body.length < 20 || clean.some((c) => c.number === mod.number)) continue;
      clean.push({ number: mod.number, title: moduleTitle(mod.inline, body), topics: summarise(body) });
    }
    clean.sort((a, b) => a.number - b.number);
    const prev = result.get(code);
    // A course can appear twice (e.g. an index page and the full syllabus): keep the richer one.
    if (!prev || clean.length > prev.modules.length) {
      result.set(code, {
        modules: clean,
        outcomes: [...new Set(outcomes)].slice(0, 6).map((o) => o.replace(/[.;,]$/, "") + "."),
        textbooks: bookEntries(texts),
        references: bookEntries(refs),
        links: [...links].slice(0, 6),
      });
    }
  }
  return result;
}
