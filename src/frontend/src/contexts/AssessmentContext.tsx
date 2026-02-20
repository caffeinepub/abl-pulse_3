import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface AssessmentContextType {
  responses: Record<number, number | null>;
  currentSection: number;
  language: Language;
  updateResponse: (questionId: number, value: number) => void;
  setCurrentSection: (sectionNumber: number) => void;
  setLanguage: (lang: Language) => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [responses, setResponses] = useState<Record<number, number | null>>(() => {
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

  return (
    <AssessmentContext.Provider
      value={{
        responses,
        currentSection,
        language,
        updateResponse,
        setCurrentSection,
        setLanguage: handleSetLanguage,
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
