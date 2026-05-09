import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitLead } from "../lib/googleSheet";
import { getKabupatenOptions, getKotaOptions, getProvinceOptions } from "../lib/locations";
import { markLeadPending } from "../lib/metaPixel";
import {
  TRACKING_FIELDS,
  buildTrackingPayload,
  getStoredTrackingParams,
  saveTrackingParams,
} from "../lib/utm";

const initialFormState = {
  nama_lengkap: "",
  whatsapp: "",
  provinsi: "",
  kabupaten: "",
  kota: "",
  kebutuhan: "",
  estimasi_budget: "",
  rencana_mulai: "",
  sudah_punya_lahan_atau_rumah: "",
  catatan: "",
};

function validateWhatsApp(value) {
  const trimmed = value.trim();
  const digitsOnly = trimmed.replace(/[^\d]/g, "");
  const basicPattern = /^[+\d\s-]+$/;

  if (!trimmed) {
    return "Nomor WhatsApp wajib diisi.";
  }

  if (!basicPattern.test(trimmed)) {
    return "Nomor WhatsApp hanya boleh berisi angka, spasi, tanda plus, atau tanda hubung.";
  }

  if (digitsOnly.length < 9) {
    return "Nomor WhatsApp terlihat terlalu pendek.";
  }

  return "";
}

function validateForm(formData) {
  const nextErrors = {};

  if (!formData.nama_lengkap.trim()) {
    nextErrors.nama_lengkap = "Nama lengkap wajib diisi.";
  }

  const whatsappError = validateWhatsApp(formData.whatsapp);

  if (whatsappError) {
    nextErrors.whatsapp = whatsappError;
  }

  if (!formData.provinsi) {
    nextErrors.provinsi = "Silakan pilih provinsi.";
  }

  if (!formData.kabupaten) {
    nextErrors.kabupaten = "Silakan pilih kabupaten.";
  }

  if (!formData.kota) {
    nextErrors.kota = "Silakan pilih kota.";
  }

  if (!formData.kebutuhan) {
    nextErrors.kebutuhan = "Silakan pilih kebutuhan Anda.";
  }

  if (!formData.estimasi_budget) {
    nextErrors.estimasi_budget = "Silakan pilih estimasi budget.";
  }

  if (!formData.rencana_mulai) {
    nextErrors.rencana_mulai = "Silakan pilih rencana mulai.";
  }

  if (!formData.sudah_punya_lahan_atau_rumah) {
    nextErrors.sudah_punya_lahan_atau_rumah = "Silakan pilih status rumah / lahan.";
  }

  return nextErrors;
}

