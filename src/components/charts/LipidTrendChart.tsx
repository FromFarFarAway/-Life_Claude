'use client';

import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Legend,
} from 'recharts';
import { lipidData } from '@/data/labs';
import { COLORS, formatDate } from '@/lib/format';

const chartData = lipidData.map((d) => ({
  ...d,
  dateLabel: formatDate(d.date),
}));

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number | null; dataKey: string; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;
  const point = lipidData.find((d) => formatDate(d.date) === label);
  if (!point) return null;

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-lg p-3 shadow-xl text-xs">
      <p className="font-medium text-white mb-2">{point.date}</p>
      <div className="space-y-1">
        <p><span className="text-[#8b5cf6]">TC:</span> <span className="text-white">{point.tc ?? '—'} mmol/L</span></p>
        <p><span className="text-[#ef4444]">LDL:</span> <span className="text-white">{point.ldl ?? '—'} mmol/L</span></p>
        <p><span className="text-[#22c55e]">HDL:</span> <span className="text-white">{point.hdl ?? '—'} mmol/L</span></p>
        <p><span className="text-[#f59e0b]">TG:</span> <span className="text-white">{point.tg ?? '—'} mmol/L</span></p>
        <p><span className="text-[#f97316]">Non-HDL:</span> <span className="text-white">{point.nonHdl ?? '—'} mmol/L</span></p>
      </div>
    </div>
  );
}

export function LipidTrendChart() {
  const [showHdl, setShowHdl] = useState(false);
  const [showTg, setShowTg] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-300">Atherogenic Lipids Over Time</h4>
        <div className="flex gap-2">
          <button
            onClick={() => setShowHdl(!showHdl)}
            className={`text-[10px] px-2 py-1 rounded-full border transition-colors ${
              showHdl
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'border-[#2a2a45] text-gray-500 hover:text-gray-300'
            }`}
          >
            HDL
          </button>
          <button
            onClick={() => setShowTg(!showTg)}
            className={`text-[10px] px-2 py-1 rounded-full border transition-colors ${
              showTg
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'border-[#2a2a45] text-gray-500 hover:text-gray-300'
            }`}
          >
            TG
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e35" />
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 10, fill: '#64748b' }}
            axisLine={{ stroke: '#2a2a45' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 9]}
            tick={{ fontSize: 10, fill: '#64748b' }}
            axisLine={{ stroke: '#2a2a45' }}
            tickLine={false}
            label={{ value: 'mmol/L', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#64748b' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="line"
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
          />

          {/* Threshold lines */}
          <ReferenceLine
            y={5.2}
            stroke="#8b5cf6"
            strokeDasharray="4 4"
            strokeOpacity={0.4}
            label={{ value: 'TC desirable <5.2', position: 'right', style: { fontSize: 9, fill: '#8b5cf680' } }}
          />
          <ReferenceLine
            y={3.0}
            stroke="#ef4444"
            strokeDasharray="4 4"
            strokeOpacity={0.4}
            label={{ value: 'LDL optimal <3.0', position: 'right', style: { fontSize: 9, fill: '#ef444480' } }}
          />

          <Line
            type="monotone"
            dataKey="tc"
            stroke={COLORS.tc}
            strokeWidth={2}
            dot={{ r: 3, fill: COLORS.tc }}
            name="Total Cholesterol"
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="ldl"
            stroke={COLORS.ldl}
            strokeWidth={3}
            dot={{ r: 4, fill: COLORS.ldl }}
            name="LDL-C"
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="nonHdl"
            stroke={COLORS.nonHdl}
            strokeWidth={2}
            dot={{ r: 3, fill: COLORS.nonHdl }}
            name="Non-HDL-C"
            connectNulls={false}
          />
          {showHdl && (
            <Line
              type="monotone"
              dataKey="hdl"
              stroke={COLORS.hdl}
              strokeWidth={1.5}
              dot={{ r: 2, fill: COLORS.hdl }}
              name="HDL-C"
              connectNulls={false}
            />
          )}
          {showTg && (
            <Line
              type="monotone"
              dataKey="tg"
              stroke={COLORS.tg}
              strokeWidth={1.5}
              dot={{ r: 2, fill: COLORS.tg }}
              name="Triglycerides"
              connectNulls={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      {/* Accessibility text summary */}
      <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
        Chart shows 11 lipid measurements from Sep 2021 to May 2025. LDL ranges 4.3–6.1 mmol/L,
        consistently above the 3.0 mmol/L optimal threshold. Total cholesterol ranges 5.4–7.5 mmol/L.
        Latest values: TC 7.5, LDL 5.6, HDL 1.7, TG 0.93, Non-HDL 5.8 mmol/L.
      </p>
    </div>
  );
}
