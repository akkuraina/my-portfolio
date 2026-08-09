'use client';

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
      {/* Section Header */}
      <div className="mb-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
          ~/about
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Engineering with clarity, speed, and end-to-end focus.
        </h2>
      </div>

      {/* Grid Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bio Text Paragraphs */}
        <div className="lg:col-span-2 space-y-5 text-base leading-8 text-muted sm:text-lg">
          <p>
            Full-stack and mobile developer working across web, mobile, and AI-integrated systems. B.Tech student in Electronics &amp; Telecommunication (Honors in AI/ML) at Dwarkadas J. Sanghvi College of Engineering (DJSCE), Mumbai.
          </p>
          <p>
            Comfortable moving seamlessly between frontend, backend, and infrastructure — from React/Next.js interfaces and React Native mobile apps to database schemas and debugging complex production issues.
          </p>
        </div>

        {/* Working Style Card */}
        <div>
          <article className="rounded-lg border border-hairline bg-surface/80 p-6 shadow-[0_1px_0_rgba(28,27,25,0.04)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Working style
            </p>
            <div className="mt-6 grid gap-5 font-mono text-sm">
              <div>
                <p className="text-3xl font-semibold text-ink">01</p>
                <p className="mt-2 text-muted">Understand workflow &amp; requirements</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-ink">02</p>
                <p className="mt-2 text-muted">Build the smallest solid system</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-ink">03</p>
                <p className="mt-2 text-muted">Ship, measure, and tighten</p>
              </div>
            </div>
            <p className="mt-6 border-t border-hairline pt-5 font-mono text-xs text-muted">
              Available from Mumbai, India
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
