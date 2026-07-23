export type ProjectPath = `/${string}`;
export type ProjectNavigationHref =
  | ProjectPath
  | `#${string}`
  | `https://${string}`
  | `mailto:${string}`
  | `tel:${string}`;

export interface ProjectNavigationItem {
  label: string;
  href: ProjectNavigationHref;
}

export interface ProjectConfig {
  initialized: boolean;
  site: {
    name: string;
    company: string;
    url: string;
    language: string;
    locale: string;
    direction: "ltr" | "rtl";
    colorScheme: "light" | "dark" | "light dark";
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultImage: string;
  };
  navigation: {
    primary: ProjectNavigationItem[];
    cta: ProjectNavigationItem | null;
    footer: ProjectNavigationItem[];
  };
  ui: {
    skipToContent: string;
    notFoundTitle: string;
    notFoundDescription: string;
    returnHome: string;
  };
}

export const projectConfig = {
  initialized: false,
  site: {
    name: "",
    company: "",
    url: "",
    language: "es",
    locale: "es-ES",
    direction: "ltr",
    colorScheme: "light",
  },
  seo: {
    defaultTitle: "",
    defaultDescription: "",
    defaultImage: "",
  },
  navigation: {
    primary: [],
    cta: null,
    footer: [],
  },
  ui: {
    skipToContent: "Saltar al contenido",
    notFoundTitle: "Página no encontrada",
    notFoundDescription:
      "La página solicitada no existe o ha cambiado de dirección.",
    returnHome: "Volver al inicio",
  },
} satisfies ProjectConfig;
