export const TRACKING_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_adset",
  "utm_ad",
  "campaign_id",
  "adset_id",
  "ad_id",
  "fbclid",
];

const STORAGE_KEY = "gea_tracking_params";

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function readStoredParams() {
  const storage = getStorage();

  if (!storage) {
    return {};
  }

  try {
    return JSON.parse(storage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getUrlTrackingParams(search = typeof window !== "undefined" ? window.location.search : "") {
  const params = new URLSearchParams(search || "");

  return TRACKING_FIELDS.reduce((accumulator, field) => {
    accumulator[field] = params.get(field) || "";
    return accumulator;
  }, {});
}

export function saveTrackingParams(nextParams = getUrlTrackingParams()) {
  const storage = getStorage();
  const existingParams = readStoredParams();
  const mergedParams = { ...existingParams };

  TRACKING_FIELDS.forEach((field) => {
    if (nextParams[field]) {
      mergedParams[field] = nextParams[field];
    }
  });

  if (typeof window !== "undefined") {
    mergedParams.landing_page = window.location.href;
  }

  if (typeof document !== "undefined") {
    mergedParams.referrer = document.referrer || mergedParams.referrer || "";
  }

  if (storage) {
    storage.setItem(STORAGE_KEY, JSON.stringify(mergedParams));
  }

  return mergedParams;
}

export function getStoredTrackingParams() {
  return readStoredParams();
}

export function buildTrackingPayload() {
  const stored = readStoredParams();

  return {
    ...TRACKING_FIELDS.reduce((accumulator, field) => {
      accumulator[field] = stored[field] || "";
      return accumulator;
    }, {}),
    landing_page: typeof window !== "undefined" ? window.location.href : stored.landing_page || "",
    referrer:
      typeof document !== "undefined"
        ? document.referrer || stored.referrer || ""
        : stored.referrer || "",
    submitted_at: new Date().toISOString(),
  };
}
