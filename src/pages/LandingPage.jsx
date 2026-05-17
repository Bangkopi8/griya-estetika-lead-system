import BrandLogo from "../components/BrandLogo";
import FAQ from "../components/FAQ";
import LeadForm from "../components/LeadForm";
import PortfolioCard from "../components/PortfolioCard";
import Section from "../components/Section";
import ServiceCard from "../components/ServiceCard";

const businessName =
  import.meta.env.VITE_BUSINESS_NAME || "Griya Estetika Arsitek";
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "6282155573336";
const instagramUrl =
  import.meta.env.VITE_INSTAGRAM_URL ||
  "https://www.instagram.com/griyaestetika.arsitek";
const emailAddress =
  import.meta.env.VITE_EMAIL || "griyaestetikaarsitek@gmail.com";
const officeAddress =
  import.meta.env.VITE_ADDRESS ||
  "Jalan Dr Radjiman No 557B, Laweyan, Surakarta";

const problemPoints = [
  "Bingung mulai desain rumah dari mana",
  "Takut anggaran membengkak",
  "Sudah punya ide, tapi belum bisa divisualisasikan",
  "Ingin renovasi, tapi belum tahu konsep terbaik",
  "Takut hasil akhir tidak sesuai ekspektasi",
  "Bingung memilih jasa arsitek yang amanah dan komunikatif",
  "Khawatir pengerjaan tidak tepat waktu atau tidak sesuai rencana",
];

const solutionPoints = [
  "Membantu merapikan ide desain agar lebih realistis dan terarah",
  "Membuat konsep rumah lebih jelas sebelum masuk ke tahap eksekusi",
  "Menyesuaikan desain dengan fungsi ruang, gaya hidup, dan budget",
  "Membantu customer lebih siap sebelum membangun atau renovasi",
  "Memberikan arahan desain yang lebih terstruktur sejak awal",
];

const services = [
  {
    icon: "DR",
    title: "Desain Rumah",
    description:
      "Perencanaan rumah baru dengan pendekatan estetika, fungsi ruang, dan alur aktivitas keluarga.",
  },
  {
    icon: "RR",
    title: "Renovasi Rumah",
    description:
      "Merapikan tampilan dan fungsi rumah eksisting agar lebih nyaman, modern, dan sesuai kebutuhan.",
  },
  {
    icon: "DI",
    title: "Desain Interior",
    description:
      "Konsep interior yang menyatu dengan karakter penghuni dan memberi pengalaman ruang yang lebih hangat.",
  },
  {
    icon: "DF",
    title: "Desain Fasad",
    description:
      "Tampilan muka bangunan yang lebih estetik, berkarakter, dan meningkatkan first impression properti.",
  },
  {
    icon: "KK",
    title: "Konsultasi Konsep",
    description:
      "Sesi terarah untuk merapikan kebutuhan ruang, gaya desain, prioritas budget, dan tahapan proyek.",
  },
  {
    icon: "PL",
    title: "Perencanaan Layout",
    description:
      "Pengaturan layout ruang agar sirkulasi, pencahayaan, dan zoning lebih efektif sejak awal.",
  },
  {
    icon: "GT",
    title: "Gambar Teknis Arsitektur",
    description:
      "Dokumen teknis yang lebih siap dipakai untuk koordinasi eksekusi dan komunikasi dengan pelaksana.",
  },
  {
    icon: "3D",
    title: "3D Visual / Rendering",
    description:
      "Visualisasi desain yang membantu Anda memahami arah hasil akhir sebelum pembangunan dimulai.",
  },
];

const processSteps = [
  {
    emoji: "📋",
    label: "Isi Form",
    text: "Isi form singkat agar kebutuhan awal Anda tercatat dengan rapi.",
  },
  {
    emoji: "🔍",
    label: "Analisis Kebutuhan",
    text: "Tim memahami kebutuhan, area, target budget, dan rencana proyek Anda.",
  },
  {
    emoji: "💬",
    label: "Konsultasi WhatsApp",
    text: "Konsultasi dilanjutkan via WhatsApp agar pembahasan lebih efisien.",
  },
  {
    emoji: "🏠",
    label: "Arah Konsep",
    text: "Kami bantu arahkan konsep, kebutuhan ruang, dan estimasi budget secara lebih terstruktur.",
  },
  {
    emoji: "✏️",
    label: "Mulai Desain",
    text: "Jika cocok, proses dilanjutkan ke tahap desain yang sesuai kebutuhan proyek Anda.",
  },
];

