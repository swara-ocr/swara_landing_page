export const SITE = {
  name: 'SWAARA',
  tagline: 'Put a page down. Hear it read.',
  description:
    'SWAARA is a reading assistant for blind and low-vision people. It reads printed pages aloud in Sinhala and English, using a fixed plate so nobody has to aim a camera.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.swaara.lk').replace(/\/$/, ''),
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
