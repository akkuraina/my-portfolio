'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { MapPin, RotateCw } from 'lucide-react';
import SectionTag from './SectionTag';
import { experiences, type Experience as ExperienceItem } from '../data/experience';

const ACCENTS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)', 'var(--accent-4)'];

// Vine geometry: two sine strands in a 40 x 1000 viewBox, stretched to the timeline's height.
// One full twist per experience, so the strands cross at each card's node.
const VB_W = 40;
const VB_H = 1000;
const AMP = 11;
const TURNS = experiences.length;

const strandX = (t: number, phase: number) => VB_W / 2 + AMP * Math.sin(t * TURNS * 2 * Math.PI + phase);

function strandPath(phase: number) {
  const points: string[] = [];
  for (let y = 0; y <= VB_H; y += 10) points.push(`${strandX(y / VB_H, phase).toFixed(2)} ${y}`);
  return `M ${points.join(' L ')}`;
}

const STRANDS = [
  { d: strandPath(0), width: 3 },
  { d: strandPath(Math.PI), width: 2 },
];

// Deterministic "stardust" around the vine (no Math.random, so server and client markup match).
const STARDUST = Array.from({ length: 30 }, (_, i) => ({
  top: ((i * 37) % 100) + ((i * 13) % 7) / 10,
  offset: ((i * 53) % 44) - 22,
  size: 2 + (i % 3),
  delay: ((i * 0.37) % 2.8).toFixed(2),
  color: ACCENTS[i % ACCENTS.length],
}));

