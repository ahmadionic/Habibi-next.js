"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";

/* Shadow values inlined — sourced from motionTokens / THEME_GUIDE section 6 */
const SHADOW_SOFT  = "0 4px 20px rgba(51,75,58,0.08)";
const SHADOW_HOVER = "0 12px 40px rgba(179,115,82,0.15)";

const variantClasses = {
  primary: "bg-deep-pine text-cream",
  accent:  "bg-terracotta text-white",
} as const;

export interface BrandButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
  > {
  /** Visual style — "primary" (deep-pine) or "accent" (terracotta). */
  variant?: keyof typeof variantClasses;
  /** Lucide icon rendered before the label. */
  leadingIcon?: LucideIcon;
  /** Lucide icon rendered after the label. */
  trailingIcon?: LucideIcon;
}

/**
 * HABibi primary CTA button.
 *
 * Shape:  radius-pill (fully rounded)          — THEME_GUIDE section 6
 * Font:   font-body, weight 600                — THEME_GUIDE section 3
 * Motion: scale 1.03 + shadow-hover on hover  — THEME_GUIDE section 7
 */
export function BrandButton({
  variant = "primary",
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  children,
  className,
  disabled,
  ...rest
}: BrandButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      /* ── Hover animation ───────────────────────────────────────────────── */
      initial={{ boxShadow: SHADOW_SOFT }}
      whileHover={
        prefersReducedMotion
          ? {}
          : { scale: 1.03, boxShadow: SHADOW_HOVER }
      }
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease }}
      /* ── Base styles ───────────────────────────────────────────────────── */
      className={cn(
        // shape
        "inline-flex items-center justify-center gap-2 rounded-pill",
        // spacing
        "px-7 py-3",
        // typography — THEME_GUIDE: font-body, weight 600
        "font-body text-sm font-semibold tracking-wide",
        // interaction
        "cursor-pointer select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage",
        "disabled:pointer-events-none disabled:opacity-50",
        // variant
        variantClasses[variant],
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {LeadingIcon && <LeadingIcon size={16} aria-hidden />}
      {children}
      {TrailingIcon && <TrailingIcon size={16} aria-hidden />}
    </motion.button>
  );
}
