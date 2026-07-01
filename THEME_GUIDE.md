# HABibi by Claire Olivier — THEME GUIDE (Master Reference)

> **Placement:** Save this file at the project ROOT as `/THEME_GUIDE.md`.
> **Rule for every prompt in this kit:** start each AI prompt with the line
> `Read and strictly follow /THEME_GUIDE.md for every color, font, spacing, and motion choice in this task.`
> This is the single source of design truth. Never let the AI invent colors or fonts that aren't listed here.

---

## 1. Brand Essence

- **Brand name:** Claire Olivier — "HABibi" (Human Animal Bond)
- **Tagline:** "Where Art, Animals and Well-being Create Connection and Healing."
- **Feel:** classic, nurturing, luxury, animated-but-calm, editorial — think a high-end wellness/atelier brand, NOT a flat corporate SaaS look.
- **Brand values (use as section anchors across the site):**
  1. **Fine Art & Creativity** — celebrating imagination, expression, and the beauty of art.
  2. **Animal Connection** — building trust, empathy, and unconditional bonds.
  3. **Well-being & Healing** — supporting emotional well-being, growth, and inner balance.
  4. **Education & Growth** — inspiring learning, curiosity, and personal development.

---

## 2. Color System (exact hex — never deviate)

### Primary Colors (use for headers, nav, primary CTAs, dark sections)
| Name | Hex | Usage |
|---|---|---|
| `sage` | `#8D9C7A` | accents, icon fills, hover states |
| `forest` | `#5E6F52` | secondary headings, borders, buttons (hover) |
| `deep-pine` | `#334B3A` | primary CTA buttons, nav text, footer background |

### Secondary Colors (backgrounds, cards, soft sections)
| Name | Hex | Usage |
|---|---|---|
| `cream` | `#F7F3EC` | page background (default) |
| `sand` | `#DCC8A6` | section background alternation, badges |
| `linen` | `#E7DCC8` | card backgrounds, dividers |

### Accent Colors (use sparingly — CTAs, highlights, badges, hover glows)
| Name | Hex | Usage |
|---|---|---|
| `terracotta` | `#B37352` | primary accent CTA (e.g., "Book Now") |
| `umber` | `#8C6A54` | secondary accent, icon strokes |
| `rosewood` | `#B98D87` | decorative highlights, heart icon, hover underline |

### Functional / Neutral (not in brand book — engineered to match the palette; do not change)
| Name | Hex | Usage |
|---|---|---|
| `ink` | `#2B2B26` | body text on cream backgrounds |
| `ink-soft` | `#5C5C54` | secondary/muted text |
| `white` | `#FFFFFF` | text on dark backgrounds, cards on dark sections |
| `success` | `#6B8F5C` | form success states |
| `error` | `#B3543F` | form error states (kept warm, not a harsh red) |
| `border-soft` | `#E2D9C8` | hairline borders, input borders |

**Rule:** Every gradient, glow, or shadow color used anywhere in the UI must be derived from this table (e.g., `rgba(141,156,122,0.15)` for a sage glow). No blues, no purples, no saturated reds anywhere.

---

## 3. Typography System

| Role | Font | Source | Usage |
|---|---|---|---|
| **Heading font** | `Cormorant Garamond` | Google Fonts | All H1–H3, hero headlines, logo wordmark |
| **Body font** | `Montserrat` | Google Fonts | All paragraph text, nav links, buttons, forms, UI labels |
| **Accent / script font** | `Allura` | Google Fonts | Taglines, pull-quotes, signature-style flourishes ONLY — never for body or buttons |

**Type scale (Tailwind-style rem scale — implement as CSS variables):**
```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.375rem;
--text-2xl: 1.75rem;
--text-3xl: 2.25rem;
--text-4xl: 3rem;
--text-5xl: 3.75rem;     /* hero headline */
--text-script: 2.25rem;  /* Allura tagline size */
```

**Rules:**
- H1/H2 always set in Cormorant Garamond, normal weight or 500, generous letter-spacing on all-caps eyebrows (e.g., `letter-spacing: 0.18em` for "BRAND IDENTITY"-style labels).
- Body copy is ALWAYS Montserrat — never Libre Baskerville (Libre Baskerville is a legacy secondary font shown in early brand sheets but the final brand book typography page supersedes it with Montserrat as body font — use Montserrat).
- Allura is reserved for short emotional lines only (max ~8 words), e.g. "Create Connection and Healing."

---

## 4. Logo & Iconography

