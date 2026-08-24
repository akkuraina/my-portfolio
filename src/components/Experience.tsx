'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { MapPin } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [typedTag, setTypedTag] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const fullText = '~/experience';
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

  const experiences = [
    {
      dates: 'July 2026 – Present',
      role: 'Fullstack Developer Intern',
      company: 'Sugamaya Governance LLP',
      location: 'Malad West, Mumbai',
      mode: 'On-site',
      bullets: [
        'Worked across web development, mobile development, and backend architecture on multiple concurrent client and in-house products, translating product requirements into shipped features end-to-end.',
        'Built and iterated on the company\'s in-house collaborative platforms, contributing UI enhancements, API integrations, and performance improvements to core workflows.',
        'Designed and maintained backend services and database schemas, ensuring reliable data flow between mobile, web, and server layers.',
        'Collaborated with cross-functional teams to debug production issues, optimize deployment pipelines, and improve overall system reliability.',
      ],
      tech: ['Next.js', 'React Native', 'TypeScript', 'PostgreSQL', 'Node.js'],
    },
    {
      dates: 'June 2025 – August 2025',
      role: 'IT Intern',
      company: 'Tech Mahindra',
      location: 'Powai, Mumbai',
      mode: 'Hybrid',
      bullets: [
        'Engineered workflow in ServiceNow under ITIL4, eliminating manual intervention in enterprise ticketing systems.',
        'Streamlined incident management for enterprise clients, driving a 20% increase in SLA compliance, and performed root-cause analysis to optimize processes and enhance operational efficiency.',
      ],
      tech: ['ServiceNow', 'ITIL4'],
    },
    {
      dates: 'July 2024',
      role: 'Robotics and Mechatronics Intern',
      company: 'Naval Dockyard, Mumbai (WECORS)',
      location: 'Fort, Mumbai',
      mode: 'On-site',
      bullets: [
        'Contributed to mission-critical naval systems within WECORS by supporting calibration, overhaul, and maintenance activities.',
        'Calibrated over 30 precision instruments and performed PCB soldering and in-circuit testing on 50+ ICs to ensure system reliability and operational readiness.',
      ],
      tech: ['Robotics', 'Mechatronics', 'PCB Soldering', 'Circuit Testing', 'WECORS', 'Naval Systems'],
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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
          Deploy History.
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative ml-2 space-y-8 border-l border-hairline pl-7 sm:ml-4 sm:pl-9">
        {experiences.map((exp, index) => (
          <motion.div key={index} variants={itemVariants}>
            <article className="group relative rounded-lg border border-hairline bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent shadow-[0_1px_0_rgba(28,27,25,0.04)]">
              {/* Dot marker */}
              <span className="absolute -left-[2.17rem] top-7 size-3 rounded-full border-2 border-canvas bg-accent sm:-left-[2.67rem]"></span>

              {/* Header Info */}
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="font-mono text-xs text-muted">{exp.dates}</p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">{exp.role}</h3>
                  <p className="mt-1 text-sm text-muted">{exp.company}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted sm:justify-end">
                  <span className="inline-flex items-center gap-1 rounded-md border border-hairline px-2.5 py-1">
                    <MapPin className="size-3 text-accent" />
                    {exp.location}
                  </span>
                  <span className="rounded-md bg-accent-tint px-2.5 py-1 text-accent font-medium">
                    {exp.mode}
                  </span>
                </div>
              </div>

              {/* Bullets */}
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
                {exp.bullets.map((bullet, bIndex) => (
                  <li key={bIndex} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {exp.tech.map((t, tIndex) => (
                  <span
                    key={tIndex}
                    className="rounded-md border border-hairline px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
