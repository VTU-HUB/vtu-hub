import { llmsResponse } from "@/lib/llms";

export const prerender = true;

/** Every subject and update; /llms.txt is the short index. */
export function GET() {
  return llmsResponse(true);
}
