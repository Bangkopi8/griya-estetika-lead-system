# Griya Estetika Lead System

Landing page lead generation untuk **GEA / Griya Estetika Arsitek** dengan fokus pada **lead quality tracking** dan **ROI tracking**, bukan hanya jumlah chat WhatsApp.

Flow utama:

**Meta Ads -> Landing Page -> Form Submit -> Google Sheet -> Thank You Page -> Meta Pixel Lead Event -> WhatsApp Follow-up**

## 1. Project Overview

Project ini dibuat untuk menggantikan alur lama:

**Meta Ads -> WhatsApp**

Masalah alur lama:

- Sulit mengukur lead berkualitas
- Sulit tahu campaign, ad set, dan creative mana yang benar-benar menghasilkan lead
- Sulit tahu kontribusi Meta Ads terhadap closing
- Sulit mengevaluasi profitabilitas kampanye

Solusi MVP ini:

- Landing page khusus lead generation
- Form konsultasi dengan data lead yang lebih rapi
- Penyimpanan lead ke Google Sheet
- Capture UTM dan Meta dynamic parameters
- Redirect ke halaman `/thank-you` setelah submit sukses
- Meta Pixel `Lead` event hanya ditembak di halaman thank-you
- Tombol WhatsApp hanya dipakai setelah form berhasil dikirim

## 2. Folder Structure

```text
griya-estetika-lead-system/
  package.json
  index.html
  vite.config.js
  vercel.json
  .env.example
  README.md
  google-apps-script.gs

  public/
    assets/
      gea-logo.png
      hero-placeholder.jpg
      project-1.jpg
      project-2.jpg
      project-3.jpg

  src/
    main.jsx
    App.jsx

    pages/
      LandingPage.jsx
      ThankYouPage.jsx

    components/
      BrandLogo.jsx
      LeadForm.jsx
      Section.jsx
      FAQ.jsx
      ServiceCard.jsx
      PortfolioCard.jsx
      DebugPanel.jsx

    lib/
      utm.js
      googleSheet.js
      locations.js
      metaPixel.js
      whatsapp.js

    styles/
      global.css
```

## 3. Local Setup

### Prasyarat

- Node.js 18+ disarankan
- npm tersedia

### Jalankan lokal

```bash
npm install
npm run dev
```

Jika PowerShell Anda memblokir `npm`, jalankan:

```bash
npm.cmd install
npm.cmd run dev
```

Lalu buka URL lokal yang ditampilkan Vite, biasanya:

```text
http://localhost:5173
```

## 4. Environment Variables

Salin `.env.example` menjadi `.env` lalu isi nilainya:

```env
VITE_META_PIXEL_ID=YOUR_PIXEL_ID_HERE
VITE_GOOGLE_SCRIPT_URL=YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE
VITE_WHATSAPP_NUMBER=6282155573336
VITE_BUSINESS_NAME=Griya Estetika Arsitek
VITE_SITE_URL=https://yourdomain.com
VITE_INSTAGRAM_URL=https://www.instagram.com/griyaestetika.arsitek
VITE_EMAIL=griyaestetikaarsitek@gmail.com
VITE_ADDRESS=Jalan Dr Radjiman No 557B, Laweyan, Surakarta
```

Keterangan:

- `VITE_META_PIXEL_ID`: ID Meta Pixel Anda
- `VITE_GOOGLE_SCRIPT_URL`: URL Web App Google Apps Script
- `VITE_WHATSAPP_NUMBER`: nomor WhatsApp bisnis dalam format internasional tanpa spasi
- `VITE_SITE_URL`: domain produksi landing page
- `VITE_INSTAGRAM_URL`, `VITE_EMAIL`, `VITE_ADDRESS`: info kontak footer

## 5. Google Sheet Setup

1. Buat Google Sheet baru.
2. Beri nama file misalnya: `GEA Leads`.
3. Sheet `Leads` tidak perlu dibuat manual karena script akan membuatnya otomatis jika belum ada.
4. Kolom header juga dibuat otomatis oleh script saat submit pertama.

Data yang disimpan:

- Timestamp
- Nama Lengkap
- WhatsApp
- Provinsi
- Kabupaten
- Kota
- Kota Area
- Kebutuhan
- Estimasi Budget
- Rencana Mulai
- Sudah Punya Lahan/Rumah
- Catatan
- UTM Source
- UTM Medium
- UTM Campaign
- UTM Adset
- UTM Ad
- Campaign ID
- Adset ID
- Ad ID
- FBCLID
- Landing Page
- Referrer
- Submitted At
- Status Follow Up
- Lead Quality
- Notes Sales

## 6. Google Apps Script Deployment

File contoh backend form sudah tersedia di `google-apps-script.gs`.

Cara pasang:

1. Buka Google Sheet yang akan dipakai.
2. Klik `Extensions -> Apps Script`.
3. Hapus script default jika ada.
4. Paste isi file `google-apps-script.gs`.
5. Klik `Deploy -> New deployment`.
6. Pada `Type`, pilih `Web App`.
7. `Execute as`: `Me`
8. `Who has access`: `Anyone`
9. Deploy lalu copy `Web App URL`.
10. Masukkan URL itu ke `.env` sebagai `VITE_GOOGLE_SCRIPT_URL`.

Catatan:

- Frontend mengirim form via `POST` dengan `FormData`
- Mode request dibuat aman untuk Google Apps Script
- Lead dianggap sukses dari sisi frontend jika request berhasil terkirim tanpa error browser

## 7. Meta Pixel Setup

