<!-- TEMPLATE CONTRACT: remove this comment and every placeholder. Document approved sources, message ownership, page inputs, metadata, and missing content. Never invent claims or legal copy. -->

# {{PROJECT_NAME}} — Content

## Source inventory

{{AVAILABLE_SOURCES}}

For each source record its location, owner, approval status, allowed use, freshness, and affected routes. Treat the source as authoritative only for its declared purpose.

## Audience and language

- Language, locale, and direction: {{LANGUAGE}} / {{LOCALE}} / {{DIRECTION}}
- Primary audience: {{AUDIENCE}}

Document literacy level, domain knowledge, terminology, localization rules, units, date/number formats, and inclusive-language requirements.

## Voice

{{VOICE}}

Define tone attributes as observable writing rules. Include sentence rhythm, person, formality, vocabulary, capitalization, punctuation, CTA style, and examples of what to avoid.

## Message hierarchy

- Primary goal: {{PRIMARY_GOAL}}
- Primary conversion: {{PRIMARY_CONVERSION}}

{{KEY_MESSAGES}}

Order the core proposition, supporting benefits, proof, objections, trust information, and actions. Say which message owns the first screen and which messages must not compete with it.

## Claims and evidence

Create a ledger with:

| Claim | Evidence/source | Approval | Allowed routes | Notes |
| ----- | --------------- | -------- | -------------- | ----- |

List unsupported or prohibited claims separately:

{{PROHIBITED_CLAIMS}}

## Vocabulary

Define preferred terms, banned terms, product/service naming, acronyms, translations, capitalization, and labels that must remain consistent.

## System interface copy

Define the localized skip-link label, foundation status and description, 404
title and description, and return-home label stored in
`projectConfig.content.ui`. Treat labels in `projectConfig.navigation` as
approved interface copy. Add form or integration state labels only when those
features exist.

## Page content matrix

{{PAGES}}

For each route record:

| Route/section | Required copy | Required media/data | Source/owner | Status | Blocking gap |
| ------------- | ------------- | ------------------- | ------------ | ------ | ------------ |

Include navigation labels, headings, body copy, actions, empty/error/success states, image alt inputs, and legal or trust content.

## Metadata and structured data inputs

For every indexable route define approved title intent, description intent, canonical ownership, social image and alt, and the factual inputs available for structured data. Do not create schema whose facts are unknown.

## Missing content

List each missing item, owner, affected route, whether implementation can proceed honestly without it, and the fallback state. Placeholders must never look like publishable claims.
