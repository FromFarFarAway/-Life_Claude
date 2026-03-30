'use client';

import { questionnaireSteps } from '@/data/questionnaire';
import type { Answers } from '../QuestionnaireFlow';

interface StepProps {
  answers: Answers;
  updateAnswer: (id: string, value: string | string[] | number | boolean | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const step = questionnaireSteps[4];

export function SymptomsStep({ answers, updateAnswer, onNext, onBack }: StepProps) {
  const toggleMultiSelect = (questionId: string, value: string) => {
    const current = (answers[questionId] as string[]) ?? [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateAnswer(questionId, updated);
  };

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

          {q.type === 'multi-select' && q.options && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {q.options.map((opt) => {
                const selected = ((answers[q.id] as string[]) ?? []).includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleMultiSelect(q.id, opt.value)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      selected
                        ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300'
                        : 'bg-[#1a1a2e] border-[#2a2a45] text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
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
