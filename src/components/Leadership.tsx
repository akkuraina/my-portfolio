'use client';

import { Users, Award } from 'lucide-react';

export default function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
      {/* Section Header */}
      <div className="mb-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
          ~/leadership
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Community &amp; initiative.
        </h2>
      </div>

      {/* Leadership Card */}
      <div className="max-w-4xl">
        <article className="rounded-lg border border-hairline bg-surface p-6 shadow-[0_1px_0_rgba(28,27,25,0.04)] transition duration-300 hover:-translate-y-1 hover:border-accent">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="font-mono text-xs text-muted">Aug 2025 – Present</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">Editorial Head</h3>
              <p className="mt-1 text-sm text-muted">DJSCE IETE-SF (Institution of Electronics and Telecommunication Engineers)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-accent-tint px-2.5 py-1 font-mono text-xs text-accent font-medium">
                <Users className="size-3" />
                Student Leadership
              </span>
            </div>
          </div>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
            <li className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"></span>
              <span>Launched the department&apos;s flagship newsletter, managing editorial strategy and technical publishing workflows.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"></span>
              <span>Core-organized <strong>Unplugged 3.0</strong>, a 24-hour national-level hardware hackathon hosting 300+ participants nationwide.</span>
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-md border border-hairline px-2.5 py-1 font-mono text-xs text-muted">
              Editorial Strategy
            </span>
            <span className="rounded-md border border-hairline px-2.5 py-1 font-mono text-xs text-muted">
              Event Logistics
            </span>
            <span className="rounded-md border border-hairline px-2.5 py-1 font-mono text-xs text-muted">
              Hackathon Operations
            </span>
            <span className="rounded-md border border-hairline px-2.5 py-1 font-mono text-xs text-muted">
              Team Leadership
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
