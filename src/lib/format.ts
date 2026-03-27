import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateFull(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const COLORS = {
  ldl: '#ef4444',
  tc: '#8b5cf6',
  hdl: '#22c55e',
  tg: '#f59e0b',
  nonHdl: '#f97316',
  ai: '#3b82f6',
  indigo: '#6366f1',
  cyan: '#06b6d4',
  bilirubinTotal: '#f59e0b',
  bilirubinDirect: '#fb923c',
  alt: '#ef4444',
  ast: '#f97316',
  ggt: '#8b5cf6',
  alp: '#6366f1',
  glucose: '#3b82f6',
  hba1c: '#06b6d4',
  creatinine: '#3b82f6',
  urea: '#22c55e',
  uricAcid: '#f59e0b',
  hemoglobin: '#ef4444',
  rbc: '#f97316',
  mcv: '#8b5cf6',
  wbc: '#3b82f6',
  neutrophils: '#f97316',
  lymphocytes: '#22c55e',
} as const;

export function getStateColor(state: string): string {
  switch (state) {
    case 'high-priority':
      return 'text-red-400';
    case 'watchlist':
      return 'text-amber-400';
    case 'reassuring':
      return 'text-emerald-400';
    case 'moderate':
      return 'text-amber-400';
    case 'partial':
      return 'text-blue-400';
    case 'sparse':
      return 'text-gray-400';
    case 'under-covered':
      return 'text-gray-500';
    default:
      return 'text-gray-400';
  }
}

export function getStateBgColor(state: string): string {
  switch (state) {
    case 'high-priority':
      return 'bg-red-500/10 border-red-500/20';
    case 'watchlist':
      return 'bg-amber-500/10 border-amber-500/20';
    case 'reassuring':
      return 'bg-emerald-500/10 border-emerald-500/20';
    case 'moderate':
      return 'bg-amber-500/10 border-amber-500/20';
    case 'partial':
      return 'bg-blue-500/10 border-blue-500/20';
    case 'sparse':
      return 'bg-gray-500/10 border-gray-500/20';
    case 'under-covered':
      return 'bg-gray-500/10 border-gray-500/20';
    default:
      return 'bg-gray-500/10 border-gray-500/20';
  }
}

export function getStateLabel(state: string): string {
  switch (state) {
    case 'high-priority':
      return 'High Priority';
    case 'watchlist':
      return 'Watchlist';
    case 'reassuring':
      return 'Reassuring';
    case 'moderate':
      return 'Moderate Priority';
    case 'partial':
      return 'Partial Data';
    case 'sparse':
      return 'Sparse Data';
    case 'under-covered':
      return 'Under-covered';
    default:
      return state;
  }
}
