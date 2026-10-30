// Research papers and certifications for components/Research.tsx.
// Strings starting with "TODO" are placeholders (see lib/todo.ts).
// Local file paths point into public/.

export type Paper = {
  title: string;
  role: string;
  status?: string;
  venue?: string;
  date?: string;
  summary?: string;
  credentialId?: string;
  link?: string;
  certificate?: string;
};

export type Certification = {
  title: string;
  issuer: string;
  area: string;
  date?: string;
  credentialId?: string;
  verifyUrl?: string;
  file?: string;
};

export const papers: Paper[] = [
  {
    title: 'Smart Shopping Cart',
    role: 'Co-author',
    status: 'Published',
    venue: 'International Journal of Innovative Research in Technology (IJIRT) · Vol. 12, Issue 1',
    date: 'Jun 2025',
    summary:
      'A shopping cart that bills you as you shop: load-cell weight sensors and an Arduino match each item against a preloaded product database and build the bill automatically, so there is no barcode scanning and no checkout queue.',
    credentialId: '181192',
    link: 'https://ijirt.org/Article?manuscript=181192',
    certificate: '/smart_shopping_cart.jpg',
  },
];

export const certifications: Certification[] = [
  {
    title: 'The Complete 2024 Web Development Bootcamp',
    issuer: 'Udemy',
    area: 'Full-stack development',
    date: 'Jan 2025',
    credentialId: 'UC-c0aed0c1-ea05-4810-91d3-1e8c4624265e',
    verifyUrl: 'https://ude.my/UC-c0aed0c1-ea05-4810-91d3-1e8c4624265e',
    file: '/udemy.jpg',
  },
  {
    title: 'Introduction to Generative AI – Art of the Possible',
    issuer: 'AWS',
    area: 'AI/ML',
    date: 'Jul 2024',
    file: '/generativeai.jpg',
  },
  {
    title: 'Introduction to Responsible AI',
    issuer: 'AWS',
    area: 'AI/ML',
    date: 'Jul 2024',
    file: '/responsibleai.jpg',
  },
];
