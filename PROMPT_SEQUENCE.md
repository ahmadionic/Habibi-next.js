# PROMPT_SEQUENCE.md — Master Checklist

Tick each box in order. Do not skip ahead. Each ID maps to a prompt in the matching file inside `/prompts/`.

## Group 0 — Setup (`prompts/00-setup.md`)
- [ ] 0.1 — Initialize Next.js project + core dependencies
- [ ] 0.2 — Install Tailwind, shadcn/ui, Framer Motion
- [ ] 0.3 — Install Neon DB + Drizzle ORM + connect database
- [ ] 0.4 — Install auth (NextAuth) + email (Resend) packages
- [ ] 0.5 — Create folder structure (industry standard)
- [ ] 0.6 — Place asset folders (per `00_ASSET_PLACEHOLDERS.md`)

## Group 1 — Design System (`prompts/01-design-system.md`)
- [ ] 1.1 — Configure Tailwind theme tokens from THEME_GUIDE.md
- [ ] 1.2 — Add Google Fonts (Cormorant Garamond, Montserrat, Allura)
- [ ] 1.3 — Create global CSS variables + base styles
- [ ] 1.4 — Create Framer Motion tokens file
- [ ] 1.5 — Build core UI primitives (Button, Card, SectionEyebrow, Badge)

## Group 2 — Layout, Nav, Footer (`prompts/02-layout-nav-footer.md`)
- [ ] 2.1 — Build root layout with fonts + metadata
- [ ] 2.2 — Build SiteNav (desktop + mobile drawer)
- [ ] 2.3 — Build SiteFooter
- [ ] 2.4 — Build reusable PageHero component

## Group 3 — Landing Page (`prompts/03-landing-page.md`)
- [ ] 3.1 — Hero section
- [ ] 3.2 — Pillar cards (3 services + shop)
- [ ] 3.3 — Brand values strip
- [ ] 3.4 — Stat callout section
- [ ] 3.5 — Newsletter signup + final CTA

## Group 4 — Portraits Page (`prompts/04-portraits-page.md`)
- [ ] 4.1 — Page hero + intro
- [ ] 4.2 — Simple Portrait Package + pricing table
- [ ] 4.3 — Case study gallery (Henry, Grisette, Black & White)
- [ ] 4.4 — Something Special Package + case studies
- [ ] 4.5 — Remembrance Package + case studies
- [ ] 4.6 — Process note + CTA banner

## Group 5 — Education Page (`prompts/05-education-page.md`)
- [ ] 5.1 — Page hero + intro
- [ ] 5.2 — Credential block (Meet Miss Claire)
- [ ] 5.3 — Program cards grid (4 programs)
- [ ] 5.4 — Story excerpt card (Queenie and the Quails)
- [ ] 5.5 — CTA banner

## Group 6 — Workshops Page (`prompts/06-workshops-page.md`)
- [ ] 6.1 — Page hero
- [ ] 6.2 — Seeds of Change workshop card
- [ ] 6.3 — Animal Portraits workshop card
- [ ] 6.4 — CTA banner with workshop selector

## Group 7 — Shop (`prompts/07-shop.md`)
- [ ] 7.1 — Database schema for products (Neon + Drizzle)
- [ ] 7.2 — Product grid + category filter page
- [ ] 7.3 — Product detail page
- [ ] 7.4 — Cart drawer (client-side state)
- [ ] 7.5 — Stub checkout page

## Group 8 — About Page (`prompts/08-about.md`)
- [ ] 8.1 — Bio section + portrait imagery
- [ ] 8.2 — Mission statement + pull-quote
- [ ] 8.3 — CTA banner

## Group 9 — Booking Form + Backend (`prompts/09-booking-form-backend.md`)
- [ ] 9.1 — Database schema for leads/bookings
- [ ] 9.2 — Booking form UI with conditional fields
- [ ] 9.3 — API route to save lead to DB
- [ ] 9.4 — Email notifications (Resend)
- [ ] 9.5 — Success confirmation animation

## Group 10 — Admin Dashboard (`prompts/10-admin-dashboard.md`)
- [ ] 10.1 — NextAuth credentials setup + login page
- [ ] 10.2 — Protected /admin layout
- [ ] 10.3 — Leads inbox table
- [ ] 10.4 — Portfolio manager (CRUD)
- [ ] 10.5 — Product manager (CRUD)

## Group 11 — Polish & Deploy (`prompts/11-polish-deploy.md`)
- [ ] 11.1 — Responsive QA pass (all pages, all breakpoints)
- [ ] 11.2 — Accessibility pass
- [ ] 11.3 — SEO metadata + sitemap + OG images
- [ ] 11.4 — Performance pass (Lighthouse)
- [ ] 11.5 — Deploy to Vercel + connect Neon production DB

---

**Tip:** Print this page or keep it pinned in a side panel. Mark a checkbox only after the paired Test Prompt's Expected Result is confirmed.
