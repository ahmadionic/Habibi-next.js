"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * MotionCTALink — motion-enhanced Next.js Link.
 * Renders a semantic <a> element with Framer Motion hover/tap.
 * Defined at module level so component identity is stable across renders.
 * Same pattern used in SiteNav, PageHero, and HeroSection.
 * Using this instead of wrapping BrandButton (which is a <button>) avoids
 * the invalid button-inside-anchor nesting.
 */
const MotionCTALink = motion.create(Link);

/* Shadow tokens — match BrandButton primary variant */
const SHADOW_SOFT  = "0 4px 20px rgba(51,75,58,0.08)";
const SHADOW_HOVER = "0 12px 40px rgba(179,115,82,0.15)";

const STEP = motionTokens.staggerChildren; /* 0.08s */

/**
 * Final homepage CTA — Feature 1 (FEATURE_SRS §2, closing CTA).
 *
 * Background: bg-cream (#F7F3EC) — returns to a light, open feel after the
 * deep-pine StatCallout section above. The dark section acts as the visual
 * reset that makes this cream feel fresh again (THEME_GUIDE §6 alternation).
 *
 * This section intentionally has no newsletter form — that is in SiteFooter
 * (built in Prompt 2.3) to avoid duplication. This section's sole job is to
 * drive conversions to /book with a single, clear CTA.
 *
 * Button: MotionCTALink styled to match BrandButton primary variant.
 *   href="/book" — page stub; will be built in Group 4.
 *
 * Animation: four staggered FadeIn elements (scroll-triggered, once).
 *   Eyebrow → h2 → body → button — each at STEP × index delay.
 */
export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">

        {/* Eyebrow */}
        <FadeIn variant="fadeUp">
          <SectionEyebrow showHeart>Take the First Step</SectionEyebrow>
        </FadeIn>

        {/* Heading — font-heading (Cormorant Garamond) — THEME_GUIDE §3 */}
        <FadeIn variant="fadeUp" delay={STEP}>
          <h2
            id="final-cta-heading"
            className="mt-3 font-heading text-4xl font-medium text-deep-pine md:text-5xl"
          >
            Ready to Begin?
          </h2>
        </FadeIn>

        {/* Supporting sentence — warm, brand-aligned, no newsletter mention */}
        <FadeIn variant="fadeUp" delay={STEP * 2}>
          <p className="mt-5 font-body text-base leading-relaxed text-ink-soft md:text-lg">
            Whether you are commissioning a portrait, bringing HABibi into your
            classroom, or simply want to learn more — we would love to hear
            from you.
          </p>
        </FadeIn>

        {/* CTA — primary button style */}
        {/*
         * Styled to match BrandButton primary exactly:
         *   bg-deep-pine text-cream, rounded-pill, px-8 py-3.5,
         *   font-body text-sm font-semibold tracking-wide.
         * THEME_GUIDE §9: CTA verbs — imperative, warm, specific.
         */}
        <FadeIn variant="fadeUp" delay={STEP * 3}>
          <div className="mt-8">
            <MotionCTALink
              href="/book"
              initial={{ boxShadow: SHADOW_SOFT }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { scale: 1.03, boxShadow: SHADOW_HOVER }
              }
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              transition={{
                duration: motionTokens.duration.fast,
                ease: motionTokens.ease,
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-pill px-8 py-3.5",
                "font-body text-sm font-semibold tracking-wide",
                "bg-deep-pine text-cream select-none",
              )}
            >
              Book a Consultation
            </MotionCTALink>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
