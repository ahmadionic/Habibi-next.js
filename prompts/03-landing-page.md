# Group 3 — Landing Page Prompts (Feature 1)

**Do not start until Group 2 is fully checked off.**
Scope: only modify `/src/app/(marketing)/page.tsx` and new files under `/src/components/sections/`. Do not touch SiteNav, SiteFooter, or any other feature's files.

---

## Prompt 3.1 — Hero section

```
Read /THEME_GUIDE.md sections 2, 3, 5, and 7 for all visual/motion decisions.
Read /FEATURE_SRS.md section 2 (Feature 1 — Landing Page) for the exact content/copy requirements.
Do not modify any files outside /src/components/sections/HeroSection.tsx and /src/app/(marketing)/page.tsx.

Build a HeroSection component for the homepage:
1. Headline "Welcome HABibi" in font-heading, very large (text-5xl+), deep-pine color, centered or left-aligned with a soft watercolor-style background (use a cream-to-sand gradient with subtle texture, since we don't have a real watercolor image asset yet — described in THEME_GUIDE.md section 5).
2. A short paraphrased explanation (2-3 sentences, NOT a verbatim copy of any source text) of what "Habibi" and "HAB" (Human Animal Bond) mean, written in your own words based on FEATURE_SRS.md section 2, in font-body.
3. One supporting "stat callout" line about the wellbeing impact of human-animal connection (paraphrased, no direct quotes, no citation needed on the page itself).
4. A primary BrandButton "Begin Your Journey" linking to an anchor on the page (#pillars, which we'll build next) or to /about.
5. Entrance animation: headline and subtext fade up in a staggered sequence (use motion tokens + staggerChildren from /src/lib/motion.ts).
6. Add small decorative leaf/heart accents using lucide-react icons (Leaf, Heart) positioned subtly in the corners, sage/rosewood colored, low opacity — purely decorative, aria-hidden.

Place this as the first section in /src/app/(marketing)/page.tsx.
```

### Test Prompt 3.1
```
Visit localhost:3000 and confirm the hero section displays "Welcome HABibi" prominently, with the supporting paragraph and a working "Begin Your Journey" button, with a staggered fade-up animation on page load.
```

### Expected Result 3.1
- Hero renders with correct copy tone (warm, not copied verbatim from any source).
- Animation plays once on load, staggered.
- Button is clickable and styled per BrandButton primary variant.
- No console errors, no layout overflow on mobile.

---

## Prompt 3.2 — Pillar cards (3 services + shop)

```
Read /THEME_GUIDE.md sections 2, 6, and 7. Read /FEATURE_SRS.md section 2 (pillar cards list) and section 1 (sitemap routes).
Do not modify files outside /src/components/sections/PillarCards.tsx and the homepage file.

Build a PillarCards section with id="pillars" (so the hero's anchor link works):
1. A SectionEyebrow ("EXPLORE HABIBI ♡") + heading "Find Your Path" (font-heading).
2. A 4-column grid (per THEME_GUIDE.md section 8 responsive rules: 4-col desktop → 2-col tablet → 1-col mobile) of BrandCard components, one each for:
   - "HABibi for Homes" (pet portraits) → /portraits, icon: a paw/heart
   - "HABibi for Children & Teens" (education) → /education, icon: a book/feather
   - "HABibi for Health & Growth" (workshops) → /workshops, icon: a palette/leaf
   - "Shop the Collection" → /shop, icon: a small bag
3. Each card: icon at top (sage colored, inside a soft circular sand-colored background), title (font-heading, deep-pine), one-line description (font-body, ink-soft), small "Explore →" link styled in terracotta.
4. Each card fades up into view on scroll (stagger by index) using the FadeIn wrapper, and lifts slightly with shadow-hover on hover.

Add this section directly below the Hero on the homepage.
```

### Test Prompt 3.2
```
Scroll to the pillar cards section, resize to mobile and tablet widths, and confirm the grid reflows from 4 to 2 to 1 columns correctly. Click each card and confirm it navigates to the correct route (even if that route is currently a 404 — we haven't built those pages yet, that's expected).
```

### Expected Result 3.2
- 4 cards render with correct titles/icons/links.
- Grid is responsive per the breakpoints described.
- Hover lift + shadow change works.
- Clicking links navigates correctly (404s for not-yet-built pages are fine at this stage).

---

## Prompt 3.3 — Brand values strip

