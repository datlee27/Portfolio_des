---
name: design-system-creatie-creative-designer-portfolio
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

# Creatie® – Creative Designer Portfolio

## Mission
Deliver implementation-ready design-system guidance for Creatie® – Creative Designer Portfolio that can be applied consistently across e-commerce storefront interfaces.

## Brand
- Product/brand: Creatie® – Creative Designer Portfolio
- URL: https://significant-advocate-879387.framer.app/#footer
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=Mona Sans`, `font.family.stack=Mona Sans, Mona Sans Placeholder, sans-serif`, `font.size.base=24px`, `font.weight.base=600`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=10px`, `font.size.sm=11.18px`, `font.size.md=12px`, `font.size.lg=13.41px`, `font.size.xl=14px`, `font.size.2xl=16px`, `font.size.3xl=18px`, `font.size.4xl=18.6px`
- Color palette: `color.surface.base=#000000`, `color.text.secondary=#252525`, `color.text.tertiary=#ffffff`, `color.text.inverse=#272727`, `color.surface.raised=#222222`
- Spacing scale: `space.1=12px`, `space.2=24px`, `space.3=40px`
- Radius/shadow/motion tokens: `radius.xs=12px`, `radius.sm=15px`, `radius.md=16px`, `radius.lg=16.08px`, `radius.xl=18px` | `shadow.1=rgba(0, 0, 0, 0.16) 0px 2.87077px 19.2916px 0px`, `shadow.2=rgba(0, 0, 0, 0.12) 7px 6px 0px 0px`, `shadow.3=rgba(255, 255, 255, 0.45) 0px 1px 0.5px 0px inset, rgba(255, 255, 255, 0.08) 0px -1px 0.5px 0px inset, rgba(0, 0, 0, 0.25) 0px 8px 24px -6px`, `shadow.4=rgba(0, 0, 0, 0.15) 0px 6px 10px 0px`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.
