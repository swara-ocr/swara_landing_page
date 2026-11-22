'use client';

import { useEffect, useState } from 'react';
import { Icon } from './art';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const set = document.documentElement.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') setTheme(set);
    else setTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('swaara-theme', next);
    } catch {
      /* storage can be blocked; the choice then lasts for this visit only */
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      className="theme-btn"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light colours' : 'Switch to dark colours'}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={22} />
    </button>
  );
}
