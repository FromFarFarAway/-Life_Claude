'use client';

import { useAppState } from '@/lib/context';

export function ProfileCompletenessCTA() {
  const { questionnaireCompleted, questionnaireDismissed, completeness, setQuestionnaireOpen } = useAppState();

  if (questionnaireCompleted || questionnaireDismissed) return null;

  return (
    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-indigo-300">Complete your profile</span>
        </div>
        <span className="text-xs text-indigo-400 font-medium">{completeness.percentage}%</span>
      </div>

      <div className="h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all"
          style={{ width: `${completeness.percentage}%` }}
        />
      </div>

      <p className="text-xs text-gray-400">
        Answer a few questions about your lifestyle, family history, and goals to unlock personalized recommendations.
      </p>

      <button
        onClick={() => setQuestionnaireOpen(true)}
        className="w-full py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-sm font-medium text-indigo-300 hover:bg-indigo-600/30 transition-colors"
      >
        Improve Profile Completeness
      </button>
    </div>
  );
}
