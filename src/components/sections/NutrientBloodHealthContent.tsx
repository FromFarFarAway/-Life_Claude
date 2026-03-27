import { CategorySectionShell } from './CategorySectionShell';
import { LatestSnapshotCard } from './LatestSnapshotCard';
import { NextDataCard } from './NextDataCard';
import { categories } from '@/data/categories';
import { dashboardCopy } from '@/data/profile';

const category = categories.find((c) => c.id === 'nutrientBlood')!;

export function NutrientBloodHealthContent() {
  return (
    <CategorySectionShell category={category} summary={dashboardCopy.sectionSummaries.nutrientBlood}>
      <div className="space-y-5">
        <LatestSnapshotCard
          title="Blood Vitality (May 2025)"
          items={[
            { label: 'Hemoglobin', value: 158, unit: 'g/L', status: 'normal' },
            { label: 'RBC', value: 5.2, unit: '10^12/L', status: 'normal' },
            { label: 'MCV', value: 89, unit: 'fL', status: 'normal' },
          ]}
        />

        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Nutrient Markers</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Vitamin B12', value: '789 pg/mL', color: 'text-emerald-400' },
              { label: 'Folate', value: '8.6 ng/mL', color: 'text-emerald-400' },
              { label: 'Iron', value: '30.5 umol/L', color: 'text-blue-400' },
              { label: 'Ferritin', value: 'Not measured', color: 'text-gray-500' },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 bg-[#12121e] border border-[#2a2a45] rounded-full px-3 py-1.5 text-xs"
              >
                <span className="text-gray-400">{chip.label}:</span>
                <span className={`font-medium ${chip.color}`}>{chip.value}</span>
              </span>
            ))}
          </div>
        </div>

        <NextDataCard items={[
          'Add ferritin for complete iron storage assessment',
          'Consider vitamin D if not recently measured',
          'Repeat B12 and folate for longitudinal trend',
        ]} />
      </div>
    </CategorySectionShell>
  );
}
