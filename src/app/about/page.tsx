import type { Metadata } from 'next';
import { SITE, TEAM } from '@/lib/site';
import { APP_FIND, APP_READ, Art, Icon, PROBLEM_HAND, PROBLEM_SQUARE } from '@/components/art';

export const metadata: Metadata = {
  title: 'About SWAARA',
  description:
    'The problem SWAARA solves, how its voice and languages work, the phone app screens, and the team behind it.',
};

const WAVE = [14, 26, 40, 22, 56, 34, 70, 44, 24, 62, 80, 50, 30, 66, 38, 74, 46, 28, 58, 36, 68, 42, 20, 52, 32, 60, 24, 40, 18, 28];

function Arrow() {
  return (
    <li className="flow-arrow" aria-hidden="true">
      &rarr;
    </li>
  );
}

export default function AboutPage() {
  return (
    <main id="main">
      <section className="sec sec-head" aria-labelledby="about-h">
        <div className="wrap stack g12">
          <h1 id="about-h" className="h2">
            About SWAARA
          </h1>
          <p className="lead">
            The problem we are solving, how SWAARA speaks and listens, the phone app screens and the people building it.
          </p>
        </div>
      </section>

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

      <section className="sec sec-alt" aria-labelledby="lang-h">
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

      <section className="sec" aria-labelledby="team-h">
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
          <p>
            <a href={SITE.githubUrl} rel="noopener noreferrer" className="tap">
              SWAARA on GitHub
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
