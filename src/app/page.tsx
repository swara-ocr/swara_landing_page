import Link from 'next/link';
import { SITE } from '@/lib/site';
import Hero from '@/components/Hero';
import WaitlistForm from '@/components/WaitlistForm';
import {
  Art,
  Icon,
  PRODUCT_LAPTOP,
  PRODUCT_PHONE,
  PRODUCT_STATION,
  STEP_1,
  STEP_4,
  STEP_PRESS,
} from '@/components/art';

// A short, picture-led page. The detail lives on /docs, /about and /roadmap.

const WAVE = [14, 26, 40, 22, 56, 34, 70, 44, 24, 62, 80, 50, 30, 66, 38, 74, 46, 28, 58, 36, 68, 42, 20, 52, 32, 60, 24, 40, 18, 28];

const STEPS = [
  { art: STEP_1, title: 'Place the page', text: 'Slide it into the corner.' },
  { art: STEP_PRESS, title: 'Press the button', text: 'One big button starts reading.' },
  { art: STEP_4, title: 'Listen', text: 'A natural voice reads aloud.' },
];

const PRODUCTS = [
  {
    art: PRODUCT_STATION,
    name: 'Tabletop station',
    line: 'Needs no laptop or phone.',
    status: 'Planned',
    label: 'Tabletop station: a plate with a corner stop, an arm holding an overhead camera, a large button and a speaker',
  },
  {
    art: PRODUCT_LAPTOP,
    name: 'Laptop reader',
    line: 'Large text follows the spoken words.',
    status: 'In development',
    label: 'Laptop reader: a laptop showing large text with the spoken line highlighted, with the plate and camera arm beside it',
  },
  {
    art: PRODUCT_PHONE,
    name: 'Phone app',
    line: 'Frames pages and finds things by voice.',
    status: 'In development',
    label: 'Phone app: a phone with a page framed by guide corners and a spoken hint',
  },
];

export default function Home() {
  return (
    <main id="main">
      {/* HERO */}
      <section id="top" className="hero" aria-labelledby="hero-h">
        <div className="wrap">
          <Hero />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="sec sec-alt" aria-labelledby="how-h">
        <div className="wrap stack g40">
          <h2 id="how-h" className="h2">
            How it works
          </h2>
          <ol className="grid list-reset">
            {STEPS.map((step, i) => (
              <li key={step.title} className="card pad stack g16">
                <Art inner={step.art} viewBox="0 0 240 150" className="scene" />
                <div className="row g12">
                  <span className="avatar" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="grow">
                    <h3 className="h3">{step.title}</h3>
                    <p className="muted">{step.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="sec" aria-labelledby="products-h">
        <div className="wrap stack g40">
          <h2 id="products-h" className="h2">
            Three ways to read
          </h2>
          <ul className="grid list-reset">
            {PRODUCTS.map((p) => (
              <li key={p.name} className="card pad stack g16">
                <Art inner={p.art} viewBox="0 0 300 180" className="scene" label={p.label} />
                <div className="stack g8 grow">
                  <h3 className="h3">{p.name}</h3>
                  <p className="muted">{p.line}</p>
                </div>
                <p className="status">{p.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VOICE AND LANGUAGES */}
      <section id="languages" className="sec sec-alt" aria-labelledby="voice-h">
        <div className="wrap split split-center">
          <div className="stack g20">
            <h2 id="voice-h" className="h2">
              Voice and languages
            </h2>
            <p className="lead">Every product works by voice. SWAARA understands and speaks Sinhala and English.</p>
            <ul className="chips list-reset">
              <li className="chip">Sinhala</li>
              <li className="chip">English</li>
              <li className="chip chip-line">&ldquo;Read this page&rdquo;</li>
              <li className="chip chip-line">&ldquo;Slower, in English&rdquo;</li>
            </ul>
          </div>
          <div className="wave" aria-hidden="true">
            {WAVE.map((h, i) => (
              <span key={i} style={{ height: h }} />
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="strip" aria-label="Privacy">
        <div className="wrap privacy-line">
          <span className="ico">
            <Icon name="shieldCheck" />
          </span>
          <p className="grow">We ask before using the cloud, give no medical advice and never share audio publicly.</p>
          <Link href="/privacy" className="tap">
            Privacy
          </Link>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="join" className="sec" aria-labelledby="join-h">
        <div className="wrap split">
          <div className="stack g20">
            <h2 id="join-h" className="h2">
              Join the waitlist
            </h2>
            <p className="lead">Get updates when SWAARA is ready to try. Your email is used for nothing else.</p>
            <p>
              <Link href="/contact" className="tap">
                Contact us
              </Link>
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>
    </main>
  );
}
