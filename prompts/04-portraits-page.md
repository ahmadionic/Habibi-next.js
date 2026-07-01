# Group 4 — Portraits Page Prompts (Feature 2)

**Do not start until Group 3 is fully checked off AND you've placed images per `00_ASSET_PLACEHOLDERS.md` for the `portraits` folder.**
Scope: only modify `/src/app/(marketing)/portraits/page.tsx` and new files under `/src/components/portraits/`. Do not touch the homepage, Nav, Footer, or other feature pages.

---

## Prompt 4.1 — Page hero + intro

```
Read /THEME_GUIDE.md sections 2, 3, 5, 7 and /FEATURE_SRS.md section 3 (Feature 2 — HABibi for Homes / Portraits) for this task.
Do not modify any files outside /src/app/(marketing)/portraits/page.tsx and /src/components/portraits/.

1. Use the PageHero component (built in Group 2, Prompt 2.4) at the top of the portraits page:
   - eyebrow: "HABIBI FOR HOMES"
   - title: "Pet Portraits With Pride of Place"
   - subtitle (script style): "Where every furbaby becomes a treasured piece of art."
   - backgroundImage: /assets/portraits/hero-portraits.jpg
   - ctaLabel: "See the Packages", ctaHref: "#packages"
2. Below the hero, add a short intro paragraph section (font-body, max-width for readability ~65ch, centered) paraphrasing the FEATURE_SRS.md intro: animals as family members, the joy of seeing them in art, and the idea of giving pets "pride of place" in the home. Do not copy any source sentence verbatim — write it fresh in your own words while preserving the meaning.

Show me the page so far.
```

### Test Prompt 4.1
```
Visit localhost:3000/portraits and confirm the hero renders with the correct background image path, eyebrow/title/subtitle, and that the intro paragraph below it is warm and on-brand, not copied verbatim from any source document.
```

### Expected Result 4.1
- Hero renders correctly with the portraits hero image (or placeholder).
- Intro copy is original phrasing, on-brand tone, readable width.
- "See the Packages" button scrolls to the (not yet built) #packages anchor — fine for now.

---

## Prompt 4.2 — Simple Portrait Package + pricing table

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7 and /FEATURE_SRS.md section 3 (Simple Portrait Package pricing details — use the exact prices listed: QAR 750 for A4 graphite, QAR 1000 for A4 colour, A3 quoted, additional animals quoted separately, archival/lightfastness note).
Do not modify files outside /src/components/portraits/PricingTierCard.tsx, /src/components/portraits/SimplePortraitSection.tsx, and the portraits page file.

1. Build a reusable PricingTierCard component: package name, price (or "Quote on request"), short description, a small list of 2-3 included features (use a checkmark lucide-react icon), BrandCard styling.
2. Build a SimplePortraitSection with id="packages":
   - SectionEyebrow "SIMPLE PORTRAIT PACKAGE"
   - Heading + short description of the package
   - 3 PricingTierCards side by side (responsive: 3-col desktop, 1-col mobile): "A4 Graphite Sketch" (QAR 750), "A4 Colour" (QAR 1000), "A3 & Custom" (Quote on request)
   - A small note line below mentioning archival materials and 150-year lightfastness, museum-quality paper (paraphrased from FEATURE_SRS.md, not verbatim).

Add this section to the portraits page below the intro.
```

### Test Prompt 4.2
```
Confirm the pricing cards show the correct prices (QAR 750, QAR 1000, Quote on request) and that the archival materials note appears below them. Check mobile responsiveness.
```

### Expected Result 4.2
- 3 pricing cards render correctly with accurate prices from FEATURE_SRS.md.
- Responsive layout works.
- No invented prices that don't match the spec.

---

## Prompt 4.3 — Case study gallery (Henry, Grisette, Black & White)

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7 and /FEATURE_SRS.md section 3 (case studies under Simple Portrait Package: Henry, Grisette, Black and White).
Do not modify files outside /src/components/portraits/CaseStudyGalleryCard.tsx, /src/components/portraits/SimplePortraitCaseStudies.tsx, and the portraits page file.

1. Build a reusable CaseStudyGalleryCard: image (object-cover, rounded-lg), pet/subject name (font-heading), short story paragraph (font-body, 2-3 sentences max), small medium/format badge (using the Badge component from Group 1, e.g. "A3 · Colour Pencil").
2. Build a SimplePortraitCaseStudies section with a 3-column responsive grid containing:
   - "Henry" — image: /assets/portraits/case-henry.jpg — paraphrased story: a beloved dog who traveled between Doha and Australia, portrayed as a meaningful gift, rendered in colour pencil on drafting film, A3.
   - "Grisette" — image: /assets/portraits/case-grisette.jpg — paraphrased story: Claire's own therapy animal who supported her through a difficult health journey, graphite pencil, A4.
   - "Black and White" — image: /assets/portraits/case-blackwhite.jpg — paraphrased story: two very different pets who share a close bond, photos blended together with customizable background options, colour pencil and pan pastel, A3.

Important: paraphrase every story in fresh language. Do not reproduce any sentence from the source material verbatim.

Add this section directly below the pricing cards.
```

### Test Prompt 4.3
```
Confirm all 3 case study cards render with images, names, paraphrased stories, and format badges. Read the story text aloud to yourself and confirm it does not match any single sentence from the original brand document verbatim.
```

### Expected Result 4.3
- 3 case study cards render correctly, responsive grid.
- All copy is original paraphrasing, on-brand tone.
- Images load from the correct asset paths (or placeholders).

---

