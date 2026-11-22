import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { adminConfigured, isAdmin } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Team sign-in',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const ERRORS: Record<string, string> = {
  wrong: 'That password is not correct.',
  many: 'Too many attempts. Wait a few minutes and try again.',
  setup: 'The admin page is not set up yet. Add ADMIN_PASSWORD and ADMIN_SECRET in the environment variables.',
};

export default function AdminLogin({ searchParams }: { searchParams: { error?: string } }) {
  if (isAdmin()) redirect('/admin');
  const error = searchParams.error ? ERRORS[searchParams.error] : '';

  return (
    <main id="main" className="sec">
      <div className="wrap narrow stack g20">
        <h1 className="h2">Team sign-in</h1>
        {!adminConfigured() && <p className="note">{ERRORS.setup}</p>}
        <form method="post" action="/api/admin/login" className="card form">
          <div className="field">
            <label htmlFor="admin-password" className="fw7">
              Password
            </label>
            <input id="admin-password" name="password" type="password" autoComplete="current-password" required className="input" />
          </div>
          <button type="submit" className="btn">
            Sign in
          </button>
          <p role="alert" className="form-msg form-error">
            {error}
          </p>
        </form>
      </div>
    </main>
  );
}
