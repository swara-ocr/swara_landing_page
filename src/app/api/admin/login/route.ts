import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, SESSION_SECONDS, adminConfigured, checkPassword, makeToken } from '@/lib/auth';
import { clientIp, rateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const back = (error: string) => NextResponse.redirect(new URL(`/admin/login?error=${error}`, req.url), 303);

  if (!adminConfigured()) return back('setup');
  if (!rateLimit(`admin:${clientIp(req)}`, 8, 15 * 60 * 1000)) return back('many');

  const form = await req.formData();
  const password = String(form.get('password') ?? '');
  if (!checkPassword(password)) return back('wrong');

  const res = NextResponse.redirect(new URL('/admin', req.url), 303);
  res.cookies.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_SECONDS,
  });
  return res;
}
