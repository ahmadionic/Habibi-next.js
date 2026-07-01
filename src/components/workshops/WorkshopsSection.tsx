import { FadeIn }         from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { WorkshopCard }   from "./WorkshopCard";
import { motionTokens }   from "@/lib/motion";

const STEP = motionTokens.staggerChildren;

/*
 * Workshop data — FEATURE_SRS §5.
 *
 * Descriptions are original paraphrases; no verbatim copying from source.
 * Use plain Unicode apostrophes (') in JS strings — HTML entities are not
 * decoded when rendered as React text nodes via {description}.
 *
 * Image filenames match actual files in /public/assets/workshops/:
 *   workshop-watercolour.png, workshop-animalportrait-1.png
 */
const WORKSHOPS = [
  {
    title: "Seeds of Change Watercolour Workshop",
    image: "/assets/workshops/workshop-watercolour.png",
    imageAlt:
      "Hands painting a geometric botanical design in watercolour and ink on textured paper",
    description:
      "Seeds of Change is an open invitation to pick up a brush and discover " +
      "what happens when you stop trying to control every mark. Working through " +
      "geometric botanical designs in watercolour and ink, you’ll explore " +
      "wet-on-wet and wet-on-dry techniques — watching colour spread and settle " +
      "in quietly surprising ways. No prior experience needed; the workshop is " +
      "designed so that every participant leaves with something genuinely beautiful. " +
      "For those who wish to go a little deeper, an optional breathing and " +
      "reflection element offers a gentle pause to practise releasing what lies " +
      "beyond our control — and finding steadiness in what does not.",
    included: [
      "All art materials provided",
      "Light refreshments included",
      "Reflection journals available for purchase",
      "Additional art supplies available to take home",
    ],
  },
  {
    title: "Animal Portraits Workshop",
    image: "/assets/workshops/workshop-animalportrait-1.png",
    imageAlt:
      "A student working on a detailed pencil portrait of an animal in a warm workshop setting",
    description:
      "This workshop starts from a simple truth: you don’t need to be " +
      "“artistic” to make something honest and real. You’ll build the " +
      "observational skills that sit at the heart of portrait work — learning " +
      "to see in values and contrasts, and to use colour purposefully to capture " +
      "the texture of fur, feathers, or the particular glint in an animal’s " +
      "eye. The pace is unhurried and the atmosphere genuinely supportive, designed " +
      "for first-timers just as much as for those who’ve tried before and felt " +
      "stuck. You’ll leave with a portrait you’re proud of and the " +
      "confidence to keep going.",
    included: [
      "Art supplies & light refreshments provided",
      "Optional portrait kits available for purchase",
      "Take-home merchandise packs available",
    ],
  },
] as const;

/**
 * WorkshopsSection — Feature 4 (FEATURE_SRS §5).
 *
 * id="workshops" is the scroll target for the PageHero CTA "Explore Workshops".
 *
 * Grid: 2-col desktop (md:grid-cols-2), 1-col mobile — THEME_GUIDE §8.
 * Cards use layout="vertical" so the image sits on top within each 50%-wide
 * column, rather than splitting horizontally inside an already-narrow card.
 *
 * THEME_GUIDE §2: bg-linen alternates with the hero's cream underlay.
 * THEME_GUIDE §3: SectionEyebrow (Montserrat), h2 (Cormorant Garamond).
 */
export function WorkshopsSection() {
  return (
    <section
      id="workshops"
      aria-labelledby="workshops-heading"
      className="bg-linen py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <div className="mb-14 text-center">

          <FadeIn variant="fadeUp">
            <SectionEyebrow showHeart>Our Workshops</SectionEyebrow>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP}>
            <h2
              id="workshops-heading"
              className="mt-3 font-heading text-3xl font-medium text-deep-pine md:text-4xl"
            >
              Make Something. Feel Something.
            </h2>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP * 2}>
            <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-ink-soft">
              Each HABibi workshop is designed to be genuinely accessible — a space
              where creative skill-building and personal wellbeing sit comfortably
              side by side.
            </p>
          </FadeIn>

        </div>

        {/* ── 2×1 workshop cards grid ─────────────────────────────────────── */}
        {/*
         * THEME_GUIDE §8: 2-col desktop → 1-col mobile.
         * layout="vertical": image sits on top within each card (not image-left),
         * which is appropriate when each card occupies only 50% of the viewport.
         */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {WORKSHOPS.map((w, i) => (
            <FadeIn key={w.title} variant="fadeUp" delay={STEP * (i + 1)} className="h-full">
              <WorkshopCard
                image={w.image}
                imageAlt={w.imageAlt}
                title={w.title}
                description={w.description}
                included={[...w.included]}
                layout="vertical"
              />
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
