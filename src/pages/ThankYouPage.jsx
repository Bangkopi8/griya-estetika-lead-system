import { useEffect } from "react";
import BrandLogo from "../components/BrandLogo";
import { Link } from "react-router-dom";
import { trackLeadOnThankYou } from "../lib/metaPixel";
import { createWhatsAppLink } from "../lib/whatsapp";

const businessName =
  import.meta.env.VITE_BUSINESS_NAME || "Griya Estetika Arsitek";

export default function ThankYouPage() {
  useEffect(() => {
    trackLeadOnThankYou();
  }, []);

  return (
    <main className="thank-you-shell">
      <section className="thank-you-card">
        <div className="brand-logo-shell brand-logo-shell--thank-you">
          <BrandLogo
            className="brand-logo brand-logo--thank-you"
            fallbackClassName="logo-fallback--center"
          />
        </div>
        <span className="eyebrow">Data konsultasi sudah masuk</span>
        <h1>Terima kasih, data Anda sudah kami terima.</h1>
        <p className="thank-you-lead">
          Tim Griya Estetika Arsitek akan menghubungi Anda melalui WhatsApp.
        </p>
        <p>
          Jika ingin langsung melanjutkan percakapan, klik tombol WhatsApp di
          bawah ini.
        </p>

        <div className="thank-you-actions">
          <a
            href={createWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="cta-button cta-button--large"
          >
            Lanjut Chat WhatsApp
          </a>
          <Link to="/" className="secondary-button secondary-button--link">
            Kembali ke Beranda
          </Link>
        </div>

        <div className="thank-you-note">
          <strong>{businessName}</strong>
          <p>
            Tim kami akan mempelajari kebutuhan Anda terlebih dahulu agar
            follow-up konsultasi lebih relevan dan efisien.
          </p>
        </div>
      </section>
    </main>
  );
}
