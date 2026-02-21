import { DEFAULT_CONSULTATION_WHATSAPP_NUMBER } from '../config/constants';

export function openWhatsAppConsultation(
  userName: string,
  totalScore: number,
  userWhatsappNumber?: string
): void {
  // Use default consultation number (not user's number)
  const consultationNumber = DEFAULT_CONSULTATION_WHATSAPP_NUMBER;

  // Pre-filled message
  const message = `Hi, I'm ${userName}. My ABL score is ${totalScore}/160. I'd like to book a consultation.`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  // Construct WhatsApp URL
  const whatsappUrl = `https://wa.me/${consultationNumber}?text=${encodedMessage}`;

  // Open in new window/tab
  window.open(whatsappUrl, '_blank');
}
