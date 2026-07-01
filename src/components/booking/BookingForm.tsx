"use client";

/**
 * BookingForm — Feature 7 (FEATURE_SRS §8).
 *
 * Self-contained "use client" component. Handles:
 *   - Controlled form state
 *   - Client-side validation (name, email format, purpose, message)
 *   - Conditional fields via AnimatePresence height+fade animation
 *   - Loading state on submit (spinner in BrandButton)
 *   - Success state with animated checkmark
 *
 * Submit handler POSTs to /api/booking, persists the lead in Neon,
 * and triggers Nodemailer emails (admin notification + client confirmation).
 *
 * THEME_GUIDE §2: cream/white field backgrounds; forest focus rings; error in warm-red.
 * THEME_GUIDE §3: font-body for all labels/inputs; font-heading for success heading.
 * THEME_GUIDE §6: radius-md inputs; radius-pill submit button; shadow-card form card.
 * THEME_GUIDE §7: AnimatePresence height+opacity for conditional fields.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Loader2, Send } from "lucide-react";
import { BrandButton }            from "@/components/ui/BrandButton";
import { SuccessConfirmation }    from "./SuccessConfirmation";
import { motionTokens }           from "@/lib/motion";
import { cn }                     from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────── */

type Purpose =
  | ""
  | "portrait-inquiry"
  | "school-program"
  | "workshop-reservation"
  | "general-question";

interface FormValues {
  name:                   string;
  email:                  string;
  phone:                  string;
  purpose:                Purpose;
  petNames:               string;
  workshopType:           string;
  preferredDate:          string;
  message:                string;
  preferredContactMethod: "email" | "phone";
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL: FormValues = {
  name:                   "",
  email:                  "",
  phone:                  "",
  purpose:                "",
  petNames:               "",
  workshopType:           "",
  preferredDate:          "",
  message:                "",
  preferredContactMethod: "email",
};

/* ── Shared input class builder ──────────────────────────────────────────── */

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-white/70 px-4 py-3",
    "font-body text-sm text-ink placeholder:text-ink-soft/40",
    "transition-colors duration-150",
    "focus:outline-none focus:ring-2",
    hasError
      ? "border-error focus:border-error focus:ring-error/20"
      : "border-border-soft focus:border-forest focus:ring-forest/20",
  );
}

/* ── Field wrapper ───────────────────────────────────────────────────────── */

function Field({
  id, label, required = false, error, hint, children,
}: {
  id: string; label: string; required?: boolean;
  error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-body text-sm font-medium text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-terracotta">*</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="font-body text-xs text-ink-soft/70">{hint}</p>
      )}
      {error && (
        <p role="alert" className="font-body text-xs text-error">{error}</p>
      )}
    </div>
  );
}

/* ── Conditional field motion wrapper ────────────────────────────────────── */
/*
 * height:"auto" expand/collapse with opacity fade.
 * overflow-hidden is on the wrapper, not the inner content, so the child
 * input doesn't get clipped while visible.
 */
function ConditionalField({
  show, motionKey, children,
}: {
  show: boolean; motionKey: string; children: React.ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          key={motionKey}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: motionTokens.ease }}
          className="overflow-hidden"
        >
          {/* Inner padding so content isn't flush against the clipping edge */}
          <div className="pt-5">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */

