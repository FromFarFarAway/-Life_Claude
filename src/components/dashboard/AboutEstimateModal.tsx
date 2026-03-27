'use client';

import { categories, categoryWeights } from '@/data/categories';

interface AboutEstimateModalProps {
  onClose: () => void;
}

export function AboutEstimateModal({ onClose }: AboutEstimateModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#12121e] border border-[#2a2a45] rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">About This Estimate</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-300">
          <div>
            <h4 className="font-medium text-white mb-1">Score Composition</h4>
            <p className="text-gray-400">
              The Health Score is a weighted mean of nine category scores. Each category score combines
              a base assessment (strong/partial/weak data), severity penalties for active issues,
              missing-data penalties, and reassurance bonuses for improving trends.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-white mb-2">Category Weights</h4>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((cat) => (
                <div key={cat.id} className="flex justify-between text-xs py-1 px-2 rounded bg-[#1a1a2e]">
                  <span className="text-gray-400">{cat.label}</span>
                  <span className="text-gray-200 font-medium">{categoryWeights[cat.id]}x</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-1">Coverage vs Severity</h4>
            <p className="text-gray-400">
              Uncertainty (46%) reflects how much of the health picture is unexplored. Categories like
              Cancer Screening (10% coverage) and Cognitive & Longevity (5% coverage) contribute heavily
              to uncertainty. Cardiovascular health has full coverage but a high severity penalty.
            </p>
          </div>

          <div className="pt-2 border-t border-[#2a2a45]">
            <p className="text-xs text-gray-500 italic">
              This is a product score for health intelligence purposes, not a clinical diagnosis or
              medical-device output. Scores are transparent and reproducible from the underlying formula.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
