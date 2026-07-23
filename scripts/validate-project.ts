import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";
import { projectConfig, type ProjectNavigationItem } from "../project.config";

interface ReferenceEntry {
  file: string;
  useFor: string[];
  doNotUseFor: string[];
  notes: string;
}

interface PackageJson {
  name?: string;
  version?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

const errors: string[] = [];
const placeholderPatterns = [
  /complete this document/i,
  /template contract/i,
  /\{\{[A-Z0-9_]+\}\}/,
  /\[(?:todo|tbd|fixme)\]/i,
];

const requiredDocumentSections: Record<string, string[]> = {
  "docs/project/PROJECT.md": [
    "Identity",
    "Problem and offer",
    "Audience",
    "Objectives and success",
    "Offer and evidence",
    "Scope",
    "Navigation",
    "Available inputs",
    "Constraints",
    "Explicit non-goals",
    "Open decisions",
  ],
  "docs/project/CONTENT.md": [
    "Source inventory",
    "Audience and language",
    "Voice",
    "Message hierarchy",
    "Claims and evidence",
    "Vocabulary",
    "System interface copy",
    "Page content matrix",
    "Metadata and structured data inputs",
    "Missing content",
  ],
  "docs/project/DESIGN.md": [
    "Visual thesis",
    "Reference analysis",
    "System directions",
    "Composition",
    "Typography",
    "Color and surfaces",
    "Imagery and iconography",
    "Motion and interaction",
    "Global token contract",
    "Responsive transformations",
    "Component and state language",
    "Accessibility",
    "Avoid",
    "Visual definition of done",
  ],
  "docs/project/ARCHITECTURE.md": [
    "Stack and rendering",
    "Decision ledger",
    "Route contracts",
    "Responsibility boundaries",
    "Component map",
    "Data and content flow",
    "Islands and client code",
    "Functionality and integrations",
    "SEO, URLs, and discovery",
    "Images and fonts",
    "Forms and validation",
    "Security and privacy",
    "Dependency ledger",
    "Responsive and performance contracts",
    "Error handling and observability",
  ],
  "docs/project/QA.md": [
    "Required commands",
    "Test environments",
    "Route and state matrix",
    "Viewport matrix",
    "Functional checks",
    "Content checks",
    "Accessibility checks",
    "SEO and discovery checks",
    "Visual and responsive checks",
    "Performance checks",
    "Release gate",
    "Validation record",
  ],
};

const requiredPageSections = [
  "Audience need and decision",
  "Success and non-success",
  "Narrative",
  "Semantic outline",
  "Component and data plan",
  "Interaction and states",
  "Responsive behavior",
  "Media requirements",
  "SEO and discovery",
  "Accessibility",
  "Performance",
  "Implementation scope",
  "Acceptance criteria",
  "Non-goals",
];

function requireText(value: string, label: string): void {
  if (!value.trim()) errors.push(`${label} is required.`);
}

function readRequiredFile(path: string): string {
  if (!existsSync(path)) {
    errors.push(`${path} is missing.`);
    return "";
  }
  return readFileSync(path, "utf8");
}

function assertResolvedDocument(path: string): string {
  const content = readRequiredFile(path);
  if (content && placeholderPatterns.some((pattern) => pattern.test(content))) {
    errors.push(`${path} still contains starter instructions or placeholders.`);
  }
  return content;
}

function sectionBody(content: string, heading: string): string | undefined {
  const lines = content.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start === -1) return undefined;

  const next = lines.findIndex(
    (line, index) => index > start && line.startsWith("## "),
  );
  return lines
    .slice(start + 1, next === -1 ? undefined : next)
    .join("\n")
    .trim();
}

function assertDocumentSections(
  path: string,
  content: string,
  sections: string[],
): void {
  for (const section of sections) {
    const body = sectionBody(content, section);
    if (body === undefined) {
      errors.push(`${path} is missing the required "## ${section}" section.`);
    } else if (body.replaceAll(/\s/g, "").length < 20) {
      errors.push(
        `${path} section "## ${section}" does not contain a usable decision.`,
      );
    }
  }
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function isReferenceEntry(value: unknown): value is ReferenceEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.file === "string" &&
    isStringArray(entry.useFor) &&
    isStringArray(entry.doNotUseFor) &&
    typeof entry.notes === "string"
  );
}

function listMarkdownFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(path);
    return entry.isFile() && extname(entry.name) === ".md" ? [path] : [];
  });
}

function normalizeInternalHref(href: string): string {
  const pathname = new URL(href, "https://example.com").pathname;
  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
}

function validateNavigation(
  items: readonly ProjectNavigationItem[],
  location: string,
  pagePaths: ReadonlySet<string>,
): void {
  const hrefs = new Set<string>();

  for (const [index, item] of items.entries()) {
    requireText(item.label, `${location}[${index}].label`);
    requireText(item.href, `${location}[${index}].href`);

    if (hrefs.has(item.href)) {
      errors.push(`${location} contains the duplicate href "${item.href}".`);
    }
    hrefs.add(item.href);

    if (item.href.startsWith("/")) {
      const route = normalizeInternalHref(item.href);
      if (!pagePaths.has(route)) {
        errors.push(`${location} links to undeclared page "${route}".`);
      }
    }
  }
}

function validateReferences(): void {
  const metadataPath = "references/references.json";
  if (!existsSync(metadataPath)) {
    if (projectConfig.design.referenceFiles.length > 0) {
      errors.push(
        `${metadataPath} is required when design.referenceFiles is not empty.`,
      );
    }
    return;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(metadataPath, "utf8"));
  } catch {
    errors.push(`${metadataPath} must contain valid JSON.`);
    return;
  }

  if (!Array.isArray(parsed) || !parsed.every(isReferenceEntry)) {
    errors.push(
      `${metadataPath} must match references/references.example.json.`,
    );
    return;
  }

  const declared = new Set<string>(projectConfig.design.referenceFiles);
  const described = new Set<string>(parsed.map((entry) => entry.file));

  if (declared.size !== projectConfig.design.referenceFiles.length) {
    errors.push("design.referenceFiles must not contain duplicates.");
  }
  if (described.size !== parsed.length) {
    errors.push(`${metadataPath} must not describe the same file twice.`);
  }

  for (const entry of parsed) {
    if (
      entry.file.startsWith("/") ||
      entry.file.includes("..") ||
      entry.file.startsWith("references/")
    ) {
      errors.push(`${entry.file} must be a safe path relative to references/.`);
      continue;
    }
    if (!existsSync(`references/${entry.file}`)) {
      errors.push(`references/${entry.file} is described but missing.`);
    }
    if (!declared.has(entry.file)) {
      errors.push(
        `${entry.file} is described but absent from design.referenceFiles.`,
      );
    }
    if (entry.useFor.length === 0) {
      errors.push(`${entry.file} must declare at least one useFor purpose.`);
    }
  }

  for (const file of declared) {
    if (!described.has(file)) {
      errors.push(`${file} is declared but absent from ${metadataPath}.`);
    }
  }
}

const coreFiles = [
  "AGENTS.md",
  "PROJECT_START.md",
  "START_HERE.md",
  "astro.config.mjs",
  "package.json",
  "prettier.config.mjs",
  "src/styles/globals.css",
  "src/config/navigation.ts",
  "src/layouts/BaseLayout.astro",
  "src/components/core/SEO.astro",
  "src/components/core/JsonLd.astro",
  "src/components/core/ResponsiveImage.astro",
  "src/components/primitives/Input.astro",
  "src/components/primitives/Textarea.astro",
  "src/components/primitives/Select.astro",
  "tests/core.test.ts",
  "src/pages/index.astro",
  "src/pages/404.astro",
  "src/pages/robots.txt.ts",
  "docs/templates/PROJECT.template.md",
  "docs/templates/CONTENT.template.md",
  "docs/templates/DESIGN.template.md",
  "docs/templates/ARCHITECTURE.template.md",
  "docs/templates/PAGE.template.md",
  "docs/templates/QA.template.md",
];

for (const file of coreFiles) readRequiredFile(file);

