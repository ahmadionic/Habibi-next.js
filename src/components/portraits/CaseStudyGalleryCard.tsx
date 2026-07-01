"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { Badge } from "@/components/ui/Badge";

/* THEME_GUIDE §6 shadow tokens */
const SHADOW_CARD  = "0 8px 30px rgba(51,75,58,0.10)";
const SHADOW_HOVER = "0 12px 40px rgba(179,115,82,0.15)";

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface CaseStudyGalleryCardProps {
  /** Absolute or relative path to the portrait image. */
  imageSrc: string;
  /** Screen-reader description of the portrait — keep concise. */
  imageAlt: string;
  /** Subject / pet name — font-heading (Cormorant Garamond). */
  name: string;
  /** 2–3 sentence paraphrased story. Must be original copy, not verbatim. */
  story: string;
  /** Medium/format label shown as a Badge, e.g. "A3 · Colour Pencil". */
  badge: string;
}

/* ── Component ───────────────────────────────────────────────────────────── */

/**
 * Portrait case study card — Feature 2 (FEATURE_SRS §3 §2).
 *
 * Layout: full-bleed image on top → content below.
 * Motion: shadow deepens on hover (THEME_GUIDE §7 — never bouncy).
 * Height: h-full so cards in the same grid row stretch equally.
 *
 * Image uses object-cover object-top so animal faces stay visible on any
 * viewport/crop (THEME_GUIDE §8 responsive imagery rule).
 */
export function CaseStudyGalleryCard({
  imageSrc,
  imageAlt,
  name,
  story,
  badge,
}: CaseStudyGalleryCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ boxShadow: SHADOW_CARD }}
      whileHover={prefersReducedMotion ? {} : { boxShadow: SHADOW_HOVER }}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease }}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-border-soft bg-white"
    >
      {/* ── Portrait image ─────────────────────────────────────────────── */}
      {/*
       * h-64: fixed image zone so all three cards align at the same height.
       * overflow-hidden on the parent clips the image to the card's rounded-t.
       * object-top: keeps the subject's face in frame on narrow viewports.
       */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          unoptimized
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-6">

        {/* Medium / format badge — sand variant — THEME_GUIDE §2 */}
        <Badge variant="sand">{badge}</Badge>

        {/* Subject name — Cormorant Garamond — THEME_GUIDE §3 */}
        <h3 className="font-heading text-xl font-medium leading-tight text-deep-pine md:text-2xl">
          {name}
        </h3>

        {/* Paraphrased story — Montserrat, ink-soft — THEME_GUIDE §3 */}
        <p className="flex-1 font-body text-sm leading-relaxed text-ink-soft">
          {story}
        </p>

      </div>
    </motion.div>
  );
}