export function BookingForm() {
  const [values, setValues]       = useState<FormValues>(INITIAL);
  const [errors, setErrors]       = useState<FormErrors>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError]   = useState<string | null>(null);

  /* Generic change handler — clears the field error on edit */
  function set<K extends keyof FormValues>(field: K) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  /* Build the payload, omitting conditional fields not relevant to purpose */
  function buildPayload() {
    const base = {
      name:                   values.name.trim(),
      email:                  values.email.trim(),
      phone:                  values.phone.trim() || undefined,
      purpose:                values.purpose,
      message:                values.message.trim(),
      preferredContactMethod: values.preferredContactMethod,
    };
    if (values.purpose === "portrait-inquiry") {
      return {
        ...base,
        petNames: values.petNames.trim() || undefined,
      };
    }
    if (values.purpose === "workshop-reservation") {
      return {
        ...base,
        workshopType:  values.workshopType || undefined,
        preferredDate: values.preferredDate || undefined,
      };
    }
    return base;
  }

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!values.name.trim())
      errs.name = "Your name is required.";
    if (!values.email.trim())
      errs.email = "Your email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      errs.email = "Please enter a valid email address.";
    if (!values.purpose)
      errs.purpose = "Please select the purpose of your enquiry.";
    if (!values.message.trim())
      errs.message = "Please share a few details about your request.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError(null);
    try {
      const res  = await fetch("/api/booking", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(buildPayload()),
      });
      const data = await res.json() as { success: boolean; leadId?: number; error?: string };
      if (data.success) {
        setSubmitted(true);
      } else {
        setApiError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setApiError("Could not reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const isPortrait  = values.purpose === "portrait-inquiry";
  const isWorkshop  = values.purpose === "workshop-reservation";

  /* ── Shared native select wrapper ─────────────────────────────────────── */
  const SelectWrapper = ({
    id, value, onChange, children, hasError = false,
  }: {
    id: string; value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    children: React.ReactNode; hasError?: boolean;
  }) => (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={cn(inputCls(hasError), "appearance-none pr-10 cursor-pointer")}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft/60"
      />
    </div>
  );

  return (
    /*
     * motion.div + layout: framer-motion animates the card's height change when
     * the form transitions to the success state, preventing a layout jump.
     * AnimatePresence mode="wait": form fades out fully before success fades in.
     */
    <motion.div
      layout
      transition={{ duration: 0.4, ease: motionTokens.ease }}
      className="rounded-lg border border-border-soft bg-cream p-6 lg:p-10"
      style={{ boxShadow: "0 8px 30px rgba(51,75,58,0.08)" }}
    >
      <AnimatePresence mode="wait" initial={false}>

        {/* ── Success state ──────────────────────────────────────────── */}
        {submitted && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: motionTokens.ease }}
          >
            <SuccessConfirmation name={values.name} purpose={values.purpose} />
          </motion.div>
        )}

        {/* ── Form ───────────────────────────────────────────────────── */}
        {!submitted && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: motionTokens.ease }}
          >

      {/* Form intro */}
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-medium text-deep-pine md:text-3xl">
          Send an Enquiry
        </h2>
        <p className="mt-2 font-body text-sm text-ink-soft">
          Fields marked <span className="text-terracotta" aria-hidden="true">*</span> are required.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

        {/* ── Row 1: Name + Email ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          <Field id="book-name" label="Full Name" required error={errors.name}>
            <input
              id="book-name"
              type="text"
              value={values.name}
              onChange={set("name")}
              placeholder="Your name"
              autoComplete="name"
              className={inputCls(!!errors.name)}
            />
          </Field>

          <Field id="book-email" label="Email Address" required error={errors.email}>
            <input
              id="book-email"
              type="email"
              value={values.email}
              onChange={set("email")}
              placeholder="you@example.com"
              autoComplete="email"
              className={inputCls(!!errors.email)}
            />
          </Field>

        </div>

        {/* ── Phone ───────────────────────────────────────────────────── */}
        <Field
          id="book-phone"
          label="Phone Number"
          hint="Optional — include country code for Qatar (+974)."
        >
          <input
            id="book-phone"
            type="tel"
            value={values.phone}
            onChange={set("phone")}
            placeholder="+974 ···· ····"
            autoComplete="tel"
            className={inputCls(false)}
          />
        </Field>

        {/* ── Purpose ─────────────────────────────────────────────────── */}
        <Field id="book-purpose" label="Purpose of Enquiry" required error={errors.purpose}>
          <SelectWrapper
            id="book-purpose"
            value={values.purpose}
            onChange={set("purpose")}
            hasError={!!errors.purpose}
          >
            <option value="" disabled>Select a purpose…</option>
            <option value="portrait-inquiry">Portrait Inquiry</option>
            <option value="school-program">School Program</option>
            <option value="workshop-reservation">Workshop Reservation</option>
            <option value="general-question">General Question</option>
          </SelectWrapper>
        </Field>

        {/* ── Conditional: Portrait Inquiry → Pet Name(s) ─────────────── */}
        <ConditionalField show={isPortrait} motionKey="pet-names">
          <Field
            id="book-pet-names"
            label="Pet Name(s)"
            hint="Optional — tell us who we'll be painting!"
          >
            <input
              id="book-pet-names"
              type="text"
              value={values.petNames}
              onChange={set("petNames")}
              placeholder="e.g. Biscuit, Luna"
              className={inputCls(false)}
            />
          </Field>
        </ConditionalField>

        {/* ── Conditional: Workshop Reservation → Type + Date ─────────── */}
        <ConditionalField show={isWorkshop} motionKey="workshop-fields">
          <div className="flex flex-col gap-5">

            <Field id="book-workshop-type" label="Which Workshop?">
              <SelectWrapper
                id="book-workshop-type"
                value={values.workshopType}
                onChange={set("workshopType")}
              >
                <option value="">Select a workshop…</option>
                <option value="seeds-of-change">Seeds of Change — Watercolour</option>
                <option value="animal-portraits">Animal Portraits Workshop</option>
              </SelectWrapper>
            </Field>

            <Field
              id="book-preferred-date"
              label="Preferred Date"
              hint="Optional — we'll confirm availability."
            >
              <input
                id="book-preferred-date"
                type="date"
                value={values.preferredDate}
                onChange={set("preferredDate")}
                min={new Date().toISOString().split("T")[0]}
                className={cn(inputCls(false), "cursor-pointer")}
              />
            </Field>

          </div>
        </ConditionalField>

        {/* ── Message ─────────────────────────────────────────────────── */}
        <Field
          id="book-message"
          label="Message / Details"
          required
          error={errors.message}
          hint="Tell us a bit about what you're looking for."
        >
          <textarea
            id="book-message"
            rows={5}
            value={values.message}
            onChange={set("message")}
            placeholder="Share any details about your enquiry…"
            className={cn(inputCls(!!errors.message), "resize-none")}
          />
        </Field>

        {/* ── Preferred Contact Method ─────────────────────────────────── */}
        <fieldset>
          <legend className="mb-3 font-body text-sm font-medium text-ink">
            Preferred Contact Method
          </legend>
          <div className="flex gap-6">
            {(["email", "phone"] as const).map((method) => (
              <label
                key={method}
                className="flex cursor-pointer items-center gap-2.5"
              >
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value={method}
                  checked={values.preferredContactMethod === method}
                  onChange={set("preferredContactMethod")}
                  className="h-4 w-4 cursor-pointer"
                  style={{ accentColor: "#5E6F52" }} /* forest */
                />
                <span className="font-body text-sm font-medium capitalize text-ink">
                  {method}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* ── API-level error (server validation or network failure) ─────── */}
        {apiError && (
          <div
            role="alert"
            className="rounded-md border border-error/30 bg-error/5 px-4 py-3"
          >
            <p className="font-body text-sm text-error">{apiError}</p>
          </div>
        )}

        {/* ── Submit ──────────────────────────────────────────────────── */}
        <div className="mt-2 flex flex-col gap-3">
          <BrandButton
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full justify-center"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <Send size={16} aria-hidden="true" />
                Send My Request
              </>
            )}
          </BrandButton>

          <p className="text-center font-body text-xs text-ink-soft/60">
            We aim to respond within 1–2 business days.
          </p>
        </div>

      </form>

          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}
