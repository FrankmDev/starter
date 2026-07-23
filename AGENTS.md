# AI operating contract

This file contains permanent workflow rules only. Never store project copy,
brand decisions, page requirements, visual direction, integrations, or business
facts here.

## Start every task

1. Read `project.config.ts`.
2. Check `projectConfig.meta.initialized`.
3. If it is `false`, read `PROJECT_START.md` completely and follow its
   initialization gate. Do not implement finished commercial pages.
4. If it is `true`, read only the authoritative context required by the task.
5. Inspect the current implementation and repository state before editing.

## Sources of truth

Use this precedence when information conflicts:

1. The user's latest explicit instruction.
2. `project.config.ts` for confirmed structured facts and project state.
3. The single routed document responsible for the decision.
4. The relevant page plan.
5. Current code and validation evidence.
6. References, limited to their declared `useFor` and `doNotUseFor`.

Keep one fact in one authoritative place. Link to it instead of copying large
blocks into other documents.

## Context ownership

| Source                         | Owns                                                                                        | Must not contain                           |
| ------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `AGENTS.md`                    | Stable AI workflow and quality rules                                                        | Project-specific facts or design           |
| `PROJECT_START.md`             | Initialization and recurring execution protocols                                            | Project brief or final decisions           |
| `project.config.ts`            | Confirmed identity, scope, routes, navigation, appearance, and constraints                  | Long rationale or implementation prose     |
| `docs/project/PROJECT.md`      | Business, audience, objectives, scope, route purpose, navigation intent, constraints        | Visual system or code architecture         |
| `docs/project/CONTENT.md`      | Sources, voice, messages, copy, metadata inputs, missing content                            | Layout or component decisions              |
| `docs/project/DESIGN.md`       | References, visual system, tokens, responsive and interaction language                      | Business scope or implementation ownership |
| `docs/project/ARCHITECTURE.md` | Rendering, route files, boundaries, data flow, dependencies, integrations, failure behavior | Brand direction or marketing copy          |
| `docs/project/QA.md`           | Executable checks, matrices, release evidence, accepted exceptions                          | Product requirements or design rationale   |
| `docs/project/pages/*.md`      | One executable route plan                                                                   | Global rules or unrelated routes           |

Update the owning document before code whenever a decision changes its
contract. Do not rewrite unrelated context.

## Project configuration boundaries

- `pages` describes information architecture. Every page owns a unique `path`,
  real `routeFile`, and unique `planFile`.
- `navigation` describes access to that architecture. Never derive navigation
  automatically from all pages.
- `appearance.colorScheme` is the only browser color-scheme source. A theme
  switch is project-specific.
- Unknown facts stay visibly unresolved. Never invent claims, prices,
  certifications, legal text, credentials, IDs, endpoints, or integrations.

## Implementation rules

- Use Astro, static rendering, semantic HTML, and native browser behavior by
  default.
- Keep pages declarative: routes coordinate data, SEO, and section order;
  components render; `data/` owns structured local content; `lib/` owns
  transformations and integrations.
- Add client JavaScript only for real interaction. Add a UI framework or adapter
  only when a documented requirement cannot be met cleanly with Astro.
- Use Tailwind utilities for component composition. Keep shared tokens and base
  rules only in `src/styles/globals.css`.
- Do not modify global tokens to repair an isolated component.
- Use `astro:assets` for processable local images. Keep remote image hosts and
  media policy project-specific.
- Use `Input`, `Textarea`, and `Select` for standard form controls so labels,
  help, errors, and ARIA state remain connected.
- Preserve one `h1`, landmarks, keyboard access, visible focus, accessible
  names, labels, alt text, content capacity, reduced motion, and honest states.
- Do not add a dependency without recording its requirement, runtime/build
  cost, and removal path in `docs/project/ARCHITECTURE.md`.
- Do not add Playwright, a CMS, analytics, ecommerce, authentication, i18n,
  theme switching, motion libraries, adapters, or project sections unless the
  current project explicitly requires them.

## Change discipline

- Keep changes within the requested scope and preserve unrelated work.
- Before a structural, aesthetic, responsive, or refactor pass, follow the
  matching protocol in `PROJECT_START.md`.
- Inspect all direct consumers before changing a shared contract.
- Prefer one falsifiable hypothesis and one conceptual change per iteration.
- After two failed attempts at the same defect, stop, preserve evidence, and
  request the missing decision instead of widening scope.
- Never mark initialization complete because documents merely exist.

## Required quality gate

`bun run build` is the deterministic release gate and must pass before work is
reported complete. It runs:

1. `format:check`;
2. project validation;
3. Astro and TypeScript diagnostics;
4. deterministic unit tests;
5. the Astro production build.

Use `bun run format` to fix formatting. Run `bun run audit` separately when
registry access is available; an advisory outage is not a build failure.

For visual or interaction changes, also follow `docs/project/QA.md` and inspect
the real rendered routes, states, keyboard flow, and required viewports.
