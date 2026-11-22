import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What this website collects when you join the SWAARA waitlist or send us a message, and your choices.',
};

export default function PrivacyPage() {
  return (
    <main id="main" className="sec">
      <div className="wrap narrow">
        <article className="prose">
          <p className="eyebrow">Privacy</p>
          <h1 className="h2">Privacy on this website</h1>
          <p className="lead">
            This page explains what the SWAARA website collects, why, and what you can ask us to do. It covers this
            website only. How the SWAARA reader handles pages and recordings is described in{' '}
            <a href="/docs/privacy-and-ethics">Privacy and ethics</a>.
          </p>
          <p className="note">
            This is a plain-language statement written by the project team. It has not been reviewed by a lawyer, and we
            are still reviewing what Sri Lanka&apos;s Personal Data Protection Act (PDPA) requires of us. Last updated 22
            November 2026.
          </p>

          <h2 className="prose-h">What we collect</h2>
          <ul>
            <li>
              <strong>When you join the waitlist:</strong> your email address, which products you are interested in, your
              language choice for updates, the time you agreed to receive updates, and the date you joined.
            </li>
            <li>
              <strong>When you send us a message:</strong> your name, email address, the organisation (if you give one),
              the type of message, and what you write.
            </li>
            <li>
              <strong>Technical records:</strong> our website host keeps ordinary server logs, such as the time of a
              request and your IP address, to keep the site running and secure.
            </li>
          </ul>
          <p>
            We do not add advertising or analytics trackers to this website. The only thing it stores in your browser is
            your light or dark colour choice.
          </p>

          <h2 className="prose-h">Why we collect it</h2>
          <ul>
            <li>To send you the SWAARA updates you asked for, and nothing else.</li>
            <li>To reply to your message, and to arrange testing if you offered to help.</li>
          </ul>
          <p>We rely on your consent, which you give by ticking the box on each form. We do not sell or share your details for marketing.</p>

          <h2 className="prose-h">Who can see it</h2>
          <p>
            Members of the SWAARA team can see waitlist entries and messages. The website is hosted on Vercel, the
            database is hosted on Neon, and emails are sent through the team email account. These services process the
            data for us.
          </p>

          <h2 className="prose-h">How long we keep it</h2>
          <p>
            We keep waitlist entries until you unsubscribe or ask us to delete them. Messages are kept while we are
            dealing with them and for the length of the project. Testing with people has its own consent process, which
            starts only after ethics approval.
          </p>

          <h2 className="prose-h">Your choices</h2>
          <ul>
            <li>Every email from us has an unsubscribe link. It stops all further emails.</li>
            <li>
              To see, correct or delete what we hold about you, write to{' '}
              <a href={`mailto:${SITE.teamEmail}`}>{SITE.teamEmail}</a> from the address you used.
            </li>
          </ul>

          <h2 className="prose-h">Contact</h2>
          <p>
            Questions about this page: <a href={`mailto:${SITE.teamEmail}`}>{SITE.teamEmail}</a>.
          </p>
        </article>
      </div>
    </main>
  );
}
