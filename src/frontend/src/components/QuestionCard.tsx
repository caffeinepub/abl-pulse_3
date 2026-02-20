import { assessmentOptions } from '../data/assessmentOptions';

interface QuestionCardProps {
  questionId: number;
  text: string;
  selectedValue: number | null;
  onSelect: (questionId: number, value: number) => void;
  language: 'en' | 'hi';
}

export default function QuestionCard({
  questionId,
  text,
  selectedValue,
  onSelect,
  language,
}: QuestionCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-brand-primary">
        {text}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {assessmentOptions.map((option) => {
          const isSelected = selectedValue === option.value;
          const label = language === 'en' ? option.label_en : option.label_hi;
          
          return (
            <button
              key={option.value}
              onClick={() => onSelect(questionId, option.value)}
              className={`min-h-[44px] flex-1 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:scale-105 ${
                isSelected
                  ? 'border-brand-accent bg-brand-accent text-white shadow-lg'
                  : 'border-gray-300 bg-white text-brand-text hover:border-brand-accent'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
