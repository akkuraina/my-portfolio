'use client';

import { useEffect, useState } from 'react';

// Terminal-style "~/section" label that types itself once `start` is true.
export default function SectionTag({ text, start }: { text: string; start: boolean }) {
  const [typed, setTyped] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!start) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setTyped(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setComplete(true);
      }
    }, 75);
    return () => clearInterval(interval);
  }, [start, text]);

  return (
    <div className="flex items-center gap-1 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent h-5">
      <span aria-hidden="true">{typed}</span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={`inline-block w-1.5 h-3.5 bg-accent ${complete ? 'animate-cursor' : 'opacity-100'}`} />
    </div>
  );
}
