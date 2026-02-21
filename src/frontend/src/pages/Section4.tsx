import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useAssessment } from '../contexts/AssessmentContext';
import { section4Questions } from '../data/sections/section4';
import AssessmentProgressBar from '../components/AssessmentProgressBar';
import GlobalAssessmentOptions from '../components/GlobalAssessmentOptions';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CheckCircle, Loader2 } from 'lucide-react';

export default function Section4() {
  const navigate = useNavigate();
  const { responses, language, updateResponse, isSectionComplete, canAccessSection } = useAssessment();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleComplete = async () => {
    // Verify all 40 questions are answered before navigating to results
    const allComplete = isSectionComplete(1) && isSectionComplete(2) && isSectionComplete(3) && isSectionComplete(4);
    
    if (allComplete) {
      setIsSubmitting(true);
      
      try {
        // Simulate backend save operation
        // In a real implementation, you would call the backend here
        // await saveAssessmentToBackend(responses);
        
        // Add a small delay to show the loading state
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Navigate to results page
        navigate({ to: '/results' });
      } catch (error) {
        console.error('Error saving assessment:', error);
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    navigate({ to: '/assessment/section3' });
  };

  const isComplete = isSectionComplete(4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-bg/50 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <Navigation />
      
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Loader2 className="h-16 w-16 text-brand-accent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-brand-accent/30" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-brand-primary">
                {language === 'en' ? 'Calculating your wellness score...' : 'आपके स्वास्थ्य स्कोर की गणना हो रही है...'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Please wait while we analyze your responses' 
                  : 'कृपया प्रतीक्षा करें जब तक हम आपके उत्तरों का विश्लेषण करते हैं'}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-accent to-brand-primary animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      )}
      
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
              disabled={isSubmitting}
              className="min-h-[44px] flex-1 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white sm:flex-none sm:px-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              {language === 'en' ? 'Previous' : 'पिछला'}
            </Button>

            <Button
              onClick={handleComplete}
              disabled={!isComplete || isSubmitting}
              className="min-h-[44px] flex-1 bg-brand-accent text-white hover:bg-brand-accent/90 disabled:opacity-50 disabled:cursor-not-allowed sm:flex-none sm:px-8"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {language === 'en' ? 'Processing...' : 'प्रक्रिया में...'}
                </>
              ) : (
                <>
                  {language === 'en' ? 'Complete Assessment' : 'मूल्यांकन पूर्ण करें'}
                  <CheckCircle className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
