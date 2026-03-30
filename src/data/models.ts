// Lightweight data model types for +LIFE Health OS
// These are in-code interfaces — no database required in this release

export type DataSourceType = 'questionnaire' | 'lab' | 'imaging' | 'clinical' | 'wearable' | 'self-report';

export interface QuestionnaireResponse {
  id: string;
  userId: string;
  completedAt: string | null;
  version: string;
  answers: Record<string, QuestionnaireAnswer>;
}

export interface QuestionnaireAnswer {
  questionId: string;
  value: string | string[] | number | boolean | null;
  answeredAt: string;
}

export interface SourceFile {
  id: string;
  fileName: string;
  uploadedAt: string;
  type: 'lab_report' | 'imaging' | 'clinical_note' | 'wearable_export' | 'other';
  parsedAt: string | null;
}

export interface LabResult {
  id: string;
  metricId: string;
  value: number | null;
  unit: string;
  date: string;
  sourceFileId: string | null;
}

export interface ImagingFinding {
  id: string;
  modality: string;
  bodyRegion: string;
  finding: string;
  date: string;
  sourceFileId: string | null;
}

export interface ClinicalEvent {
  id: string;
  type: 'diagnosis' | 'procedure' | 'medication' | 'referral';
  description: string;
  date: string;
}

export interface DeviceConnection {
  id: string;
  deviceType: 'smartwatch' | 'cgm' | 'bp_monitor' | 'sleep_tracker' | 'other';
  connectedAt: string | null;
  lastSyncAt: string | null;
  active: boolean;
}

export interface DeviceMetricsDaily {
  date: string;
  steps: number | null;
  heartRateResting: number | null;
  sleepHours: number | null;
  sleepQuality: number | null;
  hrvMs: number | null;
}

export interface DerivedSegment {
  userId: string;
  ageGroup: '18-29' | '30-39' | '40-49' | '50-59' | '60+';
  sex: 'Male' | 'Female';
  motivationTags: string[];
  riskTags: string[];
  completenessState: CompletenessState;
}

export type CompletenessState =
  | 'none'
  | 'questionnaire-only'
  | 'labs-only'
  | 'mixed-incomplete'
  | 'comprehensive';

export interface DerivedRiskTag {
  id: string;
  categoryId: string;
  tag: string;
  severity: 'high' | 'moderate' | 'low' | 'unknown';
  evidenceBasis: string;
  dataSource: DataSourceType;
}

export interface DerivedScore {
  categoryId: string;
  score: number;
  coverage: number;
  computedAt: string;
  inputs: string[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'blind-spot' | 'category-action' | 'goal-aligned';
  linkedCategoryId: string | null;
  dataSourceNeeded: DataSourceType | null;
  completed: boolean;
}

export interface ChatThread {
  id: string;
  createdAt: string;
  title: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type HealthGoal =
  | 'preventive-optimization'
  | 'longevity'
  | 'heart-risk-management'
  | 'metabolic-control'
  | 'mental-wellness'
  | 'screening-catchup'
  | 'fitness-optimization';

export interface GoalConfig {
  id: HealthGoal;
  label: string;
  description: string;
  relatedCategories: string[];
  coachEmphasis: string;
}
