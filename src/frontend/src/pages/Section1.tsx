import { useNavigate } from '@tanstack/react-router';
import { useAssessment } from '../contexts/AssessmentContext';
import { section1Questions } from '../data/sections/section1';
import AssessmentProgressBar from '../components/AssessmentProgressBar';
import GlobalAssessmentOptions from '../components/GlobalAssessmentOptions';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Section1() {
  const navigate = useNavigate();
  const { responses, language, updateResponse, setCurrentSection, isSectionComplete } = useAssessment();

  const handleNext = () => {
    if (isSectionComplete(1)) {
      setCurrentSection(2);
      navigate({ to: '/assessment/section2' });
    }
  };

  const handlePrevious = () => {
    navigate({ to: '/assessment' });
  };

  const isComplete = isSectionComplete(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-bg/50 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <Navigation />
      
      <div className="mx-auto max-w-4xl pt-20 md:pt-24">
        <AssessmentProgressBar currentSection={1} />
        
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Section Title and Subtitle */}
          <div className="text-center space-y-6 mb-8">
            <div className="space-y-3">
              <h2 className="font-heading text-2xl font-bold text-brand-primary sm:text-3xl">
                Sleep & Hydration Routine Assessment
              </h2>
              <h2 className="font-heading text-2xl font-bold text-brand-primary sm:text-3xl">
                नींद और हाइड्रेशन
              </h2>
            </div>
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Assess Your Current Sleep & Hydration Habits to Identify Areas for Improvement.
              </p>
              <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
                अपनी नींद और हाइड्रेशन को परखें; बेहतर कल के लिए आज ही सुधारें।
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {section1Questions.map((question) => (
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
