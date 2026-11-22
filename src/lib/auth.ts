import { cookies } from 'next/headers';
import crypto from 'node:crypto';

export const ADMIN_COOKIE = 'swaara_admin';
const SESSION_HOURS = 12;

// The team admin password. It lives here on purpose, so the admin page works with no setup.
// To change it, edit this line and push. (Anyone who can read this repository can read it.)
const ADMIN_PASSWORD = 'Swara@123';

// Signs the login cookie. If ADMIN_SECRET is set in the environment it is used (better, because it
// is not in the code); otherwise a built-in value is used so the login still works.
function secret(): string {
  const fromEnv = process.env.ADMIN_SECRET || '';
  return fromEnv.length >= 16 ? fromEnv : `swaara-admin-session-${ADMIN_PASSWORD}`;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', secret()).update(payload).digest('hex');
}

export function checkPassword(input: string): boolean {
  const a = crypto.createHash('sha256').update(input).digest();
  const b = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest();
  return crypto.timingSafeEqual(a, b);
}

export function makeToken(): string {
  const expires = String(Date.now() + SESSION_HOURS * 3600 * 1000);
  return `${expires}.${sign(expires)}`;
}

export function verifyToken(token?: string | null): boolean {
  if (!token) return false;
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
