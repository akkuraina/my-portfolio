'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Mail, FileText, Github, Linkedin } from 'lucide-react';
import SectionTag from './SectionTag';
import XIcon from './XIcon';
import { site } from '../data/site';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} id="about" className="relative mx-auto flex max-w-6xl scroll-mt-16 flex-col justify-center px-5 pb-16 pt-24 sm:px-6 sm:pt-32">
      {/* Background Decorative Grid & Scanline */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--hairline)_64%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--hairline)_64%,transparent)_1px,transparent_1px)] bg-[size:76px_76px] opacity-40"></div>
        {/* Top scanline */}
        <div className="absolute left-0 top-24 h-px w-full origin-left animate-scanline bg-gradient-to-r from-transparent via-accent/35 to-transparent"></div>
      </div>

      <div className="max-w-4xl">
        <SectionTag text="~/about" start={isInView} />

        {/* Role statement (the name itself lives on the landing above) */}
        <h2 className="mt-5 max-w-4xl font-serif text-4xl font-normal leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Full-stack engineer building <span className="text-gradient">web, backend &amp; AI-integrated</span> systems.
        </h2>


        {/* What I'm doing right now */}
        <div className="mt-8">
          <p className="inline-flex max-w-full items-center rounded-md border border-hairline bg-surface/90 px-4 py-3 font-mono text-xs text-muted shadow-[0_1px_0_rgba(28,27,25,0.04)] backdrop-blur sm:text-sm">
            <span>
              <span className="text-accent">&gt; currently:</span> product engineering intern @ Tenet, building an AI voice-agent platform
            </span>
            <span aria-hidden="true" className="ml-2 inline-block h-4 w-2 shrink-0 animate-cursor bg-accent"></span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent btn-pop h-11 px-5"
          >
            <Mail className="size-4" />
            Email me
          </a>
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent border border-hairline bg-transparent text-ink hover:border-accent hover:text-accent h-11 px-5"
          >
            <FileText className="size-4" />
            View resume
          </a>
        </div>

        {/* Social links */}
        <div className="mt-7 flex items-center gap-2 text-muted">
          <a
            href={site.github}
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors text-muted hover:bg-accent-tint hover:text-ink size-10 px-0"
            title="GitHub"
          >
            <Github className="size-4" />
          </a>
          <a
            href={site.linkedin}
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors text-muted hover:bg-accent-tint hover:text-ink size-10 px-0"
            title="LinkedIn"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={site.x}
            aria-label="X (Twitter)"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors text-muted hover:bg-accent-tint hover:text-ink size-10 px-0"
            title="X (Twitter)"
          >
            <XIcon className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
