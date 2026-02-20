import { BasicInfoFormData } from '../types/assessment';

const BASIC_INFO_STORAGE_KEY = 'abl-basic-info';

export function useBasicInfoStorage() {
  const saveBasicInfo = (data: BasicInfoFormData): void => {
    try {
      localStorage.setItem(BASIC_INFO_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save basic info:', error);
    }
  };

  const getBasicInfo = (): BasicInfoFormData | null => {
    try {
      const saved = localStorage.getItem(BASIC_INFO_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as BasicInfoFormData;
      }
      return null;
    } catch (error) {
      console.error('Failed to retrieve basic info:', error);
      return null;
    }
  };

  const clearBasicInfo = (): void => {
    try {
      localStorage.removeItem(BASIC_INFO_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear basic info:', error);
    }
  };

  const isBasicInfoComplete = (): boolean => {
    try {
      const data = getBasicInfo();
      if (!data) return false;
      
      // Check if all required fields are present and non-empty (email is optional)
      return !!(
        data.name &&
        data.age &&
        data.gender &&
        data.profession &&
        data.weight &&
        data.heightFeet &&
        data.heightInches !== undefined &&
        data.whatsappNumber
      );
    } catch (error) {
      console.error('Failed to check basic info completion:', error);
      return false;
    }
  };

  return {
    saveBasicInfo,
    getBasicInfo,
    clearBasicInfo,
    isBasicInfoComplete,
  };
}
