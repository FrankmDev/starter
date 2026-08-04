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
  image: {
    responsiveStyles: true,
  },
  markdown: {
    syntaxHighlight: false,
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
