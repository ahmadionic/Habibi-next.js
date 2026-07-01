import Image from "next/image";
import { FadeIn } from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Badge } from "@/components/ui/Badge";
import { motionTokens } from "@/lib/motion";

const STEP = motionTokens.staggerChildren;

/*
 * Credential pills — FEATURE_SRS §4 credentials:
 * C-AAIS, MA.Inc Ed, 26 years, Ministry of Education compliance
 */
const PILLS: Array<{ label: string; variant: "sage" | "sand" | "linen" }> = [
  { label: "C-AAIS", variant: "sage" },
  { label: "MA.Inc Ed", variant: "sage" },
  { label: "26+ Years Experience", variant: "sand" },
  { label: "Ministry-Compliant Programs", variant: "linen" },
];

/**
 * CredentialBlock — Feature 3 (FEATURE_SRS §4 §2).
 *
 * Two-column layout: image left, credentials text right on desktop;
 * stacked (image above, text below) on mobile.
 *
 * Facts included (verbatim from FEATURE_SRS §4, original phrasing):
 *   - C-AAIS, MA.Inc Ed
 *   - 26 years teaching experience
 *   - South Africa, England, South Korea, Qatar
 *   - Inclusion advocate / certified AAIS
 *   - Collaborates with OTs, speech therapists, psychologists
 *   - Risk assessments, informed consent, Ministry of Education-compliant docs
 *
 * THEME_GUIDE §2: sage border on image frame, forest/deep-pine text.
 * THEME_GUIDE §3: font-heading for h2, font-body for prose.
 * THEME_GUIDE §6: radius-lg for image frame, shadow-card, border-soft.
 */
export function CredentialBlock() {
  return (
    <section
      aria-labelledby="credential-heading"
      className="bg-linen py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: portrait image ────────────────────────────────────── */}
          {/*
           * THEME_GUIDE §5: soft natural light, warm tones.
           * THEME_GUIDE §6: radius-lg, shadow-card, 1px border-soft.
           * Sage-tinted border adds warmth while nodding to the brand palette.
           */}
          <FadeIn variant="fadeUp" className="flex justify-center lg:justify-start">
            <div
              className="relative w-full max-w-sm overflow-hidden rounded-lg"
              style={{
                border: "2px solid rgba(141,156,122,0.35)", /* sage/35 */
                boxShadow: "0 8px 30px rgba(51,75,58,0.10)",
              }}
            >
              <Image
                src="/assets/education/claire-portrait.png"
                alt="Miss Claire Olivier — inclusion educator and certified Animal Assisted Intervention Specialist"
                width={480}
                height={600}
                className="h-auto w-full object-cover object-top"
                priority={false}
              />
            </div>
          </FadeIn>

          {/* ── Right: credentials text ─────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            <FadeIn variant="fadeUp" delay={STEP}>
              <SectionEyebrow showHeart>About Miss Claire</SectionEyebrow>
            </FadeIn>

            <FadeIn variant="fadeUp" delay={STEP * 2}>
              <h2
                id="credential-heading"
                className="font-heading text-3xl font-medium text-deep-pine md:text-4xl"
              >
                Meet Miss Claire
              </h2>
            </FadeIn>

            {/* Paragraph 1 — qualifications, experience, countries */}
            <FadeIn variant="fadeUp" delay={STEP * 3}>
              <p className="font-body text-base leading-relaxed text-ink md:text-lg">
                Claire Olivier holds a Master&rsquo;s in Inclusive Education (MA.Inc Ed) and
                is a certified Animal Assisted Intervention Specialist (C-AAIS) —
                credentials earned across a teaching career of more than 26 years,
                lived out in four countries: South Africa, England, South Korea, and
                Qatar. Wherever she has worked, her guiding conviction has remained
                the same: that inclusive education is not a concession to difference
                but a commitment to every child&rsquo;s fullest potential.
              </p>
            </FadeIn>

            {/* Paragraph 2 — collaborative practice, documentation */}
            <FadeIn variant="fadeUp" delay={STEP * 4}>
              <p className="font-body text-base leading-relaxed text-ink-soft md:text-lg">
                At HABibi, Miss Claire works in close partnership with occupational
                therapists, speech therapists, and psychologists to weave
                animal-assisted approaches into each child&rsquo;s broader support
                journey. Every programme she delivers is underpinned by thorough
                risk assessments, informed consent documentation, and materials
                that are fully compliant with Ministry of Education standards —
                so that schools, families, and allied professionals can engage
                with complete confidence.
              </p>
            </FadeIn>

            {/* Credential pills */}
            <FadeIn variant="fadeUp" delay={STEP * 5}>
              <div className="mt-1 flex flex-wrap gap-2">
                {PILLS.map((pill) => (
                  <Badge key={pill.label} variant={pill.variant}>
                    {pill.label}
                  </Badge>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  );
}
