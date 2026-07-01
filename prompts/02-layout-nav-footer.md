# Group 2 — Layout, Nav, Footer Prompts

**Do not start until Group 1 is fully checked off.**
This group builds the shared shell every marketing page sits inside. Only touch files under `/src/app/layout.tsx`, `/src/app/(marketing)/layout.tsx`, and `/src/components/layout/`.

---

## Prompt 2.1 — Root layout with fonts + metadata

```
Read /THEME_GUIDE.md sections 1 and 3, and /FEATURE_SRS.md section 0 and 1, for this task.

Update /src/app/layout.tsx (root layout) to:
1. Keep the font setup from Group 1 (Prompt 1.2) intact.
2. Set the default site-wide metadata: title "Claire Olivier | HABibi — Art, Animals & Wellbeing" and description using the tagline "Where Art, Animals and Well-being Create Connection and Healing." plus one sentence about animal therapy, education, and fine art in Doha, Qatar.
3. Set the html lang to "en" and add a basic favicon reference pointing to /public/assets/logo/logo-icon.png (created in Group 0).
4. Do NOT add the Nav or Footer here yet — they belong in a route group layout we build next. The root layout should remain minimal: html/body wrapper, fonts, global metadata only.

Show me the final root layout file.
```

### Test Prompt 2.1
```
Run npm run dev, view page source (or use browser dev tools) on localhost:3000, and confirm the <title> tag and meta description match what was requested.
```

### Expected Result 2.1
- Browser tab title reads "Claire Olivier | HABibi — Art, Animals & Wellbeing".
- View-source shows the correct meta description.
- No Nav/Footer visible yet (expected — that's next).

---

## Prompt 2.2 — SiteNav (desktop + mobile drawer)

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7, and 8 for all visual/motion/responsive decisions.
Read /FEATURE_SRS.md section 1 (Sitemap) for the exact nav links required.

Do not modify any files outside of /src/components/layout/SiteNav.tsx and (if needed) /src/components/layout/MobileNavDrawer.tsx — this task is scoped to navigation only.

Build a SiteNav component:
1. Logo on the left using /public/assets/logo/logo-wordmark.png (or logo-primary.png if wordmark looks too small), linking to "/".
2. Nav links (desktop, horizontal, font-body): Home (/), Portraits (/portraits), Education (/education), Workshops (/workshops), Shop (/shop), About (/about).
3. A primary "Book a Consultation" BrandButton (from Group 1) on the right, linking to /book.
4. Sticky at the top, cream background with a subtle shadow-soft once the user scrolls down (use a scroll listener or framer-motion's useScroll), transparent/blended at the very top of the landing page only.
5. Below the lg breakpoint (per THEME_GUIDE.md section 8): collapse nav links into a hamburger icon (lucide-react Menu icon) that opens a slide-in MobileNavDrawer from the right, cream background, same links stacked vertically, large touch targets (44px min height), with a smooth slide+fade transition using motion tokens from /src/lib/motion.ts.
6. Active link should be visually indicated (e.g., underline in terracotta or text color change to deep-pine) based on the current route using Next.js usePathname.

Wire this into a new file /src/app/(marketing)/layout.tsx so it applies to all marketing pages.
```

### Test Prompt 2.2
```
On localhost:3000, resize the browser from desktop width down to mobile width (under 1024px) and confirm: nav links disappear and a hamburger icon appears; clicking it slides in a drawer with all 6 nav links plus the Book a Consultation button; clicking a link closes the drawer and navigates.
```

### Expected Result 2.2
- Desktop: horizontal nav with all links + CTA button visible, sticky on scroll.
- Mobile (<1024px): hamburger menu opens a smooth slide-in drawer with all links, no horizontal scroll/overflow issues.
- Active page link is visually distinguished.
- No console errors.

---

## Prompt 2.3 — SiteFooter

```
Read /THEME_GUIDE.md sections 2, 3, and 4 for this task.
Do not modify any files outside of /src/components/layout/SiteFooter.tsx and /src/app/(marketing)/layout.tsx.

Build a SiteFooter component:
1. Deep-pine background, cream/white text (per THEME_GUIDE.md section 2 usage notes).
2. Four columns on desktop, stacking to 1-2 columns on mobile:
   - Column 1: small logo-white.png + tagline ("Where Art, Animals and Well-being Create Connection and Healing.") in Allura script font, small size.
   - Column 2: "Explore" — same 6 nav links as SiteNav.
   - Column 3: "Get in Touch" — placeholder email (hello@claireolivierart.com), placeholder phone, "Doha, Qatar" location text.
   - Column 4: Newsletter signup — a simple email input + BrandButton "Subscribe" (no backend wiring yet, just UI — show a console.log on submit for now).
3. A thin gold-toned 1px divider line above a bottom row with copyright text "© [current year] Claire Olivier. All rights reserved." and small social icon placeholders (lucide-react icons: Instagram, Facebook, Mail) in a row.

Add SiteFooter to /src/app/(marketing)/layout.tsx, below the page content, alongside SiteNav from the previous prompt.
```

### Test Prompt 2.3
```
Scroll to the bottom of localhost:3000 and confirm the footer renders with all 4 columns, correct colors (dark forest/deep-pine background), correct fonts, and that it stacks sensibly on mobile width.
```

### Expected Result 2.3
- Footer displays at the bottom of every marketing page (even though we only have the homepage so far).
- Colors/fonts match brand guide; layout responsive.
- Newsletter input + button render correctly (functionality is stubbed, that's fine for now).

---

## Prompt 2.4 — Reusable PageHero component

```
Read /THEME_GUIDE.md sections 5 and 7 for this task.
Do not modify any files outside of /src/components/layout/PageHero.tsx.

Build a reusable PageHero component that every inner page (Portraits, Education, Workshops, Shop, About) will use, accepting props:
- eyebrow: string (uses SectionEyebrow from Group 1)
- title: string (font-heading, large, e.g. text-4xl md:text-5xl)
- subtitle: string (optional, font-body or font-script depending on a `subtitleStyle` prop of "body" | "script")
- backgroundImage: string (image src)
- ctaLabel + ctaHref: optional, renders a BrandButton if provided

Visual style: full-bleed background image with a soft cream-to-transparent gradient overlay at the bottom for text legibility, content vertically centered, fade-up entrance animation using the FadeIn wrapper from Group 1, generous vertical padding (space-7/space-8).

Do not build any actual page using this component yet — just build and export the component. We'll use it starting in Group 4.
```

### Test Prompt 2.4
```
Show me the full PageHero.tsx file and confirm via a quick temporary usage in /color-test (or describe it if you'd rather not modify that page again) that it accepts all 5 props correctly with TypeScript types.
```

### Expected Result 2.4
- `PageHero.tsx` exists, is fully typed, and matches the described visual spec.
- No build errors.
- Component is unused elsewhere yet, which is expected at this stage.

---

✅ **Group 2 complete.** Move to `/prompts/03-landing-page.md`.
