import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useActor } from '../hooks/useActor';
import { LoadingScreen } from '../components/LoadingScreen';
import { CircularScoreGauge } from '../components/CircularScoreGauge';
import { SectionScoreCard } from '../components/SectionScoreCard';
import { AnalysisCard } from '../components/AnalysisCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { processTestProfile } from '../utils/testDataProcessor';
import type { SectionScores, MedicalHistory } from '../backend';

interface TestProfile {
  name: string;
  description: string;
  scores: SectionScores;
  medicalHistory: MedicalHistory;
  totalScore: number;
  sectionData: Array<{
    sectionNumber: number;
    titleEn: string;
    titleHi: string;
    score: number;
    status: 'alert' | 'needsWork' | 'optimal';
    icon: string;
  }>;
  analysis: {
    primaryProblems: string[];
    habitSuggestions: string[];
  };
}

export default function TestModePage() {
  const { actor, isFetching } = useActor();
  const [isLoading, setIsLoading] = useState(true);
  const [testProfiles, setTestProfiles] = useState<TestProfile[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTestData() {
      if (!actor || isFetching) return;

      try {
        setIsLoading(true);
        const [healthyScores, moderateScores, seriousScores, healthyMedical, moderateMedical, seriousMedical] = 
          await actor.getTestData();

        const profiles: TestProfile[] = [
          {
            name: 'Healthy Profile',
            description: 'All sections scoring 30-40 (Good status), no medical history',
            scores: healthyScores,
            medicalHistory: healthyMedical,
            ...processTestProfile(healthyScores, healthyMedical),
          },
          {
            name: 'Moderate Issues',
            description: 'Mixed scores 21-30 (Needs Work), with BP medical history',
            scores: moderateScores,
            medicalHistory: moderateMedical,
            ...processTestProfile(moderateScores, moderateMedical),
          },
          {
            name: 'Serious Concerns',
            description: 'Low scores 0-20 (Alert status), with Sugar + BP medical history',
            scores: seriousScores,
            medicalHistory: seriousMedical,
            ...processTestProfile(seriousScores, seriousMedical),
          },
        ];

        setTestProfiles(profiles);
        setError(null);
      } catch (err) {
        console.error('Error loading test data:', err);
        setError('Failed to load test data from backend');
      } finally {
        setIsLoading(false);
      }
    }

    loadTestData();
  }, [actor, isFetching]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
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
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Internal Testing Banner */}
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-900 font-semibold">Internal Testing Only</AlertTitle>
          <AlertDescription className="text-amber-800">
            This page is for developer testing and pattern verification. It displays three test profiles with different score patterns and medical histories.
          </AlertDescription>
        </Alert>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D5F3F]">
            Test Mode: Pattern Verification
          </h1>
          <p className="text-gray-600">
            Verify scoring calculations, pattern detection, and solution mapping
          </p>
        </div>

        {/* Tabs for Test Profiles */}
        <Tabs defaultValue="profile-0" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            {testProfiles.map((profile, index) => (
              <TabsTrigger key={index} value={`profile-${index}`}>
                {profile.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {testProfiles.map((profile, index) => (
            <TabsContent key={index} value={`profile-${index}`} className="space-y-8 mt-6">
              {/* Profile Description */}
              <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
                <h2 className="text-xl font-bold text-[#2D5F3F]">{profile.name}</h2>
                <p className="text-gray-700">{profile.description}</p>
                
                {/* Medical History Display */}
                <div className="pt-3 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Medical History:</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.medicalHistory.hasProblemsWithBloodPressure && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        BP
                      </span>
                    )}
                    {profile.medicalHistory.hasProblemsWithSugar && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        Sugar
                      </span>
                    )}
                    {!profile.medicalHistory.hasProblemsWithBloodPressure && 
                     !profile.medicalHistory.hasProblemsWithSugar && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        None
                      </span>
                    )}
                  </div>
                </div>

                {/* Raw Scores Display */}
                <div className="pt-3 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Raw Section Scores:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="text-gray-600">Sleep:</span>{' '}
                      <span className="font-semibold">{Number(profile.scores.sleep)}/40</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="text-gray-600">Hydration:</span>{' '}
                      <span className="font-semibold">{Number(profile.scores.hydration)}/40</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="text-gray-600">Exercise:</span>{' '}
                      <span className="font-semibold">{Number(profile.scores.exercise)}/40</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="text-gray-600">Diet:</span>{' '}
                      <span className="font-semibold">{Number(profile.scores.diet)}/40</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Circular Score Gauge */}
              <div className="flex justify-center">
                <CircularScoreGauge 
                  score={profile.totalScore} 
                  maxScore={160}
                  status={profile.totalScore >= 120 ? 'optimal' : profile.totalScore >= 80 ? 'needsWork' : 'alert'}
                />
              </div>

              {/* Section Score Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.sectionData.map((section) => (
                  <SectionScoreCard
                    key={section.sectionNumber}
                    sectionNumber={section.sectionNumber}
                    titleEn={section.titleEn}
                    titleHi={section.titleHi}
                    score={section.score}
                    status={section.status}
                    icon={section.icon}
                    language="en"
                  />
                ))}
              </div>

              {/* Analysis & Suggestions */}
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-[#2D5F3F] text-center">
                  Pattern Analysis Results
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnalysisCard
                    titleEn="Detected Problems"
                    titleHi="पहचानी गई समस्याएं"
                    items={profile.analysis.primaryProblems}
                    cardType="problems"
                    language="en"
                  />
                  <AnalysisCard
                    titleEn="Recommended Habits"
                    titleHi="सुझाई गई आदतें"
                    items={profile.analysis.habitSuggestions}
                    cardType="suggestions"
                    language="en"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
