import type { Variants } from "framer-motion";

/**
 * HABibi motion tokens — THEME_GUIDE.md section 7.
 *
 * All animation must feel gentle, organic, and luxury — never bouncy or abrupt.
 *
 * Usage:
 *   import { motionTokens } from "@/lib/motion";
 *
 *   // As direct initial/animate props:
 *   <motion.div {...motionTokens.fadeUp} transition={motionTokens.transition} />
 *
 *   // As a named variants object:
 *   <motion.div variants={motionTokens.fadeUp} initial="initial" animate="animate" />
 */

/** Soft easeOutExpo-like curve — the HABibi standard. */
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Duration presets in seconds. */
const duration = {
  fast: 0.25,
  base: 0.45,
  slow: 0.8,
} as const;

/** Shorthand transition object using brand ease + base duration. */
const transition = {
  duration: duration.base,
  ease,
} as const;

/**
 * Named animation presets.
 * Typed as Framer Motion `Variants` so they work both as variant maps
 * (`variants={motionTokens.fadeUp}`) and as spread props
 * (`{...motionTokens.fadeUp}`).
 */
const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
};

/**
 * Delay between children when using staggerChildren in a parent variant.
 * e.g. transition: { staggerChildren: motionTokens.staggerChildren }
 */
const staggerChildren = 0.08;

export const motionTokens = {
  ease,
  duration,
  transition,
  fadeUp,
  fadeIn,
  scaleIn,
  staggerChildren,
};

/** Union of the three animation preset names — used for the FadeIn component. */
export type MotionVariantName = "fadeUp" | "fadeIn" | "scaleIn";
