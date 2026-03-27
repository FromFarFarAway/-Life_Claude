import { categories, categoryWeights, SEEDED_OVERALL_SCORE } from '@/data/categories';

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function calculateCategoryScore(
  scoreBase: number,
  severityPenalty: number,
  missingPenalty: number,
  reassuranceBonus: number
): number {
  return clamp(scoreBase - severityPenalty - Math.min(missingPenalty, 20) + reassuranceBonus, 20, 95);
}

export function calculateOverallScore(
  categoryScores: { id: string; score: number }[],
  weights: Record<string, number>
): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const cat of categoryScores) {
    const weight = weights[cat.id] ?? 1.0;
    weightedSum += cat.score * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
}

export function calculateCoverage(coverages: number[]): {
  blindSpotsExplored: number;
  uncertainty: number;
} {
  const mean = coverages.reduce((sum, c) => sum + c, 0) / coverages.length;
  const blindSpotsExplored = Math.round(mean * 100);
  return {
    blindSpotsExplored,
    uncertainty: 100 - blindSpotsExplored,
  };
}

export function validateScoringIntegrity(): void {
  if (typeof window === 'undefined') return;

  const computedOverall = calculateOverallScore(
    categories.map((c) => ({ id: c.id, score: c.score })),
    categoryWeights
  );

  if (Math.abs(computedOverall - SEEDED_OVERALL_SCORE) > 1) {
    console.warn(
      `[+LIFE Scoring] Overall score mismatch: computed=${computedOverall}, seeded=${SEEDED_OVERALL_SCORE}`
    );
  }

  const coverage = calculateCoverage(categories.map((c) => c.coverage));
  if (Math.abs(coverage.blindSpotsExplored - 54) > 1) {
    console.warn(
      `[+LIFE Scoring] Coverage mismatch: computed=${coverage.blindSpotsExplored}%, seeded=54%`
    );
  }
}
