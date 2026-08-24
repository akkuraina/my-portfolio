'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { CodeXml, Contact, Menu, X, FileText, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '/#experience' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Build', href: '/#build' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur-md transition-colors duration-300">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6" aria-label="Primary">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          AR
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative overflow-hidden rounded-md px-3 py-2 text-sm text-muted transition-colors duration-300 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span className="absolute inset-0 -translate-x-full rounded-md bg-accent-tint transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
              <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"></span>
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Right Actions (Desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 border border-hairline bg-transparent text-ink hover:border-accent hover:text-accent h-9 px-3"
          >
            <FileText className="size-4" />
            Resume
          </a>

          <ThemeToggle />

          {/* GitHub Social Icon */}
          <a
            href="https://github.com/akkuraina"
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 text-muted hover:bg-accent-tint hover:text-ink size-10 px-0 relative overflow-hidden group"
            title="GitHub"
          >
            <CodeXml className="relative z-10 size-4" />
          </a>

          {/* LinkedIn Social Icon */}
          <a
            href="https://www.linkedin.com/in/akanksha-raina-4637b5268/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 text-muted hover:bg-accent-tint hover:text-ink size-10 px-0 relative overflow-hidden group"
            title="LinkedIn"
          >
            <Contact className="relative z-10 size-4" />
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-hairline bg-surface p-2 text-ink transition-colors hover:border-accent hover:text-accent size-10 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col justify-between bg-canvas/98 p-6 backdrop-blur-xl md:hidden overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200 border-b border-hairline shadow-2xl">
          <div className="flex flex-col gap-3 pt-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-1 px-1">Navigation</p>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl border border-hairline/80 bg-surface/70 px-4 py-3.5 font-mono text-base font-semibold text-ink shadow-sm hover:border-accent hover:bg-accent-tint/60 hover:text-accent transition-all active:scale-[0.99]"
              >
                <span>{link.label}</span>
                <ChevronRight className="size-4 text-accent" />
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 pt-4 border-t border-hairline/80">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-accent text-surface px-4 py-3.5 font-mono text-sm font-semibold shadow-md hover:opacity-90 active:scale-[0.99] transition-all"
            >
              <FileText className="size-4" />
              View Resume
            </a>
            
            <div className="grid grid-cols-2 gap-3 mt-1">
              <a
                href="https://github.com/akkuraina"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-hairline bg-surface/80 px-4 py-3 font-mono text-xs font-semibold text-ink hover:border-accent hover:text-accent transition-all"
              >
                <CodeXml className="size-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/akanksha-raina-4637b5268/"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-hairline bg-surface/80 px-4 py-3 font-mono text-xs font-semibold text-ink hover:border-accent hover:text-accent transition-all"
              >
                <Contact className="size-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}