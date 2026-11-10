import path from "node:path";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://vtuhub.site",
  output: "static",
  trailingSlash: "never",
  compressHTML: true,
  // "file" emits /vtu/cse.html (not /vtu/cse/index.html) so Cloudflare serves
  // /vtu/cse with a 200 instead of a 307 redirect to /vtu/cse/. That keeps the
  // served URL identical to the canonical and sitemap URLs (trailingSlash: "never").
  build: { inlineStylesheets: "auto", format: "file" },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/search"),
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { "@": path.join(root, "src") },
    },
  },
});
