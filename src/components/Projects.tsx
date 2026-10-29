'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CodeXml, ExternalLink, Globe, MonitorPlay, ChevronRight, ArrowRight, ArrowDown } from 'lucide-react';
import { projects, type Project, type Architecture } from '../data/projects';
import { isVisible } from '../lib/todo';
import Copy from './Copy';

type SectionId = 'overview' | 'architecture' | 'decisions' | 'hard';

const sectionLabels: Record<SectionId, string> = {
  overview: 'Overview',
  architecture: 'Architecture',
  decisions: 'Key decisions',
  hard: 'What was hard',
};

// Sections with no (visible) content are hidden, so unfinished write-ups still look complete.
function sectionsFor(project: Project): SectionId[] {
  const sections: SectionId[] = ['overview'];
  if (project.architecture) sections.push('architecture');
  if (project.decisions?.some((d) => isVisible(d.title) && isVisible(d.why))) sections.push('decisions');
  if (project.hard?.some((h) => isVisible(h.challenge) && isVisible(h.approach))) sections.push('hard');
  return sections;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-wider text-muted/70">{children}</p>
  );
}

function ArchitectureDiagram({ architecture, name }: { architecture: Architecture; name: string }) {
  if (architecture.kind === 'image') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={architecture.src}
        alt={architecture.alt}
        loading="lazy"
        className="w-full rounded-lg border border-hairline bg-canvas/50"
      />
    );
  }

  const { layers, note } = architecture;
  return (
    <div>
      <ol
        aria-label={`${name} architecture, in order of data flow`}
        className="flex flex-col items-stretch gap-2 sm:flex-row"
      >
        {layers.map((layer, i) => (
          <li key={layer.label} className="flex flex-col items-center gap-2 sm:flex-1 sm:flex-row">
            <div className="h-full w-full rounded-lg border border-hairline bg-canvas/50 p-3">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                {layer.label}
              </p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {layer.nodes.map((node) => (
                  <li
                    key={node}
                    className="rounded border border-hairline bg-surface px-2 py-1 font-mono text-[11px] leading-snug text-ink"
                  >
                    {node}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 && (
              <>
                <ArrowRight aria-hidden="true" className="hidden size-4 shrink-0 text-accent sm:block" />
                <ArrowDown aria-hidden="true" className="size-4 shrink-0 text-accent sm:hidden" />
              </>
            )}
          </li>
        ))}
      </ol>
      {note && (
        <p className="mt-3 text-xs leading-relaxed text-muted">
          <Copy value={note} />
        </p>
      )}
    </div>
  );
}

function SectionContent({ project, section }: { project: Project; section: SectionId }) {
  switch (section) {
    case 'overview':
      return (
        <div className="flex flex-col gap-4">
          {isVisible(project.problem) && (
            <div>
              <Label>Problem</Label>
              <p className="text-sm leading-relaxed text-ink">
                <Copy value={project.problem} />
              </p>
            </div>
          )}
          <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
          {isVisible(project.outcome) && (
            <div className="rounded-lg border-l-2 border-accent bg-accent-tint/50 px-4 py-3">
              <Label>Outcome</Label>
              <p className="text-sm font-medium leading-relaxed text-ink">
                <Copy value={project.outcome} />
              </p>
            </div>
          )}
          <div>
            <Label>How it was built</Label>
            <ul className="flex flex-wrap gap-2">
              {project.builtWith.map((t) => (
                <li
                  key={t}
                  className="rounded-md bg-accent-tint/80 border border-accent/20 px-2.5 py-1 font-mono text-xs text-accent font-medium"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case 'architecture':
      return project.architecture ? (
        <ArchitectureDiagram architecture={project.architecture} name={project.name} />
      ) : null;
    case 'decisions':
      return (
        <ul className="flex flex-col gap-4">
          {project.decisions
            ?.filter((d) => isVisible(d.title) && isVisible(d.why))
            .map((d) => (
              <li key={d.title} className="border-l-2 border-hairline pl-4">
                <p className="text-sm font-semibold text-ink">
                  <Copy value={d.title} />
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  <Copy value={d.why} />
                </p>
              </li>
            ))}
        </ul>
      );
    case 'hard':
      return (
        <ul className="flex flex-col gap-4">
          {project.hard
            ?.filter((h) => isVisible(h.challenge) && isVisible(h.approach))
            .map((h) => (
              <li key={h.challenge} className="rounded-lg border border-hairline p-4">
                <Label>Challenge</Label>
                <p className="text-sm font-medium leading-relaxed text-ink">
                  <Copy value={h.challenge} />
                </p>
                <div className="mt-3">
                  <Label>Approach</Label>
                  <p className="text-sm leading-relaxed text-muted">
                    <Copy value={h.approach} />
                  </p>
                </div>
              </li>
            ))}
        </ul>
      );
  }
}

function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  const base = `inline-flex items-center justify-center gap-2 rounded-lg border border-hairline bg-surface text-ink hover:border-accent hover:text-accent font-mono text-xs h-9 transition-colors shadow-sm ${
    compact ? 'flex-1 px-3' : 'px-3.5'
  }`;
  return (
    <>
      {project.links.code && (
        <a href={project.links.code} target="_blank" rel="noreferrer" className={`${base} font-medium`}>
          <CodeXml className={compact ? 'size-3.5' : 'size-4'} />
          <span>Code</span>
          <span className="sr-only">for {project.name} (opens in new tab)</span>
        </a>
      )}
      {project.links.live && (
        <a
          href={project.links.live}
          target="_blank"
          rel="noreferrer"
          className={`${base} font-semibold hover:bg-accent-tint/60`}
        >
          <ExternalLink className={`text-accent ${compact ? 'size-3.5' : 'size-4'}`} />
          <span>Live Demo</span>
          <span className="sr-only">of {project.name} (opens in new tab)</span>
        </a>
      )}
    </>
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const projectTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionTabRefs = useRef<Partial<Record<SectionId, HTMLButtonElement | null>>>({});

  const selectProject = (index: number) => {
    setActiveIndex(index);
    setActiveSection('overview');
  };

  // Roving focus: arrow keys move both selection and focus.
  const handleProjectKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === 'ArrowDown') next = (index + 1) % projects.length;
    else if (e.key === 'ArrowUp') next = (index - 1 + projects.length) % projects.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = projects.length - 1;
    if (next === null) return;
    e.preventDefault();
    selectProject(next);
    projectTabRefs.current[next]?.focus();
  };

  const handleSectionKeyDown = (e: React.KeyboardEvent, sections: SectionId[], current: SectionId) => {
    const i = sections.indexOf(current);
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = (i + 1) % sections.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + sections.length) % sections.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = sections.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActiveSection(sections[next]);
    sectionTabRefs.current[sections[next]]?.focus();
  };

  // Deep links like #project-mergo (used by the Skills section) open that project.
  useEffect(() => {
    const syncFromHash = () => {
      const match = window.location.hash.match(/^#project-(.+)$/);
      if (!match) return;
      const index = projects.findIndex((p) => p.slug === match[1]);
      if (index === -1) return;
      setActiveIndex(index);
      setActiveSection('overview');
      document.getElementById('projects')?.scrollIntoView();
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

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

  // On mobile every accordion item can be closed (-1); desktop always shows one project.
  const desktopIndex = Math.max(activeIndex, 0);
  const activeProject = projects[desktopIndex];
  const activeSections = sectionsFor(activeProject);
  const currentSection = activeSections.includes(activeSection) ? activeSection : 'overview';

  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20 sm:px-6"
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
          Interactive explorer — select a project to inspect architecture, technical decisions, and live deployments.
        </p>
      </div>

      {/* Desktop Split View (>= md) */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Project List */}
        <div className="md:col-span-4 flex flex-col gap-2" role="tablist" aria-label="Projects Explorer" aria-orientation="vertical">
          {projects.map((project, index) => {
            const isActive = desktopIndex === index;

            return (
              <button
                key={project.slug}
                ref={(el) => {
                  projectTabRefs.current[index] = el;
                }}
                id={`project-tab-${index}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`project-panel-${index}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectProject(index)}
                onKeyDown={(e) => handleProjectKeyDown(e, index)}
                className={`group relative flex items-center justify-between rounded-xl px-4 py-3.5 text-left transition-all duration-200 cursor-pointer border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${isActive
                  ? 'border-accent bg-surface shadow-md'
                  : 'border-transparent hover:border-hairline hover:bg-surface/50 text-muted'
                  }`}
              >
                {/* Active Indicator Bar */}
                <div
                  className={`absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full transition-all duration-200 ${isActive ? 'bg-accent opacity-100 scale-y-100' : 'bg-transparent opacity-0 scale-y-0'
                    }`}
                />

                <div className="flex items-center gap-3 pl-1">
                  <span className={`font-mono text-xs transition-colors duration-200 ${isActive ? 'text-accent font-semibold' : 'text-muted/60 group-hover:text-muted'
                    }`}>
                    0{index + 1}
                  </span>
                  <span className={`font-serif text-lg tracking-tight transition-colors duration-200 ${isActive ? 'text-ink font-bold' : 'text-muted group-hover:text-ink font-normal'
                    }`}>
                    {project.name}
                  </span>
                </div>

                <ChevronRight
                  className={`size-4 transition-transform duration-200 ${isActive ? 'text-accent translate-x-0 opacity-100' : '-translate-x-2 opacity-0 text-muted group-hover:opacity-40'
                    }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Detail Panel */}
        <div className="md:col-span-8">
          <div className="relative min-h-[460px] rounded-2xl border border-hairline bg-surface/90 backdrop-blur-md p-6 sm:p-7 shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.slug}
                id={`project-panel-${desktopIndex}`}
                role="tabpanel"
                aria-labelledby={`project-tab-${desktopIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex flex-col gap-6"
              >
                {/* Browser Mockup Window */}
                <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-sm">
                  <div className="flex items-center justify-between px-3.5 py-2.5 bg-accent-tint/40 border-b border-hairline text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400/80 inline-block" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface/90 border border-hairline/60 text-[11px] text-muted max-w-[280px] truncate">
                      <Globe className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="truncate">{activeProject.previewUrl || activeProject.links.live || activeProject.links.code}</span>
                    </div>
                    <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-accent/10">
                      LIVE PREVIEW
                    </span>
                  </div>

                  <div className="relative h-64 sm:h-72 w-full bg-canvas/60 overflow-hidden flex items-center justify-center">
                    {activeProject.previewUrl ? (
                      <div className="w-full h-full relative overflow-hidden bg-surface">
                        <iframe
                          src={activeProject.previewUrl}
                          title={`${activeProject.name} Live Preview`}
                          className="w-[200%] h-[200%] transform scale-50 origin-top-left border-0 select-none pointer-events-auto"
                          loading="lazy"
                        />
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

                {/* Title, tagline, links */}
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink">{activeProject.name}</h3>
                    <div className="flex items-center gap-2">
                      <ProjectLinks project={activeProject} />
                    </div>
                  </div>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-accent font-semibold">
                    {activeProject.tagline}
                  </p>
                </div>

                {/* Section tabs */}
                {activeSections.length > 1 && (
                  <div
                    role="tablist"
                    aria-label={`${activeProject.name} details`}
                    className="-mb-2 flex flex-wrap gap-1 border-b border-hairline"
                  >
                    {activeSections.map((section) => {
                      const isActive = currentSection === section;
                      return (
                        <button
                          key={section}
                          ref={(el) => {
                            sectionTabRefs.current[section] = el;
                          }}
                          id={`project-section-tab-${section}`}
                          role="tab"
                          aria-selected={isActive}
                          aria-controls="project-section-panel"
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => setActiveSection(section)}
                          onKeyDown={(e) => handleSectionKeyDown(e, activeSections, section)}
                          className={`-mb-px border-b-2 px-3 py-2 font-mono text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                            isActive ? 'border-accent text-accent font-semibold' : 'border-transparent text-muted hover:text-ink'
                          }`}
                        >
                          {sectionLabels[section]}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div
                  id="project-section-panel"
                  role={activeSections.length > 1 ? 'tabpanel' : undefined}
                  aria-labelledby={activeSections.length > 1 ? `project-section-tab-${currentSection}` : undefined}
                >
                  <SectionContent project={activeProject} section={currentSection} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Accordion View (< md): sections stacked instead of tabbed */}
      <div className="flex md:hidden flex-col gap-3">
        {projects.map((project, index) => {
          const isOpen = activeIndex === index;
          const bodyId = `project-mobile-body-${project.slug}`;

          return (
            <div
              key={project.slug}
              className={`overflow-hidden rounded-xl border transition-all duration-200 ${isOpen
                ? 'border-accent bg-surface shadow-md'
                : 'border-hairline bg-surface/70'
                }`}
            >
              <button
                type="button"
                onClick={() => (isOpen ? setActiveIndex(-1) : selectProject(index))}
                aria-expanded={isOpen}
                aria-controls={bodyId}
                className="flex w-full items-center justify-between p-4 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-semibold ${isOpen ? 'text-accent' : 'text-muted/60'}`}>
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className={`font-serif text-lg font-bold ${isOpen ? 'text-ink' : 'text-muted'}`}>
                      {project.name}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-accent mt-0.5">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`size-5 text-accent shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={bodyId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-1 border-t border-hairline/60 flex flex-col gap-5">
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
                          </div>
                        </div>
                      )}

                      {sectionsFor(project).map((section) => (
                        <div key={section}>
                          {section !== 'overview' && (
                            <h4 className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                              {sectionLabels[section]}
                            </h4>
                          )}
                          <SectionContent project={project} section={section} />
                        </div>
                      ))}

                      <div className="flex items-center gap-2 pt-3 border-t border-hairline/50">
                        <ProjectLinks project={project} compact />
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
