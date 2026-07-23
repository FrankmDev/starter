import { existsSync, readFileSync } from 'node:fs';
import { projectConfig } from '../project.config';

interface ReferenceEntry {
  file: string;
  useFor: string[];
  doNotUseFor: string[];
  notes: string;
}

const errors: string[] = [];
const placeholderPatterns = [
  /complete this document/i,
  /template contract/i,
  /\{\{[A-Z0-9_]+\}\}/,
];

function requireText(value: string, label: string): void {
  if (!value.trim()) errors.push(`${label} is required.`);
}

function readRequiredFile(path: string): string {
  if (!existsSync(path)) {
    errors.push(`${path} is missing.`);
    return '';
  }
  return readFileSync(path, 'utf8');
}

function assertResolvedDocument(path: string): void {
  const content = readRequiredFile(path);
  if (content && placeholderPatterns.some((pattern) => pattern.test(content))) {
    errors.push(`${path} still contains starter instructions or placeholders.`);
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isReferenceEntry(value: unknown): value is ReferenceEntry {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.file === 'string' &&
    isStringArray(entry.useFor) &&
    isStringArray(entry.doNotUseFor) &&
    typeof entry.notes === 'string'
  );
}

function validateReferences(): void {
  const metadataPath = 'references/references.json';
  if (!existsSync(metadataPath)) {
    if (projectConfig.design.referenceFiles.length > 0) {
      errors.push(`${metadataPath} is required when design.referenceFiles is not empty.`);
    }
    return;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(metadataPath, 'utf8'));
  } catch {
    errors.push(`${metadataPath} must contain valid JSON.`);
    return;
  }

  if (!Array.isArray(parsed) || !parsed.every(isReferenceEntry)) {
    errors.push(`${metadataPath} must match references/references.example.json.`);
    return;
  }

  const declared = new Set<string>(projectConfig.design.referenceFiles);
  const described = new Set<string>(parsed.map((entry) => entry.file));

  if (declared.size !== projectConfig.design.referenceFiles.length) {
    errors.push('design.referenceFiles must not contain duplicates.');
  }
  if (described.size !== parsed.length) {
    errors.push(`${metadataPath} must not describe the same file twice.`);
  }

  for (const entry of parsed) {
    if (
      entry.file.startsWith('/') ||
      entry.file.includes('..') ||
      entry.file.startsWith('references/')
    ) {
      errors.push(`${entry.file} must be a safe path relative to references/.`);
      continue;
    }
    if (!existsSync(`references/${entry.file}`)) {
      errors.push(`references/${entry.file} is described but missing.`);
    }
    if (!declared.has(entry.file)) {
      errors.push(`${entry.file} is described but absent from design.referenceFiles.`);
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
  'AGENTS.md',
  'PROJECT_START.md',
  'START_HERE.md',
  'astro.config.mjs',
  'src/styles/globals.css',
  'src/layouts/BaseLayout.astro',
  'src/components/core/SEO.astro',
  'src/components/core/JsonLd.astro',
  'src/components/core/ResponsiveImage.astro',
  'src/pages/index.astro',
  'src/pages/404.astro',
  'src/pages/robots.txt.ts',
  'docs/templates/PROJECT.template.md',
  'docs/templates/CONTENT.template.md',
  'docs/templates/DESIGN.template.md',
  'docs/templates/ARCHITECTURE.template.md',
  'docs/templates/PAGE.template.md',
  'docs/templates/QA.template.md',
];

for (const file of coreFiles) readRequiredFile(file);

const globalStyles = readRequiredFile('src/styles/globals.css');
for (const token of [
  '--color-canvas',
  '--color-surface',
  '--color-ink',
  '--color-muted',
  '--color-border',
  '--color-accent',
  '--color-accent-hover',
  '--color-accent-active',
  '--color-focus',
  '--font-sans',
  '--font-display',
  '--text-display',
  '--text-title',
  '--text-heading',
  '--spacing-gutter',
  '--spacing-section',
  '--container-content',
  '--container-reading',
  '--radius-sm',
  '--shadow-subtle',
  '--ease-standard',
]) {
  if (!globalStyles.includes(token)) errors.push(`src/styles/globals.css is missing ${token}.`);
}

const paths = projectConfig.pages.map((page) => page.path);
const planFiles = projectConfig.pages.map((page) => page.planFile);

if (projectConfig.pages.length === 0) errors.push('At least one page is required.');
if (!paths.includes('/')) errors.push('The page inventory must include the home route "/".');
if (new Set(paths).size !== paths.length) errors.push('Page paths must be unique.');
if (new Set(planFiles).size !== planFiles.length) errors.push('Page planFile values must be unique.');

for (const page of projectConfig.pages) {
  if (!page.planFile.startsWith('docs/project/pages/') || !page.planFile.endsWith('.md')) {
    errors.push(`${page.name || page.path} has an invalid planFile.`);
  }
}

validateReferences();

if (projectConfig.meta.initialized) {
  requireText(projectConfig.identity.projectName, 'identity.projectName');
  requireText(projectConfig.identity.companyName, 'identity.companyName');
  requireText(projectConfig.identity.domain, 'identity.domain');
  requireText(projectConfig.identity.language, 'identity.language');
  requireText(projectConfig.identity.locale, 'identity.locale');
  if (!['ltr', 'rtl'].includes(projectConfig.identity.direction)) {
    errors.push('identity.direction must be "ltr" or "rtl".');
  }
  requireText(projectConfig.business.sector, 'business.sector');
  requireText(projectConfig.business.summary, 'business.summary');
  requireText(projectConfig.business.audience, 'business.audience');
  requireText(projectConfig.business.primaryGoal, 'business.primaryGoal');
  requireText(projectConfig.business.primaryConversion, 'business.primaryConversion');
  requireText(projectConfig.design.summary, 'design.summary');
  requireText(projectConfig.design.layoutDirection, 'design.layoutDirection');
  requireText(projectConfig.design.typographyDirection, 'design.typographyDirection');
  requireText(projectConfig.design.colorDirection, 'design.colorDirection');
  requireText(projectConfig.design.imageDirection, 'design.imageDirection');
  requireText(projectConfig.design.motionDirection, 'design.motionDirection');
  requireText(projectConfig.content.voice, 'content.voice');
  requireText(projectConfig.content.ui.skipToContent, 'content.ui.skipToContent');
  requireText(projectConfig.content.ui.foundationStatus, 'content.ui.foundationStatus');
  requireText(projectConfig.content.ui.foundationDescription, 'content.ui.foundationDescription');
  requireText(projectConfig.content.ui.notFoundTitle, 'content.ui.notFoundTitle');
  requireText(projectConfig.content.ui.notFoundDescription, 'content.ui.notFoundDescription');
  requireText(projectConfig.content.ui.returnHome, 'content.ui.returnHome');

  if (!projectConfig.meta.initializedAt || Number.isNaN(Date.parse(projectConfig.meta.initializedAt))) {
    errors.push('meta.initializedAt must be a valid ISO timestamp.');
  }

  try {
    const domain = new URL(projectConfig.identity.domain);
    if (!['http:', 'https:'].includes(domain.protocol)) {
      errors.push('identity.domain must use http or https.');
    }
  } catch {
    errors.push('identity.domain must be an absolute URL.');
  }

  for (const page of projectConfig.pages) {
    requireText(page.name, `${page.path}.name`);
    requireText(page.purpose, `${page.path}.purpose`);
    requireText(page.conversion, `${page.path}.conversion`);
    if (page.sections.length === 0) errors.push(`${page.path}.sections must not be empty.`);
    assertResolvedDocument(page.planFile);
  }

  for (const reference of projectConfig.design.referenceFiles) {
    if (!existsSync(`references/${reference}`)) {
      errors.push(`Declared reference references/${reference} is missing.`);
    }
  }

  for (const document of [
    'docs/project/PROJECT.md',
    'docs/project/CONTENT.md',
    'docs/project/DESIGN.md',
    'docs/project/ARCHITECTURE.md',
    'docs/project/QA.md',
  ]) {
    assertResolvedDocument(document);
  }

  const packageJson = JSON.parse(readRequiredFile('package.json')) as { name?: string };
  if (!packageJson.name || packageJson.name === 'frnq-astro-starter') {
    errors.push('package.json name must identify the initialized project.');
  }
} else if (projectConfig.meta.initializedAt !== null) {
  errors.push('meta.initializedAt must be null while the project is uninitialized.');
} else {
  const packageJson = JSON.parse(readRequiredFile('package.json')) as {
    name?: string;
    version?: string;
  };
  if (packageJson.name !== 'frnq-astro-starter') {
    errors.push('The uninitialized starter package name must remain frnq-astro-starter.');
  }
  if (packageJson.version !== projectConfig.meta.starterVersion) {
    errors.push('package.json version and meta.starterVersion must match in starter mode.');
  }
}

if (errors.length > 0) {
  console.error(`Project validation failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(
  `Project validation passed (${projectConfig.meta.initialized ? 'initialized project' : 'starter mode'}).`,
);
