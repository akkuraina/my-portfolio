// Experience timeline content for components/Experience.tsx, newest first.

export type Experience = {
  dates: string;
  role: string;
  company: string;
  location: string;
  mode: string;
  bullets: string[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    dates: 'October 2026 – Present',
    role: 'Product Engineering Intern',
    company: 'Tenet',
    location: 'Texas, USA',
    mode: 'Remote',
    bullets: [
      'Developing backend services and product features for an AI-powered voice-agent platform using Go and TypeScript, contributing to the inference proxy, control-plane APIs, and the React-based review studio.',
      'Automating base-model integration workflows, streamlining model configuration, registration, and inference routing so new models can be onboarded, evaluated in simulation, and served with minimal manual setup.',
      'Working with Redis, PostgreSQL (Neon), Cloudflare R2, and Google Cloud Secret Manager across isolated development and production environments to support reliable, environment-specific model and adapter serving.',
    ],
    tech: ['Go', 'TypeScript', 'React', 'Redis', 'PostgreSQL (Neon)', 'Cloudflare R2', 'Google Cloud'],
  },
  {
    dates: 'July 2026 – October 2026',
    role: 'Fullstack Developer Intern',
    company: 'Sugamaya Governance LLP',
    location: 'Malad West, Mumbai',
    mode: 'On-site',
    bullets: [
      'Worked across web development and backend architecture on multiple concurrent client and in-house products, translating product requirements into shipped features end-to-end.',
      'Built and iterated on the company\'s in-house collaborative platforms, contributing UI enhancements, API integrations, and performance improvements to core workflows.',
      'Designed and maintained backend services and database schemas, ensuring reliable data flow between the web and server layers.',
      'Collaborated with cross-functional teams to debug production issues, optimize deployment pipelines, and improve overall system reliability.',
    ],
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Node.js'],
  },
  {
    dates: 'June 2025 – July 2025',
    role: 'IT Intern',
    company: 'Tech Mahindra',
    location: 'Powai, Mumbai',
    mode: 'Hybrid',
    bullets: [
      'Engineered workflow in ServiceNow under ITIL4, eliminating manual intervention in enterprise ticketing systems.',
      'Streamlined incident management for enterprise clients and performed root-cause analysis to optimize processes and improve SLA compliance.',
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
