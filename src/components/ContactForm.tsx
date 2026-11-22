'use client';

import { FormEvent, useEffect, useState } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function ContactForm() {
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          organisation: data.get('organisation'),
          kind: data.get('kind'),
          message: data.get('message'),
          consent: data.get('consent') === 'on',
          website: data.get('website'),
        }),
      });
      const json = (await res.json()) as { ok: boolean; message?: string; error?: string };
      if (json.ok) {
        setStatus('ok');
        setMessage(json.message ?? 'Thanks, we have your message.');
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
      <fieldset className="fieldset">
        <legend className="fw7">What is this about?</legend>
        <label htmlFor="ct-general" className="choice">
          <input id="ct-general" type="radio" name="kind" value="general" defaultChecked />A question
        </label>
        <label htmlFor="ct-testing" className="choice">
          <input id="ct-testing" type="radio" name="kind" value="testing" />I would like to help test SWAARA
        </label>
        <label htmlFor="ct-school" className="choice">
          <input id="ct-school" type="radio" name="kind" value="school" />I am writing for a school or organisation
        </label>
      </fieldset>

      <div className="field">
        <label htmlFor="ct-name" className="fw7">
          Your name
        </label>
        <input id="ct-name" name="name" type="text" autoComplete="name" required className="input" />
      </div>
      <div className="field">
        <label htmlFor="ct-email" className="fw7">
          Email address
        </label>
        <input id="ct-email" name="email" type="email" autoComplete="email" required className="input" />
      </div>
      <div className="field">
        <label htmlFor="ct-org" className="fw7">
          School or organisation (optional)
        </label>
        <input id="ct-org" name="organisation" type="text" autoComplete="organization" className="input" />
      </div>
      <div className="field">
        <label htmlFor="ct-message" className="fw7">
          Message
        </label>
        <textarea id="ct-message" name="message" rows={5} required className="input" />
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="ct-website">Leave this field empty</label>
        <input id="ct-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor="ct-consent" className="choice choice-top">
        <input id="ct-consent" type="checkbox" name="consent" required />
        <span>
          I agree that the SWAARA team may reply to me using this email address. See the{' '}
          <a href="/privacy">privacy page</a>.
        </span>
      </label>

      <button type="submit" className="btn" disabled={!ready || status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
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
