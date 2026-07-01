import Image from "next/image";
import { FadeIn } from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { motionTokens } from "@/lib/motion";

const STEP = motionTokens.staggerChildren;

/* ─────────────────────────────────────────────────────────────────────────
 * BioSection — Feature 6 (FEATURE_SRS §7).
 *
 * Desktop: two equal columns — offset photo collage left, bio copy right.
 * Mobile:  collage stacked above bio copy.
 *
 * COLLAGE LAYOUT (left column, desktop):
 *   ┌──────────────┐
 *   │  claire-bio  │  (main portrait, top-left anchor, z-1)
 *   │  (large)     │
 *   │         ┌───────────────┐
 *   └──────┐  │ claire-falcon │  (mid-right, z-3 — cream ring separates overlap)
 *          │  └───────────────┘
 *    ┌──────────┐
 *    │  cat     │  (small, bottom-left, z-2 — cream ring)
 *    │ collage  │
 *    └──────────┘
 *
 * Voice is deliberately first-person ("I believe…", "My work is guided by…")
 * to feel personal on the About page, as opposed to the third-person tone of
 * CredentialBlock on the Education page. The facts remain consistent:
 * 26 years, South Africa / England / South Korea / Qatar, C-AAIS, MA.Inc Ed,
 * OTs / speech therapists / psychologists, Ministry-compliant.
 *
 * Pull-quote verbatim from FEATURE_SRS §7.
 *
 * THEME_GUIDE §2: cream bg; deep-pine headings; forest/terracotta accents.
 * THEME_GUIDE §3: font-heading for H2; font-body for prose; Allura pull-quote.
 * THEME_GUIDE §5: soft natural-light editorial imagery; warm shadows.
 * THEME_GUIDE §6: radius-lg on image frames; shadow-card shadow values.
 * THEME_GUIDE §7: FadeIn staggered at motionTokens.staggerChildren intervals.
 * ───────────────────────────────────────────────────────────────────────── */

