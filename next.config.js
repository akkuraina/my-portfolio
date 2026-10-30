const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {(phase: string) => import('next').NextConfig} */
module.exports = (phase) => ({
  reactStrictMode: true,
  // `npm run dev` and `next build`/`next start` used to share `.next`, so building
  // while the dev server was running overwrote its files and crashed it. Each now
  // gets its own folder.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
});
