"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Gift } from "lucide-react";
import { FadeIn } from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Badge } from "@/components/ui/Badge";
import { PricingTierCard } from "./PricingTierCard";
import { CaseStudyGalleryCard } from "./CaseStudyGalleryCard";
import { motionTokens } from "@/lib/motion";

/* ── Navigation CTA ─────────────────────────────────────────────────────── */
/*
 * BrandButton is a <button> — wrapping it in <Link> creates invalid
 * anchor→button nesting. We use motion.create(Link) styled identically to
 * BrandButton primary, following the same pattern as SiteNav and HeroSection.
 */
const MotionCTALink = motion.create(Link);

const SHADOW_SOFT  = "0 4px 20px rgba(51,75,58,0.08)";
const SHADOW_HOVER = "0 12px 40px rgba(179,115,82,0.15)";

/* ── Merchandise type badges ─────────────────────────────────────────────── */

const MERCH_TYPES = [
  "Tote Bags", "Phone Cases", "Mugs", "Keyrings",
  "Canvas Prints", "Cushions", "Kindle Covers", "Planners",
] as const;

/* ── Case study data — FEATURE_SRS §3 §3 ────────────────────────────────── */
/*
 * Images: prompt specifies .jpg but actual files in /public/assets/portraits/
 * are numbered .png variants. Using -1.png (primary image) for each subject.
 *
 * Stories: entirely original paraphrases — no sentence appears verbatim from
 * the source document. Each preserves the key facts from FEATURE_SRS §3 §3
 * (medium, merchandise items, subject context) rewritten in HABibi brand voice.
 */
const CASE_STUDIES = [
  {
    imageSrc: "/assets/portraits/case-sophie-1.png",
    imageAlt: "Mixed media watercolour and gold leaf portrait of Sophie",
    name: "Sophie",
    badge: "Mixed Media · Watercolour & Gold Leaf",
    story:
      "A zumba instructor whose warmth fills every room she enters, Sophie " +
      "deserved a portrait as vibrant as she is. Claire wove watercolour and " +
      "gold leaf into a piece that radiates her energy, then extended the " +
      "artwork across a canvas print, studio cushions, and a set of custom " +
      "mugs — a fully coordinated expression of one remarkable personality.",
  },
  {
    imageSrc: "/assets/portraits/case-closestfriend-1.png",
    imageAlt: "Pastel portrait of a falcon and its teenage handler",
    name: "Closest Friend",
    badge: "A4 · Pastel",
    story:
      "A young falconer and his bird — two beings held together by patience, " +
      "trust, and a silent understanding few people ever experience. Claire " +
      "captured their bond in pastel on A4, then translated that portrait into " +
      "a phone case, water bottle, and carry bag: everyday objects made quietly " +
      "extraordinary by the story they carry.",
  },
  {
    imageSrc: "/assets/portraits/case-daddysgirl-1.png",
    imageAlt: "Portrait of a beloved twelve-year companion",
    name: "Daddy's Girl",
    badge: "Custom · Full Merchandise Suite",
    story:
      "Twelve years of morning greetings, quiet company, and an unwavering " +
      "presence that no words quite do justice. The portrait at the heart of " +
      "this commission became a whole world of keepsakes — a kindle cover, " +
      "daily planner, greeting cards, notepads, and keyrings — so that the " +
      "love it represents could be felt in every corner of life.",
  },
] as const;

const STEP = motionTokens.staggerChildren;

/* ── Component ───────────────────────────────────────────────────────────── */

/**
 * Something Special Portrait Package section — Feature 2 (FEATURE_SRS §3 §3).
 *
 * Reuses PricingTierCard (single centred card, wider than the 3-col simple
 * package tiers) and CaseStudyGalleryCard (3-col responsive grid).
 * No component logic is duplicated — both are imported from their source files.
 *
 * CTA: MotionCTALink → /book (not a BrandButton to avoid anchor→button nesting).
 */
export function SomethingSpecialSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="special-heading"
      className="bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────── */}
        <div className="mb-12 text-center">
          <FadeIn variant="fadeUp">
            <SectionEyebrow showHeart>Something Special Package</SectionEyebrow>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP}>
            <h2
              id="special-heading"
              className="mt-3 font-heading text-3xl font-medium text-deep-pine md:text-4xl"
            >
              A Portrait That Lives Beyond the Frame
            </h2>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP * 2}>
            <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-ink-soft">
              Begin with a bespoke original artwork, then carry it into the
              everyday — transformed into a curated collection of keepsake items
              designed around the portrait Claire creates for you.
            </p>
          </FadeIn>

          {/* Merchandise type chips */}
          <FadeIn variant="fadeUp" delay={STEP * 3}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {MERCH_TYPES.map((item) => (
                <Badge key={item} variant="linen">
                  {item}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* ── Single featured pricing card ─────────────────────────────── */}
        {/*
         * Centred at max-w-lg — wider than the 3-col cards in SimplePortraitSection,
         * giving it a "featured" feel without rebuilding PricingTierCard.
         */}
        <FadeIn variant="fadeUp" delay={STEP * 4} className="mx-auto max-w-lg">
          <PricingTierCard
            name="Something Special"
            price="Quote on request"
            description={
              "A hand-drawn portrait — in any medium, any format — extended " +
              "into a bespoke collection of keepsakes. Every item begins with " +
              "the original artwork; every piece is unique to you."
            }
            features={[
              "Custom portrait in your chosen medium & size",
              "Extended onto bags, phone cases, mugs, or keyrings",
              "Canvas prints, cushions, planners & more available",
            ]}
            icon={Gift}
          />
        </FadeIn>

        {/* CTA — MotionCTALink to /book */}
        <FadeIn variant="fadeUp" delay={STEP * 5}>
          <div className="mt-8 flex justify-center">
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
              className="inline-flex items-center gap-2 rounded-pill bg-terracotta px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-white select-none"
            >
              Contact for a Quote
            </MotionCTALink>
          </div>
        </FadeIn>

        {/* ── Gold hairline divider before case studies ────────────────── */}
        <FadeIn variant="fadeIn" delay={STEP * 5}>
          <div
            aria-hidden="true"
            className="mx-auto my-14 w-16"
            style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.55 }}
          />
        </FadeIn>

        {/* ── Case studies sub-header ──────────────────────────────────── */}
        <div className="mb-10 text-center">
          <FadeIn variant="fadeUp" delay={STEP}>
            <h3 className="font-heading text-2xl font-medium text-deep-pine md:text-3xl">
              Collections We Have Created
            </h3>
          </FadeIn>
        </div>

        {/* ── 3-col case study grid — reusing CaseStudyGalleryCard ─────── */}
        {/*
         * Same responsive pattern as SimplePortraitCaseStudies:
         * grid-cols-1 mobile → md:grid-cols-3 tablet/desktop.
         * h-full propagation ensures equal heights across the row.
         */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <FadeIn
              key={cs.name}
              variant="fadeUp"
              delay={STEP * (i + 1)}
              className="h-full"
            >
              <CaseStudyGalleryCard
                imageSrc={cs.imageSrc}
                imageAlt={cs.imageAlt}
                name={cs.name}
                story={cs.story}
                badge={cs.badge}
              />
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
