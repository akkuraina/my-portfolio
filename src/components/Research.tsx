'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { FileText, Award, ArrowUpRight } from 'lucide-react';
import SectionTag from './SectionTag';
import Copy from './Copy';
import { papers, certifications, type Certification } from '../data/credentials';
import { isTodo, isVisible, showTodos } from '../lib/todo';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

// Until the exact course title is filled in, production shows a truthful generic label.
function certTitle(cert: Certification) {
  if (isTodo(cert.title) && !showTodos) return `${cert.area} course`;
  return cert.title;
}

function FileLink({ href, label, name }: { href?: string; label: string; name: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
      <ArrowUpRight className="size-3.5" />
      <span className="sr-only">: {name} (opens in new tab)</span>
    </a>
  );
}

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <motion.section
      ref={sectionRef}
      id="research"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20 sm:px-6"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <SectionTag text="~/research" start={isInView} />
        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Research &amp; certifications.
        </h2>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Papers */}
        <div className="lg:col-span-7">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">Papers</h3>
          <ul className="flex flex-col gap-4">
            {papers.map((paper) => (
              <motion.li
                key={paper.title}
                variants={itemVariants}
                className="rounded-lg border border-hairline bg-surface p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="rounded-md bg-accent-tint px-2 py-0.5 font-medium text-accent">{paper.role}</span>
                  {isVisible(paper.status) && <Copy value={paper.status} className="rounded-md border border-hairline px-2 py-0.5 text-muted" />}
                  {isVisible(paper.year) && <Copy value={paper.year} className="text-muted" />}
                </div>
                <div className="mt-3 flex items-start gap-3">
                  <FileText aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
                  <div className="min-w-0">
                    <p className="font-serif text-xl font-bold text-ink">{paper.title}</p>
                    {isVisible(paper.venue) && (
                      <p className="mt-1 text-sm text-muted">
                        <Copy value={paper.venue} />
                      </p>
                    )}
                  </div>
                </div>
                {isVisible(paper.summary) && (
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    <Copy value={paper.summary} />
                  </p>
                )}
                <div className="mt-4 border-t border-hairline/60 pt-3">
                  <FileLink href={paper.file} label="Read paper" name={paper.title} />
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div className="lg:col-span-5">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">Certifications</h3>
          <ul className="flex flex-col gap-3">
            {certifications.map((cert) => (
              <motion.li
                key={cert.title}
                variants={itemVariants}
                className="flex items-start gap-3 rounded-lg border border-hairline bg-surface p-4"
              >
                <Award aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-snug text-ink">
                    <Copy value={certTitle(cert)} />
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-[11px] text-muted">
                    <span>{cert.issuer}</span>
                    <span aria-hidden="true">·</span>
                    <span>{cert.area}</span>
                    {isVisible(cert.year) && !isTodo(cert.year) && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{cert.year}</span>
                      </>
                    )}
                  </p>
                  {isTodo(cert.year) && (
                    <div className="mt-2">
                      <Copy value={cert.year} />
                    </div>
                  )}
                  <div className="mt-2">
                    <FileLink href={cert.file} label="View certificate" name={certTitle(cert)} />
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
