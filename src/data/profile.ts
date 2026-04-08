export const userProfile = {
  name: 'Anton Ivanov',
  sex: 'Male' as const,
  birthDate: '1988-12-07',
  age: 37,
  fitnessAge: 33,
  smoking: 'Never smoked' as const,
  hookah: 'Once every 3 months' as const,
  residence: 'Russia / Kazakhstan' as const,
  dataWindow: 'Bloodwork 2020\u20132025 \u00b7 Imaging 2021\u20132025',
  dominantSignal: 'Persistent LDL-driven hypercholesterolemia',
};

export const dashboardCopy = {
  integralScoreHelper:
    'Health Score combines severity, coverage, and trend context across nine systems. It is a product score, not a diagnosis.',

  mainProblemBody:
    'Your strongest persistent signal is LDL-heavy hypercholesterolemia across multiple years. The current dataset supports treating this as the top prioritization problem on the dashboard.',

  risksBody:
    'Cardiovascular risk context is incomplete without ApoB, Lp(a), blood pressure, anthropometrics, and family history. Liver/gallbladder findings add context but do not replace the lipid signal.',

  healthCoachBody:
    'The fastest way to improve certainty is to repeat a clean fasting lipid panel, add ApoB and one-time Lp(a), and bring blood pressure / waist / family history into the record.',

  // Ver 3 — brief + reassurance copy used by HealthCoachCard / chat
  coachBriefShort:
    'Two things this week — get glucose clarity fast, and start pushing your running + strength block.',
  coachReassuranceGlucose:
    "Your own data is reassuring: RHR steady ~50, Oura HRV in baseline band, body temp flat, sleep efficiency 90%+, 2021 lipid panel reassuring, 2021 abdominal US showed a normal pancreas, and your UGT1A1 report carries no diabetes-risk variants. The fasting draw confirms it.",

  healthCoachActions: [
    'Repeat a clean fasting lipid panel with ApoB included',
    'Request one-time Lp(a) measurement to rule out genetic risk',
    'Bring blood pressure readings into the health record',
    'Add waist circumference and BMI to your anthropometric profile',
    'Document family history of cardiovascular disease if present',
  ],

  sectionSummaries: {
    cardiovascular:
      'This section is prioritized because LDL repeatedly reaches levels that are not explained by a simple triglyceride-heavy metabolic pattern.',
    liver:
      'Liver enzymes are not the dominant abnormality, but bilirubin variability and later imaging justify a contextual watchlist.',
    kidney:
      'Current kidney-related blood and imaging data are comparatively reassuring and should be framed as lower urgency.',
    thyroid:
      'Sparse thyroid data with no clear red flag. Single TSH and free T4 values do not suggest obvious hypothyroidism, but longitudinal data is absent.',
    metabolic:
      'Glucose history is largely normal to borderline. HbA1c 4.0% is reassuring. Triglycerides are low-normal. Dysmetabolism is not the dominant signal.',
    immune:
      'CBC supports a lightweight immune view. WBC and differential are available longitudinally, but richer immune markers like CRP are absent.',
    nutrientBlood:
      'Hematology is broadly steady. Hemoglobin, RBC indices, B12, folate, and iron are available. Ferritin is missing for complete iron assessment.',
    cancerScreening:
      'Almost no dedicated screening evidence in the uploaded files. This is a coverage and next-step module, not a faux-analytic section.',
    cognitiveLongevity:
      'No direct cognitive, PHQ/GAD, sleep-device, or longevity dataset in scope. This section represents an incompletely explored area.',
  },

  risks: [
    { severity: 'high' as const, text: 'High atherogenic burden — LDL persistently in severe-range territory (4.8\u20136.1 mmol/L)' },
    { severity: 'moderate' as const, text: 'Hepatobiliary context watchlist — bilirubin variability, hemangioma, gallbladder sludge/deformity on imaging' },
    { severity: 'moderate' as const, text: 'Missing ApoB, Lp(a), blood pressure, and family history limits cardiovascular risk stratification' },
    { severity: 'low' as const, text: 'Weak screening and longevity coverage — cancer screening and cognitive/longevity sections have minimal data' },
  ],
};
