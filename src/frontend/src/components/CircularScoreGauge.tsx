import { ScoreCategory } from '../utils/scoringUtils';

interface CircularScoreGaugeProps {
  score: number;
  maxScore: number;
  status: ScoreCategory;
}

export function CircularScoreGauge({ score, maxScore, status }: CircularScoreGaugeProps) {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine colors based on status
  const getColors = () => {
    switch (status) {
      case 'alert':
        return { start: '#DC2626', end: '#EF4444' }; // red
      case 'needsWork':
        return { start: '#D97706', end: '#F59E0B' }; // amber
      case 'optimal':
        return { start: '#2D5F3F', end: '#16A34A' }; // green
    }
  };

  const colors = getColors();

  return (
    <div className="relative w-64 h-64">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="16"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
        </defs>

        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-5xl font-bold text-gray-900">
          {score}
          <span className="text-2xl text-gray-500">/{maxScore}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">Average Score</div>
      </div>
    </div>
  );
}
