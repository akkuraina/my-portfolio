// Research papers and certifications for components/Research.tsx.
// Strings starting with "TODO" are placeholders (see lib/todo.ts).
// `file` paths point into public/; add the file there with exactly that name.

export type Paper = {
  title: string;
  role: string;
  status?: string;
  venue?: string;
  year?: string;
  summary?: string;
  file?: string;
};

export type Certification = {
  title: string;
  issuer: string;
  area: string;
  year?: string;
  file?: string;
};

export const papers: Paper[] = [
  {
    title: 'Smart Shopping Cart',
    role: 'Author',
    status: 'TODO: Completed / Presented / Published?',
    venue: 'TODO: Conference or journal name (if any)',
    year: 'TODO: Year',
    summary: 'TODO: 1–2 sentence plain-language explanation of what the paper proposes and found.',
    file: '/research/smart-shopping-cart.pdf',
  },
];

export const certifications: Certification[] = [
  {
    title: 'TODO: Exact title of AWS AI/ML course #1',
    issuer: 'AWS',
    area: 'AI/ML',
    year: 'TODO: Year',
    file: '/certificates/aws-aiml-1.pdf',
  },
  {
    title: 'TODO: Exact title of AWS AI/ML course #2',
    issuer: 'AWS',
    area: 'AI/ML',
    year: 'TODO: Year',
    file: '/certificates/aws-aiml-2.pdf',
  },
  {
    title: 'TODO: Exact title of the Udemy course',
    issuer: 'Udemy',
    area: 'Full-stack development',
    year: 'TODO: Year',
    file: '/certificates/udemy-fullstack.pdf',
  },
];
