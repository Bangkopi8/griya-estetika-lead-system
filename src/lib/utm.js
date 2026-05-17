// ─────────────────────────────────────────────────────────────
// UTM & Meta Ads Tracking
//
// Format URL Parameters di Meta Ads Manager:
// utm_source=facebook&utm_medium=paid_social
//   &utm_campaign={{campaign.name}}
//   &utm_adset={{adset.name}}
//   &utm_content={{ad.name}}
//   &campaign_id={{campaign.id}}
//   &adset_id={{adset.id}}
//   &ad_id={{ad.id}}
//
// Meta otomatis replace {{...}} dengan nilai aktual saat iklan ditayangkan.
// fbclid ditambahkan otomatis oleh Meta — tidak perlu diisi manual.
// ─────────────────────────────────────────────────────────────

export const TRACKING_FIELDS = [
  // Standard UTM
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_adset",
  "utm_ad",
  "utm_term",
  // Meta Ads IDs (untuk exact match di Ads Manager)
  "campaign_id",
  "adset_id",
  "ad_id",
  // Meta click ID (otomatis dari Meta)
  "fbclid",
];

const STORAGE_KEY = "gea_tracking_params";

function getStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function readStoredParams() {
  const storage = getStorage();
  if (!storage) return {};
  try {
    return JSON.parse(storage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getUrlTrackingParams(
  search = typeof window !== "undefined" ? window.location.search : ""
) {
  const params = new URLSearchParams(search || "");
  return TRACKING_FIELDS.reduce((acc, field) => {
    acc[field] = params.get(field) || "";
    return acc;
  }, {});
}

export function saveTrackingParams(nextParams = getUrlTrackingParams()) {
  const storage = getStorage();
  const existing = readStoredParams();
  const merged = { ...existing };

  TRACKING_FIELDS.forEach((field) => {
    if (nextParams[field]) merged[field] = nextParams[field];
  });

  if (typeof window !== "undefined") {
    merged.landing_page = window.location.href;
  }
  if (typeof document !== "undefined") {
    merged.referrer = document.referrer || merged.referrer || "";
  }

  if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

export function getStoredTrackingParams() {
  return readStoredParams();
}

export function buildTrackingPayload() {
  const stored = readStoredParams();
  return {
    ...TRACKING_FIELDS.reduce((acc, field) => {
      acc[field] = stored[field] || "";
      return acc;
    }, {}),
    landing_page:
      typeof window !== "undefined"
        ? window.location.href
        : stored.landing_page || "",
    referrer:
      typeof document !== "undefined"
        ? document.referrer || stored.referrer || ""
        : stored.referrer || "",
    submitted_at: new Date().toISOString(),
  };
}

// Helper: baca label campaign yang ramah untuk ditampilkan ke tim
export function getCampaignLabel() {
  const p = readStoredParams();
  if (p.utm_campaign) return p.utm_campaign;
  if (p.campaign_id) return `Campaign ID: ${p.campaign_id}`;
  if (p.utm_source) return p.utm_source;
  return "";
}

export function getAdLabel() {
  const p = readStoredParams();
  if (p.utm_content) return p.utm_content;
  if (p.utm_ad) return p.utm_ad;
  if (p.ad_id) return `Ad ID: ${p.ad_id}`;
  return "";
}
