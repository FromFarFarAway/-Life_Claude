'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScoreRing } from '@/components/ui/score-ring';
import { SEEDED_OVERALL_SCORE, SEEDED_BLIND_SPOTS_EXPLORED, SEEDED_UNCERTAINTY } from '@/data/categories';
import { dashboardCopy } from '@/data/profile';
import { AboutEstimateModal } from './AboutEstimateModal';

interface IntegralScoreCardProps {
  onOpenAssistant: () => void;
}

export function IntegralScoreCard({ onOpenAssistant }: IntegralScoreCardProps) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <Card variant="glowing" className="relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Flagship AI Insight
          </span>
          <button
            onClick={() => setShowAbout(true)}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            About this estimate
          </button>
        </div>

        {/* Hero metric */}
        <div className="flex flex-col items-center py-4">
          <ScoreRing score={SEEDED_OVERALL_SCORE} size={200} strokeWidth={8} />
          <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-gray-300">
            Health Score
          </h2>
        </div>

        {/* Supporting text */}
        <p className="text-sm text-gray-400 text-center mt-2 leading-relaxed max-w-md mx-auto">
          Score driven by persistent LDL-heavy hypercholesterolemia, with liver context,
          kidney reassurance, and coverage gaps affecting certainty.
        </p>

        {/* Sub-metrics */}
        <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-[#2a2a45]">
          <div className="text-center">
            <span className="text-lg font-bold text-blue-400">{SEEDED_BLIND_SPOTS_EXPLORED}%</span>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">Blind Spots Explored</p>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-amber-400">{SEEDED_UNCERTAINTY}%</span>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">Uncertainty</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onOpenAssistant}
          className="mt-6 w-full rounded-lg bg-indigo-600/20 border border-indigo-500/30 py-3 text-sm font-semibold text-indigo-300 hover:bg-indigo-600/30 transition-colors"
        >
          Discuss with AI Advisor
        </button>

        {/* Score helper tooltip */}
        <p className="text-[11px] text-gray-600 text-center mt-3">
          {dashboardCopy.integralScoreHelper}
        </p>
      </Card>

      {showAbout && <AboutEstimateModal onClose={() => setShowAbout(false)} />}
    </>
  );
}
