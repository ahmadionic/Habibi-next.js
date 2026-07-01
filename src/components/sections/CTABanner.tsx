"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";
import { FadeIn } from "@/components/layout/FadeIn";

/*
 * CTA rendered as a motion-enhanced Next.js Link.
 * BrandButton is a <button> — wrapping it in <Link> creates invalid
 * anchor→button nesting. We style this identically to BrandButton and attach
 * the same Framer Motion hover/tap behaviour. Module-level so identity is stable.
 */
const MotionCTALink = motion.create(Link);

const SHADOW_SOFT  = "0 4px 20px rgba(51,75,58,0.08)";
const SHADOW_HOVER = "0 12px 40px rgba(179,115,82,0.20)";

/* ── Variant config ──────────────────────────────────────────────────────── */

const VARIANTS = {
  pine: {
    section:  "bg-deep-pine",
    eyebrow:  "text-sage/80",
    heading:  "text-cream",
    subtext:  "text-cream/70",
    button:   "bg-cream text-deep-pine hover:bg-sand",
  },
  terracotta: {
    section:  "bg-terracotta",
    eyebrow:  "text-cream/70",
    heading:  "text-white",
    subtext:  "text-white/75",
    button:   "bg-cream text-terracotta hover:bg-sand",
  },
} as const;

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface CTABannerProps {
  /** H2 headline — Cormorant Garamond, text-cream. */
  heading: string;
  /** Optional supporting sentence beneath the heading. */
  subtext?: string;
  /** CTA button label. */
  buttonLabel: string;
  /** Navigation href — any app route or anchor link. */
  buttonHref: string;
  /**
   * Background / colour scheme:
   *   "pine"       — bg-deep-pine, cream text, cream pill button (default)
   *   "terracotta" — bg-terracotta, white text, cream pill button
   */
  variant?: keyof typeof VARIANTS;
  /**
   * Optional short all-caps eyebrow above the heading.
   * Uses the same Montserrat small-caps style as SectionEyebrow.
   */
  eyebrow?: string;
}

/* ── Component ───────────────────────────────────────────────────────────── */

/**
 * Reusable full-width CTA banner used at the bottom of every feature page:
 * Portraits, Education, Workshops, Shop, About (and potentially Book).
 *
 * Design decisions (THEME_GUIDE):
 *   Background: deep-pine (primary dark) or terracotta (warm accent) — §2
 *   Heading:    Cormorant Garamond, generous size                     — §3
 *   Button:     cream pill, deep-pine / terracotta text               — §6
 *   Motion:     FadeIn scroll-triggered + button hover/tap            — §7
 *   Padding:    py-20 / lg:py-28 — space-7/8 rhythm                  — §6
 *
 * Reusability pattern: all text and links are props, no hardcoded strings.
 * Education page example:  heading="Ready to Bring HABibi to Your School?"
 * Workshops page example:  heading="Reserve Your Spot"
 * About page example:      heading="Let's Start a Conversation"
 */
export function CTABanner({
  heading,
  subtext,
  buttonLabel,
  buttonHref,
  variant = "pine",
  eyebrow,
}: CTABannerProps) {
  const prefersReducedMotion = useReducedMotion();
  const styles = VARIANTS[variant];
  const STEP   = motionTokens.staggerChildren;

  return (
    <section
      aria-label={heading}
      className={cn("py-20 lg:py-28", styles.section)}
    >
      <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">

        {/* Optional eyebrow — Montserrat small-caps, THEME_GUIDE §3 */}
        {eyebrow && (
          <FadeIn variant="fadeUp">
            <p
              className={cn(
                "mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em]",
                styles.eyebrow,
              )}
            >
              {eyebrow}
            </p>
          </FadeIn>
        )}

        {/* Heading — Cormorant Garamond, generous — THEME_GUIDE §3 */}
        <FadeIn variant="fadeUp" delay={eyebrow ? STEP : 0}>
          <h2
            className={cn(
              "font-heading text-3xl font-medium leading-tight md:text-4xl lg:text-5xl",
              styles.heading,
            )}
          >
            {heading}
          </h2>
        </FadeIn>

        {/* Supporting subtext */}
        {subtext && (
          <FadeIn variant="fadeUp" delay={STEP * 2}>
            <p
              className={cn(
                "mx-auto mt-5 max-w-lg font-body text-base leading-relaxed",
                styles.subtext,
              )}
            >
              {subtext}
            </p>
          </FadeIn>
        )}

        {/* Gold hairline — THEME_GUIDE §4 */}
        <FadeIn variant="fadeIn" delay={STEP * 3}>
          <div
            aria-hidden="true"
            className="mx-auto my-8 w-10"
            style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.55 }}
          />
        </FadeIn>

        {/* CTA button */}
        <FadeIn variant="fadeUp" delay={STEP * 4}>
          <MotionCTALink
            href={buttonHref}
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
              "font-body text-sm font-semibold tracking-wide select-none",
              "transition-colors duration-200",
              styles.button,
            )}
          >
            {buttonLabel}
          </MotionCTALink>
        </FadeIn>

      </div>
    </section>
  );
}
