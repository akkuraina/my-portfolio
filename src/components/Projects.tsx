'use client';

import { CodeXml, ExternalLink } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      name: 'NeuroHaven',
      tagline: 'AI-driven mental wellness platform',
      description:
        'Real-time mood analysis and conversation for students, with LLM-based context-aware interactions, modular API architecture, secure Firebase data handling, and dynamic emotional heatmaps for behavioral insights.',
      tech: ['React', 'TypeScript', 'TailwindCSS', 'Firebase', 'Gemini API'],
      github: 'https://github.com/akkuraina/neurohaven.git',
      live: null,
    },
    {
      name: 'Flagzilla',
      tagline: 'Browser-based real-time 3D multiplayer game',
      description:
        'WebSocket-based player synchronization with authoritative backend state, real-time in-game chat, and state management for player states, game events, session lifecycle, authentication, matchmaking, and leaderboards.',
      tech: ['Next.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'WebSockets'],
      github: 'https://github.com/akkuraina',
      live: null,
    },
    {
      name: 'YapMonster',
      tagline: 'Full-stack real-time chat application',
      description:
        'Scalable group communication with JWT-authenticated WebSocket connections, room-based event broadcasting, and Express/MongoDB backend for user management and message persistence.',
      tech: ['React', 'TailwindCSS', 'Chakra UI', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO'],
      github: 'https://github.com/akkuraina/YapMonster',
      live: null,
    },
    {
      name: 'Startup Discovery Radar',
      tagline: 'AI-powered startup intelligence platform',
      description:
        'Real-time discovery and intelligence platform aggregating startup data, market insights, and automated research summaries using fast LLM inference and web search.',
      tech: ['Next.js', 'FastAPI', 'MySQL', 'Groq', 'Tavily API', 'Python'],
      github: 'https://github.com/akkuraina',
      live: null,
    },
    {
      name: 'Fake News Detector',
      tagline: 'Deep learning detector with Chrome extension',
      description:
        'Deep-learning classification model for real-time fake news verification, extended into an accessible browser extension using in-browser model inference.',
      tech: ['Python', 'TensorFlow', 'TensorFlow.js', 'JavaScript', 'Chrome API', 'NLP'],
      github: 'https://github.com/akkuraina',
      live: null,
    },
  ];

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
      {/* Section Header */}
      <div className="mb-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
          ~/projects
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Products shipped end to end.
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div key={index}>
            <article className="group relative flex h-full min-h-[24rem] flex-col overflow-hidden rounded-lg border border-hairline bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent shadow-[0_1px_0_rgba(28,27,25,0.04)]">
              <div className="relative z-10 flex h-full flex-col">
                {/* Project Title */}
                <h3 className="text-xl font-semibold text-ink">{project.name}</h3>
                
                {/* Monospace Tagline */}
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="mt-4 flex-1 text-sm leading-6 text-muted">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t, tIndex) => (
                    <span
                      key={tIndex}
                      className="rounded-md bg-accent-tint px-2.5 py-1 font-mono text-xs text-accent font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-hairline/40">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-md text-xs font-mono font-medium transition-colors border border-hairline bg-transparent text-ink hover:border-accent hover:text-accent h-9 px-3"
                    >
                      <CodeXml className="size-3.5" />
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-md text-xs font-mono font-medium transition-colors border border-hairline bg-transparent text-ink hover:border-accent hover:text-accent h-9 px-3"
                    >
                      <ExternalLink className="size-3.5" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
