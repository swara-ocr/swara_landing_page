import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

// Unsubscribing is a POST from the confirmation page, so email scanners that
// open links in a message cannot unsubscribe someone by accident.
export async function POST(req: Request) {
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
