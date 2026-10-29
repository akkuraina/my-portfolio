'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, CornerDownLeft, Hash, FolderGit2, FileText, ExternalLink, SunMoon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { projects } from '../data/projects';
import { papers } from '../data/credentials';
import { sections, site } from '../data/site';
import { skillGroups } from '../data/skills';

type Item = {
  id: string;
  label: string;
  group: 'Sections' | 'Projects' | 'Research' | 'Links' | 'Actions';
  hint?: string;
  keywords: string;
  href?: string;
  external?: boolean;
  action?: () => void;
};

const groupIcons = {
  Sections: Hash,
  Projects: FolderGit2,
  Research: FileText,
  Links: ExternalLink,
  Actions: SunMoon,
};

function buildItems(toggleTheme: () => void): Item[] {
  return [
    ...sections.map((s) => ({
      id: `section-${s.id}`,
      label: s.label,
      group: 'Sections' as const,
      keywords: s.id === 'skills' ? skillGroups.flatMap((g) => [g.title, ...g.skills.map((k) => k.name)]).join(' ') : '',
      href: `#${s.id}`,
    })),
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      label: p.name,
      group: 'Projects' as const,
      hint: p.tagline,
      keywords: `${p.tagline} ${p.builtWith.join(' ')}`,
      href: `#project-${p.slug}`,
    })),
    ...papers.map((p) => ({
      id: `paper-${p.title}`,
      label: p.title,
      group: 'Research' as const,
      hint: 'Research paper',
      keywords: 'paper research publication',
      href: '#research',
    })),
    { id: 'link-resume', label: 'Resume', group: 'Links', hint: 'PDF', keywords: 'cv', href: site.resume, external: true },
    { id: 'link-email', label: 'Email', group: 'Links', hint: site.email, keywords: 'contact mail', href: `mailto:${site.email}`, external: true },
    { id: 'link-github', label: 'GitHub', group: 'Links', keywords: 'code repos', href: site.github, external: true },
    { id: 'link-linkedin', label: 'LinkedIn', group: 'Links', keywords: 'profile', href: site.linkedin, external: true },
    { id: 'action-theme', label: 'Toggle light / dark theme', group: 'Actions', keywords: 'dark light mode', action: toggleTheme },
  ];
}

function matches(item: Item, query: string) {
  const haystack = `${item.label} ${item.hint ?? ''} ${item.keywords}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const items = useMemo(() => buildItems(toggleTheme), [toggleTheme]);
  const results = useMemo(() => items.filter((item) => matches(item, query)), [items, query]);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setQuery('');
    setActiveIndex(0);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = '';
      returnFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (!open) return null;

  const run = (item: Item) => {
    onClose();
    if (item.action) {
      item.action();
    } else if (item.external && item.href) {
      window.open(item.href, item.href.startsWith('mailto:') ? '_self' : '_blank', 'noopener,noreferrer');
    } else if (item.href) {
      if (window.location.hash === item.href) {
        // Same hash again: hashchange won't fire, so re-trigger listeners and scroll manually.
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        document.getElementById(item.href.slice(1))?.scrollIntoView();
      } else {
        window.location.hash = item.href;
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) run(results[activeIndex]);
    } else if (e.key === 'Tab') {
      // Focus stays in the input; options are chosen with the arrow keys.
      e.preventDefault();
    }
  };

  // Portaled to <body>: the sticky header's backdrop-filter would otherwise contain this fixed overlay.
  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" onKeyDown={onKeyDown}>
      <div aria-hidden="true" className="absolute inset-0 bg-canvas/80 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-hairline bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-hairline px-4">
          <Search aria-hidden="true" className="size-4 shrink-0 text-accent" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, skills, sections…"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-results"
            aria-activedescendant={results[activeIndex] ? `cmd-${results[activeIndex].id}` : undefined}
            aria-autocomplete="list"
            className="h-12 w-full bg-transparent text-sm text-ink placeholder:text-muted/70 focus:outline-none"
          />
          <kbd className="hidden rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-muted sm:inline">Esc</kbd>
        </div>

        <ul
          ref={listRef}
          id="command-palette-results"
          role="listbox"
          aria-label="Results"
          className="max-h-[50vh] overflow-y-auto p-2"
        >
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results for “{query}”</li>}
          {results.map((item, index) => {
            const Icon = groupIcons[item.group];
            const isActive = index === activeIndex;
            const showGroup = index === 0 || results[index - 1].group !== item.group;
            return (
              <li key={item.id} role="presentation">
                {showGroup && (
                  <p role="presentation" className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70">
                    {item.group}
                  </p>
                )}
                <div
                  id={`cmd-${item.id}`}
                  role="option"
                  aria-selected={isActive}
                  data-index={index}
                  onMouseMove={() => setActiveIndex(index)}
                  onClick={() => run(item)}
                  className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm ${
                    isActive ? 'bg-accent-tint text-ink' : 'text-muted'
                  }`}
                >
                  <Icon aria-hidden="true" className={`size-4 shrink-0 ${isActive ? 'text-accent' : ''}`} />
                  <span className="shrink-0 font-medium">{item.label}</span>
                  {item.hint && <span className="truncate font-mono text-[11px] text-muted/80">{item.hint}</span>}
                  {isActive && <CornerDownLeft aria-hidden="true" className="ml-auto size-3.5 shrink-0 text-accent" />}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
