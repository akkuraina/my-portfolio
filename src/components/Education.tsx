'use client';

import { GraduationCap, MapPin } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
      {/* Section Header */}
      <div className="mb-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
          ~/education
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Academic background.
        </h2>
      </div>

      {/* Education Card */}
      <div className="max-w-4xl">
        <article className="rounded-lg border border-hairline bg-surface p-6 shadow-[0_1px_0_rgba(28,27,25,0.04)] transition duration-300 hover:-translate-y-1 hover:border-accent">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="font-mono text-xs text-muted">May 2023 – May 2027</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                B.Tech in Electronics &amp; Telecommunication
              </h3>
              <p className="mt-1 text-sm text-accent font-medium font-mono">
                Honors in AI / ML
              </p>
              <p className="mt-2 text-sm text-muted">
                Dwarkadas J. Sanghvi College of Engineering (DJSCE)
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted sm:justify-end">
              <span className="inline-flex items-center gap-1 rounded-md border border-hairline px-2.5 py-1">
                <MapPin className="size-3 text-accent" />
                Mumbai, India
              </span>
              <span className="rounded-md bg-accent-tint px-2.5 py-1 text-accent font-medium">
                CGPA 7.6
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-hairline/40">
            <span className="rounded-md border border-hairline px-2.5 py-1 font-mono text-xs text-muted">
              AI/ML Algorithms
            </span>
            <span className="rounded-md border border-hairline px-2.5 py-1 font-mono text-xs text-muted">
              Data Structures &amp; Algorithms
            </span>
            <span className="rounded-md border border-hairline px-2.5 py-1 font-mono text-xs text-muted">
              Signals &amp; Systems
            </span>
            <span className="rounded-md border border-hairline px-2.5 py-1 font-mono text-xs text-muted">
              Neural Networks
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
