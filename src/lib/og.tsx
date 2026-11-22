// The picture shown when a link to the site is shared (Facebook, LinkedIn, WhatsApp, X and so on).
// It is drawn with plain shapes, the same logo as the header, so it needs no image file.

const BG = '#060F1C';
const ACCENT = '#2AD4F0';
const WARM = '#FFC94A';
const TEXT = '#EAF2FA';
const MUTED = '#A9BCD0';

function Logo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="none" stroke={ACCENT} strokeWidth="2.5" />
      <circle cx="16" cy="16" r="5" fill={ACCENT} />
      <path d="M16 2v6M16 24v6M2 16h6M24 16h6" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function OgCard() {
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Logo size={96} />
        <div style={{ display: 'flex', marginLeft: 28, fontSize: 84, fontWeight: 700, letterSpacing: 6 }}>SWAARA</div>
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

export function AppleIconCard() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BG }}>
      <Logo size={132} />
    </div>
  );
}
