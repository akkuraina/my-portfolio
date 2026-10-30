// Ambient color glow behind the whole site. Pure CSS radial gradients animated
// with transforms only (no canvas, no filter blur), so it stays cheap to render.
export default function PopBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute -left-[15%] -top-[20%] h-[70vmax] w-[70vmax] animate-aurora-blob-1 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent-2)_calc(var(--glow-strength)*55%),transparent)_0%,transparent_65%)]" />
      <div className="absolute -right-[20%] top-[25%] h-[65vmax] w-[65vmax] animate-aurora-blob-2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_calc(var(--glow-strength)*45%),transparent)_0%,transparent_65%)]" />
      <div className="absolute -bottom-[25%] left-[10%] h-[55vmax] w-[55vmax] animate-aurora-blob-3 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent-3)_calc(var(--glow-strength)*35%),transparent)_0%,transparent_65%)]" />
    </div>
  );
}
