<!-- TEMPLATE CONTRACT: remove this comment and every placeholder. Turn project risks into executable checks, matrices, expected results, and a release record. -->

# {{PROJECT_NAME}} — QA

## Required commands

```bash
bun run build
```

`bun run build` runs formatting verification, the project validator, Astro and
TypeScript diagnostics, deterministic unit tests, and the production build. Use
`bun run format`, `bun run validate`, `bun run check`, and `bun run test` only
as focused diagnosis commands.

Run `bun run audit` separately when registry access is available. GitHub Actions
reports it as an independent security job so advisory infrastructure cannot be
confused with deterministic build quality. Add only project-specific commands
that are installed, stable, and justified.

## Test environments

Record Bun/Node versions, browsers, deployment preview when available, environment limitations, required credentials, and data fixtures. Never put secrets here.

## Route and state matrix

{{PAGES}}

| Route | Default | Empty/partial | Error | No JS | Index state | Owner |
| ----- | ------- | ------------- | ----- | ----- | ----------- | ----- |

Mark non-applicable states explicitly.

## Viewport matrix

- Mobile: 390 × 844
- Tablet/intermediate: 768 × 1024
- Desktop: 1440 × 1000
- Risk check: 320 px when navigation, forms, grids, media, or long labels change

Add project-specific widths only when content capacity changes there. Record browser, route, state, and result for every rendered inspection.

## Functional checks

Navigation, links, buttons, forms, validation, loading, success/error recovery, dialogs, menus, accordions, search, integrations, fallback behavior, 404, and any project-specific flows.

## Content checks

Approved copy and sources, no publishable placeholders, no invented claims, correct language/locale, consistent labels, content completeness, legal ownership, long content, and missing-content behavior.

## Accessibility checks

Landmarks, one `h1`, heading order, keyboard operation, focus visibility and return, accessible names, labels/help/errors, live status, target sizes, contrast, zoom/reflow, alt text, non-color cues, forced colors when relevant, and reduced motion.

## SEO and discovery checks

Unique title and description, canonical, language, robots, sitemap, redirects, social metadata, social image alt, factual structured data, internal links, status codes, and exclusion of private or utility routes.

## Visual and responsive checks

No horizontal overflow, stable media, useful measures, intended hierarchy, correct reading order, complete states, consistent global tokens, no unapproved one-off values, and observable output matching `DESIGN.md` and each page plan.

## Performance checks

No unjustified hydration, correctly prioritized images and fonts, stable dimensions, restrained third parties, production asset behavior, caching where applicable, and no dependency used for CSS/platform-solvable behavior.

Record approved budgets and measurement tools:

| Route/state | Metric/budget | Tool | Expected | Result |
| ----------- | ------------- | ---- | -------- | ------ |

## Release gate

The complete `bun run build` gate, route states, viewports, functionality,
accessibility, content, SEO, and performance checks must pass. Security audit
findings are release-blocking; registry availability failures are reported
separately. Every exception needs severity, evidence, owner, and explicit
acceptance.

## Validation record

| Date | Commit/build | Commands | Routes/viewports | Result | Limitations/owner |
| ---- | ------------ | -------- | ---------------- | ------ | ----------------- |
