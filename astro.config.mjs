import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { projectConfig } from "./project.config";

const site = projectConfig.identity.domain || "https://example.com";

export default defineConfig({
  site,
  output: "static",
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
