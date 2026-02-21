interface GlobalAssessmentOptionsProps {
  questionId: number;
  selectedValue: number | null;
  onChange: (questionId: number, value: number) => void;
  language: 'en' | 'hi';
}

const OPTIONS = [
  { value: 0, label_en: 'Never', label_hi: 'कभी नहीं' },
  { value: 1, label_en: 'Rarely', label_hi: 'शायद ही कभी' },
  { value: 2, label_en: 'Sometimes', label_hi: 'कभी-कभी' },
  { value: 3, label_en: 'Often', label_hi: 'अक्सर' },
  { value: 4, label_en: 'Daily', label_hi: 'प्रतिदिन' },
];

export default function GlobalAssessmentOptions({
  questionId,
  selectedValue,
  onChange,
  language,
}: GlobalAssessmentOptionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((option) => {
        const isSelected = selectedValue === option.value;
        const label = language === 'en' ? option.label_en : option.label_hi;

        return (
          <button
            key={option.value}
            onClick={() => onChange(questionId, option.value)}
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
  );
}
