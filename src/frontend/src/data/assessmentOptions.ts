export interface AssessmentOption {
  label_en: string;
  label_hi: string;
  value: number;
}

export const assessmentOptions: AssessmentOption[] = [
  { label_en: "Never", label_hi: "कभी नहीं", value: 0 },
  { label_en: "Rarely", label_hi: "कभी-कभार", value: 1 },
  { label_en: "Sometimes", label_hi: "कभी-कभी", value: 2 },
  { label_en: "Often", label_hi: "अक्सर", value: 3 },
  { label_en: "Daily", label_hi: "रोज़ाना", value: 4 },
];
