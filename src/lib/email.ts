/**
 * email.ts — Nodemailer helper for booking form notifications.
 *
 * Uses SMTP credentials from environment variables (see .env.local.example).
 * Both send functions are designed to be called fire-and-forget inside a
 * try/catch — email failure must NOT prevent the lead from being saved.
 *
 * Env vars required (see .env.local.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS — SMTP server credentials
 *   EMAIL_FROM  — "from" address shown to recipients
 *   EMAIL_TO    — Claire's inbox for admin notifications
 */

import nodemailer from 'nodemailer';

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface LeadEmailData {
  id:                     number;
  name:                   string;
  email:                  string;
  phone?:                 string | null;
  purpose:                string;
  message?:               string | null;
  petNames?:              string | null;
  workshopType?:          string | null;
  preferredDate?:         string | null;
  preferredContactMethod?: string | null;
}

/* ── Purpose display labels ──────────────────────────────────────────────── */

const PURPOSE_LABELS: Record<string, string> = {
  'portrait-inquiry':      'Portrait Inquiry',
  'school-program':        'School Program',
  'workshop-reservation':  'Workshop Reservation',
  'general-question':      'General Question',
};

const WORKSHOP_LABELS: Record<string, string> = {
  'seeds-of-change':  'Seeds of Change — Watercolour',
  'animal-portraits': 'Animal Portraits Workshop',
};

/* ── Transporter ─────────────────────────────────────────────────────────── */

function createTransporter() {
  const port = parseInt(process.env.SMTP_PORT ?? '587', 10);
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port,
    secure: port === 465,   // true for SSL; false for STARTTLS (587)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/** Returns false if any required SMTP env var is missing. */
function isEmailConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.EMAIL_FROM
  );
}

/* ── Shared HTML helpers ─────────────────────────────────────────────────── */

function row(label: string, value: string | null | undefined) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#5C5C54;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;color:#2B2B26;">${value}</td>
    </tr>`;
}

/* ── Admin notification email ────────────────────────────────────────────── */

/**
 * Sends a plain, structured notification to Claire's inbox with all lead
 * details formatted as an HTML table. Called after a successful DB insert.
 */
export async function sendLeadNotificationToAdmin(lead: LeadEmailData): Promise<void> {
  if (!isEmailConfigured()) {
    console.warn('[email] SMTP not configured — skipping admin notification.');
    return;
  }

  const purposeLabel   = PURPOSE_LABELS[lead.purpose] ?? lead.purpose;
  const workshopLabel  = lead.workshopType ? (WORKSHOP_LABELS[lead.workshopType] ?? lead.workshopType) : null;
  const adminEmail     = process.env.EMAIL_TO ?? process.env.SMTP_USER!;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F3EC;font-family:Georgia,'Times New Roman',serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(51,75,58,0.08);">

    <!-- Header -->
    <div style="background:#334B3A;padding:28px 32px;">
      <p style="margin:0;color:#8D9C7A;font-family:Montserrat,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">HABibi by Claire Olivier</p>
      <h1 style="margin:8px 0 0;color:#F7F3EC;font-size:22px;font-weight:500;">New Booking Enquiry</h1>
    </div>

    <!-- Lead ID pill -->
    <div style="padding:16px 32px 0;">
      <span style="display:inline-block;background:#E7DCC8;color:#5E6F52;font-family:Montserrat,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;padding:4px 12px;border-radius:999px;">
        Lead #${lead.id} · ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </span>
    </div>

    <!-- Details table -->
    <div style="padding:20px 32px 32px;">
      <table style="width:100%;border-collapse:collapse;border:1px solid #E2D9C8;border-radius:8px;overflow:hidden;">
        <tbody>
          ${row('Name',        lead.name)}
          ${row('Email',       `<a href="mailto:${lead.email}" style="color:#334B3A;">${lead.email}</a>`)}
          ${row('Phone',       lead.phone)}
          ${row('Purpose',     purposeLabel)}
          ${row('Workshop',    workshopLabel)}
          ${row('Pet Name(s)', lead.petNames)}
          ${row('Preferred Date', lead.preferredDate)}
          ${row('Contact Via', lead.preferredContactMethod)}
        </tbody>
      </table>

      <!-- Message block -->
      ${lead.message ? `
      <div style="margin-top:20px;padding:16px;background:#F7F3EC;border-radius:8px;border-left:3px solid #C9A35A;">
        <p style="margin:0 0 6px;font-family:Montserrat,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#5C5C54;">Message</p>
        <p style="margin:0;color:#2B2B26;line-height:1.65;">${lead.message.replace(/\n/g, '<br>')}</p>
      </div>` : ''}

      <p style="margin:24px 0 0;font-family:Montserrat,sans-serif;font-size:12px;color:#5C5C54;">
        Reply directly to this email to respond to ${lead.name}.
      </p>
    </div>

  </div>
</body>
</html>`;

  await createTransporter().sendMail({
    from:        process.env.EMAIL_FROM,
    to:          adminEmail,
    replyTo:     lead.email,
    subject:     `New Enquiry: ${purposeLabel} — ${lead.name}`,
    html,
    text: [
      `New Booking Enquiry — HABibi`,
      `Lead #${lead.id}`,
      ``,
      `Name:    ${lead.name}`,
      `Email:   ${lead.email}`,
      `Phone:   ${lead.phone ?? '—'}`,
      `Purpose: ${purposeLabel}`,
      lead.workshopType  ? `Workshop: ${workshopLabel}`          : '',
      lead.petNames      ? `Pet Name(s): ${lead.petNames}`       : '',
      lead.preferredDate ? `Preferred Date: ${lead.preferredDate}` : '',
      `Contact via: ${lead.preferredContactMethod ?? 'email'}`,
      ``,
      `Message:`,
      lead.message ?? '—',
    ].filter(Boolean).join('\n'),
  });
}

