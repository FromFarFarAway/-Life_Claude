'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { kidneyData } from '@/data/labs';
import { COLORS, formatDate } from '@/lib/format';

const chartData = kidneyData.map((d) => ({
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
  const point = kidneyData.find((d) => formatDate(d.date) === label);
  if (!point) return null;
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-lg p-3 shadow-xl text-xs">
      <p className="font-medium text-white mb-1">{point.date}</p>
      <p><span className="text-blue-400">Creatinine:</span> <span className="text-white">{point.creatinine ?? '—'} umol/L</span></p>
      <p><span className="text-green-400">Urea:</span> <span className="text-white">{point.urea ?? '—'} mmol/L</span></p>
      <p><span className="text-amber-400">Uric Acid:</span> <span className="text-white">{point.uricAcid ?? '—'} umol/L</span></p>
    </div>
  );
}

export function KidneyTrendChart() {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-300 mb-3">Kidney Stability</h4>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e35" />
          <XAxis dataKey="dateLabel" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={{ stroke: '#2a2a45' }} tickLine={false} />
          <YAxis
            tick={{ fontSize: 9, fill: '#64748b' }}
            axisLine={{ stroke: '#2a2a45' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="creatinine" stroke={COLORS.creatinine} strokeWidth={2} dot={{ r: 3, fill: COLORS.creatinine }} name="Creatinine" connectNulls={false} />
          <Line type="monotone" dataKey="urea" stroke={COLORS.urea} strokeWidth={2} dot={{ r: 3, fill: COLORS.urea }} name="Urea" connectNulls={false} />
          <Line type="monotone" dataKey="uricAcid" stroke={COLORS.uricAcid} strokeWidth={2} dot={{ r: 3, fill: COLORS.uricAcid }} name="Uric Acid" connectNulls={false} />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
        Kidney markers show stable filtering context. Creatinine ranges 75–107 umol/L (latest 89), urea 5.7–7.2 mmol/L
        (latest 5.9), uric acid 313–385 umol/L (latest 315). Current kidney state is comparatively reassuring.
      </p>
    </div>
  );
}
