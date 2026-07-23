export type ProjectPath = `/${string}`;
export type ProjectNavigationHref =
  | ProjectPath
  | `#${string}`
  | `https://${string}`
  | `mailto:${string}`
  | `tel:${string}`;

export interface ProjectPage {
  name: string;
  path: ProjectPath;
  routeFile: `src/pages/${string}`;
  planFile: `docs/project/pages/${string}.md`;
  purpose: string;
  conversion: string;
  sections: string[];
}

export interface ProjectNavigationItem {
  label: string;
  href: ProjectNavigationHref;
}

export interface ProjectConfig {
  meta: {
    starterVersion: string;
    initialized: boolean;
    initializedAt: string | null;
  };
  identity: {
    projectName: string;
    companyName: string;
    domain: string;
    language: string;
    locale: string;
    direction: "ltr" | "rtl";
  };
  appearance: {
    colorScheme: "light" | "dark" | "light dark";
  };
  business: {
    sector: string;
    summary: string;
    audience: string;
    primaryGoal: string;
    primaryConversion: string;
    services: string[];
    differentiators: string[];
  };
  design: {
    summary: string;
    referenceFiles: string[];
    layoutDirection: string;
    typographyDirection: string;
    colorDirection: string;
    imageDirection: string;
    motionDirection: string;
    avoid: string[];
  };
  content: {
    availableSources: string[];
    voice: string;
    keyMessages: string[];
    prohibitedClaims: string[];
    ui: {
      skipToContent: string;
      foundationStatus: string;
      foundationDescription: string;
      notFoundTitle: string;
      notFoundDescription: string;
      returnHome: string;
    };
  };
  pages: ProjectPage[];
  navigation: {
    primary: ProjectNavigationItem[];
    cta: ProjectNavigationItem | null;
    footer: ProjectNavigationItem[];
  };
  functionality: {
    required: string[];
    integrations: string[];
  };
  constraints: {
    legal: string[];
    technical: string[];
    accessibility: string[];
    performance: string[];
    nonGoals: string[];
  };
}

export const projectConfig = {
  meta: {
    starterVersion: "2.1.0",
    initialized: false,
    initializedAt: null,
  },
  identity: {
    projectName: "",
    companyName: "",
    domain: "",
    language: "es",
    locale: "es-ES",
    direction: "ltr",
  },
  appearance: {
    colorScheme: "light",
  },
  business: {
    sector: "",
    summary: "",
    audience: "",
    primaryGoal: "",
    primaryConversion: "",
    services: [],
    differentiators: [],
  },
  design: {
    summary: "",
    referenceFiles: [],
    layoutDirection: "",
    typographyDirection: "",
    colorDirection: "",
    imageDirection: "",
    motionDirection: "",
    avoid: [],
  },
  content: {
    availableSources: [],
    voice: "",
    keyMessages: [],
    prohibitedClaims: [],
    ui: {
      skipToContent: "",
      foundationStatus: "",
      foundationDescription: "",
      notFoundTitle: "",
      notFoundDescription: "",
      returnHome: "",
    },
  },
  pages: [
    {
      name: "Home",
      path: "/",
      routeFile: "src/pages/index.astro",
      planFile: "docs/project/pages/home.md",
      purpose: "",
      conversion: "",
      sections: [],
    },
  ],
  navigation: {
    primary: [],
    cta: null,
    footer: [],
  },
  functionality: {
    required: [],
    integrations: [],
  },
  constraints: {
    legal: [],
    technical: [],
    accessibility: [],
    performance: [],
    nonGoals: [],
  },
} satisfies ProjectConfig;
