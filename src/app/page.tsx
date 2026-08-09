'use client';

import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Leadership from '../components/Leadership';
import Education from '../components/Education';
import BuildTogether from '../components/BuildTogether';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Leadership />
      <Education />
      <BuildTogether />
    </main>
  );
}