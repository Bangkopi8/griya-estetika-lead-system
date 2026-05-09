import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { isGoogleScriptConfigured } from "../lib/googleSheet";
import { isMetaPixelConfigured } from "../lib/metaPixel";
import { TRACKING_FIELDS, getStoredTrackingParams, getUrlTrackingParams } from "../lib/utm";
import { isWhatsAppConfigured } from "../lib/whatsapp";

export default function DebugPanel() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isDebugEnabled = searchParams.get("debug") === "true";

  const [trackingValues, setTrackingValues] = useState({});

  useEffect(() => {
    if (!isDebugEnabled) return;

    const urlParams = getUrlTrackingParams(location.search);
    const stored = getStoredTrackingParams();
    const merged = { ...stored };

    TRACKING_FIELDS.forEach((field) => {
      if (urlParams[field]) {
        merged[field] = urlParams[field];
      }
    });

    setTrackingValues(merged);
  }, [isDebugEnabled, location.search]);

  if (!isDebugEnabled) {
    return null;
  }

  const debugValues = {
    utm_source: trackingValues.utm_source || "-",
    utm_medium: trackingValues.utm_medium || "-",
    utm_campaign: trackingValues.utm_campaign || "-",
    utm_adset: trackingValues.utm_adset || "-",
    utm_ad: trackingValues.utm_ad || "-",
    campaign_id: trackingValues.campaign_id || "-",
    adset_id: trackingValues.adset_id || "-",
    ad_id: trackingValues.ad_id || "-",
    fbclid: trackingValues.fbclid || "-",
    google_script: isGoogleScriptConfigured() ? "Yes" : "No",
    meta_pixel: isMetaPixelConfigured() ? "Yes" : "No",
    whatsapp: isWhatsAppConfigured() ? "Yes" : "No",
  };

  return (
    <aside className="debug-panel" aria-live="polite">
      <strong className="debug-title">Debug Panel</strong>

      <div className="debug-grid">
        {Object.entries(debugValues).map(([key, value]) => (
          <div key={key} className="debug-row">
            <span className="debug-label">{key}</span>
            <span className="debug-value">{value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}