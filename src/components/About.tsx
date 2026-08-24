'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Inline Keyword Chip Component
function TechChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-hairline bg-accent-tint/60 px-2 py-0.5 font-mono text-xs sm:text-[13px] font-medium text-accent shadow-xs mx-1 align-baseline transition-all hover:border-accent hover:shadow-[0_0_12px_rgba(25,211,197,0.22)]">
      {children}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [typedTag, setTypedTag] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  // Terminal-style typing effect for ~/about
  useEffect(() => {
    if (!isInView) return;

    const fullText = '~/about';
    let index = 0;

    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedTag(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 75);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="mx-auto max-w-6xl px-5 py-20 sm:px-6"
    >
      {/* Typing Tag & Section Headline */}
      <motion.div variants={itemVariants} className="mb-10">
        <div className="flex items-center gap-1 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent h-5">
          <span>{typedTag}</span>
          <span className={`inline-block w-1.5 h-3.5 bg-accent ${typingComplete ? 'animate-cursor' : 'opacity-100'}`} />
        </div>

        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Engineering with clarity, speed, and end-to-end focus.
        </h2>
      </motion.div>

      {/* Two-Column Grid: Narrative Prose & Terminal Stat Card */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Narrative Paragraphs (Independent Scroll Reveals) */}
        <div className="lg:col-span-7 flex flex-col gap-5 text-base leading-relaxed text-muted sm:text-lg">
          <motion.p variants={itemVariants}>
            I&apos;m a full-stack and mobile developer who doesn&apos;t stay in one lane: web, mobile, backend, and AI-integrated systems, all in the same week. Currently studying Electronics &amp; Telecommunication with Honors in
            <TechChip>AI/ML</TechChip>
            at Dwarkadas J. Sanghvi College of Engineering, Mumbai.
          </motion.p>

          <motion.p variants={itemVariants}>
            Most days that means moving between
            <TechChip>React/Next.js</TechChip>
            interfaces,
            <TechChip>React Native</TechChip>
            apps, and the infrastructure underneath:
            <TechChip>schemas</TechChip>,
            <TechChip>APIs</TechChip>,
            and the production bugs nobody warns you about.
          </motion.p>

          <motion.p variants={itemVariants} className="text-sm leading-relaxed text-muted/90 pt-2 border-t border-hairline/60">
            Focused on building robust, event-driven architectures and shipping scalable software from idea to production deployment.
          </motion.p>
        </div>

        {/* Right Column: Terminal Stat Card (Side Panel) */}
        <motion.div variants={itemVariants} className="lg:col-span-5">
          <div className="rounded-2xl border border-hairline bg-surface/90 backdrop-blur-md p-5 sm:p-6 shadow-xl font-mono text-xs sm:text-sm">
            {/* Terminal Window Header Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-hairline/60">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400/80 inline-block" />
                <span className="size-2.5 rounded-full bg-yellow-400/80 inline-block" />
                <span className="size-2.5 rounded-full bg-green-400/80 inline-block" />
              </div>
              <span className="text-[11px] text-muted tracking-wider">whoami.sh</span>
              <span className="text-[10px] text-accent uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-accent-tint">zsh</span>
            </div>

            {/* Terminal Command Output Lines */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <span className="text-muted/60">$</span>
                <span>whoami</span>
              </div>

              <div className="pl-3 border-l-2 border-accent/40 space-y-2.5 text-xs sm:text-[13px]">
                <p className="font-serif text-base font-bold text-ink tracking-wide">&gt; Akanksha Raina</p>
                <p className="text-muted">&gt; Full-stack &amp; Mobile Engineer</p>
                <p className="text-muted">&gt; B.Tech, ECE (AI/ML Honors) — DJSCE</p>
                <p className="text-muted">&gt; Focus: Web · Mobile · AI Systems</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-muted">&gt; Status:</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
