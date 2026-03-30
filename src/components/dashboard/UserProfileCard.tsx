'use client';

import { Card } from '@/components/ui/card';
import { userProfile } from '@/data/profile';
import { useAppState } from '@/lib/context';

export function UserProfileCard() {
  const { completeness, questionnaireCompleted } = useAppState();

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white">
          {userProfile.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white">{userProfile.name}</h3>
            {questionnaireCompleted && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                Profile Complete
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1a1a2e] border border-[#2a2a45] text-gray-400">
              {userProfile.sex}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1a1a2e] border border-[#2a2a45] text-gray-400">
              Age {userProfile.age}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1a1a2e] border border-[#2a2a45] text-gray-400">
              Fitness age {userProfile.fitnessAge}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1a1a2e] border border-[#2a2a45] text-gray-400">
              {userProfile.residence}
            </span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        <span className="text-gray-400 font-medium">Data scope:</span>{' '}
        {userProfile.dataWindow}
      </div>

      {/* Profile completeness bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wider text-gray-500">Profile Completeness</span>
            <span className="text-[10px] font-medium text-gray-400">{completeness.percentage}%</span>
          </div>
          <div className="h-1 bg-[#1a1a2e] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                completeness.percentage >= 70 ? 'bg-emerald-500' : completeness.percentage >= 40 ? 'bg-blue-500' : 'bg-gray-500'
              }`}
              style={{ width: `${completeness.percentage}%` }}
            />
          </div>
        </div>
        <div className="flex gap-1">
          {completeness.dataSources.labs && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">Labs</span>
          )}
          {completeness.dataSources.imaging && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">Imaging</span>
          )}
          {completeness.dataSources.questionnaire && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Profile</span>
          )}
        </div>
      </div>

      <div className="text-xs text-amber-400/80 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
        Dominant signal: {userProfile.dominantSignal}
      </div>
    </Card>
  );
}
