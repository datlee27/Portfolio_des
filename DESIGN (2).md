# DESIGN.md — Developer Portfolio

> Source of truth for visual design. Any agent (Stitch, Claude, Cursor, etc.) MUST read this file
> before generating or editing any screen, component, or CSS. If a request conflicts with this
> file, follow this file and flag the conflict. Do not improvise outside it.

Items marked **[CONFIRM]** are proposed values that must be verified against the owner's
screenshots / eyedropper values. Do not silently change anything that is NOT marked [CONFIRM].

---

## 1. Concept in one sentence

A calm, light, **editorial-minimal developer portfolio**: oversized lowercase type does the talking,
the layout stays quiet and spacious, and a **small number of inline media moments** (tiny images,
GIFs, icons placed between words) give it personality.

**References (study the *principles*, never copy content, copy text, or assets):**

| Reference | What we take | What we do NOT take |
|---|---|---|
| helloakriti.com | Layout discipline: giant lowercase hero headline, small skill tags around it, text-only project list (name + type + year), one single CTA repeated, scrolling marquee strip, local-time + availability footer, conversational voice | Brand/web-agency positioning, "launch in 2 weeks" sales copy |
| yanxinzhang.com | Inline media inside sentences (tiny image/GIF/icon sitting between words in the hero), `*` footnote markers on section titles, section titles with icon in parentheses `digital ( ◎ ) experiences`, technical numbering `(01.01)` for taxonomies, `/26` year marks, looping video on project items | Heavy full-bleed video everywhere, motion-graphics/3D/experiential positioning |

**Mix ratio: ~75% Akriti structure (calm, static, typographic) + ~25% Yanxin personality (inline media, footnote marks, numbered taxonomy).** If a design feels like Yanxin's page more than Akriti's, it has too much going on — remove.

## 2. Who it is for

- **Owner:** developer / creative developer.
- **Audience:** hiring managers, startup founders, agencies, other developers.
- **Primary job of the site:** make a visitor understand in 5 seconds *what the owner builds*, see 3–6 strong projects, and take **one action** (email / book a call).
- **Developer-specific rule:** proof of craft comes from real projects, tech stack, GitHub/live links, and clean performance — not from decoration.

## 3. Design tokens

### 3.1 Color (light theme only)

Use ONLY these. Do not invent new colors, gradients, or tints.

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F6F4EF` **[CONFIRM]** | Page background (warm white / cream). Never pure `#FFFFFF` for the page. |
| `--paper-raised` | `#FFFFFF` | Only for rare surfaces that must lift off the page (e.g., image frames). Optional. |
| `--ink` | `#111111` **[CONFIRM]** | All primary text, icons, borders, buttons. |
| `--ink-muted` | `#111111` at 55% opacity | Secondary text: years, categories, captions. |
| `--line` | `#111111` at 12% opacity | Hairline dividers between list rows. |
| `--accent` | **none by default** | See rule below. |

**Accent rule:** The base design is monochrome (ink on paper). If the owner later chooses ONE accent
color, it may be used for: link hover, focus ring, and the current availability dot — nothing else.
Max ~2% of the surface. No gradients. No second accent. **[CONFIRM with owner: accent yes/no, which hue]**

Contrast: body text on `--paper` must be ≥ 7:1; muted text ≥ 4.5:1.

### 3.2 Typography

- **One primary typeface** (grotesque/neo-grotesque sans) + **one mono** used sparingly for code/tech details. **[CONFIRM font names from screenshots]**
  - Proposed primary: `Inter Tight` or `Geist` (weights 400, 500, 600).
  - Proposed mono: `Geist Mono` or `JetBrains Mono` (weight 400).
  - Fallback stack: `system-ui, -apple-system, "Segoe UI", sans-serif`.
- **Everything is lowercase** (headings, nav, buttons, labels, section titles, project names). This is the signature of both references.
  - Exceptions: proper nouns in real data that must keep casing (e.g., `GitHub`, `TypeScript`, `iOS`, `Next.js`, acronyms like `API`), email addresses, code.
  - Never use ALL CAPS or tracked-out uppercase eyebrow labels.
- No italics for emphasis, no single-word color/italic accent inside a headline. Headline is one uniform style.

**Type scale** (fluid, `clamp`):

