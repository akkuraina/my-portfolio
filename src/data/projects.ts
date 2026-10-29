// Project content for the explorer in components/Projects.tsx.
// Strings starting with "TODO" are placeholders (see lib/todo.ts): visible in
// dev, hidden in production. Optional sections with no content are hidden.

export type ArchitectureLayer = {
  label: string;
  nodes: string[];
};

export type Architecture =
  | { kind: 'layers'; layers: ArchitectureLayer[]; note?: string }
  | { kind: 'image'; src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  problem?: string;
  outcome?: string;
  builtWith: string[];
  decisions?: { title: string; why: string }[];
  hard?: { challenge: string; approach: string }[];
  architecture?: Architecture;
  links: { code?: string; live?: string };
  previewUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'mergo',
    name: 'Mergo',
    tagline: 'Conflict-free collaborative document editor & CRDT engine',
    summary:
      'High-performance real-time collaborative text editor built with Replicated Growable Array (RGA) CRDT for conflict-free multi-user synchronization, presence awareness, point-in-time version history snapshots, multi-page document layout, and Clerk authentication.',
    problem: 'TODO: What problem does Mergo solve, and for whom? (1–2 sentences)',
    outcome: 'TODO: One-line outcome — what works today, and any real number you have.',
    builtWith: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Tiptap', 'CRDT / RGA', 'Clerk', 'TailwindCSS'],
    links: {
      code: 'https://github.com/akkuraina/mergo',
      live: 'https://mergo-sand.vercel.app',
    },
    previewUrl: 'https://mergo-sand.vercel.app',
  },
  {
    slug: 'truepath',
    name: 'TruePath',
    tagline: 'Event-sourced financial ledger & CQRS projections',
    summary:
      'Audit-ready financial engine built with append-only event stream architecture, CQRS read-model projections, transaction reversals, automated budget controls, self-healing serverless sync, and cloud receipt storage.',
    problem: 'TODO: What problem does TruePath solve, and for whom?',
    outcome: 'TODO: One-line outcome.',
    builtWith: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Prisma 7', 'Redis', 'BullMQ', 'Better Auth', 'Appwrite'],
    links: {
      code: 'https://github.com/akkuraina/truepath',
      live: 'https://truepath-iota.vercel.app',
    },
    previewUrl: 'https://truepath-iota.vercel.app',
  },
  {
    slug: 'flagzilla',
    name: 'Flagzilla',
    tagline: 'Browser-based real-time 3D multiplayer game',
    summary:
      'WebSocket-based player synchronization with authoritative backend state, real-time in-game chat, and state management for player states, game events, session lifecycle, authentication, matchmaking, and leaderboards.',
    problem: 'TODO: What was the goal of Flagzilla?',
    outcome: 'TODO: One-line outcome.',
    builtWith: ['Next.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'WebSockets'],
    links: {
      code: 'https://github.com/akkuraina/git-happens',
      live: 'https://flagzilla.vercel.app',
    },
    previewUrl: 'https://flagzilla.vercel.app',
  },
  {
    slug: 'yapmonster',
    name: 'YapMonster',
    tagline: 'Full-stack real-time chat application',
    summary:
      'Scalable group communication with JWT-authenticated WebSocket connections, room-based event broadcasting, and Express/MongoDB backend for user management and message persistence.',
    problem: 'TODO: What problem does YapMonster solve?',
    outcome: 'TODO: One-line outcome.',
    builtWith: ['React', 'TailwindCSS', 'Chakra UI', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['React UI', 'Socket.IO client'] },
        { label: 'Realtime', nodes: ['JWT-authenticated socket', 'Room-based broadcast'] },
        { label: 'API', nodes: ['Express.js', 'User management'] },
        { label: 'Data', nodes: ['MongoDB', 'Message persistence'] },
      ],
    },
    links: {
      code: 'https://github.com/akkuraina/YapMonster',
      live: 'https://yap-monster.vercel.app',
    },
    previewUrl: 'https://yap-monster.vercel.app',
  },
  {
    slug: 'neurohaven',
    name: 'NeuroHaven',
    tagline: 'AI-driven mental wellness platform',
    summary:
      'Real-time mood analysis and conversation for students, with LLM-based context-aware interactions, modular API architecture, secure Firebase data handling, and dynamic emotional heatmaps for behavioral insights.',
    problem: 'TODO: What problem does NeuroHaven solve?',
    outcome: 'TODO: One-line outcome.',
    builtWith: ['React', 'TypeScript', 'TailwindCSS', 'Firebase', 'Gemini API'],
    links: {
      code: 'https://github.com/akkuraina/neurohaven.git',
      live: 'https://neurohaven-pink.vercel.app',
    },
    previewUrl: 'https://neurohaven-pink.vercel.app',
  },
  {
    slug: 'findify',
    name: 'Findify',
    tagline: 'Job matching platform',
    summary:
      'AI-powered job matching platform that helps job seekers and employers find the perfect match. Built with FastAPI and Gemini API for efficient and accurate matching.',
    problem: 'TODO: What problem does Findify solve?',
    outcome: 'TODO: One-line outcome.',
    builtWith: ['React', 'TypeScript', 'FastAPI', 'PyPDF', 'Firebase', 'Gemini API'],
    links: {
      code: 'https://github.com/akkuraina/candidate-matcher.git',
      live: 'https://findifyyy.vercel.app',
    },
    previewUrl: 'https://findifyyy.vercel.app',
  },
  {
    slug: 'gigradar',
    name: 'GigRadar',
    tagline: 'Local Artist & Underground Gig Finder',
    summary:
      'Discovery platform for local live music gigs and independent artists featuring interactive map discovery, real-time check-ins, vibe-meter community ratings, Spotify/YouTube music embedding, and Cloudinary media uploads.',
    problem: 'TODO: What problem does GigRadar solve?',
    outcome: 'TODO: One-line outcome.',
    builtWith: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Cloudinary'],
    links: {
      code: 'https://github.com/akkuraina/gigradar',
      live: 'https://gigradar-vert.vercel.app',
    },
    previewUrl: 'https://gigradar-vert.vercel.app',
  },
];
