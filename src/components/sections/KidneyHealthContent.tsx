'use client';

import { CategorySectionShell } from './CategorySectionShell';
import { LatestSnapshotCard } from './LatestSnapshotCard';
import { KidneyTrendChart } from '@/components/charts/KidneyTrendChart';
import { categories } from '@/data/categories';
import { dashboardCopy } from '@/data/profile';
import { kidneyData } from '@/data/labs';

const category = categories.find((c) => c.id === 'kidney')!;
const latest = kidneyData[kidneyData.length - 1];

export function KidneyHealthContent() {
  return (
    <CategorySectionShell category={category} summary={dashboardCopy.sectionSummaries.kidney}>
      <div className="space-y-5">
        {/* Kidney chart */}
        <KidneyTrendChart />

        {/* Latest snapshot */}
        <LatestSnapshotCard
          title="Latest Kidney Panel (May 2025)"
          items={[
            { label: 'Creatinine', value: latest.creatinine, unit: 'umol/L', status: 'normal' },
            { label: 'Urea', value: latest.urea, unit: 'mmol/L', status: 'normal' },
            { label: 'Uric Acid', value: latest.uricAcid, unit: 'umol/L', status: 'normal' },
          ]}
        />

        {/* Ultrasound summary */}
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-4">
          <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-1">Ultrasound Summary</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Latest abdominal ultrasound shows kidneys largely normal. One later scan notes right nephroptosis
            context, but overall kidney picture is comparatively reassuring. Kidney findings are not the
            primary concern in the current dataset.
          </p>
        </div>
      </div>
    </CategorySectionShell>
  );
}
