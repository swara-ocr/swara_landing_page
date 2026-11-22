import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cleanText, isEmail, CONTACT_KINDS } from '@/lib/validate';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { contactAcknowledgement, sendMail, teamAddress, teamContactNotice } from '@/lib/email';

export const runtime = 'nodejs';

const SUCCESS = {
  ok: true,
  message: 'Thank you. We have received your message and will reply by email.',
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

  if (cleanText(body.website, 100)) return NextResponse.json(SUCCESS);

  if (!rateLimit(`contact:${clientIp(req)}`, 4)) {
    return fail('Too many attempts. Please wait a few minutes and try again.', 429);
  }

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 254).toLowerCase();
  const organisation = cleanText(body.organisation, 160);
  const message = cleanText(body.message, 4000);
  const kind = (CONTACT_KINDS as readonly string[]).includes(String(body.kind)) ? String(body.kind) : 'general';

  if (!name) return fail('Enter your name.', 400);
  if (!isEmail(email)) return fail('Enter a valid email address, such as name@example.com.', 400);
  if (message.length < 10) return fail('Write a short message, at least a sentence.', 400);
  if (body.consent !== true) return fail('Tick the box to agree that we may reply to you by email.', 400);

  try {
    await db.contactMessage.create({
      data: { name, email, organisation: organisation || null, kind, message, consent: true },
    });

    await Promise.all([
      sendMail({
        to: teamAddress(),
        replyTo: email,
        ...teamContactNotice({ name, email, organisation, kind, message }),
      }),
      sendMail({ to: email, replyTo: teamAddress(), ...contactAcknowledgement(name) }),
    ]);

    return NextResponse.json(SUCCESS);
  } catch (error) {
    console.error('[contact] failed:', error);
    return fail('We could not send your message right now. Please write to us by email instead.', 500);
  }
}
