'use client';

import { questionnaireSteps } from '@/data/questionnaire';
import type { Answers } from '../QuestionnaireFlow';

interface StepProps {
  answers: Answers;
  updateAnswer: (id: string, value: string | string[] | number | boolean | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const step = questionnaireSteps[3];
const goalsQuestion = step.questions[0];

export function GoalsStep({ answers, updateAnswer, onNext, onBack }: StepProps) {
  const selectedGoals = (answers[goalsQuestion.id] as string[]) ?? [];

  const toggleGoal = (value: string) => {
    const updated = selectedGoals.includes(value)
      ? selectedGoals.filter(g => g !== value)
      : [...selectedGoals, value];
    updateAnswer(goalsQuestion.id, updated);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
        <p className="text-sm text-gray-400 mt-1">{step.description}</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">{goalsQuestion.label}</label>
        <p className="text-xs text-gray-500">Select all that apply</p>
        <div className="grid gap-2 mt-2">
          {goalsQuestion.options?.map((opt) => {
            const isSelected = selectedGoals.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggleGoal(opt.value)}
                className={`text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                  isSelected
                    ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300'
                    : 'bg-[#1a1a2e] border-[#2a2a45] text-gray-400 hover:border-gray-500 hover:text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-4 w-4 rounded border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-indigo-600 border-indigo-500' : 'border-gray-600'
                  }`}>
                    {isSelected && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {opt.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between pt-3">
        <button
          onClick={onBack}
          className="px-5 py-2 border border-[#2a2a45] rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={selectedGoals.length === 0}
          className="px-5 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
