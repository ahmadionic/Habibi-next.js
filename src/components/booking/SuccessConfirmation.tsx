"use client";

/**
 * SuccessConfirmation — shown in place of BookingForm after a successful submit.
 *
 * THEME_GUIDE §2: success token (#6B8F5C) for checkmark; deep-pine heading; ink body.
 * THEME_GUIDE §3: font-heading (Cormorant Garamond) for h2; font-body (Montserrat) for copy.
 * THEME_GUIDE §7: path-draw SVG animation (circle then check) — gentle, organic pacing.
 *   Staggered motion.div children fade-up after the check finishes drawing.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";

/* ── Purpose-aware warm copy ─────────────────────────────────────────────── */

const PURPOSE_CONTEXT: Record<string, string> = {
  "portrait-inquiry":     "your portrait commission",
  "school-program":       "your school programme enquiry",
  "workshop-reservation": "your workshop reservation",
  "general-question":     "your question",
};

/* ── Props ───────────────────────────────────────────────────────────────── */

interface SuccessConfirmationProps {
  name:    string;
  purpose: string;
}

/* ── Component ───────────────────────────────────────────────────────────── */

export function SuccessConfirmation({ name, purpose }: SuccessConfirmationProps) {
  const firstName = name.split(" ")[0] || name;
  const context   = PURPOSE_CONTEXT[purpose] ?? "your enquiry";

  return (
    <div className="flex flex-col items-center gap-6 py-12 text-center">

      {/* ── Path-draw animated checkmark ──────────────────────────────── */}
      {/*
       * Circle draws first (0–0.7 s), then the check strokes in (0.6–1.05 s).
       * Both use motionTokens.ease for the same soft deceleration curve.
       */}
      <motion.svg
        viewBox="0 0 52 52"
        width={72}
        height={72}
        fill="none"
        aria-hidden="true"
      >
        {/* Outer circle */}
        <motion.circle
          cx={26}
          cy={26}
          r={23}
          stroke="#6B8F5C"
          strokeWidth="1.75"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 0.7, ease: motionTokens.ease },
            opacity:    { duration: 0.15 },
          }}
        />
        {/* Check mark */}
        <motion.path
          d="M15.5 26.5 L23 34 L37 18.5"
          stroke="#6B8F5C"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 0.45, delay: 0.6, ease: motionTokens.ease },
            opacity:    { duration: 0.1, delay: 0.6 },
          }}
        />
      </motion.svg>

      {/* ── Heading + body copy ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: motionTokens.duration.base, ease: motionTokens.ease }}
        className="flex flex-col gap-3"
      >
        <h2 className="font-heading text-2xl font-medium text-deep-pine md:text-3xl">
          Thank You{firstName ? `, ${firstName}` : ""}!
        </h2>

        <p className="mx-auto max-w-sm font-body text-base leading-relaxed text-ink">
          We&rsquo;ve safely received {context}. Claire or her team will be in touch
          within <strong>1–2 business days</strong>.
        </p>
      </motion.div>

      {/* ── Gold hairline ──────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.55 }}
        transition={{ delay: 0.75, duration: 0.55, ease: motionTokens.ease }}
        style={{ height: "1px", backgroundColor: "#C9A35A", transformOrigin: "center" }}
        className="w-16"
      />

      {/* ── Secondary prompt ──────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: motionTokens.duration.base }}
        className="font-body text-sm text-ink-soft"
      >
        In the meantime, feel free to explore what HABibi has to offer.
      </motion.p>

      {/* ── Return to Homepage CTA ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: motionTokens.duration.base, ease: motionTokens.ease }}
      >
        <Link
          href="/"
          className={[
            "inline-flex items-center gap-2",
            "rounded-full bg-deep-pine px-6 py-2.5",
            "font-body text-sm font-medium text-cream",
            "transition-colors duration-200 hover:bg-forest",
          ].join(" ")}
        >
          Return to Homepage
        </Link>
      </motion.div>

    </div>
  );
}
