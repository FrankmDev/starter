# Reusable Astro starter — Design

## Objective

Make every new Astro project begin from a stable, low-context foundation instead of repeatedly deciding the stack, folders, global styles, SEO baseline, accessibility rules, image handling, documentation, and validation.

## Chosen approach

Use a lean, opinionated core. Keep Astro static output, strict TypeScript, Tailwind through the official Vite plugin, sitemap, responsive assets, semantic HTML, and zero client JavaScript by default. Add frameworks, adapters, CMSs, analytics, forms, ecommerce, animation libraries, and browser automation only when a concrete project requires them.

This sits between two rejected extremes:

- A nearly empty template minimizes maintenance but repeats architectural and quality decisions in every project.
- A kitchen-sink template appears convenient but creates unused dependencies, client cost, upgrades, and irrelevant agent context.

## Architecture

`project.config.ts` is the compact source of project facts. `AGENTS.md` routes agents to the smallest relevant document. `PROJECT_START.md` is the one-time initialization protocol and keeps the permanent project context out of routine turns.

`START_HERE.md` is the only user-facing brief. The agent maps it to configuration and generates every project document. A zero-dependency validator accepts the deliberately empty starter state but rejects initialized projects with unresolved core facts, missing page plans, undeclared references, placeholder documents, or the starter package name.

Routes coordinate data, SEO, and section order. Layouts own the document shell. Core components own technical behavior. Primitives expose narrow semantic contracts. Sections stay project-specific. Local content and transformations remain outside visual components.

`src/styles/globals.css` is the only global stylesheet and the only shared token source. Project initialization replaces the neutral seed theme without creating parallel Tailwind configuration or component CSS systems.

## Lifecycle

The template remains deliberately uninitialized and non-indexable. A new repository copy fills business and design facts, analyzes references, generates project documents and route plans, adapts the theme, validates the foundation, and only then marks itself initialized.

The template itself is maintained through dependency upgrades, `bun run qa`, and a matching GitHub Actions gate. New repositories are created from GitHub's template mechanism so they have independent history and can be cloned directly into a new local folder.

## Definition of done

- Latest stable Astro and compatible official integrations are locked.
- Bun and Node are pinned to current stable/LTS baselines; TypeScript stays on the latest version compatible with Astro diagnostics.
- A clean install passes type checks and production build.
- The neutral foundation renders at the required mobile, tablet, and desktop viewports.
- New-project and GitHub-template commands are documented literally.
- No project-specific brand, claim, integration, adapter, or client framework is included.
