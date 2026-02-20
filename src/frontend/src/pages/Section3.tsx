import { useNavigate } from '@tanstack/react-router';
import { useAssessment } from '../contexts/AssessmentContext';
import { section3Questions } from '../data/sections/section3';
import AssessmentProgressBar from '../components/AssessmentProgressBar';
import SectionContainer from '../components/SectionContainer';
import Navigation from '../components/Navigation';

export default function Section3() {
  const navigate = useNavigate();
  const { responses, language, updateResponse, setCurrentSection } = useAssessment();

  const handleNext = () => {
    setCurrentSection(4);
    navigate({ to: '/assessment/section4' });
  };

  const handlePrevious = () => {
    setCurrentSection(2);
    navigate({ to: '/assessment/section2' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-bg/50 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <Navigation />
      
      <div className="mx-auto max-w-4xl pt-20 md:pt-24">
        <AssessmentProgressBar currentSection={3} />
        
        <SectionContainer
          sectionNumber={3}
          questions={section3Questions}
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
