// Derived (composite) signals — Ver 3 §4.7.
// Pure functions over the seed bundle. Each returns a numeric/boolean value
// plus a human label, so the coach card can render them as cited chips
// without re-formatting downstream.

import {
  ouraDaily,
  garminDaily,
  togglDerived,
  bloodworkPanels,
  oldestPanelStalenessDays,
  lipidData,
  liverData,
  antonQuestionnaireSeed,
} from '@/data/seed/anton';

export interface SignalValue<T> {
  value: T;
  label: string;
}

// ── HRV 7-day trend vs baseline (% deviation) ───────────────────────────────
// Compares the latest 7 days of Oura HRV-balance to the prior 14-day baseline.
export function hrv7dTrendVsBaseline(): SignalValue<number> {
  const desc = [...ouraDaily].reverse(); // most-recent first
  const recent = desc.slice(0, 7).map((d) => d.hrvBalance);
  const baseline = desc.slice(7, 21).map((d) => d.hrvBalance);
  const recentAvg = avg(recent);
  const baselineAvg = avg(baseline);
  // HRV balance is centered on 0, so we report percent of the baseline range
  const baselineRange = Math.max(8, Math.abs(baselineAvg) + 6);
  const deltaPct = Math.round(((recentAvg - baselineAvg) / baselineRange) * 100);
  return {
    value: deltaPct,
    label: `HRV 7d trend ${deltaPct >= 0 ? '+' : ''}${deltaPct}% vs baseline`,
  };
}

// ── Oura readiness rolling 7d ───────────────────────────────────────────────
export function readinessRolling7d(): SignalValue<number> {
  const desc = [...ouraDaily].reverse();
  const recent = desc.slice(0, 7).map((d) => d.readinessScore);
  const value = Math.round(avg(recent));
  return { value, label: `Readiness 7d avg ${value}` };
}

// ── Garmin training-load acute:chronic ratio ────────────────────────────────
export function trainingLoadACR(): SignalValue<number> {
  const desc = [...garminDaily].reverse();
  const latest = desc[0];
  const ratio = latest.chronicLoad === 0 ? 0 : latest.acuteLoad / latest.chronicLoad;
  const rounded = Math.round(ratio * 100) / 100;
  return { value: rounded, label: `Acute:chronic load ${rounded.toFixed(2)}` };
}

// ── Running tolerance headroom (acute tolerance − acute distance) ───────────
export function runningToleranceHeadroom(): SignalValue<number> {
  const desc = [...garminDaily].reverse();
  const latest = desc[0];
  const headroom = Math.max(
    0,
    Math.round(latest.acuteRunningToleranceKm - latest.acuteRunningDistanceKm)
  );
  return { value: headroom, label: `Running tolerance headroom ~${headroom} km/wk` };
}

// ── VO₂ max slope (proxy for 30d window since seed is 30d) ──────────────────
export function vo2maxSlope90d(): SignalValue<number> {
  const desc = [...garminDaily].reverse();
  const recent = desc.slice(0, 7).map((d) => d.vo2max);
  const older = desc.slice(20, 27).map((d) => d.vo2max);
  const slope = Math.round((avg(recent) - avg(older)) * 10) / 10;
  return { value: slope, label: `VO₂ max slope ${slope >= 0 ? '+' : ''}${slope} (30d)` };
}

// ── Sleep pressure index (composite of late-work + sleep score) ─────────────
export function sleepPressureIndex(): SignalValue<number> {
  const desc = [...ouraDaily].reverse();
  const recentSleep = avg(desc.slice(0, 7).map((d) => d.sleepScore));
  const latePenalty = togglDerived.late_work_nights_last_14d * 4;
  // 0 = none, 100 = max pressure
  const raw = Math.round(latePenalty + Math.max(0, 80 - recentSleep) * 2);
  const value = Math.min(100, raw);
  return { value, label: `Sleep pressure ${value}/100` };
}

// ── Bloodwork staleness (oldest panel days) ─────────────────────────────────
export function bloodworkStalenessDays(): SignalValue<number> {
  return {
    value: oldestPanelStalenessDays,
    label: `Oldest panel ${oldestPanelStalenessDays} days old`,
  };
}

// ── Liver enzyme trend (slope of last 4 ALT+AST+GGT) ────────────────────────
export function liverTrend(): SignalValue<'rising' | 'flat' | 'falling'> {
  const last4 = liverData.slice(-4);
  const composite = last4.map(
    (p) => (p.alt ?? 0) + (p.ast ?? 0) + (p.ggt ?? 0)
  );
  const first = composite[0];
  const last = composite[composite.length - 1];
  const delta = last - first;
  const value: 'rising' | 'flat' | 'falling' =
    delta > 5 ? 'rising' : delta < -5 ? 'falling' : 'flat';
  return { value, label: `Liver enzymes trending ${value}` };
}

// ── Lipid trend (slope of last 4 LDL) ───────────────────────────────────────
export function lipidTrend(): SignalValue<'rising' | 'flat' | 'falling'> {
  const last4 = lipidData.slice(-4);
  const ldls = last4.map((p) => p.ldl ?? 0);
  const delta = ldls[ldls.length - 1] - ldls[0];
  const value: 'rising' | 'flat' | 'falling' =
    delta > 0.3 ? 'rising' : delta < -0.3 ? 'falling' : 'flat';
  return { value, label: `LDL trend ${value} (last 4 draws)` };
}

// ── Metabolic watch flag ────────────────────────────────────────────────────
export function metabolicWatchFlag(): SignalValue<boolean> {
  const sweetHigh = antonQuestionnaireSeed.sweetIntake === 'high';
  const metabolicPanel = bloodworkPanels.find((p) => p.key === 'metabolic');
  const stale = (metabolicPanel?.panelStalenessDays ?? 0) > 180;
  const value = sweetHigh && stale;
  return {
    value,
    label: value
      ? 'Metabolic watch — sweets up + stale draw'
      : 'Metabolic baseline OK',
  };
}

// ── Convenience bundle for the derived layer ────────────────────────────────
export interface DerivedSignalBundle {
  hrvTrend: SignalValue<number>;
  readiness7d: SignalValue<number>;
  acr: SignalValue<number>;
  runningHeadroom: SignalValue<number>;
  vo2maxSlope: SignalValue<number>;
  sleepPressure: SignalValue<number>;
  bloodworkStaleness: SignalValue<number>;
  liver: SignalValue<'rising' | 'flat' | 'falling'>;
  lipid: SignalValue<'rising' | 'flat' | 'falling'>;
  metabolicWatch: SignalValue<boolean>;
}

export function deriveAllSignals(): DerivedSignalBundle {
  return {
    hrvTrend: hrv7dTrendVsBaseline(),
    readiness7d: readinessRolling7d(),
    acr: trainingLoadACR(),
    runningHeadroom: runningToleranceHeadroom(),
    vo2maxSlope: vo2maxSlope90d(),
    sleepPressure: sleepPressureIndex(),
    bloodworkStaleness: bloodworkStalenessDays(),
    liver: liverTrend(),
    lipid: lipidTrend(),
    metabolicWatch: metabolicWatchFlag(),
  };
}

function avg(xs: number[]): number {
  if (xs.length === 0) return 0;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}
