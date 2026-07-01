import Image from "next/image";
import { Heart } from "lucide-react";
import { FadeIn } from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { motionTokens } from "@/lib/motion";

/* ── Remembrance cards data — FEATURE_SRS §3 §4 ─────────────────────────── */
/*
 * Stories are one sentence each, entirely original paraphrases.
 * Tone: tender, collaborative, memory-honouring — never sorrowful in a clinical
 * way. Each reflects that Claire works with the family to get it right.
 *
 * Images: .png (corrected from .jpg specified in brief — actual files are .png).
 */
const TRIBUTES = [
  {
    imageSrc:  "/assets/portraits/case-carlos.png",
    imageAlt:  "Remembrance portrait of Carlos",
    name:      "Carlos",
    sentiment: "His family brought every photograph they had — together, they and Claire rebuilt the face they missed into something they could keep close forever.",
  },
  {
    imageSrc:  "/assets/portraits/case-leen.png",
    imageAlt:  "Remembrance portrait of Leen",
    name:      "Leen",
    sentiment: "Leen's portrait was a quiet gift between people who loved the same gentle soul — a way of holding her, still, between them.",
  },
  {
    imageSrc:  "/assets/portraits/case-stevie.png",
    imageAlt:  "Remembrance portrait of Stevie",
    name:      "Stevie",
    sentiment: "Old and faded photographs were all Stevie's family had left; through careful restoration, Claire drew him back into colour and warmth.",
  },
] as const;

const STEP = motionTokens.staggerChildren;

/* ── Component ───────────────────────────────────────────────────────────── */

/**
 * Remembrance Portrait Package section — Feature 2 (FEATURE_SRS §3 §4).
 *
 * Visual tone: deliberately gentler than the sections above.
 *   - bg-linen (warmer, softer than cream — signals an emotional shift)
 *   - Reduced animation delays (longer, calmer stagger)
 *   - No card hover lift — the hover shadow from motion is kept very subtle
 *   - Circular portrait images (softer than the full-bleed CaseStudyGalleryCard)
 *   - Rosewood Heart motif (THEME_GUIDE §2: "decorative highlights, heart icon")
 *   - All body copy in ink-soft rather than ink (lower contrast = softer feel)
 *
 * Testimonial cards are built inline — they are intentionally lighter than
 * CaseStudyGalleryCard and not reusable beyond this section.
 */
export function RemembranceSection() {
  return (
    <section
      aria-labelledby="remembrance-heading"
      className="bg-linen py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────── */}
        <div className="mb-12 text-center">

          {/* Rosewood heart — THEME_GUIDE §4 decorative motif */}
          <FadeIn variant="fadeIn">
            <Heart
              size={22}
              strokeWidth={1.5}
              aria-hidden="true"
              className="mx-auto mb-4 text-rosewood opacity-60"
            />
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP}>
            <SectionEyebrow>Remembrance Package</SectionEyebrow>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP * 2}>
            <h2
              id="remembrance-heading"
              className="mt-3 font-heading text-3xl font-medium text-deep-pine md:text-4xl"
            >
              A Portrait to Hold the Memory
            </h2>
          </FadeIn>

          <FadeIn variant="fadeUp" delay={STEP * 3}>
            <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-ink-soft">
              When a beloved companion leaves us, the photographs we have do not
              always capture the life that filled them. Claire works gently
              alongside each family — restoring faded or low-resolution images,
              editing with care — so that the portrait that emerges feels
              wholly true to the animal they knew and still carry in their heart.
            </p>
          </FadeIn>

          {/* Gold hairline — THEME_GUIDE §4 */}
          <FadeIn variant="fadeIn" delay={STEP * 4}>
            <div
              aria-hidden="true"
              className="mx-auto mt-8 w-10"
              style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.5 }}
            />
          </FadeIn>
        </div>

        {/* ── Testimonial cards — 3-col responsive grid ───────────────── */}
        {/*
         * Intentionally lighter than CaseStudyGalleryCard:
         *   - Circular image (softer framing)
         *   - Single sentence in italic ink-soft
         *   - No hover lift / strong shadow (motion shadow is kept very subtle)
         *   - bg-cream/80 card on linen bg — gentle contrast, not stark white
         *
         * THEME_GUIDE §8: grid-cols-1 mobile → md:grid-cols-3 tablet/desktop.
         */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TRIBUTES.map((tribute, i) => (
            <FadeIn
              key={tribute.name}
              variant="fadeUp"
              /* Longer stagger — calmer pacing suits the emotional tone */
              delay={STEP * 2 * (i + 1)}
            >
              <div className="flex flex-col items-center gap-4 rounded-lg border border-border-soft bg-cream/80 px-6 py-8 text-center shadow-[0_4px_20px_rgba(51,75,58,0.06)]">

                {/* Circular portrait image */}
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-border-soft">
                  <Image
                    src={tribute.imageSrc}
                    alt={tribute.imageAlt}
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>

                {/* Pet name — Cormorant Garamond — THEME_GUIDE §3 */}
                <h3 className="font-heading text-xl font-medium text-deep-pine">
                  {tribute.name}
                </h3>

                {/* Single-sentence tribute — italic, muted, warm */}
                <p className="font-body text-sm italic leading-relaxed text-ink-soft">
                  {tribute.sentiment}
                </p>

              </div>
            </FadeIn>
          ))}
        </div>

        {/* Closing rosewood heart */}
        <FadeIn variant="fadeIn" delay={STEP * 8}>
          <div className="mt-14 text-center">
            <Heart
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
              className="mx-auto text-rosewood opacity-40"
            />
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
