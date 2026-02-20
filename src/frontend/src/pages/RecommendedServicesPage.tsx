import { useNavigate } from '@tanstack/react-router';
import { Home, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useBasicInfoStorage } from '../hooks/useBasicInfoStorage';
import { useAssessment } from '../contexts/AssessmentContext';
import { getSectionScores } from '../utils/scoringUtils';

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  borderColor: string;
}

const STATIC_SERVICES: Service[] = [
  {
    id: 1,
    title: 'Health Webinars',
    subtitle: '(Live Group Sessions)',
    description: 'Join expert-led sessions on wellness, nutrition, and holistic health practices.',
    buttonText: 'Explore',
    borderColor: 'border-amber-500',
  },
  {
    id: 2,
    title: '1-on-1 Coaching',
    subtitle: '(Personalized Guidance)',
    description: 'Work directly with certified health coaches for personalized guidance and support.',
    buttonText: 'Book Now',
    borderColor: 'border-red-500',
  },
  {
    id: 3,
    title: 'Functional Readiness Program',
    subtitle: '(Level Up)',
    description: 'Structured program to optimize your physical and mental performance.',
    buttonText: 'Book Now',
    borderColor: 'border-green-500',
  },
];

export default function RecommendedServicesPage() {
  const navigate = useNavigate();
  const { getBasicInfo } = useBasicInfoStorage();
  const { responses } = useAssessment();
  const basicInfo = getBasicInfo();
  const sectionScores = getSectionScores(responses);
  
  // Calculate total score
  const totalScore = sectionScores.reduce((sum, section) => sum + section.score, 0);
  const maxTotalScore = 160;
  
  // Determine status based on total score
  const getStatus = (score: number) => {
    if (score >= 121) return 'Optimal';
    if (score >= 81) return 'Needs Work';
    return 'Alert';
  };

  const handleServiceAction = (serviceTitle: string, buttonText: string) => {
    console.log(`${buttonText} clicked for: ${serviceTitle}`);
    // Placeholder for future booking/exploration functionality
  };

  const handleBackToHome = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg via-white to-brand-bg/50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* User Info Card - Copied from ScoreSummaryPage */}
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
                  <span className="font-medium">Total Score:</span> {totalScore}/{maxTotalScore}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {getStatus(totalScore)}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Title */}
        <h1 className="mb-8 text-center font-['Playfair_Display'] text-3xl font-bold text-brand-text md:text-4xl">
          RECOMMENDED SERVICES
        </h1>

        <p className="mb-8 text-center text-brand-text/70">
          Based on your assessment, we recommend these services to support your wellness journey.
        </p>

        {/* Service Cards */}
        <div className="mb-8 space-y-6">
          {STATIC_SERVICES.map((service) => (
            <Card 
              key={service.id} 
              className={`bg-white shadow-md transition-transform hover:scale-[1.02] border-t-4 ${service.borderColor}`}
            >
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="mb-1 font-['Playfair_Display'] text-xl font-bold text-brand-text">
                    {service.title} <span className="text-lg font-normal text-brand-text/70">{service.subtitle}</span>
                  </h3>
                  <p className="mb-4 text-sm text-brand-text/70">{service.description}</p>
                  
                  <Button
                    onClick={() => handleServiceAction(service.title, service.buttonText)}
                    className="bg-brand-primary text-white hover:bg-brand-primary/90"
                  >
                    {service.buttonText}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Back to Home Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleBackToHome}
            size="lg"
            className="flex w-full items-center justify-center gap-2 bg-brand-primary px-12 py-6 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-brand-primary/90 sm:w-auto"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
