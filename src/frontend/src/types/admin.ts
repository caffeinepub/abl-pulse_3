// Type definitions for admin dashboard data structures

export interface AdminAssessmentRow {
  id: number;
  userName: string;
  assessmentDate: Date;
  totalScore: number;
  sectionScores: {
    sleep: number;
    hydration: number;
    diet: number;
    exercise: number;
  };
  whatsappNumber: string;
  email: string | null;
}

export interface FilterState {
  searchTerm: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  scoreMin: number | null;
  scoreMax: number | null;
}

export type SortColumn = 'id' | 'userName' | 'assessmentDate' | 'totalScore' | 'sleep' | 'hydration' | 'diet' | 'exercise';
export type SortDirection = 'asc' | 'desc';

export interface SortState {
  column: SortColumn;
  direction: SortDirection;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}
