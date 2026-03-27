interface SnapshotItem {
  label: string;
  value: string | number | null;
  unit: string;
  status?: 'normal' | 'elevated' | 'low' | 'missing';
}

interface LatestSnapshotCardProps {
  items: SnapshotItem[];
  title?: string;
}

export function LatestSnapshotCard({ items, title }: LatestSnapshotCardProps) {
  return (
    <div>
      {title && <p className="text-xs font-medium text-gray-500 mb-2">{title}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-[#12121e] border border-[#2a2a45] rounded-lg px-3 py-2"
          >
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</p>
            <div className="flex items-baseline gap-1 mt-0.5">
              {item.value !== null ? (
                <>
                  <span className={`text-sm font-semibold ${
                    item.status === 'elevated' ? 'text-red-400' :
                    item.status === 'low' ? 'text-amber-400' :
                    'text-white'
                  }`}>
                    {item.value}
                  </span>
                  <span className="text-[10px] text-gray-500">{item.unit}</span>
                </>
              ) : (
                <span className="text-xs text-gray-600 italic">Not measured</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
