import { describe, it, expect } from "vitest";

import {
  cleanMessage,
  isValidMessage,
  formatHistory,
  getCharacterName
} from "../src/utils.js";

describe("Funciones del chat", () => {

  it("elimina espacios innecesarios del mensaje", () => {
    const result = cleanMessage("   Hola Homero   ");

    expect(result).toBe("Hola Homero");
  });

  it("detecta cuando un mensaje está vacío", () => {
    const result = isValidMessage("     ");

    expect(result).toBe(false);
  });

  it("convierte el historial al formato de Gemini", () => {
    const history = [
      {
        role: "user",
        text: "Hola"
      },
      {
        role: "character",
        text: "¡Hola!"
      }
    ];

    const result = formatHistory(history);

    expect(result).toEqual([
      {
        role: "user",
        parts: [
          {
            text: "Hola"
          }
        ]
      },
      {
        role: "model",
        parts: [
          {
            text: "¡Hola!"
          }
        ]
      }
    ]);
  });

  it("obtiene el nombre del personaje", () => {
    const character = {
      name: "Lisa Simpson"
    };

    const result = getCharacterName(character);

    expect(result).toBe("Lisa Simpson");
  });

});