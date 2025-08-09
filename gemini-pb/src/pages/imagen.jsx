import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
export default function Imagen(prompt) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateImages = async () => {
        if (!prompt) return;
        setLoading(true);
        try {
            const ai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
            const response = await ai.models.generateImages({
                model: "imagen-4.0-generate-preview-06-06",
                prompt,
                numberOfImages: 3
            });
            const imgData = result.images.map(
                (img) => `data:image/png;base64,${img.b64Json}`
            );
            setImages(imgData);
        } catch (err) {
            console.error("Imagen 4 error:", err);
        } finally {
            setLoading(false);
        }
    };
return(
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
