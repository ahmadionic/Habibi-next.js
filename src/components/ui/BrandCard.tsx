"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";

/* THEME_GUIDE section 6 shadow values */
const SHADOW_CARD  = "0 8px 30px rgba(51,75,58,0.10)";
const SHADOW_HOVER = "0 12px 40px rgba(179,115,82,0.15)";

/** Padding scale — maps to THEME_GUIDE spacing tokens (space-3 / space-4 / space-5 / space-6). */
const paddingMap = {
  sm: "p-4",   /* 16px — space-3 */
  md: "p-6",   /* 24px — space-4 */
  lg: "p-8",   /* 32px — space-5 */
  xl: "p-12",  /* 48px — space-6 */
} as const;

export interface BrandCardProps {
  children: React.ReactNode;
  /**
   * When provided, wraps the card in a Next.js Link so the whole card is clickable.
   * Renders as <a> with no text-decoration.
   */
  href?: string;
  /** Background: "white" (on cream page bg) or "cream" (for nested sections). */
  bg?: "white" | "cream";
  /** Internal padding scale. Defaults to "md". */
  padding?: keyof typeof paddingMap;
  className?: string;
}

/**
 * HABibi surface card.
 *
 * Shape:   radius-lg (20px)                       — THEME_GUIDE section 6
 * Border:  1px border-soft                        — THEME_GUIDE section 6
 * Shadow:  shadow-card default → shadow-hover     — THEME_GUIDE section 6
 * Motion:  shadow deepens on hover               — THEME_GUIDE section 7
 */
export function BrandCard({
  children,
  href,
  bg = "white",
  padding = "md",
  className,
}: BrandCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const card = (
    <motion.div
      initial={{ boxShadow: SHADOW_CARD }}
      whileHover={
        prefersReducedMotion ? {} : { boxShadow: SHADOW_HOVER }
      }
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease }}
      className={cn(
        // shape — THEME_GUIDE: radius-lg, border-soft border
        "rounded-lg border border-border-soft",
        // background
        bg === "white" ? "bg-white" : "bg-cream",
        // padding
        paddingMap[padding],
        // cursor hint when clickable
        href ? "cursor-pointer" : undefined,
        className
      )}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full no-underline">
        {card}
      </Link>
    );
  }

  return card;
}
