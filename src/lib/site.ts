const FALLBACK_URL = 'https://www.swaara.lk';

/**
 * The public address of the site, read in this one place. A missing, empty or malformed
 * NEXT_PUBLIC_SITE_URL (for example "swaara.lk" with no https://) falls back to the real address,
 * so the sitemap, robots file, metadata and email links never see undefined or an invalid URL.
 */
function siteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? '').trim();
  if (!raw) return FALLBACK_URL;
  try {
    const parsed = new URL(raw);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.origin : FALLBACK_URL;
  } catch {
    return FALLBACK_URL;
  }
}

export const SITE = {
  name: 'SWAARA',
  tagline: 'Put a page down. Hear it read.',
  description:
    'SWAARA is a reading assistant for blind and low-vision people. It reads printed pages aloud in Sinhala and English, using a fixed plate so nobody has to aim a camera.',
  url: siteUrl(),
  teamEmail: 'teamswara.reads@gmail.com',
  // Fill these in when the public GitHub repository for the project is ready.
  githubUrl: 'https://github.com/swara-ocr',
};

export const TEAM = [
  { name: 'Pasindu Heshan Kavinda', role: '[ROLE]', initial: 'P' },
  { name: 'Nethuli Sellahewa', role: '[ROLE]', initial: 'N' },
  { name: 'Thimithri Vidanapathirana', role: '[ROLE]', initial: 'T' },
  { name: 'Vaitheesvaran Agastigan', role: '[ROLE]', initial: 'V' },
  { name: 'Zayan Ashamed', role: '[ROLE]', initial: 'Z' },
];
