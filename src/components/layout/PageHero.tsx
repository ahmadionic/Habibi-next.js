"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeIn } from "@/components/layout/FadeIn";

/*
 * CTA rendered as a motion-enhanced Next.js Link (not a <button>).
 *
 * Wrapping <BrandButton> in <Link> creates an anchor→button nesting which is
 * invalid HTML. Instead, we style this link identically to BrandButton primary
 * and attach the same Framer Motion hover/tap behaviour.
 * Defined at module level so the component identity is stable across renders.
 */
const MotionCTALink = motion.create(Link);

/* THEME_GUIDE section 6 shadow values */
const SHADOW_SOFT  = "0 4px 20px rgba(51,75,58,0.08)";
const SHADOW_HOVER = "0 12px 40px rgba(179,115,82,0.15)";

/* ── Props ──────────────────────────────────────────────────────────────── */

export interface PageHeroProps {
  /** All-caps eyebrow label (uses SectionEyebrow component). */
  eyebrow: string;
  /** Primary H1 headline — font-heading (Cormorant Garamond), text-4xl/5xl. */
  title: string;
  /**
   * Optional supporting line beneath the headline.
   * - "body"   → Montserrat, text-ink-soft, text-lg — for factual subtitles.
   * - "script" → Allura, terracotta, ~1.75rem — for emotional tagline-style lines.
   */
  subtitle?: string;
  subtitleStyle?: "body" | "script";
  /** Path to the hero background image (local /public or remote URL). */
  backgroundImage: string;
  /**
   * Optional CTA. Both ctaLabel AND ctaHref must be provided for the button
   * to render; providing only one has no effect.
   */
  ctaLabel?: string;
  ctaHref?: string;
  /** Optional overrides for background image positioning and text glow intensity */
  imagePosition?: string;
  glowOpacityClass?: string;
  align?: "left" | "center";
}

/* ── Component ─────────────────────────────────────────────────────────── */

