import { FadeIn }         from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { motionTokens }   from "@/lib/motion";

const STEP = motionTokens.staggerChildren;

/**
 * StoryExcerptCard — Feature 3 (FEATURE_SRS §4 §3, HABibi Math & Literacy flavor).
 *
 * Decorative interstitial section showing the storytelling spirit of the
 * Math & Literacy programme. The vignette is wholly original creative writing —
 * quail characters and a fair-sharing concept, no names, numbers, or sentence
 * structures from any source document.
 *
 * THEME_GUIDE §2: bg-sand — visually distinct from the surrounding bg-cream
 *   (ProgramsGrid) and bg-linen (CredentialBlock) sections.
 * THEME_GUIDE §3: font-heading for decorative quote mark; font-body for prose;
 *   font-script (Allura) for the attribution flourish.
 * THEME_GUIDE §7: gentle fadeUp stagger on load.
 */
export function StoryExcerptCard() {
  return (
    <section
      aria-label="Story excerpt — animal-assisted storytelling"
      className="bg-sand py-20 lg:py-28"
    >
      <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">

        {/* ── Eyebrow ─────────────────────────────────────────────────────── */}
        <FadeIn variant="fadeUp">
          <SectionEyebrow>A Glimpse Into the Stories</SectionEyebrow>
        </FadeIn>

        {/* ── Gold hairline ─────────────────────────────────────────────── */}
        <FadeIn variant="fadeIn" delay={STEP}>
          <div
            aria-hidden="true"
            className="mx-auto mt-6 mb-8 w-12"
            style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.75 }}
          />
        </FadeIn>

        {/* ── Decorative open-quote mark ───────────────────────────────── */}
        {/*
         * Large Cormorant Garamond quotation mark — purely decorative, aria-hidden.
         * THEME_GUIDE §3: font-heading for display/decorative use.
         * THEME_GUIDE §2: sage color, low opacity — accent without distraction.
         */}
        <FadeIn variant="fadeIn" delay={STEP * 2}>
          <div
            aria-hidden="true"
            className="font-heading leading-none text-sage/50 select-none"
            style={{ fontSize: "6rem", marginBottom: "-2rem" }}
          >
            &ldquo;
          </div>
        </FadeIn>

        {/* ── Story vignette ───────────────────────────────────────────── */}
        {/*
         * Original creative writing — inspired by the animal-assisted
         * storytelling concept in FEATURE_SRS §4 (Math & Literacy program).
         * Character names, numbers, and all sentence structures are invented.
         * Concept: a quail teaches a child fair sharing through gentle example.
         */}
        <FadeIn variant="fadeUp" delay={STEP * 3}>
          <blockquote className="font-body text-lg leading-relaxed text-ink md:text-xl">
            <p>
              Pip had found a small pile of seeds at the edge of the garden —
              far more than she could eat on her own. Her friend Dot was watching
              from a nearby stone, so Pip did what felt right: she nudged the
              seeds into two careful groups, moving one across whenever the
              piles looked uneven, until both sides sat perfectly equal.{" "}
              &ldquo;Now we both have the same,&rdquo; she said softly, and
              together they ate in the warmth of the afternoon sun.
            </p>
          </blockquote>
        </FadeIn>

        {/* ── Closing hairline ─────────────────────────────────────────── */}
        <FadeIn variant="fadeIn" delay={STEP * 4}>
          <div
            aria-hidden="true"
            className="mx-auto mt-8 mb-6 w-12"
            style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.75 }}
          />
        </FadeIn>

        {/* ── Attribution line ─────────────────────────────────────────── */}
        {/*
         * Allura (font-script) — THEME_GUIDE §3: reserved for short emotional
         * lines, max ~8 words. Here used for the attribution flourish.
         * THEME_GUIDE §2: terracotta — warm accent color for script text.
         */}
        <FadeIn variant="fadeUp" delay={STEP * 5}>
          <p
            className="font-script font-bold leading-snug text-terracotta"
            style={{ fontSize: "1.5rem" }}
          >
            Inspired by Miss Claire&rsquo;s animal-assisted storytelling approach.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
