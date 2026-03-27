export interface EvidenceEntry {
  metricId: string;
  displayLabel: string;
  unit: string;
  latestValue: number | string | null;
  latestDate: string | null;
  historicalCount: number;
  sourceNote: string;
  missingnessNote: string | null;
}

export const evidenceEntries: EvidenceEntry[] = [
  // Lipid panel
  { metricId: 'tc', displayLabel: 'Total Cholesterol', unit: 'mmol/L', latestValue: 7.5, latestDate: '2025-05-05', historicalCount: 11, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'ldl', displayLabel: 'LDL Cholesterol', unit: 'mmol/L', latestValue: 5.6, latestDate: '2025-05-05', historicalCount: 11, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'hdl', displayLabel: 'HDL Cholesterol', unit: 'mmol/L', latestValue: 1.7, latestDate: '2025-05-05', historicalCount: 11, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'tg', displayLabel: 'Triglycerides', unit: 'mmol/L', latestValue: 0.93, latestDate: '2025-05-05', historicalCount: 7, sourceNote: 'Bloodwork panel', missingnessNote: 'Not measured in all panels' },
  { metricId: 'nonHdl', displayLabel: 'Non-HDL Cholesterol', unit: 'mmol/L', latestValue: 5.8, latestDate: '2025-05-05', historicalCount: 11, sourceNote: 'Calculated from TC minus HDL', missingnessNote: null },
  { metricId: 'apoB', displayLabel: 'ApoB', unit: 'g/L', latestValue: null, latestDate: null, historicalCount: 0, sourceNote: 'Never measured', missingnessNote: 'Critical for atherogenic particle count — recommended as next measurement' },
  { metricId: 'lpa', displayLabel: 'Lp(a)', unit: 'nmol/L', latestValue: null, latestDate: null, historicalCount: 0, sourceNote: 'Never measured', missingnessNote: 'One-time measurement recommended to rule out genetic risk' },

  // Liver
  { metricId: 'bilT', displayLabel: 'Total Bilirubin', unit: 'umol/L', latestValue: 20.3, latestDate: '2025-05-05', historicalCount: 9, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'bilD', displayLabel: 'Direct Bilirubin', unit: 'umol/L', latestValue: 0.6, latestDate: '2025-05-05', historicalCount: 8, sourceNote: 'Bloodwork panel', missingnessNote: 'One missing data point (2023-10-27)' },
  { metricId: 'alt', displayLabel: 'ALT', unit: 'U/L', latestValue: 24, latestDate: '2025-05-05', historicalCount: 9, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'ast', displayLabel: 'AST', unit: 'U/L', latestValue: 20, latestDate: '2025-05-05', historicalCount: 9, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'ggt', displayLabel: 'GGT', unit: 'U/L', latestValue: 18, latestDate: '2025-05-05', historicalCount: 6, sourceNote: 'Bloodwork panel', missingnessNote: 'Not available before 2023-06' },
  { metricId: 'alp', displayLabel: 'ALP', unit: 'U/L', latestValue: 44, latestDate: '2025-05-05', historicalCount: 6, sourceNote: 'Bloodwork panel', missingnessNote: 'Not available before 2023-06' },

  // Kidney
  { metricId: 'creatinine', displayLabel: 'Creatinine', unit: 'umol/L', latestValue: 89, latestDate: '2025-05-05', historicalCount: 7, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'urea', displayLabel: 'Urea', unit: 'mmol/L', latestValue: 5.9, latestDate: '2025-05-05', historicalCount: 7, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'uricAcid', displayLabel: 'Uric Acid', unit: 'umol/L', latestValue: 315, latestDate: '2025-05-05', historicalCount: 6, sourceNote: 'Bloodwork panel', missingnessNote: 'One missing value (2024-11-27)' },

  // Thyroid
  { metricId: 'tsh', displayLabel: 'TSH', unit: 'mIU/L', latestValue: 2.65, latestDate: '2024-02-29', historicalCount: 1, sourceNote: 'Single measurement', missingnessNote: 'Only one data point available; longitudinal trend unknown' },
  { metricId: 'ft4', displayLabel: 'Free T4', unit: 'pmol/L', latestValue: 16.2, latestDate: '2024-02-29', historicalCount: 1, sourceNote: 'Single measurement', missingnessNote: 'Only one data point available' },

  // Metabolic
  { metricId: 'glucose', displayLabel: 'Glucose', unit: 'mmol/L', latestValue: 5.8, latestDate: '2025-05-05', historicalCount: 7, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'hba1c', displayLabel: 'HbA1c', unit: '%', latestValue: 4.0, latestDate: '2024-02-29', historicalCount: 1, sourceNote: 'Single measurement', missingnessNote: 'Only one data point; repeat recommended' },
  { metricId: 'insulin', displayLabel: 'Insulin', unit: 'uIU/mL', latestValue: 3.6, latestDate: '2023-06-20', historicalCount: 1, sourceNote: 'Single measurement', missingnessNote: 'Only one valid data point' },

  // Immune
  { metricId: 'wbc', displayLabel: 'WBC', unit: '10^9/L', latestValue: 4.1, latestDate: '2025-05-05', historicalCount: 7, sourceNote: 'CBC panel', missingnessNote: null },
  { metricId: 'neutrophils', displayLabel: 'Neutrophils', unit: '10^9/L', latestValue: 1.9, latestDate: '2025-05-05', historicalCount: 7, sourceNote: 'CBC panel', missingnessNote: null },
  { metricId: 'lymphocytes', displayLabel: 'Lymphocytes', unit: '10^9/L', latestValue: 1.5, latestDate: '2025-05-05', historicalCount: 7, sourceNote: 'CBC panel', missingnessNote: null },
  { metricId: 'crp', displayLabel: 'CRP', unit: 'mg/L', latestValue: null, latestDate: null, historicalCount: 0, sourceNote: 'Never measured', missingnessNote: 'Key inflammatory marker — recommended for immune and cardiovascular context' },
  { metricId: 'esr', displayLabel: 'ESR', unit: 'mm/hr', latestValue: 2, latestDate: '2025-05-05', historicalCount: 3, sourceNote: 'Bloodwork panel', missingnessNote: null },

  // Nutrient & Blood
  { metricId: 'hemoglobin', displayLabel: 'Hemoglobin', unit: 'g/L', latestValue: 158, latestDate: '2025-05-05', historicalCount: 7, sourceNote: 'CBC panel', missingnessNote: null },
  { metricId: 'rbc', displayLabel: 'RBC', unit: '10^12/L', latestValue: 5.2, latestDate: '2025-05-05', historicalCount: 7, sourceNote: 'CBC panel', missingnessNote: null },
  { metricId: 'mcv', displayLabel: 'MCV', unit: 'fL', latestValue: 89, latestDate: '2025-05-05', historicalCount: 7, sourceNote: 'CBC panel', missingnessNote: null },
  { metricId: 'iron', displayLabel: 'Iron', unit: 'umol/L', latestValue: 30.5, latestDate: '2025-05-05', historicalCount: 3, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'b12', displayLabel: 'Vitamin B12', unit: 'pg/mL', latestValue: 789, latestDate: '2025-05-05', historicalCount: 2, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'folate', displayLabel: 'Folate', unit: 'ng/mL', latestValue: 8.6, latestDate: '2025-05-05', historicalCount: 2, sourceNote: 'Bloodwork panel', missingnessNote: null },
  { metricId: 'ferritin', displayLabel: 'Ferritin', unit: 'ng/mL', latestValue: null, latestDate: null, historicalCount: 0, sourceNote: 'Never measured', missingnessNote: 'Key iron storage marker — recommended for complete iron assessment' },

  // Missing critical markers
  { metricId: 'bp', displayLabel: 'Blood Pressure', unit: 'mmHg', latestValue: null, latestDate: null, historicalCount: 0, sourceNote: 'Not in uploaded files', missingnessNote: 'Critical for cardiovascular risk assessment' },
  { metricId: 'bmi', displayLabel: 'BMI', unit: 'kg/m2', latestValue: null, latestDate: null, historicalCount: 0, sourceNote: 'Not in uploaded files', missingnessNote: 'Anthropometric data absent from current dataset' },
  { metricId: 'waist', displayLabel: 'Waist Circumference', unit: 'cm', latestValue: null, latestDate: null, historicalCount: 0, sourceNote: 'Not in uploaded files', missingnessNote: 'Metabolic risk context unavailable' },
];
