import { characters } from "./characters.js";

import { setupChat } from "./chat.js";

console.log("Springfield AI Chat funcionando 🍩");

const app = document.querySelector("#app");

const homeContent = app.innerHTML;

let selectedCharacter = null;


// ------------------------------
// SELECCIÓN DE PERSONAJE
// ------------------------------

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-character]");

  if (!button) return;

  const characterId = button.dataset.character;

  selectedCharacter = characters[characterId];

  console.log("Personaje seleccionado:", selectedCharacter.name);

  history.pushState({}, "", "/chat");

  router();
});


// ------------------------------
// NAVEGACIÓN SPA
// ------------------------------

const links = document.querySelectorAll("[data-link]");

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    history.pushState({}, "", link.href);

    router();
  });
});


// ------------------------------
// ROUTER
// ------------------------------

function router() {
  const path = window.location.pathname;

  console.log("Ruta actual:", path);

  if (path === "/chat") {

    if (selectedCharacter) {
  app.innerHTML = `
    <section class="chat-container">

      <div class="chat-header">
        <div>${selectedCharacter.icon}</div>

        <div>
          <h2>Chat con ${selectedCharacter.name}</h2>
          <p>${selectedCharacter.traits}</p>
        </div>
      </div>

      <div id="messages" class="messages">
        <p>Aquí aparecerán los mensajes.</p>
      </div>

      <form id="chat-form" class="chat-form">
        <input
          id="message-input"
          type="text"
          placeholder="Escribe un mensaje..."
          autocomplete="off"
        >

        <button type="submit">Enviar</button>
      </form>

    </section>
  `;

 setupChat(selectedCharacter);

    } else {
      app.innerHTML = `
        <section>
          <h2>Chat</h2>

          <p>
            Selecciona un personaje desde Home para comenzar.
          </p>
        </section>
      `;
    }

  } else if (path === "/about") {

    app.innerHTML = `
      <section>
        <h2>About</h2>

        <p>
          Springfield AI Chat es una aplicación para conversar
          con personajes de Springfield usando inteligencia artificial.
        </p>
      </section>
    `;

  } else {

    app.innerHTML = homeContent;

  }
}


// Ejecutamos el router cuando inicia la aplicación
router();


// Permite usar atrás y adelante en el navegador
window.addEventListener("popstate", router);