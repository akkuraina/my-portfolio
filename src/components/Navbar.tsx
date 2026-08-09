'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { CodeXml, Contact, Menu, X, FileText } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Work', href: '/#experience' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Build', href: '/#build' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur transition-colors duration-300">
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

        {/* Right Actions */}
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
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent text-muted hover:bg-accent-tint hover:text-ink size-10 px-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-hairline bg-surface p-5 md:hidden">
          <div className="flex flex-col gap-4 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-hairline">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md text-xs font-medium border border-hairline px-3 py-1.5 text-ink hover:border-accent hover:text-accent"
              >
                <FileText className="size-3.5" />
                Resume
              </a>
              <a
                href="https://github.com/akkuraina"
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-ink"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/akanksha-raina-4637b5268/"
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-ink"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}