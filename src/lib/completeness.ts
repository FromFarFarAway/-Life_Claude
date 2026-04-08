import { categories } from '@/data/categories';
import { evidenceEntries } from '@/data/evidence';
import type { HealthGoal } from '@/data/models';
import {
  ouraDaily,
  garminDaily,
  oldestPanelStalenessDays,
} from '@/data/seed/anton';

export interface MissingItem {
  label: string;
  category: string;
  impact: 'high' | 'medium' | 'low';
  reason: string;
}

export interface CompletenessResult {
  percentage: number;
  missingItems: MissingItem[];
  dataSources: {
    questionnaire: boolean;
    labs: boolean;
    imaging: boolean;
    wearable: boolean;
  };
}

const SOURCE_WEIGHTS = {
  questionnaire: 15,
  labs: 40,
  imaging: 15,
  wearable: 10,
  categoryCoverage: 20,
};

export function calculateProfileCompleteness(
  questionnaireCompleted: boolean,
  userGoals: HealthGoal[]
): CompletenessResult {
  let total = 0;
  const maxTotal = SOURCE_WEIGHTS.questionnaire + SOURCE_WEIGHTS.labs + SOURCE_WEIGHTS.imaging + SOURCE_WEIGHTS.wearable + SOURCE_WEIGHTS.categoryCoverage;

  // Questionnaire component
  if (questionnaireCompleted) {
    total += SOURCE_WEIGHTS.questionnaire;
  }

  // Labs component — based on how many evidence entries have data
  const labEntries = evidenceEntries.filter(e => e.sourceNote !== 'Never measured' && e.sourceNote !== 'Not in uploaded files');
  const totalLabEntries = evidenceEntries.length;
  const labRatio = totalLabEntries > 0 ? labEntries.length / totalLabEntries : 0;
  total += Math.round(labRatio * SOURCE_WEIGHTS.labs);

  // Imaging component — we have imaging data
  const hasImaging = true; // seeded: 3 imaging events
  if (hasImaging) {
    total += SOURCE_WEIGHTS.imaging;
  }

  // Wearable component — Ver 3 wires Oura + Garmin daily seed
  const hasWearable = ouraDaily.length > 0 || garminDaily.length > 0;
  if (hasWearable) {
    total += SOURCE_WEIGHTS.wearable;
  }

  // Category coverage average
  const avgCoverage = categories.reduce((sum, c) => sum + c.coverage, 0) / categories.length;
  total += Math.round(avgCoverage * SOURCE_WEIGHTS.categoryCoverage);

  // Build missing items
  const missingItems = buildMissingItems(questionnaireCompleted, userGoals);

  return {
    percentage: Math.round((total / maxTotal) * 100),
    missingItems,
    dataSources: {
      questionnaire: questionnaireCompleted,
      labs: labRatio > 0,
      imaging: hasImaging,
      wearable: hasWearable,
    },
  };
}

function buildMissingItems(questionnaireCompleted: boolean, userGoals: HealthGoal[]): MissingItem[] {
  const items: MissingItem[] = [];

  if (!questionnaireCompleted) {
    items.push({
      label: 'Complete health questionnaire',
      category: 'general',
      impact: 'high',
      reason: 'Questionnaire data enriches profile with lifestyle, family history, and goals.',
    });
  }

  // Critical missing lab markers
  const criticalMissing = evidenceEntries.filter(e => e.latestValue === null);
  for (const entry of criticalMissing) {
    let impact: 'high' | 'medium' | 'low' = 'medium';
    if (['apoB', 'lpa', 'bp'].includes(entry.metricId)) impact = 'high';
    if (['bmi', 'waist', 'crp', 'ferritin'].includes(entry.metricId)) impact = 'medium';

    items.push({
      label: `Add ${entry.displayLabel}`,
      category: getCategoryForMetric(entry.metricId),
      impact,
      reason: entry.missingnessNote ?? 'Missing from current dataset',
    });
  }

  // Low-coverage categories
  for (const cat of categories) {
    if (cat.coverage < 0.2) {
      items.push({
        label: `Improve ${cat.label} coverage`,
        category: cat.id,
        impact: 'medium',
        reason: `Only ${Math.round(cat.coverage * 100)}% data coverage`,
      });
    }
  }

  // Wearable data — only show this gap if we don't have any wearable seed
  if (ouraDaily.length === 0 && garminDaily.length === 0) {
    items.push({
      label: 'Connect a wearable device',
      category: 'general',
      impact: 'low',
      reason: 'Sleep, activity, and heart rate data would enhance cognitive and longevity insights.',
    });
  }

  // Stale bloodwork — Ver 3 surfaces this as a high-impact gap
  if (oldestPanelStalenessDays > 180) {
    items.push({
      label: `Bloodwork is ${oldestPanelStalenessDays} days old`,
      category: 'general',
      impact: 'high',
      reason: 'At least one panel is past the 6-month freshness window — refresh in P0.',
    });
  }

  // Goal-specific items
  if (userGoals.includes('mental-wellness')) {
    items.push({
      label: 'Complete PHQ/GAD screening',
      category: 'cognitiveLongevity',
      impact: 'medium',
      reason: 'No mental health baseline exists. Screening would improve cognitive section coverage.',
    });
  }

  if (userGoals.includes('fitness-optimization')) {
    items.push({
      label: 'Add fitness assessment data',
      category: 'metabolic',
      impact: 'medium',
      reason: 'VO2max, body composition, or exercise test results would build a fitness profile.',
    });
  }

  return items;
}

function getCategoryForMetric(metricId: string): string {
  const map: Record<string, string> = {
    apoB: 'cardiovascular', lpa: 'cardiovascular', bp: 'cardiovascular',
    bmi: 'metabolic', waist: 'metabolic',
    crp: 'immune',
    ferritin: 'nutrientBlood',
  };
  return map[metricId] ?? 'general';
}
