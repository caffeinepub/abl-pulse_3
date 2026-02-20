import { useNavigate } from '@tanstack/react-router';
import { useAssessment } from '../contexts/AssessmentContext';
import { section4Questions } from '../data/sections/section4';
import AssessmentProgressBar from '../components/AssessmentProgressBar';
import SectionContainer from '../components/SectionContainer';
import Navigation from '../components/Navigation';

export default function Section4() {
  const navigate = useNavigate();
  const { responses, language, updateResponse, setCurrentSection } = useAssessment();

  const handleNext = () => {
    navigate({ to: '/score-summary' });
  };

  const handlePrevious = () => {
    setCurrentSection(3);
    navigate({ to: '/assessment/section3' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-bg/50 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <Navigation />
      
      <div className="mx-auto max-w-4xl pt-20 md:pt-24">
        <AssessmentProgressBar currentSection={4} />
        
        <SectionContainer
          sectionNumber={4}
          questions={section4Questions}
          responses={responses}
          onResponseChange={updateResponse}
          language={language}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
}
