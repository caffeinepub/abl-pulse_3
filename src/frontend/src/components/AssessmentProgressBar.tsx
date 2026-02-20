interface AssessmentProgressBarProps {
  currentSection: number;
}

export default function AssessmentProgressBar({ currentSection }: AssessmentProgressBarProps) {
  const progress = currentSection * 25;
  
  return (
    <div className="mb-8 space-y-2">
      <div className="flex items-center justify-between text-sm font-medium text-brand-primary">
        <span>Section {currentSection} of 4</span>
        <span>{progress}% Complete</span>
      </div>
      
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-brand-accent to-brand-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
