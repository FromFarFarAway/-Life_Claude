import type { DerivedRiskTag, DerivedSegment, CompletenessState, HealthGoal } from './models';
import { userProfile } from './profile';
import { categories } from './categories';
import { evidenceEntries } from './evidence';
import { deriveAllSignals } from '@/lib/derivedSignals';

// Primary segment derivation
export function derivePrimarySegment(
  age: number,
  sex: 'Male' | 'Female'
): Pick<DerivedSegment, 'ageGroup' | 'sex'> {
  let ageGroup: DerivedSegment['ageGroup'] = '30-39';
  if (age < 30) ageGroup = '18-29';
  else if (age < 40) ageGroup = '30-39';
  else if (age < 50) ageGroup = '40-49';
  else if (age < 60) ageGroup = '50-59';
  else ageGroup = '60+';
  return { ageGroup, sex };
}

// Motivation tags from goals
export function deriveMotivationTags(goals: HealthGoal[]): string[] {
  const tagMap: Record<HealthGoal, string[]> = {
    'preventive-optimization': ['preventive', 'proactive', 'screening-focused'],
    'longevity': ['longevity-focused', 'anti-aging', 'biomarker-driven'],
    'heart-risk-management': ['cardio-aware', 'lipid-focused', 'risk-reducer'],
    'metabolic-control': ['metabolic-focused', 'weight-aware', 'glucose-tracking'],
    'mental-wellness': ['mental-health-aware', 'stress-management', 'cognitive-focused'],
    'screening-catchup': ['screening-priority', 'gap-closer', 'catch-up-mode'],
    'fitness-optimization': ['performance-driven', 'fitness-focused', 'recovery-aware'],
  };
  const tags = new Set<string>();
  for (const goal of goals) {
    for (const tag of tagMap[goal] ?? []) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

// Risk tags from available data
export function deriveRiskTags(): DerivedRiskTag[] {
  const tags: DerivedRiskTag[] = [];

  // Cardiovascular risk from LDL
  const ldl = evidenceEntries.find(e => e.metricId === 'ldl');
  if (ldl?.latestValue && typeof ldl.latestValue === 'number' && ldl.latestValue > 4.0) {
    tags.push({
      id: 'high-ldl',
      categoryId: 'cardiovascular',
      tag: 'Persistent LDL elevation',
      severity: 'high',
      evidenceBasis: `LDL ${ldl.latestValue} mmol/L across ${ldl.historicalCount} measurements`,
      dataSource: 'lab',
    });
  }

  // Missing ApoB
  const apoB = evidenceEntries.find(e => e.metricId === 'apoB');
  if (apoB && apoB.latestValue === null) {
    tags.push({
      id: 'missing-apob',
      categoryId: 'cardiovascular',
      tag: 'ApoB never measured',
      severity: 'moderate',
      evidenceBasis: 'Atherogenic particle count unknown',
      dataSource: 'lab',
    });
  }

  // Liver watchlist
  const bilT = evidenceEntries.find(e => e.metricId === 'bilT');
  if (bilT?.latestValue && typeof bilT.latestValue === 'number') {
    tags.push({
      id: 'bilirubin-variability',
      categoryId: 'liver',
      tag: 'Bilirubin variability with imaging findings',
      severity: 'moderate',
      evidenceBasis: 'Hemangioma + gallbladder sludge on imaging',
      dataSource: 'imaging',
    });
  }

  // Low screening coverage
  const screening = categories.find(c => c.id === 'cancerScreening');
  if (screening && screening.coverage < 0.2) {
    tags.push({
      id: 'low-screening',
      categoryId: 'cancerScreening',
      tag: 'Minimal cancer screening coverage',
      severity: 'moderate',
      evidenceBasis: `Only ${Math.round(screening.coverage * 100)}% coverage`,
      dataSource: 'clinical',
    });
  }

  // Missing BP
  const bp = evidenceEntries.find(e => e.metricId === 'bp');
  if (bp && bp.latestValue === null) {
    tags.push({
      id: 'missing-bp',
      categoryId: 'cardiovascular',
      tag: 'Blood pressure not recorded',
      severity: 'moderate',
      evidenceBasis: 'Essential for cardiovascular risk stratification',
      dataSource: 'clinical',
    });
  }

  // Cognitive/longevity gap
  const cogLong = categories.find(c => c.id === 'cognitiveLongevity');
  if (cogLong && cogLong.coverage < 0.1) {
    tags.push({
      id: 'cognitive-gap',
      categoryId: 'cognitiveLongevity',
      tag: 'No cognitive or longevity baseline',
      severity: 'low',
      evidenceBasis: `Only ${Math.round(cogLong.coverage * 100)}% coverage`,
      dataSource: 'clinical',
    });
  }

  // ── Ver 3 ───────────────────────────────────────────────────────────────
  // Wearable + derived-signal driven tags. Kept additive so 2.3 widgets keep
  // seeing what they expect.
  try {
    const signals = deriveAllSignals();

    if (signals.metabolicWatch.value) {
      tags.push({
        id: 'r3-metabolic-watch',
        categoryId: 'metabolic',
        tag: 'R3 metabolic watch — sweets up + stale draw',
        severity: 'moderate',
        evidenceBasis: signals.metabolicWatch.label,
        dataSource: 'self-report',
      });
    }

    if (signals.liver.value !== 'falling') {
      tags.push({
        id: 'r4-liver-active',
        categoryId: 'liver',
        tag: 'R4 liver active — UGT1A1 carrier + GGT trend',
        severity: 'moderate',
        evidenceBasis: signals.liver.label,
        dataSource: 'lab',
      });
    }

    if (signals.hrvTrend.value <= -5 || signals.sleepPressure.value >= 30) {
      tags.push({
        id: 'r10-longevity-sleep',
        categoryId: 'cognitiveLongevity',
        tag: 'R10 longevity/cognitive — sleep arm flagged',
        severity: 'moderate',
        evidenceBasis: `${signals.hrvTrend.label} · ${signals.sleepPressure.label}`,
        dataSource: 'wearable',
      });
    }
  } catch {
    // If derived signals throw for any reason, fall back to the 2.3 tag set.
  }

  return tags;
}

// Data completeness state
export function deriveCompletenessState(
  hasQuestionnaire: boolean,
  hasLabs: boolean,
  hasImaging: boolean,
  hasWearable: boolean
): CompletenessState {
  const sources = [hasQuestionnaire, hasLabs, hasImaging, hasWearable].filter(Boolean).length;
  if (sources === 0) return 'none';
  if (sources === 1 && hasQuestionnaire) return 'questionnaire-only';
  if (sources === 1 && hasLabs) return 'labs-only';
  if (sources >= 3) return 'comprehensive';
  return 'mixed-incomplete';
}

// Current seeded completeness state (labs + imaging present, no questionnaire, no wearable)
export const currentSegment: DerivedSegment = {
  userId: 'anton-ivanov',
  ...derivePrimarySegment(userProfile.age, userProfile.sex),
  motivationTags: [],
  riskTags: deriveRiskTags().map(t => t.tag),
  completenessState: deriveCompletenessState(false, true, true, false),
};
