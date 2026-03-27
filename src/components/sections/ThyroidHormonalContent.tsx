import { CategorySectionShell } from './CategorySectionShell';
import { LatestSnapshotCard } from './LatestSnapshotCard';
import { NextDataCard } from './NextDataCard';
import { CoverageStateCard } from './CoverageStateCard';
import { categories } from '@/data/categories';
import { dashboardCopy } from '@/data/profile';

const category = categories.find((c) => c.id === 'thyroid')!;

export function ThyroidHormonalContent() {
  return (
    <CategorySectionShell category={category} summary={dashboardCopy.sectionSummaries.thyroid}>
      <div className="space-y-5">
        <CoverageStateCard
          coverage={0.4}
          message="Only one set of thyroid measurements available (Feb 2024). Longitudinal trend cannot be assessed. No comprehensive hormonal panel has been performed."
        />

        <LatestSnapshotCard
          title="Available Thyroid Data (Feb 2024)"
          items={[
            { label: 'TSH', value: 2.65, unit: 'mIU/L', status: 'normal' },
            { label: 'Free T4', value: 16.2, unit: 'pmol/L', status: 'normal' },
            { label: 'Free T3', value: null, unit: 'pmol/L', status: 'missing' },
            { label: 'Anti-TPO', value: null, unit: 'IU/mL', status: 'missing' },
            { label: 'Testosterone', value: null, unit: 'nmol/L', status: 'missing' },
            { label: 'Cortisol', value: null, unit: 'nmol/L', status: 'missing' },
          ]}
        />

        <NextDataCard items={[
          'Repeat thyroid panel (TSH, fT3, fT4) for longitudinal context',
          'Consider anti-TPO antibodies for autoimmune thyroid screening',
          'Add comprehensive hormonal panel if clinically indicated',
        ]} />
      </div>
    </CategorySectionShell>
  );
}
