import { cookies } from 'next/headers';
import crypto from 'node:crypto';

export const ADMIN_COOKIE = 'swaara_admin';
const SESSION_HOURS = 12;

function secret(): string {
  return process.env.ADMIN_SECRET || '';
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', secret()).update(payload).digest('hex');
}

/** The admin page is disabled until both ADMIN_PASSWORD and a long ADMIN_SECRET are set. */
export function adminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD && secret().length >= 16;
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return false;
  const a = crypto.createHash('sha256').update(input).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export function makeToken(): string {
  const expires = String(Date.now() + SESSION_HOURS * 3600 * 1000);
  return `${expires}.${sign(expires)}`;
}

export function verifyToken(token?: string | null): boolean {
  if (!token || !adminConfigured()) return false;
  const [expires, signature] = token.split('.');
  if (!expires || !signature) return false;
  const a = Buffer.from(signature);
  const b = Buffer.from(sign(expires));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  return Number(expires) > Date.now();
}

/** For server components and server pages. */
export function isAdmin(): boolean {
  return verifyToken(cookies().get(ADMIN_COOKIE)?.value);
}

export const SESSION_SECONDS = SESSION_HOURS * 3600;
