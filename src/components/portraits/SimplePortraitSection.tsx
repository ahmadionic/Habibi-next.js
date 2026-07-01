"use client";

import { PenLine, Palette, Sparkles, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { PricingTierCard } from "./PricingTierCard";
import { motionTokens } from "@/lib/motion";

/* ── Pricing data — FEATURE_SRS §3 §2 (exact prices) ───────────────────── */

const TIERS = [
  {
    name: "A4 Graphite Sketch",
    price: "QAR 750",
    priceLabel: "Starting from",
    description:
      "A refined pencil portrait that renders your pet's character in subtle " +
      "tones and precise detail — timeless, elegant, and always personal.",
    features: [
      "A4 format (210 × 297 mm)",
      "Graphite pencil on archival paper",
      "Ready to frame on arrival",
    ],
    icon: PenLine,
  },
  {
    name: "A4 Colour",
    price: "QAR 1,000",
    priceLabel: "Starting from",
    description:
      "Rich colour pencil with a complementary background — your pet brought " +
      "to life in warm, vivid tones that capture every detail of their coat.",
    features: [
      "A4 format (210 × 297 mm)",
      "Colour pencil on archival paper",
      "Simple background included",
    ],
    icon: Palette,
  },
  {
    name: "A3 & Custom",
    price: "Quote on request",
    description:
      "Larger format, multiple animals in a single composition, or mixed " +
      "media — each bespoke piece is individually scoped and quoted.",
    features: [
      "A3 (297 × 420 mm) or larger",
      "Multiple subjects welcome",
      "Additional animals quoted separately",
    ],
    icon: Sparkles,
  },
] as const;

const STEP = motionTokens.staggerChildren;

/* ── Component ───────────────────────────────────────────────────────────── */

/**
 * Simple Portrait Package section — Feature 2 (FEATURE_SRS §3 §2).
 *
 * id="packages" is the scroll target for the PageHero CTA "See the Packages".
 *
 * Prices are verbatim from FEATURE_SRS §3:
 *   QAR 750  — A4 graphite
 *   QAR 1,000 — A4 colour
 *   A3 — quote on request
 *   Additional animals — quoted separately
 *
 * Archival note paraphrased (not verbatim) from FEATURE_SRS §3 §2:
 *   "archival-quality materials, 150 years of lightfastness, museum-quality paper"
 */
export function SimplePortraitSection() {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="bg-linen py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────── */}
        <div className="mb-12 text-center">
          <FadeIn variant="fadeUp">
            <SectionEyebrow showHeart>Simple Portrait Package</SectionEyebrow>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP}>
            <h2
              id="packages-heading"
              className="mt-3 font-heading text-3xl font-medium text-deep-pine md:text-4xl"
            >
              Choose Your Medium & Format
            </h2>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP * 2}>
            <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-ink-soft">
              Every portrait is drawn entirely by hand — Claire works slowly,
              intuitively, and with deep care for the individual personality of
              your animal. Each piece is a one-of-a-kind original.
            </p>
          </FadeIn>
        </div>

        {/* ── Pricing cards — 3-col desktop, 1-col mobile ─────────────── */}
        {/*
         * THEME_GUIDE §8: grids collapse 3-col desktop → 1-col mobile.
         * items-stretch ensures all cards in the row reach equal height.
         * h-full propagates from grid cell → FadeIn → PricingTierCard → BrandCard.
         */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <FadeIn
              key={tier.name}
              variant="fadeUp"
              delay={STEP * (i + 1)}
              className="h-full"
            >
              <PricingTierCard
                name={tier.name}
                price={tier.price}
                priceLabel={"priceLabel" in tier ? tier.priceLabel : undefined}
                description={tier.description}
                features={[...tier.features]}
                icon={tier.icon}
              />
            </FadeIn>
          ))}
        </div>

        {/* ── Archival materials note ──────────────────────────────────── */}
        {/*
         * FEATURE_SRS §3 §2: "archival-quality materials, 150 years of
         * lightfastness, museum-quality paper" — paraphrased, not verbatim.
         */}
        <FadeIn variant="fadeUp" delay={STEP * 4}>
          <div className="mt-10 flex items-start justify-center gap-3 text-center">
            <ShieldCheck
              size={18}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0 text-sage"
              aria-hidden="true"
            />
            <p className="max-w-lg font-body text-sm leading-relaxed text-ink-soft">
              All portraits are created on acid-free, museum-grade paper using
              archival materials — with a minimum lightfastness rating of{" "}
              <strong className="font-semibold text-ink">150 years</strong>, the
              same standard upheld by galleries and conservation collections worldwide.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
