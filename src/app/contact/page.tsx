import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import SocialLinks from '@/components/SocialLinks';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/contact' },
  title: 'Contact us',
  description: 'Write to the SWAARA team: questions, schools, organisations and people who would like to help test.',
};

export default function ContactPage() {
  return (
    <main id="main" className="sec">
      <div className="wrap split">
        <div className="stack g20">
          <h1 className="h2">Contact us</h1>
          <p className="lead">
            Want to help test SWAARA, or use it in a school? Tell us a little about you. Testing with blind and
            low-vision users starts only after ethics approval, so we may not be able to begin straight away.
          </p>
          <p className="muted">
            You can also write to us at <a href={`mailto:${SITE.teamEmail}`}>{SITE.teamEmail}</a>.
          </p>
          <SocialLinks id="follow-us-contact" />
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
