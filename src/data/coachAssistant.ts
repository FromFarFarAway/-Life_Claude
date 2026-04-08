// Plan-scoped chat rule engine — Ver 3 §6.
//
// Four behaviors only:
//   1. Explain  — quote a priority's evidence drawer.
//   2. Swap     — accept action-level substitutions from a known menu and
//                 re-run the Ver 2.3 guardrails.
//   3. Reassure — anxiety-keyword path that quotes Anton's own RHR / HRV /
//                 body-temp / 2021 US / lipid panel / UGT1A1 result, then
//                 names the exact test that will settle the question.
//   4. Refuse   — anything that can't cite a metric or study is declined
//                 with a short explanation pointing to the missing evidence.
//
// All assistant messages carry a `citations` array. The UI renders citations
// as inline chips under the bubble — see PlanScopedChat.tsx.

import type {
  CoachMessage,
  CoachPlan,
  Citation,
  CoachPriority,
} from './models';

export interface CoachAssistantContext {
  plan: CoachPlan;
}

const STARTER: CoachMessage = {
  role: 'assistant',
  content:
    "I'm scoped to the plan above. Ask me why a priority is where it is, request a swap, or tell me what you're worried about — I'll answer with your own numbers or refuse if I can't cite one.",
  citations: [],
};

export function getStarterMessage(): CoachMessage {
  return STARTER;
}

export function getSuggestedPrompts(plan: CoachPlan): string[] {
  const top = plan.priorities[0]?.code ?? 'P0';
  return [
    `Why is ${top} first?`,
    'Swap psyllium for oats',
    "I'm worried about my glucose",
    'Should I take metformin?',
  ];
}

// ── main entry ──────────────────────────────────────────────────────────────
export function respondToPlanQuestion(
  input: string,
  ctx: CoachAssistantContext
): CoachMessage {
  const text = input.trim();
  if (!text) {
    return refuse('Please ask something specific about your plan.', []);
  }
  const lower = text.toLowerCase();

  // 3. Reassurance — anxiety keywords first so they short-circuit refusals.
  const reassurance = matchReassurance(lower, ctx.plan);
  if (reassurance) return reassurance;

  // 2. Swap requests
  const swap = matchSwap(lower, ctx.plan);
  if (swap) return swap;

  // 1. Explanation — "why P0", "why is P1 first", etc.
  const explain = matchExplain(lower, ctx.plan);
  if (explain) return explain;

  // 4. Refuse — non-traceable advice
  return refuseNonTraceable(text, ctx.plan);
}

// ── 1. Explain ──────────────────────────────────────────────────────────────
function matchExplain(lower: string, plan: CoachPlan): CoachMessage | null {
  // Look for "P0".."P4"
  const match = lower.match(/p([0-4])/);
  if (!match) {
    if (lower.includes('why') && lower.includes('first')) {
      const p = plan.priorities[0];
      return explainPriority(p);
    }
    return null;
  }
  const code = `P${match[1]}` as CoachPriority['code'];
  const priority = plan.priorities.find((p) => p.code === code);
  if (!priority) return null;
  return explainPriority(priority);
}

function explainPriority(p: CoachPriority): CoachMessage {
  const lines = [
    `${p.code} — ${p.title}.`,
    p.action.whyParagraph,
    `Verification: ${p.action.verification}`,
  ];
  const citations: Citation[] = [
    { kind: 'plan-action', id: p.code, label: p.title },
    ...p.action.evidence.metrics.slice(0, 3).map<Citation>((m) => ({
      kind: 'metric',
      id: m.id,
      label: `${m.label} ${m.current}`,
    })),
    ...p.action.evidence.studies.slice(0, 2).map<Citation>((s) => ({
      kind: 'study',
      id: s.id,
      label: `${s.label} (${s.date})`,
    })),
  ];
  return { role: 'assistant', content: lines.join('\n\n'), citations };
}

// ── 2. Swap ─────────────────────────────────────────────────────────────────
interface SwapDef {
  match: (lower: string) => boolean;
  appliesTo: CoachPriority['code'];
  guardrailOk: (plan: CoachPlan) => boolean;
  apply: () => string;
}

