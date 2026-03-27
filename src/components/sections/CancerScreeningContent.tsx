import { CategorySectionShell } from './CategorySectionShell';
import { NextDataCard } from './NextDataCard';
import { CoverageStateCard } from './CoverageStateCard';
import { categories } from '@/data/categories';
import { dashboardCopy } from '@/data/profile';

const category = categories.find((c) => c.id === 'cancerScreening')!;

export function CancerScreeningContent() {
  return (
    <CategorySectionShell category={category} summary={dashboardCopy.sectionSummaries.cancerScreening}>
      <div className="space-y-5">
        <CoverageStateCard
          coverage={0.1}
          message="Almost no dedicated cancer screening evidence exists in the currently uploaded files. This section serves as a coverage and next-step module."
        />

        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Screening Status</p>
          <div className="space-y-2">
            {[
              { name: 'Colorectal screening', status: 'Not evidenced' },
              { name: 'Skin cancer screening', status: 'Not evidenced' },
              { name: 'Prostate screening (PSA)', status: 'Not evidenced' },
              { name: 'Lung cancer screening', status: 'Not indicated at this age without risk factors' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between bg-[#12121e] border border-[#2a2a45] rounded-lg px-3 py-2">
                <span className="text-xs text-gray-400">{item.name}</span>
                <span className="text-[10px] text-gray-600 italic">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <NextDataCard
          title="Recommended screening considerations"
          items={[
            'Discuss age-appropriate screening schedule with physician',
            'Consider baseline dermatology screening',
            'Document any relevant family cancer history',
          ]}
        />
      </div>
    </CategorySectionShell>
  );
}
