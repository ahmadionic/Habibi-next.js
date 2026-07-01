"use client";

import Image from "next/image";
import { BrandCard } from "@/components/ui/BrandCard";

export interface ProgramCardProps {
  /** Path to the program hero image (local /public). */
  image: string;
  /** Alt text for the image — describe the visual for screen readers. */
  imageAlt: string;
  /** Program title — rendered in font-heading. */
  title: string;
  /** 2-3 sentence paraphrased description. */
  description: string;
  /**
   * Optional availability note.
   * "manual"  → "Detailed program manual available on request."
   * "leaflet" → "Detailed program leaflet available on request."
   */
  requestNote?: "manual" | "leaflet";
}

const REQUEST_NOTE: Record<NonNullable<ProgramCardProps["requestNote"]>, string> = {
  manual:  "Detailed program manual available on request.",
  leaflet: "Detailed program leaflet available on request.",
};

/**
 * ProgramCard — Feature 3 (FEATURE_SRS §4 §3).
 *
 * Layout: image flush at top (edge-to-edge), text content below with p-5 padding.
 * BrandCard provides radius-lg, border-soft, and shadow-card → shadow-hover lift.
 * Padding override (p-0) is handled via className so the image sits flush.
 *
 * THEME_GUIDE §3: font-heading for title, font-body for description.
 * THEME_GUIDE §6: radius-lg (rounded-lg), overflow-hidden clips image corners.
 * THEME_GUIDE §7: BrandCard applies gentle shadow lift on hover (framer-motion).
 */
export function ProgramCard({
  image,
  imageAlt,
  title,
  description,
  requestNote,
}: ProgramCardProps) {
  return (
    /* p-0 overrides BrandCard's default padding; overflow-hidden keeps image
       corners clipped to the card's radius-lg border */
    <BrandCard bg="white" padding="sm" className="flex h-full flex-col p-0 overflow-hidden">

      {/* ── Program image — flush, 16:10 aspect ───────────────────────── */}
      {/*
       * THEME_GUIDE §5: warm editorial imagery, object-cover object-top
       *   keeps the most important part of the photo (subjects) visible.
       * THEME_GUIDE §8: images never stretch — object-cover handles this.
       */}
      <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-top"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      {/* ── Text content ────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-5">

        {/* Gold hairline — THEME_GUIDE §4 decorative divider */}
        <div
          aria-hidden="true"
          className="w-8"
          style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.65 }}
        />

        {/* Title — THEME_GUIDE §3: Cormorant Garamond, weight 500 */}
        <h3 className="font-heading text-xl font-medium leading-snug text-deep-pine md:text-2xl">
          {title}
        </h3>

        {/* Description — THEME_GUIDE §3: Montserrat body text */}
        <p className="flex-1 font-body text-sm leading-relaxed text-ink-soft md:text-base">
          {description}
        </p>

        {/* Request note — rendered only when prop is set */}
        {requestNote && (
          <p className="mt-1 font-body text-xs italic leading-snug text-umber">
            {REQUEST_NOTE[requestNote]}
          </p>
        )}

      </div>

    </BrandCard>
  );
}
