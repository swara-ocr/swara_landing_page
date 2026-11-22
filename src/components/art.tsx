// All illustrations are drawn here as SVG markup, using the colour classes
// defined in globals.css (fa, fs, fs2, ft, fp, fl, sa, sl, st, sarm, sw ...),
// so every picture follows the dark and light themes.

type ArtProps = {
  inner: string;
  viewBox: string;
  label?: string; // Provide a label for a meaningful picture. Leave out for pure decoration.
  className?: string;
};

export function Art({ inner, viewBox, label, className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}

export function Icon({ name, size = 24 }: { name: keyof typeof ICONS; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}

const ic = (d: string) =>
  `<g fill="none" class="sa" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${d}</g>`;

export const ICONS = {
  doc: ic('<path d="M5 4h10l4 4v12H5z"/><path d="M8 12h8M8 16h5"/>'),
  docCheck: ic('<path d="M5 4h10l4 4v12H5z"/><path d="M8 13l3 3 5-6"/>'),
  waves: ic('<path d="M4 9v6M8 6v12M12 3v18M16 7v10M20 10v4"/>'),
  translate: ic('<path d="M3 5h12M9 3v2M5 11c2-1 5-4 6-6M7 8c1 2 4 5 7 6M12 21l5-11 5 11M14 17h6"/>'),
  mic: ic('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
  micOff: ic('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M3 3l18 18"/>'),
  help: ic('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.6 2.4c-.8.4-1.1 1-1.1 1.8M12 17h.01"/>'),
  pill: ic('<rect x="3" y="8" width="18" height="8" rx="4"/><path d="M12 8v8"/>'),
  shield: ic('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'),
  shieldCheck: ic('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'),
  lock: ic('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  book: ic('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M9 8h6"/>'),
  flow: ic('<path d="M4 7h16M4 12h16M4 17h10"/>'),
  device: ic('<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>'),
  layers: ic('<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>'),
  check: ic('<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>'),
  list: ic('<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>'),
  mail: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
  sun: ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>'),
  moon: ic('<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>'),
} as const;

export const LOGO_INNER =
  '<circle cx="16" cy="16" r="14" fill="none" class="sa" stroke-width="2.5"/><circle cx="16" cy="16" r="5" class="fa"/><path d="M16 2v6M16 24v6M2 16h6M24 16h6" class="sa" stroke-width="2.5" stroke-linecap="round"/>';

// ---------- Hero: the station reading a label ----------
export const RIG_INNER = `
<ellipse cx="280" cy="300" rx="250" ry="120" class="fa" opacity=".08"/>
<polygon points="292,94 100,214 460,214" class="fa" opacity=".16"/>
<path d="M488 334 V132 Q488 68 424 68 H336" fill="none" class="sarm" stroke-width="14" stroke-linecap="round"/>
<rect x="244" y="48" width="104" height="50" rx="25" class="fs2" stroke-width="2" style="stroke:var(--line)"/>
<circle cx="292" cy="74" r="12" class="fa"/>
<circle cx="292" cy="74" r="5" class="fs2"/>
<circle cx="322" cy="62" r="3.5" class="fw"/>
<rect x="30" y="332" width="500" height="64" rx="18" class="fs" stroke-width="2" style="stroke:var(--line)"/>
<rect x="30" y="332" width="500" height="10" rx="5" class="fs2"/>
<rect x="92" y="212" width="8" height="124" rx="3" class="ft"/>
<circle cx="470" cy="366" r="19" class="fa"/>
<circle cx="470" cy="366" r="12" fill="none" stroke-width="3" style="stroke:var(--onaccent)"/>
<rect x="56" y="352" width="64" height="30" rx="9" class="fs2"/>
<circle cx="72" cy="367" r="3" class="fm"/><circle cx="88" cy="367" r="3" class="fm"/><circle cx="104" cy="367" r="3" class="fm"/>
<g fill="none" class="sa" stroke-width="4" stroke-linecap="round"><path d="M132 356 q12 11 0 22"/><path d="M144 348 q20 19 0 38"/></g>
`;

// ---------- Problem: hand-held photo against a fixed corner stop ----------
export const PROBLEM_HAND = `
<g transform="rotate(-9 80 95)"><rect x="40" y="38" width="96" height="124" rx="4" class="fp"/><g class="fl"><rect x="52" y="56" width="70" height="7" rx="3.5"/><rect x="52" y="72" width="54" height="7" rx="3.5"/><rect x="52" y="88" width="66" height="7" rx="3.5"/><rect x="52" y="104" width="44" height="7" rx="3.5"/></g></g>
<ellipse cx="108" cy="64" rx="26" ry="12" class="fw" opacity=".55"/>
<rect x="0" y="0" width="160" height="22" class="fs"/>
`;

export const PROBLEM_SQUARE = `
<path d="M20 22 H138 M20 22 V168" fill="none" class="st" stroke-width="7" stroke-linecap="round"/>
<rect x="30" y="32" width="98" height="128" rx="4" class="fp"/>
<g class="fl"><rect x="42" y="50" width="72" height="7" rx="3.5"/><rect x="42" y="66" width="56" height="7" rx="3.5"/><rect x="42" y="82" width="68" height="7" rx="3.5"/><rect x="42" y="98" width="46" height="7" rx="3.5"/><rect x="42" y="114" width="62" height="7" rx="3.5"/></g>
<path d="M24 26 h14 M24 26 v14 M134 26 h-14 M134 26 v14 M24 166 h14 M24 166 v-14 M134 166 h-14 M134 166 v-14" fill="none" class="sa" stroke-width="3" stroke-linecap="round"/>
`;

// ---------- How it works: four steps ----------
export const STEP_1 = `
<rect x="20" y="14" width="200" height="122" rx="10" class="fs"/>
<path d="M34 28 H120 M34 28 V118" fill="none" class="st" stroke-width="7" stroke-linecap="round"/>
<rect x="48" y="40" width="96" height="78" rx="3" class="fp"/>
<g class="fl"><rect x="58" y="54" width="70" height="6" rx="3"/><rect x="58" y="68" width="52" height="6" rx="3"/><rect x="58" y="82" width="64" height="6" rx="3"/></g>
<path d="M196 80 H162 M172 70 l-10 10 l10 10" fill="none" class="sa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
`;

export const STEP_2 = `
<rect x="62" y="22" width="116" height="106" rx="3" class="fp"/>
<g class="fl"><rect x="74" y="38" width="84" height="6" rx="3"/><rect x="74" y="52" width="62" height="6" rx="3"/><rect x="74" y="66" width="78" height="6" rx="3"/><rect x="74" y="80" width="54" height="6" rx="3"/></g>
<path d="M50 36 v-20 h20 M190 36 v-20 h-20 M50 114 v20 h20 M190 114 v20 h-20" fill="none" class="sa" stroke-width="4" stroke-linecap="round"/>
<rect x="82" y="104" width="76" height="22" rx="11" class="fa"/>
<path d="M98 115 l6 6 l12 -12" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke:var(--onaccent)"/>
`;

export const STEP_3 = `
<rect x="22" y="26" width="76" height="98" rx="3" class="fp"/>
<g class="fl"><rect x="32" y="40" width="54" height="6" rx="3"/><rect x="32" y="54" width="40" height="6" rx="3"/><rect x="32" y="68" width="50" height="6" rx="3"/><rect x="32" y="82" width="34" height="6" rx="3"/></g>
<path d="M112 75 H134 M126 67 l8 8 l-8 8" fill="none" class="sa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<text x="148" y="82" font-size="42" font-weight="700" class="fa" style="font-family:var(--font-display),sans-serif">Aa</text>
<g class="fa" opacity=".6"><rect x="148" y="94" width="68" height="6" rx="3"/><rect x="148" y="108" width="48" height="6" rx="3"/></g>
`;

export const STEP_4 = `
<g class="fa"><rect x="34" y="62" width="9" height="26" rx="4.5"/><rect x="52" y="48" width="9" height="54" rx="4.5"/><rect x="70" y="32" width="9" height="86" rx="4.5"/><rect x="88" y="54" width="9" height="42" rx="4.5"/><rect x="106" y="20" width="9" height="110" rx="4.5"/><rect x="124" y="44" width="9" height="62" rx="4.5"/><rect x="142" y="34" width="9" height="82" rx="4.5"/><rect x="160" y="56" width="9" height="38" rx="4.5"/><rect x="178" y="66" width="9" height="18" rx="4.5"/></g>
`;

// ---------- Products ----------
export const PRODUCT_STATION = `
<polygon points="146,50 96,112 196,112" class="fa" opacity=".18"/>
<path d="M258 130 V50 Q258 28 232 28 H168" fill="none" class="sarm" stroke-width="9" stroke-linecap="round"/>
<rect x="124" y="16" width="62" height="30" rx="15" class="fs"/><circle cx="148" cy="31" r="7" class="fa"/>
<rect x="30" y="128" width="240" height="30" rx="10" class="fs"/>
<rect x="58" y="96" width="5" height="34" rx="2" class="ft"/><rect x="62" y="96" width="120" height="34" rx="2" class="fp"/>
<g class="fl"><rect x="72" y="104" width="80" height="5" rx="2.5"/><rect x="72" y="115" width="56" height="5" rx="2.5"/></g>
<circle cx="236" cy="143" r="9" class="fa"/><rect x="42" y="138" width="26" height="12" rx="4" class="fs2"/>
`;

export const PRODUCT_LAPTOP = `
<rect x="44" y="22" width="152" height="100" rx="8" class="fs" stroke-width="2" style="stroke:var(--line)"/>
<rect x="30" y="122" width="180" height="12" rx="6" class="fs" stroke-width="2" style="stroke:var(--line)"/>
<g class="fl"><rect x="58" y="38" width="112" height="9" rx="4.5"/><rect x="58" y="76" width="96" height="9" rx="4.5"/><rect x="58" y="94" width="70" height="9" rx="4.5"/></g>
<rect x="54" y="53" width="128" height="17" rx="5" class="fw"/>
<rect x="58" y="58" width="96" height="7" rx="3.5" style="fill:#0A1B2C"/>
<path d="M270 150 V100 Q270 80 250 80 H236" fill="none" class="sarm" stroke-width="7" stroke-linecap="round"/>
<rect x="214" y="70" width="38" height="18" rx="9" class="fs"/><circle cx="228" cy="79" r="4" class="fa"/>
<rect x="216" y="150" width="70" height="12" rx="5" class="fs"/>
`;

export const PRODUCT_PHONE = `
<rect x="104" y="10" width="92" height="160" rx="16" class="fs" stroke-width="3" style="stroke:var(--arm)"/>
<rect x="116" y="32" width="68" height="84" rx="6" class="fs2"/>
<rect x="126" y="42" width="48" height="64" rx="2" class="fp"/>
<g class="fl"><rect x="132" y="52" width="36" height="4" rx="2"/><rect x="132" y="62" width="26" height="4" rx="2"/><rect x="132" y="72" width="32" height="4" rx="2"/></g>
<path d="M120 48 v-10 h10 M180 48 v-10 h-10 M120 110 v10 h10 M180 110 v10 h-10" fill="none" class="sa" stroke-width="3" stroke-linecap="round"/>
<rect x="118" y="130" width="64" height="16" rx="8" class="fw"/>
<g fill="none" class="sa" stroke-width="3.5" stroke-linecap="round"><path d="M214 60 q12 14 0 28"/><path d="M226 50 q20 24 0 48"/><path d="M86 60 q-12 14 0 28"/><path d="M74 50 q-20 24 0 48"/></g>
`;

// ---------- Phone app mockups ----------
export const APP_READ = `
<rect x="38" y="30" width="124" height="168" rx="4" class="fp"/>
<g class="fl"><rect x="52" y="52" width="92" height="7" rx="3.5"/><rect x="52" y="68" width="70" height="7" rx="3.5"/><rect x="52" y="84" width="86" height="7" rx="3.5"/><rect x="52" y="100" width="58" height="7" rx="3.5"/><rect x="52" y="116" width="80" height="7" rx="3.5"/></g>
<path d="M26 56 v-30 h30 M174 56 v-30 h-30 M26 174 v30 h30 M174 174 v30 h-30" fill="none" class="sa" stroke-width="5" stroke-linecap="round"/>
`;

export const APP_FIND = `
<circle cx="100" cy="100" r="86" fill="none" class="sl" stroke-width="2"/>
<circle cx="100" cy="100" r="58" fill="none" class="sl" stroke-width="2"/>
<circle cx="100" cy="100" r="30" fill="none" class="sl" stroke-width="2"/>
<path d="M100 100 L52 38" class="sa" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 8"/>
<circle cx="62" cy="58" r="11" class="fw"/>
<circle cx="62" cy="58" r="20" fill="none" class="sw" stroke-width="2" opacity=".5"/>
<path d="M100 84 l10 22 h-20 z" class="fa"/>
`;
