# Group 11 — Polish & Deploy Prompts

**Do not start until Group 10 is fully checked off.** This is your final QA pass before launch.

---

## Prompt 11.1 — Responsive QA pass

```
Read /THEME_GUIDE.md section 8 (Responsiveness Rules) for the exact breakpoints and rules to verify.

Go through every public page (/, /portraits, /education, /workshops, /shop, /shop/[any-slug], /about, /book) and every admin page, at these widths: 375px (mobile), 768px (tablet), 1024px (small desktop), 1440px (large desktop).

For each page/width combination, check for:
- Horizontal scroll/overflow bugs
- Text that's cut off or overlapping
- Touch targets smaller than 44px on mobile
- Images that stretch/distort instead of cropping properly
- Nav/footer behaving correctly at every width

Fix any issues you find. Give me a summary list of what was broken and what you fixed.
```

### Test Prompt 11.1
```
Confirm there are zero horizontal scrollbars on any page at any of the 4 tested widths, and that the mobile nav drawer and cart drawer both work smoothly at 375px width.
```

### Expected Result 11.1
- AI provides a clear before/after list of responsive fixes.
- No horizontal overflow anywhere.
- All interactive elements are comfortably tappable on mobile.

---

## Prompt 11.2 — Accessibility pass

```
Read /THEME_GUIDE.md section 10 (color tokens) and section 11 (non-functional requirement: WCAG AA contrast).

1. Check color contrast for every text/background combination used across the site against WCAG AA (4.5:1 for normal text, 3:1 for large text/UI components). Pay special attention to: ink-soft text on cream/sand/linen backgrounds, and any white/cream text on sage (sage is a lighter green and may fail contrast for small text on dark sage buttons — flag and fix if needed by darkening to forest for button backgrounds where sage was used for text-bearing surfaces).
2. Confirm all images have meaningful alt text (decorative images should have alt="" or aria-hidden).
3. Confirm all interactive elements (buttons, links, form fields) are reachable via keyboard Tab navigation and have visible focus states (a sage or terracotta focus ring is fine, matching brand colors).
4. Confirm form fields all have associated <label> elements (not just placeholder text).

Fix any issues found and summarize what was changed.
```

### Test Prompt 11.2
```
Tab through the entire homepage using only the keyboard (no mouse) and confirm every interactive element receives a visible focus indicator in the correct logical order. Then describe any contrast issues that were found and fixed.
```

### Expected Result 11.2
- Full keyboard navigability confirmed.
- Any contrast failures are identified and corrected (e.g., button background color adjustments).
- All images and form fields properly labeled.

---

## Prompt 11.3 — SEO metadata + sitemap + OG images

```
Read /FEATURE_SRS.md section 10 (SEO non-functional requirement) and /THEME_GUIDE.md section 1.

1. Add page-specific metadata (title + description) to every public page (/portraits, /education, /workshops, /shop, /about, /book) using Next.js's metadata export pattern, each with a unique, accurate title/description reflecting that page's content (per FEATURE_SRS.md sections 3-8).
2. Generate a dynamic sitemap.xml using Next.js's app/sitemap.ts convention, including all public marketing pages and all live shop product slugs (fetched from the database).
3. Add a simple robots.txt at /src/app/robots.ts allowing all crawlers except /admin/*.
4. Set up a shared OpenGraph image using /public/assets/logo/logo-primary.png as a fallback og:image for all pages (a fully custom per-page OG image generator is a nice-to-have, not required for v1 — note this as a possible future enhancement).

Show me the sitemap.ts and robots.ts files, and confirm metadata exports exist on all 6 pages listed above.
```

### Test Prompt 11.3
```
Visit localhost:3000/sitemap.xml and localhost:3000/robots.txt and confirm both render valid XML/text output with the correct URLs and disallow rules.
```

### Expected Result 11.3
- `sitemap.xml` lists all marketing pages + all live product detail pages.
- `robots.txt` disallows `/admin`.
- Every public page has a unique, accurate title/description.

---

## Prompt 11.4 — Performance pass

```
Read /THEME_GUIDE.md section 11 (performance requirement: Lighthouse ≥ 90 on landing page).

1. Confirm every <img> across the site uses Next.js's <Image> component (not raw <img> tags), with explicit width/height or fill + sized container, and appropriate priority={true} only on the homepage hero image (above the fold) — all other images should lazy-load by default.
2. Check for any unnecessarily large client component trees — confirm pages that don't need interactivity (most marketing page sections) remain Server Components, and "use client" is only applied where Framer Motion or local state/interactivity is actually required.
3. Run a production build (npm run build) and report the build output/bundle size summary, flagging anything unusually large.
4. Fix any obvious performance issues found (e.g., missing image dimensions causing layout shift, accidentally client-rendering a large static section).

Summarize what you checked and fixed.
```

### Test Prompt 11.4
```
Run `npm run build` successfully with no errors, and confirm the AI's summary explains which components are Server vs Client and why, and confirms all images use next/image.
```

### Expected Result 11.4
- Production build completes successfully.
- Clear summary of Server/Client component boundaries and image optimization status.
- No major performance red flags remain.

---

## Prompt 11.5 — Deploy to Vercel + connect Neon production DB

```
Walk me through, step by step in plain language (I am a beginner), how to:
1. Push this project to a GitHub repository (give me the exact git commands, assuming I haven't initialized git yet — check first and only init if needed).
2. Create a new Vercel project connected to that GitHub repo.
3. Add all the environment variables from my .env.local file (DATABASE_URL, RESEND_API_KEY, NEXTAUTH_SECRET, NEXTAUTH_URL, ADMIN_EMAIL, ADMIN_PASSWORD_HASH) into Vercel's project environment variable settings — explain that NEXTAUTH_URL should be my real production domain once deployed, not localhost.
4. Confirm whether I should use my existing Neon database for production or create a separate Neon branch/project for production vs development — give your recommendation and reasoning for a small business site like this.
5. After deployment, what I should manually test on the live URL to confirm everything works (booking form submits, emails send, admin login works, shop loads products).

Do not run any deployment commands yourself — just give me clear instructions since deployment requires my own GitHub/Vercel account access.
```

### Test Prompt 11.5
```
After following the deployment steps, visit your live Vercel URL and confirm: the homepage loads with correct styling, the booking form successfully submits and you receive the email notifications, the shop page loads live products from the database, and admin login works on the production URL.
```

### Expected Result 11.5
- Site is live on a Vercel URL with all environment variables correctly configured.
- Booking form, shop, and admin login all function correctly in production, not just locally.

---

🎉 **Project complete!** Your HABibi by Claire Olivier website is now live. Keep `THEME_GUIDE.md` and `FEATURE_SRS.md` in your repo permanently — any future feature work (Phase 2: real payments, multilingual support, portfolio-to-public-page wiring) should continue to reference them the same way every prompt in this kit did.
