export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let body = "";
    await new Promise((resolve) => {
      req.on("data", (chunk) => (body += chunk));
      req.on("end", resolve);
    });
    const { prompt } = JSON.parse(body);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-preview-06-06:generate?key=" +
        process.env.GOOGLE_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: { text: prompt },
          numberOfImages: 3,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API error: ${errText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to generate images" });
  }
}
