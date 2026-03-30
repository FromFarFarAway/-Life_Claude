import type { HealthGoal, GoalConfig } from './models';

export type QuestionType = 'confirm' | 'select' | 'multi-select' | 'text' | 'number' | 'boolean';

export interface QuestionDef {
  id: string;
  label: string;
  type: QuestionType;
  options?: { value: string; label: string }[];
  prefillKey?: string; // key in userProfile to prefill from
  required?: boolean;
  helpText?: string;
}

export interface QuestionnaireStep {
  id: string;
  title: string;
  description: string;
  questions: QuestionDef[];
}

export const questionnaireSteps: QuestionnaireStep[] = [
  {
    id: 'demographics',
    title: 'Confirm Your Profile',
    description: 'Let us verify the basics so we can personalize your health insights.',
    questions: [
      { id: 'name', label: 'Full name', type: 'text', prefillKey: 'name', required: true },
      { id: 'age', label: 'Age', type: 'number', prefillKey: 'age', required: true },
      { id: 'sex', label: 'Biological sex', type: 'select', prefillKey: 'sex', required: true, options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
      ]},
      { id: 'residence', label: 'Country of residence', type: 'select', prefillKey: 'residence', options: [
        { value: 'Russia', label: 'Russia' },
        { value: 'Kazakhstan', label: 'Kazakhstan' },
        { value: 'Russia / Kazakhstan', label: 'Russia / Kazakhstan' },
        { value: 'Other', label: 'Other' },
      ]},
    ],
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle & Habits',
    description: 'Understanding your daily habits helps us contextualize your health data.',
    questions: [
      { id: 'smoking', label: 'Smoking status', type: 'select', prefillKey: 'smoking', required: true, options: [
        { value: 'Never smoked', label: 'Never smoked' },
        { value: 'Former smoker', label: 'Former smoker' },
        { value: 'Current smoker', label: 'Current smoker — occasional' },
        { value: 'Current smoker — daily', label: 'Current smoker — daily' },
      ]},
      { id: 'hookah', label: 'Hookah / shisha use', type: 'select', prefillKey: 'hookah', options: [
        { value: 'Never', label: 'Never' },
        { value: 'Once every 3 months', label: 'Once every 3 months or less' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Weekly or more', label: 'Weekly or more' },
      ]},
      { id: 'alcohol', label: 'Alcohol consumption', type: 'select', options: [
        { value: 'none', label: 'None' },
        { value: 'occasional', label: 'Occasional (1-2 drinks/week)' },
        { value: 'moderate', label: 'Moderate (3-7 drinks/week)' },
        { value: 'heavy', label: 'Heavy (8+ drinks/week)' },
      ]},
      { id: 'exercise', label: 'Physical activity level', type: 'select', options: [
        { value: 'sedentary', label: 'Sedentary (minimal activity)' },
        { value: 'light', label: 'Light (1-2 sessions/week)' },
        { value: 'moderate', label: 'Moderate (3-4 sessions/week)' },
        { value: 'active', label: 'Active (5+ sessions/week)' },
        { value: 'athlete', label: 'Athlete / intense training' },
      ]},
      { id: 'sleep', label: 'Average sleep duration', type: 'select', options: [
        { value: 'less-5', label: 'Less than 5 hours' },
        { value: '5-6', label: '5-6 hours' },
        { value: '6-7', label: '6-7 hours' },
        { value: '7-8', label: '7-8 hours' },
        { value: '8+', label: '8+ hours' },
      ]},
      { id: 'stress', label: 'Perceived stress level', type: 'select', options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'very-high', label: 'Very high' },
      ]},
    ],
  },
  {
    id: 'family-history',
    title: 'Family Health History',
    description: 'Family history helps assess inherited risk factors.',
    questions: [
      { id: 'family_cvd', label: 'Family history of cardiovascular disease', type: 'select', options: [
        { value: 'none', label: 'None known' },
        { value: 'distant', label: 'Distant relatives (grandparents, aunts/uncles)' },
        { value: 'first-degree', label: 'First-degree relatives (parents, siblings)' },
        { value: 'early-onset', label: 'Early-onset in first-degree relatives (men <55, women <65)' },
        { value: 'unknown', label: 'Unknown' },
      ]},
      { id: 'family_diabetes', label: 'Family history of diabetes', type: 'select', options: [
        { value: 'none', label: 'None known' },
        { value: 'type2', label: 'Type 2 diabetes in family' },
        { value: 'type1', label: 'Type 1 diabetes in family' },
        { value: 'unknown', label: 'Unknown' },
      ]},
      { id: 'family_cancer', label: 'Family history of cancer', type: 'select', options: [
        { value: 'none', label: 'None known' },
        { value: 'present', label: 'Cancer in family (specify in notes)' },
        { value: 'hereditary', label: 'Hereditary cancer syndrome suspected' },
        { value: 'unknown', label: 'Unknown' },
      ]},
      { id: 'family_thyroid', label: 'Family history of thyroid disease', type: 'select', options: [
        { value: 'none', label: 'None known' },
        { value: 'present', label: 'Thyroid disease in family' },
        { value: 'unknown', label: 'Unknown' },
      ]},
    ],
  },
  {
    id: 'goals',
    title: 'Your Health Goals',
    description: 'Select what matters most to you. This shapes your dashboard priorities.',
    questions: [
      { id: 'health_goals', label: 'What are your primary health goals?', type: 'multi-select', required: true, options: [
        { value: 'preventive-optimization', label: 'Preventive health optimization' },
        { value: 'longevity', label: 'Longevity & healthy aging' },
        { value: 'heart-risk-management', label: 'Heart & cardiovascular risk management' },
        { value: 'metabolic-control', label: 'Metabolic health & weight management' },
        { value: 'mental-wellness', label: 'Mental wellness & stress management' },
        { value: 'screening-catchup', label: 'Catch up on health screenings' },
        { value: 'fitness-optimization', label: 'Fitness & performance optimization' },
      ]},
    ],
  },
  {
    id: 'symptoms',
    title: 'Current Symptoms & Conditions',
    description: 'Help us understand any current health concerns.',
    questions: [
      { id: 'current_conditions', label: 'Any diagnosed conditions?', type: 'multi-select', options: [
        { value: 'hypertension', label: 'Hypertension' },
        { value: 'hyperlipidemia', label: 'Hyperlipidemia / high cholesterol' },
        { value: 'diabetes', label: 'Diabetes (Type 1 or 2)' },
        { value: 'thyroid', label: 'Thyroid disorder' },
        { value: 'liver', label: 'Liver condition' },
        { value: 'kidney', label: 'Kidney condition' },
        { value: 'mental-health', label: 'Anxiety / depression' },
        { value: 'none', label: 'None of the above' },
      ]},
      { id: 'current_medications', label: 'Are you taking any medications?', type: 'select', options: [
        { value: 'none', label: 'No medications' },
        { value: 'statins', label: 'Statins or lipid-lowering' },
        { value: 'bp-meds', label: 'Blood pressure medication' },
        { value: 'thyroid-meds', label: 'Thyroid medication' },
        { value: 'other', label: 'Other medications' },
        { value: 'multiple', label: 'Multiple medications' },
      ]},
      { id: 'recent_symptoms', label: 'Any recent symptoms of concern?', type: 'multi-select', options: [
        { value: 'fatigue', label: 'Persistent fatigue' },
        { value: 'chest-pain', label: 'Chest pain or discomfort' },
        { value: 'shortness-breath', label: 'Shortness of breath' },
        { value: 'weight-change', label: 'Unexplained weight change' },
        { value: 'sleep-issues', label: 'Sleep disturbances' },
        { value: 'mood-changes', label: 'Mood changes' },
        { value: 'none', label: 'None' },
      ]},
    ],
  },
];

