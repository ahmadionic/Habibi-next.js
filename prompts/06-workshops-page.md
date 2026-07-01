# Group 6 — Workshops Page Prompts (Feature 4)

**Do not start until Group 5 is fully checked off AND workshop images are placed.**
Scope: only modify `/src/app/(marketing)/workshops/page.tsx` and new files under `/src/components/workshops/`. Reuse CTABanner from Group 4.

---

## Prompt 6.1 — Page hero

```
Read /THEME_GUIDE.md sections 2, 3, 5, 7 and /FEATURE_SRS.md section 5 (Feature 4 — Workshops) for this task.
Do not modify files outside /src/app/(marketing)/workshops/page.tsx.

Use PageHero (from Group 2):
- eyebrow: "HABIBI FOR HEALTH & GROWTH"
- title: "Workshops for Adults & Teens"
- subtitle (script): "Create. Connect. Heal."
- backgroundImage: /assets/workshops/hero-workshops.jpg
- ctaLabel: "Explore Workshops", ctaHref: "#workshops"

Show me the result.
```

### Test Prompt 6.1
```
Visit localhost:3000/workshops and confirm the hero renders correctly with the right copy and background.
```

### Expected Result 6.1
- Hero displays correctly, consistent with the Portraits/Education hero style.

---

## Prompt 6.2 — Seeds of Change workshop card

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7 and /FEATURE_SRS.md section 5 ("Seeds of Change" Watercolour Workshop details: geometric nature design, watercolour + ink, wet-on-wet/wet-on-dry techniques, beginner-friendly, optional therapeutic breathing/reflection component, supplies/journals available for purchase, workshop supplies + refreshments included).
Do not modify files outside /src/components/workshops/WorkshopCard.tsx, /src/components/workshops/WorkshopsSection.tsx, and the workshops page file.

1. Build a reusable WorkshopCard: large image, title (font-heading), description paragraph (paraphrased, original), a small "What's Included" checklist (lucide-react CheckCircle icons), and a BrandButton "Reserve Your Spot" linking to /book.
2. Build a WorkshopsSection with id="workshops" containing a SectionEyebrow "OUR WORKSHOPS" + heading, then the first WorkshopCard:
   - "Seeds of Change Watercolour Workshop" — image: /assets/workshops/workshop-watercolour.jpg — paraphrase the geometric nature design concept using watercolour and ink, wet-on-wet and wet-on-dry techniques, beginner-friendly, with an optional gentle breathing/reflection component focused on letting go of what we can't control. Included items: art supplies & refreshments provided; journals/extra supplies available for purchase.

Add this as the first workshop in the section.
```

### Test Prompt 6.2
```
Confirm the Seeds of Change workshop card renders with image, original description, an included-items checklist, and a working "Reserve Your Spot" button.
```

### Expected Result 6.2
- Card renders correctly with accurate, paraphrased details.
- Checklist and CTA button display properly.

---

## Prompt 6.3 — Animal Portraits workshop card

```
Read /THEME_GUIDE.md and /FEATURE_SRS.md section 5 (Animal Portraits Workshop details: beginner-friendly pet portrait skill-building with emotional support + technique, focus on trust/letting go of perfection, using values for texture/realism and colour for fur/feathers, supplies + light refreshments included, optional kits/merchandise for purchase).
Do not modify files outside the workshops page file. Reuse WorkshopCard from Prompt 6.2 — do not rebuild it.

Add a second WorkshopCard inside WorkshopsSection:
- "Animal Portraits Workshop" — image: /assets/workshops/workshop-animalportrait.jpg — paraphrase: a supportive, no-experience-needed path to creating confident pet portraits, focusing on trusting your own hand, using value/contrast for texture and realism, and using colour theory to bring fur and feathers to life. Included items: supplies & light refreshments provided; optional kits/merchandise available for purchase.

Show me the updated WorkshopsSection with both cards displayed side by side (responsive: 2-col desktop, 1-col mobile).
```

### Test Prompt 6.3
```
Confirm both workshop cards render side by side on desktop and stack on mobile, both with correct, original, paraphrased copy.
```

### Expected Result 6.3
- Both cards render in a responsive 2-column → 1-column layout.
- WorkshopCard component reused, not duplicated.

---

## Prompt 6.4 — CTA banner with workshop selector

```
Read /THEME_GUIDE.md and /FEATURE_SRS.md section 5 (CTA: "Reserve Your Spot" with a workshop-type selector hint, leading to /book).
Do not modify files outside the workshops page file. Reuse the CTABanner component from Group 4.

Add a CTABanner at the bottom of the workshops page with heading "Save Your Seat", subtext mentioning that spots are limited and inviting visitors to reserve their place, button "Reserve Your Spot" → /book.

(Note: we will add an actual workshop-type dropdown field to the /book form itself in Group 9 — this CTA banner just needs to link there for now.)

Show me the complete final /src/app/(marketing)/workshops/page.tsx with all sections in order.
```

### Test Prompt 6.4
```
Do a full scroll-through of localhost:3000/workshops on desktop and mobile, confirming all sections render correctly and consistently with the Portraits and Education pages' visual style.
```

### Expected Result 6.4
- Complete, polished `/workshops` page.
- Visually consistent with sibling pages.
- Fully responsive, no console errors.

---

✅ **Group 6 complete.** Move to `/prompts/07-shop.md`. Place shop product images first.
