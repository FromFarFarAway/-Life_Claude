'use client';

import { CategorySectionShell } from './CategorySectionShell';
import { LatestSnapshotCard } from './LatestSnapshotCard';
import { LiverContextChart } from '@/components/charts/LiverContextChart';
import { categories } from '@/data/categories';
import { dashboardCopy } from '@/data/profile';
import { imagingTimeline, liverData } from '@/data/labs';
import { formatDateFull } from '@/lib/format';

const category = categories.find((c) => c.id === 'liver')!;
const latest = liverData[liverData.length - 1];

export function LiverHealthContent() {
  return (
    <CategorySectionShell category={category} summary={dashboardCopy.sectionSummaries.liver}>
      <div className="space-y-5">
        {/* Liver charts */}
        <LiverContextChart />

        {/* Latest snapshot */}
        <LatestSnapshotCard
          title="Latest Liver Panel (May 2025)"
          items={[
            { label: 'Total Bilirubin', value: latest.bilT, unit: 'umol/L' },
            { label: 'Direct Bilirubin', value: latest.bilD, unit: 'umol/L' },
            { label: 'ALT', value: latest.alt, unit: 'U/L' },
            { label: 'AST', value: latest.ast, unit: 'U/L' },
            { label: 'GGT', value: latest.ggt, unit: 'U/L' },
            { label: 'ALP', value: latest.alp, unit: 'U/L' },
          ]}
        />

        {/* Imaging timeline */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-3">Imaging Timeline</p>
          <div className="space-y-2">
            {imagingTimeline.map((event) => (
              <div
                key={event.date}
                className="bg-[#12121e] border border-[#2a2a45] rounded-lg p-3 flex gap-3"
              >
                <div className="flex-shrink-0">
                  <span className="text-[10px] text-gray-500 font-medium">{formatDateFull(event.date)}</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-300">{event.study}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{event.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CategorySectionShell>
  );
}
