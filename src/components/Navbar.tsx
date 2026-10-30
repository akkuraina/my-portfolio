'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { Menu, X, ChevronRight } from 'lucide-react';
import { sections } from '../data/site';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  // Hidden over the home page's landing; slides in once the content panel reaches the top.
  const [revealed, setRevealed] = useState(pathname !== '/');

  useEffect(() => {
    const landing = document.querySelector<HTMLElement>('[data-landing]');
    if (!landing) {
      setRevealed(true);
      return;
    }
    const update = () => setRevealed(window.scrollY > landing.offsetHeight - 96);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  // Lock background scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = sections.map((s) => ({ label: s.label, href: `/#${s.id}` }));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur-md transition-[translate,background-color] duration-300 motion-reduce:transition-none ${
        revealed || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full focus-within:translate-y-0'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6" aria-label="Primary">
        <ThemeToggle />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group relative block overflow-hidden rounded-md px-3 py-2 text-sm text-muted transition-colors duration-300 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span className="absolute inset-0 -translate-x-full rounded-md bg-accent-tint transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
                <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"></span>
                <span className="relative z-10">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-hairline bg-surface p-2 text-ink transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile drawer: fills the screen below the bar */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-hairline bg-canvas p-6 lg:hidden"
        >
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl border border-hairline bg-surface px-4.5 py-3.5 font-mono text-base font-semibold text-ink shadow-sm transition-all hover:border-accent hover:bg-accent-tint hover:text-accent active:scale-[0.99]"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="size-4 text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
