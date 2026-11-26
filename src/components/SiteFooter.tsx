import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import SocialLinks from './SocialLinks';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div className="stack g8">
          <p>
            <Image src="/logo/swaara-logo.png" alt="SWAARA" width={200} height={52} className="footer-logo" />
          </p>
          <p className="muted">
            <Link href="/" className="plain">
              {SITE.host}
            </Link>
          </p>
          <p className="muted">
            <a href={`mailto:${SITE.teamEmail}`} className="plain">
              {SITE.teamEmail}
            </a>
          </p>
          <SocialLinks id="follow-us-footer" />
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/docs">Docs</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/accessibility">Accessibility</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="wrap footer-bottom">
        <p className="muted small">
          © 2026 SWAARA. A student project in development, by group CS-01 at IIT Sri Lanka with the University of
          Westminster.
        </p>
      </div>
    </footer>
  );
}
