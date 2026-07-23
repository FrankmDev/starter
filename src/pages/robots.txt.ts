import type { APIRoute } from "astro";
import { projectConfig } from "../../project.config";

export const GET: APIRoute = ({ site }) => {
  const isPublished =
    projectConfig.initialized &&
    projectConfig.site.url.length > 0 &&
    site !== undefined;
  const lines = ["User-agent: *", isPublished ? "Allow: /" : "Disallow: /"];

  if (isPublished) {
    lines.push("", `Sitemap: ${new URL("/sitemap-index.xml", site).href}`);
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
