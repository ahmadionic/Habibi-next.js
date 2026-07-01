import { Clock } from "lucide-react";
import { FadeIn } from "@/components/layout/FadeIn";
import { motionTokens } from "@/lib/motion";

const STEP = motionTokens.staggerChildren;

/**
 * Process note — Feature 2 (FEATURE_SRS §3 §5).
 *
 * "Each portrait takes up to 30 hours; price/timeline vary by request."
 * Paraphrased in warm, practical language that explains why every commission
 * is individually scoped rather than off-the-shelf.
 *
 * Intentionally understated — a calm, honest bridge between the emotional
 * Remembrance section above and the CTA below.
 */
export function ProcessNote() {
  return (
    <section
      aria-label="Portrait process and timeline"
      className="bg-cream py-16 lg:py-20"
    >
      <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">

        {/* Clock icon — communicates care and time investment */}
        <FadeIn variant="fadeIn">
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand">
              <Clock
                size={20}
                strokeWidth={1.75}
                aria-hidden="true"
                className="text-sage"
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn variant="fadeUp" delay={STEP}>
          <h2 className="font-heading text-2xl font-medium text-deep-pine md:text-3xl">
            Every Portrait Is Made for You, and Only You
          </h2>
        </FadeIn>

        {/* Gold hairline */}
        <FadeIn variant="fadeIn" delay={STEP * 2}>
          <div
            aria-hidden="true"
            className="mx-auto my-6 w-10"
            style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.6 }}
          />
        </FadeIn>

        <FadeIn variant="fadeUp" delay={STEP * 3}>
          <p className="font-body text-base leading-relaxed text-ink-soft md:text-lg">
            Each piece Claire creates is drawn entirely by hand, from scratch,
            with no templates or digital shortcuts. Depending on the medium
            chosen, the complexity of the subject, and the level of detail
            requested, a single commission can take{" "}
            <strong className="font-semibold text-ink">up to thirty hours</strong>{" "}
            to complete.
          </p>
        </FadeIn>

        <FadeIn variant="fadeUp" delay={STEP * 4}>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-soft md:text-lg">
            For this reason, both pricing and timelines are always scoped
            individually. After an initial conversation about your vision,
            Claire will provide a clear quote and a realistic completion
            date — before any work begins.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
