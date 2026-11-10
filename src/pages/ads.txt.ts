import type { APIRoute } from "astro";
import { adsConfig } from "@/data/ads";

/**
 * Authorized Digital Sellers file. AdSense checks it before serving ads at full fill.
 * Generated from the publisher id in src/data/ads.ts ("ca-pub-123…" → "pub-123…").
 * Empty until that id is set, which is valid and harmless.
 */
export const GET: APIRoute = () => {
  const pub = adsConfig.clientId.replace(/^ca-/, "");
  const body = pub ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n` : "";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
