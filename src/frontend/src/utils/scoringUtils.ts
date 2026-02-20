// Real score calculation from assessment responses
export interface SectionScore {
  sectionNumber: number;
  score: number;
  maxScore: number;
  title: string;
  icon: string;
}

export interface CalculatedScores {
  section1: number;
  section2: number;
  section3: number;
  section4: number;
  total: number;
}

/**
 * Calculate individual section scores from assessment responses
 * Section 1: Questions 1-10
 * Section 2: Questions 11-20
 * Section 3: Questions 21-30
 * Section 4: Questions 31-40
 */
export function calculateScores(responses: Record<number, number | null>): CalculatedScores {
  const section1 = calculateSectionScore(responses, 1, 10);
  const section2 = calculateSectionScore(responses, 11, 20);
  const section3 = calculateSectionScore(responses, 21, 30);
  const section4 = calculateSectionScore(responses, 31, 40);
  
  return {
    section1,
    section2,
    section3,
    section4,
    total: section1 + section2 + section3 + section4,
  };
}

function calculateSectionScore(
  responses: Record<number, number | null>,
  startQuestion: number,
  endQuestion: number
): number {
  let score = 0;
  for (let i = startQuestion; i <= endQuestion; i++) {
    const response = responses[i];
    if (response !== null && response !== undefined) {
      score += response;
    }
  }
  return score;
}

export function getSectionScores(responses: Record<number, number | null>): SectionScore[] {
  const scores = calculateScores(responses);
  
  return [
    {
      sectionNumber: 1,
      score: scores.section1,
      maxScore: 40,
      title: 'Sleep & Hydration',
      icon: '💧',
    },
    {
      sectionNumber: 2,
      score: scores.section2,
      maxScore: 40,
      title: 'Gut Cleanse',
      icon: '🫘',
    },
    {
      sectionNumber: 3,
      score: scores.section3,
      maxScore: 40,
      title: 'Movement & Breath',
      icon: '🏃',
    },
    {
      sectionNumber: 4,
      score: scores.section4,
      maxScore: 40,
      title: 'Nutrition & Fuel',
      icon: '🍎',
    },
  ];
}

export type ScoreCategory = 'alert' | 'needsWork' | 'optimal';

// Section-wise ranges (out of 40)
export function getSectionCategory(score: number): ScoreCategory {
  if (score >= 0 && score <= 20) return 'alert';
  if (score >= 21 && score <= 30) return 'needsWork';
  return 'optimal'; // 31-40
}

// Total score ranges (out of 160)
export function getTotalScoreCategory(score: number): ScoreCategory {
  if (score >= 0 && score <= 79) return 'alert';
  if (score >= 80 && score <= 119) return 'needsWork';
  return 'optimal'; // 120-160
}

export function getSectionCategoryLabel(category: ScoreCategory): string {
  switch (category) {
    case 'alert':
      return 'Alert';
    case 'needsWork':
      return 'Needs Work';
    case 'optimal':
      return 'Optimal';
  }
}

export function getTotalScoreCategoryLabel(category: ScoreCategory): string {
  switch (category) {
    case 'alert':
      return 'Red (Alert)';
    case 'needsWork':
      return 'Amber Zone (Needs Focus)';
    case 'optimal':
      return 'Neem Green (Optimal)';
  }
}

export function getCategoryColor(category: ScoreCategory): string {
  switch (category) {
    case 'alert':
      return 'text-red-600';
    case 'needsWork':
      return 'text-amber-600';
    case 'optimal':
      return 'text-green-600';
  }
}

export function getCategoryBorderColor(category: ScoreCategory): string {
  switch (category) {
    case 'alert':
      return 'border-red-500';
    case 'needsWork':
      return 'border-amber-500';
    case 'optimal':
      return 'border-green-500';
  }
}

export function getCategoryTopBorderColor(category: ScoreCategory): string {
  switch (category) {
    case 'alert':
      return 'border-t-red-500';
    case 'needsWork':
      return 'border-t-amber-500';
    case 'optimal':
      return 'border-t-green-500';
  }
}
