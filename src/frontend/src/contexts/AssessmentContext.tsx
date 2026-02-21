import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface AssessmentContextType {
  responses: Record<number, number | null>;
  currentSection: number;
  language: Language;
  updateResponse: (questionId: number, value: number) => void;
  setCurrentSection: (sectionNumber: number) => void;
  setLanguage: (lang: Language) => void;
  isSectionComplete: (sectionNumber: number) => boolean;
  canAccessSection: (sectionNumber: number) => boolean;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [responses, setResponses] = useState<Record<number, number | null>>(() => {
    const saved = localStorage.getItem('abl-assessment-responses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // If parsing fails, initialize fresh
      }
    }
    const initial: Record<number, number | null> = {};
    for (let i = 1; i <= 40; i++) {
      initial[i] = null;
    }
    return initial;
  });
  
  const [currentSection, setCurrentSection] = useState(1);
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('abl-assessment-language');
    return (saved === 'en' || saved === 'hi') ? saved : 'en';
  });

  // Persist responses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('abl-assessment-responses', JSON.stringify(responses));
  }, [responses]);

  const updateResponse = (questionId: number, value: number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('abl-assessment-language', lang);
  };

  // Check if a specific section is complete (all 10 questions answered)
  const isSectionComplete = (sectionNumber: number): boolean => {
    const startId = (sectionNumber - 1) * 10 + 1;
    const endId = sectionNumber * 10;
    
    for (let i = startId; i <= endId; i++) {
      if (responses[i] === null || responses[i] === undefined) {
        return false;
      }
    }
    return true;
  };

  // Check if user can access a specific section
  const canAccessSection = (sectionNumber: number): boolean => {
    if (sectionNumber === 1) return true;
    
    // To access section N, all previous sections (1 to N-1) must be complete
    for (let i = 1; i < sectionNumber; i++) {
      if (!isSectionComplete(i)) {
        return false;
      }
    }
    return true;
  };

  return (
    <AssessmentContext.Provider
      value={{
        responses,
        currentSection,
        language,
        updateResponse,
        setCurrentSection,
        setLanguage: handleSetLanguage,
        isSectionComplete,
        canAccessSection,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
}