export default function LeadForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingValues, setTrackingValues] = useState(getStoredTrackingParams());

  useEffect(() => {
    setTrackingValues(saveTrackingParams());
  }, [location.search]);

  const provinceOptions = useMemo(() => getProvinceOptions(), []);
  const kabupatenOptions = useMemo(
    () => getKabupatenOptions(formData.provinsi),
    [formData.provinsi]
  );
  const kotaOptions = useMemo(
    () => getKotaOptions(formData.provinsi, formData.kabupaten),
    [formData.kabupaten, formData.provinsi]
  );

  const kotaArea = [formData.kota, formData.kabupaten, formData.provinsi]
    .filter(Boolean)
    .join(", ");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => {
      if (name === "provinsi") {
        return {
          ...current,
          provinsi: value,
          kabupaten: "",
          kota: "",
        };
      }

      if (name === "kabupaten") {
        return {
          ...current,
          kabupaten: value,
          kota: "",
        };
      }

      return {
        ...current,
        [name]: value,
      };
    });

    setErrors((current) => {
      const nextErrors = {
        ...current,
        [name]: "",
      };

      if (name === "provinsi") {
        nextErrors.kabupaten = "";
        nextErrors.kota = "";
      }

      if (name === "kabupaten") {
        nextErrors.kota = "";
      }

      return nextErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validateForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      ...formData,
      kota_area: kotaArea,
      ...buildTrackingPayload(),
    };

    const result = await submitLead(payload);

    if (result.success) {
      markLeadPending();
      setFormData(initialFormState);

      const searchParams = new URLSearchParams(location.search);
      const nextUrl =
        searchParams.get("debug") === "true" ? "/thank-you?debug=true" : "/thank-you";

      navigate(nextUrl);
      return;
    }

    setSubmitError(
      result.error ||
        "Maaf, data belum berhasil terkirim. Silakan coba lagi atau lanjut hubungi kami via WhatsApp."
    );
    setIsSubmitting(false);
  };

  const computedTrackingFields = {
    ...TRACKING_FIELDS.reduce((accumulator, field) => {
      accumulator[field] = trackingValues[field] || "";
      return accumulator;
    }, {}),
    landing_page: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer || "" : "",
    submitted_at: new Date().toISOString(),
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      {Object.entries(computedTrackingFields).map(([field, value]) => (
        <input key={field} type="hidden" name={field} value={value} readOnly />
      ))}
      <input type="hidden" name="kota_area" value={kotaArea} readOnly />

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="nama_lengkap">Nama Lengkap</label>
          <input
            id="nama_lengkap"
            name="nama_lengkap"
            type="text"
            placeholder="Contoh: Andi Pratama"
            value={formData.nama_lengkap}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          {errors.nama_lengkap ? <p className="field-error">{errors.nama_lengkap}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="whatsapp">Nomor WhatsApp</label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="text"
            inputMode="tel"
            placeholder="Contoh: 081234567890"
            value={formData.whatsapp}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          {errors.whatsapp ? <p className="field-error">{errors.whatsapp}</p> : null}
        </div>

        <div className="location-grid form-field--full">
          <div className="form-field">
            <label htmlFor="provinsi">Provinsi</label>
            <select
              id="provinsi"
              name="provinsi"
              value={formData.provinsi}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            >
              <option value="">Pilih provinsi</option>
              {provinceOptions.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {errors.provinsi ? <p className="field-error">{errors.provinsi}</p> : null}
          </div>

          <div className="form-field">
            <label htmlFor="kabupaten">Kabupaten</label>
            <select
              id="kabupaten"
              name="kabupaten"
              value={formData.kabupaten}
              onChange={handleChange}
              disabled={isSubmitting || !formData.provinsi}
              required
            >
              <option value="">Pilih kabupaten</option>
              {kabupatenOptions.map((kabupaten) => (
                <option key={kabupaten} value={kabupaten}>
                  {kabupaten}
                </option>
              ))}
            </select>
            {errors.kabupaten ? <p className="field-error">{errors.kabupaten}</p> : null}
          </div>

          <div className="form-field">
            <label htmlFor="kota">Kota</label>
            <select
              id="kota"
              name="kota"
              value={formData.kota}
              onChange={handleChange}
              disabled={isSubmitting || !formData.kabupaten}
              required
            >
              <option value="">Pilih kota</option>
              {kotaOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.kota ? <p className="field-error">{errors.kota}</p> : null}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="kebutuhan">Kebutuhan Anda</label>
          <select
            id="kebutuhan"
            name="kebutuhan"
            value={formData.kebutuhan}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          >
            <option value="">Pilih kebutuhan</option>
            <option value="Desain rumah baru">Desain rumah baru</option>
            <option value="Renovasi rumah">Renovasi rumah</option>
            <option value="Desain interior">Desain interior</option>
            <option value="Desain fasad">Desain fasad</option>
            <option value="Konsultasi konsep">Konsultasi konsep</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          {errors.kebutuhan ? <p className="field-error">{errors.kebutuhan}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="estimasi_budget">Estimasi Budget</label>
          <select
            id="estimasi_budget"
            name="estimasi_budget"
            value={formData.estimasi_budget}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          >
            <option value="">Pilih estimasi budget</option>
            <option value="Di bawah Rp50 juta">Di bawah Rp50 juta</option>
            <option value="Rp50 juta - Rp100 juta">Rp50 juta - Rp100 juta</option>
            <option value="Rp100 juta - Rp300 juta">Rp100 juta - Rp300 juta</option>
            <option value="Di atas Rp300 juta">Di atas Rp300 juta</option>
            <option value="Belum tahu / masih survey">Belum tahu / masih survey</option>
          </select>
          {errors.estimasi_budget ? <p className="field-error">{errors.estimasi_budget}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="rencana_mulai">Rencana Mulai</label>
          <select
            id="rencana_mulai"
            name="rencana_mulai"
            value={formData.rencana_mulai}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          >
            <option value="">Pilih rencana mulai</option>
            <option value="Secepatnya">Secepatnya</option>
            <option value="1-3 bulan">1-3 bulan</option>
            <option value="3-6 bulan">3-6 bulan</option>
            <option value="Masih survey">Masih survey</option>
          </select>
          {errors.rencana_mulai ? <p className="field-error">{errors.rencana_mulai}</p> : null}
        </div>

        <div className="form-field">
          <label htmlFor="sudah_punya_lahan_atau_rumah">Status Rumah / Lahan</label>
          <select
            id="sudah_punya_lahan_atau_rumah"
            name="sudah_punya_lahan_atau_rumah"
            value={formData.sudah_punya_lahan_atau_rumah}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          >
            <option value="">Pilih status</option>
            <option value="Sudah punya rumah">Sudah punya rumah</option>
            <option value="Sudah punya lahan">Sudah punya lahan</option>
            <option value="Belum punya">Belum punya</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          {errors.sudah_punya_lahan_atau_rumah ? (
            <p className="field-error">{errors.sudah_punya_lahan_atau_rumah}</p>
          ) : null}
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="catatan">Ceritakan kebutuhan Anda</label>
          <textarea
            id="catatan"
            name="catatan"
            placeholder="Contoh: Saya ingin renovasi fasad rumah agar terlihat lebih modern."
            value={formData.catatan}
            onChange={handleChange}
            disabled={isSubmitting}
            rows="5"
          />
        </div>
      </div>

      <p className="submit-note">
        Data Anda hanya digunakan untuk kebutuhan konsultasi dan follow-up dari tim
        Griya Estetika Arsitek.
      </p>

      {submitError ? <p className="form-error">{submitError}</p> : null}

      <button type="submit" className="cta-button cta-button--full" disabled={isSubmitting}>
        {isSubmitting ? "Mengirim..." : "Kirim & Lanjut Konsultasi"}
      </button>
    </form>
  );
}
