# AI operating contract

- Read `project.config.ts` before every task.
- If `initialized` is `false`, read and follow `PROJECT_START.md`.
- If `initialized` is `true`, read only the context relevant to the task:
  `docs/PROJECT.md` for product and implementation decisions, and
  `docs/DESIGN.md` for visual decisions.
- Use Astro, semantic HTML, static rendering, and native browser behavior by
  default.
- Add the minimum client JavaScript required by real interaction. Add
  React/Vue/Svelte only when a bounded interactive need justifies it.
- Use Tailwind utilities for composition. Keep global tokens and base rules in
  `src/styles/globals.css`; do not change them to solve an isolated issue.
- Use `astro:assets` directly: `layout="constrained"` for normal responsive
  images, `layout="full-width"` when media truly spans its available width, and
  fixed sizing for fixed assets. Use `priority` for LCP media and manual `sizes`
  only when automatic sizing does not match the layout.
- Preserve landmarks, heading order, keyboard access, visible focus, accessible
  names, labels, alt text, contrast, reduced motion, and content reflow.
- Maintain accurate SEO, canonical, social metadata, robots, sitemap, and
  structured data. Never publish placeholder metadata or invented URLs.
- Treat external input as untrusted, keep secrets server-side, and preserve CSP.
  Any external integration must extend CSP explicitly; never disable CSP
  automatically to make an integration work.
- Never invent claims, prices, policies, certifications, legal copy,
  credentials, IDs, endpoints, or business data.
- Do not add dependencies without a current, concrete need.
- Do not create speculative abstractions, opportunistic refactors, empty
  folders, or infrastructure before the project needs them.
- Run checks proportional to the change and `bun run build` after structural or
  release-relevant changes.

Opt-in only: React/Vue/Svelte, CMS, auth, ecommerce, analytics, GTM, consent,
i18n, theme switching, motion libraries, Playwright, forms, search, APIs,
databases, adapters, observability, and global prefetch.
