// Skill groups for components/Skills.tsx, strongest group first.

export type Skill = {
  name: string;
};

export type SkillGroup = {
  title: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Web',
    skills: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'Tiptap' },
      { name: 'Three.js / R3F' },
      { name: 'Framer Motion' },
    ],
  },
  {
    title: 'Backend & Realtime',
    skills: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'FastAPI' },
      { name: 'WebSockets / Socket.IO' },
      { name: 'BullMQ' },
    ],
  },
  {
    title: 'Data',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Redis' },
      { name: 'Prisma' },
      { name: 'Drizzle' },
      { name: 'Neon' },
      { name: 'Supabase' },
      { name: 'Firebase' },
      { name: 'MySQL' },
      { name: 'SQLite' },
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'TypeScript' },
      { name: 'Go' },
      { name: 'JavaScript' },
      { name: 'Python' },
      { name: 'SQL' },
      { name: 'Java' },
      { name: 'C/C++' },
    ],
  },
  {
    title: 'AI/ML',
    skills: [
      { name: 'LLM APIs (OpenAI, Anthropic, Gemini)' },
      { name: 'MCP' },
      { name: 'NLP' },
      { name: 'Text Embeddings' },
      { name: 'Information Retrieval (TF-IDF, cosine similarity)' },
      { name: 'scikit-learn' },
      { name: 'Pandas' },
      { name: 'NumPy' },
    ],
  },
  {
    title: 'Infra & Tools',
    skills: [
      { name: 'Google Cloud' },
      { name: 'AWS' },
      { name: 'Docker' },
      { name: 'Vercel' },
      { name: 'Render' },
      { name: 'Upstash' },
      { name: 'Git' },
      { name: 'Bun' },
      { name: 'Clerk' },
      { name: 'Better Auth' },
      { name: 'Appwrite' },
      { name: 'Cloudinary' },
      { name: 'Cloudflare R2' },
    ],
  },
];
