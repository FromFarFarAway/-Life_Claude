'use client';

import { Card } from '@/components/ui/card';
import { useAppState } from '@/lib/context';
import { ProfileCompletenessCTA } from './ProfileCompletenessCTA';
import { cn } from '@/lib/format';
import type { StatusDot } from '@/data/models';

const DOT_BG: Record<StatusDot, string> = {
  red: 'bg-red-400',
  amber: 'bg-amber-400',
  green: 'bg-emerald-400',
};

const PRIORITY_BG: Record<StatusDot, string> = {
  red: 'bg-red-500/10 border-red-500/20 text-red-300',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
  green: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
};

export function HealthCoachCard() {
  const { coachPlan, setCoachModalOpen } = useAppState();
  const top3 = coachPlan.priorities.slice(0, 3);

  // Two cited signals for the "Why now" line — pull whatever is most
  // alarming first, fall back to the second priority's whyLine.
  const whyNowSignals = buildWhyNowSignals(top3);

  return (
    <Card className="space-y-4 max-h-[520px] overflow-hidden">
      <div className="flex items-center gap-2">
        <svg
          className="h-4 w-4 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
          Health Coach
        </h3>
      </div>

      {/* Brief — one sentence */}
      <p className="text-sm text-gray-300 leading-relaxed">{coachPlan.brief}</p>

      {/* Top 3 priorities as chips */}
      <ul className="space-y-1.5">
        {top3.map((p) => (
          <li
            key={p.code}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3 py-2 text-xs',
              PRIORITY_BG[p.statusDot]
            )}
          >
            <span className="font-mono text-[10px] font-semibold opacity-80">
              {p.code}
            </span>
            <span
              className={cn('h-1.5 w-1.5 rounded-full', DOT_BG[p.statusDot])}
              aria-hidden="true"
            />
            <span className="flex-1 text-gray-200 leading-snug">{p.title}</span>
          </li>
        ))}
      </ul>

      {/* Why now — micro-line with 2 cited signals */}
      <div className="rounded-md border border-[#2a2a45] bg-[#0f1019] px-3 py-2">
        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
          Why now
        </p>
        <p className="text-xs text-gray-400">{whyNowSignals}</p>
      </div>

      {/* Open full plan CTA */}
      <button
        onClick={() => setCoachModalOpen(true)}
        className="w-full py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-sm font-medium text-indigo-300 hover:bg-indigo-600/30 transition-colors"
      >
        Open full plan
      </button>

      {/* Profile completeness — keep at the bottom of the card */}
      <ProfileCompletenessCTA />
    </Card>
  );
}

function buildWhyNowSignals(
  top: ReturnType<typeof useAppState>['coachPlan']['priorities']
): string {
  if (top.length === 0) return 'No active signals.';
  if (top.length === 1) return top[0].whyLine;
  // Pick the first two cited signals across the top priorities, deduped.
  const seen = new Set<string>();
  const parts: string[] = [];
  for (const p of top) {
    for (const piece of p.whyLine.split(' · ')) {
      const trimmed = piece.trim();
      if (!trimmed || seen.has(trimmed)) continue;
      seen.add(trimmed);
      parts.push(trimmed);
      if (parts.length === 2) return parts.join(' · ');
    }
  }
  return parts.join(' · ');
}
