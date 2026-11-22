import Link from 'next/link';
import { db } from '@/lib/db';
import { SITE, TEAM } from '@/lib/site';
import { DOCS } from '@/lib/docs';
import HeroDemo from '@/components/HeroDemo';
import WaitlistForm from '@/components/WaitlistForm';
import ContactForm from '@/components/ContactForm';
import {
  APP_FIND,
  APP_READ,
  Art,
  Icon,
  PROBLEM_HAND,
  PROBLEM_SQUARE,
  PRODUCT_LAPTOP,
  PRODUCT_PHONE,
  PRODUCT_STATION,
  STEP_1,
  STEP_2,
  STEP_3,
  STEP_4,
} from '@/components/art';

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
    // The site still works without the database (for example, before it is connected).
    return [];
  }
}

const WAVE = [14, 26, 40, 22, 56, 34, 70, 44, 24, 62, 80, 50, 30, 66, 38, 74, 46, 28, 58, 36, 68, 42, 20, 52, 32, 60, 24, 40, 18, 28];

function Arrow() {
  return (
    <li className="flow-arrow" aria-hidden="true">
      &rarr;
    </li>
  );
}

export default async function Home() {
  const updates = await getUpdates();

  return (
    <main id="main">
      {/* HERO */}
      <section id="top" className="hero" aria-labelledby="hero-h">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">A reading assistant for blind and low-vision people</p>
            <h1 id="hero-h" className="hero-title">
              Put a page down. <span className="mark">Hear it read.</span>
            </h1>
            <p className="hero-lead">
              SWAARA reads printed pages aloud in Sinhala and English. A fixed plate keeps every page in frame, so
              nobody has to aim a camera.
            </p>
            <div className="row g16">
              <Link className="btn" href="/#join">
                Join the waitlist
              </Link>
              <Link className="btn-line" href="/#how">
                See how it works
              </Link>
            </div>
            <p className="muted">In development. A student project at IIT Sri Lanka, with the University of Westminster.</p>
          </div>
          <HeroDemo />
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="strip" aria-label="What SWAARA does">
        <div className="wrap">
          <ul className="strip-list">
            <li>
              <span className="ico">
                <Icon name="doc" />
              </span>
              <span>
                <strong>Reads printed text</strong>
                <span className="muted block">Books, letters, bills, labels</span>
              </span>
            </li>
            <li>
              <span className="ico">
                <Icon name="waves" />
              </span>
              <span>
                <strong>Speaks it aloud</strong>
                <span className="muted block">You pick voice, speed, pauses</span>
              </span>
            </li>
            <li>
              <span className="ico">
                <Icon name="translate" />
              </span>
              <span>
                <strong>Sinhala and English</strong>
                <span className="muted block">Original text always kept</span>
              </span>
            </li>
            <li>
              <span className="ico">
                <Icon name="mic" />
              </span>
              <span>
                <strong>Works by voice</strong>
                <span className="muted block">No screen needed</span>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="sec" aria-labelledby="problem-h">
        <div className="wrap split">
          <div className="stack g20">
            <h2 id="problem-h" className="h2">
              Reading a page starts with a good photo. That is the hard part without sight.
            </h2>
            <p className="lead">
              Most phone tools ask you to hold a camera over the page, find its edges and keep still. Without sight,
              that is where reading fails, long before any text is recognised.
            </p>
            <p className="muted small">
              In one published study, 9 of 12 blind or low-vision participants found framing a page challenging (arXiv
              2408.03303).
            </p>
          </div>
          <div className="card pad compare">
            <figure className="stack g8 fig">
              <Art
                inner={PROBLEM_HAND}
                viewBox="0 0 160 190"
                className="scene"
                label="A page seen at a slant, cut off at the edge, with glare, as a hand-held phone often sees it"
              />
              <figcaption className="muted small">Hand-held: tilted, cut off, glare.</figcaption>
            </figure>
            <figure className="stack g8 fig">
              <Art
                inner={PROBLEM_SQUARE}
                viewBox="0 0 160 190"
                className="scene"
                label="A page sitting square in a corner stop, fully in frame and evenly lit"
              />
              <figcaption className="muted small">SWAARA: square in the corner, every time.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="sec sec-alt" aria-labelledby="how-h">
        <div className="wrap stack g40">
          <div className="stack g12">
            <h2 id="how-h" className="h2">
              From printed page to spoken words
            </h2>
            <p className="lead">Four steps, the same every time.</p>
          </div>
          <ol className="grid list-reset">
            <li className="card pad stack g16">
              <Art inner={STEP_1} viewBox="0 0 240 150" className="scene" />
              <div className="stack g8">
                <p className="eyebrow">Step 1</p>
                <h3 className="h3">Slide the page into the corner</h3>
                <p className="muted">A raised corner stop on the plate means the page always sits in the same place.</p>
              </div>
            </li>
            <li className="card pad stack g16">
              <Art inner={STEP_2} viewBox="0 0 240 150" className="scene" />
              <div className="stack g8">
                <p className="eyebrow">Step 2</p>
                <h3 className="h3">The camera checks the shot</h3>
                <p className="muted">
                  Steady light, overhead camera. SWAARA checks for blur, glare and dark pages, and tells you if
                  something is wrong.
                </p>
              </div>
            </li>
            <li className="card pad stack g16">
              <Art inner={STEP_3} viewBox="0 0 240 150" className="scene" />
              <div className="stack g8">
                <p className="eyebrow">Step 3</p>
                <h3 className="h3">The text is recognised</h3>
                <p className="muted">
                  Printed text becomes digital text. The original is always kept. Translation happens only if you ask,
                  and SWAARA says so aloud.
                </p>
              </div>
            </li>
            <li className="card pad stack g16">
              <Art inner={STEP_4} viewBox="0 0 240 150" className="scene" />
              <div className="stack g8">
                <p className="eyebrow">Step 4</p>
                <h3 className="h3">You hear it</h3>
                <p className="muted">A natural voice reads the page. You choose the voice, the speed and the pauses.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="sec" aria-labelledby="products-h">
        <div className="wrap stack g40">
          <div className="stack g12">
            <h2 id="products-h" className="h2">
              Three ways to read, one shared reading core
            </h2>
            <p className="lead">
              The station, the laptop reader and the phone app all use the same reading code and the same voice
              assistant.
            </p>
          </div>
          <div className="grid">
            <article className="card pad stack g16">
              <Art
                inner={PRODUCT_STATION}
                viewBox="0 0 300 180"
                className="scene"
                label="Tabletop station: a plate with a corner stop, an arm holding an overhead camera, a large button and a speaker"
              />
              <div className="stack g12 grow">
                <h3 className="h3">Tabletop station</h3>
                <p>
                  A box that sits on a table and needs no laptop or phone. Plate with a corner stop, overhead camera,
                  light, one large button, speaker and microphone.
                </p>
                <p className="muted">Place the page against the stop, press the big button, listen. It runs on a Raspberry Pi.</p>
              </div>
              <p className="status">Planned. Hardware comes after the software is proven.</p>
            </article>
            <article className="card pad stack g16">
              <Art
                inner={PRODUCT_LAPTOP}
                viewBox="0 0 300 180"
                className="scene"
                label="Laptop reader: a laptop showing large text with the spoken line highlighted, with the plate and camera arm beside it"
              />
              <div className="stack g12 grow">
                <h3 className="h3">Laptop reader</h3>
                <p>
                  The same plate and camera arm, plugged into a laptop. Large, high-contrast text follows the sentence
                  being spoken.
                </p>
                <p className="muted">Reads whole chapters, notices page turns and summarises on request. Works by keyboard or voice.</p>
              </div>
              <p className="status">First to be built.</p>
            </article>
            <article className="card pad stack g16">
              <Art
                inner={PRODUCT_PHONE}
                viewBox="0 0 300 180"
                className="scene"
                label="Phone app: a phone with a page framed by guide corners and a spoken hint"
              />
              <div className="stack g12 grow">
                <h3 className="h3">Phone app</h3>
                <p>
                  Three screens: Read, Ask and Find. It guides you to frame a page and reads packaging, prices and
                  expiry dates in a shop.
                </p>
                <p className="muted">Say &ldquo;find my bottle&rdquo; and follow beeps that speed up as you get closer. Android first.</p>
              </div>
              <p className="status">In development.</p>
            </article>
          </div>
        </div>
      </section>

      {/* APP SCREENS */}
      <section id="app" className="sec sec-alt" aria-labelledby="app-h">
        <div className="wrap stack g40">
          <div className="stack g12">
            <h2 id="app-h" className="h2">
              The phone app: Read, Ask, Find
            </h2>
            <p className="lead">
              Illustrative mockups of the planned Android app, built with Flutter. Everything is also spoken aloud.
            </p>
          </div>
          <div className="phones">
            <div className="phone-col">
              <div className="phone" role="img" aria-label="Mockup of the Read screen: a page framed by guide corners and the spoken hint, too dark, move to a lighter spot">
                <div className="phone-title">Read</div>
                <div className="phone-body" aria-hidden="true">
                  <Art inner={APP_READ} viewBox="0 0 200 230" className="scene scene-tall" />
                  <p className="hint">Too dark. Move to a lighter spot.</p>
                  <p className="muted small">The photo is taken by itself when the page is steady and fully in frame.</p>
                </div>
                <div className="phone-nav" aria-hidden="true">
                  <span className="tab tab-on">Read</span>
                  <span className="tab">Ask</span>
                  <span className="tab">Find</span>
                </div>
              </div>
              <div>
                <h3 className="h3">Read a page</h3>
                <p className="muted">Spoken hints guide the framing. No aiming by sight.</p>
              </div>
            </div>

            <div className="phone-col">
              <div className="phone" role="img" aria-label="Mockup of the Ask screen: the question when is it due, answered with the page says it is due on Friday, and a hold to talk button">
                <div className="phone-title">Ask</div>
                <div className="phone-body" aria-hidden="true">
                  <p className="bubble user">When is it due?</p>
                  <p className="bubble bot">The page says it is due on Friday.</p>
                  <p className="muted small">Answers come only from pages already read. If it is not sure, it says so.</p>
                  <div className="mic-wrap">
                    <span className="mic-btn">
                      <Icon name="mic" size={36} />
                    </span>
                    <span className="muted small">Hold to talk</span>
                  </div>
                </div>
                <div className="phone-nav" aria-hidden="true">
                  <span className="tab">Read</span>
                  <span className="tab tab-on">Ask</span>
                  <span className="tab">Find</span>
                </div>
              </div>
              <div>
                <h3 className="h3">Ask by voice</h3>
                <p className="muted">Questions and summaries about what was read.</p>
              </div>
            </div>

            <div className="phone-col">
              <div className="phone" role="img" aria-label="Mockup of the Find screen: a radar view with a bottle a little to the left, about 2 metres away, and beeps getting faster">
                <div className="phone-title">Find</div>
                <div className="phone-body" aria-hidden="true">
                  <Art inner={APP_FIND} viewBox="0 0 200 200" className="scene scene-radar" />
                  <div className="stack g4">
                    <p className="found-name">Bottle</p>
                    <p className="muted">A little left. About 2 metres.</p>
                  </div>
                  <div className="beeps">
                    <span style={{ height: 10 }} className="on" />
                    <span style={{ height: 18 }} className="on" />
                    <span style={{ height: 26 }} className="on" />
                    <span style={{ height: 34 }} />
                    <span style={{ height: 34 }} />
                  </div>
                  <p className="muted small">Beeps speed up as you get closer. Runs on the phone, so no internet is needed.</p>
                </div>
                <div className="phone-nav" aria-hidden="true">
                  <span className="tab">Read</span>
                  <span className="tab">Ask</span>
                  <span className="tab tab-on">Find</span>
                </div>
              </div>
              <div>
                <h3 className="h3">Find an object</h3>
                <p className="muted">Say what you are looking for, sweep the room, follow the beeps.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VOICE */}
      <section className="sec" aria-labelledby="voice-h">
        <div className="wrap split split-center">
          <div className="stack g24">
            <h2 id="voice-h" className="h2">
              Everything works by voice. No touching needed.
            </h2>
            <ul className="chips list-reset">
              <li className="chip">&ldquo;Read this page&rdquo;</li>
              <li className="chip">&ldquo;Summarise the chapter&rdquo;</li>
              <li className="chip">&ldquo;Find my bottle&rdquo;</li>
              <li className="chip">&ldquo;Slower, in English&rdquo;</li>
            </ul>
            <p className="lead">
              Press-to-talk comes first. A hands-free wake word is added later, detected on the device itself.
            </p>
            <div className="wave" aria-hidden="true">
              {WAVE.map((h, i) => (
                <span key={i} style={{ height: h }} />
              ))}
            </div>
          </div>
          <div className="card pad stack g16">
            <h3 className="h3">Honest-answer rules</h3>
            <ul className="rules list-reset">
              <li>
                <span className="ico">
                  <Icon name="docCheck" size={22} />
                </span>
                <span>It answers only from pages it has read.</span>
              </li>
              <li>
                <span className="ico">
                  <Icon name="help" size={22} />
                </span>
                <span>It says so when it is unsure.</span>
              </li>
              <li>
                <span className="ico">
                  <Icon name="pill" size={22} />
                </span>
                <span>It gives no medical advice, and reads medicine labels exactly as printed.</span>
              </li>
              <li>
                <span className="ico">
                  <Icon name="micOff" size={22} />
                </span>
                <span>A physical mute switch turns the microphone off.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* LANGUAGES */}
      <section id="languages" className="sec sec-alt" aria-labelledby="lang-h">
        <div className="wrap stack g32">
          <div className="stack g12">
            <h2 id="lang-h" className="h2">
              Sinhala and English, from the start
            </h2>
            <p className="lead">
              Reading, speech recognition and spoken output work in both languages. The original text is always
              available. Translation is optional and announced.
            </p>
          </div>

          <div className="card pad stack g20">
            <h3 className="h3">When you read a page</h3>
            <ol className="flow list-reset">
              <li className="flow-step">
                <strong>Printed page</strong>
                <span className="muted small block">Sinhala or English</span>
              </li>
              <Arrow />
              <li className="flow-step">
                <strong>Text recognition</strong>
                <span className="muted small block">Page becomes text</span>
              </li>
              <Arrow />
              <li className="flow-step key">
                <strong>Original text</strong>
                <span className="muted small block">Always kept</span>
              </li>
              <Arrow />
              <li className="flow-step dashed">
                <strong>Translation</strong>
                <span className="muted small block">Only if you ask, announced aloud</span>
              </li>
              <Arrow />
              <li className="flow-step warm">
                <strong>Voice</strong>
                <span className="small block">Your voice, speed and pauses</span>
              </li>
            </ol>
          </div>

          <div className="card pad stack g20">
            <h3 className="h3">When you ask a question</h3>
            <ol className="flow list-reset">
              <li className="flow-step">
                <strong>Your voice</strong>
                <span className="muted small block">Sinhala or English</span>
              </li>
              <Arrow />
              <li className="flow-step">
                <strong>Speech to text</strong>
                <span className="muted small block">Your words as text</span>
              </li>
              <Arrow />
              <li className="flow-step key">
                <strong>Answer from pages read</strong>
                <span className="muted small block">Never from guesses</span>
              </li>
              <Arrow />
              <li className="flow-step warm">
                <strong>Voice</strong>
                <span className="small block">Spoken back to you</span>
              </li>
            </ol>
          </div>

          <p className="muted measure">
            Sinhala on real photographed pages is the hardest part. We are comparing text-recognition and voice services
            on real pages in both languages, and we will publish what we find. SWAARA reads printed text; handwriting
            is not supported.
          </p>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="sec" aria-labelledby="trust-h">
        <div className="wrap stack g40">
          <h2 id="trust-h" className="h2 measure">
            Your documents stay yours
          </h2>
          <div className="grid">
            <div className="card pad stack g12">
              <span className="ico">
                <Icon name="shieldCheck" />
              </span>
              <h3 className="h3">Consent first</h3>
              <p className="muted">
                SWAARA asks before it sends a page to a cloud service for recognition, translation or speech.
              </p>
            </div>
            <div className="card pad stack g12">
              <span className="ico">
                <Icon name="lock" />
              </span>
              <h3 className="h3">No public sharing of audio</h3>
              <p className="muted">
                Under the Marrakesh Treaty, accessible copies are for people with print disabilities. Saved text or
                audio can be exported only to a school or an authorised organisation.
              </p>
            </div>
            <div className="card pad stack g12">
              <span className="ico">
                <Icon name="doc" />
              </span>
              <h3 className="h3">Bills and letters</h3>
              <p className="muted">
                We are reviewing what Sri Lanka&apos;s data protection law (PDPA) requires for images and text of
                personal documents, and will publish the result.
              </p>
            </div>
          </div>
          <p>
            <Link href="/docs/privacy-and-ethics">Read more about privacy and ethics</Link>
          </p>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="sec sec-alt" aria-labelledby="road-h">
        <div className="wrap stack g40">
          <div className="stack g12">
            <h2 id="road-h" className="h2">
              Where SWAARA is now
            </h2>
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

      {/* DOCS */}
      <section id="docs" className="sec" aria-labelledby="docs-h">
        <div className="wrap stack g40">
          <div className="stack g12">
            <h2 id="docs-h" className="h2">
              Documentation
            </h2>
            <p className="lead">Written as the project is built, in English first and Sinhala to follow.</p>
          </div>
          <ul className="grid list-reset">
            {DOCS.slice(0, 6).map((d) => (
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
          <p>
            <Link href="/docs">See all documentation</Link>
          </p>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="sec sec-alt" aria-labelledby="join-h">
        <div className="wrap split">
          <div className="stack g20">
            <h2 id="join-h" className="h2">
              Get updates when SWAARA is ready to try
            </h2>
            <p className="lead">
              We will email only about SWAARA progress and testing. Your address is used for nothing else. You will get a
              confirmation email straight away.
            </p>
            <div className="stack g8 rule-top">
              <h3 className="h3">Questions or other ways to help</h3>
              <p className="muted">
                Write to us at{' '}
                <a href={`mailto:${SITE.teamEmail}`}>{SITE.teamEmail}</a>, or use the form below.
              </p>
            </div>
          </div>
          <WaitlistForm />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="sec" aria-labelledby="contact-h">
        <div className="wrap split">
          <div className="stack g20">
            <h2 id="contact-h" className="h2">
              Schools, organisations and testers
            </h2>
            <p className="lead">
              Want to help test SWAARA, or use it in a school? Tell us a little about you. Testing with blind and
              low-vision users starts only after ethics approval, so we may not be able to begin straight away.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* TEAM */}
      <section className="sec sec-alt" aria-labelledby="team-h">
        <div className="wrap stack g32">
          <div className="stack g8">
            <h2 id="team-h" className="h2">
              The team
            </h2>
            <p className="lead">
              Group CS-01, Software Development Group Project, IIT Sri Lanka and the University of Westminster.
            </p>
          </div>
          <ul className="team list-reset">
            {TEAM.map((m) => (
              <li key={m.name} className="card member">
                <span className="avatar" aria-hidden="true">
                  {m.initial}
                </span>
                <span>
                  <strong className="block">{m.name}</strong>
                  <span className="muted">{m.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
