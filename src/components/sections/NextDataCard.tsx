interface NextDataCardProps {
  title?: string;
  items: string[];
}

export function NextDataCard({ title = 'Most useful next data to add', items }: NextDataCardProps) {
  return (
    <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4">
      <p className="text-xs font-medium text-blue-400 uppercase tracking-wider mb-2">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="text-blue-500/60 mt-0.5" aria-hidden="true">+</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
