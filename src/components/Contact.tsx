'use client';

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Mail, FileText, Github, Linkedin, Instagram, Copy as CopyIcon, Check } from 'lucide-react';
import SectionTag from './SectionTag';
import { site } from '../data/site';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const socials = [
  { name: 'GitHub', href: site.github, icon: Github },
  { name: 'LinkedIn', href: site.linkedin, icon: Linkedin },
  { name: 'Instagram', href: site.instagram, icon: Instagram },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context): the mailto button still works.
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20 sm:px-6"
    >
      <div className="rounded-2xl border border-hairline bg-surface/80 p-6 sm:p-12 shadow-[0_1px_0_rgba(28,27,25,0.04)] backdrop-blur">
        <SectionTag text="~/contact" start={isInView} />

        <h2 className="mt-4 max-w-2xl font-serif text-3xl font-normal text-ink sm:text-5xl">
          Let&apos;s build something <span className="text-gradient">worth shipping.</span>
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          Anyone can build something that works once. I build things that keep working.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent btn-pop h-11 px-5"
          >
            <Mail className="size-4" />
            Email me
          </a>
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent border border-hairline bg-transparent text-ink hover:border-accent hover:text-accent h-11 px-5"
          >
            <FileText className="size-4" />
            View resume
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex w-fit items-center gap-2 rounded-md font-mono text-sm text-accent transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {site.email}
            {copied ? <Check className="size-4" /> : <CopyIcon className="size-4" />}
            <span className="sr-only">{copied ? '' : '(copy to clipboard)'}</span>
          </button>
          <span aria-live="polite" className="sr-only">
            {copied ? 'Email address copied' : ''}
          </span>

          <ul className="flex items-center gap-2">
            {socials.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  title={name}
                  className="inline-flex items-center justify-center rounded-md border border-hairline bg-surface p-2.5 text-muted transition-colors hover:border-accent hover:bg-accent-tint hover:text-accent"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
