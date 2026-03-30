import type { ChecklistItem, HealthGoal } from '@/data/models';
import { categories } from '@/data/categories';
import { evidenceEntries } from '@/data/evidence';
import { goalConfigs } from '@/data/questionnaire';

export function generateChecklist(
  userGoals: HealthGoal[],
  questionnaireCompleted: boolean
): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  // Block 1: Close blind spots (critical missing data)
  if (!questionnaireCompleted) {
    items.push({
      id: 'complete-questionnaire',
      text: 'Complete your health profile questionnaire to improve recommendations',
      priority: 'critical',
      category: 'blind-spot',
      linkedCategoryId: null,
      dataSourceNeeded: 'questionnaire',
      completed: false,
    });
  }

  // Critical missing measurements
  const criticalMetrics = [
    { id: 'apoB', text: 'Add ApoB measurement to quantify atherogenic particle burden', cat: 'cardiovascular' },
    { id: 'lpa', text: 'Request one-time Lp(a) to rule out genetic cardiovascular risk', cat: 'cardiovascular' },
    { id: 'bp', text: 'Bring blood pressure readings into your health record', cat: 'cardiovascular' },
  ];

  for (const metric of criticalMetrics) {
    const entry = evidenceEntries.find(e => e.metricId === metric.id);
    if (entry && entry.latestValue === null) {
      items.push({
        id: `add-${metric.id}`,
        text: metric.text,
        priority: 'critical',
        category: 'blind-spot',
        linkedCategoryId: metric.cat,
        dataSourceNeeded: 'lab',
        completed: false,
      });
    }
  }

  // Important missing data
  const importantMetrics = [
    { id: 'bmi', text: 'Add BMI and waist circumference to your anthropometric profile', cat: 'metabolic' },
    { id: 'crp', text: 'Add CRP for inflammatory context in immune and cardiovascular sections', cat: 'immune' },
    { id: 'ferritin', text: 'Add ferritin for complete iron storage assessment', cat: 'nutrientBlood' },
  ];

  for (const metric of importantMetrics) {
    const entry = evidenceEntries.find(e => e.metricId === metric.id);
    if (entry && entry.latestValue === null) {
      items.push({
        id: `add-${metric.id}`,
        text: metric.text,
        priority: 'high',
        category: 'blind-spot',
        linkedCategoryId: metric.cat,
        dataSourceNeeded: 'lab',
        completed: false,
      });
    }
  }

  // Block 2: Category-specific follow-ups
  for (const cat of categories) {
    if (cat.state === 'high-priority') {
      items.push({
        id: `followup-${cat.id}`,
        text: `Follow up on ${cat.label}: ${cat.reason}`,
        priority: 'high',
        category: 'category-action',
        linkedCategoryId: cat.id,
        dataSourceNeeded: 'lab',
        completed: false,
      });
    }
    if (cat.coverage < 0.2) {
      items.push({
        id: `coverage-${cat.id}`,
        text: `Improve ${cat.label} coverage (currently ${Math.round(cat.coverage * 100)}%)`,
        priority: 'medium',
        category: 'category-action',
        linkedCategoryId: cat.id,
        dataSourceNeeded: 'clinical',
        completed: false,
      });
    }
  }

  // Block 3: Goal-aligned coaching steps
  for (const goalId of userGoals) {
    const config = goalConfigs.find(g => g.id === goalId);
    if (!config) continue;

    items.push({
      id: `goal-${goalId}`,
      text: config.coachEmphasis,
      priority: 'medium',
      category: 'goal-aligned',
      linkedCategoryId: config.relatedCategories[0] ?? null,
      dataSourceNeeded: null,
      completed: false,
    });
  }

  // Family history documentation
  items.push({
    id: 'family-history',
    text: 'Document family history of cardiovascular disease if present',
    priority: 'medium',
    category: 'blind-spot',
    linkedCategoryId: 'cardiovascular',
    dataSourceNeeded: 'questionnaire',
    completed: false,
  });

  // Repeat lipid panel
  items.push({
    id: 'repeat-lipid',
    text: 'Repeat a clean fasting lipid panel with ApoB included',
    priority: 'high',
    category: 'category-action',
    linkedCategoryId: 'cardiovascular',
    dataSourceNeeded: 'lab',
    completed: false,
  });

  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const categoryOrder = { 'blind-spot': 0, 'category-action': 1, 'goal-aligned': 2 };

  items.sort((a, b) => {
    const catDiff = categoryOrder[a.category] - categoryOrder[b.category];
    if (catDiff !== 0) return catDiff;
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Deduplicate by id
  const seen = new Set<string>();
  return items.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function getTopChecklistItems(
  userGoals: HealthGoal[],
  questionnaireCompleted: boolean,
  limit: number = 5
): ChecklistItem[] {
  return generateChecklist(userGoals, questionnaireCompleted).slice(0, limit);
}
