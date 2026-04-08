// Frozen Anton coach plan — deterministic safety net for the demo.
// Mirrors the §5.2/§5.3 contract from Ver 3. The Derived layer
// (lib/coachPlan.ts) regenerates an equivalent object from the seed bundle;
// this file is the fallback used if any required input is missing.

import type { CoachPlan } from '@/data/models';

export const frozenCoachPlan: CoachPlan = {
  brief:
    'Two things this week — get glucose clarity fast, and start pushing your running + strength block. Details inside.',
  generatedAt: '2026-04-08T08:00:00Z',
  gaps: [
    'B12, folate, ferritin, vitamin D not recently tracked — batch into the P0 draw.',
    'No structured non-Garmin pace / HR data.',
    'No subjective energy/mood 1–5 daily log.',
  ],
  priorities: [
    {
      code: 'P0',
      title: 'Get glucose clarity, this week',
      statusDot: 'red',
      whyLine: 'Sweet intake up · oldest bloodwork panel 338 days old',
      action: {
        code: 'P0',
        title: 'Get glucose clarity, this week',
        whyParagraph:
          'You self-reported sweet intake creeping up, and your last metabolic draw is past the 6-month window. None of your wearable signals look alarming, but this is the cheapest, fastest way to convert worry into a number.',
        reassurance:
          "You're probably fine: RHR is stable around 50–53, Oura HRV balance sits in your normal band on baseline days, body-temperature trend is flat, sleep efficiency holds at 90%+, your 2021 lipid panel was reassuring (LDL 3.11, TG 0.85), the 2021 abdominal US showed a normal pancreas, and your UGT1A1 report carries no diabetes-risk variants. The blood draw confirms it.",
        steps: [
          'Book this week: fasting glucose, HbA1c, fasting insulin (for HOMA-IR).',
          'Add to the same draw: repeat lipid panel, ALT/AST/GGT, total + direct bilirubin.',
          'Bundle the long-overdue micronutrients: B12, folate, ferritin, vitamin D.',
        ],
        parallelHabits: [
          'Post-lunch + post-dinner 10-min walk on every workday.',
          'Cap added sugar to one occasion per day.',
          'Front-load any sweets to within 2 hours after training.',
        ],
        verification:
          'HbA1c < 5.7% AND fasting glucose < 5.5 mmol/L → drop this from P0 to a P3 watch.',
        evidence: {
          metrics: [
            { id: 'glucose', label: 'Fasting glucose', current: '5.8 mmol/L (2025-05-05)', baseline: '4.5–5.5 mmol/L window', source: 'lab' },
            { id: 'panel-staleness', label: 'Oldest panel staleness', current: '~340 days', source: 'lab' },
            { id: 'sweet-intake', label: 'Self-reported sweet intake', current: 'high', source: 'self-report' },
            { id: 'rhr', label: 'Oura RHR (baseline)', current: '50–53 bpm', source: 'oura' },
            { id: 'hrv-balance', label: 'Oura HRV balance (baseline)', current: '+2 to +14', source: 'oura' },
            { id: 'body-temp', label: 'Body temp deviation', current: '±0.05 °C (flat)', source: 'oura' },
          ],
          studies: [
            { id: 'lipid-2021-09-18', label: 'Lipid panel — TG 0.85, TC 6.8', date: '2021-09-18', vaultAnchor: 'vault-lab-2021-09-18' },
            { id: 'us-2021-07-04', label: 'Abdominal US — normal pancreas', date: '2021-07-04', vaultAnchor: 'vault-us-2021-07-04' },
            { id: 'ugt1a1-2021-11-26', label: 'UGT1A1 genetic report', date: '2021-11-26', vaultAnchor: 'vault-genetic-ugt1a1-2021-11-26' },
          ],
        },
      },
    },
    {
      code: 'P1',
      title: 'Build the running + strength block',
      statusDot: 'green',
      whyLine: 'Running tolerance headroom 12 km · VO₂ max 49 (flat)',
      action: {
        code: 'P1',
        title: 'Build the running + strength block',
        whyParagraph:
          'Garmin says you have running-tolerance headroom (acute distance well under acute tolerance), VO₂ max is flat at 49, and your race predictor has been stuck. Readiness is in the productive band on baseline days. Now is the time to add stimulus.',
        steps: [
          'Mon — Strength A (lower-body focus, ~50 min).',
          'Tue — Easy run, 6–8 km, conversational pace.',
          'Wed — Sauna or massage, only if HRV is in band.',
          'Thu — Strength B (upper + core, ~50 min).',
          'Fri — Quality run (intervals or tempo, the only "hard" session of the week).',
          'Sat — Long run, 12–16 km easy.',
          'Sun — Rest.',
        ],
        parallelHabits: [
          'Skip the hard session if Oura readiness < 75 OR HRV is outside the 7-day band.',
          'No runs after 20:00.',
          'Morning HR must settle within 10 min on waking.',
          'Fasted strength sessions stay under 60 min.',
        ],
        verification:
          'After 4 weeks: race-predictor 5K improves OR VO₂ max moves from 49 → 50 with HRV still in band.',
        evidence: {
          metrics: [
            { id: 'running-tolerance', label: 'Running tolerance headroom', current: '~12 km/week', source: 'garmin' },
            { id: 'vo2max', label: 'VO₂ max', current: '49 (flat 30d)', source: 'garmin' },
            { id: 'training-status', label: 'Garmin training status', current: 'maintaining → productive', source: 'garmin' },
            { id: 'readiness-7d', label: 'Oura readiness 7d (baseline)', current: '~74', source: 'oura' },
            { id: 'race-5k', label: 'Race predictor 5K', current: '21:30 (stuck)', source: 'garmin' },
          ],
          studies: [],
        },
      },
    },
    {
      code: 'P2',
      title: 'Light-touch liver protection',
      statusDot: 'amber',
      whyLine: 'UGT1A1 6TA/7TA · hemangioma file open · GGT trending up',
      action: {
        code: 'P2',
        title: 'Light-touch liver protection',
        whyParagraph:
          'You are a UGT1A1 heterozygous carrier with a 12 mm hepatic hemangioma on the 2021 ultrasound and a slow upward GGT trend. Nothing alarming — just three guardrails worth honoring while we close the imaging file.',
        steps: [
          'No fasted training longer than 90 minutes.',
          'Cut one alcohol occasion per week to zero for 4 weeks.',
          'Daily soluble fiber (oats, psyllium, or legumes).',
        ],
        verification:
          'GGT, ALT, AST, total + direct bilirubin from the P0 draw return inside their reference ranges.',
        evidence: {
          metrics: [
            { id: 'ggt', label: 'GGT', current: '18 U/L (rising trend last 4 draws)', source: 'lab' },
            { id: 'alt', label: 'ALT', current: '24 U/L', source: 'lab' },
            { id: 'ast', label: 'AST', current: '20 U/L', source: 'lab' },
          ],
          studies: [
            { id: 'us-2021-07-04', label: 'Hepatic hemangioma S5 ~12 mm', date: '2021-07-04', vaultAnchor: 'vault-us-2021-07-04' },
            { id: 'ugt1a1-2021-11-26', label: 'UGT1A1 6TA/7TA heterozygous', date: '2021-11-26', vaultAnchor: 'vault-genetic-ugt1a1-2021-11-26' },
          ],
        },
      },
    },
    {
      code: 'P3',
      title: 'Win back sleep from late work blocks',
      statusDot: 'amber',
      whyLine: '5 late-work nights in last 14d · deep sleep down 18%',
      action: {
        code: 'P3',
        title: 'Win back sleep from late work blocks',
        whyParagraph:
          'On nights with work sessions running past 22:00, your next-day deep sleep drops noticeably and HRV balance dips. Employer and project names are intentionally hidden — only the aggregate signal matters.',
        steps: [
          'Hard work stop at 22:00 on at least 4 of 7 nights.',
          'Lights out by 23:30.',
          '10 minutes of morning daylight before screens.',
        ],
        verification:
          'Oura sleep score 7-day average ≥ 78 AND HRV balance back inside the baseline band.',
        evidence: {
          metrics: [
            { id: 'late-work', label: 'Late-work nights last 14d', current: '5', source: 'toggl' },
            { id: 'deep-sleep', label: 'Oura deep sleep (last 7d vs baseline)', current: '−18%', source: 'oura' },
            { id: 'hrv-7d', label: 'HRV 7d trend vs baseline', current: '−9%', source: 'oura' },
          ],
          studies: [],
        },
      },
    },
    {
      code: 'P4',
      title: 'Imaging follow-up — close the hemangioma file',
      statusDot: 'amber',
      whyLine: 'Last hepatobiliary US 2021-07-04 · ~5 years old',
      action: {
        code: 'P4',
        title: 'Imaging follow-up — close the hemangioma file',
        whyParagraph:
          'The 12 mm hemangioma was identified in 2021 and never re-imaged. A repeat abdominal ultrasound in the next 60 days closes the file with a stable-vs-changed answer.',
        steps: [
          'Book a repeat abdominal ultrasound in the next 60 days.',
          'Same lab/operator if possible for clean comparison.',
        ],
        verification:
          'Hemangioma stable (≤ 13 mm) and no new findings → downgrade to a 24-month watch.',
        evidence: {
          metrics: [],
          studies: [
            { id: 'us-2021-07-04', label: 'Hepatic hemangioma S5 ~12 mm', date: '2021-07-04', vaultAnchor: 'vault-us-2021-07-04' },
          ],
        },
      },
    },
  ],
};