```
Read /THEME_GUIDE.md section 1 (brand values list — use these exact 4 values and descriptions) and sections 2, 4, 6, 7.
Do not modify files outside /src/components/sections/BrandValuesStrip.tsx and the homepage file.

Build a BrandValuesStrip section reusing the visual pattern from the brand book ("OUR BRAND VALUES" row):
1. SectionEyebrow "OUR BRAND VALUES ♡" centered.
2. A 4-column grid (responsive per THEME_GUIDE.md section 8) of simple icon+title+description blocks (lighter weight than the pillar cards — no card border/shadow needed, just icon, bold small title, small description), using the exact 4 values and copy from THEME_GUIDE.md section 1:
   - Fine Art & Creativity (palette icon)
   - Animal Connection (paw icon)
   - Well-being & Healing (heart icon)
   - Education & Growth (open book icon)
3. Use a sand or linen colored section background to visually separate this from the cream pillar-cards section above it (alternating section backgrounds per THEME_GUIDE.md section 6 spacing rules).
4. Subtle fade-in stagger animation as the section scrolls into view.

Add below PillarCards on the homepage.
```

### Test Prompt 3.3
```
Confirm this section has a visually distinct (slightly different) background color from the section above and below it, and that all 4 brand values display with their icons, matching the wording in THEME_GUIDE.md exactly.
```

### Expected Result 3.3
- 4 values render with exact copy from THEME_GUIDE.md section 1.
- Background color alternates appropriately (e.g., sand/linen vs cream).
- Responsive grid behaves correctly.

---

## Prompt 3.4 — Stat callout section

```
Read /THEME_GUIDE.md sections 2, 3, 7. Read /FEATURE_SRS.md section 2 for the stat callout requirement.
Do not modify files outside /src/components/sections/StatCallout.tsx and the homepage file.

Build a single full-width StatCallout banner section:
1. Deep-pine or forest background, cream/white text.
2. A large number/stat (font-heading, very large) — paraphrase a believable wellbeing statistic in your own words (e.g., something like "Studies show meaningful interaction with animals measurably reduces stress and anxiety" framed with a number if natural, but do NOT fabricate a specific percentage/number that isn't grounded in the FEATURE_SRS.md description — if unsure, present it as a qualitative impact statement rather than inventing a precise statistic).
3. A short supporting sentence in font-body below it.
4. Center-aligned, generous vertical padding, gentle fade-in animation.

Place this between BrandValuesStrip and the next section on the homepage.
```

### Test Prompt 3.4
```
Confirm the stat callout section is visually striking (dark background, large light text), doesn't contain any fabricated/fake-sounding precise statistics, and fades in smoothly on scroll.
```

### Expected Result 3.4
- Section renders with correct dark brand colors and contrast-safe light text.
- Copy is paraphrased and honest (no invented fake percentages).
- Animation plays correctly.

---

## Prompt 3.5 — Newsletter signup + final CTA

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7.
Do not modify files outside /src/components/sections/FinalCTA.tsx and the homepage file.

Build a final CTA section before the footer:
1. Cream background, centered content.
2. Heading "Ready to Begin?" (font-heading) + one supporting sentence.
3. A primary BrandButton "Book a Consultation" linking to /book.
4. (We already have a newsletter input in the footer from Group 2 — do not duplicate it here, just the CTA button and heading.)
5. Soft fade-up animation on scroll.

Add this as the last section on the homepage, directly above where SiteFooter renders (footer itself is in the layout, not this file).

Finally, show me the complete /src/app/(marketing)/page.tsx file with all 5 sections in correct order: Hero, PillarCards, BrandValuesStrip, StatCallout, FinalCTA.
```

### Test Prompt 3.5
```
Do a full top-to-bottom scroll through localhost:3000 and confirm all 5 sections appear in the correct order, all animations trigger once on scroll without retriggering oddly, and the page works correctly on both desktop and mobile widths with no layout bugs.
```

### Expected Result 3.5
- Full homepage flows: Nav → Hero → Pillar Cards → Brand Values → Stat Callout → Final CTA → Footer.
- No layout shift, no animation glitches, responsive at all breakpoints.
- This is your first fully-built page — take a screenshot for your own reference before moving on.

---

✅ **Group 3 complete.** Move to `/prompts/04-portraits-page.md`. Before starting Group 4, make sure you've completed `00_ASSET_PLACEHOLDERS.md` for the `/portraits` images.
