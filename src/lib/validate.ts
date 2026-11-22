export const INTERESTS = ['station', 'laptop', 'phone'] as const;
export type Interest = (typeof INTERESTS)[number];

export const CONTACT_KINDS = ['general', 'testing', 'school'] as const;
export type ContactKind = (typeof CONTACT_KINDS)[number];

/** Trim, strip control characters and cap the length of a user-supplied string. */
export function cleanText(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
}

export function isEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
