"use client";

/**
 * /checkout — Inquiry-based checkout stub (v1).
 *
 * FEATURE_SRS §11 — Out of Scope for v1:
 *   Real payment processing (Stripe) — stub checkout only, flag as "Phase 2."
 *
 * // TODO Phase 2: integrate Stripe for real payment processing.
 *    Replace handleSubmit with a Stripe Payment Intent flow, update this
 *    page to use <Elements> provider, and add a PaymentElement.
 *
 * // TODO (later phase): persist shop inquiry to the database.
 *    Decide whether to reuse the leads table introduced in Group 9
 *    or create a dedicated shop_inquiries table. For now the success
 *    state is shown client-side only with no server persistence.
 */

import { useState } from "react";
import Link          from "next/link";
import Image         from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { useCart, CartItem } from "@/hooks/useCart";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────── */

/** Snapshot of the cart captured at submit time — held in state for the
 *  success screen so the user can see what they enquired about. */
interface SubmittedOrder {
  items:  CartItem[];
  total:  number;
  name:   string;
  email:  string;
}

/* ── Input component (keeps JSX DRY without a separate file) ─────────────── */

function Field({
  id, label, type = "text", value, onChange, required = false,
  placeholder = "", autoComplete,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean;
  placeholder?: string; autoComplete?: string;
}) {
  const inputCls = cn(
    "w-full rounded-md border border-border-soft bg-white/70",
    "px-4 py-3 font-body text-sm text-ink",
    "placeholder:text-ink-soft/40",
    "transition-colors duration-150",
    "focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20",
  );
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-body text-sm font-medium text-ink-soft">
        {label}{required && <span className="ml-0.5 text-terracotta" aria-hidden="true">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={cn(inputCls, "resize-none")}
          autoComplete={autoComplete}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputCls}
        />
      )}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

/**
 * CheckoutPage — Feature 5 (FEATURE_SRS §6, §11).
 *
 * Three states:
 *   1. empty   — cart is empty, no submission pending: show empty-cart callout.
 *   2. form    — cart has items: 2-col layout (order summary + inquiry form).
 *   3. success — form submitted: cart cleared, confirmation message shown.
 *
 * THEME_GUIDE §2: cream bg, deep-pine headings, terracotta accents.
 * THEME_GUIDE §3: font-heading for headings; font-body for all labels/inputs.
 * THEME_GUIDE §6: radius-lg cards; border-soft borders.
 * THEME_GUIDE §7: AnimatePresence cross-fade between states.
 */
