// Ver 2.3 priority formula re-applied to Ver 3 plan ordering.
//   priority = wRisk + wAge + wBeh + wData + wMot
// Used internally by buildCoachPlan to sort the five P0–P4 priorities.

export interface PriorityWeightInput {
  riskScore: number;     // 0..40 — clinical urgency from derived signals
  ageScore: number;      // 0..15 — age-modulated importance
  behaviorScore: number; // 0..15 — recent behavior pressure
  dataScore: number;     // 0..15 — staleness / coverage gap
  motivationScore: number; // 0..15 — alignment with user goals
}

export function priorityScore(w: PriorityWeightInput): number {
  return (
    w.riskScore +
    w.ageScore +
    w.behaviorScore +
    w.dataScore +
    w.motivationScore
  );
}

// Default weights matching the Ver 2.3 contract — kept here so the formula
// stays in one place if it's tuned later.
export const DEFAULT_WEIGHTS = {
  wRisk: 1,
  wAge: 1,
  wBeh: 1,
  wData: 1,
  wMot: 1,
} as const;
