'use client';

import { ArrowUp } from 'lucide-react';
import { site } from '../data/site';
import { scrollToTop } from '../lib/scroll';

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas px-5 py-6 sm:px-6 transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · Made with love, &lt;3 akanksha
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex w-fit items-center gap-1.5 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Back to top
          <ArrowUp className="size-3.5" />
        </button>
      </div>
    </footer>
  );
}
