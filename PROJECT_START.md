# Project initialization

Use this protocol only while `projectConfig.initialized === false`.

1. Read the briefing in the conversation and `START_HERE.md`.
2. Inspect visual references when they exist.
3. Ask only for information that genuinely blocks safe implementation.
4. Complete the runtime values in `project.config.ts`.
5. Generate `docs/PROJECT.md` from its template.
6. Generate `docs/DESIGN.md` from its template.
7. Define the project token system and universal base rules in
   `src/styles/globals.css`.
8. Create only the routes and folders the confirmed project requires.
9. Add only confirmed functionality, integrations, and dependencies.
10. Keep the default static output. Do not add an adapter or deployment config
    unless a confirmed on-demand requirement needs it.
11. Put optimizable local media in `src/assets/`; use `public/` only for files
    that must be copied unchanged. Do not create either folder while empty.
12. Run `bun run format`, `bun run format:check`, and `bun run build`; run
    `bun run audit` when registry access is available.
13. Inspect the rendered result when the work has a visual or interactive
    outcome.
14. Set `projectConfig.initialized` to `true` only after the checks pass.

Keep each decision in one place: product, content, routes, functionality, SEO,
constraints, and technical decisions belong in `PROJECT.md`; visual decisions
and token values belong in `DESIGN.md`. Create additional architecture, QA, or
page-plan documents later only when actual project complexity needs them.

Never invent missing business facts, claims, legal text, credentials, external
services, or branding. A successful build does not replace a rendered review
when appearance or interaction changed.