/* ── Client confirmation email ───────────────────────────────────────────── */

/**
 * Sends a warm, on-brand confirmation to the visitor who submitted the form.
 * Tone: personal, reassuring — matches HABibi brand voice (THEME_GUIDE §9).
 */
export async function sendConfirmationToClient(lead: LeadEmailData): Promise<void> {
  if (!isEmailConfigured()) {
    console.warn('[email] SMTP not configured — skipping client confirmation.');
    return;
  }

  const firstName    = lead.name.split(' ')[0];
  const purposeLabel = PURPOSE_LABELS[lead.purpose] ?? lead.purpose;

  const purposeContext: Record<string, string> = {
    'portrait-inquiry':     'a portrait of your beloved companion',
    'school-program':       'an inclusive education programme for your school',
    'workshop-reservation': 'a workshop reservation',
    'general-question':     'a general question',
  };
  const context = purposeContext[lead.purpose] ?? 'your enquiry';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F3EC;font-family:Georgia,'Times New Roman',serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(51,75,58,0.08);">

    <!-- Header -->
    <div style="background:#334B3A;padding:28px 32px;">
      <p style="margin:0;color:#8D9C7A;font-family:Montserrat,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">HABibi by Claire Olivier</p>
      <h1 style="margin:8px 0 0;color:#F7F3EC;font-size:24px;font-weight:500;">Thank you, ${firstName}</h1>
    </div>

    <!-- Body -->
    <div style="padding:32px;">

      <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#2B2B26;">
        Your enquiry about <strong>${context}</strong> has been safely received. I'm so glad you reached out.
      </p>

      <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#2B2B26;">
        Claire or a member of her team will be in touch within <strong>1–2 business days</strong> to follow up personally. In the meantime, feel free to browse the HABibi website for more information about our programmes, workshops, and portfolio.
      </p>

      <!-- Gold hairline -->
      <div style="margin:28px 0;height:1px;background:#C9A35A;opacity:0.5;"></div>

      <!-- Sign-off -->
      <p style="margin:0 0 6px;font-size:16px;line-height:1.6;color:#2B2B26;">With warmth,</p>
      <p style="margin:0;font-size:20px;color:#B37352;font-style:italic;">Claire Olivier</p>
      <p style="margin:4px 0 0;font-family:Montserrat,sans-serif;font-size:11px;letter-spacing:0.12em;color:#5C5C54;text-transform:uppercase;">
        Art · Animals · Well-being · Doha, Qatar
      </p>

    </div>

    <!-- Footer -->
    <div style="padding:16px 32px;background:#E7DCC8;">
      <p style="margin:0;font-family:Montserrat,sans-serif;font-size:11px;color:#5C5C54;line-height:1.6;">
        You're receiving this because you submitted an enquiry via habibi.com.<br>
        Purpose recorded: <strong>${purposeLabel}</strong>
      </p>
    </div>

  </div>
</body>
</html>`;

  await createTransporter().sendMail({
    from:    process.env.EMAIL_FROM,
    to:      `${lead.name} <${lead.email}>`,
    subject: `We've received your enquiry — HABibi by Claire Olivier`,
    html,
    text: [
      `Thank you, ${firstName}!`,
      ``,
      `Your enquiry about ${context} has been received.`,
      `Claire or her team will be in touch within 1–2 business days.`,
      ``,
      `With warmth,`,
      `Claire Olivier`,
      `Art · Animals · Well-being · Doha, Qatar`,
    ].join('\n'),
  });
}
