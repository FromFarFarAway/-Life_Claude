export interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AssistantQA {
  question: string;
  answer: string;
}

export const starterMessage: AssistantMessage = {
  role: 'assistant',
  content:
    "Welcome to your +LIFE Health OS dashboard. I\u2019ve analyzed your longitudinal health data spanning 2020\u20132025 and identified persistent LDL-driven hypercholesterolemia as your primary health signal. I can help you understand your scores, trends, and what data would improve certainty. Ask me anything about your dashboard.",
};

export const suggestedQuestions: AssistantQA[] = [
  {
    question: 'Why is heart health the top priority?',
    answer:
      'Heart health scores 42/100 because your LDL cholesterol has been persistently elevated across 11 measurements from 2021 to 2025, ranging from 4.8 to 6.1 mmol/L. Your latest LDL is 5.6 mmol/L with total cholesterol at 7.5 mmol/L. This is not a triglyceride-driven pattern \u2014 your TG levels are actually low-normal (0.93 mmol/L latest). The persistent LDL elevation suggests a possible primary or familial hypercholesterolemia pattern that warrants a structured lipid work-up including ApoB and Lp(a).',
  },
  {
    question: 'Show me the LDL trend over time.',
    answer:
      'Your LDL trend shows persistent elevation across all 11 data points:\n\n\u2022 Sep 2021: 4.8 mmol/L\n\u2022 May 2022: 5.5 mmol/L\n\u2022 May 2023: 4.5 mmol/L (lowest recorded)\n\u2022 Feb 2024: 6.1 mmol/L (highest recorded)\n\u2022 May 2025: 5.6 mmol/L (latest)\n\nEvery single measurement exceeds the 3.0 mmol/L optimal threshold. The pattern is consistent with sustained atherogenic burden rather than transient fluctuation. You can see this visualized in the Heart Health section chart above.',
  },
  {
    question: 'What is missing for better certainty?',
    answer:
      'Your dashboard uncertainty is 46%, primarily driven by these gaps:\n\n\u2022 ApoB \u2014 never measured. This is the single most informative addition for quantifying atherogenic particle burden.\n\u2022 Lp(a) \u2014 never measured. A one-time test that could reveal genetic cardiovascular risk.\n\u2022 Blood pressure \u2014 not in your uploaded files. Essential for cardiovascular risk stratification.\n\u2022 Anthropometrics \u2014 BMI and waist circumference are absent, limiting metabolic context.\n\u2022 Family history \u2014 not documented. Critical for assessing familial hypercholesterolemia likelihood.\n\u2022 CRP \u2014 never measured. Would add inflammatory context to both cardiovascular and immune sections.\n\u2022 Cancer screening \u2014 almost no evidence (10% coverage).\n\u2022 Cognitive/longevity \u2014 minimal data (5% coverage).',
  },
  {
    question: 'Why is liver contextual and not primary?',
    answer:
      'Liver health scores 63/100 \u2014 watchlist rather than high priority \u2014 because:\n\n\u2022 Liver enzymes (ALT, AST) have remained mostly within or near normal ranges. Latest ALT is 24 U/L and AST is 20 U/L.\n\u2022 Bilirubin shows variability (8.6\u201329.6 \u00b5mol/L) but no clear progressive trend.\n\u2022 Later imaging (2024\u20132025) does show new findings: probable hemangioma in the right lobe and gallbladder sludge/deformity.\n\u2022 However, these hepatobiliary findings do not explain the persistent LDL elevation, which is the dominant signal.\n\nThe liver section is a contextual watchlist \u2014 it deserves monitoring but does not displace cardiovascular risk as the primary concern.',
  },
  {
    question: 'Which sections are under-covered and why?',
    answer:
      'Two sections have very low coverage:\n\n\u2022 Cancer Screening (10% coverage, score 34) \u2014 Almost no dedicated screening evidence exists in your uploaded files. Recommended next steps include age-appropriate screenings.\n\u2022 Cognitive & Longevity (5% coverage, score 31) \u2014 No cognitive assessments (PHQ/GAD), sleep device data, or longevity biomarkers are available.\n\nAdditionally, Thyroid & Hormonal has only 40% coverage based on a single TSH and free T4 measurement, and Immune Health has 30% coverage due to missing CRP and limited immune markers beyond CBC.\n\nThese sparse sections are shown with coverage meters rather than false precision \u2014 they represent areas where additional data would meaningfully improve your health picture.',
  },
  {
    question: 'How can I improve my profile completeness?',
    answer:
      'Your Profile Completeness reflects how much data is available to inform your health picture. To improve it:\n\n\u2022 Complete the health questionnaire \u2014 adds lifestyle, family history, and goal context (+15% to completeness).\n\u2022 Add missing critical markers \u2014 ApoB, Lp(a), blood pressure, BMI, waist circumference.\n\u2022 Add ferritin \u2014 completes your iron assessment in the Nutrient & Blood section.\n\u2022 Add CRP \u2014 provides inflammatory context for immune and cardiovascular sections.\n\u2022 Schedule age-appropriate screenings \u2014 cancer screening is currently at 10% coverage.\n\u2022 Connect a wearable device \u2014 sleep, activity, and heart rate data enhance cognitive and longevity sections.\n\nEach data addition improves both completeness and the confidence of your health scores.',
  },
  {
    question: 'What should I focus on based on my goals?',
    answer:
      'Your health checklist is prioritized based on your selected goals and current data gaps:\n\n1. Close blind spots first \u2014 ApoB, Lp(a), and blood pressure are the highest-impact missing measurements regardless of your goals.\n2. Address high-priority categories \u2014 Heart health (score 42) needs the most attention given persistent LDL elevation.\n3. Goal-aligned actions \u2014 depending on your selected goals, the coach emphasizes different next steps:\n   \u2022 Heart risk → structured lipid work-up with ApoB\n   \u2022 Longevity → inflammatory markers + cognitive baseline\n   \u2022 Fitness → wearable data + body composition\n   \u2022 Screening → schedule age-appropriate cancer screenings\n\nCheck your Health Coach card for your personalized checklist.',
  },
  {
    question: 'Tell me about my fitness age.',
    answer:
      'Your fitness age is estimated at 33, which is 4 years younger than your chronological age of 37. This is a positive signal.\n\nHowever, this estimate is currently based on limited data. To strengthen this assessment, consider:\n\n\u2022 Adding VO2max or cardiorespiratory fitness test results\n\u2022 Connecting a wearable for continuous heart rate and activity tracking\n\u2022 Adding body composition data (BMI, waist circumference, body fat %)\n\u2022 Recording exercise frequency, type, and intensity through the questionnaire\n\nWith more data, the fitness age estimate becomes more reliable and can be tracked over time.',
  },
];

export const fallbackAnswer: string =
  "Based on your current dashboard data, your primary health signal is persistent LDL-driven hypercholesterolemia with a Health Score of 56/100. The most impactful next steps are adding ApoB and Lp(a) measurements, bringing blood pressure into your record, and repeating a clean fasting lipid panel. Complete your health questionnaire to get personalized recommendations aligned to your goals.";
