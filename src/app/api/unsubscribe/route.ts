import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { emailEnabled } from '@/lib/email';

export const runtime = 'nodejs';

// Unsubscribing is a POST from the confirmation page, so email scanners that
// open links in a message cannot unsubscribe someone by accident.
export async function POST(req: Request) {
  // There are no unsubscribe links while email is off.
  if (!emailEnabled()) return new NextResponse('Not found', { status: 404 });
  const form = await req.formData();
  const token = String(form.get('token') ?? '');
  if (token) {
    try {
      await db.waitlistSignup.updateMany({
        where: { unsubscribeToken: token, unsubscribedAt: null },
        data: { unsubscribedAt: new Date() },
      });
    } catch (error) {
      console.error('[unsubscribe] failed:', error);
    }
  }
  return NextResponse.redirect(new URL('/unsubscribe/done', req.url), 303);
}
