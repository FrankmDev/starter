<!-- TEMPLATE CONTRACT: remove this comment and every placeholder. Turn the brief and assigned references into an original, observable system. Specify complete global tokens before page implementation. -->

# {{PROJECT_NAME}} — Design

## Visual thesis

{{DESIGN_SUMMARY}}

Express one coherent visual idea tied to audience, offer, and conversion. State how it should feel on first read and what the second read reveals.

## Reference analysis

{{REFERENCES}}

Use one row per declared reference:

| Reference | Assigned use | Extracted principle | Explicit exclusions | Conflict resolution |
| --------- | ------------ | ------------------- | ------------------- | ------------------- |

Analyze composition, hierarchy, typography, density, rhythm, imagery, navigation, surfaces, depth, motion, states, and small details only when assigned. Never copy a whole composition, brand, or asset.

## System directions

- Layout: {{LAYOUT_DIRECTION}}
- Typography: {{TYPOGRAPHY_DIRECTION}}
- Color: {{COLOR_DIRECTION}}
- Images: {{IMAGE_DIRECTION}}
- Motion: {{MOTION_DIRECTION}}

## Composition

Define page grid, content measures, alignment logic, section rhythm, density, whitespace behavior, emphasis, layering, and how repeated sections avoid monotony.

## Typography

Specify licensed font sources, fallbacks, families by role, available weights, fluid scale, line heights, tracking, casing, readable measures, heading wraps, numerals, and long-content behavior.

## Color and surfaces

Define semantic roles rather than brand-number names: canvas, surfaces, ink, muted text, borders, accent and interaction states, feedback states, focus, selection, and inverse contexts. Record contrast expectations and any usage restrictions.

Record how `projectConfig.appearance.colorScheme` maps to supported browser
schemes. If more than one scheme is supported, define complete semantic tokens
for each one. Do not imply that a theme switch exists unless architecture and
interaction contracts explicitly require it.

## Imagery and iconography

Define subject matter, art direction, framing, aspect ratios, crop rules, lighting, texture, treatment, responsive focal behavior, priority, alt responsibility, and when an image is decorative. Define icon geometry and stroke/fill behavior without importing a library by default.

## Motion and interaction

Define durations, easing, entrance/exit logic, hover/focus/pressed/loading behavior, scroll behavior, reduced-motion alternatives, and a motion budget. Every animation must communicate state, hierarchy, or continuity.

## Global token contract

Record the final values and rationale written into `src/styles/globals.css`:

| Category | Required semantic tokens                                              | Decision |
| -------- | --------------------------------------------------------------------- | -------- |
| Color    | canvas, surfaces, ink, muted, borders, accent states, feedback, focus |          |
| Type     | families, weights, fluid sizes, leading, tracking, measures           |          |
| Space    | base rhythm, gutters, compact/default/large section spacing           |          |
| Layout   | containers, grid, breakpoints by content capacity                     |          |
| Shape    | border widths, radii                                                  |          |
| Depth    | shadows and overlays                                                  |          |
| Motion   | durations and easing                                                  |          |
| Layering | named z-index roles when required                                     |          |

`@theme` is the only Tailwind token source. Use `:root` only for shared values that do not map to a Tailwind theme namespace.

## Responsive transformations

Define mobile order, intermediate states, desktop composition, content-capacity breakpoints, navigation behavior, media crops, grid collapse, touch targets, text expansion, zoom, and 320 px risk behavior. Do not describe responsive work as “stack on mobile” without section-specific consequences.

## Component and state language

Describe shared visual rules for controls, fields, feedback, media frames, separators, and interactive states. Do not predesign a rigid library of commercial cards or sections.

## Accessibility

Define contrast, visible focus, non-color cues, minimum target expectations, reading measures, form state communication, reduced motion, forced colors, and semantic order.

## Avoid

{{DESIGN_AVOID}}

Translate each exclusion into a testable visual rule.

## Visual definition of done

State observable mobile, tablet, and desktop criteria: hierarchy, overflow, wrapping, media stability, state completeness, focus, contrast, reduced motion, and consistency with the token contract.
