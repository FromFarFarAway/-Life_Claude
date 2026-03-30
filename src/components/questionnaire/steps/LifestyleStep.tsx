'use client';

import { questionnaireSteps } from '@/data/questionnaire';
import type { Answers } from '../QuestionnaireFlow';

interface StepProps {
  answers: Answers;
  updateAnswer: (id: string, value: string | string[] | number | boolean | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const step = questionnaireSteps[1];

export function LifestyleStep({ answers, updateAnswer, onNext, onBack }: StepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
        <p className="text-sm text-gray-400 mt-1">{step.description}</p>
      </div>

      {step.questions.map((q) => (
        <div key={q.id} className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">{q.label}</label>
          {q.type === 'select' && q.options && (
            <select
              value={(answers[q.id] as string) ?? ''}
              onChange={(e) => updateAnswer(q.id, e.target.value)}
              className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50"
            >
              <option value="">Select...</option>
              {q.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
          {q.prefillKey && answers[q.id] != null && answers[q.id] !== '' && (
            <p className="text-[10px] text-emerald-400/70">Pre-filled from your profile</p>
          )}
        </div>
      ))}

      <div className="flex justify-between pt-3">
        <button
          onClick={onBack}
          className="px-5 py-2 border border-[#2a2a45] rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-5 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