- Primary logo: circular badge — illustrated woman embracing a cat and golden retriever, ringed text "ANIMAL THERAPY & EDUCATION", wordmark "CLAIRE OLIVIER" in Cormorant Garamond, sub-line "ART & WELLBEING" in small-caps Montserrat with leaf flourishes.
- Logo files referenced in prompts as `/public/assets/logo/` — see `00_ASSET_PLACEHOLDERS.md`.
- Icon style: thin-line, single-color (sage or forest), botanical/leaf accents wrapping each icon — used for the 4 brand value icons (palette, paw, heart, open book).
- Decorative motifs: thin gold (`#C9A35A` — engineered gold, used ONLY as a 1px decorative line/sparkle color, never as a fill) hairline dividers, small heart glyph (♡) as a section separator, trailing leaf branches in page corners on marketing pages only (not in app/dashboard UI).

---

## 5. Imagery Style

- Warm, editorial, watercolor-wash backgrounds behind hero sections on marketing pages.
- Portrait photography: soft natural light, warm tones, animals + people together.
- Illustration style for icons/logo: fine-line watercolor/ink botanical, muted earth tones only.
- Product mockups (mugs, totes, journals, cards) use cream/sage palette consistently.

---

## 6. Spacing, Radius & Elevation

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-pill: 999px;

--space-1: 4px;
--space-2: 8px;
--space-3: 16px;
--space-4: 24px;
--space-5: 32px;
--space-6: 48px;
--space-7: 64px;
--space-8: 96px;

--shadow-soft: 0 4px 20px rgba(51,75,58,0.08);
--shadow-card: 0 8px 30px rgba(51,75,58,0.10);
--shadow-hover: 0 12px 40px rgba(179,115,82,0.15); /* terracotta-tinted on hover */
```

- Cards: `radius-lg`, `shadow-card`, 1px `border-soft` border, cream or white background.
- Buttons: `radius-pill` for primary CTAs, `radius-md` for secondary/ghost buttons.
- Section vertical rhythm: `space-7`–`space-8` between major sections on desktop, `space-5` on mobile.

---

## 7. Motion / Animation (Framer Motion conventions)

All animation must feel **gentle, organic, and luxury** — never bouncy, never abrupt.

```ts
// Standard easing + duration tokens — reuse everywhere
export const motionTokens = {
  ease: [0.22, 1, 0.36, 1], // soft "easeOutExpo"-like
  duration: { fast: 0.25, base: 0.45, slow: 0.8 },
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
  },
  staggerChildren: 0.08,
};
```

- Hero sections: fade-up + slight scale on load, staggered by ~80ms per child.
- Cards: fade-up on scroll into view (`whileInView`, `viewport={{ once: true }}`).
- Buttons: subtle scale (1 → 1.03) + shadow glow on hover, 200ms.
- Page transitions: simple cross-fade, 300–400ms, no jarring slides.
- Decorative leaf/heart motifs may have a very slow (8–12s) parallax drift — optional, low priority, must never distract from content or hurt performance.
- Respect `prefers-reduced-motion`: every animation must have a reduced-motion fallback (opacity-only, no transforms).

---

## 8. Responsiveness Rules

- Mobile-first. Breakpoints (Tailwind defaults): `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`, `2xl:1536px`.
- Nav collapses to a hamburger + slide-in drawer below `lg`.
- All grids (e.g., 4-icon brand values row, product grids) collapse: 4-col desktop → 2-col tablet → 1-col mobile.
- Touch targets minimum 44x44px on mobile.
- Hero images crop intelligently (object-position: top) on narrow screens; never stretch.

---

## 9. Voice & Microcopy Tone

- Warm, first-person where appropriate ("I support wellbeing..."), never corporate-cold.
- CTA verbs: "Book a Consultation", "Explore the Collection", "Begin Your Journey", "Meet Miss Claire" — avoid generic "Submit"/"Click Here".
- Section eyebrows are ALL CAPS, small, wide letter-spacing, sage or forest color, Montserrat.

---

## 10. File/Token Naming Convention (for Tailwind config + CSS variables)

Use these exact token names in `tailwind.config.ts` so every prompt in this kit stays consistent:

```ts
colors: {
  sage: '#8D9C7A',
  forest: '#5E6F52',
  'deep-pine': '#334B3A',
  cream: '#F7F3EC',
  sand: '#DCC8A6',
  linen: '#E7DCC8',
  terracotta: '#B37352',
  umber: '#8C6A54',
  rosewood: '#B98D87',
  ink: '#2B2B26',
  'ink-soft': '#5C5C54',
  success: '#6B8F5C',
  error: '#B3543F',
  'border-soft': '#E2D9C8',
}
```

---

**Every prompt in `03_prompts/` must reference this file by saying:**
`"Strictly use the color tokens, type scale, spacing, and motion tokens defined in /THEME_GUIDE.md. Do not introduce new colors or fonts."`
