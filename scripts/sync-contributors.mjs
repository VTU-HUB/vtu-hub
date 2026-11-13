/**
 * Writes src/data/contributors.json from the full git history. The site reads git
 * directly at build time; this snapshot is only used when the build runs on a shallow
 * clone, so contributor pages never vanish. Emails are never written.
 */
import { writeFileSync } from "node:fs";
import { contributorsFromGit } from "../src/lib/contributors.ts";

const list = contributorsFromGit();
if (!list) {
  console.error("No full git history here (shallow clone or no git); snapshot left unchanged.");
  process.exit(1);
}
const out = new URL("../src/data/contributors.json", import.meta.url);
writeFileSync(out, `${JSON.stringify(list, null, 2)}\n`);
console.log(`Wrote ${list.length} contributor(s) to src/data/contributors.json`);
