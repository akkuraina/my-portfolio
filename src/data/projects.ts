// Project content for the explorer in components/Projects.tsx.
// Keep it short: one line each for problem and outcome, at most two decisions.
// Optional sections with no content are hidden.

export type ArchitectureLayer = {
  label: string;
  nodes: string[];
};

export type Architecture =
  | { kind: 'layers'; layers: ArchitectureLayer[] }
  | { kind: 'image'; src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  problem?: string;
  outcome?: string;
  builtWith: string[];
  decisions?: { title: string; why: string }[];
  architecture?: Architecture;
  links: { code?: string; live?: string };
  previewUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'mergo',
    name: 'Mergo',
    tagline: 'Conflict-free collaborative document editor & CRDT engine',
    problem: 'Collaborative editors usually lock the doc, show conflict dialogs, or let the last write win.',
    outcome: 'Concurrent edits merge into the same document on every screen, with presence and version restore.',
    builtWith: ['Next.js 15', 'React', 'TypeScript', 'Supabase', 'Tiptap', 'CRDT / RGA', 'Clerk', 'TailwindCSS'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['Tiptap editor', 'Local RGA engine', 'Pending-op queue'] },
        { label: 'API', nodes: ['Batch op writes', 'Versions + restore'] },
        { label: 'Postgres', nodes: ['Append-only op log', 'Snapshots'] },
        { label: 'Realtime', nodes: ['Op broadcast', 'Presence'] },
      ],
    },
    decisions: [
      {
        title: 'RGA CRDT over Operational Transform',
        why: 'Ops commute and are idempotent, so no central server has to order them.',
      },
      {
        title: 'CRDT for text, last-write-wins for formatting',
        why: 'Formatting is a tree; forcing it into a linear CRDT causes split-tag anomalies.',
      },
    ],
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
    problem: 'Updating balances in place loses history, and a retried request can record a payment twice.',
    outcome: 'Every change is an immutable event, and read models rebuild from the stream.',
    builtWith: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Prisma 7', 'Redis', 'BullMQ', 'Better Auth', 'Appwrite'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Commands', nodes: ['Write API', 'Idempotency check'] },
        { label: 'Event store', nodes: ['Append-only events'] },
        { label: 'Projection', nodes: ['BullMQ workers', 'Sync fallback'] },
        { label: 'Read models', nodes: ['Balances & budgets'] },
      ],
    },
    decisions: [
      {
        title: 'Event sourcing + CQRS',
        why: 'The event stream is the source of truth; what the UI reads is a rebuildable projection.',
      },
      {
        title: 'Corrections as reversal events',
        why: 'Mistakes are fixed by appending, never editing, so the ledger stays auditable.',
      },
    ],
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
    problem: 'If each browser decides what happened, players drift out of sync and can cheat.',
    outcome: '4-player capture-the-flag where the server runs the match and saves stats to a leaderboard.',
    builtWith: ['Next.js', 'TypeScript', 'React Three Fiber', 'Rapier', 'Socket.IO', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['R3F scene', 'Sends movement'] },
        { label: 'Realtime', nodes: ['Socket.IO rooms', 'Matchmaking'] },
        { label: 'Game server', nodes: ['Tick loop', 'Hits & flag'] },
        { label: 'Data', nodes: ['MongoDB stats'] },
      ],
    },
    decisions: [
      {
        title: 'Authoritative tick loop',
        why: 'Clients only send movement; the server resolves hits and flags, then broadcasts one snapshot.',
      },
      {
        title: 'Stats written once per match',
        why: 'A single bulk write at the end keeps MongoDB out of the game loop.',
      },
    ],
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
    problem: 'Group chat and video calls usually live in separate apps.',
    outcome: 'Group chat, reply threads, and 1-on-1 or group video calls, with call history in the chat.',
    builtWith: ['React', 'Chakra UI', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'LiveKit', 'Cloudinary'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['React + Chakra', 'LiveKit SDK'] },
        { label: 'Realtime', nodes: ['JWT socket', 'Room broadcast'] },
        { label: 'API', nodes: ['Express', 'LiveKit tokens'] },
        { label: 'Data & media', nodes: ['MongoDB', 'LiveKit SFU'] },
      ],
    },
    decisions: [
      {
        title: 'LiveKit SFU for video',
        why: 'Each browser streams once to the SFU instead of to every other caller.',
      },
    ],
    links: {
      code: 'https://github.com/akkuraina/YapMonster',
      live: 'https://yap-monster.vercel.app',
    },
    previewUrl: 'https://yap-monster.vercel.app',
  },
  {
    slug: 'neurohaven',
    name: 'NeuroHaven',
    tagline: 'Mental wellness platform',
    problem: 'Asking for help feels like a big step, and mood patterns are easy to miss.',
    outcome: 'Mood-tracked journaling plus counselor booking with availability checks and Google Meet links.',
    builtWith: ['React', 'Vite', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Google Calendar API'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['React + Vite'] },
        { label: 'API', nodes: ['Express', 'JWT auth'] },
        { label: 'Data', nodes: ['MongoDB'] },
        { label: 'Integrations', nodes: ['Google Meet'] },
      ],
    },
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
    problem: 'Keyword filters are too rigid, and ML or LLM rankings can’t explain themselves.',
    outcome: 'Ranks candidates for a job and explains every score.',
    builtWith: ['React', 'FastAPI', 'SQLAlchemy', 'scikit-learn', 'sentence-transformers', 'SQLite', 'Docker'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['React dashboard', 'CSV / JSON upload'] },
        { label: 'API', nodes: ['FastAPI'] },
        { label: 'Matching', nodes: ['Skill scoring', 'TF-IDF', 'Embeddings'] },
        { label: 'Data', nodes: ['SQLite'] },
      ],
    },
    decisions: [
      {
        title: 'Hybrid scoring',
        why: 'Skills, experience, TF-IDF keywords and MiniLM similarity give repeatable, explainable scores.',
      },
    ],
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
    problem: 'Underground gigs are scattered across social posts and word of mouth.',
    outcome: 'Gig listings, artist and venue profiles, live check-ins, and community vibe ratings.',
    builtWith: ['Next.js 15', 'React 19', 'TypeScript', 'TailwindCSS', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Cloudinary'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['Next.js', 'Music embeds'] },
        { label: 'API', nodes: ['Express', 'JWT auth'] },
        { label: 'Realtime', nodes: ['Socket.IO check-ins'] },
        { label: 'Data', nodes: ['MongoDB', 'Cloudinary'] },
      ],
    },
    links: {
      code: 'https://github.com/akkuraina/gigradar',
      live: 'https://gigradar-vert.vercel.app',
    },
    previewUrl: 'https://gigradar-vert.vercel.app',
  },
];
