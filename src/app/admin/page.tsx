import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { ContactMessage, SiteUpdate, WaitlistSignup } from '@prisma/client';
import { db } from '@/lib/db';
import { isAdmin } from '@/lib/auth';
import { emailEnabled, interestLabel } from '@/lib/email';
import { languageLabel, roleLabel } from '@/lib/validate';
import ConfirmButton from '@/components/ConfirmButton';

export const metadata: Metadata = {
  title: 'Team admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

function when(date: Date) {
  return date.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
}

export default async function AdminPage() {
  if (!isAdmin()) redirect('/admin/login');

  const showEmailStatus = emailEnabled();
  let dbError = '';
  let signups: WaitlistSignup[] = [];
  let messages: ContactMessage[] = [];
  let updates: SiteUpdate[] = [];
  let active = 0;

  try {
    [signups, messages, updates, active] = await Promise.all([
      db.waitlistSignup.findMany({ orderBy: { createdAt: 'desc' }, take: 300 }),
      db.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
      db.siteUpdate.findMany({ orderBy: { publishedAt: 'desc' }, take: 50 }),
      db.waitlistSignup.count({ where: { unsubscribedAt: null } }),
    ]);
  } catch (error) {
    console.error('[admin] database error:', error);
    dbError = 'The database could not be reached. Check DATABASE_URL and that the tables exist (run: npx prisma db push).';
  }

  return (
    <main id="main" className="sec">
      <div className="wrap stack g32">
        <div className="row spread">
          <h1 className="h2">Team admin</h1>
          <form method="post" action="/api/admin/logout">
            <button type="submit" className="btn-line btn-small">
              Sign out
            </button>
          </form>
        </div>

        {dbError && <p className="note" role="alert">{dbError}</p>}

        <ul className="stats list-reset">
          <li className="card pad">
            <span className="stat-n">{active}</span>
            <span className="muted">on the waitlist</span>
          </li>
          <li className="card pad">
            <span className="stat-n">{messages.filter((m) => !m.handledAt).length}</span>
            <span className="muted">messages to answer</span>
          </li>
          <li className="card pad">
            <span className="stat-n">{updates.filter((u) => u.published).length}</span>
            <span className="muted">published updates</span>
          </li>
        </ul>

        <section className="stack g16" aria-labelledby="adm-updates">
          <h2 id="adm-updates" className="h3">
            Updates shown on the home page
          </h2>
          <form method="post" action="/api/admin/updates" className="card form">
            <input type="hidden" name="intent" value="create" />
            <div className="field">
              <label htmlFor="up-title" className="fw7">
                Title
              </label>
              <input id="up-title" name="title" type="text" required maxLength={140} className="input" />
            </div>
            <div className="field">
              <label htmlFor="up-body" className="fw7">
                Text
              </label>
              <textarea id="up-body" name="body" rows={4} required maxLength={4000} className="input" />
            </div>
            <button type="submit" className="btn">
              Publish update
            </button>
          </form>
          <ul className="list-reset stack g12">
            {updates.map((u) => (
              <li key={u.id} className="card pad stack g8">
                <p className="muted small">
                  {when(u.publishedAt)} · {u.published ? 'Published' : 'Hidden'}
                </p>
                <p className="fw7">{u.title}</p>
                <p className="pre">{u.body}</p>
                <div className="row g12">
                  <form method="post" action="/api/admin/updates">
                    <input type="hidden" name="intent" value="toggle" />
                    <input type="hidden" name="id" value={u.id} />
                    <button type="submit" className="btn-line btn-small">
                      {u.published ? 'Hide' : 'Publish'}
                    </button>
                  </form>
                  <form method="post" action="/api/admin/updates">
                    <input type="hidden" name="intent" value="delete" />
                    <input type="hidden" name="id" value={u.id} />
                    <button type="submit" className="btn-line btn-small">
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="stack g16" aria-labelledby="adm-msgs">
          <h2 id="adm-msgs" className="h3">
            Messages
          </h2>
          {messages.length === 0 && <p className="muted">No messages yet.</p>}
          <ul className="list-reset stack g12">
            {messages.map((m) => (
              <li key={m.id} className="card pad stack g8">
                <p className="muted small">
                  {when(m.createdAt)} · {m.kind} {m.handledAt ? '· answered' : ''}
                </p>
                <p>
                  <strong>{m.name}</strong> ·{' '}
                  <a href={`mailto:${m.email}`}>{m.email}</a>
                  {m.organisation ? ` · ${m.organisation}` : ''}
                </p>
                <p className="pre">{m.message}</p>
                {!m.handledAt && (
                  <form method="post" action="/api/admin/updates">
                    <input type="hidden" name="intent" value="handled" />
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="btn-line btn-small">
                      Mark as answered
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="stack g16" aria-labelledby="adm-wait">
          <div className="row spread">
            <h2 id="adm-wait" className="h3">
              Waitlist
            </h2>
            <a className="btn-line btn-small" href="/api/admin/waitlist.csv">
              Download CSV
            </a>
          </div>
          <div className="table-wrap" tabIndex={0} role="region" aria-label="Waitlist table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">I am a</th>
                  <th scope="col">Interested in</th>
                  <th scope="col">Language</th>
                  <th scope="col">Consent given</th>
                  <th scope="col">Joined</th>
                  {showEmailStatus && <th scope="col">Status</th>}
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((s) => (
                  <tr key={s.id}>
                    <th scope="row">{s.email}</th>
                    <td>{roleLabel(s.role)}</td>
                    <td>{s.interests.length ? s.interests.map(interestLabel).join(', ') : '-'}</td>
                    <td>{languageLabel(s.language)}</td>
                    <td>{s.consent ? when(s.consentAt) : 'No'}</td>
                    <td>{when(s.createdAt)}</td>
                    {showEmailStatus && (
                      <td>{s.unsubscribedAt ? 'Unsubscribed' : s.confirmationSentAt ? 'Confirmed by email' : 'No email sent'}</td>
                    )}
                    <td>
                      <form method="post" action="/api/admin/updates">
                        <input type="hidden" name="intent" value="remove-signup" />
                        <input type="hidden" name="id" value={s.id} />
                        <ConfirmButton
                          question={`Remove ${s.email} from the waitlist? This deletes their entry and cannot be undone.`}
                          className="btn-line btn-small"
                        >
                          Remove
                        </ConfirmButton>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
