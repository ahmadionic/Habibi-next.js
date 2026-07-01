# Group 5 — Education Page Prompts (Feature 3)

**Do not start until Group 4 is fully checked off AND education images are placed.**
Scope: only modify `/src/app/(marketing)/education/page.tsx` and new files under `/src/components/education/`. Reuse CTABanner from Group 4 — do not rebuild it.

---

## Prompt 5.1 — Page hero + intro

```
Read /THEME_GUIDE.md sections 2, 3, 5, 7 and /FEATURE_SRS.md section 4 (Feature 3 — Education) for this task.
Do not modify files outside /src/app/(marketing)/education/page.tsx and /src/components/education/.

1. Use PageHero (from Group 2):
   - eyebrow: "HABIBI FOR CHILDREN & TEENS"
   - title: "Learning Through Connection"
   - subtitle (script): "Meet Miss Claire and her therapy quails."
   - backgroundImage: /assets/education/hero-education.jpg
   - ctaLabel: "Meet the Programs", ctaHref: "#programs"
2. Below, add an intro paragraph paraphrasing FEATURE_SRS.md section 4: the idea that not every child learns the same way, and every child deserves the chance to show what they CAN do, free from fear of failure — introduce the concept of animal-assisted learning briefly. Original phrasing only, no verbatim copying.

Show me the page so far.
```

### Test Prompt 5.1
```
Visit localhost:3000/education and confirm the hero and intro render correctly with warm, original, inclusion-focused copy.
```

### Expected Result 5.1
- Hero renders correctly with education hero image/placeholder.
- Intro copy captures the inclusive, encouraging tone from the brief without copying it.

---

## Prompt 5.2 — Credential block (Meet Miss Claire)

```
Read /THEME_GUIDE.md sections 2, 3, 6 and /FEATURE_SRS.md section 4 (credential details: C-AAIS, MA.Inc Ed, 26 years teaching experience across South Africa/England/South Korea/Qatar, inclusion advocate, certified Animal Assisted Intervention Specialist, works with OTs/speech therapists/psychologists, provides risk assessments/informed consent/Ministry of Education documentation).
Do not modify files outside /src/components/education/CredentialBlock.tsx and the education page file.

Build a CredentialBlock section:
1. Two-column layout (image left, text right on desktop; stacked on mobile): photo at /assets/education/claire-portrait.jpg in a soft rounded frame with a subtle sage border.
2. Heading "Meet Miss Claire" (font-heading).
3. Body paragraph listing her credentials and experience, written in third person, warm and professional tone, paraphrased from the facts listed in FEATURE_SRS.md (keep all factual details accurate: credentials, years, countries, specialization areas — do not alter the facts, only the sentence structure/wording).
4. A small row of 3-4 "credential pills" using the Badge component (e.g., "C-AAIS", "MA.Inc Ed", "26+ Years Experience", "Ministry-Compliant Documentation").

Add this section below the intro on the education page.
```

### Test Prompt 5.2
```
Confirm the credential block displays Claire's photo, the correct facts (26 years, 4 countries, C-AAIS, MA.Inc Ed), and that the writing is original but factually accurate to FEATURE_SRS.md.
```

### Expected Result 5.2
- Two-column layout renders correctly, stacks on mobile.
- All factual credentials are present and accurate.
- Copy is warm, professional, original phrasing.

---

## Prompt 5.3 — Program cards grid (4 programs)

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7 and /FEATURE_SRS.md section 4 (the 4 program cards: HABibi Math & Literacy, HABibi Reading & Writing, HABibi Art & Crafts, HABibi Moving Up — with their descriptions).
Do not modify files outside /src/components/education/ProgramCard.tsx, /src/components/education/ProgramsGrid.tsx, and the education page file.