const portfolioItems = [
  {
    title: "YM House",
    category: "Desain Rumah Tinggal",
    description:
      "Desain rumah tinggal dengan nuansa hangat, fasad elegan, dan tata ruang yang menyeimbangkan estetika serta fungsi.",
    image: "/assets/project-1.jpg",
  },
  {
    title: "Ruko Jogja",
    category: "Komersial",
    description:
      "Konsep bangunan komersial modern yang profesional untuk kebutuhan usaha dan properti bisnis.",
    image: "/assets/project-2.jpg",
  },
  {
    title: "The Green Park Residence",
    category: "Studi Konsep",
    description:
      "Konsep hunian kontemporer dengan atap dramatic, material alami, dan lanskap yang menyatu dengan alam.",
    image: "/assets/project-3.jpg",
  },
  {
    title: "Rumah Minimalis Modern",
    category: "Realisasi",
    description:
      "Desain rumah tinggal yang bersih dan proporsional dengan pendekatan modern minimalis yang timeless.",
    image: "/assets/project-4.jpg",
  },
  {
    title: "Modern Residence",
    category: "Rumah Modern",
    description:
      "Gaya rumah modern yang bersih, proporsional, dan mudah disesuaikan dengan kebutuhan keluarga masa kini.",
    image: "/assets/project-5.jpg",
  },
  {
    title: "Restaurant Jawa",
    category: "Komersial & Resto",
    description:
      "Desain restoran berkonsep Jawa tradisional dengan material kayu dan suasana yang hangat dan berkarakter.",
    image: "/assets/project-6.jpg",
  },
];

const reasons = [
  "Desain Up to Date",
  "Kualitas Terjamin",
  "Estetika, Elegan & Mewah",
  "Tim Ahli & Profesional",
  "Hasil menyesuaikan desain yang diminta customer",
  "Konsultasi lebih mudah dan terarah",
  "Komunikasi jelas sejak awal",
  "Perencanaan desain lebih rapi sebelum eksekusi",
];

const faqItems = [
  {
    question: "Apakah konsultasi awal gratis?",
    answer:
      "Ya. Konsultasi awal gratis agar tim kami bisa memahami kebutuhan dasar Anda sebelum masuk ke tahap berikutnya.",
  },
  {
    question: "Apakah desain bisa menyesuaikan budget?",
    answer:
      "Bisa. Kami membantu mengarahkan konsep dan prioritas desain agar tetap realistis dengan target budget Anda.",
  },
  {
    question: "Apakah melayani renovasi rumah?",
    answer:
      "Ya. Kami melayani kebutuhan renovasi rumah, mulai dari perapian fasad hingga penataan ulang ruang.",
  },
  {
    question: "Apakah bisa desain interior juga?",
    answer:
      "Bisa. Kami juga membantu desain interior agar suasana ruang lebih nyaman, estetik, dan selaras dengan karakter penghuni.",
  },
  {
    question: "Setelah isi form, prosesnya bagaimana?",
    answer:
      "Tim akan meninjau data Anda terlebih dahulu, lalu melanjutkan komunikasi via WhatsApp agar konsultasi lebih efisien.",
  },
  {
    question: "Apakah saya langsung dihubungi via WhatsApp?",
    answer:
      "Ya. Setelah form dikirim, tim kami akan melakukan follow-up melalui WhatsApp sesuai kebutuhan dan ketersediaan tim.",
  },
  {
    question: "Apakah bisa membantu dari konsep sampai gambar teknis?",
    answer:
      "Bisa. Kami dapat membantu mulai dari perumusan konsep, layout, visual 3D, hingga gambar teknis arsitektur.",
  },
];

function formatWhatsAppDisplay(number) {
  const digits = number.replace(/[^\d]/g, "");

  if (!digits) {
    return "-";
  }

  if (digits.startsWith("62")) {
    return `+${digits}`;
  }

  return digits;
}

