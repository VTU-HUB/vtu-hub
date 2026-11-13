import { execFileSync } from "node:child_process";

export const prerender = true;

/** Public build identity so a smoke test can tell whether production matches `main`. */
export function GET() {
  let sha = "";
  try {
    sha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    sha = "";
  }
  const body = JSON.stringify({
    sha,
    repo: "VTU-HUB/vtu-hub",
    site: "https://vtuhub.site",
  });
  return new Response(body, { headers: { "Content-Type": "application/json; charset=utf-8" } });
}
