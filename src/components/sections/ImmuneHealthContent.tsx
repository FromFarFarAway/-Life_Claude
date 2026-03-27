import { CategorySectionShell } from './CategorySectionShell';
import { LatestSnapshotCard } from './LatestSnapshotCard';
import { NextDataCard } from './NextDataCard';
import { CoverageStateCard } from './CoverageStateCard';
import { categories } from '@/data/categories';
import { dashboardCopy } from '@/data/profile';

const category = categories.find((c) => c.id === 'immune')!;

export function ImmuneHealthContent() {
  return (
    <CategorySectionShell category={category} summary={dashboardCopy.sectionSummaries.immune}>
      <div className="space-y-5">
        <CoverageStateCard
          coverage={0.3}
          message="Immune assessment is limited to CBC-derived markers. CRP and more specific immune markers have not been measured."
        />

        <LatestSnapshotCard
          title="Latest Immune Snapshot (May 2025)"
          items={[
            { label: 'WBC', value: 4.1, unit: '10^9/L', status: 'normal' },
            { label: 'Neutrophils', value: 1.9, unit: '10^9/L' },
            { label: 'Lymphocytes', value: 1.5, unit: '10^9/L' },
            { label: 'ESR', value: 2, unit: 'mm/hr', status: 'normal' },
            { label: 'CRP', value: null, unit: 'mg/L', status: 'missing' },
          ]}
        />

        <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
          <p className="text-xs text-amber-400/80">
            CRP not available. This key inflammatory marker would add both immune and cardiovascular context.
          </p>
        </div>

        <NextDataCard items={[
          'Add CRP measurement for inflammatory baseline',
          'Consider hs-CRP for cardiovascular inflammation context',
          'Immunoglobulin panel if clinically indicated',
        ]} />
      </div>
    </CategorySectionShell>
  );
}
