import { FadeIn }         from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ProgramCard }    from "./ProgramCard";
import { motionTokens }   from "@/lib/motion";

const STEP = motionTokens.staggerChildren;

/*
 * Program data — FEATURE_SRS §4 §3.
 *
 * Descriptions are original paraphrases of the factual brief.
 * No external article text is reproduced (Art & Crafts sustainability
 * reference is acknowledged in general terms only — no article is quoted
 * or described in detail, per FEATURE_SRS §4 §3 and copyright guidance).
 *
 * Image filenames match the actual files in /public/assets/education/:
 *   program-math.png, program-reading.jpg, program-art-1.png, program-movingup.jpg
 */
const PROGRAMS = [
  {
    title: "HABibi Math & Literacy",
    image: "/assets/education/program-math.png",
    imageAlt: "Children engaging in animal-based maths activities with therapy quails",
    description:
      "Numbers and words come alive when animals are part of the story. " +
      "From weighing and feeding scenarios to reading narratives built around " +
      "real quail behaviour, this programme makes mathematics and literacy " +
      "feel purposeful, joyful, and entirely within reach.",
    requestNote: "manual" as const,
  },
  {
    title: "HABibi Reading & Writing",
    image: "/assets/education/program-reading.jpg",
    imageAlt: "A child reading in a calm, animal-friendly learning environment",
    description:
      "A gentle, animal-centred literacy programme that builds confidence " +
      "in reading and writing at each child's own pace — celebrating every " +
      "small breakthrough as the meaningful achievement it is.",
    requestNote: "leaflet" as const,
  },
  {
    title: "HABibi Art & Crafts",
    image: "/assets/education/program-art-1.png",
    imageAlt: "Student art project featuring leaf art and nature-inspired animal illustrations",
    description:
      "Therapeutic colouring, leaf-art, and nature-inspired projects that " +
      "strengthen fine motor skills and observational thinking while " +
      "cultivating a genuine connection with the natural world. Students " +
      "have used this work to contribute to sustainability initiatives — " +
      "creating pieces that carry meaning far beyond the classroom.",
    requestNote: undefined,
  },
  {
    title: "HABibi Moving Up",
    image: "/assets/education/program-movingup.jpg",
    imageAlt: "A student building an organisation system as part of the Moving Up transition programme",
    description:
      "Changing schools or moving between year groups can feel overwhelming. " +
      "This programme equips students with personalised organisation systems, " +
      "emotional check-in tools, and a practical 'tell the teacher' toolkit " +
      "— building the self-management and emotional resilience they need to " +
      "step forward with confidence.",
    requestNote: undefined,
  },
] as const;

/**
 * ProgramsGrid — Feature 3 (FEATURE_SRS §4 §3).
 *
 * id="programs" is the scroll target for the PageHero CTA "Meet the Programs".
 *
 * Grid: 2-col desktop (md:grid-cols-2), 1-col mobile.
 * Cards stagger-animate into view per THEME_GUIDE §7.
 *
 * THEME_GUIDE §2: bg-cream alternates with preceding bg-linen section.
 * THEME_GUIDE §3: SectionEyebrow (Montserrat), h2 (Cormorant Garamond).
 * THEME_GUIDE §8: all grids collapse to 1-col on mobile.
 */
export function ProgramsGrid() {
  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <div className="mb-14 text-center">

          <FadeIn variant="fadeUp">
            <SectionEyebrow showHeart>Our Programs</SectionEyebrow>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP}>
            <h2
              id="programs-heading"
              className="mt-3 font-heading text-3xl font-medium text-deep-pine md:text-4xl"
            >
              Programs Designed Around Connection
            </h2>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP * 2}>
            <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-ink-soft">
              Each HABibi programme begins not with a syllabus, but with a child —
              their strengths, their world, and the animal connection that opens
              the door to learning.
            </p>
          </FadeIn>

        </div>

        {/* ── 2×2 program cards grid ─────────────────────────────────────── */}
        {/*
         * THEME_GUIDE §8: 2-col desktop → 1-col mobile.
         * items-stretch ensures both cards in a row reach equal height,
         * so BrandCard shadows align cleanly.
         * h-full propagates through FadeIn → ProgramCard → BrandCard.
         */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {PROGRAMS.map((program, i) => (
            <FadeIn
              key={program.title}
              variant="fadeUp"
              delay={STEP * (i + 1)}
              className="h-full"
            >
              <ProgramCard
                image={program.image}
                imageAlt={program.imageAlt}
                title={program.title}
                description={program.description}
                requestNote={program.requestNote}
              />
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
