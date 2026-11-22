import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DOCS, getDoc } from '@/lib/docs';
import DocBlocks from '@/components/DocBlocks';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const doc = getDoc(params.slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.summary };
}

export default function DocPage({ params }: Props) {
  const doc = getDoc(params.slug);
  if (!doc) notFound();

  const index = DOCS.findIndex((d) => d.slug === doc.slug);
  const prev = index > 0 ? DOCS[index - 1] : null;
  const next = index < DOCS.length - 1 ? DOCS[index + 1] : null;

  return (
    <main id="main" className="sec">
      <div className="wrap docs-layout">
        <nav className="docs-nav card" aria-label="Documentation">
          <p className="fw7 docs-nav-title">Documentation</p>
          <ul className="list-reset stack g4">
            {DOCS.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/docs/${d.slug}`}
                  className={d.slug === doc.slug ? 'docs-link current' : 'docs-link'}
                  aria-current={d.slug === doc.slug ? 'page' : undefined}
                >
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article className="docs-article">
          <p className="eyebrow">
            <Link href="/docs" className="plain tap">
              Documentation
            </Link>
          </p>
          <h1 className="h2">{doc.title}</h1>
          <p className="lead">{doc.summary}</p>
          <DocBlocks blocks={doc.blocks} />

          <nav className="pager" aria-label="More documentation">
            {prev ? (
              <Link href={`/docs/${prev.slug}`} className="card pager-link">
                <span className="muted small">Previous</span>
                <strong>{prev.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/docs/${next.slug}`} className="card pager-link pager-next">
                <span className="muted small">Next</span>
                <strong>{next.title}</strong>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </div>
    </main>
  );
}
