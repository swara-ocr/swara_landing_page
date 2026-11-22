import type { Metadata, Viewport } from 'next';
import { Atkinson_Hyperlegible, Bricolage_Grotesque, Noto_Sans_Sinhala } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { Analytics } from '@vercel/analytics/next';
import { SITE } from '@/lib/site';

const body = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
});

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  variable: '--font-sinhala',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `SWAARA: ${SITE.tagline}`, template: '%s | SWAARA' },
  description: SITE.description,
  applicationName: 'SWAARA',
  openGraph: {
    type: 'website',
    siteName: 'SWAARA',
    title: `SWAARA: ${SITE.tagline}`,
    description: SITE.description,
    locale: 'en_GB',
  },
  // The preview picture itself comes from opengraph-image.tsx and twitter-image.tsx.
  twitter: { card: 'summary_large_image', title: `SWAARA: ${SITE.tagline}`, description: SITE.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#060F1C' },
    { media: '(prefers-color-scheme: light)', color: '#F3F7FB' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // lets the header and footer respect phone notches and home bars
};

// Applies a saved colour choice before the page paints, so there is no flash.
const themeScript = `try{var t=localStorage.getItem('swaara-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${sinhala.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        {/* Vercel Web Analytics: cookieless page-view counts. Switched on in the Vercel dashboard. */}
        <Analytics />
      </body>
    </html>
  );
}
