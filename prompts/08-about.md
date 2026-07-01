# Group 8 — About Page Prompts (Feature 6)

**Do not start until Group 7 is fully checked off AND about-page images are placed.**
Scope: only modify `/src/app/(marketing)/about/page.tsx` and new files under `/src/components/about/`. Reuse CTABanner from Group 4.

---

## Prompt 8.1 — Bio section + portrait imagery

```
Read /THEME_GUIDE.md sections 2, 3, 5, 6, 7 and /FEATURE_SRS.md section 7 (Feature 6 — About).
Do not modify files outside /src/app/(marketing)/about/page.tsx and /src/components/about/BioSection.tsx.

1. Use PageHero: eyebrow "ABOUT", title "Meet Claire Olivier", subtitle script "Artist. Educator. Animal Advocate.", backgroundImage /assets/about/claire-bio.jpg, no CTA needed here.
2. Build BioSection: an editorial-style two/three-image collage (use /assets/about/claire-bio.jpg, claire-falcon.jpg, claire-cat-collage.jpg arranged in an offset/overlapping layout with soft shadows, similar to the brand book's photo collage style) on one side, and an expanded bio paragraph on the other side that builds on (but doesn't duplicate verbatim) the credential facts already established on the Education page (26 years experience, multiple countries, C-AAIS, MA.Inc Ed) — written here in first-person voice ("I believe...", "My work is guided by...") to feel more personal than the Education page's third-person version.

Show me the section.
```

### Test Prompt 8.1
```
Visit localhost:3000/about and confirm the hero and bio/collage section render correctly, with first-person voice copy that complements (without exactly repeating) the Education page's credential block.
```

### Expected Result 8.1
- Hero + bio section render correctly, responsive.
- Voice is first-person and feels distinct from the Education page's third-person tone, while staying factually consistent.

---

## Prompt 8.2 — Mission statement + pull-quote

```
Read /THEME_GUIDE.md sections 2, 3, 7 and /FEATURE_SRS.md section 7 (mission statement and pull-quote: "Every soul deserves to be seen. Every connection has the power to heal.").
Do not modify files outside /src/components/about/MissionStatement.tsx and the about page file.

Build a MissionStatement section:
1. Centered, generous padding, sand or linen background.
2. A mission paragraph paraphrasing FEATURE_SRS.md section 7's mission statement (animal therapy + education + art supporting wellbeing, understanding, and growth for people and animals, guided by compassion and creativity) — original phrasing.
3. Below it, render the pull-quote "Every soul deserves to be seen. Every connection has the power to heal." in font-script (Allura), large size, rosewood or deep-pine color, with a small heart "♡" accent — this exact phrase IS the brand's own tagline-style line (short, brand-owned, safe to use as-is, unlike longer prose which we paraphrase).

Add below BioSection.
```

### Test Prompt 8.2
```
Confirm the mission statement section renders with paraphrased mission copy and the pull-quote displayed prominently in the Allura script font.
```

### Expected Result 8.2
- Section renders correctly with the script-font pull-quote clearly legible and on-brand.
- Mission paragraph is original phrasing while staying accurate to the brand's intent.

---

## Prompt 8.3 — CTA banner

```
Read /THEME_GUIDE.md and /FEATURE_SRS.md section 7.
Do not modify files outside the about page file. Reuse the CTABanner component from Group 4.

Add a CTABanner at the bottom of the about page with heading "Let's Create Something Meaningful Together", subtext inviting visitors to reach out, button "Get in Touch" → /book.

Show me the complete final /src/app/(marketing)/about/page.tsx with all sections in order: PageHero, BioSection, MissionStatement, CTABanner.
```

### Test Prompt 8.3
```
Do a full scroll-through of localhost:3000/about on desktop and mobile, confirming all sections render correctly and consistently with the rest of the site's visual language.
```

### Expected Result 8.3
- Complete, polished `/about` page, fully responsive, visually consistent with sibling pages.

---

✅ **Group 8 complete.** Move to `/prompts/09-booking-form-backend.md`.
