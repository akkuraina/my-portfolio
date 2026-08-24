'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CodeXml, ExternalLink, Globe, MonitorPlay, ChevronRight } from 'lucide-react';

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

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
      name: 'GigRadar',
      tagline: 'Local Artist & Underground Gig Finder',
      description:
        'Discovery platform for local live music gigs and independent artists featuring interactive map discovery, real-time check-ins, vibe-meter community ratings, Spotify/YouTube music embedding, and Cloudinary media uploads.',
      tech: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Cloudinary'],
      github: 'https://github.com/akkuraina/gigradar',
      live: 'https://gigradar-vert.vercel.app',
      previewUrl: 'https://gigradar-vert.vercel.app',
    },
  ];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % projects.length;
      setActiveIndex(nextIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + projects.length) % projects.length;
      setActiveIndex(prevIndex);
    }
  };

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [typedTag, setTypedTag] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const fullText = '~/projects';
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedTag(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 75);
    return () => clearInterval(interval);
  }, [isInView]);

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto max-w-6xl px-5 py-20 sm:px-6"
    >
      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-center gap-1 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent h-5">
          <span>{typedTag}</span>
          <span className={`inline-block w-1.5 h-3.5 bg-accent ${typingComplete ? 'animate-cursor' : 'opacity-100'}`} />
        </div>
        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Builds that made it to prod.
        </h2>
        <p className="mt-2 text-sm text-muted max-w-xl">
          Interactive explorer — select a project to inspect architecture, technical stack, and live deployments.
        </p>
      </div>

      {/* Desktop Split View (>= md) */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Minimal Project List (~33% width) */}
        <div 
          className="md:col-span-4 lg:col-span-4 flex flex-col gap-2"
          role="tablist"
          aria-label="Projects Explorer"
        >
          {projects.map((project, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={project.name}
                id={`project-tab-${index}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`project-panel-${index}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`group relative flex items-center justify-between rounded-xl px-4 py-3.5 text-left transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'border-accent bg-surface shadow-md'
                    : 'border-transparent hover:border-hairline hover:bg-surface/50 text-muted'
                }`}
              >
                {/* Active Indicator Bar */}
                <div 
                  className={`absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full transition-all duration-200 ${
                    isActive ? 'bg-accent opacity-100 scale-y-100' : 'bg-transparent opacity-0 scale-y-0'
                  }`} 
                />

                <div className="flex items-center gap-3 pl-1">
                  <span className={`font-mono text-xs transition-colors duration-200 ${
                    isActive ? 'text-accent font-semibold' : 'text-muted/60 group-hover:text-muted'
                  }`}>
                    0{index + 1}
                  </span>
                  <span className={`font-serif text-lg tracking-tight transition-colors duration-200 ${
                    isActive ? 'text-ink font-bold' : 'text-muted group-hover:text-ink font-normal'
                  }`}>
                    {project.name}
                  </span>
                </div>

                <ChevronRight 
                  className={`size-4 transition-transform duration-200 ${
                    isActive ? 'text-accent translate-x-0 opacity-100' : '-translate-x-2 opacity-0 text-muted group-hover:opacity-40'
                  }`} 
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Detail Panel (~67% width) */}
        <div className="md:col-span-8 lg:col-span-8">
          <div className="relative min-h-[460px] rounded-2xl border border-hairline bg-surface/90 backdrop-blur-md p-6 sm:p-7 shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.name}
                id={`project-panel-${activeIndex}`}
                role="tabpanel"
                aria-labelledby={`project-tab-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex flex-col gap-6"
              >
                {/* Top Browser Mockup Window */}
                <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-sm">
                  {/* Browser Mockup Bar */}
                  <div className="flex items-center justify-between px-3.5 py-2.5 bg-accent-tint/40 border-b border-hairline text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400/80 inline-block" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface/90 border border-hairline/60 text-[11px] text-muted max-w-[280px] truncate">
                      <Globe className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="truncate">{activeProject.previewUrl || activeProject.live || activeProject.github}</span>
                    </div>
                    <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-accent/10">
                      LIVE PREVIEW
                    </span>
                  </div>

                  {/* Interactive Frame / Mock Preview */}
                  <div className="relative h-64 sm:h-72 w-full bg-canvas/60 overflow-hidden flex items-center justify-center">
                    {activeProject.previewUrl ? (
                      <div className="w-full h-full relative overflow-hidden bg-surface">
                        <iframe
                          src={activeProject.previewUrl}
                          title={`${activeProject.name} Live Preview`}
                          className="w-[200%] h-[200%] transform scale-50 origin-top-left border-0 select-none pointer-events-auto"
                          loading="lazy"
                        />
                        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
                          <a
                            href={activeProject.previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-surface px-3.5 py-1.5 font-mono text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
                          >
                            <ExternalLink className="size-3.5" />
                            Open Live Site
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-accent-tint flex items-center justify-center mb-3">
                          <MonitorPlay className="w-6 h-6 text-accent" />
                        </div>
                        <h4 className="text-base font-semibold text-ink font-serif">{activeProject.name}</h4>
                        <p className="text-xs text-muted mt-1 max-w-sm">{activeProject.tagline}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Details Content */}
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                        {activeProject.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {activeProject.github && (
                          <a
                            href={activeProject.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-hairline bg-surface text-ink hover:border-accent hover:text-accent font-mono text-xs font-medium h-9 px-3.5 transition-colors shadow-sm"
                            title="GitHub Repository"
                          >
                            <CodeXml className="size-4" />
                            <span>Code</span>
                          </a>
                        )}
                        {activeProject.live && (
                          <a
                            href={activeProject.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent text-surface hover:opacity-90 font-mono text-xs font-semibold h-9 px-3.5 transition-opacity shadow-sm"
                            title="Live Deployment"
                          >
                            <ExternalLink className="size-4" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-accent font-semibold">
                      {activeProject.tagline}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-muted">
                    {activeProject.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="pt-2">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted/70 mb-2 font-medium">
                      Technologies & Frameworks
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-accent-tint/80 border border-accent/20 px-2.5 py-1 font-mono text-xs text-accent font-medium shadow-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Accordion View (< md) */}
      <div className="flex md:hidden flex-col gap-3">
        {projects.map((project, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={project.name}
              className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                isOpen
                  ? 'border-accent bg-surface shadow-md'
                  : 'border-hairline bg-surface/70'
              }`}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setActiveIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between p-4 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-semibold ${
                    isOpen ? 'text-accent' : 'text-muted/60'
                  }`}>
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className={`font-serif text-lg font-bold ${
                      isOpen ? 'text-ink' : 'text-muted'
                    }`}>
                      {project.name}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-accent mt-0.5">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`size-5 text-accent shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-90' : 'rotate-0'
                  }`}
                />
              </button>

              {/* Accordion Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-1 border-t border-hairline/60 flex flex-col gap-4">
                      {/* Live Preview Bar & Frame on Mobile */}
                      {project.previewUrl && (
                        <div className="overflow-hidden rounded-lg border border-hairline bg-surface mt-2">
                          <div className="flex items-center justify-between px-3 py-1.5 bg-accent-tint/40 border-b border-hairline text-[10px] font-mono">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                            </div>
                            <span className="truncate max-w-[170px] text-muted">{project.previewUrl}</span>
                          </div>
                          <div className="relative h-48 w-full bg-surface overflow-hidden">
                            <iframe
                              src={project.previewUrl}
                              title={`${project.name} Mobile Preview`}
                              className="w-[200%] h-[200%] transform scale-50 origin-top-left border-0 select-none pointer-events-none"
                              loading="lazy"
                            />
                            <div className="absolute bottom-2.5 right-2.5 z-20">
                              <a
                                href={project.previewUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded bg-accent text-surface px-2.5 py-1 font-mono text-[11px] font-semibold shadow-sm"
                              >
                                <ExternalLink className="size-3" />
                                Visit Live
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-muted">
                        {project.description}
                      </p>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-accent-tint/80 border border-accent/20 px-2 py-0.5 font-mono text-[10px] text-accent font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-2 pt-2 border-t border-hairline/50">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-hairline bg-surface text-ink hover:border-accent hover:text-accent font-mono text-xs font-medium h-9 px-3 transition-colors"
                          >
                            <CodeXml className="size-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-accent text-surface hover:opacity-90 font-mono text-xs font-semibold h-9 px-3 transition-opacity"
                          >
                            <ExternalLink className="size-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
