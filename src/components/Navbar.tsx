'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import CommandPalette from './CommandPalette';
import { Menu, X, FileText, ChevronRight, Search } from 'lucide-react';
import { sections, site } from '../data/site';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shortcut, setShortcut] = useState('Ctrl K');

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

  // ⌘K / Ctrl+K, or "/" outside text fields, opens search.
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setShortcut('⌘K');
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMobileMenuOpen(false);
        setSearchOpen((open) => !open);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navLinks = sections.map((s) => ({ label: s.label, href: `/#${s.id}` }));

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur-md transition-colors duration-300">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6" aria-label="Primary">
        <Link
          href="/#top"
          className="font-serif text-xl font-bold tracking-tight text-ink hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Home
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1 lg:flex">
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
        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search the site"
            aria-keyshortcuts="Control+K Meta+K"
            className="inline-flex h-9 w-44 items-center gap-2 rounded-md border border-hairline bg-surface/70 px-3 text-sm text-muted transition-colors hover:border-accent hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
          >
            <Search className="size-4 text-accent" />
            <span>Search…</span>
            <kbd className="ml-auto rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px]">{shortcut}</kbd>
          </button>

          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent border border-hairline bg-transparent text-ink hover:border-accent hover:text-accent h-9 px-3"
          >
            <FileText className="size-4" />
            Resume
          </a>

          <ThemeToggle />
        </div>

        {/* Compact actions (< lg) */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setSearchOpen(true);
            }}
            aria-label="Search the site"
            className="inline-flex size-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-accent-tint hover:text-ink"
          >
            <Search className="size-4" />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-1 inline-flex items-center justify-center rounded-lg border border-hairline bg-surface p-2 text-ink transition-colors hover:border-accent hover:text-accent size-10 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop & Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-canvas opacity-100 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            id="mobile-menu"
            className="absolute top-full left-0 right-0 z-50 flex flex-col gap-4 border-b-2 border-hairline bg-canvas p-6 lg:hidden shadow-2xl max-h-[calc(100dvh-4rem)] overflow-y-auto text-ink"
          >
            <div className="flex flex-col gap-2.5">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-1 px-1">Navigation</p>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl border border-hairline bg-surface px-4.5 py-3.5 font-mono text-base font-semibold text-ink shadow-sm hover:border-accent hover:bg-accent-tint hover:text-accent transition-all active:scale-[0.99]"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="size-4 text-accent" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-hairline">
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-accent text-surface px-4 py-3.5 font-mono text-sm font-semibold shadow-md hover:opacity-90 transition-all active:scale-[0.99]"
              >
                <FileText className="size-4" />
                View Resume
              </a>
            </div>
          </div>
        </>
      )}

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