| Role | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| Hero display | `clamp(3.5rem, 11vw, 10rem)` | 500 | 0.92 | -0.04em |
| Hero statement (inline-media sentence) | `clamp(1.75rem, 4.2vw, 3.5rem)` | 500 | 1.08 | -0.02em |
| Section title | `clamp(1.5rem, 3vw, 2.5rem)` | 500 | 1.1 | -0.02em |
| Project row title | `clamp(1.25rem, 2.2vw, 1.75rem)` | 500 | 1.2 | -0.01em |
| Body | `1.0625rem` (17px) | 400 | 1.55 | 0 |
| Meta / caption | `0.875rem` (14px) | 400 | 1.4 | 0 |
| Mono detail | `0.8125rem` (13px) | 400 | 1.4 | 0 |

Body line length: max **65ch**.

### 3.3 Spacing & layout

- Base unit **4px**. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192.
- Page gutter: `24px` mobile, `40px` tablet, `56px` desktop.
- Max content width: **1440px**, centered. Hero may bleed wider than body copy.
- 12-column grid desktop, 4-column mobile. Whitespace is a feature: **section vertical padding 96–192px desktop**, 64–96px mobile.
- **Alignment: left-aligned by default.** Center alignment ONLY for the final CTA block and the marquee. Never justify text.

### 3.4 Shape, borders, shadow

- Border radius: **`0` for layout and text; `999px` (pill) only for tags and buttons; `12px` for media frames.** Do not mix other radii.
- Borders: 1px hairline `--line`. No thick borders.
- **No shadows. No glassmorphism. No gradients. No blur backgrounds.**
- Cards: avoid. Project list is rows, not a grid of identical rounded cards.

## 4. Page structure (home)

```
┌──────────────────────────────────────────────────────────┐
│ name                     work  about  lab/notes  [email] │  ← nav, small, sticky, no bg box
├──────────────────────────────────────────────────────────┤
│                                                          │
│   building                                               │  ← hero display, lowercase, huge
│   things for the web                                     │
│                                                          │
│   [react] [node] [webgl] [design systems]                │  ← small pill tags
│                                                          │
│   i'm <name>, a developer [img] who builds fast,         │  ← statement with INLINE MEDIA
│   careful interfaces [gif] and the systems [icon]        │     (max 3-4 items)
│   behind them.                                           │
│                                                          │
│   [ book a call ]                                        │  ← the ONE primary CTA
├──────────────────────────────────────────────────────────┤
│ selected work*                                           │
│ *projects that shipped.                                  │
│ ──────────────────────────────────────────────────────── │
│ project name          type · stack            2026       │  ← text rows; hover reveals preview
│ ──────────────────────────────────────────────────────── │
│ project name          type · stack            2025       │
├──────────────────────────────────────────────────────────┤
│ ✰ open to work ✰ shipped fast ✰ clean code ✰ …          │  ← marquee strip (slow)
├──────────────────────────────────────────────────────────┤
│ what i do*                                               │
│ (01) frontend      (01.01) react  (01.02) next.js ...    │  ← numbered taxonomy (Yanxin)
│ (02) backend       (02.01) node   (02.02) postgres ...   │
│ (03) creative dev  (03.01) webgl  (03.02) motion ...     │
├──────────────────────────────────────────────────────────┤
│ experiments (lab)                                        │  ← optional scroll strip of 3:4 images/demos
├──────────────────────────────────────────────────────────┤
│ let's work together                                      │
│ [ book a call ]   email · github ↗ · linkedin ↗          │
│ city  10:13:26 pm [gmt +7]     2026. name                │  ← local time + availability
└──────────────────────────────────────────────────────────┘
```

## 5. Signature elements (use all, each only once per page unless noted)

1. **Giant lowercase hero headline** — the single most memorable element. Everything else stays quiet.
2. **Inline media in sentence** — in the hero statement only, place 2–4 tiny media items (≈1em tall, rounded `12px`, or pill) *between words*: a photo of the owner, a short looping GIF/video of a project, a small icon. They must be relevant to the owner (project thumbnail, tool logo, face), never stock/decorative.
3. **Skill tags** — small pill outlines (1px `--ink`), lowercase, around/under the hero.
4. **Text-only project list** — row: `name` · `type + stack` · `year`. Hover: row shifts/underlines and a preview (image or looping video) follows the cursor or appears at right. No card grid.
5. **`*` footnote on section titles** — e.g., `selected work*` with a one-line italic-free caption below starting with `*`. Used on at most 3 sections.
6. **Icon-in-parentheses section title** — e.g., `digital ( ◎ ) experiences`. Max 1–2 per page.
7. **Numbered taxonomy `(01)` / `(01.01)`** — ONLY for the skills/services index, where numbering encodes a real hierarchy. Never number decorative sections.
8. **Marquee strip with `✰`** separators — one strip, slow, pauses on hover and respects reduced motion.
9. **Year/edition mark** — `/26` near footer or logo.
10. **Local time + availability** in footer — live clock + timezone (`gmt +7`) + "open to work / booking projects for q4 2026".
11. **One CTA** — every button leads to the same action (book a call / email). No competing CTAs.

