'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Mail, FileText, CodeXml, Contact } from 'lucide-react';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function BuildTogether() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [typedTag, setTypedTag] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const fullText = '~/build-together';
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
      id="build"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="mx-auto max-w-6xl px-5 py-20 sm:px-6"
    >
      <div className="rounded-2xl border border-hairline bg-surface/80 p-8 sm:p-12 shadow-[0_1px_0_rgba(28,27,25,0.04)] backdrop-blur">
        <div className="flex items-center gap-1 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent h-5">
          <span>{typedTag}</span>
          <span className={`inline-block w-1.5 h-3.5 bg-accent ${typingComplete ? 'animate-cursor' : 'opacity-100'}`} />
        </div>

        <h2 className="mt-4 max-w-2xl font-serif text-3xl font-bold text-ink sm:text-5xl">
          Let&apos;s build something worth shipping.
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          If you want something that just works for the demo, I&apos;m probably not your person.
          If you want something built to scale, let&apos;s talk.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="mailto:akanksharaina04@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent bg-ink text-canvas hover:bg-accent h-11 px-5"
          >
            <Mail className="size-4" />
            Email me
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent border border-hairline bg-transparent text-ink hover:border-accent hover:text-accent h-11 px-5"
          >
            <FileText className="size-4" />
            Download Resume
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8 text-xs font-mono text-muted">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/akkuraina"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <CodeXml className="size-3.5" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/akanksha-raina-4637b5268/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Contact className="size-3.5" />
              LinkedIn
            </a>
          </div>

          <p>© {new Date().getFullYear()} Akanksha Raina. All rights reserved.</p>
        </div>
      </div>
    </motion.section>
  );
}
