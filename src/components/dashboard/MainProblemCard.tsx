import { Card } from '@/components/ui/card';
import { dashboardCopy } from '@/data/profile';

export function MainProblemCard() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-red-400" aria-hidden="true" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Primary Signal</h3>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">
        {dashboardCopy.mainProblemBody}
      </p>
    </Card>
  );
}
