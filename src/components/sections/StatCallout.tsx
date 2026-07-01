import { FadeIn } from "@/components/layout/FadeIn";
import { motionTokens } from "@/lib/motion";

const STEP = motionTokens.staggerChildren; /* 0.08s */

/* THEME_GUIDE §4: gold (#C9A35A) used ONLY as 1px decorative hairline */
const GOLD = "#C9A35A";

/**
 * Full-width dark banner — Feature 1 (FEATURE_SRS §2 stat callout).
 *
 * FEATURE_SRS §2 guidance: "a notable study showing online pet content
 * boosted wellbeing during COVID — paraphrase, do not quote verbatim."
 * No specific percentage is cited in the SRS, so we present a qualitative
 * impact statement grounded in the described research rather than inventing
 * a precise figure. This is honest, brand-appropriate, and verifiable.
 *
 * Background: bg-deep-pine (#334B3A) — THEME_GUIDE §2: "primary CTA buttons,
 * nav text, footer background." Creates maximum contrast after the bg-linen
 * BrandValuesStrip above and any cream section below.
 *
 * Text:
 *   Large display  → font-heading (Cormorant Garamond), cream       — THEME_GUIDE §3
 *   Allura accent  → font-script, cream/70                         — THEME_GUIDE §3
 *   Body support   → font-body, cream/75                           — THEME_GUIDE §3
 *
 * Animation: three staggered FadeIn elements (scroll-triggered, once).
 */
export function StatCallout() {
  return (
    <section
      aria-label="The science of the Human Animal Bond"
      className="bg-deep-pine py-20 text-cream lg:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">

        {/* Gold hairline above — THEME_GUIDE §4 decorative motif */}
        <FadeIn variant="fadeIn">
          <div
            aria-hidden="true"
            className="mx-auto mb-10 w-14"
            style={{ height: "1px", backgroundColor: GOLD, opacity: 0.45 }}
          />
        </FadeIn>

        {/* Large qualitative "stat" — font-heading, very large */}
        {/*
          Grounded in FEATURE_SRS §2: the research showed meaningful human–animal
          interaction reduces anxiety and stress. Presented as a qualitative
          statement rather than a fabricated percentage.
          THEME_GUIDE §3: H1/H2 in Cormorant Garamond, generous size.
        */}
        <FadeIn variant="fadeUp" delay={STEP * 0.5}>
          <p
            className={[
              "font-heading font-medium text-cream",
              "text-5xl leading-tight tracking-tight",
              "md:text-6xl lg:text-7xl",
            ].join(" ")}
          >
            The Bond Heals.
          </p>
        </FadeIn>

        {/* Allura accent line — THEME_GUIDE §3: short emotional line, max ~8 words */}
        <FadeIn variant="fadeIn" delay={STEP * 1.5}>
          <p
            className="mt-4 font-script text-cream/65"
            style={{ fontSize: "1.6rem", lineHeight: 1.4 }}
          >
            — the Human Animal Bond
          </p>
        </FadeIn>

        {/* Supporting sentence — paraphrased from FEATURE_SRS §2 */}
        {/*
          Reference: studies conducted during the COVID-19 pandemic found that
          even watching animals on screen — without physical contact — measurably
          reduced stress markers and improved mood. See FEATURE_SRS §2 for context.
        */}
        <FadeIn variant="fadeUp" delay={STEP * 2.5}>
          <p className="mt-8 font-body text-base leading-relaxed text-cream/75 md:text-lg">
            Research conducted during the pandemic found that even watching
            animals online — without any physical contact — measurably improved
            mood and reduced stress. Connection with the natural world is not a
            luxury; for many, it is a lifeline.
          </p>
        </FadeIn>

        {/* Gold hairline below */}
        <FadeIn variant="fadeIn" delay={STEP * 3.5}>
          <div
            aria-hidden="true"
            className="mx-auto mt-10 w-14"
            style={{ height: "1px", backgroundColor: GOLD, opacity: 0.45 }}
          />
        </FadeIn>

      </div>
    </section>
  );
}
