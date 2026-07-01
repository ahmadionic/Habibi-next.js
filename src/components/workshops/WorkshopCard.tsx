"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";

/*
 * CTA rendered as a motion-enhanced Next.js Link.
 * BrandButton is a <button> — wrapping it in <Link> creates invalid
 * anchor→button nesting. We style this identically to BrandButton primary
 * and attach the same hover/tap behaviour. Module-level for stable identity.
 */
const MotionCTALink = motion.create(Link);

const SHADOW_SOFT  = "0 4px 20px rgba(51,75,58,0.08)";
const SHADOW_HOVER = "0 12px 40px rgba(179,115,82,0.15)";

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface WorkshopCardProps {
  /** Path to the workshop hero image. */
  image: string;
  /** Alt text for the image. */
  imageAlt: string;
  /** Workshop title — rendered in font-heading. */
  title: string;
  /** 2–4 sentence paraphrased description. */
  description: string;
  /** Short label strings for the "What's Included" checklist. */
  included: string[];
  /** CTA href — defaults to /book. */
  ctaHref?: string;
  /**
   * Internal layout mode:
   *   "horizontal" (default) — image left / content right at lg breakpoint.
   *     Used when the card occupies the full section width.
   *   "vertical" — image always on top, content below.
   *     Used when two cards sit side-by-side in a 2-col outer grid, so the
   *     image isn't squeezed to 25% of the viewport by a nested grid.
   */
  layout?: "horizontal" | "vertical";
}

/**
 * WorkshopCard — Feature 4 (FEATURE_SRS §5).
 *
 * Layout: image left / content right on desktop (lg:grid-cols-2),
 * stacked on mobile (image top, content below) — THEME_GUIDE §8.
 *
 * BrandCard's visual language (radius-lg, border-soft, shadow-card → hover)
 * is replicated here manually so the image column can be truly flush to the
 * card edge without fighting BrandCard's internal padding.
 *
 * THEME_GUIDE §2: sage CheckCircle icons; deep-pine heading.
 * THEME_GUIDE §3: font-heading for title; font-body for description.
 * THEME_GUIDE §6: radius-lg, shadow-card, border-soft, radius-pill CTA.
 * THEME_GUIDE §7: shadow-hover lift on card; scale/shadow on CTA.
 */
export function WorkshopCard({
  image,
  imageAlt,
  title,
  description,
  included,
  ctaHref = "/book",
  layout = "horizontal",
}: WorkshopCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isVertical = layout === "vertical";

  return (
    <motion.div
      initial={{ boxShadow: "0 8px 30px rgba(51,75,58,0.10)" }}
      whileHover={
        prefersReducedMotion ? {} : { boxShadow: SHADOW_HOVER }
      }
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease }}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-border-soft bg-white"
    >
      {/*
       * Horizontal: image left / content right at lg (full-width card).
       * Vertical:   image always on top (side-by-side 2-col outer grid).
       * flex-1 allows the inner content to stretch to the parent height.
       */}
      <div className={cn(isVertical ? "flex flex-1 flex-col" : "grid grid-cols-1 lg:grid-cols-2 flex-1")}>

        {/* ── Image column ────────────────────────────────────────────────── */}
        {/*
         * Vertical layout uses a fixed aspect-ratio container so the image
         * has editorial presence without needing a sibling column for height.
         * Horizontal layout uses min-h-64 mobile / auto desktop (height driven
         * by content column). THEME_GUIDE §5: object-cover object-top.
         */}
        <div
          className={cn(
            "relative",
            isVertical ? "aspect-[16/9] shrink-0" : "min-h-64 lg:min-h-0",
          )}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-top"
            sizes={
              isVertical
                ? "(min-width: 768px) 50vw, 100vw"
                : "(min-width: 1024px) 50vw, 100vw"
            }
          />
        </div>

        {/* ── Content column ──────────────────────────────────────────────── */}
        <div className={cn("flex flex-col gap-5 p-8 lg:p-10", isVertical && "flex-1")}>

          {/* Gold hairline — THEME_GUIDE §4 */}
          <div
            aria-hidden="true"
            className="w-10"
            style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.65 }}
          />

          {/* Title — THEME_GUIDE §3: Cormorant Garamond, weight 500 */}
          <h3 className="font-heading text-2xl font-medium leading-snug text-deep-pine md:text-3xl">
            {title}
          </h3>

          {/* Description — THEME_GUIDE §3: Montserrat body */}
          <p className="font-body text-base leading-relaxed text-ink-soft">
            {description}
          </p>

          {/* ── What's Included checklist ─────────────────────────────────── */}
          {/*
           * CheckCircle (lucide-react) in sage — THEME_GUIDE §4 icon style:
           * thin-line, single-color (sage), THEME_GUIDE §2: sage = #8D9C7A.
           */}
          <div>
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.15em] text-forest">
              What&rsquo;s Included
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle
                    size={16}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="mt-[2px] shrink-0 text-sage"
                  />
                  <span className="font-body text-sm leading-snug text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── CTA ───────────────────────────────────────────────────────── */}
          {/*
           * Styled identically to BrandButton primary — deep-pine bg, cream text,
           * radius-pill — with Framer Motion scale/shadow on hover.
           * THEME_GUIDE §6: radius-pill for primary CTAs.
           */}
          <div className="mt-auto pt-2">
            <MotionCTALink
              href={ctaHref}
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
                "inline-flex items-center gap-2 rounded-pill px-7 py-3",
                "font-body text-sm font-semibold tracking-wide select-none",
                "bg-deep-pine text-cream",
              )}
            >
              Reserve Your Spot
            </MotionCTALink>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
