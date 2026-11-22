import type { Metadata } from 'next';
import Link from 'next/link';
import { DOCS } from '@/lib/docs';
import { Icon } from '@/components/art';

export const metadata: Metadata = {
  alternates: { canonical: '/docs' },
  title: 'Documentation',
  description: 'What SWAARA is, how it reads a page, how to use each product, and how we handle privacy and testing.',
};

export default function DocsIndex() {
  return (
    <main id="main" className="sec">
      <div className="wrap stack g32">
        <div className="stack g12">
          <h1 className="h2">Documentation</h1>
          <p className="lead">
            Written as the project is built. Parts that are not built yet are marked as planned. English first, Sinhala to
            follow.
          </p>
        </div>
        <ul className="grid list-reset">
          {DOCS.map((d) => (
            <li key={d.slug}>
              <Link href={`/docs/${d.slug}`} className="card doc-card">
                <span className="ico">
                  <Icon name={d.icon} />
                </span>
                <span>
                  <strong className="doc-title">{d.title}</strong>
                  <span className="muted block">{d.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="stack g12 rule-top">
          <h2 className="h3">More about SWAARA</h2>
          <ul className="bullets">
            <li>
              <Link href="/about">About SWAARA</Link>: the problem, voice and languages, phone app screens and the team
            </li>
            <li>
              <Link href="/roadmap">Roadmap and updates</Link>: where the project is now and what comes next
            </li>
            <li>
              <Link href="/contact">Contact us</Link>: questions, schools, organisations and testers
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
