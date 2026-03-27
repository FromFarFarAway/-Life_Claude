import { cn, getStateBgColor, getStateColor, getStateLabel } from '@/lib/format';
import type { CategoryState } from '@/data/categories';

interface BadgeProps {
  state: CategoryState;
  className?: string;
}

export function StateBadge({ state, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        getStateBgColor(state),
        getStateColor(state),
        className
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          state === 'high-priority' && 'bg-red-400',
          state === 'watchlist' && 'bg-amber-400',
          state === 'reassuring' && 'bg-emerald-400',
          state === 'moderate' && 'bg-amber-400',
          state === 'partial' && 'bg-blue-400',
          state === 'sparse' && 'bg-gray-400',
          state === 'under-covered' && 'bg-gray-500'
        )}
        aria-hidden="true"
      />
      {getStateLabel(state)}
    </span>
  );
}
