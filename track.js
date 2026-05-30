const PIXEL_ID = "1594927217883159";
const ACCESS_TOKEN = process.env.CAPI_ACCESS_TOKEN;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!ACCESS_TOKEN) {
    return res.status(500).json({ error: "CAPI token not configured" });
  }

  const { event_name, event_time, event_source_url, client_ip_address, client_user_agent, fbp, fbc, custom_data } = req.body;

  const payload = {
    data: [
      {
        event_name: event_name || "PageView",
        event_time: event_time || Math.floor(Date.now() / 1000),
        event_source_url: event_source_url || "",
        action_source: "website",
        client_ip_address: client_ip_address || req.headers["x-forwarded-for"] || "",
        client_user_agent: client_user_agent || req.headers["user-agent"] || "",
        ...(fbp && { user_data: { fbp } }),
        ...(fbc && { user_data: { ...(fbp && { fbp }), fbc } }),
        ...(custom_data && { custom_data }),
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
