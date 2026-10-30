// Scene colours per theme. Kept separate from LandingScene so importing them
// doesn't pull three.js into the initial bundle.

export type ScenePalette = {
  body: string;
  bodyAlt: string;
  screen: string;
  accents: [string, string, string, string];
};

export const PALETTES: Record<'dark' | 'light', ScenePalette> = {
  dark: { body: '#16163f', bodyAlt: '#0f0f2e', screen: '#05051a', accents: ['#9a9aff', '#c2c2ff', '#7f7ff2', '#dcdcff'] },
  light: { body: '#dcdcf5', bodyAlt: '#ececfb', screen: '#0e0e2e', accents: ['#191970', '#2b2b9e', '#3a3ab4', '#4848c8'] },
};
