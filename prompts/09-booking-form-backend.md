# Group 9 — Booking Form + Backend Prompts (Feature 7)

**Do not start until Group 8 is fully checked off.**

**Before Prompt 9.4**, sign up for a free Resend account at https://resend.com and add your `RESEND_API_KEY` to `.env.local`.

Scope: only modify `/src/db/schema.ts` (additively), `/src/app/(marketing)/book/`, `/src/app/api/booking/`, and `/src/components/booking/`.

---

## Prompt 9.1 — Database schema for leads/bookings

```
Read /FEATURE_SRS.md section 8 (Feature 7 — Booking/Consultation Form) for the exact field requirements.

In /src/db/schema.ts, ADD a `leads` table (do not remove or modify the existing `products` table from Group 7):
- id (serial primary key)
- name (text, not null)
- email (text, not null)
- phone (text)
- purpose (text, not null) — one of: "portrait-inquiry", "school-program", "workshop-reservation", "general-question"
- message (text)
- petNames (text, nullable) — only relevant when purpose is portrait-inquiry
- workshopType (text, nullable) — only relevant when purpose is workshop-reservation
- preferredDate (text, nullable) — only relevant when purpose is workshop-reservation
- preferredContactMethod (text) — "email" or "phone"
- status (text, default "new") — "new" | "contacted" | "closed"
- createdAt (timestamp, default now)

Generate and apply the migration to my Neon database. Confirm it ran successfully by showing me the table structure.
```

### Test Prompt 9.1
```
Show me the leads table schema and confirm both the products table (from Group 7) and the new leads table both exist in my Neon database without conflict.
```

### Expected Result 9.1
- `leads` table created successfully.
- `products` table from Group 7 is untouched.
- No migration errors.

---

## Prompt 9.2 — Booking form UI with conditional fields

```
Read /THEME_GUIDE.md sections 2, 3, 6, 7, 8 and /FEATURE_SRS.md section 8 (exact field/conditional-logic requirements).
Do not modify files outside /src/app/(marketing)/book/page.tsx and /src/components/booking/BookingForm.tsx.

Build a BookingForm client component, using shadcn form primitives (Input, Select/RadioGroup, Textarea, Label) styled to match brand tokens, with these fields:
1. Name (required), Email (required, validated format), Phone (optional)
2. Purpose — a Select with 4 options: "Portrait Inquiry", "School Program", "Workshop Reservation", "General Question"
3. Conditional field, only shown when Purpose = "Portrait Inquiry": "Pet Name(s)" text input (optional)
4. Conditional fields, only shown when Purpose = "Workshop Reservation": "Which Workshop?" select (Seeds of Change Watercolour / Animal Portraits), "Preferred Date" date input
5. Message/Details — Textarea (required)
6. Preferred Contact Method — radio buttons: Email / Phone
7. A BrandButton submit "Send My Request" with a loading state (disabled + spinner) while submitting.

Use Framer Motion's AnimatePresence so conditional fields animate in/out smoothly (height + fade) rather than popping abruptly.

Build the /book page itself with PageHero (eyebrow "GET IN TOUCH", title "Let's Start the Conversation", subtitle script "We'd love to hear from you.", backgroundImage can reuse /assets/about/claire-bio.jpg or a neutral cream texture — your choice) followed by the BookingForm centered below it.

Do NOT wire up the actual submit handler to a real API yet — just console.log the form values on submit for now. That's the next prompt.
```

### Test Prompt 9.2
```
Visit localhost:3000/book and test: select each Purpose option and confirm the correct conditional fields appear/disappear smoothly; fill out the full form and submit; confirm the console.log shows all the correct field values including the conditional ones.
```

### Expected Result 9.2
- All conditional logic works correctly and smoothly animated.
- Form validates required fields (name, email, message) before allowing submit.
- Console log on submit shows accurate data matching what was entered.

---

## Prompt 9.3 — API route to save lead to DB

