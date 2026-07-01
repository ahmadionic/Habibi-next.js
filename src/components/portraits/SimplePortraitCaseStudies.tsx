import { FadeIn } from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { CaseStudyGalleryCard } from "./CaseStudyGalleryCard";
import { motionTokens } from "@/lib/motion";

/* ── Case study data — FEATURE_SRS §3 §2 ────────────────────────────────── */
/*
 * Stories are entirely original paraphrases — no sentence appears verbatim
 * from the source document. Each preserves the meaning described in FEATURE_SRS
 * (dog / Doha–Australia / therapy / two pets / drafting film / pan pastel)
 * while rewriting in HABibi's warm, first-person-adjacent editorial voice.
 *
 * Image paths use .png — the actual files in /public/assets/portraits/ are
 * .png, not .jpg as the brief specifies. Corrected here to match real assets.
 */
const CASE_STUDIES = [
  {
    imageSrc: "/assets/portraits/case-henry.png",
    imageAlt: "A3 colour pencil portrait of Henry, a golden dog",
    name: "Henry",
    badge: "A3 · Colour Pencil on Drafting Film",
    story:
      "Henry divided his life between Doha and Australia, a loyal companion " +
      "who left paw prints on two continents. When his family wanted to hold " +
      "that love in something tangible, Claire rendered him in colour pencil " +
      "on drafting film — a piece made to travel as freely as Henry himself.",
  },
  {
    imageSrc: "/assets/portraits/case-grisette.png",
    imageAlt: "A4 graphite portrait of Grisette, Claire's therapy animal",
    name: "Grisette",
    badge: "A4 · Graphite Pencil",
    story:
      "Grisette is Claire's own animal — a quiet, steadfast presence who sat " +
      "close through the most difficult season of her health journey. This " +
      "graphite portrait is both a personal tribute and a reminder of " +
      "everything an animal can give when human words aren't quite enough.",
  },
  {
    imageSrc: "/assets/portraits/case-blackwhite.png",
    imageAlt: "A3 colour pencil and pan pastel portrait of two pets together",
    name: "Black & White",
    badge: "A3 · Colour Pencil & Pan Pastel",
    story:
      "Two animals, two entirely different temperaments — and yet an " +
      "undeniable closeness their owner wanted preserved forever. Separate " +
      "photographs were thoughtfully woven into one unified A3 composition, " +
      "with the background chosen to suit the family's home, in colour pencil " +
      "and pan pastel.",
  },
] as const;

const STEP = motionTokens.staggerChildren;

/* ── Component ───────────────────────────────────────────────────────────── */

/**
 * Simple Portrait case studies — Feature 2 (FEATURE_SRS §3 §2).
 *
 * Placed directly below SimplePortraitSection in the portraits page.
 * Background matches bg-linen (same visual zone as the pricing cards above).
 * Top padding reduced (pt-0) since it flows directly from the pricing section —
 * the section header provides the visual break.
 */
export function SimplePortraitCaseStudies() {
  return (
    <section
      aria-labelledby="simple-cases-heading"
      className="bg-linen pb-20 pt-4 lg:pb-28 lg:pt-6"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────── */}
        <div className="mb-10 text-center">
          <FadeIn variant="fadeUp">
            <SectionEyebrow>Portraits in Practice</SectionEyebrow>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP}>
            <h2
              id="simple-cases-heading"
              className="mt-3 font-heading text-2xl font-medium text-deep-pine md:text-3xl"
            >
              A Few Pets We Have Had the Honour of Capturing
            </h2>
          </FadeIn>
        </div>

        {/* ── 3-col responsive grid — THEME_GUIDE §8 ──────────────────── */}
        {/*
         * grid-cols-1 mobile → md:grid-cols-3 tablet/desktop.
         * items-stretch: all cards in a row reach equal height.
         * h-full propagates: FadeIn → CaseStudyGalleryCard → motion.div.
         */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <FadeIn
              key={cs.name}
              variant="fadeUp"
              delay={STEP * (i + 1)}
              className="h-full"
            >
              <CaseStudyGalleryCard
                imageSrc={cs.imageSrc}
                imageAlt={cs.imageAlt}
                name={cs.name}
                story={cs.story}
                badge={cs.badge}
              />
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
