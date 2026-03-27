import { CategorySectionShell } from './CategorySectionShell';
import { NextDataCard } from './NextDataCard';
import { CoverageStateCard } from './CoverageStateCard';
import { categories } from '@/data/categories';
import { dashboardCopy } from '@/data/profile';

const category = categories.find((c) => c.id === 'cognitiveLongevity')!;

export function CognitiveLongevityContent() {
  return (
    <CategorySectionShell category={category} summary={dashboardCopy.sectionSummaries.cognitiveLongevity}>
      <div className="space-y-5">
        <CoverageStateCard
          coverage={0.05}
          message="No direct cognitive assessments, mood screenings (PHQ/GAD), sleep-device data, or longevity biomarkers are available in the current dataset. This section represents an incompletely explored area."
        />

        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Data Needed</p>
          <div className="space-y-2">
            {[
              'Cognitive baseline assessment',
              'PHQ-9 / GAD-7 mood screening',
              'Sleep quality data (wearable or clinical)',
              'Longevity biomarkers (e.g., telomere length, advanced glycation)',
              'Lifestyle and activity data',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-[#12121e] border border-[#2a2a45] rounded-lg px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-600" aria-hidden="true" />
                <span className="text-xs text-gray-500">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <NextDataCard
          title="Future integrations"
          items={[
            'Connect wearable device for sleep and activity data',
            'Complete a validated cognitive screening questionnaire',
            'Add mood/wellbeing self-assessment tools',
          ]}
        />
      </div>
    </CategorySectionShell>
  );
}
