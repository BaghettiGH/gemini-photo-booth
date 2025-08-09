import { useState } from 'react';
import { GoogleGenAI } from '@google/gemini';

export default function Imagen() {
    const [prompt, setPrompt] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateImages = async () => {
        setLoading(true);
        try {
            const ai = new GoogleGenAI({
                apiKey: import.meta.env.VITE_GOOGLE_API_KEY
            });
            const response = await ai.models.generateImages({
                model: "imagen-4.0-generate-preview-06-06",
                prompt,
                config: {
                    numberOfImages: 3
                }
            });
            setImages(response.generatedImages.map((img) =>
                `data:image/png;base64,${img.image.imageBytes}`
            ));
        } catch (err) {
            console.error("Imagen 4 error:", err);
        } finally {
            setLoading(false);
        }
    };

    
}
