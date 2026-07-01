"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { motionTokens, type MotionVariantName } from "@/lib/motion";

interface FadeInProps {
  children: React.ReactNode;
  /** Animation preset — defaults to "fadeUp" (opacity 0→1, y 24→0). */
  variant?: MotionVariantName;
  /** Optional extra delay in seconds before the animation starts. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-triggered fade wrapper using Framer Motion.
 *
 * - Triggers once when the element enters the viewport (`whileInView`, `once: true`).
 * - Uses the brand easing curve and duration from motionTokens.
 * - Respects `prefers-reduced-motion`: users with that OS setting see the
 *   content rendered immediately with no transform or opacity animation.
 */
export function FadeIn({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  const preset = motionTokens[variant];

  /*
   * prefers-reduced-motion: render a plain div with no animation at all.
   * Content is immediately visible — no opacity fade, no transform.
   * This satisfies WCAG 2.3.3 (Animation from Interactions, AAA) and the
   * THEME_GUIDE requirement that every animation must have a reduced-motion fallback.
   */
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={preset.initial as TargetAndTransition}
      whileInView={preset.animate as TargetAndTransition}
      viewport={{ once: true, margin: "-64px" }}
      transition={{
        ...motionTokens.transition,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
