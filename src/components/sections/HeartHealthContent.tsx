'use client';

import { CategorySectionShell } from './CategorySectionShell';
import { LatestSnapshotCard } from './LatestSnapshotCard';
import { NextDataCard } from './NextDataCard';
import { LipidTrendChart } from '@/components/charts/LipidTrendChart';
import { categories } from '@/data/categories';
import { dashboardCopy } from '@/data/profile';
import { lipidData } from '@/data/labs';

const category = categories.find((c) => c.id === 'cardiovascular')!;
const latest = lipidData[lipidData.length - 1];

const thresholdBars = [
  { label: 'LDL-C', value: latest.ldl!, threshold: 3.0, unit: 'mmol/L', over: true },
  { label: 'Total Cholesterol', value: latest.tc!, threshold: 5.2, unit: 'mmol/L', over: true },
  { label: 'Non-HDL-C', value: latest.nonHdl!, threshold: 3.8, unit: 'mmol/L', over: true },
  { label: 'HDL-C', value: latest.hdl!, threshold: 1.0, unit: 'mmol/L', over: false },
];

export function HeartHealthContent() {
  return (
    <CategorySectionShell category={category} summary={dashboardCopy.sectionSummaries.cardiovascular}>
      <div className="space-y-5">
        {/* Lipid trend chart */}
        <LipidTrendChart />

        {/* Current vs threshold */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-3">Latest Values vs Thresholds</p>
          <div className="space-y-2">
            {thresholdBars.map((bar) => {
              const ratio = bar.over
                ? Math.min(bar.value / (bar.threshold * 2.5), 1)
                : Math.min(bar.value / (bar.threshold * 3), 1);
              const thresholdPos = bar.over
                ? (bar.threshold / (bar.threshold * 2.5)) * 100
                : (bar.threshold / (bar.threshold * 3)) * 100;
              const isExceeded = bar.over ? bar.value > bar.threshold : bar.value < bar.threshold;

              return (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-28 flex-shrink-0">{bar.label}</span>
                  <div className="flex-1 relative h-3 bg-[#12121e] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isExceeded ? 'bg-red-500/60' : 'bg-emerald-500/60'}`}
                      style={{ width: `${ratio * 100}%` }}
                    />
                    <div
                      className="absolute top-0 h-full w-0.5 bg-gray-400/50"
                      style={{ left: `${thresholdPos}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium w-20 text-right ${isExceeded ? 'text-red-400' : 'text-emerald-400'}`}>
                    {bar.value} {bar.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Latest snapshot */}
        <LatestSnapshotCard
          title="Latest Lipid Panel (May 2025)"
          items={[
            { label: 'Total Cholesterol', value: latest.tc, unit: 'mmol/L', status: 'elevated' },
            { label: 'LDL-C', value: latest.ldl, unit: 'mmol/L', status: 'elevated' },
            { label: 'HDL-C', value: latest.hdl, unit: 'mmol/L', status: 'normal' },
            { label: 'Triglycerides', value: latest.tg, unit: 'mmol/L', status: 'normal' },
            { label: 'Non-HDL-C', value: latest.nonHdl, unit: 'mmol/L', status: 'elevated' },
            { label: 'ApoB', value: null, unit: 'g/L', status: 'missing' },
          ]}
        />

        {/* Next steps */}
        <NextDataCard
          title="Next steps for cardiovascular risk clarity"
          items={[
            'Add ApoB measurement to quantify atherogenic particle burden',
            'Request one-time Lp(a) to assess genetic cardiovascular risk',
            'Bring blood pressure readings into the health record',
            'Document family history of cardiovascular disease',
            'Consider repeat fasting lipid panel with consistent preparation',
          ]}
        />
      </div>
    </CategorySectionShell>
  );
}
