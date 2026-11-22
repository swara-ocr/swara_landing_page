import Link from 'next/link';
import { Art, LOGO_INNER } from './art';
import ThemeToggle from './ThemeToggle';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="logo" aria-label="SWAARA home">
          <Art inner={LOGO_INNER} viewBox="0 0 32 32" className="logo-mark" />
          SWAARA
        </Link>
        <nav className="nav" aria-label="Main">
          <Link className="nav-link" href="/#how">
            How it works
          </Link>
          <Link className="nav-link" href="/#products">
            Products
          </Link>
          <Link className="nav-link" href="/#app">
            App
          </Link>
          <Link className="nav-link" href="/#languages">
            Languages
          </Link>
          <Link className="nav-link" href="/#roadmap">
            Roadmap
          </Link>
          <Link className="nav-link" href="/docs">
            Docs
          </Link>
          <ThemeToggle />
          <Link className="btn btn-small" href="/#join">
            Join the waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
