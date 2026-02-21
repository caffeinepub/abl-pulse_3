import { useEffect, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAssessment } from '../contexts/AssessmentContext';
import { useBasicInfoStorage } from '../hooks/useBasicInfoStorage';
import { LoadingScreen } from '../components/LoadingScreen';
import { Button } from '@/components/ui/button';
import { CircularScoreGauge } from '../components/CircularScoreGauge';
import { SectionScoreCard } from '../components/SectionScoreCard';
import { AnalysisCard } from '../components/AnalysisCard';
import { calculateScores, getSectionCategory } from '../utils/scoringUtils';
import { analyzeResponses } from '../utils/patternAnalysis';
import { usePDFDownload } from '../hooks/usePDFDownload';
import { openWhatsAppConsultation } from '../utils/whatsappIntegration';
import { ArrowLeft, Download, MessageCircle } from 'lucide-react';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { responses, language } = useAssessment();
  const { getBasicInfo } = useBasicInfoStorage();
  const [isLoading, setIsLoading] = useState(true);
  const [basicInfo, setBasicInfo] = useState(getBasicInfo());

  const { downloadPDF, isGenerating } = usePDFDownload();

  useEffect(() => {
    // Check if assessment is complete
    const allAnswered = Object.values(responses).every(r => r !== null && r !== undefined);
    if (!allAnswered) {
      navigate({ to: '/assessment/section1' });
      return;
    }
    setIsLoading(false);
  }, [responses, navigate]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const scores = calculateScores(responses);
  const analysis = analyzeResponses(responses);

  const sectionData = [
    {
      sectionNumber: 1,
      titleEn: 'Section 1: Foundation',
      titleHi: 'नींव',
      score: scores.section1,
      status: getSectionCategory(scores.section1),
      icon: '💧',
    },
    {
      sectionNumber: 2,
      titleEn: 'Section 2: Fuel',
      titleHi: 'अन्नार',
      score: scores.section2,
      status: getSectionCategory(scores.section2),
      icon: '🍵',
    },
    {
      sectionNumber: 3,
      titleEn: 'Section 3: Mind',
      titleHi: 'मन',
      score: scores.section3,
      status: getSectionCategory(scores.section3),
      icon: '🧘',
    },
    {
      sectionNumber: 4,
      titleEn: 'Section 4: Motion',
      titleHi: 'गति',
      score: scores.section4,
      status: getSectionCategory(scores.section4),
      icon: '🏃',
    },
  ];

  const handleDownloadPDF = () => {
    downloadPDF({
      totalScore: scores.total,
      sectionScores: sectionData,
      primaryProblems: analysis.primaryProblems,
      habitSuggestions: analysis.habitSuggestions,
      userName: basicInfo?.name || 'User',
    });
  };

  const handleBookConsultation = () => {
    openWhatsAppConsultation(
      basicInfo?.name || 'User',
      scores.total,
      basicInfo?.whatsappNumber
    );
  };

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
        {/* Title - Fixed text overflow with responsive sizing and proper wrapping */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2D5F3F] break-words max-w-full px-2">
            {language === 'en' ? 'The Organic Earth | Your Wellness Report' : 'द ऑर्गेनिक अर्थ | आपकी स्वास्थ्य रिपोर्ट'}
          </h1>
        </div>

        {/* Circular Score Gauge */}
        <div className="flex justify-center">
          <CircularScoreGauge 
            score={scores.total} 
            maxScore={160}
            status={scores.total >= 120 ? 'optimal' : scores.total >= 80 ? 'needsWork' : 'alert'}
          />
        </div>

        {/* Section Score Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionData.map((section) => (
            <SectionScoreCard
              key={section.sectionNumber}
              sectionNumber={section.sectionNumber}
              titleEn={section.titleEn}
              titleHi={section.titleHi}
              score={section.score}
              status={section.status}
              icon={section.icon}
              language={language}
            />
          ))}
        </div>

        {/* Analysis & Suggestions */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#2D5F3F] text-center">
            {language === 'en' ? 'Analysis & Suggestions' : 'विश्लेषण और सुझाव'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnalysisCard
              titleEn="Primary Problem"
              titleHi="मुख्य समस्या"
              items={analysis.primaryProblems}
              cardType="problems"
              language={language}
            />
            <AnalysisCard
              titleEn="Small Habit Suggestions"
              titleHi="छोटे सुझाव"
              items={analysis.habitSuggestions}
              cardType="suggestions"
              language={language}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 max-w-md mx-auto">
          <Button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="w-full bg-[#2D5F3F] hover:bg-[#1a3d28] text-white py-6 text-base font-medium"
          >
            <Download className="w-5 h-5 mr-2" />
            {isGenerating 
              ? (language === 'en' ? 'Generating Report...' : 'रिपोर्ट बनाई जा रही है...')
              : (language === 'en' ? 'Download PDF' : 'विज्ञापन पीडीएफ डाउनलोड करें')
            }
          </Button>

          <Button
            onClick={handleBookConsultation}
            className="w-full bg-[#2D5F3F] hover:bg-[#1a3d28] text-white py-6 text-base font-medium"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {language === 'en' ? 'Book Consultation' : 'वैद्यजी से बात करें'}
          </Button>
        </div>
      </main>
    </div>
  );
}
