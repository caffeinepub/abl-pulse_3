import { ScoreCategory } from '../utils/scoringUtils';

interface SectionScoreCardProps {
  sectionNumber: number;
  titleEn: string;
  titleHi: string;
  score: number;
  status: ScoreCategory;
  icon: string;
  language: 'en' | 'hi';
}

export function SectionScoreCard({
  titleEn,
  titleHi,
  score,
  status,
  icon,
  language,
}: SectionScoreCardProps) {
  const getStatusLabel = () => {
    switch (status) {
      case 'alert':
        return language === 'en' ? 'Alert' : 'बेतरतीबी';
      case 'needsWork':
        return language === 'en' ? 'Needs Work' : 'सुधार की भावनात';
      case 'optimal':
        return language === 'en' ? 'Good' : 'अच्छा';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'alert':
        return 'text-red-600 bg-red-50';
      case 'needsWork':
        return 'text-amber-600 bg-amber-50';
      case 'optimal':
        return 'text-green-600 bg-green-50';
    }
  };

  const getProgressBarColor = () => {
    switch (status) {
      case 'alert':
        return 'bg-red-500';
      case 'needsWork':
        return 'bg-amber-500';
      case 'optimal':
        return 'bg-green-500';
    }
  };

  const progressPercentage = (score / 40) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base">
            {titleEn}
          </h3>
          <p className="text-sm text-gray-600 mt-0.5">{titleHi}</p>
        </div>
        <div className="text-3xl ml-3">{icon}</div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">Score: {score}/40</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Status:</span>
        <span className={`text-sm font-semibold px-2 py-1 rounded ${getStatusColor()}`}>
          {getStatusLabel()}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full ${getProgressBarColor()} transition-all duration-500 ease-out`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
