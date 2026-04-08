// Single import surface for the Anton seed bundle.
export { antonProfile, antonQuestionnaireSeed } from './profile';
export type { AntonQuestionnaireSeed } from './profile';
export {
  lipidData,
  liverData,
  metabolicData,
  kidneyData,
  bloodworkPanels,
  oldestPanelStalenessDays,
  SEED_TODAY,
} from './labs';
export type { BloodworkPanelMeta, PanelKey } from './labs';
export { imagingTimeline, clinicalDocuments } from './imaging';
export type { ImagingEvent, ClinicalDocument } from './imaging';
export { geneticVariants, diabetesRiskVariants } from './genetics';
export type { GeneticVariant } from './genetics';
export { ouraDaily } from './oura_daily';
export type { OuraDaily } from './oura_daily';
export { garminDaily } from './garmin_daily';
export type { GarminDaily } from './garmin_daily';
export { togglDerived } from './toggl_derived';
export type { TogglDerived } from './toggl_derived';
export { frozenCoachPlan } from './coach_plan';
