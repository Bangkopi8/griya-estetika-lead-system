const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL?.trim() || "";

export function isGoogleScriptConfigured() {
  return Boolean(GOOGLE_SCRIPT_URL);
}

export async function submitLead(payload) {
  if (!isGoogleScriptConfigured()) {
    return {
      success: false,
      error: "Google Apps Script URL belum dikonfigurasi.",
    };
  }

  try {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengirim data.",
    };
  }
}
