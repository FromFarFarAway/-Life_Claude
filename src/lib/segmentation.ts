// Ver 3 segmentation engine — produces L/R/B/D/M tag arrays for Anton.
// Pure function over the seed bundle + derived signals; no side effects.

import type { AntonSegment } from '@/data/models';
import { antonProfile, antonQuestionnaireSeed } from '@/data/seed/anton';
import { deriveAllSignals } from './derivedSignals';

export function deriveAntonSegment(): AntonSegment {
  const signals = deriveAllSignals();

  // ── L: Life stage ────────────────────────────────────────────────────────
  const L: string[] = [];
  if (antonProfile.age >= 30 && antonProfile.age < 45) L.push('L2');
  else if (antonProfile.age < 30) L.push('L1');
  else if (antonProfile.age < 60) L.push('L3');
  else L.push('L4');

  // ── R: Risk clusters ─────────────────────────────────────────────────────
  const R: string[] = [];
  // R1 cardiometabolic — borderline-active because LDL persistently elevated
  if (signals.lipid.value === 'rising' || signals.lipid.value === 'flat') {
    R.push('R1-borderline');
  }
  // R3 metabolic watch — sweets up + stale draw
  if (signals.metabolicWatch.value) R.push('R3-watch');
  // R4 liver active — UGT1A1 + hemangioma + rising GGT
  if (signals.liver.value !== 'falling') R.push('R4-active');
  // R10 longevity/cognitive — sleep arm
  if (signals.hrvTrend.value <= -5 || signals.sleepPressure.value >= 30) {
    R.push('R10-active');
  }

  // ── B: Behavior ──────────────────────────────────────────────────────────
  const B: string[] = ['B3']; // never smoked (from profile)
  if (signals.sleepPressure.value >= 30) B.push('B5');
  if (antonQuestionnaireSeed.alcoholOccasionsPerWeek >= 1) B.push('B6');

  // ── D: Data profile ──────────────────────────────────────────────────────
  const D: string[] = [];
  // D3 — labs + wearables both present
  D.push('D3');
  // D4-partial — labs stale (>180d on at least one panel)
  if (signals.bloodworkStaleness.value > 180) D.push('D4-partial');

  // ── M: Motivation ────────────────────────────────────────────────────────
  const M: string[] = [];
  if (antonQuestionnaireSeed.goals.includes('longevity')) M.push('M1');
  // M3 condition management — UGT1A1 / liver
  M.push('M3');
  // M6 clear roadmap — implied by completing the questionnaire and selecting goals
  if (antonQuestionnaireSeed.goals.length > 0) M.push('M6');

  return { L, R, B, D, M };
}
