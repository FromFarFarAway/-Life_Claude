// Oura daily seed — fabricated 30-day window ending 2026-04-07.
// Values are plausible for a 37 y.o. trained male with periodic late-work
// nights. The series is shaped so the derived layer produces:
//   - hrv7dTrendVsBaseline ≈ -9% (recent dip after late-work cluster)
//   - readinessRolling7d  ≈ 73 (high-but-not-perfect)
//   - body-temperature deviation flat (reassurance signal)
//   - sleep efficiency intact
// All values are deterministic — no Math.random — so the demo renders the
// same numbers every load.

export interface OuraDaily {
  date: string;
  activityScore: number;
  steps: number;
  sedentaryMinutes: number;
  metMinutes: number;
  sleepScore: number;
  sleepDeepMinutes: number;
  sleepRemMinutes: number;
  sleepEfficiency: number; // 0-100
  sleepLatencyMinutes: number;
  sleepTotalMinutes: number;
  readinessScore: number;
  hrvBalance: number; // -100..100
  bodyTempDeviationC: number; // ±0.5
  recoveryIndex: number;
  spo2Avg: number;
  rhr: number;
  vascularAge: number;
  vo2max: number;
  resilience: 'strong' | 'solid' | 'adequate' | 'limited';
}

// Helper kept inline so the seed file is self-contained.
function d(offsetDaysAgo: number): string {
  const base = new Date('2026-04-07T00:00:00Z').getTime();
  const t = base - offsetDaysAgo * 24 * 60 * 60 * 1000;
  return new Date(t).toISOString().slice(0, 10);
}

