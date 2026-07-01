"use client";

import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BrandCard } from "@/components/ui/BrandCard";

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface PricingTierCardProps {
  /** Package tier name — Cormorant Garamond heading. */
  name: string;
  /**
   * Price string.
   * Pass "Quote on request" to render in the italic-script style instead of
   * the large numeric display.
   */
  price: string;
  /** Shown above the price — e.g. "Starting from". Omit for quote-on-request. */
  priceLabel?: string;
  /** 1-2 sentence description beneath the price. */
  description: string;
  /** 2–3 bullet features. Rendered with a sage Check icon. */
  features: string[];
  /** Optional lucide-react icon displayed at the card top. */
  icon?: LucideIcon;
}

const QUOTE = "Quote on request";

/* ── Component ───────────────────────────────────────────────────────────── */

/**
 * Single pricing tier card — Feature 2 (FEATURE_SRS §3 §2).
 *
 * Internally uses BrandCard (shadow-card → shadow-hover on scroll, radius-lg,
 * border-soft border) — THEME_GUIDE §6.
 *
 * Layout: flex-col, h-full so all cards in the same grid row stretch equally
 * (requires the parent grid cell to pass h-full through to this component).
 *
 * Price display:
 *   numeric → large Cormorant Garamond in deep-pine ("QAR 750")
 *   quote   → italic terracotta ("Quote on request")
 */
export function PricingTierCard({
  name,
  price,
  priceLabel,
  description,
  features,
  icon: Icon,
}: PricingTierCardProps) {
  const isQuote = price === QUOTE;

  return (
    <BrandCard padding="lg" className="flex h-full flex-col gap-0">

      {/* ── Card top: icon + name ──────────────────────────────────────── */}
      <div className="mb-4 flex items-start gap-3">
        {Icon && (
          /* Sage icon on sand circle — THEME_GUIDE §2 icon treatment */
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand">
            <Icon size={18} className="text-sage" strokeWidth={1.75} aria-hidden="true" />
          </div>
        )}
        <h3 className="font-heading text-xl font-medium leading-tight text-deep-pine md:text-2xl">
          {name}
        </h3>
      </div>

      {/* Gold hairline — THEME_GUIDE §4 */}
      <div
        aria-hidden="true"
        className="mb-4 w-10"
        style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.65 }}
      />

      {/* ── Price display ──────────────────────────────────────────────── */}
      {isQuote ? (
        <p
          className="mb-1 font-heading italic leading-tight text-terracotta"
          style={{ fontSize: "1.6rem" }}
        >
          Quote on request
        </p>
      ) : (
        <div className="mb-1">
          {priceLabel && (
            <p className="mb-0.5 font-body text-xs uppercase tracking-widest text-ink-soft">
              {priceLabel}
            </p>
          )}
          <p className="font-heading text-4xl font-medium leading-none text-deep-pine">
            {price}
          </p>
        </div>
      )}

      {/* ── Description ────────────────────────────────────────────────── */}
      <p className="mb-5 mt-3 flex-1 font-body text-sm leading-relaxed text-ink-soft">
        {description}
      </p>

      {/* Thin rule — THEME_GUIDE §2: border-soft */}
      <hr className="mb-4 border-border-soft" />

      {/* ── Feature list ───────────────────────────────────────────────── */}
      <ul className="flex flex-col gap-2.5" role="list">
        {features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5">
            <Check
              size={14}
              strokeWidth={2.5}
              aria-hidden="true"
              className="mt-[3px] shrink-0 text-sage"
            />
            <span className="font-body text-sm leading-snug text-ink">{feat}</span>
          </li>
        ))}
      </ul>

    </BrandCard>
  );
}
