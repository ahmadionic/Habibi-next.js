import type { Metadata } from "next";
import { PageHero }           from "@/components/layout/PageHero";
import { FadeIn }             from "@/components/layout/FadeIn";
import { DividerCreamToLinen, SectionDivider } from "@/components/ui/SectionDivider";
import { CredentialBlock }    from "@/components/education/CredentialBlock";
import { ProgramsGrid }       from "@/components/education/ProgramsGrid";
import { StoryExcerptCard }   from "@/components/education/StoryExcerptCard";
import { CTABanner }          from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "HABibi for Children & Teens — Learning Through Connection | Claire Olivier",
  description:
    "Animal-assisted learning programs for children and teens, led by Miss Claire — " +
    "certified inclusion specialist and Animal Assisted Intervention practitioner.",
};

/*
 * Feature 3 — HABibi for Children & Teens / Education — /education
 * FEATURE_SRS §4 | THEME_GUIDE §2, 3, 5, 6, 7
 *
 * Section order (Prompts 5.1–5.3):
 *   1. PageHero         — hero image, eyebrow / title / script subtitle / CTA
 *   2. Intro            — bg-cream — inclusive philosophy, animal-assisted learning
 *   ── wave: cream → linen ──
 *   3. CredentialBlock  — bg-linen — photo + credentials, 2-col layout
 *   ── gradient: linen → cream ──
 *   4. ProgramsGrid       — bg-cream, id="programs" — 2×2 program cards
 *   ── gradient: cream → sand ──
 *   5. StoryExcerptCard  — bg-sand — original quail vignette, attribution
 *   ── wave: sand → deep-pine ──
 *   6. CTABanner         — bg-deep-pine — "Book a School Consultation" → /book
 */
export default function EducationPage() {
  return (
    <>

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="HABIBI FOR CHILDREN & TEENS"
        title="Learning Through Connection"
        subtitle="Meet Miss Claire and her therapy quails."
        subtitleStyle="script"
        backgroundImage="/assets/education/hero-education.jpg"
        ctaLabel="Meet the Programs"
        ctaHref="#programs"
      />

      {/* ── 2. Intro paragraph ──────────────────────────────────────────── */}
      <section aria-label="About HABibi education" className="bg-cream py-16 lg:py-20">
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
              Children are as varied as the worlds they carry inside them. Some
              think in pictures, some in movement, some in the quiet space between
              words — and all of them deserve a place where their particular kind
              of brilliant is welcomed, not worked around. At HABibi, we start
              from a simple belief: every child holds the capacity to show what
              they <em>can</em> do, and they do that best when the weight of
              getting it wrong is lifted from their shoulders.
            </p>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={0.16}>
            <p className="mt-5 font-body text-base leading-relaxed text-ink-soft md:text-lg">
              That is where the animals come in. The gentle company of Miss
              Claire's therapy quails lowers the stakes in a way no worksheet
              can — creating a calm, unhurried atmosphere where curiosity
              reawakens and real learning quietly takes root.
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

      {/* ── wave: cream → linen ─────────────────────────────────────────── */}
      <DividerCreamToLinen />

      {/* ── 3. Credential block ─────────────────────────────────────────── */}
      <CredentialBlock />

      {/* ── gradient: linen → cream ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="h-16 w-full"
        style={{ background: "linear-gradient(to bottom, #E7DCC8, #F7F3EC)" }}
      />

      {/* ── 4. Programs grid (id="programs") ────────────────────────────── */}
      <ProgramsGrid />

      {/* ── gradient: cream → sand ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="h-16 w-full"
        style={{ background: "linear-gradient(to bottom, #F7F3EC, #DCC8A6)" }}
      />

      {/* ── 5. Story excerpt ────────────────────────────────────────────── */}
      <StoryExcerptCard />

      {/* ── wave: sand → deep-pine ──────────────────────────────────────── */}
      <SectionDivider from="sand" to="deep-pine" />

      {/* ── 6. CTA Banner ───────────────────────────────────────────────── */}
      <CTABanner
        eyebrow="Let's Work Together"
        heading="Bring HABibi to Your School"
        subtext={
          "Every school community holds children who are waiting for a different " +
          "kind of invitation to learn. Miss Claire partners with schools and " +
          "families to build animal-assisted programs that meet each learner " +
          "exactly where they are — and help them take the next step forward."
        }
        buttonLabel="Book a School Consultation"
        buttonHref="/book"
        variant="pine"
      />

    </>
  );
}
