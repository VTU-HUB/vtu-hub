import type { APIRoute } from "astro";
import { searchIndex } from "@/data/search-index";

/** Compact search index, fetched by /search on demand instead of bundled into its script. */
export const GET: APIRoute = () =>
  new Response(JSON.stringify(searchIndex), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
