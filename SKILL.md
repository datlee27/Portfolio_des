---
name: portfolio-design-guardian
description: Use whenever designing, generating, or editing any screen, component, copy, or CSS for the owner's developer portfolio (light, lowercase, editorial-minimal style inspired by helloakriti.com layout with a touch of yanxinzhang.com inline media). Forces the agent to read DESIGN.md first, follow its tokens, and self-check against the anti-pattern list before delivering.
---

# Portfolio Design Guardian

## Purpose

Keep every generated design **on-brand and consistent** with `DESIGN.md`. The owner has been burned by
tools that "design wrong": random colors, dark mode, card grids, gradients, uppercase labels, extra
sections. This skill prevents that.

## When to use

Trigger on ANY request touching the portfolio: new page, new section, component, tweak, copywriting,
CSS, Stitch generation, Figma-to-code, responsive fixes, animation.

## Non-negotiable order of operations

1. **Read `DESIGN.md` fully.** Do not start from memory or from other portfolio styles.
2. **Restate the brief in 3 lines** (what screen, what content, which DESIGN.md sections apply).
3. **Plan before building** (see "Plan template").
4. **Build using only tokens from DESIGN.md** (colors, type scale, spacing, radius).
5. **Self-critique against the checklist in DESIGN.md §11 and the prohibitions in §10.**
6. **Deliver + list any deviations or [CONFIRM] items you had to assume.**

If the request conflicts with DESIGN.md → follow DESIGN.md, explain the conflict in one sentence,
and offer the requested alternative as an option. Never silently break the rules.

## Style summary (memorize)

- Light only: cream/warm-white paper `#F6F4EF`, black ink `#111111`. Monochrome. Max one optional accent, ≤2%.
- **All lowercase** typography. Huge left-aligned hero headline. Grotesque sans + occasional mono.
- Layout from helloakriti.com: calm, spacious, pill tags, text-only project rows, one CTA, marquee strip, local-time footer.
- Personality from yanxinzhang.com, in small doses: tiny inline media inside the hero sentence, `*` footnote section titles, `( ◎ )` icon-in-title, `(01.01)` numbering **only** for the skills index, `/26` mark.
- No cards, no shadows, no gradients, no dark mode, no uppercase, no extra sections.
- Developer portfolio: real projects, real stack, GitHub/live links, fast and accessible.

## Plan template (write this before any code or generation)

```
screen/section:
purpose (one job):
tokens used: color / type / spacing / radius
layout concept (ASCII wireframe, left-aligned):
signature element(s) used (from DESIGN.md §5):
the ONE memorable thing on this screen:
what I am deliberately NOT adding:
```

Then ask: *"If I swapped the content for any other portfolio, would this layout look identical?"*
If yes, it is too generic: make one specific choice tied to the owner's developer work.

## Stitch / MCP prompt rules

When sending prompts to Stitch (or any generator), ALWAYS:

1. Paste or attach the **Style summary** above and the relevant `DESIGN.md` sections (tokens + §10 prohibitions).
2. Describe **one screen at a time**. Never "generate the whole website" in one prompt.
3. State explicitly: *light theme, cream background, black text, lowercase typography, no cards, no gradients, no shadows, no uppercase.*
4. Provide **real content** (project names, stack, years, links). Never let it invent lorem ipsum.
5. After generation, **verify against §11**. If it fails any item, regenerate with a corrective prompt that names the failed items. Do not hand-wave.

### Master prompt (copy for Stitch)

```
Design a desktop web page for a developer portfolio. Light theme only: background warm
off-white #F6F4EF, all text black #111111, no other colors. Editorial minimal layout, left-aligned,
very generous whitespace. All text lowercase (except proper nouns like GitHub, Next.js).
Typeface: a clean grotesque sans (Inter Tight / Geist), weight 500 for headings with tight tracking,
400 for body.

Hero: a giant two-line lowercase headline "[headline]", followed by a row of small pill outline tags
([tag1] [tag2] [tag3]), then a large sentence where 2-3 tiny rounded images/icons sit inline
between words, then one black pill button "[cta text]".

Below: "selected work*" section as a list of full-width text rows separated by hairlines:
project name on the left, type + stack in the middle, year on the right. No cards, no thumbnails
in the list. Then a slow marquee strip with "✰" separators. Then "what i do*" with a numbered
skills index (01), (01.01) style. Footer: big "let's work together" CTA, social links, live local time
and timezone, "open to work", copyright.

Do NOT use: dark mode, gradients, shadows, glassmorphism, rounded card grids, uppercase labels,
stock photos, multiple accent colors, emoji icons.
```

(Replace bracketed items with real content before sending.)

## Copy rules (when writing text)

- Lowercase, first person, plain verbs, specific results. No filler words ("passionate", "innovative").
- CTA says exactly what happens: `book a call`, `send an email`.
- Project meta format: `type, stack / year`.
- Never reuse wording from helloakriti.com or yanxinzhang.com.

## Code rules (when producing HTML/CSS/React)

- Define tokens as CSS variables on `:root` (`--paper`, `--ink`, `--ink-muted`, `--line`, spacing scale, type scale via `clamp`).
- No inline hex values outside the token block.
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`), one `h1`.
- Mobile-first; verify at 390px, 768px, 1440px.
- Visible `:focus-visible` outline; respect `prefers-reduced-motion`.
- Images/videos: lazy-load, explicit width/height, `alt` text; muted autoplay loop videos with posters.
- Keep CSS specificity flat (single-class selectors) to avoid cascading conflicts.
- Performance budget: LCP < 2.5s, no layout shift from inline media, total JS minimal.

## Self-check (run every time, report pass/fail)

1. Palette = paper + ink only (+ optional single accent)?
2. All text lowercase except allowed exceptions?
3. Left-aligned, huge hero, pill tags, one CTA?
4. Projects as text rows, not cards?
5. Inline media only in hero sentence, 2–4 items, relevant?
6. Numbering only for the skills taxonomy?
7. No shadows / gradients / dark mode / uppercase?
8. Motion limited to one hero reveal, marquee, hover on rows/buttons?
9. Mobile + accessibility OK?
10. Removed one unnecessary element?

## When to ask the owner instead of guessing

Ask before proceeding if any of these are unknown, and do NOT fabricate:
- Exact font family and exact hex values ([CONFIRM] items in DESIGN.md).
- Whether to use an accent color, and which one.
- Real project list (names, stack, years, links, media).
- Owner's name, headline wording, location/timezone, contact method.
- Whether the "lab/experiments" section is wanted.

## Output format when delivering

1. The result (screen/code).
2. Self-check list (pass/fail).
3. Assumptions made (with the section of DESIGN.md they come from).
4. Open questions for the owner (max 3).
