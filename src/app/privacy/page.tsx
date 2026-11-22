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
          <p className="eyebrow">Privacy (draft)</p>
          <h1 className="h2">Privacy on this website</h1>
          <p className="lead">
            This page explains what the SWAARA website collects, why, and what you can ask us to do. It covers this
            website only. How the SWAARA reader handles pages and recordings is described in{' '}
            <a href="/docs/privacy-and-ethics">Privacy and ethics</a>.
          </p>
          <p className="note">
            <strong>Draft for the team to check.</strong> This is a plain-language statement written by the project team.
            It has not been reviewed by a lawyer, and we are still checking it against what Sri Lanka&apos;s Personal
            Data Protection Act (PDPA) requires of us. Last updated 22 November 2026.
          </p>

          <h2 className="prose-h">What we collect, exactly</h2>
          <p>
            <strong>When you join the waitlist</strong> (all of it comes from the form, and every item is needed for the
            reason given):
          </p>
          <ul>
            <li>Your email address, so we can contact you about the project.</li>
            <li>
              Which of these best describes you: student, adult with low vision or blindness, teacher or school for the
              blind, family member or carer, organisation, or other. We use it to understand who the project serves.
            </li>
            <li>Which products you are interested in (tabletop station, laptop reader, phone app).</li>
            <li>Your preferred language for contact: Sinhala, English or both.</li>
            <li>The fact that you agreed, and the time you agreed. This is our record of your consent.</li>
            <li>The date you joined.</li>
          </ul>
          <p>
            <strong>When you send us a message:</strong> your name, your email address, the school or organisation (if you
            give one), the type of message, what you write, and the fact that you agreed we may reply.
          </p>
          <p>
            <strong>Technical records:</strong> our website host keeps ordinary server logs, such as the time of a
            request and your IP address, to keep the site running and secure.
          </p>
          <p className="note">
            We do not ask for names, phone numbers, documents, or any health or medical information on the waitlist, and
            we ask you not to send any. SWAARA gives no medical advice. We do not add advertising or analytics trackers.
            The only thing this website stores in your browser is your light or dark colour choice.
          </p>

          <h2 className="prose-h">Why we collect it</h2>
          <ul>
            <li>To contact you about the SWAARA project, by email, if you asked us to. We use it for nothing else.</li>
            <li>To reply to your message, and to arrange testing if you offered to help.</li>
            <li>To keep a record that you agreed.</li>
          </ul>
          <p>
            We rely on your consent, which you give by ticking the box on each form. We do not sell or share your details,
            and we do not use them for marketing. If you are under 18, please ask a parent, guardian or teacher to sign
            up for you.
          </p>

          <h2 className="prose-h">Who can see it</h2>
          <p>
            Members of the SWAARA team can see waitlist entries and messages. The website is hosted on Vercel and the
            data is stored in a Neon database, and these services process it for us. If we email you, the email comes
            from the team email account.
          </p>

          <h2 className="prose-h">How long we keep it</h2>
          <p>
            We keep waitlist entries until you ask us to remove them. Messages are kept while we are dealing with them and
            for the length of the project. Testing with people has its own consent process, which starts only after
            ethics approval.
          </p>

          <h2 className="prose-h">Your choices</h2>
          <ul>
            <li>
              To be removed, to see what we hold about you, or to correct it, write to{' '}
              <a href={`mailto:${SITE.teamEmail}`}>{SITE.teamEmail}</a> from the address you used. We will delete your
              entry.
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
