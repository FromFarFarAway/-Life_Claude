import { Card } from '@/components/ui/card';
import { userProfile } from '@/data/profile';

export function UserProfileCard() {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white">
          {userProfile.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h3 className="font-semibold text-white">{userProfile.name}</h3>
          <div className="flex gap-2 mt-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1a1a2e] border border-[#2a2a45] text-gray-400">
              {userProfile.sex}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1a1a2e] border border-[#2a2a45] text-gray-400">
              Age {userProfile.age}
            </span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        <span className="text-gray-400 font-medium">Data scope:</span>{' '}
        {userProfile.dataWindow}
      </div>

      <div className="text-xs text-amber-400/80 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
        Dominant signal: {userProfile.dominantSignal}
      </div>
    </Card>
  );
}
