export function cleanMessage(message) {
  return message.trim();
}

export function isValidMessage(message) {
  return message.trim() !== "";
}

export function formatHistory(history) {
  return history.map((message) => ({
    role: message.role === "character" ? "model" : "user",
    parts: [
      {
        text: message.text
      }
    ]
  }));
}

export function getCharacterName(character) {
  return character.name;
}