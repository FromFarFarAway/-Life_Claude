'use client';

import { useState, useCallback } from 'react';
import { questionnaireSteps } from '@/data/questionnaire';
import { userProfile } from '@/data/profile';
import { useAppState } from '@/lib/context';
import { DemographicsStep } from './steps/DemographicsStep';
import { LifestyleStep } from './steps/LifestyleStep';
import { FamilyHistoryStep } from './steps/FamilyHistoryStep';
import { GoalsStep } from './steps/GoalsStep';
import { SymptomsStep } from './steps/SymptomsStep';
import { CompletionStep } from './steps/CompletionStep';

interface QuestionnaireFlowProps {
  onClose: () => void;
}

export type Answers = Record<string, string | string[] | number | boolean | null>;

// Prefill from known profile data
function getInitialAnswers(): Answers {
  const answers: Answers = {};
  for (const step of questionnaireSteps) {
    for (const q of step.questions) {
      if (q.prefillKey && q.prefillKey in userProfile) {
        answers[q.id] = (userProfile as Record<string, unknown>)[q.prefillKey] as string | number;
      }
    }
  }
  return answers;
}

const STEP_IDS = ['demographics', 'lifestyle', 'family-history', 'goals', 'symptoms', 'completion'] as const;

export function QuestionnaireFlow({ onClose }: QuestionnaireFlowProps) {
  const { completeQuestionnaire } = useAppState();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(getInitialAnswers);

  const updateAnswer = useCallback((questionId: string, value: string | string[] | number | boolean | null) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const goNext = useCallback(() => {
    if (currentStep < STEP_IDS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleComplete = useCallback(() => {
    completeQuestionnaire(answers);
  }, [answers, completeQuestionnaire]);

  const progress = ((currentStep + 1) / STEP_IDS.length) * 100;

  const stepProps = { answers, updateAnswer, onNext: goNext, onBack: goBack };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[90vh] mx-4 bg-[#12121e] border border-[#2a2a45] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a45]">
          <div>
            <h2 className="text-base font-semibold text-white">Health Profile</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Step {currentStep + 1} of {STEP_IDS.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl leading-none p-1 transition-colors"
            aria-label="Close questionnaire"
          >
            &times;
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[#1a1a2e]">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {currentStep === 0 && <DemographicsStep {...stepProps} />}
          {currentStep === 1 && <LifestyleStep {...stepProps} />}
          {currentStep === 2 && <FamilyHistoryStep {...stepProps} />}
          {currentStep === 3 && <GoalsStep {...stepProps} />}
          {currentStep === 4 && <SymptomsStep {...stepProps} />}
          {currentStep === 5 && <CompletionStep answers={answers} onComplete={handleComplete} onBack={goBack} />}
        </div>
      </div>
    </div>
  );
}
