import { Question } from '../data/sections/section1';
import QuestionCard from './QuestionCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SectionContainerProps {
  sectionNumber: number;
  questions: Question[];
  responses: Record<number, number | null>;
  onResponseChange: (questionId: number, value: number) => void;
  language: 'en' | 'hi';
  onNext: () => void;
  onPrevious: () => void;
}

export default function SectionContainer({
  sectionNumber,
  questions,
  responses,
  onResponseChange,
  language,
  onNext,
  onPrevious,
}: SectionContainerProps) {
  const sectionTitle = language === 'en' 
    ? `Section ${sectionNumber}` 
    : `अनुभाग ${sectionNumber}`;

  const isComplete = questions.every(q => responses[q.id] !== null);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-brand-primary sm:text-3xl">
          {sectionTitle}
        </h2>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            questionId={question.id}
            text={language === 'en' ? question.text_en : question.text_hi}
            selectedValue={responses[question.id]}
            onSelect={onResponseChange}
            language={language}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="min-h-[44px] flex-1 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white sm:flex-none sm:px-8"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          {language === 'en' ? 'Previous' : 'पिछला'}
        </Button>

        <Button
          onClick={onNext}
          disabled={!isComplete}
          className="min-h-[44px] flex-1 bg-brand-accent text-white hover:bg-brand-accent/90 disabled:opacity-50 disabled:cursor-not-allowed sm:flex-none sm:px-8"
        >
          {language === 'en' ? 'Next' : 'अगला'}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
