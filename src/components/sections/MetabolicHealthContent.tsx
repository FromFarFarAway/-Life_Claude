'use client';

import { CategorySectionShell } from './CategorySectionShell';
import { LatestSnapshotCard } from './LatestSnapshotCard';
import { NextDataCard } from './NextDataCard';
import { MetabolicContextChart } from '@/components/charts/MetabolicContextChart';
import { categories } from '@/data/categories';
import { dashboardCopy } from '@/data/profile';

const category = categories.find((c) => c.id === 'metabolic')!;

export function MetabolicHealthContent() {
  return (
    <CategorySectionShell category={category} summary={dashboardCopy.sectionSummaries.metabolic}>
      <div className="space-y-5">
        <MetabolicContextChart />

        <LatestSnapshotCard
          title="Latest Metabolic Values"
          items={[
            { label: 'Glucose', value: 5.8, unit: 'mmol/L', status: 'normal' },
            { label: 'HbA1c', value: '4.0%', unit: '(Feb 2024)' },
            { label: 'Insulin', value: '3.6', unit: 'uIU/mL (Jun 2023)' },
            { label: 'TG', value: 0.93, unit: 'mmol/L', status: 'normal' },
            { label: 'BMI', value: null, unit: 'kg/m2', status: 'missing' },
            { label: 'Waist', value: null, unit: 'cm', status: 'missing' },
          ]}
        />

        <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
          <p className="text-xs text-amber-400/80">
            Missing anthropometrics: BMI and waist circumference are not available in the current dataset.
            These are important for metabolic syndrome assessment.
          </p>
        </div>

        <NextDataCard items={[
          'Add BMI and waist circumference measurements',
          'Repeat HbA1c for longitudinal glucose context',
          'Consider fasting insulin for insulin resistance assessment',
        ]} />
      </div>
    </CategorySectionShell>
  );
}
