// Scene colours per theme. Kept separate from LandingScene so importing them
// doesn't pull three.js into the initial bundle.

export type ScenePalette = {
  body: string;
  bodyAlt: string;
  screen: string;
  accents: [string, string, string, string];
};

export const PALETTES: Record<'dark' | 'light', ScenePalette> = {
  dark: { body: '#3a3370', bodyAlt: '#2a2452', screen: '#120e26', accents: ['#ff5ca8', '#8b7bff', '#ffb84d', '#3ef0c0'] },
  light: { body: '#d9d0ff', bodyAlt: '#f3c6dc', screen: '#1b1033', accents: ['#d61f69', '#6a3df5', '#e08a00', '#0a9b73'] },
};
