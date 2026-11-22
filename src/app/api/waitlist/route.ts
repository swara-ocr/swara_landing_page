import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cleanText, isEmail, INTERESTS } from '@/lib/validate';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { sendMail, teamAddress, teamWaitlistNotice, waitlistConfirmation } from '@/lib/email';

export const runtime = 'nodejs';

const SUCCESS = {
  ok: true,
  message: 'You are on the list. We have sent a confirmation to your email. If it does not arrive, check your spam folder.',
};

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail('Something went wrong with the form. Please reload the page and try again.', 400);
  }

  // Honeypot: real people never fill this hidden field.
  if (cleanText(body.website, 100)) return NextResponse.json(SUCCESS);

  if (!rateLimit(`waitlist:${clientIp(req)}`)) {
    return fail('Too many attempts. Please wait a few minutes and try again.', 429);
  }

  const email = cleanText(body.email, 254).toLowerCase();
  if (!isEmail(email)) return fail('Enter a valid email address, such as name@example.com.', 400);
  if (body.consent !== true) return fail('Tick the box to agree to receive SWAARA updates.', 400);

  const interests = Array.isArray(body.interests)
    ? Array.from(new Set(body.interests.filter((i): i is string => typeof i === 'string' && (INTERESTS as readonly string[]).includes(i))))
    : [];
  const language = body.language === 'si' ? 'si' : 'en';

  try {
    const existing = await db.waitlistSignup.findUnique({ where: { email } });

    if (existing) {
      // Same answer either way, so the form cannot be used to find out who is on the list.
      if (existing.unsubscribedAt) {
        await db.waitlistSignup.update({
          where: { email },
          data: { unsubscribedAt: null, interests, language, consent: true, consentAt: new Date() },
        });
      }
      return NextResponse.json(SUCCESS);
    }

    const created = await db.waitlistSignup.create({
      data: { email, interests, language, consent: true, consentAt: new Date() },
    });

    const total = await db.waitlistSignup.count({ where: { unsubscribedAt: null } });

    const confirmation = waitlistConfirmation(created.unsubscribeToken);
    const [sent] = await Promise.all([
      sendMail({ to: email, ...confirmation, replyTo: teamAddress() }),
      sendMail({ to: teamAddress(), ...teamWaitlistNotice({ email, interests, language, total }) }),
    ]);
    if (sent.ok) {
      await db.waitlistSignup.update({ where: { id: created.id }, data: { confirmationSentAt: new Date() } });
    }

    return NextResponse.json(SUCCESS);
  } catch (error) {
    console.error('[waitlist] failed:', error);
    return fail('We could not save your sign-up right now. Please try again later, or write to us by email.', 500);
  }
}
