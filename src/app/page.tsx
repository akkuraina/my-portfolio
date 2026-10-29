'use client';

import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import About from '../components/About';

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
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Research />
      <Contact />
      <Footer />
    </main>
  );
}