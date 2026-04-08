// Ver 3 — buildCoachPlan: turns the seed bundle + derived signals into the
// CoachPlan object that the brief card and modal both consume.
//
// Strategy: start from the frozen plan (deterministic copy that matches the
// spec demo wording exactly), then patch the dynamic parts — status dots,
// "why" lines, and the brief — from live signals. This preserves the demo
// content while keeping the chips honest about Anton's current numbers.

import type {
  CoachPlan,
  CoachPriority,
  PriorityCode,
  StatusDot,
} from '@/data/models';
import { frozenCoachPlan } from '@/data/seed/anton';
import { deriveAllSignals, type DerivedSignalBundle } from './derivedSignals';
import { priorityScore } from './priorityFormula';

export function buildCoachPlan(
  signals: DerivedSignalBundle = deriveAllSignals()
): CoachPlan {
  // Required-input check — fall back to frozen plan if anything went wrong.
  if (!signals || !signals.bloodworkStaleness) {
    return frozenCoachPlan;
  }

  const dynamic: CoachPriority[] = frozenCoachPlan.priorities.map((p) =>
    refreshPriority(p, signals)
  );

  // Sort by priority formula score (descending). The frozen ordering already
  // matches the formula, but applying the sort makes the Ver 2.3 contract
  // visible at runtime and lets future tweaks reorder cleanly.
  const ordered = [...dynamic].sort(
    (a, b) => priorityWeight(b.code, signals) - priorityWeight(a.code, signals)
  );

  return {
    brief: buildBrief(signals),
    generatedAt: new Date().toISOString(),
    priorities: ordered,
    gaps: frozenCoachPlan.gaps,
  };
}

function refreshPriority(
  p: CoachPriority,
  signals: DerivedSignalBundle
): CoachPriority {
  switch (p.code) {
    case 'P0':
      return {
        ...p,
        statusDot: signals.bloodworkStaleness.value > 180 ? 'red' : 'amber',
        whyLine: `Sweet intake up · ${signals.bloodworkStaleness.label.toLowerCase()}`,
      };
    case 'P1': {
      const headroom = signals.runningHeadroom.value;
      const dot: StatusDot =
        signals.acr.value > 1.3 ? 'amber' : headroom >= 6 ? 'green' : 'amber';
      return {
        ...p,
        statusDot: dot,
        whyLine: `${signals.runningHeadroom.label} · VO₂ max slope ${formatSigned(
          signals.vo2maxSlope.value
        )}`,
      };
    }
    case 'P2':
      return {
        ...p,
        statusDot: signals.liver.value === 'rising' ? 'amber' : 'green',
        whyLine: `UGT1A1 6TA/7TA · hemangioma file open · ${signals.liver.label.toLowerCase()}`,
      };
    case 'P3':
      return {
        ...p,
        statusDot: signals.sleepPressure.value >= 50 ? 'red' : 'amber',
        whyLine: `${signals.sleepPressure.label} · ${signals.hrvTrend.label.toLowerCase()}`,
      };
    case 'P4':
      return p; // imaging follow-up doesn't need a live signal
    default:
      return p;
  }
}

function buildBrief(signals: DerivedSignalBundle): string {
  const stale = signals.bloodworkStaleness.value > 180;
  const headroom = signals.runningHeadroom.value >= 6;
  if (stale && headroom) {
    return 'Two things this week — get glucose clarity fast, and start pushing your running + strength block. Details inside.';
  }
  if (stale) {
    return 'Top of mind this week: convert worry into a number with a fasting draw. Details inside.';
  }
  return 'Your numbers look stable — keep the running + strength block moving. Details inside.';
}

function priorityWeight(code: PriorityCode, signals: DerivedSignalBundle): number {
  switch (code) {
    case 'P0':
      return priorityScore({
        riskScore: signals.metabolicWatch.value ? 38 : 22,
        ageScore: 10,
        behaviorScore: 10,
        dataScore: Math.min(15, Math.round(signals.bloodworkStaleness.value / 30)),
        motivationScore: 12,
      });
    case 'P1':
      return priorityScore({
        riskScore: 18,
        ageScore: 10,
        behaviorScore: 8,
        dataScore: 6,
        motivationScore: 13,
      });
    case 'P2':
      return priorityScore({
        riskScore: signals.liver.value === 'rising' ? 22 : 16,
        ageScore: 10,
        behaviorScore: 6,
        dataScore: 8,
        motivationScore: 10,
      });
    case 'P3':
      return priorityScore({
        riskScore: 14,
        ageScore: 8,
        behaviorScore: signals.sleepPressure.value >= 50 ? 14 : 10,
        dataScore: 4,
        motivationScore: 8,
      });
    case 'P4':
      return priorityScore({
        riskScore: 10,
        ageScore: 6,
        behaviorScore: 4,
        dataScore: 12,
        motivationScore: 6,
      });
  }
}

function formatSigned(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`;
}
