import { useLocation } from "react-router-dom";
import { isGoogleScriptConfigured } from "../lib/googleSheet";
import { isMetaPixelConfigured } from "../lib/metaPixel";
import { getStoredTrackingParams } from "../lib/utm";
import { isWhatsAppConfigured } from "../lib/whatsapp";

export default function DebugPanel() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isDebugEnabled = searchParams.get("debug") === "true";

  if (!isDebugEnabled) {
    return null;
  }

  const trackingValues = getStoredTrackingParams();
  const debugValues = {
    utm_source: trackingValues.utm_source || "",
    utm_medium: trackingValues.utm_medium || "",
    utm_campaign: trackingValues.utm_campaign || "",
    utm_adset: trackingValues.utm_adset || "",
    utm_ad: trackingValues.utm_ad || "",
    campaign_id: trackingValues.campaign_id || "",
    adset_id: trackingValues.adset_id || "",
    ad_id: trackingValues.ad_id || "",
    fbclid: trackingValues.fbclid || "",
    landing_page: typeof window !== "undefined" ? window.location.href : "",
    google_script_configured: isGoogleScriptConfigured() ? "Yes" : "No",
    meta_pixel_configured: isMetaPixelConfigured() ? "Yes" : "No",
    whatsapp_configured: isWhatsAppConfigured() ? "Yes" : "No",
  };

  return (
    <aside className="debug-panel" aria-live="polite">
      <strong>Debug Panel</strong>
      <div className="debug-grid">
        {Object.entries(debugValues).map(([key, value]) => (
          <div key={key} className="debug-row">
            <span className="debug-label">{key}</span>
            <span className="debug-value">{value || "-"}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
