'use client';

import type { Answers } from '../QuestionnaireFlow';

interface CompletionStepProps {
  answers: Answers;
  onComplete: () => void;
  onBack: () => void;
}

export function CompletionStep({ answers, onComplete, onBack }: CompletionStepProps) {
  const answeredCount = Object.values(answers).filter(v => v != null && v !== '' && !(Array.isArray(v) && v.length === 0)).length;
  const goals = (answers.health_goals as string[]) ?? [];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-white">Profile Complete</h3>
        <p className="text-sm text-gray-400 mt-1">
          Your responses will enhance your health dashboard with personalized priorities and recommendations.
        </p>
      </div>

      <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Questions answered</span>
          <span className="text-white font-medium">{answeredCount}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Health goals selected</span>
          <span className="text-white font-medium">{goals.length}</span>
        </div>
      </div>

      {goals.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Your priorities</p>
          <div className="flex flex-wrap gap-1.5">
            {goals.map((goal) => (
              <span
                key={goal}
                className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
              >
                {goal.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-lg p-3">
        <p className="text-sm text-emerald-400/80">
          Completing your profile will improve your Profile Completeness score and unlock more targeted coaching recommendations.
        </p>
      </div>

      <div className="flex justify-between pt-3">
        <button
          onClick={onBack}
          className="px-5 py-2 border border-[#2a2a45] rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onComplete}
          className="px-5 py-2 bg-emerald-600 rounded-lg text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
        >
          Save & Return to Dashboard
        </button>
      </div>
    </div>
  );
}
