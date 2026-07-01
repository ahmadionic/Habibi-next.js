import type { Metadata } from "next";
import { PageHero }           from "@/components/layout/PageHero";
import { DividerCreamToLinen, DividerLinenToPine } from "@/components/ui/SectionDivider";
import { WorkshopsSection }   from "@/components/workshops/WorkshopsSection";
import { CTABanner }          from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Workshops for Adults & Teens | HABibi by Claire Olivier",
  description:
    "Watercolour and animal portrait workshops that blend creative skill-building " +
    "with genuine wellbeing — open to all levels, led by Claire Olivier.",
};

/*
 * Feature 4 — HABibi for Health & Growth / Workshops — /workshops
 * FEATURE_SRS §5 | THEME_GUIDE §2, 3, 5, 7
 *
 * Section order (Prompts 6.1–6.4):
 *   1. PageHero          — hero image, eyebrow / title / script subtitle / CTA
 *   ── wave: cream → linen ──
 *   2. WorkshopsSection  — bg-linen, id="workshops" — 2-col workshop cards
 *   ── wave: linen → deep-pine ──
 *   3. CTABanner         — bg-deep-pine — "Reserve Your Spot" → /book
 */
export default function WorkshopsPage() {
  return (
    <>

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="HABIBI FOR HEALTH & GROWTH"
        title="Workshops for Adults & Teens"
        subtitle="Create. Connect. Heal."
        subtitleStyle="script"
        backgroundImage="/assets/workshops/hero-workshops.jpg"
        ctaLabel="Explore Workshops"
        ctaHref="#workshops"
      />

      {/* ── wave: cream → linen ─────────────────────────────────────────── */}
      <DividerCreamToLinen />

      {/* ── 2. Workshops section (id="workshops") ───────────────────────── */}
      <WorkshopsSection />

      {/* ── wave: linen → deep-pine ─────────────────────────────────────── */}
      <DividerLinenToPine />

      {/* ── 3. CTA Banner ───────────────────────────────────────────────── */}
      <CTABanner
        eyebrow="Limited Spots Available"
        heading="Save Your Seat"
        subtext={
          "Each workshop is kept intentionally small so every participant " +
          "gets genuine attention and space to create. When a date calls to " +
          "you, don't wait — reserve your place and we'll take care of the rest."
        }
        buttonLabel="Reserve Your Spot"
        buttonHref="/book"
        variant="pine"
      />

    </>
  );
}