function Vine({ progress }: { progress: MotionValue<number> }) {
  const clipPath = useTransform(progress, (p) => `inset(0 0 ${(1 - p) * 100}% 0)`);
  const tipTop = useTransform(progress, (p) => `${p * 100}%`);
  const tipLeft = useTransform(progress, (p) => `${(strandX(p, 0) / VB_W) * 100}%`);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-10 md:left-1/2 md:-translate-x-1/2">
      {/* Faint full-length strands */}
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none">
        {STRANDS.map((s) => (
          <path key={s.d} d={s.d} fill="none" stroke="var(--hairline)" strokeWidth={s.width} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      {/* Colored strands, revealed top-down as you scroll */}
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="vine-gradient" x1="0" y1="0" x2="0" y2={VB_H} gradientUnits="userSpaceOnUse">
              <stop offset="0%" style={{ stopColor: 'var(--accent)' }} />
              <stop offset="33%" style={{ stopColor: 'var(--accent-2)' }} />
              <stop offset="66%" style={{ stopColor: 'var(--accent-3)' }} />
              <stop offset="100%" style={{ stopColor: 'var(--accent-4)' }} />
            </linearGradient>
          </defs>
          {STRANDS.map((s) => (
            <path
              key={s.d}
              d={s.d}
              fill="none"
              stroke="url(#vine-gradient)"
              strokeWidth={s.width}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </motion.div>

      {/* Stardust */}
      {STARDUST.map((dot, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full"
          style={{
            top: `${dot.top}%`,
            left: `calc(50% + ${dot.offset}px)`,
            width: dot.size,
            height: dot.size,
            background: dot.color,
            boxShadow: `0 0 6px ${dot.color}`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}

      {/* Glowing tip that rides the vine */}
      <motion.span
        className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          top: tipTop,
          left: tipLeft,
          background: 'var(--gradient-pop)',
          boxShadow: '0 0 18px 5px color-mix(in srgb, var(--accent) 55%, transparent)',
        }}
      />
    </div>
  );
}

function FlipCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];
  const number = String(experiences.length - index).padStart(2, '0');
  // First bullet is the front-face highlight; the rest live on the back.
  const [highlight, ...rest] = exp.bullets;

  // On touch screens, tapping anywhere on the card flips it; hover devices flip on hover.
  const onCardClick = () => {
    if (window.matchMedia('(hover: none)').matches) setFlipped((f) => !f);
  };

  return (
    <div className="group relative [perspective:1400px]">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-hairline bg-surface/80 text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <RotateCw className={`size-4 transition-transform duration-500 motion-reduce:transition-none ${flipped ? 'rotate-180' : ''}`} />
        <span className="sr-only">
          {flipped ? 'Show summary' : 'Show details'} for {exp.company}
        </span>
      </button>

      <div
        onClick={onCardClick}
        className={`grid transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${
          flipped ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'
        }`}
      >
        {/* Front: who, when, where */}
        <article className="backface-hidden relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface p-6 pr-14 shadow-lg [grid-area:1/1]">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 right-3 select-none font-serif text-[7rem] font-bold leading-none opacity-[0.12]"
            style={{ color: accent }}
          >
            {number}
          </span>

          <p className="font-mono text-xs font-semibold" style={{ color: accent }}>
            {exp.dates}
          </p>
          <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-ink">{exp.company}</h3>
          <p className="mt-1 text-sm font-medium text-ink/80">{exp.role}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <span className="inline-flex items-center gap-1 rounded-md border border-hairline px-2.5 py-1">
              <MapPin className="size-3" style={{ color: accent }} />
              {exp.location}
            </span>
            <span className="rounded-md bg-accent-tint px-2.5 py-1 font-medium text-accent">{exp.mode}</span>
          </div>

          <p className="relative mt-5 text-sm leading-6 text-ink/85">{highlight}</p>

          <ul className="relative mt-5 flex flex-wrap gap-1.5">
            {exp.tech.map((t) => (
              <li key={t} className="rounded-md border border-hairline bg-canvas/60 px-2 py-0.5 font-mono text-[11px] text-muted">
                {t}
              </li>
            ))}
          </ul>

          <p aria-hidden="true" className="relative mt-auto pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted/70">
            <span className="hidden [@media(hover:hover)]:inline">Hover to flip ↻</span>
            <span className="[@media(hover:hover)]:hidden">Tap to flip ↻</span>
          </p>
        </article>

        {/* Back: what I did */}
        <article
          className="backface-hidden rounded-2xl border p-6 pr-14 shadow-lg [grid-area:1/1] [transform:rotateY(180deg)]"
          style={{
            borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
            background: `linear-gradient(160deg, color-mix(in srgb, ${accent} 16%, var(--surface)) 0%, var(--surface) 70%)`,
          }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: accent }}>
            More from {exp.company}
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
            {rest.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                <span className="text-ink/85">{bullet}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 55%'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const fullProgress = useMotionValue(1);
  const progress = reduceMotion ? fullProgress : smoothProgress;

  return (
    <section ref={sectionRef} id="experience" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20 sm:px-6">
      <div className="mb-12">
        <SectionTag text="~/experience" start={isInView} />
        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">Deploy History.</h2>
      </div>

      <div ref={timelineRef} className="relative">
        <Vine progress={progress} />

        <ol className="relative flex flex-col gap-12 md:gap-16">
          {experiences.map((exp, index) => {
            const isRight = index % 2 === 1;
            const accent = ACCENTS[index % ACCENTS.length];
            return (
              <li key={exp.company} className="relative pl-14 md:grid md:grid-cols-2 md:gap-28 md:pl-0">
                {/* Node on the vine */}
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-8 size-4 -translate-x-1/2 rounded-full ring-4 ring-canvas md:left-1/2"
                  style={{ background: accent, boxShadow: `0 0 16px ${accent}` }}
                />
                {/* Tendril from node to card */}
                <span
                  aria-hidden="true"
                  className={`absolute top-10 h-0.5 w-9 left-5 md:w-14 ${isRight ? 'md:left-1/2' : 'md:left-[calc(50%-3.5rem)]'}`}
                  style={{ background: accent, opacity: 0.55 }}
                />

                <motion.div
                  className={isRight ? 'md:col-start-2' : ''}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: isRight ? 48 : -48, y: 24 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <FlipCard exp={exp} index={index} />
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
