'use client';

import { FormEvent, useEffect, useState } from 'react';
import { LANGUAGES, ROLES } from '@/lib/validate';

type Status = 'idle' | 'sending' | 'ok' | 'error';

const OPTIONS = [
  { id: 'station', label: 'Tabletop station' },
  { id: 'laptop', label: 'Laptop reader' },
  { id: 'phone', label: 'Phone app' },
];

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>('idle');
  // Until the page's JavaScript is running, a submit would be a plain browser GET that puts the
  // email address in the URL. Keeping the button disabled until then prevents that.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          role: data.get('role'),
          interests: data.getAll('interest'),
          language: data.get('language'),
          consent: data.get('consent') === 'on',
          website: data.get('website'),
        }),
      });
      const json = (await res.json()) as { ok: boolean; message?: string; error?: string };
      if (json.ok) {
        setStatus('ok');
        setMessage(json.message ?? 'You are on the list.');
        form.reset();
      } else {
        setStatus('error');
        setMessage(json.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('We could not reach the server. Check your connection and try again.');
    }
  }

  return (
    <form className="card form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="wl-email" className="fw7">
          Email address
        </label>
        <input id="wl-email" name="email" type="email" autoComplete="email" required className="input" />
      </div>

      <fieldset className="fieldset">
        <legend className="fw7">I am a...</legend>
        {ROLES.map((r) => (
          <label key={r.id} htmlFor={`wl-role-${r.id}`} className="choice">
            <input id={`wl-role-${r.id}`} type="radio" name="role" value={r.id} required />
            {r.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fw7">Interested in</legend>
        {OPTIONS.map((o) => (
          <label key={o.id} htmlFor={`wl-${o.id}`} className="choice">
            <input id={`wl-${o.id}`} type="checkbox" name="interest" value={o.id} />
            {o.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="fieldset fieldset-row">
        <legend className="fw7">Preferred language</legend>
        {LANGUAGES.map((l) => (
          <label key={l.id} htmlFor={`wl-lang-${l.id}`} className="choice">
            <input id={`wl-lang-${l.id}`} type="radio" name="language" value={l.id} defaultChecked={l.id === 'en'} />
            {l.label}
          </label>
        ))}
      </fieldset>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="wl-website">Leave this field empty</label>
        <input id="wl-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="muted small">Under 18? Please ask a parent, guardian or teacher to sign up for you.</p>

      <label htmlFor="wl-consent" className="choice choice-top">
        <input id="wl-consent" type="checkbox" name="consent" required />
        <span>
          I agree that SWAARA may store my email and contact me about the project. It is not shared. I can ask to be
          removed at any time. See the <a href="/privacy">privacy page</a>.
        </span>
      </label>

      <button type="submit" className="btn" disabled={!ready || status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Join the waitlist'}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={status === 'error' ? 'form-msg form-error' : status === 'ok' ? 'form-msg form-ok' : 'form-msg'}
      >
        {message}
      </p>
    </form>
  );
}