/**
 * Full-bleed hero banner used by every inner marketing page
 * (Portraits, Education, Workshops, Shop, About).
 *
 * Visual decisions:
 * - Background: next/image fill + object-cover object-top     — THEME_GUIDE §5
 * - Overlay:    cream-to-transparent gradient (bottom → top)  — THEME_GUIDE §5
 * - Text color: deep-pine on cream gradient                   — THEME_GUIDE §2
 * - Animation:  FadeIn wrappers staggered at 80ms intervals   — THEME_GUIDE §7
 * - Padding:    py-16 (space-7 = 64px) / lg:py-24 (space-8 = 96px) — THEME_GUIDE §6
 * - CTA:        MotionCTALink — styled like BrandButton primary
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  subtitleStyle = "body",
  backgroundImage,
  ctaLabel,
  ctaHref,
  imagePosition = "object-top",
  glowOpacityClass = "bg-cream/70",
  align = "left",
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  /* step = staggerChildren token = 80ms, matching THEME_GUIDE §7 */
  const step = motionTokens.staggerChildren;

  return (
    <section
      aria-label={`${title} — page hero`}
      className="relative flex min-h-[460px] items-center overflow-hidden bg-cream py-20 lg:min-h-[520px] lg:py-28"
    >

      {/* ── Background image ─────────────────────────────────────────── */}
      {/*
        fill + object-cover: image fills the section regardless of its
        natural dimensions. object-top keeps faces/subjects visible even
        on short viewports. priority=true because this is above-the-fold.
        THEME_GUIDE §5: "hero images crop intelligently (object-position: top)".
      */}
      <Image
        src={backgroundImage}
        alt=""                    /* decorative — heading provides the context */
        aria-hidden="true"
        fill
        className={cn("object-cover", imagePosition)}
        priority
        unoptimized               /* handles SVG placeholders + bypasses optimizer */
      />

      {/* ── Text Visibility Overlays ─────────────────────────────────── */}
      {/*
        1. Left-to-right horizontal cream gradient or soft center wash:
      */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          align === "center"
            ? "bg-cream/35"
            : "bg-gradient-to-r from-cream/95 via-cream/80 to-transparent"
        )}
      />
      {/*
        2. Bottom-up vertical gradient: provides a smooth transition at the bottom
           edge blending into the page content below.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent"
      />

      {/*
        3. Glowing Spotlight backdrop: a blurred cream circle placed directly behind
           the text container to give a premium glow effect and increase legibility.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute h-[380px] w-[560px] rounded-full blur-3xl",
          align === "center"
            ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            : "left-0 top-1/4 -translate-x-12",
          glowOpacityClass
        )}
      />

      {/*
        4. Top cream melt: blends the bottom edge of the transparent/sticky navigation bar
           into the hero section smoothly, matching the homepage's visual transition.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-cream via-cream/60 to-transparent"
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl px-4 py-16 lg:px-8 lg:py-24",
          align === "center" && "flex flex-col items-center justify-center text-center"
        )}
      >
        <div
          className={cn(
            "flex max-w-2xl flex-col gap-4",
            align === "center" && "items-center justify-center text-center mx-auto"
          )}
        >

          {/* Eyebrow — THEME_GUIDE §3: Montserrat 600, 0.75rem, 0.18em tracking */}
          <FadeIn variant="fadeUp" delay={0}>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
          </FadeIn>

          {/* H1 — THEME_GUIDE §3: Cormorant Garamond, weight 700, text-4xl/5xl */}
          <FadeIn variant="fadeUp" delay={step}>
            <h1
              className={cn(
                "font-heading font-bold italic text-deep-pine",
                "text-4xl leading-tight tracking-tight",
                "md:text-5xl",
              )}
              style={{
                textShadow: "0 4px 34px rgba(247,243,236,0.98)",
              }}
            >
              {title}
            </h1>
          </FadeIn>

          {/* Subtitle — "body" or "script" per prop */}
          {subtitle && (
            <FadeIn variant="fadeUp" delay={step * 2}>
              {subtitleStyle === "script" ? (
                /*
                 * Allura (font-script) — THEME_GUIDE §3: "reserved for short
                 * emotional lines only, max ~8 words." Use for tagline-style subtitles.
                 * Color: terracotta — warm accent on cream — THEME_GUIDE §2.
                 */
                <p
                  className="font-script font-bold leading-snug text-terracotta"
                  style={{
                    fontSize: "1.75rem",
                    textShadow: "0 4px 34px rgba(247,243,236,0.98)",
                  }}
                >
                  {subtitle}
                </p>
              ) : (
                /* Montserrat body — factual, readable, ink-soft on cream */
                <p
                  className="font-body font-bold text-lg leading-relaxed text-ink"
                  style={{
                    textShadow: "0 4px 34px rgba(247,243,236,0.98)",
                  }}
                >
                  {subtitle}
                </p>
              )}
            </FadeIn>
          )}

          {/* CTA button — only renders when both label + href are supplied */}
          {ctaLabel && ctaHref && (
            <FadeIn variant="fadeUp" delay={step * 3}>
              <MotionCTALink
                href={ctaHref}
                /* Identical initial/hover/tap behaviour to BrandButton primary */
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
                /*
                 * Visual: BrandButton primary (deep-pine / cream / radius-pill).
                 * THEME_GUIDE §6: radius-pill for primary CTAs.
                 * THEME_GUIDE §3: font-body, weight 600.
                 * mt-2 adds extra breathing room from the subtitle.
                 */
                className={cn(
                  "mt-2 inline-flex items-center gap-2 rounded-pill px-7 py-3",
                  "font-body text-sm font-semibold tracking-wide",
                  "bg-deep-pine text-cream select-none",
                )}
              >
                {ctaLabel}
              </MotionCTALink>
            </FadeIn>
          )}

        </div>
      </div>

    </section>
  );
}
