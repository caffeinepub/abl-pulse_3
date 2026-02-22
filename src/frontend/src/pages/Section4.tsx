import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useAssessment } from '../contexts/AssessmentContext';
import { section4Questions } from '../data/sections/section4';
import AssessmentProgressBar from '../components/AssessmentProgressBar';
import GlobalAssessmentOptions from '../components/GlobalAssessmentOptions';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useSubmitAssessment } from '../hooks/useQueries';
import { useBasicInfoStorage } from '../hooks/useBasicInfoStorage';
import { calculateScores } from '../utils/scoringUtils';
import { analyzeResponses } from '../utils/patternAnalysis';
import { SectionId, type AssessmentSubmission, type SolutionTip, Variant_low_high_medium, Variant_long_short_medium, Variant_low_high_none, Variant_all_elderly_pregnant_youth } from '../backend';
import { toast } from 'sonner';

export default function Section4() {
  const navigate = useNavigate();
  const { responses, language, updateResponse, isSectionComplete, canAccessSection } = useAssessment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getBasicInfo } = useBasicInfoStorage();
  const submitAssessmentMutation = useSubmitAssessment();

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
    console.log('Complete Assessment button clicked');
    
    // Verify all 40 questions are answered before submitting
    const allComplete = isSectionComplete(1) && isSectionComplete(2) && isSectionComplete(3) && isSectionComplete(4);
    
    console.log('Section completion status:', {
      section1: isSectionComplete(1),
      section2: isSectionComplete(2),
      section3: isSectionComplete(3),
      section4: isSectionComplete(4),
      allComplete
    });
    
    if (!allComplete) {
      toast.error(language === 'en' ? 'Please complete all sections' : 'कृपया सभी अनुभाग पूरे करें');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get basic info from localStorage
      const basicInfo = getBasicInfo();
      console.log('Basic info retrieved:', basicInfo);
      
      if (!basicInfo) {
        throw new Error('Basic information not found');
      }

      // Calculate section scores
      const scores = calculateScores(responses);
      console.log('Calculated scores:', scores);

      // Run pattern analysis to get problems and suggestions
      const analysis = analyzeResponses(responses);
      console.log('Analysis results:', analysis);

      // Map responses to backend format
      // Section 1 (Q1-10): Sleep & Hydration → sleep
      // Section 2 (Q11-20): Gut Cleanse → diet
      // Section 3 (Q21-30): Movement → exercise
      // Section 4 (Q31-40): Mind & Emotional → hydration (mapping to available field)
      const sleepAnswers: bigint[] = [];
      const hydrationAnswers: bigint[] = [];
      const dietAnswers: bigint[] = [];
      const exerciseAnswers: bigint[] = [];

      for (let i = 1; i <= 10; i++) {
        sleepAnswers.push(BigInt(responses[i] ?? 0));
      }
      for (let i = 11; i <= 20; i++) {
        dietAnswers.push(BigInt(responses[i] ?? 0));
      }
      for (let i = 21; i <= 30; i++) {
        exerciseAnswers.push(BigInt(responses[i] ?? 0));
      }
      for (let i = 31; i <= 40; i++) {
        hydrationAnswers.push(BigInt(responses[i] ?? 0));
      }

      // Create medical history object from basic info
      const medicalHistory = {
        hasProblemsWithBloodPressure: basicInfo.medicalHistory?.bloodPressure || false,
        hasProblemsWithSugar: basicInfo.medicalHistory?.sugar || false,
        hasProblemsWithKidney: false,
        hasProblemsWithPregnancy: false,
        hasProblemsWithAnemia: false,
        hasProblemsWithHeartProblems: false,
        hasProblemsWithThyroid: basicInfo.medicalHistory?.thyroid || false,
        hasProblemsWithCholesterol: false,
        hasProblemsWithHighBMI: false,
        hasProblemsWithAlcoholUse: false,
      };

      // Create recommendations array (simplified for now)
      const recommendations: SolutionTip[] = analysis.habitSuggestions.slice(0, 3).map((suggestion) => ({
        section: SectionId.sleep,
        text: suggestion,
        severity: Variant_low_high_medium.medium,
        costLevel: Variant_low_high_medium.low,
        timeCommitment: Variant_long_short_medium.short_,
        medicalRisk: Variant_low_high_none.none,
        suitability: Variant_all_elderly_pregnant_youth.all,
        medicalFitForBloodPressure: true,
        medicalFitForSugar: true,
        medicalFitForKidney: true,
        medicalFitForPregnancy: true,
        medicalFitForAnemia: true,
        medicalFitForHeartProblems: true,
        medicalFitForThyroid: true,
        medicalFitForCholesterol: true,
        medicalFitForHighBMI: true,
        medicalFitForAlcoholUse: true,
      }));

      // Create submission object
      const submission: AssessmentSubmission = {
        user: {
          name: basicInfo.name,
        },
        healthProfile: {
          answers: {
            sleep: sleepAnswers,
            hydration: hydrationAnswers,
            diet: dietAnswers,
            exercise: exerciseAnswers,
          },
          medicalHistory,
        },
        scores: {
          sleep: BigInt(scores.section1),
          hydration: BigInt(scores.section4), // Mind & Emotional mapped to hydration
          diet: BigInt(scores.section2),
          exercise: BigInt(scores.section3),
        },
        recommendations,
        problems: analysis.primaryProblems,
        timestamp: BigInt(Date.now() * 1_000_000), // Convert to nanoseconds
      };

      console.log('Submitting assessment to backend:', submission);

      // Submit to backend
      const assessmentId = await submitAssessmentMutation.mutateAsync(submission);
      
      console.log('Assessment submitted successfully with ID:', assessmentId);

      // Show success message
      toast.success(
        language === 'en' 
          ? 'Assessment submitted successfully!' 
          : 'मूल्यांकन सफलतापूर्वक सबमिट किया गया!'
      );

      // Navigate to results page after a short delay
      setTimeout(() => {
        navigate({ to: '/results' });
      }, 500);
      
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setIsSubmitting(false);
      
      // Show error message with more details
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Detailed error:', errorMessage);
      
      toast.error(
        language === 'en'
          ? `Failed to submit assessment: ${errorMessage}`
          : `मूल्यांकन सबमिट करने में विफल: ${errorMessage}`
      );
    }
  };

  const handlePrevious = () => {
    navigate({ to: '/assessment/section3' });
  };

  const isComplete = isSectionComplete(4);
  
  // Debug log for button state
  console.log('Button state:', { isComplete, isSubmitting, disabled: !isComplete || isSubmitting });

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
                {language === 'en' ? 'Submitting your assessment...' : 'आपका मूल्यांकन सबमिट हो रहा है...'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Please wait while we save your responses' 
                  : 'कृपया प्रतीक्षा करें जब तक हम आपके उत्तर सहेजते हैं'}
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
                  {language === 'en' ? 'Submitting...' : 'सबमिट हो रहा है...'}
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
