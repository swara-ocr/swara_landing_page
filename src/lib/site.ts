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

// Public social media pages for the project.
export const SOCIAL = [
  { name: 'Instagram', url: 'https://www.instagram.com/teamswara.reads' },
  { name: 'Facebook', url: 'https://www.facebook.com/share/195AGcZZMM/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/swara-reads/' },
];

export const TEAM = [
  { name: 'Pasindu Heshan Kavinda', role: 'Product Owner / Developer', initial: 'P' },
  { name: 'Nethuli Sellahewa', role: 'Developer, UI / UX and Testing', initial: 'N' },
  { name: 'Thimithri Vidanapathirana', role: 'Scrum Master / Developer', initial: 'T' },
  { name: 'Vaitheesvaran Agastigan', role: 'Developer, OCR', initial: 'V' },
  { name: 'Zayan Ahamed', role: 'Developer, TTS and Hardware', initial: 'Z' },
];
