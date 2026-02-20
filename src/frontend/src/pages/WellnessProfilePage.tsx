import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, User } from 'lucide-react';
import { useAssessment } from '../contexts/AssessmentContext';
import { useBasicInfoStorage } from '../hooks/useBasicInfoStorage';
import {
  calculateScores,
  getSectionScores,
  getSectionCategory,
  getTotalScoreCategory,
  getSectionCategoryLabel,
  getTotalScoreCategoryLabel,
  getCategoryColor,
  getCategoryTopBorderColor,
} from '../utils/scoringUtils';

export default function WellnessProfilePage() {
  const navigate = useNavigate();
  const { responses } = useAssessment();
  const { getBasicInfo } = useBasicInfoStorage();
  
  const basicInfo = getBasicInfo();
  const scores = calculateScores(responses);
  const sectionScores = getSectionScores(responses);
  const totalCategory = getTotalScoreCategory(scores.total);
  
  // Format today's date as "DD MMM YYYY"
  const formatDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'short' });
    const year = today.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold text-lg">Your Wellness Profile</span>
          </button>
          <span className="text-sm text-gray-600">{formatDate()}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {basicInfo?.name || 'N/A'}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Age:</span> {basicInfo?.age || 'N/A'}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Sex:</span> {basicInfo?.gender || 'N/A'}
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* Total Score Section */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">
            TOTAL ABL SCORE: {scores.total} / 160
          </h2>
          <p className={`text-lg font-semibold ${getCategoryColor(totalCategory)}`}>
            Status: {getTotalScoreCategoryLabel(totalCategory)}
          </p>
        </div>

        {/* Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionScores.map((section) => {
            const category = getSectionCategory(section.score);
            return (
              <div
                key={section.sectionNumber}
                className={`bg-white rounded-lg shadow-md p-6 border-t-8 ${getCategoryTopBorderColor(category)}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{section.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      S{section.sectionNumber} {section.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {section.score}/{section.maxScore}
                    </p>
                    <p className={`text-sm font-medium ${getCategoryColor(category)}`}>
                      ({getSectionCategoryLabel(category)})
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate({ to: '/recommendations' })}
          className="w-full py-4 px-6 text-white font-semibold rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-2"
          style={{ backgroundColor: '#004225' }}
        >
          VIEW RECOMMENDATIONS →
        </button>
      </main>
    </div>
  );
}
