'use client';

import { Mail, FileText, CodeXml, Contact } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-between px-5 py-16 sm:px-6 overflow-hidden">
      {/* Background Decorative Grid & Scanline */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--hairline)_64%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--hairline)_64%,transparent)_1px,transparent_1px)] bg-[size:76px_76px] opacity-40"></div>
        {/* Top scanline */}
        <div className="absolute left-0 top-24 h-px w-full origin-left animate-scanline bg-gradient-to-r from-transparent via-accent/35 to-transparent"></div>
      </div>

      {/* Hero Container with Grid */}
      <div className="relative z-10 flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-center">
        {/* Left Side: Clean Content */}
        <div className="max-w-2xl lg:w-7/12">
          {/* Uppercase Role Tag */}
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Full-Stack Developer / SDE
          </p>

          {/* Name Title */}
          <h1 className="mt-5 font-serif text-5xl font-bold leading-[0.98] text-ink sm:text-7xl lg:text-8xl">
            Akanksha Raina
          </h1>

          {/* Bio Subtitle */}
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted sm:text-xl">
            Full-stack engineer building web, mobile & AI-integrated systems
          </p>

          {/* Terminal Monospace Tagline Box */}
          <div className="mt-8">
            <p className="inline-flex max-w-full items-center overflow-hidden rounded-md border border-hairline bg-surface/90 px-4 py-3 font-mono text-xs text-muted shadow-[0_1px_0_rgba(28,27,25,0.04)] backdrop-blur sm:text-sm">
              <span className="truncate">
                Building web, mobile, and AI-integrated products with Next.js, React Native, and LLM APIs
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

        {/* Right Side: Monochromatic Midnight-to-Electric-Blue Visual Portrait Texture */}
        <div className="relative flex justify-center lg:w-5/12 lg:justify-end">
          <div className="group relative h-[400px] w-[320px] sm:h-[480px] sm:w-[380px] lg:h-[520px] lg:w-[420px] rounded-2xl border border-accent/25 bg-surface/40 p-2 shadow-[0_0_50px_rgba(25,211,197,0.12)] backdrop-blur transition-transform duration-500 hover:scale-[1.01] hover:border-accent/40">
            {/* Outer glow ring */}
            <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-tr from-[#031A24] via-accent/20 to-[#19D3C5]/30 opacity-60 blur-xl transition duration-500 group-hover:opacity-80"></div>

            {/* Inner Image Container */}
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#020B10]">
              {/* Photo - Natural Original Colors */}
              <img
                src="/images/akanksha.jpg"
                alt="Akanksha Raina"
                className="h-full w-full object-cover object-top transition-all duration-700 group-hover:scale-105"
              />

              {/* Soft Gradient Mask Fading Bottom Edge for Terminal Badge Contrast */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020B10] via-[#020B10]/60 to-transparent pointer-events-none"></div>
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#020B10]/40 to-transparent pointer-events-none"></div>

              {/* Overlay Terminal Badge */}
              <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-hairline bg-[#031A24]/90 p-3 backdrop-blur font-mono text-[11px] text-muted shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-accent font-medium">
                    <span className="size-2 rounded-full bg-accent animate-pulse"></span>
                    SDE &amp; Full-Stack
                  </span>
                  <span className="text-[10px] text-muted/80">DJSCE &apos;27</span>
                </div>
              </div>
            </div>

          </div>

          {/* Top Right Floating Code Card */}
          <div className="absolute -right-4 -top-6 hidden w-56 rotate-3 rounded-lg border border-hairline bg-surface/80 p-3.5 font-mono text-[11px] leading-5 text-muted shadow-xl backdrop-blur sm:block">
            <p>const ship = async () =&gt; &#123;</p>
            <p className="pl-3 text-accent">await build(app);</p>
            <p className="pl-3">return product;</p>
            <p>&#125;;</p>
          </div>
        </div>
      </div>
    </section>
  );
}

