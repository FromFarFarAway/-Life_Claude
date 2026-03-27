export type CategoryState = 'high-priority' | 'watchlist' | 'reassuring' | 'sparse' | 'moderate' | 'partial' | 'under-covered';

export interface CategoryConfig {
  id: string;
  label: string;
  score: number;
  coverage: number;
  state: CategoryState;
  reason: string;
  anchorId: string;
}

export const categories: CategoryConfig[] = [
  {
    id: 'cardiovascular',
    label: 'Heart Health',
    score: 42,
    coverage: 1.0,
    state: 'high-priority',
    reason: 'Repeated LDL 4.8\u20136.1 mmol/L; latest LDL 5.6 and total cholesterol 7.5',
    anchorId: 'heart-health',
  },
  {
    id: 'liver',
    label: 'Liver Health',
    score: 63,
    coverage: 0.9,
    state: 'watchlist',
    reason: 'Labs mostly modest; imaging later shows hemangioma + sludge / deformity',
    anchorId: 'liver-health',
  },
  {
    id: 'kidney',
    label: 'Kidney Health',
    score: 78,
    coverage: 0.8,
    state: 'reassuring',
    reason: 'Creatinine 89, urea 5.9, uric acid 315, ultrasound largely normal',
    anchorId: 'kidney-health',
  },
  {
    id: 'thyroid',
    label: 'Thyroid & Hormonal',
    score: 62,
    coverage: 0.4,
    state: 'sparse',
    reason: 'Single TSH 2.65 and free T4 16.2 do not suggest obvious hypothyroidism',
    anchorId: 'thyroid-hormonal',
  },
  {
    id: 'metabolic',
    label: 'Metabolic Health',
    score: 61,
    coverage: 0.7,
    state: 'moderate',
    reason: 'Glucose mostly normal to borderline; HbA1c 4.0; TG low-normal',
    anchorId: 'metabolic-health',
  },
  {
    id: 'immune',
    label: 'Immune Health',
    score: 63,
    coverage: 0.3,
    state: 'partial',
    reason: 'CBC history exists, but CRP / richer immune markers absent',
    anchorId: 'immune-health',
  },
  {
    id: 'nutrientBlood',
    label: 'Nutrient & Blood',
    score: 69,
    coverage: 0.5,
    state: 'partial',
    reason: 'CBC + iron/B12/folate available, ferritin absent',
    anchorId: 'nutrient-blood',
  },
  {
    id: 'cancerScreening',
    label: 'Cancer Screening',
    score: 34,
    coverage: 0.1,
    state: 'under-covered',
    reason: 'Almost no dedicated screening evidence in the uploaded files',
    anchorId: 'cancer-screening',
  },
  {
    id: 'cognitiveLongevity',
    label: 'Cognitive & Longevity',
    score: 31,
    coverage: 0.05,
    state: 'under-covered',
    reason: 'No direct cognitive, PHQ/GAD, sleep-device, or longevity dataset in scope',
    anchorId: 'cognitive-longevity',
  },
];

export const categoryWeights: Record<string, number> = {
  cardiovascular: 1.8,
  liver: 1.2,
  kidney: 1.0,
  thyroid: 1.0,
  metabolic: 1.3,
  immune: 0.8,
  nutrientBlood: 1.0,
  cancerScreening: 1.2,
  cognitiveLongevity: 1.0,
};

export const SEEDED_OVERALL_SCORE = 56;
export const SEEDED_BLIND_SPOTS_EXPLORED = 54;
export const SEEDED_UNCERTAINTY = 46;