1. Build a reusable ProgramCard: image top, title (font-heading), short paraphrased description (font-body), a small "Program manual available on request" note where applicable (per FEATURE_SRS.md), BrandCard styling with hover lift.
2. Build a ProgramsGrid section with id="programs":
   - SectionEyebrow "OUR PROGRAMS"
   - Heading "Programs Designed Around Connection"
   - 2x2 responsive grid (2-col desktop, 1-col mobile) of ProgramCards:
     - "Math & Literacy" — image: /assets/education/program-math.jpg — paraphrase: animal-based story learning (weighing/feeding scenarios), fun and doable approach to numbers and words.
     - "Reading & Writing" — image: /assets/education/program-reading.jpg — paraphrase: literacy program leaflet available on request.
     - "Art & Crafts" — image: /assets/education/program-art.jpg — paraphrase: therapeutic colouring and nature-inspired art projects supporting fine motor and observation skills; mention sustainability themes generally without reproducing any specific external article content.
     - "Moving Up" — image: /assets/education/program-movingup.jpg — paraphrase: supports transition, organisation, focus, and emotional regulation for students moving between school stages, with practical tools like organisation systems and emotional check-in resources.

Add this section below CredentialBlock.
```

### Test Prompt 5.3
```
Confirm all 4 program cards render correctly with images, titles, and original paraphrased descriptions, in a responsive 2x2 grid that collapses to 1 column on mobile.
```

### Expected Result 5.3
- 4 cards display correctly with accurate-but-paraphrased program descriptions.
- Responsive grid behaves correctly.
- No content copied verbatim from source material, especially regarding the external article reference (which should not be reproduced at all, just generally alluded to).

---

## Prompt 5.4 — Story excerpt card (Queenie and the Quails)

```
Read /THEME_GUIDE.md sections 2, 3, 7 and /FEATURE_SRS.md section 4 (the "Queenie and the Quails of Qatar" reading story concept, used as a flavor example within the Math & Literacy program).
Do not modify files outside /src/components/education/StoryExcerptCard.tsx and the education page file.

Build a single decorative StoryExcerptCard section:
1. Linen or sand background, centered, max-width readable column.
2. SectionEyebrow "A GLIMPSE INTO THE STORIES"
3. A short, ORIGINAL example mini-story/vignette (3-4 sentences) in your own creative writing, inspired by (not copied from) the general concept of quail characters teaching a child a simple math idea (like sharing/dividing something fairly) — write fresh, simple, child-friendly prose. Do not reuse specific character names, exact numbers, or sentence structures from the source material; create your own original example to avoid any copyright concern, while staying true to the "quails teach gentle math/literacy lessons" concept.
4. A small attribution line: "Inspired by Miss Claire's animal-assisted storytelling approach."

Add this section below ProgramsGrid.
```

### Test Prompt 5.4
```
Read the story excerpt and confirm it is clearly original creative writing (not a reproduction of the brand document's specific story), while still conveying the same warm educational concept.
```

### Expected Result 5.4
- Story excerpt is fully original, child-friendly, on-brand.
- No verbatim reuse of names/numbers/sentences from any source document.
- Section is visually distinct (different background) from surrounding sections.

---

## Prompt 5.5 — CTA banner

```
Read /THEME_GUIDE.md and /FEATURE_SRS.md section 4 (CTA: "Book a School Consultation").
Do not modify files outside the education page file. Reuse the CTABanner component built in Group 4 (Prompt 4.6) — do not rebuild it.

Add a CTABanner at the bottom of the education page with heading "Bring HABibi to Your School", subtext about partnering with schools and families to support every learner, button "Book a School Consultation" → /book.

Show me the complete final /src/app/(marketing)/education/page.tsx with all sections in order.
```

### Test Prompt 5.5
```
Do a full scroll-through of localhost:3000/education on desktop and mobile, confirming every section renders correctly in order with no errors, and the CTABanner matches the visual style already established on the portraits page.
```

### Expected Result 5.5
- Complete, polished `/education` page.
- CTABanner visually consistent with the one used on `/portraits` (same component, different props).
- Fully responsive, no console errors.

---

✅ **Group 5 complete.** Move to `/prompts/06-workshops-page.md`. Place workshop images first.
