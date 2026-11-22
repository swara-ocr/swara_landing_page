import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Accessibility statement',
  description: 'How this website is built to work for people who are blind or have low vision, and what we have not tested yet.',
};

export default function AccessibilityPage() {
  return (
    <main id="main" className="sec">
      <div className="wrap narrow">
        <article className="prose">
          <p className="eyebrow">Accessibility</p>
          <h1 className="h2">Accessibility statement</h1>
          <p className="lead">
            SWAARA is made for people who are blind or have low vision, so this website has to work for them first. We aim
            to meet the Web Content Accessibility Guidelines (WCAG) 2.2, level AA.
          </p>
          <p className="note">Last updated 22 November 2026. This is an early version, and we have more testing to do.</p>

          <h2 className="prose-h">What we have done</h2>
          <ul>
            <li>Pages use headings, landmarks and lists, so screen readers can move around them.</li>
            <li>A &ldquo;Skip to content&rdquo; link is the first thing a keyboard user reaches.</li>
            <li>Everything can be used by keyboard, and the focus outline is always visible.</li>
            <li>Text is large, in a typeface made to be easy to tell letters apart, and meets contrast requirements in both the dark and the light colour schemes.</li>
            <li>There is a button to switch between dark and light colours, and the site follows your device setting by default.</li>
            <li>Every form field has a label, and form messages are announced to screen readers.</li>
            <li>Pictures that carry meaning have a text description. Decorative pictures are hidden from screen readers.</li>
            <li>The reading demo on the home page can be paused, and it starts paused if your device asks to reduce motion.</li>
          </ul>

          <h2 className="prose-h">What we have not done yet</h2>
          <ul>
            <li>The site is in English only for now. A Sinhala version is planned and needs a careful, reviewed translation.</li>
            <li>The &ldquo;Listen to this label&rdquo; demo uses your browser&apos;s built-in voice, so it sounds different on different devices.</li>
            <li>We have not yet tested the site with blind and low-vision users. We will do that, with ethics approval, and fix what we find.</li>
          </ul>

          <h2 className="prose-h">Tell us about a problem</h2>
          <p>
            If something on this site is hard to use, please write to{' '}
            <a href={`mailto:${SITE.teamEmail}`}>{SITE.teamEmail}</a>. Tell us the page, what you were trying to do and
            the device or screen reader you use. We will reply and fix it.
          </p>
        </article>
      </div>
    </main>
  );
}
