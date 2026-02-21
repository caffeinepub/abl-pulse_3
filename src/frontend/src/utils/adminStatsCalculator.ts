import { AdminAssessmentRow } from '@/types/admin';
import { SCORE_THRESHOLDS } from '@/config/constants';

/**
 * Calculate total number of assessments
 */
export function calculateTotalAssessments(data: AdminAssessmentRow[]): number {
  return data.length;
}

/**
 * Calculate average total score across all assessments
 */
export function calculateAverageScore(data: AdminAssessmentRow[]): number {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, row) => acc + row.totalScore, 0);
  return Math.round((sum / data.length) * 10) / 10; // Round to 1 decimal
}

/**
 * Count users with total score below alert threshold
 */
export function calculateAlertUsers(data: AdminAssessmentRow[]): number {
  return data.filter((row) => row.totalScore <= SCORE_THRESHOLDS.TOTAL.ALERT_MAX).length;
}

/**
 * Count assessments submitted in the last 7 days
 */
export function calculateRecentSubmissions(data: AdminAssessmentRow[]): number {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return data.filter((row) => row.assessmentDate >= sevenDaysAgo).length;
}
