import { activeSocials } from '@/lib/site';
import SocialIcon, { hasSocialIcon } from './SocialIcon';

/**
 * "Follow us" icons. Only entries with a URL are shown (see SOCIALS in src/lib/site.ts). Each is an icon
 * button that opens the page in a new tab. The icon is the only thing seen, so the link carries the full
 * accessible name, such as "SWAARA on GitHub (opens in a new tab)". A social site without an icon falls back
 * to its name as text. It is a labelled group, not a navigation landmark, so it can appear in the page and in
 * the footer without two landmarks sharing a name.
 */
export default function SocialLinks({ label = 'Follow us', id = 'follow-us' }: { label?: string; id?: string }) {
  const socials = activeSocials();
  if (socials.length === 0) return null;
  return (
    <div role="group" aria-labelledby={id}>
      <p id={id} className="fw7 social-label">
        {label}
      </p>
      <ul className="social list-reset">
        {socials.map((s) => (
          <li key={s.name}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`SWAARA on ${s.name} (opens in a new tab)`}
              className={hasSocialIcon(s.name) ? 'social-icon' : undefined}
            >
              {hasSocialIcon(s.name) ? <SocialIcon name={s.name} /> : s.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
