'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Art, LOGO_INNER } from './art';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#products', label: 'Products' },
  { href: '/#languages', label: 'Languages' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/about', label: 'About' },
  { href: '/docs', label: 'Docs' },
];

// Keep in step with the 960px breakpoint in globals.css.
const WIDE = '(min-width: 961px)';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

  // While the menu is open: the page behind it cannot scroll or be reached, Escape closes the menu
  // (and puts focus back on its button), and Tab cycles inside the header instead of leaving it.
  useEffect(() => {
    if (!open) return;

    // Lock scrolling on the page root only. Do NOT also set overflow on <body>: that turns the body
    // into its own scroll box and the sticky header stops sticking to the screen.
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const behind = Array.from(document.querySelectorAll('.skip, main, footer'));
    behind.forEach((el) => el.setAttribute('inert', ''));

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !header.current) return;
      const items = Array.from(header.current.querySelectorAll<HTMLElement>('a[href], button')).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !header.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !header.current.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }

    // If the window grows to the wide layout, the menu is no longer needed.
    const query = window.matchMedia(WIDE);
    function onWide(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener('keydown', onKey);
    query.addEventListener('change', onWide);
    return () => {
      html.style.overflow = previousOverflow;
      behind.forEach((el) => el.removeAttribute('inert'));
      document.removeEventListener('keydown', onKey);
      query.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <>
      <header className="site-header" ref={header}>
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
            <Link className="btn btn-small nav-join" href="/#join" onClick={close}>
              Join the waitlist
            </Link>
          </nav>
        </div>
      </header>
      {/* Tapping the dimmed page behind the open menu closes it. */}
      {open && <div className="menu-backdrop" onClick={close} aria-hidden="true" />}
    </>
  );
}
