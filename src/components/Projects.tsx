'use client';

import { CodeXml, ExternalLink, Globe, MonitorPlay } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      name: 'TruePath',
      tagline: 'Event-sourced financial ledger & CQRS projections',
      description:
        'Audit-ready financial engine built with append-only event stream architecture, CQRS read-model projections, transaction reversals, automated budget controls, self-healing serverless sync, and cloud receipt storage.',
      tech: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Prisma 7', 'Redis', 'BullMQ', 'Better Auth', 'Appwrite'],
      github: 'https://github.com/akkuraina/truepath',
      live: 'https://truepath-iota.vercel.app',
      previewUrl: 'https://truepath-iota.vercel.app',
    },
    {
      name: 'Tranceformission',
      tagline: 'Multi-tenant coaching & booking platform',
      description:
        'Scalable 3-app ecosystem (Coach Portal, Learner Discovery, Admin Console) featuring Neon Serverless PostgreSQL connection pooling, pluggable S3/Appwrite storage adapter, and Better Auth RBAC.',
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'Neon Postgres', 'AWS S3', 'Better Auth', 'TailwindCSS v4'],
      github: 'https://github.com/akkuraina',
      live: 'https://www.tranceformissioncoaches.com',
      previewUrl: 'https://www.tranceformissioncoaches.com',
    },
    {
      name: 'YapMonster',
      tagline: 'Full-stack real-time chat application',
      description:
        'Scalable group communication with JWT-authenticated WebSocket connections, room-based event broadcasting, and Express/MongoDB backend for user management and message persistence.',
      tech: ['React', 'TailwindCSS', 'Chakra UI', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO'],
      github: 'https://github.com/akkuraina/YapMonster',
      live: 'https://yap-monster.vercel.app',
      previewUrl: 'https://yap-monster.vercel.app',
    },
    {
      name: 'NeuroHaven',
      tagline: 'AI-driven mental wellness platform',
      description:
        'Real-time mood analysis and conversation for students, with LLM-based context-aware interactions, modular API architecture, secure Firebase data handling, and dynamic emotional heatmaps for behavioral insights.',
      tech: ['React', 'TypeScript', 'TailwindCSS', 'Firebase', 'Gemini API'],
      github: 'https://github.com/akkuraina/neurohaven.git',
      live: 'https://neurohaven-pink.vercel.app',
      previewUrl: 'https://neurohaven-pink.vercel.app',
    },
    {
      name: 'Flagzilla',
      tagline: 'Browser-based real-time 3D multiplayer game',
      description:
        'WebSocket-based player synchronization with authoritative backend state, real-time in-game chat, and state management for player states, game events, session lifecycle, authentication, matchmaking, and leaderboards.',
      tech: ['Next.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'WebSockets'],
      github: 'https://github.com/akkuraina/git-happens',
      live: 'https://flagzilla.vercel.app',
      previewUrl: 'https://flagzilla.vercel.app',
    },
    {
      name: 'Startup Discovery Radar',
      tagline: 'AI-powered startup intelligence platform',
      description:
        'Real-time discovery and intelligence platform aggregating startup data, market insights, and automated research summaries using fast LLM inference and web search.',
      tech: ['Next.js', 'FastAPI', 'MySQL', 'Groq', 'Tavily API', 'Python'],
      github: 'https://github.com/akkuraina/coderound-startup-discovery',
      live: null,
      previewUrl: null,
    },
    {
      name: 'Candidate Matcher',
      tagline: 'Matches candidates with the role',
      description:
        'AI-powered recruitment platform that matches candidates with job roles using Natural Language Processing and Machine Learning techniques.',
      tech: ['Python', 'PyTorch', 'Hugging Face Transformers', 'scikit-learn', 'Pandas'],
      github: 'https://github.com/akkuraina/candidate-matcher',
      live: null,
      previewUrl: null,
    },
    {
      name: 'GigRadar',
      tagline: 'Local Artist & Underground Gig Finder',
      description:
        'Discovery platform for local live music gigs and independent artists featuring interactive map discovery, real-time check-ins, vibe-meter community ratings, Spotify/YouTube music embedding, and Cloudinary media uploads.',
      tech: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Cloudinary'],
      github: 'https://github.com/akkuraina/gigradar',
      live: 'https://gigradar-vert.vercel.app',
      previewUrl: 'https://gigradar-vert.vercel.app',
    },
    {
      name: 'InkSuggest',
      tagline: 'AI-powered semantic tattoo inspiration engine',
      description:
        'AI recommendation system utilizing Sentence-Transformers (all-MiniLM-L6-v2) and cosine similarity for semantic tattoo discovery, integrated with local LLMs (Ollama Llama 3) for personalized creative concept generation.',
      tech: ['Python', 'FastAPI', 'PyTorch', 'Sentence-Transformers', 'Ollama (Llama 3)', 'SQLite', 'React', 'Vite'],
      github: 'https://github.com/akkuraina/InkSuggest',
      live: 'https://inksuggest.vercel.app',
      previewUrl: 'https://inksuggest.vercel.app',
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
            <article className="group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-lg border border-hairline bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent shadow-[0_1px_0_rgba(28,27,25,0.04)]">

              {/* Live Preview Overlay on Hover */}
              <div className="absolute inset-0 z-20 flex flex-col bg-surface border border-accent rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 shadow-2xl overflow-hidden">
                {/* Browser Mockup Bar */}
                <div className="flex items-center justify-between px-3 py-2 bg-accent-tint/40 border-b border-hairline text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface/90 border border-hairline/60 text-[10px] text-muted max-w-[190px] truncate">
                    <Globe className="w-3 h-3 text-accent shrink-0" />
                    <span className="truncate">{project.previewUrl || project.live || project.github}</span>
                  </div>
                  <span className="text-[9px] font-mono text-accent uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-accent/10">
                    LIVE PREVIEW
                  </span>
                </div>

                {/* Live Preview Frame / Mock Container */}
                <div className="relative flex-1 w-full h-full bg-surface overflow-hidden">
                  {project.previewUrl ? (
                    <div className="w-full h-full relative overflow-hidden bg-surface">
                      <iframe
                        src={project.previewUrl}
                        title={`${project.name} Live Preview`}
                        className="w-[200%] h-[200%] transform scale-50 origin-top-left border-0 pointer-events-none select-none"
                        loading="lazy"
                      />
                      <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
                        <a
                          href={project.previewUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md bg-accent text-surface px-3 py-1.5 font-mono text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
                        >
                          <ExternalLink className="size-3.5" />
                          Open Live Site
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-surface/95">
                      <div className="w-10 h-10 rounded-full bg-accent-tint flex items-center justify-center mb-3">
                        <MonitorPlay className="w-5 h-5 text-accent" />
                      </div>
                      <h4 className="text-sm font-semibold text-ink font-serif">{project.name}</h4>
                      <p className="text-xs text-muted mt-1 max-w-xs">{project.tagline}</p>
                      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                        {project.tech.map((t, idx) => (
                          <span key={idx} className="rounded bg-accent-tint/60 px-2 py-0.5 font-mono text-[10px] text-accent">
                            {t}
                          </span>
                        ))}
                      </div>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface text-ink px-3 py-1.5 font-mono text-xs hover:border-accent hover:text-accent transition-colors"
                        >
                          <CodeXml className="size-3.5" />
                          GitHub Repository
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Standard Card Body */}
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
