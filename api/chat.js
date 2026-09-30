import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const { systemPrompt, history } = request.body;

    if (!systemPrompt || !history || history.length === 0) {
      return response.status(400).json({
        error: "Faltan datos para iniciar la conversación"
      });
    }

    // Convertimos nuestro historial al formato que entiende Gemini
    const contents = history.map((message) => ({
      role: message.role === "character" ? "model" : "user",
      parts: [
        {
          text: message.text
        }
      ]
    }));

    const result = await ai.models.generateContent({
    model: "gemini-3.5-flash",   
      contents: contents,

      config: {
        systemInstruction: systemPrompt
      }
    });

    return response.status(200).json({
      message: result.text
    });

  } catch (error) {
    console.error("Error con Gemini:", error);

    return response.status(500).json({
      error: "No se pudo obtener una respuesta de Gemini."
    });
  }
}