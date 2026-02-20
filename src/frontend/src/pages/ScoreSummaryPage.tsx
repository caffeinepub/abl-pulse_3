import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, User } from 'lucide-react';
import { useBasicInfoStorage } from '../hooks/useBasicInfoStorage';
import { useAssessment } from '../contexts/AssessmentContext';
import { getSectionScores, getSectionCategory, getCategoryTopBorderColor } from '../utils/scoringUtils';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function ScoreSummaryPage() {
  const navigate = useNavigate();
  const { getBasicInfo } = useBasicInfoStorage();
  const { responses } = useAssessment();
  const basicInfo = getBasicInfo();
  const sectionScores = getSectionScores(responses);

  const formatDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleBack = () => {
    navigate({ to: '/assessment/section4' });
  };

  const handleViewRecommendations = () => {
    navigate({ to: '/recommended-services' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-bg/50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2 text-brand-text hover:text-brand-primary"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">LAST PAGE</span>
          </Button>
          <span className="text-sm font-medium text-brand-text/70">{formatDate()}</span>
        </div>

        {/* Title */}
        <h1 className="mb-8 text-center font-['Playfair_Display'] text-3xl font-bold text-brand-text md:text-4xl">
          USER SCORE SUMMARY
        </h1>

        {/* User Info Card */}
        <Card className="mb-8 p-6 shadow-lg">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-bg">
              <User className="h-10 w-10 text-brand-primary" />
            </div>
            <div className="flex-1">
              <h2 className="mb-3 font-semibold text-brand-text">USER INFO</h2>
              <div className="grid gap-1 text-sm text-brand-text/80">
                <p>
                  <span className="font-medium">Name:</span> {basicInfo?.name || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Age:</span> {basicInfo?.age || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Sex:</span> {basicInfo?.gender || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Section Score Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {sectionScores.map((section) => {
            const category = getSectionCategory(section.score);
            return (
              <Card
                key={section.sectionNumber}
                className={`bg-white overflow-hidden shadow-lg transition-transform hover:scale-105 border-t-8 ${getCategoryTopBorderColor(category)}`}
              >
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900">S{section.sectionNumber}</h3>
                    <span className="text-3xl">{section.icon}</span>
                  </div>
                  <h4 className="mb-3 font-semibold text-gray-900">{section.title}</h4>
                  <div className="text-2xl font-bold text-gray-900">
                    [{section.score}/{section.maxScore}]
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* View Recommendations Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleViewRecommendations}
            size="lg"
            className="w-full bg-brand-primary px-12 py-6 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-brand-primary/90 sm:w-auto"
          >
            VIEW RECOMMENDATIONS
          </Button>
        </div>
      </div>
    </div>
  );
}
