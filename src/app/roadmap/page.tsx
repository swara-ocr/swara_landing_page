import type { Metadata } from 'next';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  alternates: { canonical: '/roadmap' },
  title: 'Roadmap and updates',
  description: 'Where SWAARA is now, what comes next, and the latest project updates.',
};

// Rebuilt every minute so new posts from /admin appear without a redeploy.
export const revalidate = 60;

async function getUpdates() {
  try {
    return await db.siteUpdate.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 5,
    });
  } catch {
    // The page still works without the database (for example, before it is connected).
    return [];
  }
}

export default async function RoadmapPage() {
  const updates = await getUpdates();

  return (
    <main id="main">
      <section id="roadmap" className="sec" aria-labelledby="road-h">
        <div className="wrap stack g40">
          <div className="stack g12">
            <h1 id="road-h" className="h2">
              Where SWAARA is now
            </h1>
            <p className="lead">These are targets, not promises. Updates appear here as they happen.</p>
          </div>

          {updates.length > 0 && (
            <div className="stack g16">
              <h3 className="h3">Latest updates</h3>
              <ul className="updates list-reset">
                {updates.map((u) => (
                  <li key={u.id} className="card pad stack g8">
                    <p className="muted small">
                      <time dateTime={u.publishedAt.toISOString()}>
                        {u.publishedAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </time>
                    </p>
                    <h4 className="h4">{u.title}</h4>
                    <p className="pre">{u.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ol className="grid list-reset">
            <li className="card pad stack g12 road-now">
              <p className="eyebrow">Now to the end of December 2026</p>
              <ul className="bullets">
                <li>Reading core on a laptop and webcam</li>
                <li>English and Sinhala reading and voice</li>
                <li>Press-to-talk voice commands</li>
                <li>Object finding in the phone app</li>
                <li>First accuracy and speed numbers</li>
              </ul>
            </li>
            <li className="card pad stack g12">
              <p className="fw7 muted">From January 2027</p>
              <ul className="bullets">
                <li>Station on a Raspberry Pi</li>
                <li>Hands-free chapters with page-turn detection</li>
                <li>Hands-free wake word</li>
                <li>Testing with blind and low-vision users, after ethics approval</li>
              </ul>
            </li>
            <li className="card pad stack g12">
              <p className="fw7 muted">Later</p>
              <ul className="bullets">
                <li>More languages</li>
                <li>More object types</li>
                <li>A custom-trained object model</li>
              </ul>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
