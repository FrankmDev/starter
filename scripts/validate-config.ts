import { projectConfig } from "../project.config";

if (projectConfig.initialized) {
  const errors: string[] = [];
  const { site, seo } = projectConfig;

  if (!site.name.trim()) errors.push("site.name is required");
  if (!site.company.trim()) errors.push("site.company is required");
  if (!site.url.trim()) errors.push("site.url is required");
  if (!site.language.trim()) errors.push("site.language is required");
  if (!site.locale.trim()) errors.push("site.locale is required");
  if (!seo.defaultTitle.trim()) errors.push("seo.defaultTitle is required");
  if (!seo.defaultDescription.trim()) {
    errors.push("seo.defaultDescription is required");
  }

  if (site.url.trim()) {
    try {
      const url = new URL(site.url);
      const isHttp = url.protocol === "https:" || url.protocol === "http:";
      const isPlaceholder =
        url.hostname === "example.com" || url.hostname.endsWith(".example.com");
      const hasPath = url.pathname !== "/" || url.search || url.hash;

      if (!isHttp) errors.push("site.url must use http or https");
      if (isPlaceholder) errors.push("site.url must not use example.com");
      if (hasPath) {
        errors.push("site.url must be an origin without path, query, or hash");
      }
    } catch {
      errors.push("site.url must be a valid absolute URL");
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid project configuration:\n- ${errors.join("\n- ")}`);
  }
}
