import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Unsubscribe',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function UnsubscribePage({ params }: { params: { token: string } }) {
  if (params.token === 'done') {
    return (
      <main id="main" className="sec">
        <div className="wrap narrow stack g16">
          <h1 className="h2">You are unsubscribed</h1>
          <p className="lead">We will not send you any more SWAARA emails. Thank you for your interest.</p>
          <p>
            <Link className="btn" href="/">
              Back to the home page
            </Link>
          </p>
        </div>
      </main>
    );
  }

  let found = false;
  let already = false;
  try {
    const signup = await db.waitlistSignup.findUnique({ where: { unsubscribeToken: params.token } });
    found = !!signup;
    already = !!signup?.unsubscribedAt;
  } catch {
    found = false;
  }

  return (
    <main id="main" className="sec">
      <div className="wrap narrow stack g16">
        <h1 className="h2">Unsubscribe from SWAARA emails</h1>
        {!found ? (
          <p className="lead">
            This link is not valid. If you want to stop our emails, reply to any email from us and we will remove you.
          </p>
        ) : already ? (
          <p className="lead">You are already unsubscribed.</p>
        ) : (
          <>
            <p className="lead">Press the button to stop all SWAARA emails to this address.</p>
            <form method="post" action="/api/unsubscribe">
              <input type="hidden" name="token" value={params.token} />
              <button type="submit" className="btn">
                Unsubscribe
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
