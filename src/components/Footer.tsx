'use client';

import { CodeXml, Contact, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/akkuraina',
      icon: CodeXml,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/akanksha-raina-4637b5268/',
      icon: Contact,
    },
    {
      name: 'X / Twitter',
      href: 'https://x.com',
      icon: Twitter,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/akkuraina',
      icon: Instagram,
    },
  ];

  return (
    <footer className="border-t border-hairline bg-canvas py-12 px-5 sm:px-6 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left Side: Minimal Copy & Email */}
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Anyone can build something that works once.
              <br className="hidden sm:block" />
              I build things that keep working.
            </h3>
            <a
              href="mailto:akanksharaina04@gmail.com"
              className="inline-flex items-center gap-2 font-mono text-sm font-medium text-accent hover:underline transition-colors"
            >
              <Mail className="size-4" />
              akanksharaina04@gmail.com
            </a>
          </div>

          {/* Right Side: Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.name}
                  title={item.name}
                  className="inline-flex items-center justify-center rounded-md border border-hairline bg-surface p-2.5 text-muted transition-colors hover:border-accent hover:bg-accent-tint hover:text-accent"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-8 flex items-center justify-between border-t border-hairline/40 pt-8 font-mono text-xs text-muted">
          <p>Made with love, &lt;3 akanksha</p>
          <p>© {new Date().getFullYear()} Akanksha Raina</p>
        </div>
      </div>
    </footer>
  );
}
