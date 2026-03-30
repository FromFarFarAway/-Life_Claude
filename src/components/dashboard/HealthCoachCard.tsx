'use client';

import { Card } from '@/components/ui/card';
import { useAppState } from '@/lib/context';
import { ProfileCompletenessCTA } from './ProfileCompletenessCTA';

export function HealthCoachCard() {
  const { checklist, questionnaireCompleted, userGoals } = useAppState();

  const coachBody = questionnaireCompleted && userGoals.length > 0
    ? `Based on your goals, the fastest path to better insights is closing your key data gaps. Your checklist is prioritized by impact.`
    : 'The fastest way to improve certainty is to repeat a clean fasting lipid panel, add ApoB and one-time Lp(a), and bring blood pressure / waist / family history into the record.';

  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-2">
        <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Health Coach</h3>
      </div>

      <ProfileCompletenessCTA />

      <p className="text-sm text-gray-400 leading-relaxed">
        {coachBody}
      </p>

      <ol className="space-y-2">
        {checklist.slice(0, 5).map((item, i) => (
          <li key={item.id} className="flex items-start gap-2.5 text-sm">
            <span className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-medium ${
              item.priority === 'critical'
                ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                : item.priority === 'high'
                ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
            }`}>
              {i + 1}
            </span>
            <span className="text-gray-400 leading-relaxed">{item.text}</span>
          </li>
        ))}
      </ol>

      {questionnaireCompleted && userGoals.length > 0 && (
        <div className="pt-3 border-t border-[#2a2a45]">
          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Active Goals</p>
          <div className="flex flex-wrap gap-1.5">
            {userGoals.map((goal) => (
              <span
                key={goal}
                className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
              >
                {goal.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
