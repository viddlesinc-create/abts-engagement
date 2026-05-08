'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export type Faq = { question: string; answer: string };

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white">
      {faqs.map((f, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={f.question}>
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base text-coast-900">{f.question}</span>
              <span
                className={cn(
                  'shrink-0 text-2xl text-coast transition-transform',
                  isOpen && 'rotate-45'
                )}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen ? (
              <div className="px-6 pb-5 text-sm leading-relaxed text-ink/70">{f.answer}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
