import { Card } from '@/components/ui/card';
import { StateBadge } from '@/components/ui/badge';
import { CoverageMeter } from '@/components/charts/CoverageMeter';
import type { CategoryConfig } from '@/data/categories';

interface CategorySectionShellProps {
  category: CategoryConfig;
  summary: string;
  children: React.ReactNode;
}

export function CategorySectionShell({ category, summary, children }: CategorySectionShellProps) {
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
