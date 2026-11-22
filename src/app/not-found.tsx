import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="sec">
      <div className="wrap stack g16">
        <h1 className="h2">This page could not be found</h1>
        <p className="lead">The link may be old, or the page may have moved.</p>
        <p>
          <Link className="btn" href="/">
            Go to the home page
          </Link>
        </p>
      </div>
    </main>
  );
}
