# Group 1 — Design System Prompts

**Do not start this group until Group 0 is fully checked off.**
Every prompt below starts with the two mandatory reference lines — keep them every time.

---

## Prompt 1.1 — Configure Tailwind theme tokens

```
Read and strictly follow /THEME_GUIDE.md section 2 (Color System) and section 10 (Token Naming Convention) for this task.
Read /FEATURE_SRS.md section 0 for tech stack confirmation.

In tailwind.config.ts, add the exact custom color tokens listed in THEME_GUIDE.md section 10 to the theme.extend.colors object — do not rename any of them, do not add extra colors.

Also extend theme.extend.borderRadius using the radius tokens from THEME_GUIDE.md section 6 (sm: 6px, md: 12px, lg: 20px, pill: 9999px — name the pill one "full" if that's the Tailwind convention, but document the mapping in a comment).

Show me the final tailwind.config.ts file.
```

### Test Prompt 1.1
```
Create a temporary test page at /src/app/color-test/page.tsx that renders a small swatch (a div with text) for every single custom color token, labeled with its name and hex code, so I can visually verify them in the browser.
```

### Expected Result 1.1
- Visiting `localhost:3000/color-test` shows 13 labeled color swatches matching the THEME_GUIDE.md table exactly (sage, forest, deep-pine, cream, sand, linen, terracotta, umber, rosewood, ink, ink-soft, success, error, border-soft).
- Colors visually match the brand book (sage/forest greens, warm creams, terracotta/rosewood accents — no blues or purples anywhere).

---

## Prompt 1.2 — Add Google Fonts

```
Read /THEME_GUIDE.md section 3 (Typography System) for the exact font requirements.

Using next/font/google, add these three fonts to the root layout (/src/app/layout.tsx):
1. Cormorant Garamond — weights 400, 500, 600 — variable name --font-heading
2. Montserrat — weights 400, 500, 600, 700 — variable name --font-body
3. Allura — weight 400 — variable name --font-script

Apply the font variables to the <html> or <body> tag's className. Then in tailwind.config.ts, map these CSS variables into theme.extend.fontFamily as `heading`, `body`, and `script`, with sensible fallback stacks (serif fallback for heading/script, sans-serif fallback for body).

Update the /color-test page from the previous step to also show one line of text in each of the three fonts so I can verify them.
```

### Test Prompt 1.2
```
Reload /color-test and confirm the three font samples render in visually distinct typefaces: an elegant serif (Cormorant Garamond) for heading, a clean sans-serif (Montserrat) for body, and a flowing script (Allura) for the accent line.
```

### Expected Result 1.2
- Three visually distinct fonts render correctly with no fallback-only system fonts.
- No console errors about font loading.
- `tailwind.config.ts` has `fontFamily: { heading: [...], body: [...], script: [...] }`.

---

## Prompt 1.3 — Global CSS variables + base styles

```
Read /THEME_GUIDE.md sections 2, 6, and 9 for this task.

In /src/app/globals.css:
1. Set the default page background to the cream token and default text color to the ink token, applied to body.
2. Set default heading styles (h1-h3 use font-heading; h4-h6 can use font-body with font-weight 600) globally via @layer base.
3. Add a reusable ".eyebrow" utility class (per THEME_GUIDE.md section 9: all-caps, small, wide letter-spacing 0.18em, sage or forest color, font-body, font-weight 600).
4. Add the shadow tokens from THEME_GUIDE.md section 6 as Tailwind boxShadow extensions in tailwind.config.ts (shadow-soft, shadow-card, shadow-hover) rather than raw CSS, so they're usable as `shadow-card` etc. in className.
5. Make sure smooth scrolling is enabled (html { scroll-behavior: smooth }) but respect prefers-reduced-motion by disabling smooth scroll for users with that preference set.

Show me the final globals.css and the boxShadow section of tailwind.config.ts.
```

### Test Prompt 1.3
```
On the /color-test page, add a small example of the ".eyebrow" class with the text "BRAND VALUES", and three boxes demonstrating shadow-soft, shadow-card, and shadow-hover so I can see the difference.
```

### Expected Result 1.3
- Default page background is the warm cream color, not white.
- The eyebrow text renders in small caps style, wide letter spacing, sage/forest color.
- Three visibly different shadow depths render correctly.

---

## Prompt 1.4 — Framer Motion tokens file

```
Read /THEME_GUIDE.md section 7 (Motion/Animation) carefully.

Create /src/lib/motion.ts that exports the exact motionTokens object shown in THEME_GUIDE.md section 7 (ease curve, durations, fadeUp/fadeIn/scaleIn variants, staggerChildren value), written in valid TypeScript using Framer Motion's `Variants` type where appropriate.

Also create a small reusable wrapper component at /src/components/layout/FadeIn.tsx that:
- Accepts children and an optional `variant` prop ("fadeUp" | "fadeIn" | "scaleIn", default "fadeUp")
- Uses framer-motion's `motion.div` with `whileInView` triggered once, using the matching variant from motion.ts
- Automatically respects prefers-reduced-motion (if the user prefers reduced motion, skip the transform/opacity animation and just render children directly using Framer Motion's useReducedMotion hook).

Show me both files.
```

### Test Prompt 1.4
```
On the /color-test page, wrap one of the shadow demo boxes in <FadeIn> and confirm it fades up smoothly into view when you scroll to it. Then describe what would happen if a user has "reduce motion" enabled in their OS settings.
```

### Expected Result 1.4
- The wrapped box fades up smoothly (opacity 0→1, y 24→0) using the easing curve from THEME_GUIDE.md, only once, when scrolled into view.
- The AI confirms reduced-motion users will see the content appear without the slide/fade transform (instant or opacity-only).

---

## Prompt 1.5 — Core UI primitives

```
Read /THEME_GUIDE.md sections 2, 3, 6, and 9 for all visual decisions in this task. Do not invent new colors, fonts, radii, or shadows.

Build these reusable components in /src/components/ui/ (extending shadcn's base Button where sensible rather than replacing it):

1. A "BrandButton" wrapper around shadcn's Button with two custom variants:
   - "primary": deep-pine background, cream text, radius-pill (fully rounded), shadow-soft default → shadow-hover + scale 1.03 on hover (framer-motion), font-body font-weight 600.
   - "accent": terracotta background, white text, same shape/motion behavior as primary.
   Both should support an optional leading or trailing lucide-react icon prop.

2. A "BrandCard" component: cream or white background, radius-lg, border border-soft, shadow-card default → shadow-hover on hover, padding using the space tokens, optional `as` prop to render as a Link.

3. A "SectionEyebrow" component: renders the eyebrow CSS class text with an optional small heart "♡" glyph after it, exactly matching the visual style described in THEME_GUIDE.md section 4 (decorative motifs).

4. A "Badge" component for things like "P0", package names, or category tags: small pill shape, sand/linen background, ink-soft text, font-body, small text size.

Add all 4 to the /color-test page as a live demo so I can see them rendered together.
```

### Test Prompt 1.5
```
Visit /color-test and confirm: a primary button, an accent button, a card with hover shadow, a "BRAND VALUES ♡" eyebrow line, and a badge are all visible and styled correctly. Hover over both buttons and the card to confirm the hover animations work.
```

### Expected Result 1.5
- All 4 components render with correct brand colors/fonts/shapes.
- Hover states animate smoothly (scale + shadow change) on buttons and card.
- No layout shift or console errors.

---

✅ **Group 1 complete.** You can now delete the `/color-test` page (optional) or keep it for future reference. Move to `/prompts/02-layout-nav-footer.md`.
