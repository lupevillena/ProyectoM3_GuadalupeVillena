const conversations = {};

window.springfieldConversations = conversations;

export function setupChat(character) {
  if (!conversations[character.id]) {
    conversations[character.id] = [];
  }

  const conversationHistory = conversations[character.id];

  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#message-input");
  const messages = document.querySelector("#messages");

  conversationHistory.forEach((message) => {
    const element = document.createElement("p");

    if (message.role === "user") {
      element.classList.add("user-message");
    } else {
      element.classList.add("character-message");
    }

    element.textContent = message.text;

    messages.appendChild(element);
  });

  if (conversationHistory.length === 0) {
    const emptyMessage = document.createElement("p");

    emptyMessage.classList.add("empty-message");

    emptyMessage.textContent =
      `Comienza una conversación con ${character.name}.`;

    messages.appendChild(emptyMessage);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = input.value.trim();

    if (message === "") {
      return;
    }

    const emptyMessage =
      messages.querySelector(".empty-message");

    if (emptyMessage) {
      emptyMessage.remove();
    }

    conversationHistory.push({
      role: "user",
      text: message
    });

    const userMessage =
      document.createElement("p");

    userMessage.classList.add("user-message");
    userMessage.textContent = message;

    messages.appendChild(userMessage);

    input.value = "";

    const typingMessage =
      document.createElement("p");

    typingMessage.classList.add("character-message");
    typingMessage.textContent =
      `${character.name} está escribiendo...`;

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
        throw new Error(
          "Error al obtener la respuesta"
        );
      }

      const data = await response.json();

      typingMessage.remove();

      const characterMessage =
        document.createElement("p");

      characterMessage.classList.add(
        "character-message"
      );

      characterMessage.textContent = data.message;

      messages.appendChild(characterMessage);

      conversationHistory.push({
        role: "character",
        text: data.message
      });

      messages.scrollTop = messages.scrollHeight;

      console.log(
        "Historial:",
        conversationHistory
      );

    } catch (error) {
      typingMessage.textContent =
        "Hubo un problema al obtener la respuesta. Intenta nuevamente.";

      console.error("Error:", error);
    }
  });
}