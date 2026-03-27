'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { metabolicData } from '@/data/labs';
import { COLORS, formatDate } from '@/lib/format';

const chartData = metabolicData.map((d) => ({
  ...d,
  dateLabel: formatDate(d.date),
}));

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number | null }>;
  label?: string;
}

function CustomTooltip({ active, label }: TooltipProps) {
  if (!active) return null;
  const point = metabolicData.find((d) => formatDate(d.date) === label);
  if (!point) return null;
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-lg p-3 shadow-xl text-xs">
      <p className="font-medium text-white mb-1">{point.date}</p>
      <p><span className="text-blue-400">Glucose:</span> <span className="text-white">{point.glucose ?? '—'} mmol/L</span></p>
      <p><span className="text-cyan-400">HbA1c:</span> <span className="text-white">{point.hba1c ?? '—'}%</span></p>
      <p><span className="text-amber-400">Insulin:</span> <span className="text-white">{point.insulin ?? '—'} uIU/mL</span></p>
    </div>
  );
}

export function MetabolicContextChart() {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-300 mb-3">Glucose-Metabolic Context</h4>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e35" />
          <XAxis dataKey="dateLabel" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={{ stroke: '#2a2a45' }} tickLine={false} />
          <YAxis
            tick={{ fontSize: 9, fill: '#64748b' }}
            axisLine={{ stroke: '#2a2a45' }}
            tickLine={false}
            label={{ value: 'mmol/L', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#64748b' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={5.6}
            stroke="#f59e0b"
            strokeDasharray="4 4"
            strokeOpacity={0.4}
            label={{ value: 'Pre-diabetes threshold', position: 'right', style: { fontSize: 9, fill: '#f59e0b80' } }}
          />
          <Line type="monotone" dataKey="glucose" stroke={COLORS.glucose} strokeWidth={2} dot={{ r: 3, fill: COLORS.glucose }} name="Glucose" connectNulls={false} />
          <Line type="monotone" dataKey="hba1c" stroke={COLORS.hba1c} strokeWidth={2} dot={{ r: 4, fill: COLORS.hba1c, strokeWidth: 2, stroke: '#0a0a0f' }} name="HbA1c" connectNulls={false} />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
        Glucose ranges 4.5–5.8 mmol/L, mostly within normal limits. Single HbA1c of 4.0% (Feb 2024) is reassuring.
        Single insulin measurement of 3.6 uIU/mL. Dysmetabolism is not the dominant signal in this dataset.
      </p>
    </div>
  );
}
