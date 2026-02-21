import { AdminAssessmentRow } from '@/types/admin';

/**
 * Escape CSV field value
 */
function escapeCSVField(value: string | number | null): string {
  if (value === null || value === undefined) return '';
  const stringValue = String(value);
  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

/**
 * Format assessment data for CSV export
 */
export function formatAssessmentDataForCSV(data: AdminAssessmentRow[]): string[][] {
  const headers = [
    'Name',
    'Assessment Date',
    'Total Score',
    'Sleep Score',
    'Hydration Score',
    'Diet Score',
    'Exercise Score',
    'WhatsApp Number',
    'Email',
  ];

  const rows = data.map((row) => [
    row.userName,
    row.assessmentDate.toLocaleDateString('en-IN'),
    row.totalScore.toString(),
    row.sectionScores.sleep.toString(),
    row.sectionScores.hydration.toString(),
    row.sectionScores.diet.toString(),
    row.sectionScores.exercise.toString(),
    row.whatsappNumber,
    row.email || '',
  ]);

  return [headers, ...rows];
}

/**
 * Generate CSV string from data rows
 */
export function generateCSV(data: string[][]): string {
  return data.map((row) => row.map(escapeCSVField).join(',')).join('\n');
}

/**
 * Trigger browser download of CSV file
 */
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
