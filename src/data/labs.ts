export interface LipidPoint {
  date: string;
  tc: number | null;
  ldl: number | null;
  hdl: number | null;
  tg: number | null;
  nonHdl: number | null;
}

export interface LiverPoint {
  date: string;
  bilT: number | null;
  bilD: number | null;
  alt: number | null;
  ast: number | null;
  ggt: number | null;
  alp: number | null;
}

export interface MetabolicPoint {
  date: string;
  glucose: number | null;
  insulin: number | null;
  hba1c: number | null;
  hdl: number | null;
}

export interface KidneyPoint {
  date: string;
  creatinine: number | null;
  urea: number | null;
  uricAcid: number | null;
}

export interface ImagingEvent {
  date: string;
  study: string;
  summary: string;
}

export const lipidData: LipidPoint[] = [
  { date: '2021-09-18', tc: 6.8, ldl: 4.8, hdl: 1.5, tg: 1.66, nonHdl: 5.3 },
  { date: '2022-05-06', tc: 6.9, ldl: 5.5, hdl: 1.4, tg: 1.10, nonHdl: 5.5 },
  { date: '2023-05-05', tc: 6.18, ldl: 4.5, hdl: 1.2, tg: null, nonHdl: 4.98 },
  { date: '2023-06-20', tc: 6.1, ldl: 5.1, hdl: 1.7, tg: null, nonHdl: 4.4 },
  { date: '2023-08-07', tc: 5.4, ldl: 4.3, hdl: 1.4, tg: null, nonHdl: 4.0 },
  { date: '2023-10-27', tc: 5.8, ldl: 4.8, hdl: 1.3, tg: 1.24, nonHdl: 4.5 },
  { date: '2024-01-25', tc: 6.3, ldl: 5.1, hdl: 1.3, tg: null, nonHdl: 5.0 },
  { date: '2024-02-29', tc: 7.4, ldl: 6.1, hdl: 1.5, tg: 1.31, nonHdl: 5.9 },
  { date: '2024-09-02', tc: 7.3, ldl: 5.6, hdl: 1.4, tg: 0.97, nonHdl: 5.9 },
  { date: '2024-11-27', tc: 6.9, ldl: 5.1, hdl: 1.6, tg: 0.97, nonHdl: 5.3 },
  { date: '2025-05-05', tc: 7.5, ldl: 5.6, hdl: 1.7, tg: 0.93, nonHdl: 5.8 },
];

export const liverData: LiverPoint[] = [
  { date: '2021-12-07', bilT: 22.9, bilD: 2.0, alt: 34, ast: 23, ggt: null, alp: null },
  { date: '2022-02-22', bilT: 29.6, bilD: 10.8, alt: 29.1, ast: 16.4, ggt: null, alp: null },
  { date: '2023-05-05', bilT: 28.0, bilD: 9.7, alt: 29, ast: 19, ggt: null, alp: null },
  { date: '2023-06-20', bilT: 25.3, bilD: 1.9, alt: 28, ast: 23, ggt: 19, alp: 53 },
  { date: '2023-10-27', bilT: 15.5, bilD: null, alt: 36, ast: 24, ggt: 24, alp: 47 },
  { date: '2024-01-25', bilT: 8.6, bilD: 1.8, alt: 30, ast: 28, ggt: 19, alp: 51 },
  { date: '2024-02-29', bilT: 17.6, bilD: 1.3, alt: 23, ast: 25, ggt: 16, alp: 49 },
  { date: '2024-09-02', bilT: 18.7, bilD: 3.2, alt: 43, ast: 29, ggt: 23, alp: 51 },
  { date: '2025-05-05', bilT: 20.3, bilD: 0.6, alt: 24, ast: 20, ggt: 18, alp: 44 },
];

export const metabolicData: MetabolicPoint[] = [
  { date: '2023-06-20', glucose: 4.6, insulin: 3.6, hba1c: null, hdl: 1.7 },
  { date: '2024-01-25', glucose: 5.4, insulin: null, hba1c: null, hdl: 1.3 },
  { date: '2024-02-29', glucose: 5.5, insulin: null, hba1c: 4.0, hdl: 1.5 },
  { date: '2024-05-02', glucose: 4.5, insulin: null, hba1c: null, hdl: null },
  { date: '2024-09-02', glucose: 5.0, insulin: null, hba1c: null, hdl: 1.4 },
  { date: '2024-11-27', glucose: 5.2, insulin: null, hba1c: null, hdl: 1.6 },
  { date: '2025-05-05', glucose: 5.8, insulin: null, hba1c: null, hdl: 1.7 },
];

export const kidneyData: KidneyPoint[] = [
  { date: '2023-06-20', creatinine: 103, urea: 7.2, uricAcid: 325 },
  { date: '2024-01-25', creatinine: 84, urea: 6.7, uricAcid: 313 },
  { date: '2024-02-29', creatinine: 107, urea: 7.1, uricAcid: 356 },
  { date: '2024-05-02', creatinine: 75, urea: 6.2, uricAcid: 332 },
  { date: '2024-09-02', creatinine: 77, urea: 5.9, uricAcid: 385 },
  { date: '2024-11-27', creatinine: 95, urea: 5.7, uricAcid: null },
  { date: '2025-05-05', creatinine: 89, urea: 5.9, uricAcid: 315 },
];

export const imagingTimeline: ImagingEvent[] = [
  {
    date: '2021-10-23',
    study: 'Hepatobiliary ultrasound',
    summary: 'No pathological ultrasound changes; gallbladder bend in neck; otherwise unremarkable',
  },
  {
    date: '2024-03-02',
    study: 'Abdominal + kidney ultrasound',
    summary: 'Liver, gallbladder, pancreas, spleen, kidneys largely normal; no stones; CHLS not dilated',
  },
  {
    date: '2024-11-22',
    study: 'Liver / gallbladder ultrasound',
    summary: 'Diffuse heterogeneous liver changes; probable hemangioma in right lobe; gallbladder deformity; sludge / echogenic sediment',
  },
  {
    date: '2025-01-15',
    study: 'Complex abdominal ultrasound',
    summary: 'Diffuse heterogeneous liver changes; hemangioma signs; increased echogenicity of intrahepatic ducts; gallbladder deformity; sludge; right nephroptosis context noted',
  },
];
