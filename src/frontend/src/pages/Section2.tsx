import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAssessment } from '../contexts/AssessmentContext';
import { section2Questions } from '../data/sections/section2';
import AssessmentProgressBar from '../components/AssessmentProgressBar';
import GlobalAssessmentOptions from '../components/GlobalAssessmentOptions';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Section2() {
  const navigate = useNavigate();
  const { responses, language, updateResponse, setCurrentSection, isSectionComplete, canAccessSection } = useAssessment();

  // Guard: Check if user can access Section 2
  useEffect(() => {
    if (!canAccessSection(2)) {
      navigate({ to: '/assessment/section1' });
    }
  }, [canAccessSection, navigate]);

  const handleNext = () => {
    if (isSectionComplete(2)) {
      setCurrentSection(3);
      navigate({ to: '/assessment/section3' });
    }
  };

  const handlePrevious = () => {
    setCurrentSection(1);
    navigate({ to: '/assessment/section1' });
  };

  const isComplete = isSectionComplete(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-bg/50 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <Navigation />
      
      <div className="mx-auto max-w-4xl pt-20 md:pt-24">
        <AssessmentProgressBar currentSection={2} />
        
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Section Title and Subtitle */}
          <div className="text-center space-y-6 mb-8">
            <div className="space-y-3">
              <h2 className="font-heading text-2xl font-bold text-brand-primary sm:text-3xl">
                Gut Cleanse & Metabolic
              </h2>
              <h2 className="font-heading text-2xl font-bold text-brand-primary sm:text-3xl">
                पेट की सफाई और पाचन
              </h2>
            </div>
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
                This Section Helps You Understand The Current State of Your Digestion, Metabolism & Daily Food Habits.
              </p>
              <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
                यह हिस्सा आपको आपकी पाचन शक्ति, मेटाबॉलिज्म और खाने-पीने की अभी की आदतों को बेहतर तरीके से समझने में मदद करेगा।
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {section2Questions.map((question) => (
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
              onClick={handleNext}
              disabled={!isComplete}
              className="min-h-[44px] flex-1 bg-brand-accent text-white hover:bg-brand-accent/90 disabled:opacity-50 disabled:cursor-not-allowed sm:flex-none sm:px-8"
            >
              {language === 'en' ? 'Next' : 'अगला'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
