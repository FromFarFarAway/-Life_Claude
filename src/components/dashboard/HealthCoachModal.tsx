'use client';

import { useEffect } from 'react';
import { useAppState } from '@/lib/context';
import { EvidenceDrawer } from './EvidenceDrawer';
import type { CoachPriority, StatusDot } from '@/data/models';
import { cn } from '@/lib/format';

const DOT_BG: Record<StatusDot, string> = {
  red: 'bg-red-400',
  amber: 'bg-amber-400',
  green: 'bg-emerald-400',
};

const PRIORITY_TINT: Record<StatusDot, string> = {
  red: 'border-red-500/30 bg-red-500/5',
  amber: 'border-amber-500/30 bg-amber-500/5',
  green: 'border-emerald-500/30 bg-emerald-500/5',
};

export function HealthCoachModal() {
  const { coachPlan, coachModalOpen, setCoachModalOpen, setChatComposerPrefill } =
    useAppState();

  // Lock body scroll while open + close on Escape.
  useEffect(() => {
    if (!coachModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCoachModalOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [coachModalOpen, setCoachModalOpen]);

  if (!coachModalOpen) return null;

  const handleAskCoach = (priority: CoachPriority) => {
    setChatComposerPrefill(priority.title);
    setCoachModalOpen(false);
    // Defer scroll until after the modal unmounts so the chat layout is stable.
    setTimeout(() => {
      const el = document.getElementById('plan-scoped-chat');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={() => setCoachModalOpen(false)}
    >
      <div
        className="bg-[#12121e] border border-[#2a2a45] sm:rounded-xl w-full sm:max-w-3xl max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-5 border-b border-[#2a2a45] bg-[#12121e]">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Your plan this week
            </h2>
            <p className="mt-1 text-sm text-gray-400 leading-relaxed">
              {coachPlan.brief}
            </p>
          </div>
          <button
            onClick={() => setCoachModalOpen(false)}
            className="text-gray-400 hover:text-white text-2xl leading-none"
            aria-label="Close plan"
          >
            ×
          </button>
        </div>

        {/* Body — five priorities */}
        <div className="p-5 space-y-5">
          {coachPlan.priorities.map((p) => (
            <PriorityBlock key={p.code} priority={p} onAskCoach={handleAskCoach} />
          ))}
        </div>

        {/* Information gaps */}
        <div className="p-5 border-t border-[#2a2a45] bg-[#0f1019]">
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
            Information gaps
          </h3>
          <ul className="space-y-1 text-sm text-gray-400">
            {coachPlan.gaps.map((g, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gray-600">·</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#2a2a45] flex items-center justify-between text-xs text-gray-500">
          <span>Generated {new Date(coachPlan.generatedAt).toLocaleDateString()}</span>
          <button
            onClick={() => {
              setCoachModalOpen(false);
              setTimeout(() => {
                document
                  .getElementById('plan-scoped-chat')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 60);
            }}
            className="px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 transition-colors"
          >
            Ask the coach →
          </button>
        </div>
      </div>
    </div>
  );
}

interface PriorityBlockProps {
  priority: CoachPriority;
  onAskCoach: (p: CoachPriority) => void;
}

function PriorityBlock({ priority, onAskCoach }: PriorityBlockProps) {
  const { action } = priority;
  return (
    <div
      className={cn(
        'rounded-xl border p-4 space-y-3',
        PRIORITY_TINT[priority.statusDot]
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-semibold text-gray-300">
          {priority.code}
        </span>
        <span
          className={cn('h-2 w-2 rounded-full', DOT_BG[priority.statusDot])}
          aria-hidden="true"
        />
        <h3 className="text-base font-semibold text-white">{priority.title}</h3>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed">
        {action.whyParagraph}
      </p>

      {action.reassurance && (
        <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-3">
          <p className="text-[10px] uppercase tracking-wider text-emerald-400 mb-1">
            You&apos;re probably fine
          </p>
          <p className="text-xs text-gray-300 leading-relaxed">
            {action.reassurance}
          </p>
        </div>
      )}

      {action.steps.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
            Steps
          </p>
          <ul className="space-y-1 text-sm text-gray-300">
            {action.steps.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gray-500">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {action.parallelHabits && action.parallelHabits.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
            Parallel habits
          </p>
          <ul className="space-y-1 text-sm text-gray-300">
            {action.parallelHabits.map((h, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gray-500">·</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <EvidenceDrawer
        evidence={action.evidence}
        verification={action.verification}
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onAskCoach(priority)}
          className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-colors"
        >
          Ask the coach about {priority.code}
        </button>
      </div>
    </div>
  );
}
