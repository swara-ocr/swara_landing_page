'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';

const OPTIONS = [
  { id: 'station', label: 'Tabletop station' },
  { id: 'laptop', label: 'Laptop reader' },
  { id: 'phone', label: 'Phone app' },
];

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>('idle');
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
        <legend className="fw7">I am interested in</legend>
        {OPTIONS.map((o) => (
          <label key={o.id} htmlFor={`wl-${o.id}`} className="choice">
            <input id={`wl-${o.id}`} type="checkbox" name="interest" value={o.id} />
            {o.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="fieldset fieldset-row">
        <legend className="fw7">Language for updates</legend>
        <label htmlFor="wl-en" className="choice">
          <input id="wl-en" type="radio" name="language" value="en" defaultChecked />
          English
        </label>
        <label htmlFor="wl-si" className="choice">
          <input id="wl-si" type="radio" name="language" value="si" />
          <span lang="si" className="sinhala">
            සිංහල
          </span>
        </label>
      </fieldset>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="wl-website">Leave this field empty</label>
        <input id="wl-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor="wl-consent" className="choice choice-top">
        <input id="wl-consent" type="checkbox" name="consent" required />
        <span>
          I agree to receive occasional SWAARA project updates by email. I can unsubscribe at any time. See the{' '}
          <a href="/privacy">privacy page</a>.
        </span>
      </label>

      <button type="submit" className="btn" disabled={status === 'sending'}>
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
