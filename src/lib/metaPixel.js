const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim() || "";
const SCRIPT_ID = "gea-meta-pixel-script";
const PENDING_LEAD_KEY = "gea_pending_lead";
const TRACKED_LEAD_KEY = "gea_tracked_lead";

function canUseBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function isMetaPixelConfigured() {
  return Boolean(META_PIXEL_ID);
}

export function initMetaPixel() {
  if (!canUseBrowser() || !isMetaPixelConfigured()) {
    return false;
  }

  if (window.__geaPixelInitialized) {
    return true;
  }

  if (!window.fbq) {
    ((f, b, e, v, n, t, s) => {
      if (f.fbq) {
        return;
      }

      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };

      if (!f._fbq) {
        f._fbq = n;
      }

      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.id = SCRIPT_ID;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  }

  window.fbq("init", META_PIXEL_ID);
  window.__geaPixelInitialized = true;
  return true;
}

export function trackPageView() {
  if (!canUseBrowser() || !isMetaPixelConfigured()) {
    return false;
  }

  initMetaPixel();
  window.fbq?.("track", "PageView");
  return true;
}

export function markLeadPending() {
  if (!canUseBrowser()) {
    return "";
  }

  const leadId = `${Date.now()}`;
  window.sessionStorage.setItem(PENDING_LEAD_KEY, leadId);
  return leadId;
}

export function trackLeadOnThankYou() {
  if (!canUseBrowser()) {
    return { tracked: false, reason: "browser-unavailable" };
  }

  const pendingLeadId = window.sessionStorage.getItem(PENDING_LEAD_KEY);
  const trackedLeadId = window.sessionStorage.getItem(TRACKED_LEAD_KEY);

  if (!pendingLeadId) {
    return { tracked: false, reason: "no-pending-lead" };
  }

  if (pendingLeadId === trackedLeadId) {
    return { tracked: false, reason: "already-tracked" };
  }

  if (!isMetaPixelConfigured()) {
    window.sessionStorage.setItem(TRACKED_LEAD_KEY, pendingLeadId);
    window.sessionStorage.removeItem(PENDING_LEAD_KEY);
    return { tracked: false, reason: "pixel-not-configured" };
  }

  initMetaPixel();
  window.fbq?.("track", "Lead", {
    content_name: "Griya Estetika Arsitek Form Submit",
    lead_source: "Meta Landing Page",
  });

  window.sessionStorage.setItem(TRACKED_LEAD_KEY, pendingLeadId);
  window.sessionStorage.removeItem(PENDING_LEAD_KEY);
  return { tracked: true };
}
