/**
 * POST /api/booking — booking form submission handler.
 *
 * 1. Validates required fields (name, email format, purpose, message).
 * 2. Inserts a new row into the `leads` table via Drizzle ORM.
 * 3. Fires admin notification + client confirmation emails via Nodemailer.
 *    Email failures are caught and logged — they do NOT fail the response.
 *    The lead is always saved even if email sending fails.
 *
 * Returns:
 *   200  { success: true,  leadId: number }
 *   400  { success: false, error: string }   — validation failure
 *   500  { success: false, error: string }   — DB or unexpected error
 */

import { NextRequest, NextResponse } from 'next/server';
import { db }    from '@/db';
import { leads } from '@/db/schema';
import {
  sendLeadNotificationToAdmin,
  sendConfirmationToClient,
} from '@/lib/email';

/* ── Valid purpose values ────────────────────────────────────────────────── */

const VALID_PURPOSES = new Set([
  'portrait-inquiry',
  'school-program',
  'workshop-reservation',
  'general-question',
]);

/* ── Email regex (mirrors client-side validation) ───────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Handler ─────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {

  /* ── 1. Parse body ───────────────────────────────────────────────────── */
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  /* ── 2. Validate required fields ─────────────────────────────────────── */

  const name    = typeof body.name    === 'string' ? body.name.trim()    : '';
  const email   = typeof body.email   === 'string' ? body.email.trim()   : '';
  const purpose = typeof body.purpose === 'string' ? body.purpose.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name)
    return NextResponse.json(
      { success: false, error: 'Name is required.' }, { status: 400 });

  if (!email)
    return NextResponse.json(
      { success: false, error: 'Email is required.' }, { status: 400 });

  if (!EMAIL_RE.test(email))
    return NextResponse.json(
      { success: false, error: 'A valid email address is required.' }, { status: 400 });

  if (!VALID_PURPOSES.has(purpose))
    return NextResponse.json(
      { success: false, error: 'A valid purpose is required.' }, { status: 400 });

  if (!message)
    return NextResponse.json(
      { success: false, error: 'Message is required.' }, { status: 400 });

  /* ── 3. Extract optional / conditional fields ─────────────────────────── */

  const phone                  = typeof body.phone === 'string'
    ? body.phone.trim() || null : null;
  const preferredContactMethod = typeof body.preferredContactMethod === 'string'
    ? body.preferredContactMethod : 'email';

  /* Conditional fields — only relevant for their matching purpose */
  const petNames = purpose === 'portrait-inquiry' && typeof body.petNames === 'string'
    ? body.petNames.trim() || null : null;
  const workshopType = purpose === 'workshop-reservation' && typeof body.workshopType === 'string'
    ? body.workshopType.trim() || null : null;
  const preferredDate = purpose === 'workshop-reservation' && typeof body.preferredDate === 'string'
    ? body.preferredDate.trim() || null : null;

  /* ── 4. Insert into Neon via Drizzle ─────────────────────────────────── */

  let lead: typeof leads.$inferSelect;

  try {
    const [inserted] = await db
      .insert(leads)
      .values({
        name,
        email:                  email.toLowerCase(),
        phone,
        purpose,
        message,
        petNames,
        workshopType,
        preferredDate,
        preferredContactMethod,
        status: 'new',
      })
      .returning();

    lead = inserted;
  } catch (err) {
    console.error('[api/booking] DB insert failed:', err);
    return NextResponse.json(
      { success: false, error: 'Could not save your enquiry. Please try again.' },
      { status: 500 },
    );
  }

  /* ── 5. Send emails — fire-and-forget, never fail the response ────────── */

  const emailData = {
    id:                     lead.id,
    name:                   lead.name,
    email:                  lead.email,
    phone:                  lead.phone,
    purpose:                lead.purpose,
    message:                lead.message,
    petNames:               lead.petNames,
    workshopType:           lead.workshopType,
    preferredDate:          lead.preferredDate,
    preferredContactMethod: lead.preferredContactMethod,
  };

  sendLeadNotificationToAdmin(emailData).catch((err) =>
    console.error('[api/booking] Admin email failed:', err),
  );

  sendConfirmationToClient(emailData).catch((err) =>
    console.error('[api/booking] Client confirmation email failed:', err),
  );

  /* ── 6. Success ───────────────────────────────────────────────────────── */

  return NextResponse.json({ success: true, leadId: lead.id });
}
