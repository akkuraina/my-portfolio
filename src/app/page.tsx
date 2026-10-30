'use client';

import dynamic from 'next/dynamic';
import Landing from '../components/landing/Landing';
import PopBackground from '../components/PopBackground';
import Hero from '../components/Hero';

// Lazy load below-the-fold components with Next.js dynamic imports
const Experience = dynamic(() => import('../components/Experience'), {
  ssr: true,
});

const Projects = dynamic(() => import('../components/Projects'), {
  ssr: true,
});

const Skills = dynamic(() => import('../components/Skills'), {
  ssr: true,
});

const Research = dynamic(() => import('../components/Research'), {
  ssr: true,
});

const Contact = dynamic(() => import('../components/Contact'), {
  ssr: true,
});

const Footer = dynamic(() => import('../components/Footer'), {
  ssr: true,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Sticky 3D landing; the curved panel below scrolls up over it.
          overflow-x-clip stops slide-in animations from widening the mobile viewport. */}
      <Landing />
      <div className="relative z-10 overflow-x-clip rounded-t-[50%_3rem] border-t border-hairline bg-canvas shadow-[0_-24px_60px_-24px_color-mix(in_srgb,var(--accent)_45%,transparent)] sm:rounded-t-[50%_7rem]">
        <PopBackground variant="panel" />
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Research />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}