export function BioSection() {
  return (
    <section
      aria-labelledby="bio-heading"
      className="bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: editorial photo collage ─────────────────────────────── */}
          <FadeIn variant="fadeIn" className="order-first">
            {/*
             * Fixed-height container so each image can be absolutely positioned
             * as a percentage of both dimensions. The cream box-shadow "ring"
             * on the overlapping images visually separates them without a hard
             * border — matching the editorial brand-book reference.
             */}
            <div
              className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
              style={{ height: "500px" }}
            >

              {/* Image 1 — main portrait (claire-bio.jpg) — top-left anchor */}
              <div
                className="absolute overflow-hidden rounded-lg"
                style={{
                  left: "0%",
                  top: "0%",
                  width: "64%",
                  height: "76%",
                  zIndex: 10,
                  boxShadow: "0 8px 30px rgba(51,75,58,0.12)",
                  border: "2px solid rgba(141,156,122,0.30)", /* sage tint */
                }}
              >
                <Image
                  src="/assets/about/claire-bio.png"
                  alt="Claire Olivier — artist, educator, and animal therapy specialist"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  priority
                />
              </div>

              {/* Image 2 — falcon portrait (claire-falcon.jpg) — mid-right */}
              {/*
               * Sits above the main portrait (z-30) with a cream box-shadow ring
               * to create visible separation at the overlap point.
               */}
              <div
                className="absolute overflow-hidden rounded-lg"
                style={{
                  right: "0%",
                  top: "20%",
                  width: "52%",
                  height: "44%",
                  zIndex: 30,
                  boxShadow:
                    "0 0 0 4px rgba(247,243,236,1), 0 8px 30px rgba(51,75,58,0.14)",
                }}
              >
                <Image
                  src="/assets/about/claire-falcon.jpg"
                  alt="Claire with a falcon — reflecting her passion for the human-animal bond"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  priority
                />
              </div>

              {/* Image 3 — cat collage (claire-cat-collage.jpg) — bottom-left */}
              <div
                className="absolute overflow-hidden rounded-lg"
                style={{
                  left: "7%",
                  bottom: "0%",
                  width: "42%",
                  height: "30%",
                  zIndex: 20,
                  boxShadow:
                    "0 0 0 4px rgba(247,243,236,1), 0 6px 20px rgba(51,75,58,0.10)",
                }}
              >
                <Image
                  src="/assets/about/claire-cat-collage.jpg"
                  alt="Claire with cats — a collage from her animal therapy practice"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 20vw, 40vw"
                />
              </div>

              {/* Decorative gold hairline — THEME_GUIDE §4 */}
              <div
                aria-hidden="true"
                className="absolute"
                style={{
                  right: "0%",
                  bottom: "16%",
                  width: "46%",
                  height: "1px",
                  backgroundColor: "#C9A35A",
                  opacity: 0.5,
                  zIndex: 5,
                }}
              />

            </div>
          </FadeIn>

          {/* ── Right: first-person bio copy ──────────────────────────────── */}
          <div className="flex flex-col gap-6">

            <FadeIn variant="fadeUp">
              <SectionEyebrow showHeart>The Heart Behind HABibi</SectionEyebrow>
            </FadeIn>

            <FadeIn variant="fadeUp" delay={STEP}>
              <h2
                id="bio-heading"
                className="font-heading text-3xl font-medium leading-tight text-deep-pine md:text-4xl"
              >
                I believe in the healing power of connection.
              </h2>
            </FadeIn>

            {/* Paragraph 1 — origin story: the why behind the work */}
            <FadeIn variant="fadeUp" delay={STEP * 2}>
              <p className="font-body text-base leading-relaxed text-ink md:text-lg">
                I came to animal-assisted practice not through a textbook, but through
                twenty-six years of sitting with children who were searching for their
                footing in a world that wasn&rsquo;t always designed for them. Teaching across
                South Africa, England, South Korea, and Qatar, I witnessed something
                profound again and again: the most transformative moments in any classroom
                rarely come from instruction alone — they come from genuine, felt connection.
              </p>
            </FadeIn>

            {/* Paragraph 2 — credentials given meaning */}
            <FadeIn variant="fadeUp" delay={STEP * 3}>
              <p className="font-body text-base leading-relaxed text-ink-soft md:text-lg">
                My formal qualifications — a Master&rsquo;s in Inclusive Education (MA.Inc Ed)
                and certification as an Animal Assisted Intervention Specialist (C-AAIS) —
                gave me the framework to understand what I had long been witnessing
                intuitively: that the human-animal bond is deeply therapeutic, measurably
                positive, and uniquely accessible to children whose needs fall outside
                the mainstream.
              </p>
            </FadeIn>

            {/* Paragraph 3 — practice today */}
            <FadeIn variant="fadeUp" delay={STEP * 4}>
              <p className="font-body text-base leading-relaxed text-ink-soft md:text-lg">
                Today, I weave animal therapy, art, and inclusive education into
                programmes designed in close partnership with occupational therapists,
                speech therapists, and psychologists who know each child best. Every
                programme is evidence-based, fully risk-assessed, and Ministry of
                Education-compliant — because I believe every family deserves both
                the wonder and the rigour.
              </p>
            </FadeIn>

            {/* Pull-quote — Allura script, verbatim from FEATURE_SRS §7 */}
            <FadeIn variant="fadeUp" delay={STEP * 5}>
              <blockquote
                className="relative border-l-2 py-2 pl-5"
                style={{ borderColor: "#C9A35A" }} /* engineered gold, THEME_GUIDE §4 */
              >
                <p
                  className="font-script leading-snug text-terracotta"
                  style={{ fontSize: "1.6rem" }}
                >
                  Every soul deserves to be seen.
                  <br />
                  Every connection has the power to heal.
                </p>
                <cite className="mt-2 block font-body text-xs not-italic tracking-[0.14em] text-ink-soft/70 uppercase">
                  — Claire Olivier
                </cite>
              </blockquote>
            </FadeIn>

          </div>

        </div>
      </div>
    </section>
  );
}