// Index 0 is the most recent day; reversed before export so the array is
// chronological (ascending by date) — matches Oura export convention.
const desc: OuraDaily[] = [
  // ── last 7 days: HRV-balance dipping after late-work cluster ────────────
  { date: d(0),  activityScore: 82, steps:  9120, sedentaryMinutes: 540, metMinutes: 220, sleepScore: 78, sleepDeepMinutes: 78,  sleepRemMinutes: 92,  sleepEfficiency: 91, sleepLatencyMinutes: 12, sleepTotalMinutes: 408, readinessScore: 74, hrvBalance: -14, bodyTempDeviationC: -0.05, recoveryIndex: 78, spo2Avg: 96, rhr: 51, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(1),  activityScore: 74, steps:  7510, sedentaryMinutes: 612, metMinutes: 168, sleepScore: 71, sleepDeepMinutes: 64,  sleepRemMinutes: 80,  sleepEfficiency: 88, sleepLatencyMinutes: 18, sleepTotalMinutes: 372, readinessScore: 69, hrvBalance: -22, bodyTempDeviationC:  0.08, recoveryIndex: 70, spo2Avg: 96, rhr: 53, vascularAge: 31, vo2max: 49, resilience: 'adequate' },
  { date: d(2),  activityScore: 69, steps:  6240, sedentaryMinutes: 660, metMinutes: 142, sleepScore: 68, sleepDeepMinutes: 58,  sleepRemMinutes: 76,  sleepEfficiency: 86, sleepLatencyMinutes: 22, sleepTotalMinutes: 348, readinessScore: 66, hrvBalance: -28, bodyTempDeviationC:  0.02, recoveryIndex: 65, spo2Avg: 95, rhr: 54, vascularAge: 32, vo2max: 49, resilience: 'adequate' },
  { date: d(3),  activityScore: 88, steps: 11240, sedentaryMinutes: 480, metMinutes: 268, sleepScore: 81, sleepDeepMinutes: 84,  sleepRemMinutes: 96,  sleepEfficiency: 92, sleepLatencyMinutes:  9, sleepTotalMinutes: 426, readinessScore: 78, hrvBalance:  -6, bodyTempDeviationC: -0.03, recoveryIndex: 82, spo2Avg: 96, rhr: 50, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(4),  activityScore: 79, steps:  8430, sedentaryMinutes: 552, metMinutes: 198, sleepScore: 76, sleepDeepMinutes: 72,  sleepRemMinutes: 88,  sleepEfficiency: 90, sleepLatencyMinutes: 14, sleepTotalMinutes: 396, readinessScore: 73, hrvBalance: -10, bodyTempDeviationC:  0.00, recoveryIndex: 76, spo2Avg: 96, rhr: 51, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(5),  activityScore: 71, steps:  6890, sedentaryMinutes: 624, metMinutes: 156, sleepScore: 69, sleepDeepMinutes: 60,  sleepRemMinutes: 78,  sleepEfficiency: 87, sleepLatencyMinutes: 20, sleepTotalMinutes: 354, readinessScore: 67, hrvBalance: -18, bodyTempDeviationC:  0.05, recoveryIndex: 68, spo2Avg: 95, rhr: 53, vascularAge: 32, vo2max: 49, resilience: 'adequate' },
  { date: d(6),  activityScore: 66, steps:  5780, sedentaryMinutes: 690, metMinutes: 124, sleepScore: 64, sleepDeepMinutes: 52,  sleepRemMinutes: 70,  sleepEfficiency: 84, sleepLatencyMinutes: 26, sleepTotalMinutes: 330, readinessScore: 64, hrvBalance: -24, bodyTempDeviationC:  0.02, recoveryIndex: 62, spo2Avg: 95, rhr: 54, vascularAge: 32, vo2max: 49, resilience: 'adequate' },
  // ── days 7..29: baseline window with intact HRV balance ────────────────
  { date: d(7),  activityScore: 84, steps:  9560, sedentaryMinutes: 510, metMinutes: 232, sleepScore: 79, sleepDeepMinutes: 80,  sleepRemMinutes: 92,  sleepEfficiency: 91, sleepLatencyMinutes: 11, sleepTotalMinutes: 414, readinessScore: 76, hrvBalance:   8, bodyTempDeviationC: -0.02, recoveryIndex: 80, spo2Avg: 96, rhr: 50, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(8),  activityScore: 80, steps:  8820, sedentaryMinutes: 540, metMinutes: 210, sleepScore: 77, sleepDeepMinutes: 76,  sleepRemMinutes: 90,  sleepEfficiency: 90, sleepLatencyMinutes: 13, sleepTotalMinutes: 402, readinessScore: 74, hrvBalance:   4, bodyTempDeviationC:  0.00, recoveryIndex: 78, spo2Avg: 96, rhr: 51, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(9),  activityScore: 86, steps: 10120, sedentaryMinutes: 492, metMinutes: 248, sleepScore: 82, sleepDeepMinutes: 86,  sleepRemMinutes: 98,  sleepEfficiency: 93, sleepLatencyMinutes:  9, sleepTotalMinutes: 432, readinessScore: 79, hrvBalance:  12, bodyTempDeviationC: -0.04, recoveryIndex: 84, spo2Avg: 97, rhr: 49, vascularAge: 30, vo2max: 49, resilience: 'strong' },
  { date: d(10), activityScore: 78, steps:  8210, sedentaryMinutes: 558, metMinutes: 194, sleepScore: 76, sleepDeepMinutes: 72,  sleepRemMinutes: 88,  sleepEfficiency: 90, sleepLatencyMinutes: 14, sleepTotalMinutes: 396, readinessScore: 73, hrvBalance:   2, bodyTempDeviationC:  0.01, recoveryIndex: 76, spo2Avg: 96, rhr: 51, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(11), activityScore: 82, steps:  9080, sedentaryMinutes: 528, metMinutes: 218, sleepScore: 80, sleepDeepMinutes: 78,  sleepRemMinutes: 94,  sleepEfficiency: 91, sleepLatencyMinutes: 12, sleepTotalMinutes: 420, readinessScore: 76, hrvBalance:   6, bodyTempDeviationC: -0.01, recoveryIndex: 79, spo2Avg: 96, rhr: 50, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(12), activityScore: 90, steps: 11680, sedentaryMinutes: 462, metMinutes: 282, sleepScore: 84, sleepDeepMinutes: 90,  sleepRemMinutes: 100, sleepEfficiency: 94, sleepLatencyMinutes:  8, sleepTotalMinutes: 444, readinessScore: 82, hrvBalance:  16, bodyTempDeviationC: -0.06, recoveryIndex: 86, spo2Avg: 97, rhr: 49, vascularAge: 30, vo2max: 50, resilience: 'strong' },
  { date: d(13), activityScore: 75, steps:  7460, sedentaryMinutes: 588, metMinutes: 174, sleepScore: 73, sleepDeepMinutes: 66,  sleepRemMinutes: 84,  sleepEfficiency: 88, sleepLatencyMinutes: 16, sleepTotalMinutes: 378, readinessScore: 70, hrvBalance:  -2, bodyTempDeviationC:  0.03, recoveryIndex: 72, spo2Avg: 96, rhr: 52, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(14), activityScore: 81, steps:  8740, sedentaryMinutes: 540, metMinutes: 212, sleepScore: 78, sleepDeepMinutes: 74,  sleepRemMinutes: 90,  sleepEfficiency: 90, sleepLatencyMinutes: 13, sleepTotalMinutes: 402, readinessScore: 74, hrvBalance:   4, bodyTempDeviationC: -0.02, recoveryIndex: 77, spo2Avg: 96, rhr: 51, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(15), activityScore: 87, steps: 10240, sedentaryMinutes: 498, metMinutes: 252, sleepScore: 81, sleepDeepMinutes: 82,  sleepRemMinutes: 96,  sleepEfficiency: 92, sleepLatencyMinutes: 10, sleepTotalMinutes: 426, readinessScore: 78, hrvBalance:  10, bodyTempDeviationC: -0.03, recoveryIndex: 82, spo2Avg: 97, rhr: 50, vascularAge: 30, vo2max: 49, resilience: 'strong' },
  { date: d(16), activityScore: 73, steps:  7090, sedentaryMinutes: 600, metMinutes: 162, sleepScore: 72, sleepDeepMinutes: 64,  sleepRemMinutes: 80,  sleepEfficiency: 88, sleepLatencyMinutes: 17, sleepTotalMinutes: 372, readinessScore: 69, hrvBalance:  -4, bodyTempDeviationC:  0.02, recoveryIndex: 70, spo2Avg: 96, rhr: 52, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(17), activityScore: 85, steps:  9740, sedentaryMinutes: 510, metMinutes: 234, sleepScore: 80, sleepDeepMinutes: 78,  sleepRemMinutes: 92,  sleepEfficiency: 91, sleepLatencyMinutes: 12, sleepTotalMinutes: 414, readinessScore: 76, hrvBalance:   8, bodyTempDeviationC: -0.01, recoveryIndex: 80, spo2Avg: 96, rhr: 50, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(18), activityScore: 79, steps:  8350, sedentaryMinutes: 552, metMinutes: 200, sleepScore: 77, sleepDeepMinutes: 72,  sleepRemMinutes: 88,  sleepEfficiency: 90, sleepLatencyMinutes: 14, sleepTotalMinutes: 396, readinessScore: 73, hrvBalance:   2, bodyTempDeviationC:  0.00, recoveryIndex: 75, spo2Avg: 96, rhr: 51, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(19), activityScore: 88, steps: 10680, sedentaryMinutes: 480, metMinutes: 262, sleepScore: 82, sleepDeepMinutes: 84,  sleepRemMinutes: 96,  sleepEfficiency: 92, sleepLatencyMinutes:  9, sleepTotalMinutes: 426, readinessScore: 78, hrvBalance:  12, bodyTempDeviationC: -0.04, recoveryIndex: 82, spo2Avg: 97, rhr: 49, vascularAge: 30, vo2max: 50, resilience: 'strong' },
  { date: d(20), activityScore: 76, steps:  7820, sedentaryMinutes: 576, metMinutes: 184, sleepScore: 74, sleepDeepMinutes: 68,  sleepRemMinutes: 84,  sleepEfficiency: 89, sleepLatencyMinutes: 15, sleepTotalMinutes: 384, readinessScore: 71, hrvBalance:   0, bodyTempDeviationC:  0.01, recoveryIndex: 73, spo2Avg: 96, rhr: 52, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(21), activityScore: 83, steps:  9220, sedentaryMinutes: 522, metMinutes: 222, sleepScore: 79, sleepDeepMinutes: 76,  sleepRemMinutes: 90,  sleepEfficiency: 91, sleepLatencyMinutes: 12, sleepTotalMinutes: 408, readinessScore: 75, hrvBalance:   6, bodyTempDeviationC: -0.02, recoveryIndex: 78, spo2Avg: 96, rhr: 50, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(22), activityScore: 89, steps: 11020, sedentaryMinutes: 468, metMinutes: 274, sleepScore: 83, sleepDeepMinutes: 86,  sleepRemMinutes: 98,  sleepEfficiency: 93, sleepLatencyMinutes:  9, sleepTotalMinutes: 432, readinessScore: 80, hrvBalance:  14, bodyTempDeviationC: -0.05, recoveryIndex: 84, spo2Avg: 97, rhr: 49, vascularAge: 30, vo2max: 50, resilience: 'strong' },
  { date: d(23), activityScore: 77, steps:  8060, sedentaryMinutes: 564, metMinutes: 192, sleepScore: 76, sleepDeepMinutes: 70,  sleepRemMinutes: 86,  sleepEfficiency: 90, sleepLatencyMinutes: 14, sleepTotalMinutes: 390, readinessScore: 72, hrvBalance:   2, bodyTempDeviationC:  0.00, recoveryIndex: 74, spo2Avg: 96, rhr: 51, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(24), activityScore: 81, steps:  8920, sedentaryMinutes: 540, metMinutes: 214, sleepScore: 78, sleepDeepMinutes: 74,  sleepRemMinutes: 90,  sleepEfficiency: 90, sleepLatencyMinutes: 13, sleepTotalMinutes: 402, readinessScore: 74, hrvBalance:   4, bodyTempDeviationC: -0.01, recoveryIndex: 77, spo2Avg: 96, rhr: 51, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(25), activityScore: 86, steps: 10380, sedentaryMinutes: 492, metMinutes: 246, sleepScore: 81, sleepDeepMinutes: 82,  sleepRemMinutes: 94,  sleepEfficiency: 92, sleepLatencyMinutes: 10, sleepTotalMinutes: 420, readinessScore: 78, hrvBalance:  10, bodyTempDeviationC: -0.03, recoveryIndex: 81, spo2Avg: 97, rhr: 50, vascularAge: 30, vo2max: 49, resilience: 'strong' },
  { date: d(26), activityScore: 74, steps:  7280, sedentaryMinutes: 594, metMinutes: 168, sleepScore: 73, sleepDeepMinutes: 66,  sleepRemMinutes: 82,  sleepEfficiency: 88, sleepLatencyMinutes: 16, sleepTotalMinutes: 378, readinessScore: 70, hrvBalance:  -2, bodyTempDeviationC:  0.02, recoveryIndex: 71, spo2Avg: 96, rhr: 52, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(27), activityScore: 82, steps:  9100, sedentaryMinutes: 528, metMinutes: 216, sleepScore: 79, sleepDeepMinutes: 76,  sleepRemMinutes: 90,  sleepEfficiency: 91, sleepLatencyMinutes: 12, sleepTotalMinutes: 408, readinessScore: 75, hrvBalance:   6, bodyTempDeviationC: -0.01, recoveryIndex: 78, spo2Avg: 96, rhr: 50, vascularAge: 31, vo2max: 49, resilience: 'solid' },
  { date: d(28), activityScore: 90, steps: 11820, sedentaryMinutes: 456, metMinutes: 286, sleepScore: 84, sleepDeepMinutes: 90,  sleepRemMinutes: 100, sleepEfficiency: 94, sleepLatencyMinutes:  8, sleepTotalMinutes: 444, readinessScore: 82, hrvBalance:  18, bodyTempDeviationC: -0.06, recoveryIndex: 86, spo2Avg: 97, rhr: 49, vascularAge: 30, vo2max: 50, resilience: 'strong' },
  { date: d(29), activityScore: 78, steps:  8200, sedentaryMinutes: 558, metMinutes: 196, sleepScore: 77, sleepDeepMinutes: 72,  sleepRemMinutes: 88,  sleepEfficiency: 90, sleepLatencyMinutes: 14, sleepTotalMinutes: 396, readinessScore: 73, hrvBalance:   2, bodyTempDeviationC:  0.00, recoveryIndex: 76, spo2Avg: 96, rhr: 51, vascularAge: 31, vo2max: 49, resilience: 'solid' },
];

// Export ascending by date so consumers can `oura[oura.length - 1]` for "today".
export const ouraDaily: OuraDaily[] = [...desc].reverse();
