'use client';

import { Mail, FileText, CodeXml, Contact } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-5 py-20 sm:px-6">
      {/* Background Decorative Elements */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--hairline)_64%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--hairline)_64%,transparent)_1px,transparent_1px)] bg-[size:76px_76px] opacity-45"></div>
        {/* Top scanline */}
        <div className="absolute left-0 top-24 h-px w-full origin-left animate-scanline bg-gradient-to-r from-transparent via-accent/35 to-transparent"></div>

        {/* Top right floating code card */}
        <div className="absolute right-[7%] top-28 hidden w-64 rotate-3 rounded-lg border border-hairline bg-surface/60 p-4 font-mono text-[11px] leading-5 text-muted shadow-sm backdrop-blur sm:block">
          <p>const ship = async () =&gt; &#123;</p>
          <p className="pl-4 text-accent">await build(ai_fullstack_app);</p>
          <p className="pl-4">return product;</p>
          <p>&#125;;</p>
        </div>

        {/* Bottom left floating code card */}
        <div className="absolute bottom-28 left-[6%] hidden w-48 -rotate-2 rounded-lg border border-hairline bg-surface/60 p-4 font-mono text-[11px] leading-5 text-muted shadow-sm backdrop-blur lg:block">
          <p>next dev --turbo</p>
          <p className="text-accent">✓ ready on localhost</p>
        </div>
      </div>

      <div className="max-w-4xl">
        {/* Uppercase Role Tag */}
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Full-Stack Developer / SDE
        </p>

        {/* Name Title */}
        <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-[0.98] text-ink sm:text-7xl lg:text-8xl">
          Akanksha Raina
        </h1>

        {/* Bio Subtitle */}
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
          Full-stack and mobile developer working across web, mobile, and AI-integrated systems.
        </p>

        {/* Terminal Monospace Tagline Box */}
        <div className="mt-8">
          <p className="inline-flex max-w-full items-center overflow-hidden rounded-md border border-hairline bg-surface px-4 py-3 font-mono text-xs text-muted shadow-[0_1px_0_rgba(28,27,25,0.04)] sm:text-sm">
            <span className="truncate">
              akanksha@sugamaya:~$ building web, mobile, and AI-integrated products with Next.js, React Native, and LLM APIs
            </span>
            <span aria-hidden="true" className="ml-2 inline-block h-4 w-2 animate-cursor bg-accent"></span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:akanksharainadjsce@gmail.com"
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
            View resume
          </a>
        </div>

        {/* Social Icons & Location */}
        <div className="mt-7 flex items-center gap-2 text-muted">
          <a
            href="https://github.com/akkuraina"
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors text-muted hover:bg-accent-tint hover:text-ink size-10 px-0"
            title="GitHub"
          >
            <CodeXml className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/akanksha-raina-4637b5268/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors text-muted hover:bg-accent-tint hover:text-ink size-10 px-0"
            title="LinkedIn"
          >
            <Contact className="size-4" />
          </a>
          <span className="ml-2 font-mono text-xs">Mumbai, India</span>
        </div>
      </div>
    </section>
  );
}