for (const [projectDocument, sections] of Object.entries(
  requiredDocumentSections,
)) {
  const fileName = projectDocument.slice(projectDocument.lastIndexOf("/") + 1);
  const templatePath = `docs/templates/${fileName.replace(".md", ".template.md")}`;
  const template = readRequiredFile(templatePath);
  if (template) assertDocumentSections(templatePath, template, sections);
}

const pageTemplate = readRequiredFile("docs/templates/PAGE.template.md");
if (pageTemplate) {
  assertDocumentSections(
    "docs/templates/PAGE.template.md",
    pageTemplate,
    requiredPageSections,
  );
}

const globalStyles = readRequiredFile("src/styles/globals.css");
for (const token of [
  "--color-canvas",
  "--color-surface",
  "--color-ink",
  "--color-muted",
  "--color-border",
  "--color-accent",
  "--color-accent-hover",
  "--color-accent-active",
  "--color-focus",
  "--font-sans",
  "--font-display",
  "--text-display",
  "--text-title",
  "--text-heading",
  "--spacing-gutter",
  "--spacing-section",
  "--container-content",
  "--container-reading",
  "--radius-sm",
  "--shadow-subtle",
  "--ease-standard",
]) {
  if (!globalStyles.includes(token))
    errors.push(`src/styles/globals.css is missing ${token}.`);
}

if (/color-scheme:\s*light\s*;/.test(globalStyles)) {
  errors.push(
    "src/styles/globals.css must not hardcode a light-only color scheme.",
  );
}

if (
  !["light", "dark", "light dark"].includes(
    projectConfig.appearance.colorScheme,
  )
) {
  errors.push(
    'appearance.colorScheme must be "light", "dark", or "light dark".',
  );
}

const paths = projectConfig.pages.map((page) => page.path);
const normalizedPaths = paths.map(normalizeInternalHref);
const planFiles = projectConfig.pages.map((page) => page.planFile);
const pagePathSet = new Set(normalizedPaths);

if (projectConfig.pages.length === 0)
  errors.push("At least one page is required.");
if (!normalizedPaths.includes("/"))
  errors.push('The page inventory must include the home route "/".');
if (new Set(normalizedPaths).size !== normalizedPaths.length) {
  errors.push("Page paths must be unique after trailing-slash normalization.");
}
if (new Set(planFiles).size !== planFiles.length) {
  errors.push("Page planFile values must be unique.");
}

for (const page of projectConfig.pages) {
  if (
    !page.planFile.startsWith("docs/project/pages/") ||
    page.planFile.includes("..") ||
    !page.planFile.endsWith(".md")
  ) {
    errors.push(`${page.name || page.path} has an invalid planFile.`);
  }
  if (
    !page.routeFile.startsWith("src/pages/") ||
    page.routeFile.includes("..") ||
    ![".astro", ".md", ".mdx"].includes(extname(page.routeFile))
  ) {
    errors.push(`${page.name || page.path} has an invalid routeFile.`);
  } else if (!existsSync(page.routeFile)) {
    errors.push(
      `${page.routeFile} is declared by ${page.path} but is missing.`,
    );
  }
}

validateNavigation(
  projectConfig.navigation.primary,
  "navigation.primary",
  pagePathSet,
);
validateNavigation(
  projectConfig.navigation.footer,
  "navigation.footer",
  pagePathSet,
);
if (projectConfig.navigation.cta) {
  validateNavigation(
    [projectConfig.navigation.cta],
    "navigation.cta",
    pagePathSet,
  );
}

validateReferences();

const packageJson = JSON.parse(readRequiredFile("package.json")) as PackageJson;
const buildScript = packageJson.scripts?.build ?? "";
for (const command of [
  "format:check",
  "bun run check",
  "bun run test",
  "astro build",
]) {
  if (!buildScript.includes(command)) {
    errors.push(`package.json build script must run ${command}.`);
  }
}
if (packageJson.scripts?.qa !== "bun run build") {
  errors.push(
    "package.json qa script must delegate to the complete build gate.",
  );
}

