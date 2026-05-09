import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DebugPanel from "./components/DebugPanel";
import { initMetaPixel, trackPageView } from "./lib/metaPixel";
import { saveTrackingParams } from "./lib/utm";
import LandingPage from "./pages/LandingPage";
import ThankYouPage from "./pages/ThankYouPage";

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    saveTrackingParams();
    window.scrollTo(0, 0);
    trackPageView();
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
      <DebugPanel />
    </>
  );
}
