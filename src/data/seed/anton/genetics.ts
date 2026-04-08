// Genetic seed — Anton's UGT1A1 result and the adverse-condition flags it
// raises. Used by the coach to gate Liver / fasting / alcohol guidance.

export interface GeneticVariant {
  id: string;
  gene: string;
  reportDate: string;
  result: string;
  zygosity: 'heterozygous' | 'homozygous' | 'wild-type';
  adverseConditionFlags: string[];
  vaultAnchor: string;
  note: string;
}

export const geneticVariants: GeneticVariant[] = [
  {
    id: 'ugt1a1-2021-11-26',
    gene: 'UGT1A1',
    reportDate: '2021-11-26',
    result: 'UGT1A1 6TA/7TA',
    zygosity: 'heterozygous',
    adverseConditionFlags: ['fasted-training', 'long-fast', 'alcohol'],
    vaultAnchor: 'vault-genetic-ugt1a1-2021-11-26',
    note:
      'Heterozygous carrier; Gilbert syndrome not molecularly confirmed but adverse-condition flags apply.',
  },
];

// No diabetes-risk variants reported — used by the chat reassurance flow.
export const diabetesRiskVariants: string[] = [];
