// Ambient color glow. Pure CSS radial gradients animated with transforms only
// (no canvas, no filter blur), so it stays cheap to render.
//
// "fixed" sits behind the whole viewport (used behind the landing scene);
// "panel" repeats the glow down the length of the scrolling content panel,
// whose opaque background would otherwise hide the fixed one.

const blob = (color: string, strength: string) =>
  `radial-gradient(circle, color-mix(in srgb, var(${color}) calc(var(--glow-strength) * ${strength}), transparent) 0%, transparent 65%)`;

const FIXED = [
  { className: '-left-[15%] -top-[20%] h-[70vmax] w-[70vmax] animate-aurora-blob-1', bg: blob('--accent-2', '55%') },
  { className: '-right-[20%] top-[25%] h-[65vmax] w-[65vmax] animate-aurora-blob-2', bg: blob('--accent', '45%') },
  { className: '-bottom-[25%] left-[10%] h-[55vmax] w-[55vmax] animate-aurora-blob-3', bg: blob('--accent-3', '35%') },
];

const PANEL = [
  { className: '-left-[20%] top-[2%] h-[60vmax] w-[60vmax] animate-aurora-blob-1', bg: blob('--accent-2', '50%') },
  { className: '-right-[25%] top-[18%] h-[60vmax] w-[60vmax] animate-aurora-blob-2', bg: blob('--accent', '40%') },
  { className: '-left-[15%] top-[38%] h-[55vmax] w-[55vmax] animate-aurora-blob-3', bg: blob('--accent-3', '30%') },
  { className: '-right-[20%] top-[55%] h-[60vmax] w-[60vmax] animate-aurora-blob-1', bg: blob('--accent-2', '45%') },
  { className: '-left-[20%] top-[72%] h-[60vmax] w-[60vmax] animate-aurora-blob-2', bg: blob('--accent', '40%') },
  { className: '-right-[15%] top-[86%] h-[50vmax] w-[50vmax] animate-aurora-blob-3', bg: blob('--accent-4', '25%') },
];

export default function PopBackground({ variant = 'fixed' }: { variant?: 'fixed' | 'panel' }) {
  const blobs = variant === 'fixed' ? FIXED : PANEL;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none inset-0 overflow-hidden ${variant === 'fixed' ? 'fixed -z-20' : 'absolute -z-10'}`}
    >
      {blobs.map((b, i) => (
        <div key={i} className={`absolute rounded-full ${b.className}`} style={{ background: b.bg }} />
      ))}
    </div>
  );
}
