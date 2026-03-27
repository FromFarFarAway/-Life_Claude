import { CoverageMeter } from '@/components/charts/CoverageMeter';

interface CoverageStateCardProps {
  coverage: number;
  message: string;
}

export function CoverageStateCard({ coverage, message }: CoverageStateCardProps) {
  return (
    <div className="bg-[#12121e] border border-[#2a2a45] rounded-lg p-4 space-y-3">
      <CoverageMeter coverage={coverage} label="Coverage" />
      <div className="flex items-start gap-2">
        <svg className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs text-gray-500 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
