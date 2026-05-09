const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || "";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Halo Griya Estetika Arsitek, saya sudah mengisi form konsultasi dan ingin lanjut bertanya tentang kebutuhan desain/renovasi rumah.";

export function isWhatsAppConfigured() {
  return Boolean(WHATSAPP_NUMBER);
}

export function createWhatsAppLink(message = DEFAULT_WHATSAPP_MESSAGE) {
  if (!isWhatsAppConfigured()) {
    return "#";
  }

  const normalizedNumber = WHATSAPP_NUMBER.replace(/[^\d]/g, "");
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
}