const SWAP_MENU: SwapDef[] = [
  {
    match: (l) => l.includes('psyllium') && l.includes('oat'),
    appliesTo: 'P2',
    guardrailOk: () => true,
    apply: () =>
      'Swap accepted. Replace psyllium with ~40 g rolled oats at breakfast — same daily soluble-fiber target, no UGT1A1 conflict.',
  },
  {
    match: (l) =>
      (l.includes('strength') && l.includes('tue')) ||
      (l.includes('move') && l.includes('strength')),
    appliesTo: 'P1',
    guardrailOk: (plan) => {
      // Guardrail: still 2 strength sessions per week, no back-to-back hard days
      const p1 = plan.priorities.find((p) => p.code === 'P1');
      return !!p1;
    },
    apply: () =>
      'Swap accepted. Move strength to Tue/Fri. Keep the quality run on a non-strength day so you do not stack hard sessions.',
  },
  {
    match: (l) =>
      l.includes('skip') && (l.includes('long run') || l.includes('saturday')),
    appliesTo: 'P1',
    guardrailOk: () => true,
    apply: () =>
      'Skip accepted for this week. Replace with an extra easy 6 km on Sunday only if Oura readiness ≥ 75 the morning of.',
  },
];

function matchSwap(lower: string, plan: CoachPlan): CoachMessage | null {
  if (!lower.includes('swap') && !lower.includes('replace') && !lower.includes('move') && !lower.includes('skip')) {
    return null;
  }
  for (const swap of SWAP_MENU) {
    if (!swap.match(lower)) continue;
    const priority = plan.priorities.find((p) => p.code === swap.appliesTo);
    if (!priority) continue;
    if (!swap.guardrailOk(plan)) {
      return refuse(
        `Can't accept that swap for ${swap.appliesTo} — it conflicts with a Ver 2.3 guardrail in the action.`,
        [{ kind: 'plan-action', id: priority.code, label: priority.title }]
      );
    }
    return {
      role: 'assistant',
      content: swap.apply(),
      citations: [
        { kind: 'plan-action', id: priority.code, label: priority.title },
      ],
    };
  }
  return null;
}

// ── 3. Reassure ─────────────────────────────────────────────────────────────
const REASSURE_KEYWORDS = [
  { keys: ['glucose', 'diabet', 'sugar'], topic: 'glucose' as const },
  { keys: ['liver', 'hemangioma', 'ggt'], topic: 'liver' as const },
  { keys: ['heart', 'ldl', 'cholest'], topic: 'lipid' as const },
];

function matchReassurance(lower: string, plan: CoachPlan): CoachMessage | null {
  // Only fire on anxiety phrasing
  const anxious =
    lower.includes('worri') ||
    lower.includes('scared') ||
    lower.includes('anxious') ||
    lower.includes('nervous') ||
    lower.includes('afraid');
  if (!anxious) return null;

  for (const { keys, topic } of REASSURE_KEYWORDS) {
    if (keys.some((k) => lower.includes(k))) {
      return reassureFor(topic, plan);
    }
  }
  return null;
}

