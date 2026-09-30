export function setupChat(character) {
  const conversationHistory = [];
  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#message-input");
  const messages = document.querySelector("#messages");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = input.value.trim();

    if (message === "") {
      return;
    }

    // Guardamos el mensaje del usuario
    conversationHistory.push({
      role: "user",
      text: message
    });

    // Mostramos el mensaje del usuario
    const userMessage = document.createElement("p");
    userMessage.classList.add("user-message");
    userMessage.textContent = message;
    messages.appendChild(userMessage);

    input.value = "";

    // Mostramos "Escribiendo..." mientras esperamos a Gemini
    const typingMessage = document.createElement("p");
    typingMessage.classList.add("character-message");
    typingMessage.textContent = `${character.name} está escribiendo...`;
    messages.appendChild(typingMessage);

    messages.scrollTop = messages.scrollHeight;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          characterId: character.id,
          systemPrompt: character.systemPrompt,
          history: conversationHistory
        })
      });

      if (!response.ok) {
        throw new Error("Error al obtener la respuesta");
      }

      const data = await response.json();

      typingMessage.remove();

      // Mostramos la respuesta de Gemini
      const characterMessage = document.createElement("p");
      characterMessage.classList.add("character-message");
      characterMessage.textContent = data.message;

      messages.appendChild(characterMessage);

      // Guardamos la respuesta de Gemini en el historial
      conversationHistory.push({
        role: "character",
        text: data.message
      });

      messages.scrollTop = messages.scrollHeight;

      console.log("Historial:", conversationHistory);
    } catch (error) {
      typingMessage.textContent =
        "Hubo un problema al obtener la respuesta. Intenta nuevamente.";

      console.error("Error:", error);
    }
  });
}