'use client';

import { useEffect } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { IntegralScoreCard } from '@/components/dashboard/IntegralScoreCard';
import { UserProfileCard } from '@/components/dashboard/UserProfileCard';
import { MainProblemCard } from '@/components/dashboard/MainProblemCard';
import { RisksCard } from '@/components/dashboard/RisksCard';
import { HealthCoachCard } from '@/components/dashboard/HealthCoachCard';
import { HealthCoachModal } from '@/components/dashboard/HealthCoachModal';
import { PlanScopedChat } from '@/components/dashboard/PlanScopedChat';
import { HeartHealthContent } from '@/components/sections/HeartHealthContent';
import { LiverHealthContent } from '@/components/sections/LiverHealthContent';
import { KidneyHealthContent } from '@/components/sections/KidneyHealthContent';
import { ThyroidHormonalContent } from '@/components/sections/ThyroidHormonalContent';
import { MetabolicHealthContent } from '@/components/sections/MetabolicHealthContent';
import { ImmuneHealthContent } from '@/components/sections/ImmuneHealthContent';
import { NutrientBloodHealthContent } from '@/components/sections/NutrientBloodHealthContent';
import { CancerScreeningContent } from '@/components/sections/CancerScreeningContent';
import { CognitiveLongevityContent } from '@/components/sections/CognitiveLongevityContent';
import { QuestionnaireFlow } from '@/components/questionnaire/QuestionnaireFlow';
import { validateScoringIntegrity } from '@/lib/scoring';
import { useAppState } from '@/lib/context';

export default function Home() {
  const { questionnaireOpen, dismissQuestionnaire } = useAppState();

  useEffect(() => {
    validateScoringIntegrity();
  }, []);

  return (
    <div className="min-h-screen bg-atmospheric">
      <TopNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Flagship card */}
          <div className="lg:col-span-5">
            <IntegralScoreCard />
          </div>

          {/* Right: Supporting cards */}
          <div className="lg:col-span-7 space-y-4">
            <UserProfileCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MainProblemCard />
              <RisksCard />
            </div>
            <HealthCoachCard />
            <PlanScopedChat />
          </div>
        </div>

        {/* Category sections */}
        <div className="space-y-6">
          <HeartHealthContent />
          <LiverHealthContent />
          <KidneyHealthContent />
          <ThyroidHormonalContent />
          <MetabolicHealthContent />
          <ImmuneHealthContent />
          <NutrientBloodHealthContent />
          <CancerScreeningContent />
          <CognitiveLongevityContent />
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-[#2a2a45]">
          <p className="text-xs text-gray-600">
            +LIFE Health OS &middot; Personal health intelligence prototype &middot; Scores are transparent product logic, not clinical decision support
          </p>
        </footer>
      </main>

      {/* Health Coach full-plan modal */}
      <HealthCoachModal />

      {/* Questionnaire modal */}
      {questionnaireOpen && (
        <QuestionnaireFlow onClose={dismissQuestionnaire} />
      )}
    </div>
  );
}
