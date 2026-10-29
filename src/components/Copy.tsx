import { isTodo, isVisible } from '../lib/todo';

// Renders a content string, or a dashed TODO badge in dev (nothing in production).
export default function Copy({ value, className = '' }: { value?: string; className?: string }) {
  if (!isVisible(value)) return null;
  if (isTodo(value)) {
    return (
      <span className="block rounded-md border border-dashed border-amber-500/70 bg-amber-500/5 px-3 py-2 font-mono text-xs text-amber-600">
        {value}
      </span>
    );
  }
  return <span className={className}>{value}</span>;
}