export const goalConfigs: GoalConfig[] = [
  {
    id: 'preventive-optimization',
    label: 'Preventive Optimization',
    description: 'Stay ahead of problems before they develop',
    relatedCategories: ['cardiovascular', 'metabolic', 'cancerScreening', 'immune'],
    coachEmphasis: 'Focus on completing all recommended screenings and filling data gaps for comprehensive risk profiling.',
  },
  {
    id: 'longevity',
    label: 'Longevity & Healthy Aging',
    description: 'Optimize for long-term health outcomes',
    relatedCategories: ['cardiovascular', 'metabolic', 'cognitiveLongevity', 'nutrientBlood'],
    coachEmphasis: 'Prioritize biomarkers linked to longevity: inflammatory markers, metabolic health, and cognitive baseline.',
  },
  {
    id: 'heart-risk-management',
    label: 'Heart Risk Management',
    description: 'Actively manage cardiovascular risk factors',
    relatedCategories: ['cardiovascular', 'metabolic'],
    coachEmphasis: 'Your LDL pattern needs structured follow-up. ApoB and Lp(a) are the highest-impact next measurements.',
  },
  {
    id: 'metabolic-control',
    label: 'Metabolic Control',
    description: 'Optimize metabolic markers and body composition',
    relatedCategories: ['metabolic', 'cardiovascular', 'liver'],
    coachEmphasis: 'Add anthropometric data (BMI, waist) and track glucose trends to build a complete metabolic picture.',
  },
  {
    id: 'mental-wellness',
    label: 'Mental Wellness',
    description: 'Support cognitive and emotional health',
    relatedCategories: ['cognitiveLongevity', 'thyroid', 'nutrientBlood'],
    coachEmphasis: 'Cognitive and mental health baselines are currently missing. Consider PHQ/GAD screening and sleep tracking.',
  },
  {
    id: 'screening-catchup',
    label: 'Screening Catch-up',
    description: 'Close gaps in age-appropriate health screenings',
    relatedCategories: ['cancerScreening', 'cardiovascular', 'metabolic'],
    coachEmphasis: 'Cancer screening coverage is at 10%. Age-appropriate screenings should be scheduled as the immediate priority.',
  },
  {
    id: 'fitness-optimization',
    label: 'Fitness & Performance',
    description: 'Optimize physical performance and recovery',
    relatedCategories: ['cardiovascular', 'metabolic', 'nutrientBlood', 'immune'],
    coachEmphasis: 'Your fitness age (33) is favorable. Add wearable data and recovery metrics to build a complete performance picture.',
  },
];

export function getGoalConfig(goalId: HealthGoal): GoalConfig | undefined {
  return goalConfigs.find(g => g.id === goalId);
}

export function getGoalsByCategory(categoryId: string): GoalConfig[] {
  return goalConfigs.filter(g => g.relatedCategories.includes(categoryId));
}
