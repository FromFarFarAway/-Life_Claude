'use client';

import { Card } from '@/components/ui/card';
import { StateBadge } from '@/components/ui/badge';
import { CoverageMeter } from '@/components/charts/CoverageMeter';
import type { CategoryConfig } from '@/data/categories';
import { useAppState } from '@/lib/context';
import { goalConfigs } from '@/data/questionnaire';

interface CategorySectionShellProps {
  category: CategoryConfig;
  summary: string;
  children: React.ReactNode;
}

export function CategorySectionShell({ category, summary, children }: CategorySectionShellProps) {
  const { userGoals } = useAppState();

  // Check if this category is relevant to the user's selected goals
  const isGoalRelevant = userGoals.some(goalId => {
    const config = goalConfigs.find(g => g.id === goalId);
    return config?.relatedCategories.includes(category.id);
  });

  return (
    <section id={category.anchorId} className="scroll-mt-36">
      <Card variant="elevated" className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{category.score}</span>
              <span className="text-sm text-gray-500">/100</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{category.label}</h3>
            {isGoalRelevant && (
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 uppercase tracking-wider font-medium">
                Goal-relevant
              </span>
            )}
          </div>
          <StateBadge state={category.state} />
        </div>

        {/* Coverage */}
        <CoverageMeter coverage={category.coverage} label="Data Coverage" />

        {/* Summary */}
        <p className="text-sm text-gray-400 leading-relaxed">{summary}</p>

        {/* Section-specific content */}
        <div className="pt-2 border-t border-[#2a2a45]">
          {children}
        </div>
      </Card>
    </section>
  );
}
