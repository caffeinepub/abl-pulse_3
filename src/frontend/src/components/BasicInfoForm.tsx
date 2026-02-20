import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { BasicInfoFormData } from '../types/assessment';
import { useBasicInfoStorage } from '../hooks/useBasicInfoStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function BasicInfoForm() {
  const navigate = useNavigate();
  const { saveBasicInfo, getBasicInfo } = useBasicInfoStorage();

  const [formData, setFormData] = useState<BasicInfoFormData>({
    name: '',
    age: 0,
    gender: '',
    profession: '',
    weight: 0,
    heightFeet: 0,
    heightInches: 0,
    whatsappNumber: '',
    email: '',
    medicalHistory: {
      bloodPressure: false,
      sugar: false,
      thyroid: false,
    },
  });

  useEffect(() => {
    const savedData = getBasicInfo();
    if (savedData) {
      setFormData({
        ...savedData,
        email: savedData.email || '',
      });
    }
  }, []);

  const isFormValid = () => {
    return !!(
      formData.name.trim() &&
      formData.age > 0 &&
      formData.gender &&
      formData.profession &&
      formData.weight > 0 &&
      formData.heightFeet > 0 &&
      formData.heightInches >= 0 &&
      formData.whatsappNumber.trim()
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      saveBasicInfo(formData);
      navigate({ to: '/assessment/section1' });
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Premium Header Card with Beige Fill + Dark Green Shadow */}
      <div className="rounded-2xl bg-[#FAF7F2] px-8 py-10 text-center shadow-[0_8px_24px_rgba(0,66,37,0.25)]">
        <h1 className="font-heading text-3xl font-bold text-[#004225] sm:text-4xl lg:text-5xl">
          Get Your Health Readiness Score
        </h1>
        <p className="mt-3 font-heading text-2xl text-[#004225]/90 sm:text-3xl">
          जानें अपना हेल्थ रेडीनेस स्कोर
        </p>
        <div className="mt-6 space-y-3 text-base text-[#004225]/80 sm:text-lg">
          <p>
            Difference Between Current Habits & Optimal Health Lifestyle. Discover The Current Condition of Your Body & Understand What kind of Care, Correction & Routine Adjustment it Needs — and when.
          </p>
          <p className="font-medium text-[#004225]/90">
            आपकी आज की आदतों और आपकी सबसे बेहतरीन सेहत के बीच का फासला।
          </p>
        </div>

        {/* Benefits Section - Inside Header Card */}
        <div className="mt-8 space-y-3 text-left">
          <p className="text-base font-semibold text-[#004225] sm:text-lg">Benefits:</p>
          <ul className="space-y-2 text-base text-[#004225]/80 sm:text-lg">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#004225]">•</span>
              <span>You'll Get to Know Your Health More Closely & Find Out How Ready You are for a Change.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#004225]">•</span>
              <span>Through Guided Questions, You will Recognize what Healthy Habits You are Missing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#004225]">•</span>
              <span>You will Identify Small Daily Routine Mistakes that may be Creating Long-Term Health Problems.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Personal Info Card - Clean White with Earth Shadow */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl bg-white p-8 shadow-[0_4px_16px_rgba(139,115,85,0.15)]">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">Personal Info</h2>

          {/* Name */}
          <div className="mb-4 space-y-2">
            <Label htmlFor="name" className="text-base font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-12 border-gray-300 text-base focus:border-[#004225] focus:ring-[#004225]"
              placeholder="Enter your full name"
            />
          </div>

          {/* Gender and Age */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-base font-medium text-gray-700">
                Gender (Dropdown)
              </Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger id="gender" className="h-12 border-gray-300 text-base focus:border-[#004225] focus:ring-[#004225]">
                  <SelectValue placeholder="M, F, Other" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M" className="text-base">M</SelectItem>
                  <SelectItem value="F" className="text-base">F</SelectItem>
                  <SelectItem value="Other" className="text-base">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-base font-medium text-gray-700">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                value={formData.age || ''}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                required
                className="h-12 border-gray-300 text-base focus:border-[#004225] focus:ring-[#004225]"
                placeholder="Enter age"
              />
            </div>
          </div>

          {/* Profession */}
          <div className="mb-4 space-y-2">
            <Label htmlFor="profession" className="text-base font-medium text-gray-700">
              Profession (Dropdown)
            </Label>
            <Select 
              value={formData.profession} 
              onValueChange={(value) => setFormData({ ...formData, profession: value as BasicInfoFormData['profession'] })}
            >
              <SelectTrigger id="profession" className="h-12 border-gray-300 text-base focus:border-[#004225] focus:ring-[#004225]">
                <SelectValue placeholder="Student, Job, Business, Professional, Others" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Student" className="text-base">Student</SelectItem>
                <SelectItem value="Job" className="text-base">Job</SelectItem>
                <SelectItem value="Business" className="text-base">Business</SelectItem>
                <SelectItem value="Professional" className="text-base">Professional</SelectItem>
                <SelectItem value="Others" className="text-base">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Weight and Height in Single Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-base font-medium text-gray-700">
                Weight (Kg)
              </Label>
              <Input
                id="weight"
                type="number"
                min="1"
                max="300"
                step="0.1"
                value={formData.weight || ''}
                onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                required
                className="h-12 border-gray-300 text-base focus:border-[#004225] focus:ring-[#004225]"
                placeholder="Enter weight"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium text-gray-700">
                Height (Feet/Inch)
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="heightFeet"
                  type="number"
                  min="0"
                  max="8"
                  value={formData.heightFeet || ''}
                  onChange={(e) => setFormData({ ...formData, heightFeet: parseInt(e.target.value) || 0 })}
                  required
                  className="h-12 border-gray-300 text-base focus:border-[#004225] focus:ring-[#004225]"
                  placeholder="Feet"
                />
                <Input
                  id="heightInches"
                  type="number"
                  min="0"
                  max="11"
                  value={formData.heightInches || ''}
                  onChange={(e) => setFormData({ ...formData, heightInches: parseInt(e.target.value) || 0 })}
                  required
                  className="h-12 border-gray-300 text-base focus:border-[#004225] focus:ring-[#004225]"
                  placeholder="Inch"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Medical History Card - Very Light Pale Mint/Sage Green */}
        <div className="rounded-2xl bg-[#EBF3ED] p-8 shadow-[0_4px_16px_rgba(139,115,85,0.15)]">
          <h2 className="mb-6 text-xl font-semibold text-[#004225]">Medical History</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="bp" className="text-base font-normal text-[#004225]">
                BP: Yes/No
              </Label>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${!formData.medicalHistory.bloodPressure ? 'text-[#004225]' : 'text-[#004225]/50'}`}>
                  No
                </span>
                <Switch
                  id="bp"
                  checked={formData.medicalHistory.bloodPressure}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      medicalHistory: { ...formData.medicalHistory, bloodPressure: checked },
                    })
                  }
                  className="data-[state=checked]:bg-[#004225]"
                />
                <span className={`text-sm font-medium ${formData.medicalHistory.bloodPressure ? 'text-[#004225]' : 'text-[#004225]/50'}`}>
                  Yes
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="sugar" className="text-base font-normal text-[#004225]">
                Sugar: Yes/No
              </Label>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${!formData.medicalHistory.sugar ? 'text-[#004225]' : 'text-[#004225]/50'}`}>
                  No
                </span>
                <Switch
                  id="sugar"
                  checked={formData.medicalHistory.sugar}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      medicalHistory: { ...formData.medicalHistory, sugar: checked },
                    })
                  }
                  className="data-[state=checked]:bg-[#004225]"
                />
                <span className={`text-sm font-medium ${formData.medicalHistory.sugar ? 'text-[#004225]' : 'text-[#004225]/50'}`}>
                  Yes
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="thyroid" className="text-base font-normal text-[#004225]">
                Thyroid: Yes/No
              </Label>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${!formData.medicalHistory.thyroid ? 'text-[#004225]' : 'text-[#004225]/50'}`}>
                  No
                </span>
                <Switch
                  id="thyroid"
                  checked={formData.medicalHistory.thyroid}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      medicalHistory: { ...formData.medicalHistory, thyroid: checked },
                    })
                  }
                  className="data-[state=checked]:bg-[#004225]"
                />
                <span className={`text-sm font-medium ${formData.medicalHistory.thyroid ? 'text-[#004225]' : 'text-[#004225]/50'}`}>
                  Yes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Card - Smaller White Card */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_16px_rgba(139,115,85,0.15)]">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">For Report Share</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-base font-medium text-gray-700">
                WhatsApp Number
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                required
                className="h-12 border-gray-300 text-base focus:border-[#004225] focus:ring-[#004225]"
                placeholder="Enter WhatsApp number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium text-gray-700">
                Email Id
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 border-gray-300 text-base focus:border-[#004225] focus:ring-[#004225]"
                placeholder="Enter email address (Optional)"
              />
            </div>
          </div>
        </div>

        {/* NEXT Button - Solid Dark Green */}
        <Button
          type="submit"
          disabled={!isFormValid()}
          className="w-full h-14 bg-[#004225] text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#003319] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#004225]"
        >
          NEXT
        </Button>
      </form>
    </div>
  );
}
