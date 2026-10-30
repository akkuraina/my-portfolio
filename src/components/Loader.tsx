'use client';

import { useEffect, useState } from 'react';

// Minimum time the loader stays up, measured from navigation start, so fast
// loads don't flash it and slow loads hide it the moment the page is interactive.
const MIN_VISIBLE_MS = 900;
const FADE_MS = 450;

const dots = ['var(--accent-2)', 'var(--accent)', 'var(--accent-3)', 'var(--accent-4)'];

export default function Loader() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible');

  useEffect(() => {
    const wait = Math.max(0, MIN_VISIBLE_MS - performance.now());
    const fadeTimer = setTimeout(() => setPhase('fading'), wait);
    const goneTimer = setTimeout(() => setPhase('gone'), wait + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`site-loader fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-canvas transition-[opacity,transform] ease-out ${
        phase === 'fading' ? 'pointer-events-none scale-[1.02] opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="relative flex size-24 items-center justify-center">
        <div className="loader-ring absolute inset-0 rounded-full" />
        <span className="text-gradient font-serif text-3xl font-bold tracking-tight">AR</span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span>~/loading</span>
          <span className="flex gap-1" aria-hidden="true">
            {dots.map((color, i) => (
              <span
                key={color}
                className="loader-dot inline-block size-1.5 rounded-full"
                style={{ background: color, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </span>
        </div>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-hairline">
          <div className="loader-bar h-full w-2/5 rounded-full" style={{ background: 'var(--gradient-pop)' }} />
        </div>
      </div>
    </div>
  );
}
