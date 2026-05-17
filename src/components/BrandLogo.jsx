import { useState } from "react";

const BRAND_LOGO_PATH = "/assets/gea-logo.png";
const FALLBACK_TEXT = 'GEA · Griya Estetika Arsitek';

export default function BrandLogo({
  alt = "Griya Estetika Arsitek",
  className = "brand-logo",
  fallbackClassName = "",
}) {
  const [hasLogoError, setHasLogoError] = useState(false);

  if (hasLogoError) {
    return (
      <span className={["logo-fallback", fallbackClassName].filter(Boolean).join(" ")}>
        {FALLBACK_TEXT}
      </span>
    );
  }

  return (
    <img
      src={BRAND_LOGO_PATH}
      alt={alt}
      className={className}
      onError={() => setHasLogoError(true)}
    />
  );
}
