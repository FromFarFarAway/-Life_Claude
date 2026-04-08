// Re-export the canonical longitudinal labs and add a typed staleness index
// per panel so the Derived layer can compute bloodworkStalenessDays without
// reaching into individual files.

import {
  lipidData,
  liverData,
  metabolicData,
  kidneyData,
  type LipidPoint,
  type LiverPoint,
  type MetabolicPoint,
  type KidneyPoint,
} from '@/data/labs';

export { lipidData, liverData, metabolicData, kidneyData };
export type { LipidPoint, LiverPoint, MetabolicPoint, KidneyPoint };

export type PanelKey = 'lipid' | 'liver' | 'metabolic' | 'kidney';

export interface BloodworkPanelMeta {
  key: PanelKey;
  label: string;
  lastDrawDate: string;
  panelStalenessDays: number;
}

// Today is held constant from the session context (2026-04-08) so the demo is
// deterministic and the staleness numbers don't drift between renders.
export const SEED_TODAY = '2026-04-08';

function daysSince(dateStr: string, today: string = SEED_TODAY): number {
  const d1 = new Date(dateStr).getTime();
  const d2 = new Date(today).getTime();
  return Math.max(0, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
}

function lastDate<T extends { date: string }>(rows: T[]): string {
  return rows.reduce((acc, r) => (r.date > acc ? r.date : acc), rows[0].date);
}

const lipidLast = lastDate(lipidData);
const liverLast = lastDate(liverData);
const metabolicLast = lastDate(metabolicData);
const kidneyLast = lastDate(kidneyData);

export const bloodworkPanels: BloodworkPanelMeta[] = [
  {
    key: 'lipid',
    label: 'Lipid panel',
    lastDrawDate: lipidLast,
    panelStalenessDays: daysSince(lipidLast),
  },
  {
    key: 'liver',
    label: 'Liver panel (ALT/AST/GGT/bilirubin)',
    lastDrawDate: liverLast,
    panelStalenessDays: daysSince(liverLast),
  },
  {
    key: 'metabolic',
    label: 'Metabolic (glucose/insulin/HbA1c)',
    lastDrawDate: metabolicLast,
    panelStalenessDays: daysSince(metabolicLast),
  },
  {
    key: 'kidney',
    label: 'Kidney (creatinine/urea/uric acid)',
    lastDrawDate: kidneyLast,
    panelStalenessDays: daysSince(kidneyLast),
  },
];

export const oldestPanelStalenessDays: number = bloodworkPanels.reduce(
  (acc, p) => Math.max(acc, p.panelStalenessDays),
  0
);
