import {
  projectConfig,
  type ProjectNavigationItem,
} from "../../project.config";

export const primaryNavigation: readonly ProjectNavigationItem[] =
  projectConfig.navigation.primary;
export const navigationCta: ProjectNavigationItem | null =
  projectConfig.navigation.cta;
export const footerNavigation: readonly ProjectNavigationItem[] =
  projectConfig.navigation.footer;