export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();

  /* ── Form field state ────────────────────────────────────────────────── */
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note,  setNote]  = useState("");

  /* ── Submission state ────────────────────────────────────────────────── */
  const [order, setOrder] = useState<SubmittedOrder | null>(null);

  /* Derived flags */
  const isSubmitted = order !== null;
  const isEmpty     = items.length === 0 && !isSubmitted;

  /* ── Handlers ────────────────────────────────────────────────────────── */

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /* Snapshot the cart before clearing it */
    setOrder({ items: [...items], total, name, email });
    // TODO Phase 2: integrate Stripe — submit payment intent here instead of just clearing.
    // TODO (later phase): POST { items, name, email, phone, note } to /api/shop-inquiry
    //   to persist the enquiry; decide table strategy (leads vs shop_inquiries) in Group 9.
    clearCart();
  }

  /* ── Shared page wrapper ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-16">

        {/* Back link */}
        <Link
          href="/shop"
          className="mb-10 inline-flex items-center gap-1.5 font-body text-sm font-medium text-forest transition-colors duration-200 hover:text-deep-pine"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Shop
        </Link>

        {/* Page heading */}
        <div className="mb-10">
          <p className="mb-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            HABibi Shop
          </p>
          <h1 className="font-heading text-3xl font-medium text-deep-pine md:text-4xl">
            Checkout
          </h1>
        </div>

        {/* ── State machine ───────────────────────────────────────────── */}
        <AnimatePresence mode="wait">

          {/* ── State 1: empty cart ────────────────────────────────────── */}
          {isEmpty && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease }}
              className="flex flex-col items-center justify-center gap-5 rounded-lg border border-border-soft bg-linen/40 py-20 text-center"
            >
              <ShoppingBag size={44} className="text-ink-soft/30" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <p className="font-heading text-xl font-medium text-deep-pine">Your cart is empty</p>
                <p className="font-body text-sm text-ink-soft">
                  Add some items from the shop before checking out.
                </p>
              </div>
              <Link
                href="/shop"
                className={cn(
                  "inline-flex items-center rounded-pill px-7 py-3",
                  "font-body text-sm font-semibold tracking-wide select-none",
                  "bg-deep-pine text-cream transition-colors hover:bg-forest",
                )}
                style={{ boxShadow: "0 4px 20px rgba(51,75,58,0.15)" }}
              >
                Browse the Collection
              </Link>
            </motion.div>
          )}

          {/* ── State 2: inquiry form ──────────────────────────────────── */}
          {!isEmpty && !isSubmitted && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-5"
            >

              {/* ── Left: order summary ──────────────────────────────────── */}
              <aside
                aria-label="Order summary"
                className="lg:col-span-2"
              >
                <div
                  className="rounded-lg border border-border-soft bg-linen/50 p-6"
                  style={{ boxShadow: "0 4px 20px rgba(51,75,58,0.06)" }}
                >
                  <h2 className="mb-5 font-heading text-lg font-medium text-deep-pine">
                    Your Order
                  </h2>

                  <ul className="flex flex-col divide-y divide-border-soft" role="list">
                    {items.map((item) => (
                      <li key={item.productId} className="flex items-center gap-3 py-3">

                        {/* Thumbnail */}
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-cream">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover object-center"
                              sizes="48px"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <ShoppingBag size={16} className="text-ink-soft/30" aria-hidden="true" />
                            </div>
                          )}
                        </div>

                        {/* Name + qty */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-body text-sm font-medium text-ink">
                            {item.name}
                          </p>
                          <p className="font-body text-xs text-ink-soft">
                            Qty {item.quantity}
                          </p>
                        </div>

                        {/* Line total */}
                        <p className="shrink-0 font-body text-sm font-semibold text-terracotta">
                          QAR {Math.round((item.price * item.quantity) / 100)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Subtotal */}
                  <div className="mt-5 flex items-center justify-between border-t border-border-soft pt-5">
                    <span className="font-body text-sm text-ink-soft">Subtotal</span>
                    <span className="font-heading text-xl font-medium text-deep-pine">
                      QAR {Math.round(total / 100)}
                    </span>
                  </div>

                  {/* Phase 2 note */}
                  <p className="mt-4 rounded-md bg-sand/60 px-3 py-2.5 font-body text-xs leading-relaxed text-ink-soft">
                    Shipping & taxes calculated upon confirmation.
                    Claire&rsquo;s team will follow up with payment details.
                  </p>
                </div>
              </aside>

              {/* ── Right: inquiry form ──────────────────────────────────── */}
              <section
                aria-label="Enquiry details"
                className="lg:col-span-3"
              >
                <div
                  className="rounded-lg border border-border-soft bg-cream p-6 lg:p-8"
                  style={{ boxShadow: "0 4px 20px rgba(51,75,58,0.06)" }}
                >
                  <h2 className="mb-2 font-heading text-lg font-medium text-deep-pine">
                    Your Details
                  </h2>
                  <p className="mb-6 font-body text-sm text-ink-soft">
                    Fill in your contact details and we&rsquo;ll be in touch to arrange payment and delivery.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field
                        id="checkout-name"
                        label="Full Name"
                        value={name}
                        onChange={setName}
                        required
                        placeholder="Your name"
                        autoComplete="name"
                      />
                      <Field
                        id="checkout-email"
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        required
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>

                    <Field
                      id="checkout-phone"
                      label="Phone Number"
                      type="tel"
                      value={phone}
                      onChange={setPhone}
                      placeholder="+974 ···· ····"
                      autoComplete="tel"
                    />

                    <Field
                      id="checkout-note"
                      label="Note to Claire (optional)"
                      type="textarea"
                      value={note}
                      onChange={setNote}
                      placeholder="Any special requests, gifting notes, or delivery preferences…"
                      autoComplete="off"
                    />

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease }}
                      className={cn(
                        "mt-2 flex w-full items-center justify-center gap-2 rounded-pill px-8 py-3.5",
                        "font-body text-sm font-semibold tracking-wide select-none",
                        "bg-deep-pine text-cream transition-colors hover:bg-forest",
                      )}
                      style={{ boxShadow: "0 4px 20px rgba(51,75,58,0.18)" }}
                    >
                      Send Enquiry
                    </motion.button>

                    <p className="text-center font-body text-xs text-ink-soft/60">
                      No payment is taken now. Claire&rsquo;s team will confirm your order and arrange payment.
                    </p>

                  </form>
                </div>
              </section>

            </motion.div>
          )}

          {/* ── State 3: success ──────────────────────────────────────────── */}
          {isSubmitted && order && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease }}
              className="mx-auto max-w-2xl"
            >
              <div
                className="rounded-lg border border-border-soft bg-cream p-8 text-center lg:p-12"
                style={{ boxShadow: "0 8px 30px rgba(51,75,58,0.10)" }}
              >

                {/* Animated check circle */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.45, ease: motionTokens.ease }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10"
                >
                  <Check size={28} className="text-success" aria-hidden="true" />
                </motion.div>

                {/* Heading */}
                <h2 className="mb-3 font-heading text-2xl font-medium text-deep-pine md:text-3xl">
                  Enquiry Received
                </h2>

                {/* Confirmation message — verbatim from spec */}
                <p className="mb-6 font-body text-base leading-relaxed text-ink">
                  Thank you{order.name ? `, ${order.name.split(" ")[0]}` : ""} — Claire&rsquo;s team will follow up to confirm your order and arrange payment.
                </p>

                {/* Confirmation email note */}
                <p className="mb-8 font-body text-sm text-ink-soft">
                  A confirmation will be sent to{" "}
                  <span className="font-medium text-ink">{order.email}</span>.
                </p>

                {/* What was ordered */}
                <div className="mb-8 rounded-md border border-border-soft bg-linen/40 p-5 text-left">
                  <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-sage">
                    Your Order
                  </p>
                  <ul className="flex flex-col gap-2" role="list">
                    {order.items.map((item) => (
                      <li
                        key={item.productId}
                        className="flex items-center justify-between gap-3 font-body text-sm"
                      >
                        <span className="text-ink">
                          {item.name}
                          <span className="ml-1 text-ink-soft">× {item.quantity}</span>
                        </span>
                        <span className="shrink-0 font-medium text-terracotta">
                          QAR {Math.round((item.price * item.quantity) / 100)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between border-t border-border-soft pt-4">
                    <span className="font-body text-sm text-ink-soft">Total</span>
                    <span className="font-heading text-lg font-medium text-deep-pine">
                      QAR {Math.round(order.total / 100)}
                    </span>
                  </div>
                </div>

                {/* Gold hairline divider */}
                <div
                  aria-hidden="true"
                  className="mx-auto mb-8 w-12"
                  style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.65 }}
                />

                {/* CTAs */}
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/shop"
                    className={cn(
                      "inline-flex items-center rounded-pill px-7 py-3",
                      "font-body text-sm font-semibold tracking-wide select-none",
                      "bg-deep-pine text-cream transition-colors hover:bg-forest",
                    )}
                    style={{ boxShadow: "0 4px 20px rgba(51,75,58,0.15)" }}
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center rounded-pill px-7 py-3 font-body text-sm font-semibold tracking-wide text-deep-pine transition-colors hover:bg-linen select-none"
                  >
                    Back to HABibi
                  </Link>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
