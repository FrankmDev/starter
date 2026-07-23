<!-- TEMPLATE CONTRACT: remove this comment and every placeholder. This file is the executable contract for one route; define exact content, ownership, states, responsive transformations, and implementation scope. -->

# {{PAGE_NAME}} — Page plan

- Path: `{{PAGE_PATH}}`
- Route file: `{{PAGE_ROUTE_FILE}}`
- Purpose: {{PAGE_PURPOSE}}
- Primary conversion: {{PAGE_CONVERSION}}
- Plan file: `{{PAGE_PLAN_FILE}}`
- Status: planned

## Audience need and decision

State what the visitor already knows, what they need to understand, what objection must be resolved, and what decision or action this route enables.

## Success and non-success

Define observable completion for the user and the business. State what this page must not try to achieve.

## Narrative

{{PAGE_SECTIONS}}

Use one row per section:

| Order | Section | Responsibility | Required content/evidence | Primary action | Semantic heading | Data/source |
| ----- | ------- | -------------- | ------------------------- | -------------- | ---------------- | ----------- |

Explain why each section follows the previous one. Remove redundant sections that do not change understanding, trust, or action.

## Semantic outline

Define the single `h1`, section headings, landmarks, navigation relationship, and reading/focus order. Visual order must not contradict semantic order.

## Component and data plan

| Section | Component candidate | Shared/local | Props/data contract | States | Source owner |
| ------- | ------------------- | ------------ | ------------------- | ------ | ------------ |

Keep page markup declarative. Specify mappings outside visual components and reuse only contracts already proven by consumers.

## Interaction and states

Define native behavior first. For every interaction specify trigger, keyboard behavior, focus outcome, state announcement, loading, success, empty, partial, error, disabled, no-JavaScript fallback, and reduced-motion behavior.

## Responsive behavior

| Section | Mobile | Intermediate | Desktop | Long-content/overflow risk |
| ------- | ------ | ------------ | ------- | -------------------------- |

Define order, grid changes, content measures, media crop/focal behavior, targets, labels, zoom, and 320 px behavior. Avoid duplicate mobile markup.

## Media requirements

List each image/video/icon, its source, purpose, aspect ratio, dimensions, `sizes`, priority, crop, alt owner, decorative status, and fallback.

## SEO and discovery

Define unique title intent, description intent, canonical, index state, social image and alt, internal links, breadcrumbs where useful, and only the structured data supported by confirmed facts.

## Accessibility

Define landmarks, heading order, keyboard sequence, focus, accessible names, labels, errors, target sizes, contrast, alt text, non-color cues, zoom, and reduced motion.

## Performance

State image/font priority, expected client JavaScript, third-party work, layout-stability risks, and route-specific budgets or measurements.

## Implementation scope

### Allowed files

Start with the declared `routeFile`. List the exact files this page pass may
create or change and why.

### Prohibited files

List global or shared files that must not change during the page pass unless a separately approved contract requires it.

## Acceptance criteria

- Purpose and primary action are clear from real content.
- Every section has confirmed responsibility, input, state, and semantic position.
- Mobile, intermediate, and desktop transformations are observable.
- No horizontal overflow, accidental truncation, or broken media.
- Keyboard, focus, headings, names, labels, errors, and alt text are valid.
- Metadata, canonical, index state, internal links, and factual schema are correct.
- Required commands and rendered viewport reviews pass.

Add route-specific criteria that can be checked without subjective interpretation.

## Non-goals

List capabilities, content, sections, integrations, and refinements deliberately excluded from this page pass.
