import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BioSection } from "@/components/about/BioSection";
import { MissionStatement } from "@/components/about/MissionStatement";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Meet Claire Olivier | About | HABibi",
  description:
    "Animal therapy specialist, inclusive educator, and artist Claire Olivier " +
    "shares the story and values behind HABibi — where art, animals, and " +
    "well-being create connection and healing in Qatar.",
};

/*
 * Feature 6 — About / Meet Claire — /about
 * FEATURE_SRS §7 | THEME_GUIDE §2, 3, 5, 6, 7
 *
 * Section order (across all Group 8 prompts):
 *   8.1 → PageHero + BioSection        ✓
 *   8.2 → MissionStatement                       ✓
 *   8.3 → CTABanner                             ← this prompt
 */
export default function AboutPage() {
  return (
    <>

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      {/*
       * No CTA needed on the About hero — the page itself is the destination.
       * subtitleStyle="script" → Allura font, terracotta color.
       */}
      <PageHero
        eyebrow="ABOUT"
        title="Meet Claire Olivier"
        subtitle="Artist. Educator. Animal Advocate."
        subtitleStyle="script"
        backgroundImage="/assets/about/claire-bio.png"
      />

      {/* ── 2. Bio section ──────────────────────────────────────────────── */}
      {/*
       * Editorial 3-image collage + first-person bio copy.
       * Voice is deliberately personal ("I believe…") to distinguish from
       * the third-person CredentialBlock on /education.
       * Pull-quote verbatim from FEATURE_SRS §7.
       */}
      <BioSection />

      {/* ── cream → sand wave transition ────────────────────────────────── */}
      <SectionDivider from="cream" to="sand" />

      {/* ── 3. Mission statement ────────────────────────────────────────── */}
      {/*
       * Centered section on bg-sand. Two beats:
       *   a) Original-phrasing mission paragraph (first-person paraphrase
       *      of FEATURE_SRS §7 mission statement).
       *   b) Brand-owned pull-quote in Allura (font-script) with ♡ accent
       *      — verbatim from FEATURE_SRS §7, safe to reproduce as-is.
       */}
      <MissionStatement />

      {/* ── sand → deep-pine wave transition ────────────────────────────── */}
      <SectionDivider from="sand" to="deep-pine" />

      {/* ── 4. CTA banner ───────────────────────────────────────────────── */}
      {/*
       * Reused CTABanner from Group 4. variant="pine" → bg-deep-pine,
       * cream text, cream pill button. Subtext covers all three visitor
       * types (schools, families, general enquiries).
       */}
      <CTABanner
        eyebrow="Work With Claire"
        heading="Let's Create Something Meaningful Together"
        subtext="Whether you're a school exploring inclusive programmes, a family seeking support, or simply curious about the work — Claire would love to hear from you."
        buttonLabel="Get in Touch"
        buttonHref="/book"
        variant="pine"
      />

    </>
  );
}
