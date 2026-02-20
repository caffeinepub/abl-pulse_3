import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import BasicInfoForm from '../components/BasicInfoForm';

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block cursor-pointer transition-transform hover:scale-105">
            <img 
              src="/assets/ABL Logo (6).png" 
              alt="ABL PULSE" 
              className="mx-auto mb-6 h-16 w-auto"
            />
          </Link>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-[#004225] transition-all hover:text-[#006837] hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <BasicInfoForm />
      </div>
    </div>
  );
}
