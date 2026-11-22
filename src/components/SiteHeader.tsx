'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Art, LOGO_INNER } from './art';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#products', label: 'Products' },
  { href: '/#app', label: 'App' },
  { href: '/#languages', label: 'Languages' },
  { href: '/#roadmap', label: 'Roadmap' },
  { href: '/docs', label: 'Docs' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and puts focus back on the button that opened it.
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="logo" aria-label="SWAARA home" onClick={close}>
          <Art inner={LOGO_INNER} viewBox="0 0 32 32" className="logo-mark" />
          SWAARA
        </Link>
        <button
          ref={button}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className="nav" data-open={open} aria-label="Main">
          {LINKS.map((link) => (
            <Link key={link.href} className="nav-link" href={link.href} onClick={close}>
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link className="btn btn-small" href="/#join" onClick={close}>
            Join the waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
