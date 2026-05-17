import { getCampaignLabel, getAdLabel } from "./utm";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || "";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Halo Griya Estetika Arsitek, saya sudah mengisi form konsultasi dan ingin lanjut bertanya tentang kebutuhan desain/renovasi rumah.";

export function isWhatsAppConfigured() {
  return Boolean(WHATSAPP_NUMBER);
}

// Bangun pesan WA — otomatis sertakan info campaign jika ada
export function buildWhatsAppMessage(formData = {}) {
  const lines = [];

  lines.push("Halo Griya Estetika Arsitek 👋");
  lines.push("Saya sudah mengisi form konsultasi dan ingin lanjut diskusi.");

  if (formData.nama_lengkap) {
    lines.push("");
    lines.push(`*Nama:* ${formData.nama_lengkap}`);
  }

  if (formData.kebutuhan) {
    lines.push(`*Kebutuhan:* ${formData.kebutuhan}`);
  }

  if (formData.estimasi_budget) {
    lines.push(`*Budget:* ${formData.estimasi_budget}`);
  }

  const area = [formData.kota, formData.kabupaten, formData.provinsi]
    .filter(Boolean)
    .join(", ");
  if (area) lines.push(`*Area:* ${area}`);

  if (formData.rencana_mulai) {
    lines.push(`*Rencana Mulai:* ${formData.rencana_mulai}`);
  }

  if (formData.catatan) {
    lines.push("");
    lines.push(`*Catatan:* ${formData.catatan}`);
  }

  // Sertakan sumber campaign (hanya untuk internal tracking tim)
  const campaign = getCampaignLabel();
  const ad = getAdLabel();
  if (campaign || ad) {
    lines.push("");
    lines.push(`_Sumber: ${[campaign, ad].filter(Boolean).join(" · ")}_`);
  }

  return lines.join("\n");
}

export function createWhatsAppLink(message = DEFAULT_WHATSAPP_MESSAGE) {
  if (!isWhatsAppConfigured()) return "#";
  const normalizedNumber = WHATSAPP_NUMBER.replace(/[^\d]/g, "");
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppLinkFromForm(formData = {}) {
  const message = buildWhatsAppMessage(formData);
  return createWhatsAppLink(message);
}
