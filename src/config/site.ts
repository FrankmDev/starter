import { projectConfig } from "../../project.config";

const fallbackName = projectConfig.identity.projectName || "New project";
const fallbackDomain = projectConfig.identity.domain || "https://example.com";

export const siteConfig = {
  name: fallbackName,
  domain: fallbackDomain,
  language: projectConfig.identity.language,
  locale: projectConfig.identity.locale,
  direction: projectConfig.identity.direction,
  description:
    projectConfig.business.summary ||
    projectConfig.business.primaryGoal ||
    "Project foundation awaiting its final content and visual system.",
} as const;
