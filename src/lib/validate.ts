export const INTERESTS = ['station', 'laptop', 'phone'] as const;
export type Interest = (typeof INTERESTS)[number];

// "I am a..." choices on the waitlist form.
export const ROLES = [
  { id: 'student', label: 'Student' },
  { id: 'low-vision', label: 'Adult with low vision or blindness' },
  { id: 'teacher', label: 'Teacher or school for the blind' },
  { id: 'family', label: 'Family member or carer' },
  { id: 'organisation', label: 'Organisation' },
  { id: 'other', label: 'Other' },
] as const;
export type Role = (typeof ROLES)[number]['id'];

export function roleLabel(id: string): string {
  return ROLES.find((r) => r.id === id)?.label ?? id;
}

// Preferred language for project contact.
export const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'si', label: 'Sinhala' },
  { id: 'both', label: 'Both' },
] as const;

export function languageLabel(id: string): string {
  return LANGUAGES.find((l) => l.id === id)?.label ?? 'English';
}

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
