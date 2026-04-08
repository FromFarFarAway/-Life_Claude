// Anton profile + questionnaire seed answers used by Ver 3 derivation.
// Re-exports the canonical userProfile from src/data/profile.ts and adds the
// questionnaire responses that drive the L/R/B/D/M segmentation.

import { userProfile } from '@/data/profile';
import type { HealthGoal } from '@/data/models';

export const antonProfile = userProfile;

export interface AntonQuestionnaireSeed {
  goals: HealthGoal[];
  sleepRange: '<6h' | '6-8h' | '>8h';
  devices: ('oura' | 'garmin' | 'cgm' | 'bp' | 'none')[];
  diet: 'omnivore' | 'mediterranean' | 'low-carb' | 'vegetarian' | 'none';
  diagnosedConditions: string[];
  familyHistory: 'none' | 'unknown' | 'cvd' | 'cancer' | 'metabolic';
  lastCheckup: '<6mo' | '6-12mo' | '1-3yr' | '>3yr';
  alcoholOccasionsPerWeek: number;
  sweetIntake: 'low' | 'moderate' | 'high';
}

export const antonQuestionnaireSeed: AntonQuestionnaireSeed = {
  goals: ['longevity', 'screening-catchup', 'heart-risk-management'],
  sleepRange: '6-8h',
  devices: ['oura', 'garmin'],
  diet: 'none',
  diagnosedConditions: [],
  familyHistory: 'unknown',
  lastCheckup: '1-3yr',
  alcoholOccasionsPerWeek: 1,
  sweetIntake: 'high',
};
