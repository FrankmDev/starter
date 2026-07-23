import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { projectConfig } from "./project.config";

const hasPublishedSite =
  projectConfig.initialized && projectConfig.site.url.length > 0;

export default defineConfig({
  ...(hasPublishedSite
    ? {
        site: projectConfig.site.url,
        integrations: [sitemap()],
      }
    : {}),
  compressHTML: true,
  markdown: {
    syntaxHighlight: false,
  },
  security: {
    csp: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
