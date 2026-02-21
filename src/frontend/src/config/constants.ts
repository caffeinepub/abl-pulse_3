// Application-wide constants

// Default WhatsApp number for consultation bookings
// Replace with actual consultation number
export const DEFAULT_CONSULTATION_WHATSAPP_NUMBER = '919876543210'; // Format: country code + number (no + or spaces)

// WhatsApp message template
export const WHATSAPP_MESSAGE_TEMPLATE = "Hi, I'm {name}. My ABL score is {score}/160. I'd like to book a consultation.";

// App metadata
export const APP_NAME = 'ABL Pulse';
export const APP_TAGLINE = 'Ayurvedic Baseline Assessment';

// Score thresholds
export const SCORE_THRESHOLDS = {
  SECTION: {
    ALERT_MAX: 20,
    NEEDS_WORK_MAX: 30,
    OPTIMAL_MIN: 31,
  },
  TOTAL: {
    ALERT_MAX: 79,
    NEEDS_WORK_MAX: 119,
    OPTIMAL_MIN: 120,
  },
};
