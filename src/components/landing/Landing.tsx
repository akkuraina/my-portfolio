'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Monoton, VT323, Bungee, Yellowtail, Bebas_Neue, Rubik_Mono_One } from 'next/font/google';
import { useTheme } from '../ThemeProvider';
import { PALETTES } from './palettes';

// three.js only loads on the client, after first paint.
const LandingScene = dynamic(() => import('./LandingScene'), { ssr: false });

const monoton = Monoton({ subsets: ['latin'], weight: '400', display: 'swap' });
const vt323 = VT323({ subsets: ['latin'], weight: '400', display: 'swap' });
const bungee = Bungee({ subsets: ['latin'], weight: '400', display: 'swap' });
const yellowtail = Yellowtail({ subsets: ['latin'], weight: '400', display: 'swap' });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', display: 'swap' });
const rubikMono = Rubik_Mono_One({ subsets: ['latin'], weight: '400', display: 'swap' });

// Each display face has different proportions, so scale them to a shared optical size.
const FACES = [
  { className: bungee.className, scale: 0.86 },
  { className: monoton.className, scale: 0.9 },
  { className: 'font-serif italic font-black', scale: 1.02 },
  { className: vt323.className, scale: 1.3 },
  { className: bebas.className, scale: 1.18 },
  { className: yellowtail.className, scale: 1.12 },
  { className: rubikMono.className, scale: 0.78 },
];

const COLORS = ['var(--accent)', 'var(--accent-2)', 'var(--ink)', 'var(--accent-4)', 'var(--accent-3)'];

// Hand-picked face + colour per letter so neighbours never repeat.
const LINES: { char: string; face: number; color: number }[][] = [
  [
    { char: 'A', face: 0, color: 0 },
    { char: 'K', face: 1, color: 1 },
    { char: 'A', face: 2, color: 2 },
    { char: 'N', face: 3, color: 3 },
    { char: 'K', face: 4, color: 4 },
    { char: 'S', face: 5, color: 0 },
    { char: 'H', face: 6, color: 1 },
    { char: 'A', face: 1, color: 3 },
  ],
  [
    { char: 'R', face: 2, color: 4 },
    { char: 'A', face: 3, color: 0 },
    { char: 'I', face: 0, color: 3 },
    { char: 'N', face: 5, color: 2 },
    { char: 'A', face: 4, color: 1 },
  ],
];

const INTRO = [
  { char: 'h', face: 3 },
  { char: 'i', face: 5 },
  { char: ',', face: 0 },
  { char: ' ', face: 0 },
  { char: 'i', face: 6 },
  { char: "'", face: 0 },
  { char: 'm', face: 2 },
];

function Letter({ char, face, color, delay, animate }: { char: string; face: number; color: number; delay: number; animate: boolean }) {
  // Hovering a letter swaps it to the next display face.
  const [current, setCurrent] = useState(face);
  const f = FACES[current % FACES.length];
  return (
    <motion.span
      aria-hidden="true"
      initial={animate ? { opacity: 0, y: 40, rotate: -8 } : false}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
      onPointerEnter={() => setCurrent((c) => c + 1)}
      className={`${f.className} inline-block cursor-default select-none leading-none transition-transform duration-200 hover:-translate-y-1 hover:scale-110`}
      style={{
        color: COLORS[color],
        fontSize: `calc(var(--landing-size) * ${f.scale})`,
        textShadow: '0 4px 24px color-mix(in srgb, var(--canvas) 70%, transparent)',
      }}
    >
      {char}
    </motion.span>
  );
}

export default function Landing() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);

  // Stop rendering the scene once the panel has covered it, or when the tab is hidden.
  useEffect(() => {
    const update = () => {
      const height = sectionRef.current?.offsetHeight ?? window.innerHeight;
      setActive(window.scrollY < height && document.visibilityState === 'visible');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    document.addEventListener('visibilitychange', update);
    return () => {
      window.removeEventListener('scroll', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  const letterDelay = 0.15;

  return (
    <section
      ref={sectionRef}
      id="top"
      data-landing
      aria-label="Introduction"
      className="sticky top-0 h-[100svh] min-h-[480px] overflow-hidden"
      // Size by width and height, so both lines fit on short laptop screens too.
      style={{ ['--landing-size' as string]: 'clamp(3rem, min(12.5vw, 15svh), 9.5rem)' }}
    >
      <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        <LandingScene palette={PALETTES[theme]} active={active} reduceMotion={reduceMotion} onReady={() => setReady(true)} />
      </div>

      {/* Soft halo behind the name so it stays readable over the scene */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_38%_at_50%_50%,color-mix(in_srgb,var(--canvas)_78%,transparent)_0%,transparent_100%)]"
      />

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <p aria-hidden="true" className="mb-3 flex items-baseline gap-[0.18em] text-xl tracking-[0.2em] text-ink sm:text-2xl">
          {INTRO.map((l, i) =>
            l.char === ' ' ? (
              <span key={i} className="w-3" />
            ) : (
              <span key={i} className={FACES[l.face].className} style={{ fontSize: `${FACES[l.face].scale}em` }}>
                {l.char}
              </span>
            ),
          )}
        </p>

        <h1 aria-label="Akanksha Raina" className="pointer-events-auto flex flex-col items-center gap-1 sm:gap-2">
          {LINES.map((line, li) => (
            <span key={li} className="flex items-baseline justify-center gap-[0.02em]">
              {line.map((l, i) => (
                <Letter
                  key={i}
                  {...l}
                  animate={!reduceMotion}
                  delay={letterDelay + (li * LINES[0].length + i) * 0.05}
                />
              ))}
            </span>
          ))}
        </h1>
      </div>

      <a
        href="#about"
        className="group absolute bottom-8 left-1/2 sm:bottom-10 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        ~/scroll
        <span className="flex size-10 items-center justify-center rounded-full border border-hairline bg-surface/60 backdrop-blur transition-colors group-hover:border-accent">
          <ArrowDown className="size-4 text-accent motion-safe:animate-bounce" />
        </span>
      </a>
    </section>
  );
}
