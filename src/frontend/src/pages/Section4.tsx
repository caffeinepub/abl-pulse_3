import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAssessment } from '../contexts/AssessmentContext';
import { section4Questions } from '../data/sections/section4';
import AssessmentProgressBar from '../components/AssessmentProgressBar';
import GlobalAssessmentOptions from '../components/GlobalAssessmentOptions';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CheckCircle } from 'lucide-react';

export default function Section4() {
  const navigate = useNavigate();
  const { responses, language, updateResponse, isSectionComplete, canAccessSection } = useAssessment();

  // Guard: Check if user can access Section 4
  useEffect(() => {
    if (!canAccessSection(4)) {
      // Redirect to the first incomplete section
      if (!canAccessSection(2)) {
        navigate({ to: '/assessment/section1' });
      } else if (!canAccessSection(3)) {
        navigate({ to: '/assessment/section2' });
      } else {
        navigate({ to: '/assessment/section3' });
      }
    }
  }, [canAccessSection, navigate]);

  const handleComplete = () => {
    // Verify all 40 questions are answered before navigating to results
    const allComplete = isSectionComplete(1) && isSectionComplete(2) && isSectionComplete(3) && isSectionComplete(4);
    
    if (allComplete) {
      navigate({ to: '/score-summary' });
    }
  };

  const handlePrevious = () => {
    navigate({ to: '/assessment/section3' });
  };

  const isComplete = isSectionComplete(4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-bg/50 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <Navigation />
      
      <div className="mx-auto max-w-4xl pt-20 md:pt-24">
        <AssessmentProgressBar currentSection={4} />
        
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Section Title and Subtitle */}
          <div className="text-center space-y-6 mb-8">
            <div className="space-y-3">
              <h2 className="font-heading text-2xl font-bold text-brand-primary sm:text-3xl">
                Mind & Emotional Balance
              </h2>
              <h2 className="font-heading text-2xl font-bold text-brand-primary sm:text-3xl">
                मन, तनाव और संबंध
              </h2>
            </div>
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
                This part helps you get a clear look at your stress, how emotionally balanced you feel, and how well you are getting along with others.
              </p>
              <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
                यह हिस्सा आपको अपने तनाव, मन की शांति और रिश्तों में तालमेल को बेहतर तरीके से समझने में मदद करेगा।
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {section4Questions.map((question) => (
              <div key={question.id} className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-4 text-lg font-semibold text-brand-primary">
                  {language === 'en' ? question.text_en : question.text_hi}
                </h3>
                <GlobalAssessmentOptions
                  questionId={question.id}
                  selectedValue={responses[question.id]}
                  onChange={updateResponse}
                  language={language}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 pt-6">
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="min-h-[44px] flex-1 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white sm:flex-none sm:px-8"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              {language === 'en' ? 'Previous' : 'पिछला'}
            </Button>

            <Button
              onClick={handleComplete}
              disabled={!isComplete}
              className="min-h-[44px] flex-1 bg-brand-accent text-white hover:bg-brand-accent/90 disabled:opacity-50 disabled:cursor-not-allowed sm:flex-none sm:px-8"
            >
              {language === 'en' ? 'Complete Assessment' : 'मूल्यांकन पूर्ण करें'}
              <CheckCircle className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