if (projectConfig.meta.initialized) {
  requireText(projectConfig.identity.projectName, "identity.projectName");
  requireText(projectConfig.identity.companyName, "identity.companyName");
  requireText(projectConfig.identity.domain, "identity.domain");
  requireText(projectConfig.identity.language, "identity.language");
  requireText(projectConfig.identity.locale, "identity.locale");
  if (!["ltr", "rtl"].includes(projectConfig.identity.direction)) {
    errors.push('identity.direction must be "ltr" or "rtl".');
  }
  requireText(projectConfig.business.sector, "business.sector");
  requireText(projectConfig.business.summary, "business.summary");
  requireText(projectConfig.business.audience, "business.audience");
  requireText(projectConfig.business.primaryGoal, "business.primaryGoal");
  requireText(
    projectConfig.business.primaryConversion,
    "business.primaryConversion",
  );
  requireText(projectConfig.design.summary, "design.summary");
  requireText(projectConfig.design.layoutDirection, "design.layoutDirection");
  requireText(
    projectConfig.design.typographyDirection,
    "design.typographyDirection",
  );
  requireText(projectConfig.design.colorDirection, "design.colorDirection");
  requireText(projectConfig.design.imageDirection, "design.imageDirection");
  requireText(projectConfig.design.motionDirection, "design.motionDirection");
  requireText(projectConfig.content.voice, "content.voice");
  requireText(
    projectConfig.content.ui.skipToContent,
    "content.ui.skipToContent",
  );
  requireText(
    projectConfig.content.ui.foundationStatus,
    "content.ui.foundationStatus",
  );
  requireText(
    projectConfig.content.ui.foundationDescription,
    "content.ui.foundationDescription",
  );
  requireText(
    projectConfig.content.ui.notFoundTitle,
    "content.ui.notFoundTitle",
  );
  requireText(
    projectConfig.content.ui.notFoundDescription,
    "content.ui.notFoundDescription",
  );
  requireText(projectConfig.content.ui.returnHome, "content.ui.returnHome");

  if (
    !projectConfig.meta.initializedAt ||
    Number.isNaN(Date.parse(projectConfig.meta.initializedAt))
  ) {
    errors.push("meta.initializedAt must be a valid ISO timestamp.");
  }

  try {
    const domain = new URL(projectConfig.identity.domain);
    if (!["http:", "https:"].includes(domain.protocol)) {
      errors.push("identity.domain must use http or https.");
    }
  } catch {
    errors.push("identity.domain must be an absolute URL.");
  }

  for (const page of projectConfig.pages) {
    requireText(page.name, `${page.path}.name`);
    requireText(page.purpose, `${page.path}.purpose`);
    requireText(page.conversion, `${page.path}.conversion`);
    if (page.sections.length === 0)
      errors.push(`${page.path}.sections must not be empty.`);

    const content = assertResolvedDocument(page.planFile);
    if (content)
      assertDocumentSections(page.planFile, content, requiredPageSections);
  }

  const declaredPlans = new Set(planFiles);
  for (const actualPlan of listMarkdownFiles("docs/project/pages")) {
    if (!declaredPlans.has(actualPlan as (typeof planFiles)[number])) {
      errors.push(`${actualPlan} exists but is not declared by any page.`);
    }
  }

  for (const reference of projectConfig.design.referenceFiles) {
    if (!existsSync(`references/${reference}`)) {
      errors.push(`Declared reference references/${reference} is missing.`);
    }
  }

  for (const [document, sections] of Object.entries(requiredDocumentSections)) {
    const content = assertResolvedDocument(document);
    if (content) assertDocumentSections(document, content, sections);
  }

  if (!packageJson.name || packageJson.name === "frnq-astro-starter") {
    errors.push("package.json name must identify the initialized project.");
  }
} else if (projectConfig.meta.initializedAt !== null) {
  errors.push(
    "meta.initializedAt must be null while the project is uninitialized.",
  );
} else {
  if (packageJson.name !== "frnq-astro-starter") {
    errors.push(
      "The uninitialized starter package name must remain frnq-astro-starter.",
    );
  }
  if (packageJson.version !== projectConfig.meta.starterVersion) {
    errors.push(
      "package.json version and meta.starterVersion must match in starter mode.",
    );
  }
}

if (errors.length > 0) {
  console.error(`Project validation failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `Project validation passed (${projectConfig.meta.initialized ? "initialized project" : "starter mode"}).`,
);
