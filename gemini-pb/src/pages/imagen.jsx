import { useState } from "react";

export default function Imagen({ prompt }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }), 
      });
      const data = await res.json();
      const imgs = data.images?.map(
        (img) => `data:image/png;base64,${img.b64Json}`
      ) || [];
      setImages(imgs);
    }
    catch (error){
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={generateImages} disabled={loading}>
        {loading ? "Generating..." : "Generate Images"}
      </button>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {images.map((src, idx) => (
          <img key={idx} src={src} alt={`Generated ${idx}`} width={200} />
        ))}
      </div>
    </div>
  );
}
