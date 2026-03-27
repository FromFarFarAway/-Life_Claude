interface CoverageMeterProps {
  coverage: number;
  label?: string;
}

export function CoverageMeter({ coverage, label }: CoverageMeterProps) {
  const percentage = Math.round(coverage * 100);

  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">{label}</span>
          <span className="text-gray-300 font-medium">{percentage}%</span>
        </div>
      )}
      <div className="h-2 rounded-full bg-[#1a1a2e] overflow-hidden" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label={`${label ?? 'Coverage'}: ${percentage}%`}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: percentage >= 70
              ? 'linear-gradient(90deg, #22c55e, #10b981)'
              : percentage >= 40
              ? 'linear-gradient(90deg, #3b82f6, #6366f1)'
              : 'linear-gradient(90deg, #64748b, #475569)',
          }}
        />
      </div>
    </div>
  );
}
