# Astro starter hardening — Design

## Objective

Turn the current repository into a lean, deterministic base for every Astro
project. A new copy must contain only reusable contracts, guide an AI through a
complete initialization without duplicating project facts, and fail early when
configuration, documentation, formatting, types, or production output drift.

## Scope

The permanent core keeps Astro static output, strict TypeScript, Tailwind 4,
SEO, responsive images, semantic layout, accessibility primitives, a single
global token source, initialization documentation, and deterministic quality
checks.

The core does not include Playwright, i18n, a theme switch, a client framework,
an adapter, analytics, CMS, commerce, authentication, motion libraries, CSP
policy, project sections, or branded components. Initialization adds any of
these only when the project brief proves the requirement.

## Configuration contracts

`project.config.ts` remains the source of confirmed facts. `pages` describes
information architecture and gains an explicit `routeFile`. `navigation`
separately owns primary, CTA, and footer access paths. `appearance.colorScheme`
becomes the single browser color-scheme source; it does not imply a theme
switch.

Navigation links and route files are validated after initialization. Every page
must own one plan file and reference a real Astro route.

## AI context boundaries

`AGENTS.md` is the only permanent operating contract. It tells an agent how to
detect state, route context, update authoritative files, constrain scope, and
run the release gate. It contains no brand, page, visual, or business facts.

`project.config.ts` stores confirmed structured facts. `docs/project/PROJECT.md`
owns business and scope, `CONTENT.md` owns copy, `DESIGN.md` owns visual
decisions, `ARCHITECTURE.md` owns implementation decisions, `QA.md` owns release
evidence, and each page plan owns one route. Facts should not be duplicated
between these layers.

## Accessible form contract

The public path uses `Input`, `Textarea`, and `Select` primitives. Each primitive
owns its native control and automatically connects its label, help, and error
with `aria-describedby`, `aria-errormessage`, `aria-invalid`, and `required`.
`FormField` becomes an internal structural renderer used by those controls, not
the recommended public API.

## Quality and CI

`bun run build` is the deterministic release gate:

1. Prettier check.
2. Project validator.
3. Astro and TypeScript diagnostics.
4. Astro production build.

`bun run qa` aliases the same gate. GitHub Actions installs with `bun ci` and
runs the build gate. Dependency auditing remains a separate job because it
depends on external advisory infrastructure.

The validator checks required files, semantic tokens, configuration values,
navigation targets, route files, page-plan parity, required document sections,
references, package identity, and unresolved placeholders.

## Astro-specific decisions

HTML uses explicit lossless compression. Responsive-image behavior is owned by
the image primitive instead of combining global layout defaults with manual
`widths` and `sizes`. Tailwind remains the only CSS framework and
`globals.css` remains the only global style source.

Global prefetch, CSP, adapters, remote image domains, fonts, and URL policies
remain project decisions because enabling them without deployment and content
requirements would create hidden constraints.

## Cleanup

Remove Claude- and Cursor-specific duplicate instructions, editor
recommendations, historical starter plans/audits, unused helpers, arbitrary
icon and heading primitives, and empty situational directories. Keep only files
that participate in initialization, runtime output, or the deterministic gate.

## Acceptance

- The uninitialized template passes `bun run build`.
- A clean lockfile install passes the same command.
- Deliberately broken navigation, route, document, and formatting contracts
  fail the appropriate gate.
- `bun audit` reports independently.
- The repository contains no Playwright or situational project dependency.
