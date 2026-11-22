import type { Metadata } from 'next';
import Link from 'next/link';
import { DOCS } from '@/lib/docs';
import { Icon } from '@/components/art';

export const metadata: Metadata = {
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
      </div>
    </main>
  );
}
