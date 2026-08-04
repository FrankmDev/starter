# {{PROJECT_NAME}} — Design

## Visual thesis

{{DESIGN_SUMMARY}}

## References

{{REFERENCES}}

State what each reference informs and what must not be copied. If there are no
references, say so; do not create a `references/` folder.

## Typography

{{TYPOGRAPHY}}

Define licensed sources, fallbacks, roles, weights, scale, leading, tracking,
wrapping, and reading measures.

## Color

{{COLOR}}

Define semantic roles, contrast, interaction states, selection, and every color
scheme declared in `project.config.ts`. A supported scheme does not imply a
theme switch.

## Layout, spacing, and containers

{{LAYOUT}}

Define grid, alignment, section rhythm, density, gutters, reading measure,
container widths, layering, and content-capacity breakpoints.

## Imagery and iconography

{{IMAGERY}}

Define art direction, framing, aspect ratios, crop/focal behavior, priority,
alt/decorative responsibility, and icon language.

## Motion and interaction

{{MOTION}}

Define purposeful transitions, state feedback, reduced-motion behavior, and a
motion budget. Add a motion library only when confirmed interaction requires it.

## Responsive behavior

{{RESPONSIVE}}

Define order, composition changes, navigation, media crops, reflow, zoom,
targets, text expansion, and overflow risks at relevant widths.

## States and visual accessibility

{{STATES_AND_ACCESSIBILITY}}

Cover hover, focus, active, disabled, loading, empty, error, contrast, non-color
cues, target size, forced colors, and reduced motion only where relevant.

## Global tokens

Record the final values that `src/styles/globals.css` must expose. Expand the
seed only when this project needs more roles.

| Category | Minimum roles                                                              |
| -------- | -------------------------------------------------------------------------- |
| Color    | canvas, surface, ink, muted, border, accent, on-accent, focus              |
| Type     | font-sans, font-display, text-base, text-heading, text-title, text-display |
| Space    | gutter, section                                                            |
| Layout   | container-content, container-reading                                       |
| Shape    | radius                                                                     |

{{TOKENS}}

## Avoid and definition of done

{{AVOID_AND_DONE}}

Write observable criteria for hierarchy, wrapping, overflow, media stability,
states, focus, contrast, motion, and token consistency. Remove all template
guidance and placeholders when generating the project document.