export default function LandingPage() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container navbar">
          <button
            type="button"
            className="brand-link"
            onClick={() => scrollToSection("hero")}
            aria-label="Ke bagian hero"
          >
            <span className="brand-logo-shell brand-logo-shell--header">
              <BrandLogo className="brand-logo brand-logo--header" />
            </span>
          </button>

          <nav className="header-nav" aria-label="Navigasi utama">
            <button
              type="button"
              className="nav-button"
              onClick={() => scrollToSection("layanan")}
            >
              Layanan
            </button>
            <button
              type="button"
              className="nav-button"
              onClick={() => scrollToSection("portofolio")}
            >
              Portofolio
            </button>
            <button
              type="button"
              className="nav-button"
              onClick={() => scrollToSection("cara-kerja")}
            >
              Cara Kerja
            </button>
            <button
              type="button"
              className="nav-button"
              onClick={() => scrollToSection("faq")}
            >
              FAQ
            </button>
          </nav>

          <button
            type="button"
            className="cta-button"
            onClick={() => scrollToSection("lead-form")}
          >
            Konsultasi Gratis
          </button>
        </div>
      </header>

      <main>
        <section id="hero" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Easy In Building Aesthetic</span>
              <h1 className="hero-title">
                Mau Punya Rumah yang Estetik, Elegan, dan Terencana?
              </h1>
              <p className="hero-subtitle">
                Kami bantu wujudkan desain rumah, renovasi, dan interior impian
                Anda dengan konsep yang lebih rapi, jelas, dan menyesuaikan
                kebutuhan.
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="cta-button cta-button--large"
                  onClick={() => scrollToSection("lead-form")}
                >
                  Konsultasi Gratis Sekarang
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => scrollToSection("cara-kerja")}
                >
                  Lihat Cara Kerjanya
                </button>
              </div>

              <ul className="trust-list">
                <li>Konsultasi awal gratis</li>
                <li>Desain menyesuaikan kebutuhan dan budget</li>
                <li>Cocok untuk renovasi, bangun rumah, dan desain interior</li>
                <li>Dibantu tim arsitek yang profesional</li>
              </ul>
            </div>

            <div className="hero-visual-card">
              <div className="hero-visual-brand">
                <span className="brand-logo-shell brand-logo-shell--hero">
                  <BrandLogo className="brand-logo brand-logo--hero" />
                </span>
              </div>

              <div className="hero-image-shell">
                <img
                  src="/assets/hero-placeholder.jpg"
                  alt="Visual arah desain arsitektur Griya Estetika Arsitek"
                  className="hero-image"
                  loading="eager"
                  decoding="async"
                />
                <div className="hero-architecture" aria-hidden="true">
                  <span className="hero-line hero-line--one" />
                  <span className="hero-line hero-line--two" />
                  <span className="hero-line hero-line--three" />
                </div>
              </div>

              <div className="hero-stat-card">
                <strong>Konsultasi lebih efisien</strong>
                <p>
                  Isi form terlebih dahulu agar tim memahami kebutuhan rumah,
                  area, budget, dan target mulai proyek Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Section
          title="Butuh jasa arsitek yang handal dan profesional?"
          description="Kami memahami banyak calon customer datang dengan kebutuhan yang beragam, tetapi belum punya arah yang jelas untuk memulai."
        >
          <div className="problem-grid">
            {problemPoints.map((point) => (
              <article key={point} className="feature-card">
                <span className="accent-line" />
                <p>{point}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          className="section--alt"
          title="Kami Bantu Wujudkan Impianmu"
          description="Griya Estetika Arsitek membantu Anda menata kebutuhan proyek dengan lebih rapi sebelum melangkah ke proses desain dan pembangunan."
        >
          <div className="solution-layout">
            <div className="solution-copy-card">
              <p className="solution-copy">
                Kami bukan hanya membantu membuat tampilan rumah lebih estetik,
                tetapi juga membantu memetakan langkah agar keputusan desain
                terasa lebih matang sejak awal.
              </p>
              <ul className="check-list">
                {solutionPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <aside className="insight-card">
              <span className="eyebrow">Konsultasi yang lebih terarah</span>
              <h3>Obrolan WhatsApp tidak mulai dari nol</h3>
              <p>
                Saat form sudah terisi, tim kami bisa langsung fokus ke
                kebutuhan utama, prioritas ruang, area proyek, dan estimasi
                budget.
              </p>
            </aside>
          </div>
        </Section>

        <Section
          id="layanan"
          title="Layanan Griya Estetika Arsitek"
          description="Pilihan layanan dirancang agar Anda bisa menyesuaikan kebutuhan mulai dari konsep awal hingga kesiapan dokumen teknis."
        >
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Section>

        <Section
          id="cara-kerja"
          className="section--alt"
          title="Tahap Konsultasi"
          description="Mengisi form lebih dulu membuat proses konsultasi via WhatsApp menjadi jauh lebih efektif dan tidak perlu mengulang dari awal."
        >
          <div className="process-grid">
            {processSteps.map((step) => (
              <article key={step.label} className="process-card">
                <span className="process-emoji" aria-hidden="true">{step.emoji}</span>
                <strong className="process-label">{step.label}</strong>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="portofolio"
          title="Contoh Arah Desain & Project"
          description="Beberapa contoh tampilan visual berikut disiapkan agar mudah diganti nanti saat aset project asli sudah tersedia."
        >
          <div className="portfolio-grid">
            {portfolioItems.map((item) => (
              <PortfolioCard key={item.title} {...item} />
            ))}
          </div>
        </Section>

        <Section
          className="section--alt"
          title="Kenapa Memilih Griya Estetika Arsitek?"
          description="Kami membangun pengalaman konsultasi yang lebih jelas, estetis, dan nyaman untuk calon customer yang ingin merencanakan proyek dengan lebih serius."
        >
          <div className="reasons-grid">
            {reasons.map((reason) => (
              <article key={reason} className="reason-card">
                <span className="reason-badge" aria-hidden="true">
                  <img src="/assets/gea-logo.png" alt="GEA" />
                </span>
                <p>{reason}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="lead-form"
          title="Ceritakan Kebutuhan Rumah Anda"
          description="Isi data singkat berikut agar tim kami bisa memahami kebutuhan Anda sebelum menghubungi via WhatsApp."
        >
          <div className="lead-grid">
            <aside className="lead-copy-card">
              <span className="eyebrow">Konsultasi lebih jelas sejak awal</span>
              <p>
                Dengan mengisi form ini, konsultasi akan lebih jelas karena tim
                kami sudah mengetahui kebutuhan, area, budget, dan rencana Anda
                sejak awal.
              </p>
              <p className="privacy-note">
                Data Anda hanya digunakan untuk kebutuhan konsultasi dan
                follow-up dari tim Griya Estetika Arsitek.
              </p>
              <div className="contact-mini-card">
                <strong>{businessName}</strong>
                <span>{formatWhatsAppDisplay(whatsappNumber)}</span>
                <span>{officeAddress}</span>
              </div>
            </aside>

            <div className="lead-form-card">
              <LeadForm />
            </div>
          </div>
        </Section>

        <Section
          id="faq"
          className="section--alt"
          title="FAQ"
          description="Beberapa pertanyaan yang sering diajukan calon customer sebelum mulai konsultasi."
        >
          <FAQ items={faqItems} />
        </Section>

        <section className="section final-cta-section">
          <div className="container">
            <div className="final-cta-card">
              <span className="eyebrow">Rencanakan dengan lebih matang</span>
              <h2>
                Percayakan Perencanaan Rumah Anda Bersama Griya Estetika
                Arsitek
              </h2>
              <p>
                Isi form singkat sekarang agar tim kami bisa menyiapkan
                follow-up konsultasi yang lebih relevan dan efisien.
              </p>
              <button
                type="button"
                className="cta-button cta-button--large"
                onClick={() => scrollToSection("lead-form")}
              >
                Konsultasi Gratis Sekarang
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="brand-logo-shell brand-logo-shell--footer">
              <BrandLogo className="brand-logo brand-logo--footer" />
            </span>
            <div>
              <strong>{businessName}</strong>
              <p>Easy In Building Aesthetic</p>
            </div>
          </div>

          <div className="footer-contact">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp: {formatWhatsAppDisplay(whatsappNumber)}
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
            <address>{officeAddress}</address>
          </div>
        </div>
      </footer>
    </div>
  );
}