1. Buat atau pilih Meta Pixel di Meta Events Manager.
2. Masukkan Pixel ID ke `.env` sebagai `VITE_META_PIXEL_ID`.
3. Pixel base script akan dimuat hanya jika ID tersedia.
4. `PageView` akan dikirim di semua page view dan route change.
5. `Lead` hanya dikirim di `/thank-you`.
6. Event `Lead` hanya dikirim jika halaman thank-you dibuka setelah form submit sukses.
7. Tidak ada data personal yang dikirim ke Meta Pixel.

Parameter event `Lead`:

```text
content_name: Griya Estetika Arsitek Form Submit
lead_source: Meta Landing Page
```

## 8. Meta Ads Setup

Checklist setup Meta Ads:

- Objective: `Leads`
- Conversion location: `Website`
- Pixel: pilih Meta Pixel yang dipakai landing page
- Conversion event: `Lead`
- Destination URL: URL landing page produksi
- URL parameters: gunakan template UTM di bawah
- Jangan optimize untuk profile visits
- Jangan hitung landing page views sebagai leads
- Lead harus dihitung hanya setelah thank-you page event

## 9. UTM Parameter Template

Gunakan template URL parameter berikut persis seperti ini:

```text
utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_adset={{adset.name}}&utm_ad={{ad.name}}&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}
```

Contoh URL test:

```text
https://yourdomain.com/?utm_source=meta&utm_medium=paid_social&utm_campaign=test_campaign&utm_adset=test_adset&utm_ad=test_ad&campaign_id=123&adset_id=456&ad_id=789&fbclid=test123
```

## 10. Testing Checklist

1. Jalankan project lokal.
2. Buka landing page dengan test parameter:

```text
?utm_source=meta&utm_medium=paid_social&utm_campaign=test_campaign&utm_adset=test_adset&utm_ad=test_ad&campaign_id=123&adset_id=456&ad_id=789&fbclid=test123
```

3. Isi form sampai submit sukses.
4. Pastikan data masuk ke Google Sheet.
5. Pastikan redirect ke `/thank-you`.
6. Pastikan tombol WhatsApp membuka nomor yang benar.
7. Pastikan `PageView` muncul di Meta Events Manager.
8. Pastikan `Lead` muncul hanya di halaman thank-you.
9. Pastikan field UTM tersembunyi ikut masuk ke Google Sheet.
10. Pastikan tidak ada personal data yang terkirim ke Meta Pixel.
11. Tambahkan `?debug=true` untuk membuka debug panel dan mengecek konfigurasi tracking.

## 11. GitHub Repository Setup

Setelah project siap:

```bash
git init
git add .
git commit -m "Initial Griya Estetika lead system"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## 12. Vercel Deployment Guide

1. Push code ke GitHub.
2. Buka Vercel.
3. Klik `Add New Project`.
4. Import repository GitHub Anda.
5. Framework preset: `Vite`
6. Build command: `npm run build`
7. Output directory: `dist`
8. Pastikan file `vercel.json` ikut ter-push agar route SPA seperti `/thank-you` tetap diarahkan ke `index.html`.
9. Tambahkan environment variables berikut:
   - `VITE_META_PIXEL_ID`
   - `VITE_GOOGLE_SCRIPT_URL`
   - `VITE_WHATSAPP_NUMBER`
   - `VITE_BUSINESS_NAME`
   - `VITE_SITE_URL`
   - `VITE_INSTAGRAM_URL`
   - `VITE_EMAIL`
   - `VITE_ADDRESS`
10. Klik deploy.
11. Setelah selesai, test URL produksi termasuk route `/thank-you`.
12. Gunakan URL produksi itu sebagai destination URL di Meta Ads.

## 13. Optional Railway Backend Note

Railway **tidak diperlukan untuk MVP ini** karena form sudah memakai Google Apps Script dan Google Sheet.

Railway akan berguna nanti jika ingin menambah:

- Custom backend API
- Database
- Server-side validation
- Meta Conversions API
- CRM integration
- Lead scoring automation

## 14. Troubleshooting

### Form submit tidak masuk ke Google Sheet

- Pastikan `VITE_GOOGLE_SCRIPT_URL` benar
- Pastikan Web App Google Apps Script sudah di-deploy
- Pastikan akses Web App adalah `Anyone`
- Test ulang dengan data sederhana
- Jika form menampilkan pesan `Google Apps Script URL belum dikonfigurasi.`, periksa kembali file `.env` atau environment variables di Vercel

### Pixel tidak muncul di Events Manager

- Pastikan `VITE_META_PIXEL_ID` benar
- Cek browser console
- Pastikan domain produksi yang diuji benar
- Cek dengan Meta Pixel Helper atau Test Events

### Lead event muncul terlalu cepat

Yang benar:

- `Lead` **tidak** ditembak saat page load landing page
- `Lead` **tidak** ditembak saat klik tombol CTA
- `Lead` **hanya** ditembak di halaman `/thank-you` setelah submit berhasil

### UTM tidak terbaca

- Pastikan parameter URL lengkap
- Pastikan buka landing page dari URL yang mengandung UTM
- Cek panel debug dengan `?debug=true`

### Tombol WhatsApp salah nomor

- Pastikan `VITE_WHATSAPP_NUMBER` memakai format internasional
- Contoh benar: `6282155573336`

## Ringkasan Tracking Rules

- Lead **bukan** dihitung saat landing page dikunjungi
- Lead **bukan** dihitung saat tombol diklik
- Lead dihitung **hanya** setelah submit form sukses
- Redirect ke `/thank-you` setelah submit sukses
- Event Meta Pixel `Lead` hanya di `/thank-you`
- Data personal hanya disimpan di Google Sheet
- UTM dan Meta dynamic parameters ikut disimpan di Google Sheet
- Tombol WhatsApp dipakai setelah form submit, bukan sebelum submit
