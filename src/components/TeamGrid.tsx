import Image from 'next/image';
import { TEAM, roleText } from '@/lib/site';

/** The team cards: a circular photo (or initial), then the name, then the role. */
export default function TeamGrid() {
  return (
    <ul className="team list-reset">
      {TEAM.map((m) => {
        const role = roleText(m);
        return (
          <li key={m.name} className="card member">
            {m.photo ? (
              <Image className="avatar avatar-photo" src={m.photo} alt={`Photo of ${m.name}`} width={240} height={240} />
            ) : (
              <span className="avatar" aria-hidden="true">
                {m.initial}
              </span>
            )}
            <strong className="member-name">{m.name}</strong>
            {role && <span className="muted member-role">{role}</span>}
          </li>
        );
      })}
    </ul>
  );
}
