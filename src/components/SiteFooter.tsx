import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div className="stack g8">
          <p className="footer-brand">SWAARA</p>
          <p className="muted">
            <a href={SITE.url} className="plain">
              www.swaara.lk
            </a>
          </p>
          <p className="muted">
            <a href={`mailto:${SITE.teamEmail}`} className="plain">
              {SITE.teamEmail}
            </a>
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/docs">Documentation</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/accessibility">Accessibility statement</Link>
          <a href={SITE.githubUrl} rel="noopener noreferrer">
            GitHub
          </a>
          <Link href="/#join">Join the waitlist</Link>
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
