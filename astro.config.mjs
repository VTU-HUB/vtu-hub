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
  build: { inlineStylesheets: "auto" },
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
