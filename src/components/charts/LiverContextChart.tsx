'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { liverData } from '@/data/labs';
import { COLORS, formatDate } from '@/lib/format';

const chartData = liverData.map((d) => ({
  ...d,
  dateLabel: formatDate(d.date),
}));

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number | null; dataKey: string }>;
  label?: string;
}

function BilirubinTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload) return null;
  const point = liverData.find((d) => formatDate(d.date) === label);
  if (!point) return null;
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-lg p-3 shadow-xl text-xs">
      <p className="font-medium text-white mb-1">{point.date}</p>
      <p><span className="text-amber-400">Total Bil:</span> <span className="text-white">{point.bilT ?? '—'} umol/L</span></p>
      <p><span className="text-orange-400">Direct Bil:</span> <span className="text-white">{point.bilD ?? '—'} umol/L</span></p>
    </div>
  );
}

function EnzymeTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload) return null;
  const point = liverData.find((d) => formatDate(d.date) === label);
  if (!point) return null;
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-lg p-3 shadow-xl text-xs">
      <p className="font-medium text-white mb-1">{point.date}</p>
      <p><span className="text-red-400">ALT:</span> <span className="text-white">{point.alt ?? '—'} U/L</span></p>
      <p><span className="text-orange-400">AST:</span> <span className="text-white">{point.ast ?? '—'} U/L</span></p>
      <p><span className="text-violet-400">GGT:</span> <span className="text-white">{point.ggt ?? '—'} U/L</span></p>
      <p><span className="text-indigo-400">ALP:</span> <span className="text-white">{point.alp ?? '—'} U/L</span></p>
    </div>
  );
}

export function LiverContextChart() {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-300 mb-3">Bilirubin & Liver Enzymes Over Time</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bilirubin panel */}
        <div>
          <p className="text-xs text-gray-500 mb-2 font-medium">Bilirubin (umol/L)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e35" />
              <XAxis dataKey="dateLabel" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={{ stroke: '#2a2a45' }} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={{ stroke: '#2a2a45' }} tickLine={false} />
              <Tooltip content={<BilirubinTooltip />} />
              <Line type="monotone" dataKey="bilT" stroke={COLORS.bilirubinTotal} strokeWidth={2} dot={{ r: 3 }} name="Total Bilirubin" connectNulls={false} />
              <Line type="monotone" dataKey="bilD" stroke={COLORS.bilirubinDirect} strokeWidth={1.5} dot={{ r: 2 }} name="Direct Bilirubin" connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Enzyme panel */}
        <div>
          <p className="text-xs text-gray-500 mb-2 font-medium">Enzymes (U/L)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e35" />
              <XAxis dataKey="dateLabel" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={{ stroke: '#2a2a45' }} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={{ stroke: '#2a2a45' }} tickLine={false} />
              <Tooltip content={<EnzymeTooltip />} />
              <Line type="monotone" dataKey="alt" stroke={COLORS.alt} strokeWidth={2} dot={{ r: 3 }} name="ALT" connectNulls={false} />
              <Line type="monotone" dataKey="ast" stroke={COLORS.ast} strokeWidth={1.5} dot={{ r: 2 }} name="AST" connectNulls={false} />
              <Line type="monotone" dataKey="ggt" stroke={COLORS.ggt} strokeWidth={1.5} dot={{ r: 2 }} name="GGT" connectNulls={false} />
              <Line type="monotone" dataKey="alp" stroke={COLORS.alp} strokeWidth={1.5} dot={{ r: 2 }} name="ALP" connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
        Bilirubin ranges 8.6–29.6 umol/L with notable variability. Liver enzymes remain mostly within or near normal
        ranges. Latest: ALT 24, AST 20, GGT 18, ALP 44 U/L. GGT and ALP data available from Jun 2023 onward.
      </p>
    </div>
  );
}
