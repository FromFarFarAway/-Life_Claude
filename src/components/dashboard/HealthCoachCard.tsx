import { Card } from '@/components/ui/card';
import { dashboardCopy } from '@/data/profile';

export function HealthCoachCard() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Health Coach</h3>
      </div>
      <p className="text-sm text-gray-400 mb-3 leading-relaxed">
        {dashboardCopy.healthCoachBody}
      </p>
      <ol className="space-y-2">
        {dashboardCopy.healthCoachActions.map((action, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[10px] font-medium text-blue-400">
              {i + 1}
            </span>
            <span className="text-gray-400 leading-relaxed">{action}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
