/**
 * The public address of the site, read in this one place. No domain is written into the code.
 *
 *  1. NEXT_PUBLIC_SITE_URL, when it is a valid http(s) address. Set it once the real domain is
 *     connected (see "Connecting swaara.lk" in the README).
 *  2. Otherwise the address Vercel gives this deployment, so the site works on the Vercel address
 *     with no setup at all.
 *  3. Otherwise http://localhost:3000, for local work.
 *
 * A missing, empty or malformed value (for example "swaara.lk" with no https://) is skipped, so the
 * sitemap, robots file, metadata and canonical links never see undefined or an invalid URL.
 */
function siteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  ];
  for (const candidate of candidates) {
    const raw = (candidate ?? '').trim();
    if (!raw) continue;
    try {
      const parsed = new URL(raw);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') return parsed.origin;
    } catch {
      /* not a valid address: try the next one */
    }
  }
  return 'http://localhost:3000';
}

const url = siteUrl();

export const SITE = {
  name: 'SWAARA',
  tagline: 'Put a page down. Hear it read.',
  description:
    'SWAARA is a reading assistant for blind and low-vision people. It reads printed pages aloud in Sinhala and English, using a fixed plate so nobody has to aim a camera.',
  url,
  /** The address without https://, for showing in the footer. It follows whichever domain is live. */
  host: new URL(url).host,
  teamEmail: 'teamswara.reads@gmail.com',
};

/**
 * Public pages for the project. Only entries with a non-empty `url` are shown on the site, so an
 * account that does not exist yet can be left as '' and will simply not appear.
 */
export const SOCIALS: { name: string; url: string }[] = [
  { name: 'GitHub', url: 'https://github.com/swara-ocr' },
  { name: 'Instagram', url: 'https://www.instagram.com/teamswaara.reads' },
  { name: 'Facebook', url: 'https://www.facebook.com/share/195AGcZZMM/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/swara-reads/' },
];

export function activeSocials() {
  return SOCIALS.filter((s) => s.url.trim() !== '');
}

/** What a team member's role is set to until the real role is known. It is never shown on the live site. */
export const PLACEHOLDER_ROLE = '[ROLE]';

/**
 * The team. `role` is required for every member and must be their real role: do not invent one.
 * `photo` is optional: a file in /public/team (for example '/team/nethuli.jpg'). Without it the card
 * shows the person's initial in a circle.
 */
export const TEAM: { name: string; role: string; initial: string; photo?: string }[] = [
  { name: 'Pasindu Heshan Kavinda', role: 'Product Owner / Developer', initial: 'P', photo: '/team/pasindu.jpg' },
  { name: 'Nethuli Sellahewa', role: 'Developer, UI / UX and Testing', initial: 'N', photo: '/team/nethuli.jpg' },
  { name: 'Thimithri Vidanapathirana', role: 'Scrum Master / Developer', initial: 'T', photo: '/team/thimithri.jpg' },
  { name: 'Vaitheesvaran Agastigan', role: 'Developer, OCR', initial: 'V', photo: '/team/vaitheesvaran.jpg' },
  { name: 'Zayan Ahamed', role: 'Developer, TTS and Hardware', initial: 'Z', photo: '/team/zayan.jpg' },
];

/**
 * The role to show for a member. A placeholder (or empty) role is only ever shown while developing,
 * so the literal "[ROLE]" can never appear on the live site.
 */
export function roleText(member: { role: string }): string {
  const missing = member.role.trim() === '' || member.role === PLACEHOLDER_ROLE;
  if (!missing) return member.role;
  return process.env.NODE_ENV === 'development' ? PLACEHOLDER_ROLE : '';
}

// A build warning listing the members who still need a role (printed once per process).
const missingRoles = TEAM.filter((m) => m.role.trim() === '' || m.role === PLACEHOLDER_ROLE).map((m) => m.name);
const warned = globalThis as unknown as { __swaaraRoleWarning?: boolean };
if (missingRoles.length > 0 && !warned.__swaaraRoleWarning) {
  warned.__swaaraRoleWarning = true;
  console.warn(`\n[team] ${missingRoles.length} team member(s) still need a role in src/lib/site.ts: ${missingRoles.join(', ')}\n`);
}

/**
 * Screens shown in the "Key features" section, from /public/prototype. They are screenshots of the
 * working Android prototype. To change one, drop a PNG or WebP into public/prototype/ and edit its
 * entry: `src` is the file, `alt` describes the picture for people who cannot see it, `caption` is shown
 * beneath it, and `width` and `height` are the file's real pixel size.
 */
export const PROTOTYPE_SCREENS: { src: string; alt: string; caption: string; width: number; height: number }[] = [
  {
    src: '/prototype/app-home.webp',
    alt: 'Prototype home screen: the SWAARA name at the top and two very large yellow buttons on a black background, Read sample and Camera guide.',
    caption: 'Home: two big buttons.',
    width: 540,
    height: 1084,
  },
  {
    src: '/prototype/app-read-sample.webp',
    alt: 'Prototype Read sample screen: a Back button, one very large yellow Read sample button, and the words press the button to read the sample.',
    caption: 'Read: press one button and listen.',
    width: 540,
    height: 1084,
  },
  {
    src: '/prototype/app-speech-test.webp',
    alt: 'Prototype speech test screen: a box with a sample English sentence, yellow buttons for Speak, Stop, Pause, Resume and Hint, a speed slider, and English and Sinhala voice pickers.',
    caption: 'Speech test: speak, pause, change speed.',
    width: 540,
    height: 1084,
  },
  {
    src: '/prototype/app-voices.webp',
    alt: 'Prototype speech test screen scrolled down: an English voice and a Sinhala voice picker, a Refresh voices button, and measurements such as the time to first sound.',
    caption: 'Voices: English and Sinhala.',
    width: 540,
    height: 1084,
  },
  {
    src: '/prototype/app-voice-list.webp',
    alt: 'Prototype voice list: a long list of English voice options on the phone, such as en-AU, en-GB and en-US.',
    caption: 'Every voice found on the phone.',
    width: 540,
    height: 1084,
  },
];
