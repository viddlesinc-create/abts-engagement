'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Program = {
  readonly name: string;
  readonly description: string;
  readonly badges?: readonly string[];
  readonly spec?: string;
  readonly category?: 'competitive' | 'cooperative' | 'initiative';
};

type Tab = {
  id: 'adventure' | 'teambuilding';
  label: string;
  programs: readonly Program[];
};

const CATEGORY_BADGE: Record<NonNullable<Program['category']>, string> = {
  competitive: 'bg-amber-100 text-amber-900',
  cooperative: 'bg-emerald-100 text-emerald-900',
  initiative: 'bg-violet-100 text-violet-900',
};

export function ActivityTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState<Tab['id']>(tabs[0]?.id ?? 'adventure');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = params.get('utm_content');
    if (utm === 'teambuilding' || utm === 'adventure') {
      setActive(utm);
    }
  }, []);

  return (
    <div>
      <p className="mb-3 text-center text-sm font-bold text-coast">
        ↓ Select a category to browse all activities
      </p>
      <div role="tablist" className="mb-9 flex gap-2 border-b-2 border-ink/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              '-mb-0.5 cursor-pointer border-b-[3px] px-7 py-3 text-sm font-semibold transition-colors',
              active === tab.id
                ? 'border-sunset text-coast-900'
                : 'border-transparent text-ink/60 hover:text-coast'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          hidden={active !== tab.id}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tab.programs.map((p) => (
            <article
              key={p.name}
              className="flex flex-col rounded-xl border border-ink/10 bg-white p-7 transition-shadow hover:shadow-lg"
            >
              <h3 className="mb-2 text-base font-bold text-coast-900">{p.name}</h3>
              <p className="flex-1 text-sm leading-relaxed text-ink/70">{p.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.category ? (
                  <span
                    className={cn(
                      'rounded px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider',
                      CATEGORY_BADGE[p.category]
                    )}
                  >
                    {p.category}
                  </span>
                ) : null}
                {(p.badges ?? []).map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-coast/10 px-2.5 py-1 text-[0.72rem] font-semibold text-coast"
                  >
                    {b}
                  </span>
                ))}
              </div>
              {p.spec ? (
                <p className="mt-2 text-xs text-ink/50">{p.spec}</p>
              ) : null}
              <a
                href={`#inquiry?activity=${encodeURIComponent(p.name)}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-4 block rounded-lg bg-coast py-2.5 text-center text-sm font-semibold text-sand transition-colors hover:bg-coast-900"
              >
                Request Quote
              </a>
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}
