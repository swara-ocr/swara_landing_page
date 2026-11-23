import { db } from '@/lib/db';

/**
 * How many people are on the waitlist (everyone who has joined and not been removed or unsubscribed).
 * Returns null if the database cannot be reached, so the page simply leaves the number out.
 */
export async function getWaitingCount(): Promise<number | null> {
  try {
    return await db.waitlistSignup.count({ where: { unsubscribedAt: null } });
  } catch {
    return null;
  }
}

/** The sentence shown on the landing page. Nothing is shown until at least one person has joined. */
export function waitingText(count: number | null): string {
  if (!count || count < 1) return '';
  const n = count.toLocaleString('en-GB');
  return count === 1 ? `${n} person is waiting for SWAARA` : `${n} people are waiting for SWAARA`;
}
