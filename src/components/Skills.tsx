'use client';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C/C++', 'HTML', 'CSS', 'DSA'],
    },
    {
      title: 'Frameworks',
      skills: ['Next.js', 'React', 'React Native', 'Node.js', 'Express.js', 'Socket.IO', 'WebSockets'],
    },
    {
      title: 'AI/ML',
      skills: [
        'Machine Learning',
        'NLP',
        'Text Embeddings',
        'TF-IDF',
        'Cosine Similarity',
        'Information Retrieval',
        'LLM APIs',
        'Pandas',
        'NumPy',
        'Scikit-learn',
      ],
    },
    {
      title: 'Developer Tools',
      skills: ['Git', 'GitHub', 'VS Code', 'Firebase', 'Supabase', 'Postman', 'DBeaver', 'Bun', 'Docker'],
    },
    {
      title: 'Databases & Infra',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Prisma', 'Redis', 'Cloudflare R2', 'Appwrite'],
    },
    {
      title: 'UI Libraries',
      skills: ['Chakra UI', 'Material UI', 'Watermelon UI', 'TailwindCSS', 'Three.js', 'Framer Motion'],
    },
  ];

  const allSkills = skillCategories.flatMap((c) => c.skills);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
      {/* Section Header */}
      <div className="mb-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
          ~/skills
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Tools &amp; technologies I reach for.
        </h2>
      </div>

      {/* Infinite Marquee Banner */}
      <div className="mb-10 overflow-hidden border-y border-hairline py-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 font-mono text-xs text-muted">
          {allSkills.concat(allSkills).map((s, index) => (
            <span
              key={index}
              className="rounded-md border border-hairline bg-surface px-3 py-1 text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Grid Columns */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, index) => (
          <article
            key={index}
            className="rounded-lg border border-hairline bg-surface p-6 shadow-[0_1px_0_rgba(28,27,25,0.04)] transition duration-300 hover:-translate-y-1 hover:border-accent"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {cat.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {cat.skills.map((skill, sIndex) => (
                <span
                  key={sIndex}
                  className="rounded-md border border-hairline px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
