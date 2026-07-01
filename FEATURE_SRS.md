# HABibi by Claire Olivier — FEATURE SRS (Master Reference)

> **Placement:** Save this file at the project ROOT as `/FEATURE_SRS.md`.
> Every feature prompt in `03_prompts/` must say:
> `"Read /FEATURE_SRS.md section [X] for the exact content/requirements of this feature. Do not invent content not listed there."`

---

## 0. Tech Stack (confirmed)

- **Frontend/Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Animation:** Framer Motion
- **Database:** Neon (serverless Postgres)
- **ORM:** Drizzle ORM (recommended pairing with Neon — added in setup)
- **Backend:** Next.js Route Handlers (`app/api/.../route.ts`) — "Next API"
- **Auth (admin only):** NextAuth.js (Credentials provider) — added in setup, only needed for Claire's admin/CMS area
- **Image storage:** local `/public` for static brand assets; Cloudinary or Vercel Blob recommended for user/portfolio uploads (decided in Feature 7)
- **Forms/Email:** Resend (or Nodemailer) for contact/booking form emails — added in setup
- **Deployment target:** Vercel

---

## 1. Sitemap / Page Inventory

| # | Page | Route | Priority |
|---|---|---|---|
| 1 | Landing / Welcome HABibi | `/` | P0 |
| 2 | HABibi for Homes (pet portraits) | `/portraits` | P0 |
| 3 | HABibi for Children & Teens (education) | `/education` | P0 |
| 4 | HABibi for Health & Growth (adults/teens workshops) | `/workshops` | P0 |
| 5 | Online Shop | `/shop` | P1 |
| 6 | Product Detail | `/shop/[slug]` | P1 |
| 7 | About / Meet Claire | `/about` | P1 |
| 8 | Book a Consultation (contact/booking form) | `/book` | P0 |
| 9 | Cart / Checkout | `/cart`, `/checkout` | P2 |
| 10 | Admin Dashboard (Claire's CMS) | `/admin/*` | P2 |

---

## 2. Feature 1 — Landing Page ("Welcome HABibi")

### Content (verbatim brand story, paraphrased lightly for web flow — preserve meaning):
- Hero headline: **"Welcome HABibi"**
- Sub-narrative: HAB = Human Animal Bond — explain that "Habibi" means "my darling" in Arabic, and in this context also stands for the Human-Animal Bond, a transformational relationship between all living things, recognized for healing impact on blood pressure, cognition, anxiety, communication, and supporting children with special needs.
- Include 1 supporting stat callout: a notable study showing online pet content boosted wellbeing during COVID (paraphrase, do not quote verbatim from source).
- CTA: "Enter a world of natural healing and transformation" → button "Welcome HABibi" leading into the three core pillar pages.
- **Three/Four pillar cards** (link out to the 3 main service pages + shop):
  1. HABibi for Homes (Pet Portraits) → `/portraits`
  2. HABibi for Children & Teens (Education) → `/education`
  3. HABibi for Health & Growth (Workshops) → `/workshops`
  4. Shop → `/shop`
- Brand values strip (reuse from THEME_GUIDE section 1): Fine Art & Creativity / Animal Connection / Well-being & Healing / Education & Growth — 4-icon row.
- Footer: nav links, social icons, newsletter signup (email only), contact email.

### Components needed:
`HeroSection`, `PillarCard`, `BrandValuesStrip`, `StatCallout`, `SiteFooter`, `SiteNav`.

---

## 3. Feature 2 — HABibi for Homes (Pet Portraits) — `/portraits`

### Sections:
1. **Intro:** "Animals are family members..." — pet portraits give pets pride of place.
2. **Simple Portrait Package**
   - Pricing table:
     - A4 graphite sketch — starting QAR 750
     - A4 colour with basic background — starting QAR 1000
     - A3 — price varies by subject/materials (quote on request)
     - Additional animals quoted separately
   - Note: archival-quality materials, 150 years of lightfastness, museum-quality paper.
   - Case studies (gallery cards w/ image + short story): "Henry" (A3 colour pencil portrait, Doha/Australia therapy dog story), "Grisette" (A4 graphite, Claire's own therapy/recovery animal), "Black and White" (A3 colour pencil + pan pastel, two pets combined into one composition).
3. **Something Special Portrait Package**
   - Custom portrait + merchandise (bags, phone cases, mugs, keyrings) — "Contact for quote."
   - Case studies: "Sophie" (zumba instructor, mixed media watercolour + gold leaf, canvas + cushions + mugs), "Closest Friend" (falcon + teen handler, A4 pastel + iPhone cover/water bottle/bag), "Daddy's Girl" (12-year companion, kindle cover/planner/cards/notepads/keyrings).
4. **Remembrance Package**
   - Portraits honoring pets who have passed; includes photo restoration/editing of old or low-quality photos.
   - Case studies: Carlos, Leen, Stevie (brief testimonial-style cards).
5. **Process note:** each portrait takes up to 30 hours; price/timeline vary by request.
6. **CTA:** "Book a Consultation & Quotation" → `/book`

### Components needed:
`PricingTierCard`, `CaseStudyGalleryCard`, `ProcessNote`, `CTABanner`.

---

## 4. Feature 3 — HABibi for Children & Teens (Education) — `/education`

### Sections:
1. **Intro:** "Not every child enjoys school..." — inclusion-focused messaging; meet Miss Claire and her therapy quails.
2. **About Miss Claire (credentials block):**
   - Claire Olivier (C-AAIS, MA.Inc Ed) — 26 years teaching experience across South Africa, England, South Korea, Qatar.
   - Inclusion advocate; certified Animal Assisted Intervention Specialist.
   - Works with OTs, speech therapists, psychologists to integrate quails/animals into therapy.
   - Provides risk assessments, informed consent documentation, Ministry of Education-compliant program documentation.
3. **Program cards (4):**
   - **HABibi Math & Literacy** — animal-based story-driven math/literacy learning (e.g., "Queenie and the Quails of Qatar" reading story; example word-problems using quail weighing/feeding scenarios). Note: "detailed program manual available on request."
   - **HABibi Reading & Writing** — "detailed program leaflet available on request."
   - **HABibi Art & Crafts** — therapeutic colouring books, leaf-art animal projects tied to sustainability themes; reference real student project example (Qatar Sustainability Week donation project) — paraphrase, link out rather than reproducing article text.
   - **HABibi Moving Up** (transition support) — for students struggling with transition/organisation/focus/emotional regulation; includes organisation systems, emotional-control "thermometers," note-taking colouring book, "tell the teacher" toolkit. Especially supports primary→middle school transition.
4. **CTA:** "Book a School Consultation" → `/book`

### Components needed:
`CredentialBlock`, `ProgramCard`, `StoryExcerptCard` (for the quail story snippet), `CTABanner`.

---

## 5. Feature 4 — HABibi for Health & Growth (Workshops) — `/workshops`

### Sections:
1. **"Seeds of Change" Watercolour Workshop**
   - Geometric nature design using watercolour + ink; wet-on-wet/wet-on-dry techniques; beginner-friendly.
   - Optional therapeutic breathing/reflection component focused on releasing control over the uncontrollable and prioritising inner peace.
   - Logistics: art supplies/reflection journals available for purchase; workshop supplies + refreshments included.
2. **Animal Portraits Workshop**
   - "You don't need talent to start" — beginner-to-confident-pet-portrait progression with emotional support + technique (values for texture/realism, colour theory for fur/feathers).
   - Logistics: supplies + light refreshments included; optional kits/merchandise for purchase.
3. **CTA:** "Reserve Your Spot" → `/book` (with a workshop-type selector)

### Components needed:
`WorkshopCard` (image, title, description, "what's included" list, price/CTA), `BeforeAfterShowcase` (optional, stylized "skill progression" visual rather than reproducing copyrighted student work descriptions).

---

## 6. Feature 5 — Online Shop — `/shop`, `/shop/[slug]`

### Categories (from brand overview):
- Tote bags
- Mugs
- Planners / Journals
- Cards
- Qatar Heritage Collection (special line)
- Home essentials

### Requirements:
- Product grid with filter by category.
- Product detail page: gallery, description, price, variant selector (if applicable), add-to-cart.
- Cart drawer + checkout flow (P2 — can stub with "Coming Soon" or simple inquiry-based checkout for v1 if payment integration isn't ready).
- Reuse brand application mockups (mug/tote/journal/card) as the visual style reference for product photography placeholders.

### Components needed:
`ProductCard`, `ProductGrid`, `CategoryFilter`, `ProductGallery`, `CartDrawer`, `AddToCartButton`.

---

## 7. Feature 6 — About / Meet Claire — `/about`

- Personal bio expanding on credentials from Feature 3.
- Personal photo + portrait/illustration imagery (falcon, cat, self-portrait-with-cat collage referenced in brand book page 2).
- Pull-quote (Allura script font): "Every soul deserves to be seen. Every connection has the power to heal."
- Mission statement block: "Through animal therapy, education and art, I support wellbeing, understanding and growth — for both people and animals. My work is guided by compassion, creativity and the belief that every connection has the power to heal." (paraphrase acceptable, keep meaning)

---

## 8. Feature 7 — Booking / Consultation Form — `/book`

- Multi-purpose intake form with a "purpose" selector: Portrait Inquiry / School Program / Workshop Reservation / General Question.
- Fields: name, email, phone, purpose (select), message/details, preferred contact method.
- Conditional fields: if "Portrait Inquiry" → pet name(s)/photo upload (optional); if "Workshop Reservation" → workshop selector + preferred date.
- On submit: store lead in Neon DB + send notification email to Claire (and confirmation email to client) via Resend.
- Success state: warm confirmation message + animated checkmark (Framer Motion), in keeping with brand tone.

### Components needed:
`BookingForm`, `FormField` (shadcn-based), `FileUploadField`, `SuccessConfirmation`.

---

## 9. Feature 8 — Admin Dashboard (Claire's CMS) — `/admin/*`

- Auth-gated (NextAuth credentials, single admin user for v1).
- Views:
  - **Leads/Bookings inbox** — list of form submissions with status (new/contacted/closed).
  - **Portfolio manager** — add/edit/delete portrait case studies (image, title, story, package type).
  - **Product manager** — add/edit/delete shop products.
- Keep UI simpler/more utilitarian than the marketing site but still on-brand (cream/sage palette, Cormorant headings) — shadcn `DataTable` pattern.

---

## 10. Non-Functional Requirements

- **Accessibility:** WCAG AA minimum — color contrast checked against the palette above (ink `#2B2B26` on cream `#F7F3EC` passes; verify all CTA button text contrast).
- **Performance:** Lighthouse performance ≥ 90 on landing page; lazy-load all below-the-fold images; use Next.js `<Image>` everywhere.
- **SEO:** proper metadata per page (title/description), OpenGraph image using brand badge logo, sitemap.xml, robots.txt.
- **Copyright safety:** Do not reproduce any third-party article text verbatim (e.g., the Marhaba.qa article referenced in the brand notes) — link out or paraphrase only.

---

## 11. Out of Scope for v1 (explicitly defer)

- Real payment processing (Stripe) — stub checkout only, flag as "Phase 2."
- Multi-admin roles/permissions.
- Multilingual (Arabic) version — flagged as a strong future enhancement given the Doha/Qatar audience, but not in v1 scope unless client confirms.
