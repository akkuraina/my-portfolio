'use client';

import { useState } from 'react';
import Typewriter from '../components/Typewriter';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen relative">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center relative">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center gap-12 z-10 pt-20">
          {/* Main Content - Photo and Text */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl">
            {/* Text Content */}
            <div className="text-center md:text-left md:max-w-[500px]">
              <h1 className="text-6xl md:text-7xl font-bold text-gray-300 mb-6 leading-tight">
                <Typewriter
                  text="Hi, I'm Akanksha"
                  delay={200}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                />
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
                Full Stack Developer & AIML enthusiast
              </p>
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                I craft beautiful, functional web experiences using modern technologies. 
                Passionate about clean code, innovative solutions, and bringing ideas to life.
              </p>
            </div>

            {/* Photo */}
            <div className="flex justify-center">
              <div className="relative w-[320px] h-[400px] md:w-[400px] md:h-[500px] rounded-2xl overflow-hidden border-2 border-cyan-100/20 shadow-2xl shadow-cyan-500/20">
                <img
                  src="public\images\akku.png"
                  alt="Akanksha"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>
            </div>
          </div>
 
          {/* Quick Stats/Skills */}
          <div className="w-full mt-20">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-800/30 backdrop-blur-sm border border-cyan-100/10 rounded-2xl p-8 hover:border-cyan-100/30 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">2+</div>
                  <div className="text-gray-300 text-lg">Years Experience</div>
                </div>
                <div className="bg-slate-800/30 backdrop-blur-sm border border-cyan-100/10 rounded-2xl p-8 hover:border-cyan-100/30 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">10+</div>
                  <div className="text-gray-300 text-lg">Projects Completed</div>
                </div>
                <div className="bg-slate-800/30 backdrop-blur-sm border border-cyan-100/10 rounded-2xl p-8 hover:border-cyan-100/30 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">20+</div>
                  <div className="text-gray-300 text-lg">Technologies Mastered</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-100/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-100 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <div className="mb-24"></div>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-4xl mx-auto px-6 text-center z-10">
          <h2 className="text-6xl font-bold text-gray-300 mb-8">
            About Me
          </h2>
          <div className="text-lg text-gray-300 space-y-6 max-w-2xl mx-auto">
            <p>
              Hi! I'm Akanksha, a 20-year-old student/developer based in Mumbai. 
              When I'm not on my laptop, you can find me on the tennis court, playing the piano in the dark, or huddled with (a few) good books.
            </p>
          </div>
          
          {/* Education Section */}
          <div className="mt-16">
            <h3 className="text-4xl font-bold text-cyan-100 mb-12 text-center">Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* College */}
              <a
                href="https://www.djsce.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-100/20 hover:border-cyan-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 h-[300px]">
                  <div className="flex flex-col items-center mb-6">
                    <h4 className="text-2xl font-bold text-cyan-100 group-hover:text-cyan-300 transition-colors mb-2">Dwarkadas J. Sanghvi College of Engineering</h4>
                    <div className="space-y-4">
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-lg">B.Tech in Electronics and Telecommunication, honors in AIML</p>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-lg">SGPA: 7.7</p>
                      <p className="text-cyan-100/70 group-hover:text-cyan-100 transition-colors text-lg font-semibold">2023 - 2027</p>
                    </div>
                  </div>
                </div>
              </a>

              {/* School */}
              <a
                href="https://ncsmumbai.nesnavy.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-100/20 hover:border-cyan-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 h-[300px]">
                  <div className="flex flex-col items-center mb-6">
                    <h4 className="text-2xl font-bold text-cyan-100 group-hover:text-cyan-300 transition-colors mb-2">Navy Children School, New Delhi</h4>
                    <div className="space-y-4">
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-lg">CBSE</p>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-lg">12th Grade: 90.75%</p>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-lg">10th Grade: 94.6%</p>
                      <p className="text-cyan-100/70 group-hover:text-cyan-100 transition-colors text-lg font-semibold">2011 - 2023</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-6xl font-bold text-gray-300 mb-12 text-center">
            Experience & Skills
          </h2>

          {/* Work Experience Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-cyan-100 mb-6">Work Experience</h3>
            <div className="space-y-6">
              {/* Current Internship */}
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-100/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-100">IT Intern</h3>
                    <p className="text-gray-300">Tech Mahindra</p>
                  </div>
                  <span className="text-gray-400">Present</span>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Working on ITIL4 framework and ServiceNow </li>
                  <li>Collaborating with cross-functional teams</li>
                  <li>Implementing modern web technologies like javascript</li>
                </ul>
              </div>

              {/* Previous Internship */}
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-100/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-100">Robotics and Mechatronics Intern</h3>
                    <p className="text-gray-300">Naval Dockyard, Mumbai</p>
                  </div>
                  <span className="text-gray-400">2024</span>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Worked in the WECORS department</li>
                  <li>Caliberated instruments</li>
                  <li>Gained valuable and rare insights about the Navy's electronics </li>
                </ul>
              </div>

              {/* College Committees */}
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-100/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-cyan-100">College Committees</h3>
                  <span className="text-gray-400">2023-2025</span>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>IETE-ISF - Editorial Head</li>
                  <li>DJS NOVA - web dev (tech) assosiate</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-cyan-100 mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {/* Programming Languages & Frameworks */}
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-cyan-100/20 hover:border-cyan-100/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-900/30 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-cyan-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-cyan-100">Programming Languages & Frameworks</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">C</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Java</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Python</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">HTML</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">CSS</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">JavaScript</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">React.js</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Next.js</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Typescript</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Express.js</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">PostgreSQL</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">MongoDB</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Socket.io</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">EJS</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Tailwind CSS</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Bootstrap</span>
                </div>
              </div>

              {/* Software & Tools */}
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-cyan-100/20 hover:border-cyan-100/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-900/30 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-cyan-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-cyan-100">Software & Tools</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">MS Word</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">MS PowerPoint</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">MS Excel</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Power BI</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">AutoCAD</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">SciLab</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">MATLAB</span>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-cyan-100/20 hover:border-cyan-100/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-900/30 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-cyan-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-cyan-100">Soft Skills</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Leadership</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Communication</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Editorial</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Marketing</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Team Collaboration</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Problem Solving</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Time Management</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Adaptability</span>
                  <span className="px-4 py-2 bg-cyan-900/30 text-cyan-100 rounded-full text-sm">Technical Writing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-6xl mx-auto px-6 text-center z-10">
          <h2 className="text-6xl font-bold text-gray-300 mb-12">
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Portfolio Website",
                description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and a star background.",
                technologies: ["Next.js", "TypeScript", "Tailwind"],
                link: "https://github.com/akkuraina/my-portfolio"
              },
              {
                title: "YapMonster",
                description: "A full-stack chatting application with real-time updates, user authentication, and drag-and-drop functionality.",
                technologies: ["React", "MongoDB", "Socket.io"],
                link: "https://github.com/akkuraina/YapMonster"
              },
              {
                title: "E-commerce Platform",
                description: "A feature-rich e-commerce platform with product management, user authentication, and payment integration.",
                technologies: ["Next.js", "PostgreSQL", "Stripe"],
                link: "https://github.com/akkuraina"
              }
            ].map((project, index) => (
              <div 
                key={index}
                className="bg-slate-800/30 backdrop-blur-sm border border-cyan-100/10 rounded-xl p-6 hover:border-cyan-100/30 transition-all duration-300 hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold text-cyan-100 mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-cyan-900/30 text-cyan-100 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-4xl mx-auto px-6 text-center z-10">
          <h2 className="text-6xl font-bold text-gray-300 mb-8">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-cyan-100 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-300 mb-2">Email</p>
                  <a href="mailto:akanksharainadjsce@gmail.com" className="text-cyan-100 hover:text-cyan-300">
                    akanksharainadjsce@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">Location</p>
                  <p className="text-cyan-100">Mumbai, India</p>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">Social</p>
                  <div className="flex gap-4">
                    <a href="https://github.com/akkuraina" target="_blank" rel="noopener noreferrer" className="text-cyan-100 hover:text-cyan-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/akanksha-raina-4637b5268/" target="_blank" rel="noopener noreferrer" className="text-cyan-100 hover:text-cyan-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href="https://instagram.com/akkuraina" target="_blank" rel="noopener noreferrer" className="text-cyan-100 hover:text-cyan-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full max-w-md px-3 py-1.5 bg-slate-800/50 border border-cyan-100/20 rounded-lg focus:outline-none focus:border-cyan-100/50 text-cyan-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full max-w-md px-3 py-1.5 bg-slate-800/50 border border-cyan-100/20 rounded-lg focus:outline-none focus:border-cyan-100/50 text-cyan-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full max-w-md px-3 py-1.5 bg-slate-800/50 border border-cyan-100/20 rounded-lg focus:outline-none focus:border-cyan-100/50 text-cyan-100 resize-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-4 py-1.5 bg-cyan-900/30 text-cyan-100 rounded-lg hover:bg-cyan-900/50 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}