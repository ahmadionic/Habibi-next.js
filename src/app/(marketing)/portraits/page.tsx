import type { Metadata } from "next";
import { PageHero }                from "@/components/layout/PageHero";
import { FadeIn }                  from "@/components/layout/FadeIn";
import { SimplePortraitSection }   from "@/components/portraits/SimplePortraitSection";
import { SimplePortraitCaseStudies } from "@/components/portraits/SimplePortraitCaseStudies";
import { SomethingSpecialSection } from "@/components/portraits/SomethingSpecialSection";
import { RemembranceSection }      from "@/components/portraits/RemembranceSection";
import { ProcessNote }             from "@/components/portraits/ProcessNote";
import { CTABanner }               from "@/components/sections/CTABanner";
import { DividerCreamToLinen, DividerCreamToPine } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Pet Portraits With Pride of Place | HABibi by Claire Olivier",
  description:
    "Hand-drawn pet portraits in graphite, colour pencil, and mixed media — " +
    "bespoke fine art that gives your animal companion the pride of place they deserve.",
};

/*
 * Feature 2 — HABibi for Homes / Pet Portraits — /portraits
 * FEATURE_SRS §3 | THEME_GUIDE §2, 3, 5, 6, 7
 *
 * Complete section order:
 *   1. PageHero                    image hero, eyebrow/title/subtitle/CTA
 *   2. Intro                       bg-cream — animals as family, pride of place
 *   ── wave: cream → linen ──
 *   3. SimplePortraitSection       bg-linen, id="packages" — 3 pricing tiers
 *   4. SimplePortraitCaseStudies   bg-linen — Henry, Grisette, Black & White
 *   ── gradient: linen → cream ──
 *   5. SomethingSpecialSection     bg-cream — merch package, Sophie/Closest Friend/Daddy's Girl
 *   ── gradient: cream → linen ──
 *   6. RemembranceSection          bg-linen — Carlos, Leen, Stevie
 *   ── gradient: linen → cream ──
 *   7. ProcessNote                 bg-cream — up to 30 hrs, per-request pricing
 *   ── wave: cream → deep-pine ──
 *   8. CTABanner                   bg-deep-pine — "Book a Consultation"
 */
export default function PortraitsPage() {
  return (
    <>

      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="HABibi for Homes"
        title="Pet Portraits With Pride of Place"
        subtitle="Where every furbaby becomes a treasured piece of art."
        subtitleStyle="script"
        backgroundImage="/assets/portraits/hero-portraits.png"
        ctaLabel="See the Packages"
        ctaHref="#packages"
      />

      {/* ── 2. Intro paragraph ────────────────────────────────────────────── */}
      <section aria-label="About pet portraits" className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-prose px-4 text-center lg:px-8">

          <FadeIn variant="fadeIn">
            <div
              aria-hidden="true"
              className="mx-auto mb-8 w-12"
              style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.7 }}
            />
          </FadeIn>

          <FadeIn variant="fadeUp" delay={0.08}>
            <p className="font-body text-base leading-relaxed text-ink md:text-lg">
              Our animals walk beside us through every chapter of life — steady,
              joyful, and wholly themselves. A pet portrait is an invitation to
              honour that bond: to take the face you know better than any other
              and give it the dignity of fine art, hung where it belongs — at
              the heart of your home.
            </p>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={0.16}>
            <p className="mt-5 font-body text-base leading-relaxed text-ink-soft md:text-lg">
              Whether your companion greets you at the door each evening or
              lives now only in photographs, a hand-drawn portrait by Claire
              transforms your love into something permanent, personal, and
              utterly beautiful — crafted in archival materials built to last
              a lifetime and beyond.
            </p>
          </FadeIn>

          <FadeIn variant="fadeIn" delay={0.24}>
            <div
              aria-hidden="true"
              className="mx-auto mt-8 w-12"
              style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.7 }}
            />
          </FadeIn>

        </div>
      </section>

      {/* ── wave: cream → linen ───────────────────────────────────────────── */}
      <DividerCreamToLinen />

      {/* ── 3. Simple Portrait Package (id="packages") ────────────────────── */}
      <SimplePortraitSection />

      {/* ── 4. Simple Portrait case studies ───────────────────────────────── */}
      <SimplePortraitCaseStudies />

      {/* ── gradient: linen → cream ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="h-16 w-full"
        style={{ background: "linear-gradient(to bottom, #E7DCC8, #F7F3EC)" }}
      />

      {/* ── 5. Something Special Package + case studies ────────────────────── */}
      <SomethingSpecialSection />

      {/* ── gradient: cream → linen ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="h-16 w-full"
        style={{ background: "linear-gradient(to bottom, #F7F3EC, #E7DCC8)" }}
      />

      {/* ── 6. Remembrance Package + testimonials ─────────────────────────── */}
      <RemembranceSection />

      {/* ── gradient: linen → cream ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="h-16 w-full"
        style={{ background: "linear-gradient(to bottom, #E7DCC8, #F7F3EC)" }}
      />

      {/* ── 7. Process note ───────────────────────────────────────────────── */}
      <ProcessNote />

      {/* ── wave: cream → deep-pine ───────────────────────────────────────── */}
      <DividerCreamToPine />

      {/* ── 8. CTA Banner ─────────────────────────────────────────────────── */}
      <CTABanner
        eyebrow="Let's Begin"
        heading="Ready to Commission Your Portrait?"
        subtext={
          "Book a no-obligation consultation with Claire to discuss your vision, " +
          "choose your medium and format, and receive a personal quote and timeline."
        }
        buttonLabel="Book a Consultation"
        buttonHref="/book"
        variant="pine"
      />

    </>
  );
}
