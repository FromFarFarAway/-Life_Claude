import { Card } from '@/components/ui/card';
import { dashboardCopy } from '@/data/profile';

export function RisksCard() {
  return (
    <Card>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-3">
        Risk Context
      </h3>
      <ul className="space-y-2.5">
        {dashboardCopy.risks.map((risk, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <span
              className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                risk.severity === 'high'
                  ? 'bg-red-400'
                  : risk.severity === 'moderate'
                  ? 'bg-amber-400'
                  : 'bg-gray-400'
              }`}
              aria-hidden="true"
            />
            <span className="text-gray-400 leading-relaxed">{risk.text}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-600 mt-3 leading-relaxed">
        {dashboardCopy.risksBody}
      </p>
    </Card>
  );
}
