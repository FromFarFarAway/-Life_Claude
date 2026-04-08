// Toggl-derived signals only. Per Ver 3 §4.5 we never expose raw entries,
// employer names, or project names — just the aggregate sleep-pressure /
// sedentary fields the coach actually uses.

export interface TogglDerived {
  windowDays: number;
  late_work_nights_last_14d: number;
  avg_work_block_minutes: number;
  continuous_sedentary_blocks: number;
  weeks_with_overload: number; // weeks > 45h tracked
}

export const togglDerived: TogglDerived = {
  windowDays: 30,
  late_work_nights_last_14d: 5, // five nights with sessions past 22:00 in last 14d
  avg_work_block_minutes: 92,
  continuous_sedentary_blocks: 11,
  weeks_with_overload: 2,
};
