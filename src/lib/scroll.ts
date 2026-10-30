// The landing (#top) is position: sticky, so it always counts as "in view" and
// anchor links to it don't scroll. Scroll the window explicitly instead.
export function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}
