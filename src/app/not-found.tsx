'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center relative bg-canvas text-ink">
      <div className="max-w-2xl mx-auto px-6 text-center z-10">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent mb-4">
          ~/404-not-found
        </p>
        <h1 className="text-7xl font-serif font-bold text-ink mb-4">404</h1>
        <h2 className="text-2xl font-serif font-semibold text-accent mb-6">Page Not Found</h2>
        <p className="text-base text-muted mb-8 leading-7">
          The page you are looking for does not exist or has moved.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors bg-ink text-canvas hover:bg-accent h-11 px-6 font-mono"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}