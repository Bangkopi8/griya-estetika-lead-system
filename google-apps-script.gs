/**
 * Griya Estetika Arsitek - Lead Capture Script
 *
 * Cara deploy:
 * 1. Open Google Sheet
 * 2. Extensions -> Apps Script
 * 3. Paste this code
 * 4. Deploy -> New Deployment
 * 5. Type: Web App
 * 6. Execute as: Me
 * 7. Access: Anyone
 * 8. Copy Web App URL
 *
 * Catatan:
 * - Script ini akan memastikan sheet "Leads" selalu memakai header terbaru.
 * - Jika sebelumnya ada kolom lama seperti Tipe Wilayah / Lokasi Lainnya / Kabupaten/Kota,
 *   script akan menyelaraskan struktur sheet ke header baru.
 */

const SHEET_NAME = "Leads";
const HEADERS = [
  "Timestamp",
  "Nama Lengkap",
  "WhatsApp",
  "Provinsi",
  "Kabupaten",
  "Kota",
  "Kota Area",
  "Kebutuhan",
  "Estimasi Budget",
  "Rencana Mulai",
  "Sudah Punya Lahan/Rumah",
  "Catatan",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "UTM Adset",
  "UTM Ad",
  "Campaign ID",
  "Adset ID",
  "Ad ID",
  "FBCLID",
  "Landing Page",
  "Referrer",
  "Submitted At",
  "Status Follow Up",
  "Lead Quality",
  "Notes Sales",
];

function doPost(e) {
  try {
    const params = (e && e.parameter) || {};
    const sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      params.nama_lengkap || "",
      params.whatsapp || "",
      params.provinsi || "",
      params.kabupaten || "",
      params.kota || "",
      params.kota_area || "",
      params.kebutuhan || "",
      params.estimasi_budget || "",
      params.rencana_mulai || "",
      params.sudah_punya_lahan_atau_rumah || "",
      params.catatan || "",
      params.utm_source || "",
      params.utm_medium || "",
      params.utm_campaign || "",
      params.utm_adset || "",
      params.utm_ad || "",
      params.campaign_id || "",
      params.adset_id || "",
      params.ad_id || "",
      params.fbclid || "",
      params.landing_page || "",
      params.referrer || "",
      params.submitted_at || "",
      "New",
      "",
      "",
    ]);

    return jsonResponse_({
      success: true,
      message: "Lead saved successfully",
    });
  } catch (error) {
    return jsonResponse_({
      success: false,
      error: error && error.message ? error.message : "Unknown error",
    });
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  ensureHeaders_(sheet);
  return sheet;
}

function ensureHeaders_(sheet) {
  syncColumnCount_(sheet);

  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeader = HEADERS.every(function (header, index) {
    return currentHeaders[index] === header;
  });

  if (!hasHeader) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  sheet.setFrozenRows(1);
}

function syncColumnCount_(sheet) {
  const currentColumnCount = sheet.getMaxColumns();

  if (currentColumnCount < HEADERS.length) {
    sheet.insertColumnsAfter(currentColumnCount, HEADERS.length - currentColumnCount);
  }

  if (sheet.getMaxColumns() > HEADERS.length) {
    sheet.deleteColumns(HEADERS.length + 1, sheet.getMaxColumns() - HEADERS.length);
  }
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
