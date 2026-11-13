#!/usr/bin/env node
/**
 * Hits production and checks that the live HTML matches the current academic copy.
 * Optional: SMOKE_SHA=<full git sha> requires /version.json to match (post-deploy).
 */
const SITE = process.env.SMOKE_SITE ?? "https://vtuhub.site";

async function get(path) {
  const res = await fetch(`${SITE}${path}`, { headers: { "Cache-Control": "no-cache" }, redirect: "follow" });
  const text = await res.text();
  return { status: res.status, text };
}

const fail = [];
const { status: cgpaStatus, text: cgpa } = await get("/tools/cgpa");
if (cgpaStatus !== 200) fail.push(`CGPA page HTTP ${cgpaStatus}`);
if (cgpa.includes("0.75") && cgpa.includes("10")) fail.push("CGPA page still has (CGPA − 0.75) × 10");
if (!/22OB 6\.7/.test(cgpa)) fail.push("CGPA page missing 22OB 6.7");
const { status: faqStatus, text: faq } = await get("/faq");
if (faqStatus !== 200) fail.push(`FAQ HTTP ${faqStatus}`);
if (/opening a semester first/i.test(faq)) fail.push("FAQ still describes semester-first browsing");
const { status: covStatus } = await get("/coverage");
if (covStatus !== 200) fail.push(`/coverage HTTP ${covStatus}`);
const { status: s25 } = await get("/schemes/2025");
if (s25 !== 200) fail.push(`/schemes/2025 HTTP ${s25}`);
const { status: verStatus, text: ver } = await get("/version.json");
if (verStatus !== 200) fail.push(`/version.json HTTP ${verStatus}`);
else {
  try {
    const j = JSON.parse(ver);
    const expect = process.env.SMOKE_SHA;
    if (expect && j.sha && j.sha !== expect) fail.push(`live sha ${j.sha} !== ${expect}`);
    console.log(`live version ${j.sha || "(empty)"}`);
  } catch {
    fail.push("/version.json is not JSON");
  }
}
if (fail.length) {
  console.error(fail.join("\n"));
  process.exit(1);
}
console.log(`smoke ok against ${SITE}`);
