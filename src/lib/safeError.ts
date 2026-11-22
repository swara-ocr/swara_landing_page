/**
 * Turns any thrown value into something safe to write to the server log: an error code and the
 * one-line cause. Prisma error messages include the data of the failed query (which holds the
 * visitor's email address), so only the last line is kept and anything shaped like an email address
 * or a connection URL is replaced. No secrets and no personal details reach the log.
 */
export function safeError(error: unknown): { code: string; message: string } {
  const e = error as { code?: unknown; name?: unknown; message?: unknown } | null;
  const code = typeof e?.code === 'string' ? e.code : typeof e?.name === 'string' ? e.name : 'unknown';
  const raw = typeof e?.message === 'string' ? e.message : String(error);
  const lines = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const message = (lines[lines.length - 1] ?? '')
    .replace(/[^\s@'"`]+@[^\s@'"`]+/g, '[email]')
    .replace(/\b[a-z][a-z0-9+.-]*:\/\/\S+/gi, '[url]')
    .slice(0, 300);
  return { code, message };
}
