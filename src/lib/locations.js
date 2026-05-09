export const LOCATION_DATA = {
  "Jawa Tengah": {
    "Kabupaten Sukoharjo": [
      "Sukoharjo",
      "Kartasura",
      "Grogol",
      "Baki",
      "Gatak",
      "Nguter",
      "Bendosari",
      "Mojolaban",
    ],
    "Kabupaten Karanganyar": [
      "Karanganyar",
      "Colomadu",
      "Jaten",
      "Gondangrejo",
      "Tasikmadu",
      "Kebakkramat",
      "Tawangmangu",
    ],
    "Kabupaten Boyolali": [
      "Boyolali",
      "Ampel",
      "Simo",
      "Mojosongo",
      "Teras",
      "Banyudono",
      "Ngemplak",
    ],
    "Kabupaten Klaten": [
      "Klaten",
      "Prambanan",
      "Delanggu",
      "Ceper",
      "Wedi",
      "Pedan",
      "Trucuk",
    ],
    "Kabupaten Sragen": [
      "Sragen",
      "Masaran",
      "Sidoharjo",
      "Gemolong",
      "Karangmalang",
      "Gondang",
    ],
    "Kabupaten Wonogiri": [
      "Wonogiri",
      "Ngadirojo",
      "Baturetno",
      "Pracimantoro",
      "Selogiri",
    ],
    "Kota Surakarta": [
      "Surakarta",
      "Laweyan",
      "Serengan",
      "Pasar Kliwon",
      "Jebres",
      "Banjarsari",
    ],
    "Kota Semarang": [
      "Semarang",
      "Semarang Tengah",
      "Semarang Barat",
      "Semarang Timur",
      "Semarang Selatan",
      "Semarang Utara",
      "Banyumanik",
      "Tembalang",
    ],
  },
  "DI Yogyakarta": {
    "Kabupaten Sleman": [
      "Sleman",
      "Depok",
      "Ngaglik",
      "Mlati",
      "Gamping",
      "Kalasan",
    ],
    "Kabupaten Bantul": [
      "Bantul",
      "Sewon",
      "Banguntapan",
      "Kasihan",
      "Piyungan",
    ],
    "Kota Yogyakarta": [
      "Yogyakarta",
      "Gondokusuman",
      "Umbulharjo",
      "Kotagede",
      "Mantrijeron",
    ],
  },
  "Jawa Timur": {
    "Kabupaten Sidoarjo": ["Sidoarjo", "Waru", "Taman", "Gedangan", "Candi"],
    "Kabupaten Gresik": ["Gresik", "Kebomas", "Manyar", "Driyorejo", "Menganti"],
    "Kota Surabaya": [
      "Surabaya",
      "Surabaya Pusat",
      "Surabaya Selatan",
      "Surabaya Barat",
      "Surabaya Timur",
      "Surabaya Utara",
    ],
    "Kota Malang": [
      "Malang",
      "Klojen",
      "Blimbing",
      "Lowokwaru",
      "Sukun",
      "Kedungkandang",
    ],
  },
  "Jawa Barat": {
    "Kabupaten Bandung": [
      "Soreang",
      "Baleendah",
      "Dayeuhkolot",
      "Cileunyi",
      "Majalaya",
    ],
    "Kabupaten Bekasi": ["Cikarang", "Tambun", "Babelan", "Tarumajaya", "Setu"],
    "Kota Bandung": [
      "Bandung",
      "Bandung Wetan",
      "Coblong",
      "Sukajadi",
      "Cicendo",
    ],
    "Kota Bekasi": [
      "Bekasi",
      "Bekasi Barat",
      "Bekasi Timur",
      "Bekasi Selatan",
      "Bekasi Utara",
    ],
  },
  "DKI Jakarta": {
    "Kota Jakarta Pusat": [
      "Jakarta Pusat",
      "Menteng",
      "Tanah Abang",
      "Kemayoran",
      "Senen",
    ],
    "Kota Jakarta Selatan": [
      "Jakarta Selatan",
      "Kebayoran Baru",
      "Kebayoran Lama",
      "Tebet",
      "Pancoran",
      "Cilandak",
    ],
    "Kota Jakarta Barat": [
      "Jakarta Barat",
      "Grogol Petamburan",
      "Kebon Jeruk",
      "Cengkareng",
      "Palmerah",
    ],
    "Kota Jakarta Timur": [
      "Jakarta Timur",
      "Matraman",
      "Jatinegara",
      "Duren Sawit",
      "Cakung",
    ],
    "Kota Jakarta Utara": [
      "Jakarta Utara",
      "Kelapa Gading",
      "Tanjung Priok",
      "Pademangan",
      "Penjaringan",
    ],
  },
};

export function getProvinceOptions() {
  return Object.keys(LOCATION_DATA);
}

export function getKabupatenOptions(provinsi) {
  if (!provinsi || !LOCATION_DATA[provinsi]) {
    return [];
  }

  return Object.keys(LOCATION_DATA[provinsi]);
}

export function getKotaOptions(provinsi, kabupaten) {
  if (!provinsi || !kabupaten || !LOCATION_DATA[provinsi]?.[kabupaten]) {
    return [];
  }

  return LOCATION_DATA[provinsi][kabupaten];
}
