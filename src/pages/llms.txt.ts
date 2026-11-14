import { llmsResponse } from "@/lib/llms";

export const prerender = true;

/** Short index; the full catalogue is /llms-full.txt. */
export function GET() {
  return llmsResponse(false);
}
