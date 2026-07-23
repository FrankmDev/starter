# Project operating contract

Read `project.config.ts` before every task.

## Source-of-truth order

When sources conflict, use this order:

1. The user's latest explicit instruction.
2. `project.config.ts` for confirmed project facts and scope.
3. The routed file in `docs/project/` for approved execution details.
4. Current implementation and tests for observable behavior.
5. References only for the purposes assigned in `references/references.json`.

Keep stable workflow rules here. Store project-specific facts in `project.config.ts` and `docs/project/`, not in `AGENTS.md`.

## Initialization gate

If `projectConfig.meta.initialized` is `false`:

- Read `PROJECT_START.md` completely.
- Treat the user's brief or `START_HERE.md` as input and write the confirmed facts into `project.config.ts`.
- Execute the initialization protocol in order.
- Do not implement finished pages or commercial sections.
- Do not set `initialized: true` until `bun run qa` and the required rendered reviews pass.

If the project is initialized, read only the context required for the task.

## Context routing

- Business, audience, scope, constraints: `docs/project/PROJECT.md`
- Copy, voice, sources, metadata: `docs/project/CONTENT.md`
- Visual work, tokens, references, responsive behavior: `docs/project/DESIGN.md`
- Architecture, data, dependencies, integrations: `docs/project/ARCHITECTURE.md`
- Page work: the route's `planFile` declared in `project.config.ts`
- Validation and release: `docs/project/QA.md`

Update the routed document before code when a decision changes its contract. Do not rewrite unrelated context.

## Implementation rules

- Keep changes within the requested scope and preserve unrelated work.
- Use Astro, semantic HTML, and static rendering by default.
- Keep pages declarative: routes coordinate data, SEO, and section order; components render; `data/` and `lib/` own content and transformations.
- Use Tailwind utilities for composition. Keep the only global token and base-rule source in `src/styles/globals.css`.
- Do not modify global tokens to solve an isolated local issue.
- Add client JavaScript, a UI framework, an adapter, or a dependency only for a documented requirement.
- Use `astro:assets` for processable local images.
- Preserve one `h1`, landmarks, keyboard access, focus visibility, labels, alt text, reduced motion, and content capacity.
- Run the checks in `docs/project/QA.md`; after visual work, inspect the real rendered route at its required viewports.
