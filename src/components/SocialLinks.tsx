import { activeSocials } from '@/lib/site';

/**
 * "Follow us" links. Only entries with a URL are shown (see SOCIALS in src/lib/site.ts). The links open
 * normally, and each has a full accessible name such as "SWAARA on GitHub". It is a labelled group, not
 * a navigation landmark, so it can appear in the page and in the footer without two landmarks sharing a name.
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
            <a href={s.url} rel="noopener noreferrer" aria-label={`SWAARA on ${s.name}`}>
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
