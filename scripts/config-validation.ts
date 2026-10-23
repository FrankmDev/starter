import type { ProjectConfig } from "../project.config";

// Validate only when publishing. An untouched template must remain buildable.
export function validateProjectConfig(config: ProjectConfig): string[] {
  if (!config.initialized) return [];
  const errors: string[] = [];
  const { site, seo, navigation } = config;

  if (!site.name.trim()) errors.push("site.name is required");
  if (!site.company.trim()) errors.push("site.company is required");
  if (!site.url.trim()) errors.push("site.url is required");
  if (!site.language.trim()) errors.push("site.language is required");
  if (!site.locale.trim()) errors.push("site.locale is required");
  if (!seo.defaultTitle.trim()) errors.push("seo.defaultTitle is required");
  if (!seo.defaultDescription.trim()) errors.push("seo.defaultDescription is required");

  if (site.url.trim()) {
    try {
      const url = new URL(site.url);
      const host = url.hostname.toLowerCase();
      const reserved =
        /(^|\.)example\.(com|org|net)$/.test(host) ||
        host === "localhost" ||
        host.endsWith(".localhost") ||
        host.endsWith(".test") ||
        host.endsWith(".invalid") ||
        host.endsWith(".example");
      if (url.protocol !== "https:") errors.push("site.url must use https");
      if (reserved) errors.push("site.url must use a production domain");
      if (url.username || url.password) errors.push("site.url must not contain credentials");
      if (url.port) errors.push("site.url must not contain a custom port");
      if (url.pathname !== "/" || url.search || url.hash) {
        errors.push("site.url must be an origin without path, query, or hash");
      }
    } catch {
      errors.push("site.url must be a valid absolute URL");
    }
  }

  if (seo.defaultImage.trim()) {
    const image = seo.defaultImage.trim();
    if (!image.startsWith("/") || image.startsWith("//")) {
      try {
        if (new URL(image).protocol !== "https:") {
          errors.push("seo.defaultImage must be https or root-relative");
        }
      } catch {
        errors.push("seo.defaultImage must be https or root-relative");
      }
    }
  }

  const links = [
    ...navigation.primary,
    ...(navigation.cta ? [navigation.cta] : []),
    ...navigation.footer,
  ];
  links.forEach((link, index) => {
    if (!link.label.trim()) errors.push("navigation link " + (index + 1) + " needs a label");
    if (!/^(\/(?!\/)|#|https:\/\/|mailto:|tel:)/.test(link.href) || /\s/.test(link.href)) {
      errors.push("navigation link " + (index + 1) + " has an invalid href");
    }
  });

  return errors;
}
