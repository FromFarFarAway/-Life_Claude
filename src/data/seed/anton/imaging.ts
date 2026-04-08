// Imaging + clinical-document seed for Anton. Re-exports the existing
// imagingTimeline from src/data/labs.ts and adds the older 2021 events
// (hepatobiliary US, duodenal probe, EGDs) referenced in the Ver 3 spec.

import { imagingTimeline, type ImagingEvent } from '@/data/labs';

export { imagingTimeline };
export type { ImagingEvent };

export interface ClinicalDocument {
  id: string;
  date: string;
  modality: 'ultrasound' | 'duodenal-probe' | 'egd' | 'genetic';
  region: string;
  finding: string;
  vaultAnchor: string; // anchor inside the Health Vault page
}

export const clinicalDocuments: ClinicalDocument[] = [
  {
    id: 'us-2021-07-04',
    date: '2021-07-04',
    modality: 'ultrasound',
    region: 'Hepatobiliary',
    finding:
      'Hepatic hemangioma S5 ~12 mm; diffuse liver changes; gallbladder deformity (Avicenna+)',
    vaultAnchor: 'vault-us-2021-07-04',
  },
  {
    id: 'duodenal-2021-03-10',
    date: '2021-03-10',
    modality: 'duodenal-probe',
    region: 'Duodenum / bile',
    finding:
      'Giardia present; cholesterol crystals; calcium bilirubinate granules',
    vaultAnchor: 'vault-duodenal-2021-03-10',
  },
  {
    id: 'egd-2021-03-13',
    date: '2021-03-13',
    modality: 'egd',
    region: 'Upper GI',
    finding:
      'Chronic gastritis; reflux; hiatal hernia signs; H. pylori negative',
    vaultAnchor: 'vault-egd-2021-03-13',
  },
  {
    id: 'egd-2021-11-16',
    date: '2021-11-16',
    modality: 'egd',
    region: 'Upper GI',
    finding: 'Chronic gastritis follow-up; H. pylori negative',
    vaultAnchor: 'vault-egd-2021-11-16',
  },
  {
    id: 'egd-2024-01-26',
    date: '2024-01-26',
    modality: 'egd',
    region: 'Upper GI',
    finding: 'Stable chronic gastritis; reflux signs',
    vaultAnchor: 'vault-egd-2024-01-26',
  },
];