## Prompt 4.4 — Something Special Package + case studies

```
Read /THEME_GUIDE.md and /FEATURE_SRS.md section 3 (Something Special Portrait Package: custom portrait + merchandise like bags/iphone cases/mugs/keyrings, "Contact for quote"; case studies Sophie, Closest Friend, Daddy's Girl).
Do not modify files outside /src/components/portraits/SomethingSpecialSection.tsx and the portraits page file. Reuse PricingTierCard and CaseStudyGalleryCard from previous prompts — do not duplicate that logic.

1. Build a SomethingSpecialSection:
   - SectionEyebrow "SOMETHING SPECIAL PACKAGE"
   - Heading + short description: a custom portrait extended onto keepsake items (paraphrase: bags, phone cases, mugs, keyrings) — single PricingTierCard styled wider/full-width showing "Contact for Quote" with a BrandButton linking to /book.
   - 3-column case study grid below it reusing CaseStudyGalleryCard:
     - "Sophie" — image: /assets/portraits/case-sophie.jpg — paraphrased: a vibrant zumba instructor's portrait in mixed media (watercolour + gold leaf), extended onto a canvas print, cushions, and mugs for her studio.
     - "Closest Friend" — image: /assets/portraits/case-closestfriend.jpg — paraphrased: a falcon and its teenage handler, capturing trust between them, pastel on A4, extended onto a phone cover, water bottle, and carry bag.
     - "Daddy's Girl" — image: /assets/portraits/case-daddysgirl.jpg — paraphrased: a 12-year companionship story, portrait extended onto a kindle cover, planner, greeting cards, notepads, and keyrings.

Add this section below the Simple Portrait case studies.
```

### Test Prompt 4.4
```
Confirm the Something Special section shows a "Contact for Quote" CTA linking to /book, and that all 3 new case studies render with paraphrased, original copy.
```

### Expected Result 4.4
- Section renders correctly with quote CTA.
- 3 case studies display correctly with original phrasing.
- No duplicated component code (PricingTierCard/CaseStudyGalleryCard reused, not rebuilt).

---

## Prompt 4.5 — Remembrance Package + case studies

```
Read /THEME_GUIDE.md and /FEATURE_SRS.md section 3 (Remembrance Package: honoring pets who have passed, photo restoration of old/grainy photos; case studies Carlos, Leen, Stevie — brief testimonial-style).
Do not modify files outside /src/components/portraits/RemembranceSection.tsx and the portraits page file.

1. Build a RemembranceSection with a slightly more gentle/muted visual tone (e.g., linen background instead of cream, to set it apart emotionally):
   - SectionEyebrow "REMEMBRANCE PACKAGE"
   - Heading + paraphrased description: honoring beloved pets who have passed away, including careful editing/restoration of old or low-quality photos so the portrait still feels lifelike and true to memory.
   - 3 simpler testimonial-style cards (image + name + 1 short sentence each, lighter than the full CaseStudyGalleryCard) for Carlos, Leen, and Stevie — paraphrase that these are collaborative tributes created with input from each pet's family.
   - Images: /assets/portraits/case-carlos.jpg, case-leen.jpg, case-stevie.jpg

Add below the Something Special section.
```

### Test Prompt 4.5
```
Confirm the Remembrance section has a visually distinct, gentler tone from the sections above it, and that the copy is respectful, warm, and original (not copied).
```

### Expected Result 4.5
- Section background and tone visually differ slightly (e.g., linen vs cream) to convey the emotional shift.
- 3 testimonial cards render correctly.
- Copy is sensitive, warm, paraphrased.

---

## Prompt 4.6 — Process note + CTA banner

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7 and /FEATURE_SRS.md section 3 (process note: each portrait takes up to 30 hours, price/timeline vary by request; final CTA "Book a Consultation & Quotation").
Do not modify files outside /src/components/portraits/ProcessNote.tsx, /src/components/sections/CTABanner.tsx (this should be a generic reusable component, since other pages will need it too), and the portraits page file.

1. Build ProcessNote: a simple centered text block paraphrasing that each portrait is a unique, carefully crafted piece taking up to 30 hours to complete, so pricing and timing are tailored per request.
2. Build a reusable CTABanner component (in /src/components/sections/ since other feature pages will reuse it in later groups): full-width deep-pine or terracotta-tinted background, heading, short supporting text, BrandButton — accepts props for heading/subtext/buttonLabel/buttonHref so it's reusable across Education, Workshops, About pages later.
3. Use CTABanner on the portraits page with heading "Ready to Commission Your Portrait?", subtext mentioning booking a consultation and quotation, button "Book a Consultation" → /book.

Show me the final complete /src/app/(marketing)/portraits/page.tsx with all sections in order: PageHero, Intro, SimplePortraitSection (+ case studies), SomethingSpecialSection (+ case studies), RemembranceSection (+ case studies), ProcessNote, CTABanner.
```

### Test Prompt 4.6
```
Do a full scroll-through of localhost:3000/portraits on both desktop and mobile. Confirm every section from Hero to CTA Banner appears in order, all images/placeholders load, all animations are smooth, and there are no console errors or layout bugs.
```

### Expected Result 4.6
- Complete, polished `/portraits` page matching FEATURE_SRS.md section 3 content exactly.
- Fully responsive, no console errors.
- `CTABanner` is built generically enough to reuse in Groups 5, 6, and 8 without rebuilding it.

---

✅ **Group 4 complete.** Move to `/prompts/05-education-page.md`. Place education images per `00_ASSET_PLACEHOLDERS.md` first.
