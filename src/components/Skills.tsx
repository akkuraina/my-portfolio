'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { skillGroups, patterns, type SkillGroup } from '../data/skills';
import { projects } from '../data/projects';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

function SkillChips({ group, size = 'md' }: { group: SkillGroup; size?: 'sm' | 'md' }) {
  return (
    <ul className={`flex flex-wrap ${size === 'sm' ? 'gap-1.5' : 'gap-2'}`}>
      {group.skills.map((skill) => (
        <li
          key={skill.name}
          className={`rounded-md border border-hairline font-mono text-muted ${
            size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
          }`}
        >
          {skill.name}
        </li>
      ))}
    </ul>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [typedTag, setTypedTag] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [openGroup, setOpenGroup] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const fullText = '~/skills';
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

  const projectName = (slug: string) => projects.find((p) => p.slug === slug)?.name ?? slug;

  return (
    <motion.section
      ref={sectionRef}
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="mx-auto max-w-6xl px-5 py-20 sm:px-6"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-1 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent h-5">
          <span>{typedTag}</span>
          <span className={`inline-block w-1.5 h-3.5 bg-accent ${typingComplete ? 'animate-cursor' : 'opacity-100'}`} />
        </div>
        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
          The stack I build with.
        </h2>
      </motion.div>

      {/* Desktop / tablet grid (>= md): strongest group spans two columns */}
      <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            variants={itemVariants}
            className={`flex flex-col rounded-lg border border-hairline bg-surface p-6 shadow-[0_1px_0_rgba(28,27,25,0.04)] transition duration-300 hover:-translate-y-1 hover:border-accent ${
              index === 0 ? 'md:col-span-2' : ''
            }`}
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{group.title}</h3>
            <div className="mt-4">
              <SkillChips group={group} />
            </div>
          </motion.article>
        ))}
      </div>

      {/* Mobile accordion (< md) */}
      <motion.div variants={itemVariants} className="flex flex-col gap-2.5 md:hidden">
        {skillGroups.map((group, index) => {
          const isOpen = openGroup === index;
          const panelId = `skill-group-${index}`;
          return (
            <div
              key={group.title}
              className={`overflow-hidden rounded-xl border bg-surface transition-colors ${
                isOpen ? 'border-accent' : 'border-hairline'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenGroup(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{group.title}</span>
                <span className="flex items-center gap-2 font-mono text-[11px] text-muted">
                  {group.skills.length}
                  <ChevronRight
                    className={`size-4 text-accent transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                  />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-hairline/60 px-4 pb-4 pt-3">
                      <SkillChips group={group} size="sm" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>

      {/* Patterns shipped, each linked to its project */}
      <motion.div
        variants={itemVariants}
        className="mt-6 rounded-lg border border-hairline bg-surface p-5 sm:p-6"
      >
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Patterns I&apos;ve shipped</h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((pattern) => (
            <li key={pattern.name}>
              <a
                href={`#project-${pattern.project}`}
                className="group flex items-center justify-between gap-3 rounded-md border border-hairline px-3 py-2.5 text-sm text-ink transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span>{pattern.name}</span>
                <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-muted group-hover:text-accent">
                  {projectName(pattern.project)}
                  <ArrowUpRight className="size-3.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
}