## 6. Components

### Nav
- Left: name or short monogram (lowercase). Right: 3–4 text links + one pill CTA.
- Transparent over `--paper`, no border box, no shadow. Sticky with `--paper` at 80% only after scroll.

### Button
- Primary: pill, `--ink` background, `--paper` text, 14–16px, padding `12px 24px`. Hover: invert (paper bg, ink text, 1px ink border), 200ms ease-out.
- Secondary: text link with underline (1px, offset 4px). No arrow glyph appended by default.

### Tag
- Pill, 1px `--ink` border, transparent bg, 13–14px text, padding `6px 14px`. Non-interactive unless filtering.

### Project row
- Full-width, top and bottom hairline. Grid: `title (5 cols) | meta (5 cols) | year (2 cols, right-aligned)`.
- Mobile: title on top, meta and year beneath, preview thumbnail shown inline (no hover).

### Media frame
- Radius `12px`, `object-fit: cover`, no border, no shadow. Videos autoplay muted loop playsinline, lazy-loaded, with poster image.

### Footer
- Large CTA, link list, clock, copyright. Lowercase.

## 7. Motion

Principle: **one orchestrated moment, then calm.**

- Page load: hero headline reveals once (line-by-line mask or soft translate ≤ 24px, 600–800ms, `cubic-bezier(.2,.7,.2,1)`). Nothing else auto-animates except the marquee and inline GIFs.
- Hover: project row preview + underline only. Buttons invert. No hover transitions on every element.
- Do NOT add scroll-triggered fade-up on every section.
- Respect `prefers-reduced-motion`: disable marquee, GIF autoplay, and reveal.
- Never exceed 800ms; never bounce/elastic.

## 8. Voice & copy

- Lowercase, first person, conversational, specific. Short sentences.
- Say what is built and the result. No buzzwords ("passionate", "innovative", "cutting-edge", "synergy").
- CTA text is literal: `book a call`, `send an email`, `view project`.
- Project meta is factual: `web app, next.js, postgres / 2026`.
- Placeholder copy must be realistic and developer-relevant, never lorem ipsum.

## 9. Responsive

- Breakpoints: 640 / 1024 / 1440.
- Mobile: hero display scales via clamp; inline media shrink to ≈0.9em; nav collapses to `menu` text link (not hamburger icon); tags wrap; project rows stack; marquee stays.
- Touch targets ≥ 44px. Keyboard focus visible: 2px `--ink` outline, 3px offset.

## 10. Hard prohibitions (anti-patterns — "do not design wrong")

- ❌ Dark mode / black backgrounds (this is a light-only design).
- ❌ Gradients, glow, neon, glassmorphism, drop shadows, blobs, 3D mockup frames.
- ❌ Grid of identical rounded cards for projects, "SaaS card kit", feature-icon grids.
- ❌ ALL CAPS labels, tracked-out eyebrow text above every heading.
- ❌ Highlighting one word of a headline in a color/italic.
- ❌ Purple/blue AI gradient palettes; terracotta/clay accent; multi-color palettes.
- ❌ Stock photos, emoji as icons, generic illustration packs.
- ❌ More than one primary CTA; sticky banners; popups; cookie-style overlays.
- ❌ Hamburger icon on desktop; mega-menus; sidebars.
- ❌ Centered long-form text; justified text; text over busy imagery without scrim.
- ❌ Numbering decorative sections (`01 / 02 / 03`) — only real taxonomies.
- ❌ Adding sections not listed in §4 without owner approval.
- ❌ Copying text, images, project names, or brand assets from the reference sites.

## 11. Acceptance checklist (agent must self-check before delivering)

- [ ] Background is `--paper`, text is `--ink`; no other colors present (except optional single accent).
- [ ] All visible text lowercase (except allowed proper nouns/acronyms/emails).
- [ ] Hero is oversized, left-aligned, 2 lines max, with pill tags and an inline-media sentence.
- [ ] Inline media count in hero statement is 2–4 and each is relevant.
- [ ] Projects shown as text rows with year; no card grid.
- [ ] Exactly one primary CTA action repeated consistently.
- [ ] Numbering used only in the skills taxonomy.
- [ ] No shadows, gradients, or blur.
- [ ] Footer has local time + availability.
- [ ] Mobile layout checked at 390px; focus states visible; reduced motion respected.
- [ ] Removed one decorative element before finalizing ("take one accessory off").
