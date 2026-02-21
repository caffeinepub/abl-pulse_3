import { useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAssessment } from '../contexts/AssessmentContext';
import { useBasicInfoStorage } from '../hooks/useBasicInfoStorage';
import { calculateScores, getSectionCategory, getSectionCategoryLabel, getCategoryTopBorderColor } from '../utils/scoringUtils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ScoreSummaryPage() {
  const navigate = useNavigate();
  const { responses, language } = useAssessment();
  const { getBasicInfo } = useBasicInfoStorage();

  useEffect(() => {
    // Check if all 40 responses are complete
    const allAnswered = Object.values(responses).every(r => r !== null && r !== undefined);
    if (!allAnswered) {
      navigate({ to: '/assessment/section1' });
    }
  }, [responses, navigate]);

  const basicInfo = getBasicInfo();
  const scores = calculateScores(responses);

  const sectionData = [
    { number: 1, title: 'Sleep & Hydration', score: scores.section1 },
    { number: 2, title: 'Gut Cleanse', score: scores.section2 },
    { number: 3, title: 'Movement & Breath', score: scores.section3 },
    { number: 4, title: 'Nutrition & Fuel', score: scores.section4 },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#2D5F3F] hover:text-[#1a3d28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </Link>
          <img 
            src="/assets/ABL Logo (6).png" 
            alt="ABL Pulse" 
            className="h-10"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* User Info Box */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
          <h2 className="text-xl font-bold text-[#2D5F3F]">
            {language === 'en' ? 'Your Assessment Summary' : 'आपका मूल्यांकन सारांश'}
          </h2>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Name:</span> {basicInfo?.name || 'N/A'}</p>
            <p><span className="font-semibold">Total Score:</span> {scores.total}/160</p>
            <p>
              <span className="font-semibold">Status:</span>{' '}
              {scores.total >= 120 ? 'Neem Green (Optimal)' : scores.total >= 80 ? 'Amber Zone (Needs Focus)' : 'Red (Alert)'}
            </p>
          </div>
        </div>

        {/* Section Scores */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#2D5F3F]">
            {language === 'en' ? 'Section Scores' : 'अनुभाग स्कोर'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectionData.map((section) => {
              const category = getSectionCategory(section.score);
              const borderColor = getCategoryTopBorderColor(category);
              return (
                <div
                  key={section.number}
                  className={`bg-white rounded-lg shadow-md p-5 border-t-4 ${borderColor}`}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Section {section.number}: {section.title}
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {section.score}/40
                  </p>
                  <p className="text-sm text-gray-600">
                    {getSectionCategoryLabel(category)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 max-w-md mx-auto">
          <Button
            onClick={() => navigate({ to: '/results' })}
            className="w-full bg-[#2D5F3F] hover:bg-[#1a3d28] text-white py-6 text-base font-medium"
          >
            {language === 'en' ? 'View Detailed Report' : 'विस्तृत रिपोर्ट देखें'}
          </Button>

          <Button
            onClick={() => navigate({ to: '/recommended-services' })}
            className="w-full bg-[#2D5F3F] hover:bg-[#1a3d28] text-white py-6 text-base font-medium"
          >
            {language === 'en' ? 'Continue to Services' : 'सेवाओं पर जाएं'}
          </Button>
        </div>
      </main>
    </div>
  );
}