```
Read /FEATURE_SRS.md section 8 for the data model.
Do not modify files outside /src/app/api/booking/route.ts and /src/components/booking/BookingForm.tsx (only to wire the fetch call — don't change field logic).

1. Create a POST handler at /src/app/api/booking/route.ts that:
   - Validates the incoming JSON body has at minimum name, email, purpose, message.
   - Inserts a new row into the `leads` table (from Prompt 9.1) using Drizzle.
   - Returns a JSON response { success: true, leadId: <id> } on success, or { success: false, error: <message> } with an appropriate HTTP status on validation failure or DB error.
2. Update BookingForm's submit handler to POST to /api/booking with the form data as JSON, await the response, and store a local "submitted" state (success/error) instead of just console.logging.

Show me both files.
```

### Test Prompt 9.3
```
Submit the booking form again with valid data and confirm a new row appears in the leads table in Neon. Then try submitting with an empty required field and confirm the API correctly rejects it.
```

### Expected Result 9.3
- Valid submissions create a new row in `leads` with accurate data.
- Invalid/incomplete submissions are rejected with a clear error, not silently failing.
- No server errors in the terminal/logs.

---

## Prompt 9.4 — Email notifications (Resend)

```
Read /FEATURE_SRS.md section 8 (on submit: notify Claire + send confirmation to client).
Do not modify files outside /src/app/api/booking/route.ts and /src/lib/email.ts (new file).

1. Create /src/lib/email.ts exporting a small Resend client setup (reading RESEND_API_KEY from env) and two functions:
   - sendLeadNotificationToAdmin(lead): sends a plain, clean email to a placeholder admin address (e.g. process.env.ADMIN_EMAIL, add this var to .env.local.example with a comment) with the lead's details formatted in HTML matching brand colors loosely (deep-pine heading, cream background table).
   - sendConfirmationToClient(lead): sends a warm, on-brand confirmation email to the lead's own email address, thanking them for reaching out, briefly restating their purpose, and letting them know Claire's team will follow up soon. Sign-off in the brand voice.
2. Call both functions from the /api/booking POST handler AFTER the DB insert succeeds, inside a try/catch so that an email-sending failure does NOT cause the API to return an error (the lead should still be saved even if email sending fails) — log any email errors to the console instead.

Show me /src/lib/email.ts and the updated route.ts.
```

### Test Prompt 9.4
```
Submit the booking form once more with your own real email address as the lead email (and a placeholder ADMIN_EMAIL you control), and confirm you receive both the admin notification email and the client confirmation email, both readable and on-brand in tone.
```

### Expected Result 9.4
- Both emails send successfully via Resend.
- Email content is warm/on-brand for the client confirmation, clean/informational for the admin notification.
- If Resend isn't configured yet, the lead still saves to the DB and the API still returns success (graceful degradation).

---

## Prompt 9.5 — Success confirmation animation

```
Read /THEME_GUIDE.md sections 2, 3, 7 for this task.
Do not modify files outside /src/components/booking/SuccessConfirmation.tsx and BookingForm.tsx (only to swap in this component on success state).

Build a SuccessConfirmation component that replaces the form (with a smooth crossfade, not an abrupt swap) once the API call in Prompt 9.3 returns success:
1. An animated checkmark (framer-motion path-draw animation, or a simple scale+fade-in of a lucide-react CheckCircle icon in the success token color) 
2. Heading "Thank You!" (font-heading)
3. Warm message confirming their request was received and Claire's team will be in touch soon, referencing their selected purpose if helpful.
4. A small secondary link/button "Return to Homepage" → /

Wire this into BookingForm so that on successful submit, the form crossfades out and SuccessConfirmation crossfades in, in the same spot on the page (no layout jump).
```

### Test Prompt 9.5
```
Submit the booking form one final time end-to-end and confirm: the form smoothly transitions to the success confirmation with the animated checkmark, the message is warm and on-brand, and clicking "Return to Homepage" navigates correctly.
```

### Expected Result 9.5
- Full booking flow works end-to-end: form → validation → API → DB insert → emails sent → smooth success animation.
- No layout jump during the form-to-success transition.

---

✅ **Group 9 complete.** Move to `/prompts/10-admin-dashboard.md`.
