/**
 * Simple logo icons for the social links. They are decorative (hidden from screen readers): the link
 * that contains one carries the accessible name, for example "SWAARA on Instagram (opens in a new tab)".
 */
const ICONS: Record<string, { viewBox: string; body: React.ReactNode }> = {
  GitHub: {
    viewBox: '0 0 16 16',
    body: (
      <path
        fill="currentColor"
        d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
      />
    ),
  },
  Instagram: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
      </>
    ),
  },
  Facebook: {
    viewBox: '0 0 24 24',
    body: (
      <path
        fill="currentColor"
        d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.7V13h2.7v8h3.1z"
      />
    ),
  },
  LinkedIn: {
    viewBox: '0 0 24 24',
    body: (
      <path
        fill="currentColor"
        d="M4.5 9h3.7v11.5H4.5zM6.3 3.3a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2zM10.4 9h3.5v1.6h.05c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6v6.2h-3.7v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.6h-3.7z"
      />
    ),
  },
};

export function hasSocialIcon(name: string): boolean {
  return name in ICONS;
}

export default function SocialIcon({ name, size = 26 }: { name: string; size?: number }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={icon.viewBox} width={size} height={size} aria-hidden="true" focusable="false">
      {icon.body}
    </svg>
  );
}
