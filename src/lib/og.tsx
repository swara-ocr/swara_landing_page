import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// The picture shown when a link to the site is shared (Facebook, LinkedIn, WhatsApp, X and so on).
// It is drawn with plain shapes, the same logo as the header, so it needs no image file.

const BG = '#060F1C';
const WARM = '#FFC94A';
const TEXT = '#EAF2FA';
const MUTED = '#A9BCD0';

/**
 * Reads the logo from /public/logo as a data URL, so the picture below can draw it. The preview
 * images are made once while the site is built (on Node), so reading the file from disk is fine.
 */
export async function loadLogo(): Promise<string> {
  const file = await readFile(join(process.cwd(), 'public', 'logo', 'swaara-logo.png'));
  return `data:image/png;base64,${file.toString('base64')}`;
}

export function OgCard({ logo }: { logo: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: BG,
        padding: '64px 72px',
        color: TEXT,
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={481} height={124} alt="" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 700, lineHeight: 1.05 }}>Put a page down.</div>
        <div style={{ display: 'flex', marginTop: 16 }}>
          <div
            style={{
              display: 'flex',
              background: WARM,
              color: '#0A1B2C',
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              padding: '0 20px',
              borderRadius: 16,
            }}
          >
            Hear it read.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', fontSize: 34, color: MUTED }}>
        A reading assistant for blind and low-vision people
      </div>
    </div>
  );
}
