# Opt-in extensions for derived projects

The starter must be small, secure and project-neutral. Choose extensions after confirming the product needs them.

| Type of site         | Start with                               | Add when needed                                      |
| -------------------- | ---------------------------------------- | ---------------------------------------------------- |
| Corporate or landing | Static routes, SEO, responsive media     | Form endpoint, compliant analytics                   |
| Blog/editorial       | Astro content collections and Markdown   | RSS, search, taxonomy                                |
| Multilingual         | Locale routes and translated metadata    | Translation workflow, language selector              |
| Ecommerce            | Editorial storefront and product mapping | Shopify or another backend, live inventory, checkout |
| Portal/member area   | Public shell and user journeys           | Auth, authorization, server rendering                |
| Dashboard            | Actual data flows                        | Interactive islands, API, observability              |

## Engineering decision gates

1. Static rendering by default. Add an adapter only when a route genuinely needs on-demand rendering.
2. Local content for simple sites. Add a CMS only when the publishing workflow justifies it.
3. Native HTML and browser behavior first. Add a UI framework island for complex, real interactions.
4. Define a single source of truth for dynamic data; do not duplicate mutable prices or stock.
5. Review CSP and privacy when connecting an external origin, analytics, form provider or payment service.
6. Design indexability, canonicals, schema and SEO around verified content and actual search intent.
7. Add accessibility and browser tests in proportion to interaction complexity.
8. Never ship the starter's placeholder content as an initialized production website.

## Astro + Shopify example

Keep commerce backend data in Shopify and product/brand storytelling in Astro. Use public Storefront API access only as documented, protect private Admin API credentials, and redirect to a hosted checkout. Product availability, prices, shipments and refunds need production workflows, not static assumptions.

Shopify does not belong in the universal starter. Install it in the derived commerce project only.

## Dependency upgrades

Update manifest and bun.lock together using Bun. Never hand-edit dependency integrity hashes or publish a half-updated lockfile. Confirm the Node.js runtime requirements before upgrading Astro. Run format, configuration tests, Astro check, build and security audit after each upgrade. If the runtime or package registry is unavailable, record the pending update instead of claiming it passed.
