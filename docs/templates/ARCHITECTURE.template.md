<!-- TEMPLATE CONTRACT: remove this comment and every placeholder. Define ownership, data flow, states, dependencies, and failure behavior precisely enough to implement without inventing architecture. -->

# {{PROJECT_NAME}} — Architecture

## Stack and rendering

Astro, TypeScript strictest, static output, Tailwind 4 through its Vite plugin, semantic HTML, `astro:assets`, and sitemap are the default. Record every deviation and why the default cannot satisfy the requirement.

Define rendering mode, deployment target when known, runtime assumptions, supported browsers, and environment-variable boundaries.

## Decision ledger

| Decision | Requirement | Chosen approach | Rejected alternative | Client/runtime cost | Revisit trigger |
| --- | --- | --- | --- | --- | --- |

## Route contracts

{{PAGES}}

For every route define path, source data, SEO ownership, layout, section order, states, prerender behavior, and its `planFile`.

## Responsibility boundaries

- Pages coordinate data, SEO, and section order.
- Layouts own shared document structure.
- Sections own meaningful page blocks.
- UI components own a real reusable contract or state.
- Primitives solve one narrow semantic/accessibility contract.
- `config/` owns stable site configuration.
- `data/` owns typed local content.
- `lib/` owns transformations and integrations.
- Visual components never call external services directly.

Document any project-specific exception.

## Component map

| Component | Responsibility | Inputs/outputs | States | Direct consumers | Shared or local |
| --- | --- | --- | --- | --- | --- |

Do not create a component because markup merely looks similar. Record the real reuse, state, semantic, accessibility, or integration contract.

## Data and content flow

For every data source define:

| Source | Owner | Validation/schema | Transform | Consumer | Cache/freshness | Failure fallback |
| --- | --- | --- | --- | --- | --- | --- |

Describe the direction from source → validation → mapping → page → component. Define empty, loading, partial, stale, error, and unavailable states where applicable.

## Islands and client code

List every hydrated island or scoped script, why native HTML/CSS is insufficient, hydration directive, bundle boundary, fallback without JavaScript, event ownership, cleanup, and duplicate-initialization protection.

If the list is empty, state that the project ships zero client JavaScript by default.

## Functionality and integrations

{{FUNCTIONALITY}}

For forms, search, auth, commerce, analytics, consent, CMS, or external APIs define request/response ownership, validation, spam/error handling, privacy, credentials, rate limits, success/failure UX, and test boundaries. Never invent endpoints or IDs.

## SEO, URLs, and discovery

Define title/description ownership, canonical rules, trailing slash policy, sitemap inclusions/exclusions, robots states, redirects, social images, language alternates when needed, and which factual schema types are authorized.

## Images and fonts

Define local versus remote policy, allowed remote hosts, responsive widths and `sizes`, priority, dimensions, aspect ratios, focal behavior, formats, alt ownership, font licenses, subsets, preload rules, and fallback stacks.

## Security and privacy

Record secret boundaries, public environment variables, user data, consent, third parties, sanitization, CSP needs, external links, logging, and legal dependencies. No credential belongs in source or project docs.

## Dependency ledger

| Package/integration | Requirement | Build/client impact | Why platform/Astro is insufficient | Removal path |
| --- | --- | --- | --- | --- |

Core packages belong here too. A dependency without a concrete requirement must not be installed.

## Responsive and performance contracts

Define content-capacity breakpoints, image and font budgets, hydration budget, third-party budget, stability requirements, loading priorities, caching assumptions, and measurement method. Numeric budgets must be approved or clearly marked as derived engineering defaults.

## Error handling and observability

Define user-visible errors, 404 behavior, integration failures, logging, diagnostics, monitoring when required, and who owns recovery. Static sites still need honest missing-content and broken-integration behavior.
