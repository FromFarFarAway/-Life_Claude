'use client';

import { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo, type ReactNode } from 'react';
import type { HealthGoal, ChecklistItem, CoachPlan, AntonSegment } from '@/data/models';
import { calculateProfileCompleteness, type CompletenessResult } from './completeness';
import { getTopChecklistItems } from './checklist';
import { buildCoachPlan } from './coachPlan';
import { deriveAntonSegment } from './segmentation';

interface QuestionnaireAnswers {
  [questionId: string]: string | string[] | number | boolean | null;
}

interface AppState {
  questionnaireCompleted: boolean;
  questionnaireDismissed: boolean;
  questionnaireAnswers: QuestionnaireAnswers;
  userGoals: HealthGoal[];
  completeness: CompletenessResult;
  checklist: ChecklistItem[];
  questionnaireOpen: boolean;
  // Ver 3 ────────────────────────────────────────────────────────────────
  coachPlan: CoachPlan;
  antonSegment: AntonSegment;
  coachModalOpen: boolean;
  setCoachModalOpen: (open: boolean) => void;
  chatComposerPrefill: string;
  setChatComposerPrefill: (text: string) => void;
  // ──────────────────────────────────────────────────────────────────────
  completeQuestionnaire: (answers: QuestionnaireAnswers) => void;
  dismissQuestionnaire: () => void;
  setQuestionnaireOpen: (open: boolean) => void;
  setUserGoals: (goals: HealthGoal[]) => void;
}

const STORAGE_KEY = 'plus-life-app-state';

interface PersistedState {
  questionnaireCompleted: boolean;
  questionnaireAnswers: QuestionnaireAnswers;
  userGoals: HealthGoal[];
}

function loadPersistedState(): PersistedState | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // Ignore parse errors
  }
  return null;
}

function persistState(state: PersistedState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors
  }
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const persisted = typeof window !== 'undefined' ? loadPersistedState() : null;

  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(persisted?.questionnaireCompleted ?? false);
  const [questionnaireDismissed, setQuestionnaireDismissed] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers>(persisted?.questionnaireAnswers ?? {});
  const [userGoals, setUserGoalsState] = useState<HealthGoal[]>(persisted?.userGoals ?? []);
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);
  const [coachModalOpen, setCoachModalOpen] = useState(false);
  const [chatComposerPrefill, setChatComposerPrefill] = useState('');
  // Persist on changes
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    persistState({ questionnaireCompleted, questionnaireAnswers, userGoals });
  }, [questionnaireCompleted, questionnaireAnswers, userGoals]);

  const completeness = calculateProfileCompleteness(questionnaireCompleted, userGoals);
  const checklist = getTopChecklistItems(userGoals, questionnaireCompleted, 7);

  // Ver 3 — derived once per provider mount; the seed is static so memoizing
  // on [] keeps the brief card and modal in sync without thrashing.
  const coachPlan = useMemo(() => buildCoachPlan(), []);
  const antonSegment = useMemo(() => deriveAntonSegment(), []);

  const completeQuestionnaire = useCallback((answers: QuestionnaireAnswers) => {
    setQuestionnaireAnswers(answers);
    setQuestionnaireCompleted(true);
    setQuestionnaireOpen(false);

    // Extract goals from answers
    const goals = answers.health_goals;
    if (Array.isArray(goals)) {
      setUserGoalsState(goals as HealthGoal[]);
    }
  }, []);

  const dismissQuestionnaire = useCallback(() => {
    setQuestionnaireDismissed(true);
    setQuestionnaireOpen(false);
  }, []);

  const setUserGoals = useCallback((goals: HealthGoal[]) => {
    setUserGoalsState(goals);
  }, []);

  return (
    <AppContext.Provider
      value={{
        questionnaireCompleted,
        questionnaireDismissed,
        questionnaireAnswers,
        userGoals,
        completeness,
        checklist,
        questionnaireOpen,
        coachPlan,
        antonSegment,
        coachModalOpen,
        setCoachModalOpen,
        chatComposerPrefill,
        setChatComposerPrefill,
        completeQuestionnaire,
        dismissQuestionnaire,
        setQuestionnaireOpen,
        setUserGoals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