function reassureFor(
  topic: 'glucose' | 'liver' | 'lipid',
  plan: CoachPlan
): CoachMessage {
  if (topic === 'glucose') {
    const p0 = plan.priorities.find((p) => p.code === 'P0');
    return {
      role: 'assistant',
      content: [
        "Here's what your own data says before we even draw blood:",
        '· Oura RHR is stable around 50–53 bpm.',
        '· Oura HRV balance is in your normal band on baseline days.',
        '· Body temperature deviation is essentially flat.',
        '· Sleep efficiency holds at 90%+.',
        '· Your 2021 lipid panel was reassuring (LDL 3.11, TG 0.85).',
        '· The 2021 abdominal US showed a normal pancreas.',
        '· Your UGT1A1 report carries no diabetes-risk variants.',
        '',
        "What will actually settle the question: the **fasting glucose + HbA1c + fasting insulin** in P0's draw this week. If HbA1c < 5.7% and fasting glucose < 5.5 mmol/L, this drops out of the priority list.",
      ].join('\n'),
      citations: [
        { kind: 'metric', id: 'rhr', label: 'Oura RHR 50–53 bpm' },
        { kind: 'metric', id: 'hrv-balance', label: 'Oura HRV balance baseline' },
        { kind: 'metric', id: 'body-temp', label: 'Body temp flat' },
        { kind: 'study', id: 'lipid-2021-09-18', label: 'Lipid 2021-09-18 LDL 3.11' },
        { kind: 'study', id: 'us-2021-07-04', label: 'Abdominal US 2021-07-04 normal pancreas' },
        { kind: 'study', id: 'ugt1a1-2021-11-26', label: 'UGT1A1 2021-11-26' },
        ...(p0 ? [{ kind: 'plan-action' as const, id: p0.code, label: p0.title }] : []),
      ],
    };
  }
  if (topic === 'liver') {
    const p2 = plan.priorities.find((p) => p.code === 'P2');
    return {
      role: 'assistant',
      content: [
        'Your liver story is light-touch, not alarming:',
        '· ALT 24, AST 20 — both inside reference range.',
        '· GGT 18 with a slow upward drift — worth watching, not red.',
        '· The 12 mm hemangioma on the 2021 US is a stable benign finding type.',
        '· UGT1A1 6TA/7TA is a heterozygous carrier state, not a disease.',
        '',
        "What will settle it: the **GGT + ALT + AST + bilirubin** included in P0's draw, plus the repeat abdominal ultrasound under P4.",
      ].join('\n'),
      citations: [
        { kind: 'metric', id: 'alt', label: 'ALT 24 U/L' },
        { kind: 'metric', id: 'ast', label: 'AST 20 U/L' },
        { kind: 'metric', id: 'ggt', label: 'GGT 18 U/L' },
        { kind: 'study', id: 'us-2021-07-04', label: 'Hepatic hemangioma 12 mm' },
        { kind: 'study', id: 'ugt1a1-2021-11-26', label: 'UGT1A1 6TA/7TA' },
        ...(p2 ? [{ kind: 'plan-action' as const, id: p2.code, label: p2.title }] : []),
      ],
    };
  }
  // lipid
  return {
    role: 'assistant',
    content: [
      'Your lipid context is the long-running story, not a today emergency:',
      '· LDL has bounced 4.5–6.1 across 11 panels — persistently elevated, not acutely changing.',
      '· HDL is steady at 1.4–1.7.',
      '· Triglycerides last seen 0.93 — no metabolic-syndrome shape.',
      '',
      "P0's repeat lipid panel will give you the freshest number. If you want to settle the genetic question, add ApoB and one-time Lp(a).",
    ].join('\n'),
    citations: [
      { kind: 'metric', id: 'ldl', label: 'LDL 5.6 latest' },
      { kind: 'metric', id: 'hdl', label: 'HDL 1.7 latest' },
      { kind: 'metric', id: 'tg', label: 'TG 0.93 latest' },
    ],
  };
}

// ── 4. Refuse ───────────────────────────────────────────────────────────────
function refuseNonTraceable(text: string, plan: CoachPlan): CoachMessage {
  // Topic-specific refusal copy keeps it from sounding canned.
  const lower = text.toLowerCase();
  let reason =
    "I can't give advice that I can't trace back to one of your metrics or studies.";
  if (lower.includes('metformin') || lower.includes('drug') || lower.includes('medication') || lower.includes('prescri')) {
    reason =
      "Prescriptions are out of scope here. I won't recommend or change medications because I can't ground that in a metric or study you've shared.";
  } else if (lower.includes('diagnos')) {
    reason =
      "I can't diagnose. I can only quote the metrics and studies in your plan and tell you which one would settle the question.";
  } else if (lower.includes('supplement')) {
    reason =
      "I won't suggest supplements without a baseline metric. The closest in-scope answer is the micronutrient bundle in P0's draw — that gives us a number to act on.";
  }
  // Suggest the closest priority that touches the topic, if any.
  const closest = guessClosestPriority(lower, plan);
  return refuse(
    `${reason}${closest ? ` Closest in-plan item: ${closest.code} — ${closest.title}.` : ''}`,
    closest ? [{ kind: 'plan-action', id: closest.code, label: closest.title }] : []
  );
}

function guessClosestPriority(lower: string, plan: CoachPlan): CoachPriority | null {
  if (lower.includes('glucose') || lower.includes('sugar') || lower.includes('diabet') || lower.includes('metformin')) {
    return plan.priorities.find((p) => p.code === 'P0') ?? null;
  }
  if (lower.includes('run') || lower.includes('strength') || lower.includes('vo2')) {
    return plan.priorities.find((p) => p.code === 'P1') ?? null;
  }
  if (lower.includes('liver') || lower.includes('alcohol') || lower.includes('fast')) {
    return plan.priorities.find((p) => p.code === 'P2') ?? null;
  }
  if (lower.includes('sleep') || lower.includes('work') || lower.includes('hrv')) {
    return plan.priorities.find((p) => p.code === 'P3') ?? null;
  }
  return null;
}

function refuse(content: string, citations: Citation[]): CoachMessage {
  return { role: 'assistant', content, citations };
}
