export type Language = 'en' | 'hi';

export interface BasicInfoFormData {
  name: string;
  age: number;
  gender: string;
  profession: 'Student' | 'Job' | 'Business' | 'Professional' | 'Others' | '';
  weight: number;
  heightFeet: number;
  heightInches: number;
  whatsappNumber: string;
  email?: string;
  medicalHistory: {
    bloodPressure: boolean;
    sugar: boolean;
    thyroid: boolean;
  };
}

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface Section {
  id: number;
  name: string;
  questions: Question[];
}
