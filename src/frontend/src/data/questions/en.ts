import { Question } from '../../types/assessment';

export const SECTION_1_QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'How many hours of sleep do you get on average per night?',
    options: [
      'Less than 5 hours',
      '5-6 hours',
      '7-8 hours',
      'More than 8 hours'
    ]
  },
  {
    id: 2,
    text: 'How would you rate the quality of your sleep?',
    options: [
      'Very poor',
      'Poor',
      'Good',
      'Excellent'
    ]
  },
  {
    id: 3,
    text: 'How many glasses of water do you drink daily?',
    options: [
      'Less than 4 glasses',
      '4-6 glasses',
      '7-8 glasses',
      'More than 8 glasses'
    ]
  }
];

export const SECTION_2_QUESTIONS: Question[] = [
  {
    id: 4,
    text: 'How often do you eat fruits and vegetables?',
    options: [
      'Rarely',
      'Sometimes',
      'Often',
      'Daily'
    ]
  },
  {
    id: 5,
    text: 'How many meals do you eat per day?',
    options: [
      '1-2 meals',
      '3 meals',
      '4-5 meals',
      'More than 5 meals'
    ]
  },
  {
    id: 6,
    text: 'How often do you consume processed or junk food?',
    options: [
      'Daily',
      'Several times a week',
      'Occasionally',
      'Rarely or never'
    ]
  }
];

export const SECTION_3_QUESTIONS: Question[] = [
  {
    id: 7,
    text: 'How often do you exercise per week?',
    options: [
      'Never',
      '1-2 times',
      '3-4 times',
      '5 or more times'
    ]
  },
  {
    id: 8,
    text: 'How long is your typical exercise session?',
    options: [
      'Less than 15 minutes',
      '15-30 minutes',
      '30-60 minutes',
      'More than 60 minutes'
    ]
  },
  {
    id: 9,
    text: 'How would you rate your overall energy levels?',
    options: [
      'Very low',
      'Low',
      'Moderate',
      'High'
    ]
  }
];

export const SECTION_4_QUESTIONS: Question[] = [
  {
    id: 10,
    text: 'How often do you feel stressed?',
    options: [
      'Always',
      'Often',
      'Sometimes',
      'Rarely'
    ]
  },
  {
    id: 11,
    text: 'Do you practice any stress management techniques?',
    options: [
      'Never',
      'Rarely',
      'Sometimes',
      'Regularly'
    ]
  },
  {
    id: 12,
    text: 'How would you rate your overall mental well-being?',
    options: [
      'Very poor',
      'Poor',
      'Good',
      'Excellent'
    ]
  }
];
