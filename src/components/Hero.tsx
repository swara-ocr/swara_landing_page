'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Art, RIG_INNER } from './art';

const WORDS = ['Take', 'one', 'tablet', 'twice', 'daily', 'after', 'meals.'];

export default function Hero() {
  const [word, setWord] = useState(2);
  const [playing, setPlaying] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [note, setNote] = useState('');

  // Start paused for people who asked their device to reduce motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false);
    return () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {
        /* nothing to cancel */
      }
    };
  }, []);

  // Moves the highlight along the words, like a spoken sentence.
  useEffect(() => {
    if (!playing || speaking) return;
    const id = setInterval(() => setWord((w) => (w + 1) % (WORDS.length + 2)), 620);
    return () => clearInterval(id);
  }, [playing, speaking]);

  function listen() {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    if (!synth || !('SpeechSynthesisUtterance' in window)) {
      setNote('Audio is not supported in this browser.');
      return;
    }
    try {
      synth.cancel();
      const starts: number[] = [];
      let position = 0;
      WORDS.forEach((w) => {
        starts.push(position);
        position += w.length + 1;
      });
      const utterance = new SpeechSynthesisUtterance(WORDS.join(' '));
      utterance.rate = 0.9;
      utterance.onboundary = (event) => {
        let current = 0;
        for (let i = 0; i < starts.length; i++) if (event.charIndex >= starts[i]) current = i;
        setWord(current);
      };
      const finish = () => {
        setSpeaking(false);
        setNote('');
        setWord(-1);
      };
      utterance.onend = finish;
      utterance.onerror = finish;
      setSpeaking(true);
      setNote('Reading aloud…');
      synth.speak(utterance);
    } catch {
      setSpeaking(false);
      setNote('Audio is not available right now.');
    }
  }

  return (
    <div className="hero-grid">
      <div className="hero-copy">
        <h1 id="hero-h" className="hero-title">
          Put a page down. <span className="mark">Hear it read.</span>
        </h1>
        <p className="hero-lead">SWAARA reads printed pages aloud in Sinhala and English.</p>
        <div className="row g16">
          <Link className="btn" href="/#join">
            Join the waitlist
          </Link>
          <button type="button" className="btn-line" onClick={listen}>
            Listen to this label
          </button>
        </div>
      </div>
      <div className="demo">
        <div className="rig" role="group" aria-label="Demonstration: the SWAARA station reading a medicine label aloud">
          <Art inner={RIG_INNER} viewBox="0 0 560 440" className="rig-art" />
          <div className="rig-paper">
            <p className="rig-label">Pharmacy label</p>
            <p className="rig-sentence">
              {WORDS.map((w, i) => (
                <span key={w + i} className={i === word ? 'word on' : 'word'}>
                  {w}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="demo-controls">
          <button
            type="button"
            className="btn-line btn-small"
            aria-pressed={!playing}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? 'Pause demo' : 'Play demo'}
          </button>
        </div>
        <p className="demo-note muted" aria-live="polite">
          {note || 'Demo: the highlight follows the spoken word.'}
        </p>
      </div>
    </div>
  );
}
