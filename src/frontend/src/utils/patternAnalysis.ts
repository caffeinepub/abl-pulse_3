// Rule-based pattern analysis engine
// Identifies low-scoring patterns (0-3) and maps to specific problems and Ayurvedic solutions

interface AnalysisResult {
  primaryProblems: string[];
  habitSuggestions: string[];
}

interface ProblemPattern {
  questionIds: number[];
  problemEn: string;
  problemHi: string;
  suggestionsEn: string[];
  suggestionsHi: string[];
}

// Define problem patterns based on question groups
const problemPatterns: ProblemPattern[] = [
  {
    questionIds: [1, 6, 7, 8, 9], // Sleep timing and quality
    problemEn: 'Inconsistent Sleep & Routine',
    problemHi: 'अनियमित नींद और दिनचर्या',
    suggestionsEn: [
      'Wake up at the same time daily (±30 minutes)',
      'Sleep by 10:30 PM consistently',
      'Avoid screens 1 hour before bed',
    ],
    suggestionsHi: [
      'रोज़ एक ही समय पर जागें (±30 मिनट)',
      'रात 10:30 बजे तक सोएं',
      'सोने से 1 घंटा पहले स्क्रीन से दूर रहें',
    ],
  },
  {
    questionIds: [2, 3], // Morning hydration and sunlight
    problemEn: 'Poor Morning Hydration',
    problemHi: 'सुबह का खराब हाइड्रेशन',
    suggestionsEn: [
      'Drink 1-2 glasses of warm water upon waking',
      'Get 15-20 minutes of morning sunlight daily',
    ],
    suggestionsHi: [
      'सुबह उठते ही 1-2 गिलास गुनगुना पानी पिएं',
      'रोज़ 15-20 मिनट सुबह की धूप लें',
    ],
  },
  {
    questionIds: [11, 15, 16, 17], // Herbal drinks, ghee, sugar avoidance
    problemEn: 'Suboptimal Nutrition Choices',
    problemHi: 'पोषण संबंधी खराब चुनाव',
    suggestionsEn: [
      'Replace tea/coffee with herbal drinks',
      'Include small amounts of ghee in meals',
      'Avoid refined sugar, use jaggery or natural sweeteners',
    ],
    suggestionsHi: [
      'चाय/कॉफी की जगह हर्बल पेय लें',
      'खाने में थोड़ा घी शामिल करें',
      'रिफाइंड शुगर से बचें, गुड़ या प्राकृतिक स्वीटनर का उपयोग करें',
    ],
  },
  {
    questionIds: [13, 18, 19], // Meal timing and digestion
    problemEn: 'Poor Meal Timing & Digestion',
    problemHi: 'खराब भोजन समय और पाचन',
    suggestionsEn: [
      'Keep 12-hour gap between dinner and breakfast',
      'Finish dinner before 7:30 PM',
      'Chew food 20-30 times before swallowing',
    ],
    suggestionsHi: [
      'रात के खाने और नाश्ते के बीच 12 घंटे का अंतर रखें',
      'रात का खाना 7:30 बजे से पहले खाएं',
      'निगलने से पहले भोजन को 20-30 बार चबाएं',
    ],
  },
  {
    questionIds: [14], // Gas, acidity, bloating (reverse scored)
    problemEn: 'Digestive Issues',
    problemHi: 'पाचन संबंधी समस्याएं',
    suggestionsEn: [
      'Practice mindful eating and proper chewing',
      'Include digestive herbs like ginger and fennel',
      'Avoid late-night meals',
    ],
    suggestionsHi: [
      'ध्यानपूर्वक खाएं और अच्छे से चबाएं',
      'अदरक और सौंफ जैसी पाचक जड़ी-बूटियां शामिल करें',
      'देर रात का खाना न खाएं',
    ],
  },
  {
    questionIds: [21, 23, 28], // Walking and physical activity
    problemEn: 'Insufficient Physical Activity',
    problemHi: 'अपर्याप्त शारीरिक गतिविधि',
    suggestionsEn: [
      'Walk at least 5,000 steps daily',
      'Engage in light sweating activity once a day',
      'Take movement breaks during long sitting hours',
    ],
    suggestionsHi: [
      'रोज़ कम से कम 5,000 कदम चलें',
      'दिन में एक बार हल्का पसीना लाने वाली गतिविधि करें',
      'लंबे समय बैठने के दौरान छोटे ब्रेक लें',
    ],
  },
  {
    questionIds: [26, 25], // Breathing and relaxation
    problemEn: 'Lack of Breathing & Relaxation Practices',
    problemHi: 'श्वास और विश्राम अभ्यास की कमी',
    suggestionsEn: [
      'Practice deep breathing exercises daily',
      'Do relaxation postures before sleep (e.g., legs-up-the-wall)',
    ],
    suggestionsHi: [
      'रोज़ाना गहरी साँस के व्यायाम करें',
      'सोने से पहले रिलैक्सेशन आसन करें',
    ],
  },
  {
    questionIds: [31, 32, 34, 36], // Gratitude, positivity, optimism
    problemEn: 'Negative Mental Patterns',
    problemHi: 'नकारात्मक मानसिक पैटर्न',
    suggestionsEn: [
      'Practice daily gratitude',
      'Avoid complaining and negative talk',
      'Speak positively about your health and body',
    ],
    suggestionsHi: [
      'रोज़ाना आभार व्यक्त करें',
      'शिकायत और नकारात्मक बातों से बचें',
      'अपनी सेहत के बारे में सकारात्मक बातें करें',
    ],
  },
  {
    questionIds: [33, 39], // Family time and communication
    problemEn: 'Limited Quality Family Time',
    problemHi: 'परिवार के साथ कम समय',
    suggestionsEn: [
      'Spend distraction-free time with family',
      'Communicate openly and respectfully',
    ],
    suggestionsHi: [
      'परिवार के साथ बिना मोबाइल/टीवी के समय बिताएं',
      'खुलकर और आदर से बात करें',
    ],
  },
  {
    questionIds: [37, 38], // Emotional stability and stress
    problemEn: 'Emotional Instability & Stress',
    problemHi: 'भावनात्मक अस्थिरता और तनाव',
    suggestionsEn: [
      'Practice meditation or mindfulness daily',
      'Handle stressful situations calmly',
      'Seek professional guidance if needed',
    ],
    suggestionsHi: [
      'रोज़ाना ध्यान या माइंडफुलनेस का अभ्यास करें',
      'तनावपूर्ण स्थिति को शांति से संभालें',
      'ज़रूरत पड़ने पर विशेषज्ञ से सलाह लें',
    ],
  },
];

export function analyzeResponses(responses: Record<number, number | null>): AnalysisResult {
  const detectedProblems: string[] = [];
  const allSuggestions: string[] = [];

  // Analyze each pattern
  for (const pattern of problemPatterns) {
    let lowScoreCount = 0;
    
    for (const qId of pattern.questionIds) {
      const score = responses[qId];
      
      // Question 14 is reverse-scored (gas/acidity/bloating)
      // High score (3-4) indicates problem
      if (qId === 14) {
        if (score !== null && score >= 3) {
          lowScoreCount++;
        }
      } else {
        // Normal questions: low score (0-3) indicates problem
        if (score !== null && score <= 3) {
          lowScoreCount++;
        }
      }
    }

    // If majority of questions in pattern have low scores, flag as problem
    const threshold = Math.ceil(pattern.questionIds.length * 0.5);
    if (lowScoreCount >= threshold) {
      detectedProblems.push(pattern.problemEn);
      allSuggestions.push(...pattern.suggestionsEn);
    }
  }

  // Limit to top 3 problems and 5 suggestions
  const primaryProblems = detectedProblems.slice(0, 3);
  const habitSuggestions = allSuggestions.slice(0, 5);

  return {
    primaryProblems,
    habitSuggestions,
  };
}
