'use client';

import { useState } from 'react';
import type { CoachActionDetail } from '@/data/models';
import { cn } from '@/lib/format';

interface EvidenceDrawerProps {
  evidence: CoachActionDetail['evidence'];
  verification: string;
}

export function EvidenceDrawer({ evidence, verification }: EvidenceDrawerProps) {
  const [open, setOpen] = useState(false);
  const totalCount = evidence.metrics.length + evidence.studies.length;

  return (
    <div className="rounded-lg border border-[#2a2a45] bg-[#0f1019]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-400 hover:text-gray-200 transition-colors"
        aria-expanded={open}
      >
        <span className="uppercase tracking-wider">
          Evidence ({totalCount})
        </span>
        <span className={cn('transition-transform', open && 'rotate-180')}>
          ▾
        </span>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-3 text-xs">
          {evidence.metrics.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                Metrics
              </p>
              <div className="flex flex-wrap gap-1.5">
                {evidence.metrics.map((m) => (
                  <span
                    key={m.id}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#1a1a2e] border border-[#2a2a45] text-gray-300"
                  >
                    <span className="text-[10px] uppercase text-gray-500">
                      {m.source}
                    </span>
                    <span className="text-gray-200 font-medium">{m.label}</span>
                    <span className="text-gray-400">· {m.current}</span>
                    {m.baseline && (
                      <span className="text-gray-500">(base: {m.baseline})</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {evidence.studies.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                Studies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {evidence.studies.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.vaultAnchor}`}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-colors"
                  >
                    <span className="font-medium">{s.label}</span>
                    <span className="text-indigo-400/70">· {s.date}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-[#2a2a45]">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
              Verification
            </p>
            <p className="text-gray-300 leading-relaxed">{verification}</p>
          </div>
        </div>
      )}
    </div>
  );
}
