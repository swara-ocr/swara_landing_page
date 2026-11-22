import nodemailer from 'nodemailer';
import { SITE } from './site';
import { languageLabel, roleLabel } from './validate';

type Mail = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

type SendResult = { ok: boolean; skipped?: boolean; error?: string };

let transporter: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter | null {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return transporter;
}

/**
 * Email is off unless EMAIL_ENABLED is exactly "true". With it off, nothing is sent and no
 * network call is made. All the email code and templates below stay in place, so switching it
 * on later only needs EMAIL_ENABLED=true and the SMTP_* variables.
 */
export function emailEnabled(): boolean {
  return process.env.EMAIL_ENABLED === 'true';
}

/** Sends one email. Never throws: a mail problem must not break a form submission. */
export async function sendMail(mail: Mail): Promise<SendResult> {
  if (!emailEnabled()) return { ok: false, skipped: true };
  const transport = getTransport();
  if (!transport) return { ok: false, skipped: true };
  try {
    await transport.sendMail({
      from: process.env.MAIL_FROM || `SWAARA <${process.env.SMTP_USER}>`,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      replyTo: mail.replyTo,
    });
    return { ok: true };
  } catch (error) {
    console.error('[email] sending failed:', error);
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export function teamAddress(): string {
  return process.env.TEAM_EMAIL || SITE.teamEmail;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function shell(title: string, bodyHtml: string, footerHtml = ''): string {
  return `<!doctype html><html lang="en"><body style="margin:0;padding:24px;background:#F3F7FB;font-family:Arial,Helvetica,sans-serif;color:#0A1B2C;font-size:17px;line-height:1.6">
<div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #C3D2E2;border-radius:14px;padding:28px">
<p style="margin:0 0 16px;font-weight:700;font-size:20px;letter-spacing:.04em">SWAARA</p>
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.25">${esc(title)}</h1>
${bodyHtml}
${footerHtml ? `<p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #C3D2E2;font-size:14px;color:#435A70">${footerHtml}</p>` : ''}
</div></body></html>`;
}

const INTEREST_LABELS: Record<string, string> = {
  station: 'Tabletop station',
  laptop: 'Laptop reader',
  phone: 'Phone app',
};

export function interestLabel(key: string): string {
  return INTEREST_LABELS[key] ?? key;
}

/** Sent to the person who joined the waitlist. */
export function waitlistConfirmation(token: string): Pick<Mail, 'subject' | 'text' | 'html'> {
  const unsubscribe = `${SITE.url}/unsubscribe/${token}`;
  const subject = 'You are on the SWAARA waitlist';
  const text = [
    'Thank you for joining the SWAARA waitlist.',
    '',
    'SWAARA is a reading assistant for blind and low-vision people. It reads printed pages aloud in Sinhala and English. It is still in development, so there is nothing to download yet.',
    '',
    'We will email you only about SWAARA progress and testing. Your address is used for nothing else, and testing with users starts only after ethics approval.',
    '',
    `You can read what we are building at ${SITE.url}/docs`,
    `Questions? Reply to this email or write to ${teamAddress()}.`,
    '',
    `To stop these emails at any time: ${unsubscribe}`,
    '',
    'The SWAARA team',
  ].join('\n');
  const html = shell(
    'You are on the SWAARA waitlist',
    `<p style="margin:0 0 14px">Thank you for joining.</p>
<p style="margin:0 0 14px">SWAARA is a reading assistant for blind and low-vision people. It reads printed pages aloud in Sinhala and English. It is still in development, so there is nothing to download yet.</p>
<p style="margin:0 0 14px">We will email you only about SWAARA progress and testing. Your address is used for nothing else, and testing with users starts only after ethics approval.</p>
<p style="margin:0 0 14px">Read what we are building: <a href="${SITE.url}/docs">${SITE.url}/docs</a></p>
<p style="margin:0">Questions? Reply to this email or write to <a href="mailto:${esc(teamAddress())}">${esc(teamAddress())}</a>.</p>`,
    `You can stop these emails at any time: <a href="${unsubscribe}">unsubscribe</a>.`,
  );
  return { subject, text, html };
}

/** Sent to the team when someone joins the waitlist. */
export function teamWaitlistNotice(input: {
  email: string;
  role: string;
  interests: string[];
  language: string;
  total: number;
}): Pick<Mail, 'subject' | 'text' | 'html'> {
  const interests = input.interests.length ? input.interests.map(interestLabel).join(', ') : 'not chosen';
  const language = languageLabel(input.language);
  const subject = `New SWAARA waitlist signup (${input.total} total)`;
  const text = [
    `Email: ${input.email}`,
    `I am a: ${roleLabel(input.role)}`,
    `Interested in: ${interests}`,
    `Language for updates: ${language}`,
    `People on the waitlist now: ${input.total}`,
  ].join('\n');
  const html = shell(
    'New waitlist signup',
    `<p style="margin:0 0 6px"><strong>Email:</strong> ${esc(input.email)}</p>
<p style="margin:0 0 6px"><strong>I am a:</strong> ${esc(roleLabel(input.role))}</p>
<p style="margin:0 0 6px"><strong>Interested in:</strong> ${esc(interests)}</p>
<p style="margin:0 0 6px"><strong>Language for updates:</strong> ${language}</p>
<p style="margin:0"><strong>On the waitlist now:</strong> ${input.total}</p>`,
  );
  return { subject, text, html };
}

/** Sent to the team when the contact form is used. Reply goes to the sender. */
export function teamContactNotice(input: {
  name: string;
  email: string;
  organisation: string;
  kind: string;
  message: string;
}): Pick<Mail, 'subject' | 'text' | 'html'> {
  const kindLabel =
    input.kind === 'testing' ? 'Help test SWAARA' : input.kind === 'school' ? 'School or organisation' : 'General question';
  const subject = `SWAARA website message: ${kindLabel} from ${input.name}`;
  const text = [
    `Type: ${kindLabel}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Organisation: ${input.organisation || '-'}`,
    '',
    input.message,
  ].join('\n');
  const html = shell(
    'New website message',
    `<p style="margin:0 0 6px"><strong>Type:</strong> ${esc(kindLabel)}</p>
<p style="margin:0 0 6px"><strong>Name:</strong> ${esc(input.name)}</p>
<p style="margin:0 0 6px"><strong>Email:</strong> ${esc(input.email)}</p>
<p style="margin:0 0 14px"><strong>Organisation:</strong> ${esc(input.organisation || '-')}</p>
<p style="margin:0;white-space:pre-wrap">${esc(input.message)}</p>`,
  );
  return { subject, text, html };
}

/** Sent to the person who used the contact form. */
export function contactAcknowledgement(name: string): Pick<Mail, 'subject' | 'text' | 'html'> {
  const subject = 'We received your message to SWAARA';
  const text = [
    `Hello ${name},`,
    '',
    'Thank you for writing to the SWAARA team. We have received your message and will reply by email.',
    '',
    'Testing with blind and low-vision users starts only after ethics approval, so we may not be able to start straight away.',
    '',
    'The SWAARA team',
  ].join('\n');
  const html = shell(
    'We received your message',
    `<p style="margin:0 0 14px">Hello ${esc(name)},</p>
<p style="margin:0 0 14px">Thank you for writing to the SWAARA team. We have received your message and will reply by email.</p>
<p style="margin:0">Testing with blind and low-vision users starts only after ethics approval, so we may not be able to start straight away.</p>`,
  );
  return { subject, text, html };
}
