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
      'A Google Docs-style rich-text editor where several people type into the same document at once. The RGA CRDT is written from scratch in TypeScript; every character is an operation in an append-only log, broadcast over Supabase Realtime and merged deterministically on every client.',
    problem:
      'Most collaborative editors either lock the document, show conflict dialogs, or quietly let the last write win. I wanted concurrent edits to always merge into the same document on every screen, with no central server deciding who wins.',
    outcome:
      'Live multi-user editor: concurrent edits converge to identical documents on every client, with presence, multi-page layout, and point-in-time version restore.',
    builtWith: ['Next.js 15', 'React', 'TypeScript', 'Supabase', 'Tiptap', 'CRDT / RGA', 'Clerk', 'TailwindCSS'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['Tiptap editor', 'Two-pointer diff', 'Local RGA engine', 'Causal pending queue'] },
        { label: 'API', nodes: ['Batch POST /ops', 'Debounced content PATCH', 'Versions + restore', 'Clerk middleware'] },
        { label: 'Persistence', nodes: ['Append-only op log', 'Documents (Tiptap JSON)', 'Version snapshots'] },
        { label: 'Realtime', nodes: ['WAL broadcast of ops', 'Presence channels', 'Peers: applyOp → drain → render'] },
      ],
      note: 'Characters merge through the CRDT; rich formatting is saved separately as Tiptap JSON, so styling never fights with character ordering.',
    },
    decisions: [
      {
        title: 'RGA CRDT instead of Operational Transform',
        why: 'OT needs a central, authoritative server to transform every operation. RGA is commutative and idempotent, so any client can apply ops in any order and still converge.',
      },
      {
        title: 'Two layers: CRDT for characters, last-write-wins for formatting',
        why: 'Putting tree-shaped formatting into a linear CRDT blows up state and causes anomalies like split bold tags. Characters merge through RGA; formatting is debounced Tiptap JSON validated by the ProseMirror schema.',
      },
      {
        title: 'Tombstones instead of real deletes',
        why: 'Concurrent inserts reference their predecessor character. Removing a node would break those references, so deleted characters stay in the list marked deleted = true.',
      },
      {
        title: 'Send minimal diffs, not full text',
        why: 'A two-pointer prefix/suffix diff turns each keystroke into the smallest set of insert/delete ops instead of re-sending the document.',
      },
    ],
    hard: [
      {
        challenge: 'Two people inserting at exactly the same position at the same time.',
        approach:
          'Every character gets an ID of (Lamport clock, site ID) and an immutable predecessor. On apply, the engine scans past concurrent siblings with higher IDs (higher clock wins, site ID breaks ties), so every client picks the same order.',
      },
      {
        challenge: 'Operations arriving out of order, or more than once, over the network.',
        approach:
          'Ops whose predecessor hasn’t arrived yet are buffered in a pending queue and retried until no more progress is made; ops with an ID already seen are discarded. Reordering or duplicate delivery can’t corrupt the document or drop keystrokes.',
      },
      {
        challenge: 'Restoring an old version without destroying the edit history.',
        approach:
          'Snapshots are immutable rows with the Tiptap content and an op-log cursor. Restoring writes the old content back and records a new restore snapshot, so history only ever grows.',
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
    summary:
      'Audit-ready financial engine built with append-only event stream architecture, CQRS read-model projections, transaction reversals, automated budget controls, self-healing serverless sync, and cloud receipt storage.',
    problem:
      'Ledgers that update balances in place lose the story of how a number got there, and a retried request can easily record the same transaction twice. Money needs an immutable, replayable history.',
    outcome:
      'Live ledger where every change is an immutable event, read models are rebuilt from the stream, and duplicate requests can’t create duplicate transactions.',
    builtWith: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Prisma 7', 'Redis', 'BullMQ', 'Better Auth', 'Appwrite'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Commands', nodes: ['Next.js write API', 'Idempotency check', 'Better Auth'] },
        { label: 'Event store', nodes: ['Append-only events', 'PostgreSQL + Prisma'] },
        { label: 'Projection', nodes: ['BullMQ workers on Redis', 'Synchronous fallback'] },
        { label: 'Read models', nodes: ['Balances & budgets', 'Receipts in Appwrite'] },
      ],
    },
    decisions: [
      {
        title: 'Event sourcing + CQRS',
        why: 'Write commands are decoupled from read models: the event stream is the single, immutable source of truth, and the views the UI reads are projections that can be rebuilt from it.',
      },
      {
        title: 'Corrections as reversal events',
        why: 'A mistake is fixed by appending a reversal, never by editing history, which keeps the ledger audit-ready.',
      },
    ],
    hard: [
      {
        challenge: 'Keeping read models up to date without making every write wait on them.',
        approach:
          'Projection runs as background jobs on a BullMQ + Redis queue, with a synchronous fallback so projections still update if the queue isn’t available.',
      },
      {
        challenge: 'Double-submits and retries creating duplicate transactions.',
        approach: 'Write requests carry idempotency protection, so repeating the same request records the transaction once.',
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
    summary:
      'A 4-player, capture-the-flag style 3D game in the browser: grab the flag and hold it while everyone else chases you. The server runs the whole match (movement, collisions, bullets, kills, flag pickups) and streams the game state to every player, with matchmaking, private rooms, in-game chat, and persistent leaderboards.',
    problem:
      'In a real-time multiplayer game, if each browser decides what happened, players drift out of sync and cheating is trivial. Every player has to see the same match, decided in one place.',
    outcome:
      'Playable in the browser: four players matched into a room, one authoritative game loop, and match stats saved to a leaderboard.',
    builtWith: ['Next.js', 'TypeScript', 'React Three Fiber', 'Rapier', 'Socket.IO', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['React Three Fiber scene', 'HUD, chat, waiting room', 'Sends movement only'] },
        { label: 'Realtime', nodes: ['Socket.IO rooms', 'Matchmaking queue', 'room_state broadcast'] },
        { label: 'Game server', nodes: ['Tick-based game loop', 'Collisions, bullets, kills', 'Flag possession timer'] },
        { label: 'Data', nodes: ['MongoDB (Mongoose)', 'Wins, kills, possession', 'JWT auth'] },
      ],
    },
    decisions: [
      {
        title: 'Authoritative server game loop',
        why: 'Clients only send where they want to move. The server runs a fixed-tick loop that resolves collisions, bullets, kills, and flag pickups, then broadcasts one state snapshot to the room, so every player sees the same match.',
      },
      {
        title: 'Queue-based matchmaking plus private rooms',
        why: 'Players either join a queue that starts a match once four are waiting, or share a room ID to play with friends; both paths end in the same server-run room.',
      },
      {
        title: 'Batch-write stats when the match ends',
        why: 'Wins, kills, and possession time live in memory during play and are written to MongoDB in a single bulk write at the end, keeping the database out of the hot loop.',
      },
    ],
    hard: [
      {
        challenge: 'Trusting client input in a competitive game.',
        approach: 'The server clamps every reported position to the map bounds, decides every hit itself, and sanitises chat messages before broadcasting them.',
      },
      {
        challenge: 'A player holding the flag dies or disconnects mid-match.',
        approach: 'The flag drops at their last position so the match keeps going, and dead players respawn at a random point after a short delay.',
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
    summary:
      'Real-time chat and video calling: JWT-authenticated Socket.IO connections with room-based broadcasting, group chats with admin permissions, reply threads, typing indicators, and LiveKit-powered 1-on-1 and group video calls.',
    problem:
      'Group chat and video calls usually live in separate apps. I wanted messaging, typing indicators, and HD calls in one place, with call history kept right inside the conversation.',
    outcome:
      'Live chat app with group rooms, reply threads, delete-for-everyone, and 1-on-1 or group video calls whose history shows up in the chat.',
    builtWith: ['React', 'Chakra UI', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'LiveKit', 'Cloudinary'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['React + Chakra UI', 'Socket.IO client', 'LiveKit SDK'] },
        { label: 'Realtime', nodes: ['JWT-authenticated socket', 'Room broadcast', 'Call signaling'] },
        { label: 'API', nodes: ['Express (JWT, Helmet, rate limit)', 'LiveKit token endpoint'] },
        { label: 'Data & media', nodes: ['MongoDB (Mongoose)', 'Cloudinary', 'LiveKit SFU'] },
      ],
    },
    decisions: [
      {
        title: 'LiveKit SFU for video',
        why: 'Peers connect to a selective forwarding unit instead of each other, so group calls don’t need every browser to stream to every other browser.',
      },
      {
        title: 'Socket.IO for signaling, REST for persistence',
        why: 'Messages and call records are saved through the REST API first, then relayed to the room over the socket.',
      },
    ],
    hard: [
      {
        challenge: '"Delete for everyone" without breaking the conversation for other people.',
        approach: 'Deleted messages become broadcast tombstones, so the thread stays consistent for everyone while the content is gone.',
      },
      {
        challenge: 'Real cameras time out, get unplugged, or are already in use.',
        approach: 'The call flow handles camera AbortErrors, falls back gracefully, and cleans up track subscriptions when calls end.',
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
    summary:
      'Mental health wellness platform with journaling, counselor booking, and supportive tools: daily journal entries with mood tracking, counselor discovery and booking with availability checks, and Google Meet links for sessions.',
    problem:
      'Reaching out for help feels like a big step, and mood patterns are easy to miss. NeuroHaven puts mood-tracked journaling and booking a counselor in one supportive place.',
    outcome:
      'Live wellness app with mood-tracked journaling and counselor booking that checks availability and attaches a Google Meet link.',
    builtWith: ['React', 'Vite', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Google Calendar API'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['React + Vite', 'Journal & booking UI'] },
        { label: 'API', nodes: ['Express REST', 'JWT auth'] },
        { label: 'Data', nodes: ['MongoDB (Mongoose)', 'Users, journals, counselors, bookings'] },
        { label: 'Integrations', nodes: ['Google Calendar / Meet'] },
      ],
    },
    hard: [
      {
        challenge: 'A booking shouldn’t fail just because a video link couldn’t be created.',
        approach: 'When Google doesn’t return a Meet link, the booking falls back to a configured link so the session still has somewhere to happen.',
      },
    ],
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
      'Candidate–job matching platform that ranks candidates against a job description and explains why each one scored the way they did. Built with a FastAPI matching engine and a React dashboard.',
    problem:
      'Keyword filters are too rigid and pure ML or LLM ranking is a black box. Recruiters need rankings they can trust, with a reason attached to every score.',
    outcome:
      'Live matcher that ranks candidates for a job and returns a plain-language explanation for every score.',
    builtWith: ['React', 'FastAPI', 'SQLAlchemy', 'scikit-learn', 'sentence-transformers', 'SQLite', 'Docker'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['React dashboard', 'JSON / CSV upload'] },
        { label: 'API', nodes: ['FastAPI REST', 'Batch match-all'] },
        { label: 'Matching engine', nodes: ['Skill + experience scoring', 'TF-IDF keywords', 'Semantic similarity'] },
        { label: 'Data', nodes: ['Jobs & candidates', 'Explanations'] },
      ],
    },
    decisions: [
      {
        title: 'Hybrid scoring instead of one model',
        why: 'Rule-based matching alone is too rigid, ML alone needs training data and can’t explain itself, and LLMs are costly and non-deterministic. Weighting skills, experience, TF-IDF keywords, and MiniLM semantic similarity gives explainable, repeatable scores.',
      },
    ],
    hard: [
      {
        challenge: 'Messy real-world data: vague job descriptions, missing experience, duplicate candidates.',
        approach:
          'Vague JDs get a baseline score and a low-confidence flag, missing years are flagged rather than guessed, and likely duplicates trigger a warning instead of being silently merged.',
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
    summary:
      'Discovery platform for local live music gigs and independent artists featuring artist and venue profiles, real-time check-ins, vibe-meter community ratings, Spotify/YouTube music embedding, and Cloudinary media uploads.',
    problem:
      'Underground gigs and independent artists are hard to find: they’re scattered across social posts and word of mouth. GigRadar brings music lovers, artists, and venues into one place.',
    outcome:
      'Live discovery app with gig listings, artist and venue profiles, real-time check-ins, and community vibe ratings.',
    builtWith: ['Next.js 15', 'React 19', 'TypeScript', 'TailwindCSS', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Cloudinary'],
    architecture: {
      kind: 'layers',
      layers: [
        { label: 'Client', nodes: ['Next.js app', 'Spotify / YouTube embeds'] },
        { label: 'API', nodes: ['Express (JWT auth)', 'Gigs, check-ins, reviews'] },
        { label: 'Realtime', nodes: ['Socket.IO check-ins'] },
        { label: 'Data & media', nodes: ['MongoDB (Mongoose)', 'Cloudinary uploads'] },
      ],
    },
    links: {
      code: 'https://github.com/akkuraina/gigradar',
      live: 'https://gigradar-vert.vercel.app',
    },
    previewUrl: 'https://gigradar-vert.vercel.app',
  },
];
