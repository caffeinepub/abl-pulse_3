import { useState } from 'react';
import { generateWellnessPDF } from '../utils/pdfGenerator';
import { toast } from 'sonner';

interface PDFData {
  totalScore: number;
  sectionScores: Array<{
    sectionNumber: number;
    titleEn: string;
    titleHi: string;
    score: number;
    status: 'alert' | 'needsWork' | 'optimal';
  }>;
  primaryProblems: string[];
  habitSuggestions: string[];
  userName: string;
}

export function usePDFDownload() {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async (data: PDFData) => {
    setIsGenerating(true);
    try {
      await generateWellnessPDF(data);
      toast.success('Report downloaded successfully!');
    } catch (error) {
      console.error('Report generation failed:', error);
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    downloadPDF,
    isGenerating,
  };
}
