import { FadeIn } from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { motionTokens } from "@/lib/motion";

const STEP = motionTokens.staggerChildren;

/**
 * MissionStatement — Feature 6 (FEATURE_SRS §7).
 *
 * Centered editorial section on bg-sand, sitting between BioSection (cream)
 * and whatever follows. Two visual beats:
 *
 *   1. Mission paragraph — first-person prose, original paraphrase of the
 *      FEATURE_SRS §7 mission statement. Keeps the four pillars (animal
 *      therapy, education, art, wellbeing) without repeating the source text.
 *
 *   2. Pull-quote — brand-owned tagline verbatim from FEATURE_SRS §7:
 *      "Every soul deserves to be seen. Every connection has the power to heal."
 *      Rendered large in Allura (font-script) with a ♡ accent and attribution.
 *      Safe to use as-is: this is HABibi's own copy, not third-party prose.
 *
 * THEME_GUIDE §2: sand bg; rosewood for pull-quote; deep-pine for headings.
 * THEME_GUIDE §3: font-heading for accent heading; font-body for prose;
 *                 font-script (Allura) for pull-quote — max ~8 words per line.
 * THEME_GUIDE §4: gold (#C9A35A) 1px hairline; ♡ glyph in rosewood.
 * THEME_GUIDE §7: FadeIn staggered at staggerChildren (80ms) intervals.
 */
export function MissionStatement() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="bg-sand py-20 lg:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">

        {/* ── Eyebrow ──────────────────────────────────────────────────── */}
        <FadeIn variant="fadeUp">
          <SectionEyebrow showHeart className="justify-center">
            Our Mission
          </SectionEyebrow>
        </FadeIn>

        {/* ── Accent heading ───────────────────────────────────────────── */}
        <FadeIn variant="fadeUp" delay={STEP}>
          <h2
            id="mission-heading"
            className="mt-4 font-heading text-3xl font-medium leading-tight text-deep-pine md:text-4xl"
          >
            Where Healing Begins
          </h2>
        </FadeIn>

        {/* ── Mission paragraph — original paraphrase of FEATURE_SRS §7 ── */}
        {/*
         * Source (paraphrase target):
         *   "Through animal therapy, education and art, I support wellbeing,
         *   understanding and growth — for both people and animals. My work is
         *   guided by compassion, creativity and the belief that every connection
         *   has the power to heal."
         *
         * This paragraph restates the same intent in original phrasing: same
         * four pillars (therapy, education, art, wellbeing/growth), same values
         * (compassion, creativity), same belief (connection heals).
         */}
        <FadeIn variant="fadeUp" delay={STEP * 2}>
          <p className="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-ink md:text-lg">
            At HABibi, I bring together animal therapy, inclusive education, and
            the language of art to nurture wellbeing, deepen understanding, and
            support growth — in the people I work with and in the animals who are
            generous partners in that process. Compassion and creativity guide
            everything I do, rooted in the quiet certainty that when we create
            the conditions for authentic connection, something transformative
            begins to unfold.
          </p>
        </FadeIn>

        {/* ── Decorative divider row ────────────────────────────────────── */}
        {/* Gold hairline flanking the heart glyph — THEME_GUIDE §4 */}
        <FadeIn variant="fadeIn" delay={STEP * 3}>
          <div className="mx-auto mt-10 flex items-center justify-center gap-4">
            <div
              aria-hidden="true"
              className="h-px w-16 opacity-50"
              style={{ backgroundColor: "#C9A35A" }}
            />
            <span
              aria-hidden="true"
              className="text-rosewood"
              style={{ fontSize: "1.1rem", lineHeight: 1 }}
            >
              ♡
            </span>
            <div
              aria-hidden="true"
              className="h-px w-16 opacity-50"
              style={{ backgroundColor: "#C9A35A" }}
            />
          </div>
        </FadeIn>

        {/* ── Pull-quote — verbatim brand tagline from FEATURE_SRS §7 ────── */}
        {/*
         * This exact phrase is HABibi's own brand-owned tagline — safe to
         * reproduce verbatim (unlike third-party press copy which we paraphrase).
         * Rendered in Allura (font-script) per FEATURE_SRS §7 + THEME_GUIDE §3.
         * Two short lines kept under ~8 words each per THEME_GUIDE §3 rule.
         */}
        <FadeIn variant="fadeUp" delay={STEP * 4}>
          <blockquote className="mt-8" aria-label="HABibi brand philosophy">
            <p
              className="font-script leading-[1.25] text-rosewood"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Every soul deserves to be seen.
              <br />
              Every connection has the power to heal.
            </p>
            <cite className="mt-4 block font-body text-xs not-italic tracking-[0.16em] text-ink-soft/70 uppercase">
              — Claire Olivier
            </cite>
          </blockquote>
        </FadeIn>

      </div>
    </section>
  );
}
