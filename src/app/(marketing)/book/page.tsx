import type { Metadata } from "next";
import { PageHero }     from "@/components/layout/PageHero";
import { BookingForm }  from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book a Consultation | HABibi by Claire Olivier",
  description:
    "Reach out to book a school programme, portrait session, workshop, or " +
    "general consultation with Claire Olivier — animal therapy specialist, " +
    "educator, and artist based in Doha, Qatar.",
};

/*
 * Feature 7 — Booking / Consultation Form — /book
 * FEATURE_SRS §8 | THEME_GUIDE §2, 3, 6, 7, 8
 *
 * Server Component wrapper — keeps metadata export here.
 * BookingForm is "use client" and owns all form state.
 *
 * Section order:
 *   1. PageHero   — eyebrow / headline / script subtitle
 *   2. Form card  — BookingForm centered in max-w-2xl container
 *
 * backgroundImage reuses /assets/about/claire-bio.jpg (no dedicated /book
 * hero asset — chosen because it shows Claire in a warm, personal setting
 * that matches the "let's start a conversation" tone).
 */
export default function BookPage() {
  return (
    <>

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Let's Start the Conversation"
        subtitle="We'd love to hear from you."
        subtitleStyle="script"
        backgroundImage="/assets/about/claire-bio.png"
      />

      {/* ── 2. Booking form ─────────────────────────────────────────────── */}
      <section
        aria-label="Booking enquiry form"
        className="bg-cream py-16 lg:py-24"
      >
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <BookingForm />
        </div>
      </section>

    </>
  );
}
