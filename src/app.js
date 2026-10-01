import { characters } from "./characters.js";
import { setupChat } from "./chat.js";

console.log("Springfield AI Chat funcionando 🍩");

const app = document.querySelector("#app");
const homeContent = app.innerHTML;

let selectedCharacter = null;

const characterImages = {
  homero: "/fotos_personajes/homero.jpg",
  lisa: "/fotos_personajes/lisa.jpg",
  bart: "/fotos_personajes/bart.jpg"
};

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-character]");

  if (!button) return;

  const characterId = button.dataset.character;

  selectedCharacter = characters[characterId];

  history.pushState(
    { characterId },
    "",
    "/chat"
  );

  router();
});

const links = document.querySelectorAll("[data-link]");

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const path = new URL(link.href).pathname;

    if (path === "/chat") {
      selectedCharacter = null;

      history.pushState(
        { chatList: true },
        "",
        "/chat"
      );
    } else {
      history.pushState({}, "", path);
    }

    router();
  });
});

function router() {
  const path = window.location.pathname;

  if (path === "/chat") {
    const characterId = window.history.state?.characterId;

    if (characterId && characters[characterId]) {
      selectedCharacter = characters[characterId];
    } else if (window.history.state?.chatList) {
      selectedCharacter = null;
    }

    if (selectedCharacter) {
      app.innerHTML = `
        <section class="chat-container">

          <div class="chat-header">

            <button
              type="button"
              class="chat-back-button"
              id="back-to-conversations"
            >
              ←
            </button>

            <img
              src="${characterImages[selectedCharacter.id]}"
              alt="${selectedCharacter.name}"
              class="chat-character-photo"
            >

            <div>
              <h2>${selectedCharacter.name}</h2>
              <p>${selectedCharacter.traits}</p>
            </div>

          </div>

          <div id="messages" class="messages"></div>

          <form id="chat-form" class="chat-form">

            <input
              id="message-input"
              type="text"
              placeholder="Escribe un mensaje..."
              autocomplete="off"
            >

            <button type="submit">
              Enviar
            </button>

          </form>

        </section>
      `;

      setupChat(selectedCharacter);

      const backButton =
        document.querySelector("#back-to-conversations");

      backButton.addEventListener("click", () => {
        selectedCharacter = null;

        history.pushState(
          { chatList: true },
          "",
          "/chat"
        );

        router();
      });

    } else {
      app.innerHTML = `
        <section class="conversations-page">

          <div class="chat-intro">

            <div class="chat-logo">🍩</div>

            <h2>Mis conversaciones</h2>

            <p>
              Elige un personaje de Springfield
              y comienza una conversación.
            </p>

          </div>

          <div class="conversation-list">

            ${Object.values(characters)
              .map((character) => {
                const hasConversation =
                  window.springfieldConversations?.[character.id]?.length > 0;

                return `
                  <article class="conversation-card">

                    <div class="conversation-character">

                      <img
                        src="${characterImages[character.id]}"
                        alt="${character.name}"
                        class="conversation-character-photo"
                      >

                      <div class="conversation-content">

                        <h3>${character.name}</h3>

                        <p class="character-description">
                          ${character.description}
                        </p>

                        <p class="character-traits">
                          ${character.traits}
                        </p>

                        <p class="conversation-status">
                          ${
                            hasConversation
                              ? "Tienes una conversación iniciada"
                              : "Todavía no has iniciado una conversación"
                          }
                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      data-character="${character.id}"
                      class="character-button"
                    >
                      ${
                        hasConversation
                          ? "Continuar conversación →"
                          : "Iniciar conversación →"
                      }
                    </button>

                  </article>
                `;
              })
              .join("")}

          </div>

        </section>
      `;
    }

  } else if (path === "/about") {

    app.innerHTML = `
      <section class="about-page">

        <div class="about-hero">

          <div class="about-logo">🍩</div>

          <h2>Springfield AI Chat</h2>

          <p>
            Conversaciones desde la ciudad más amarilla,
            ahora con inteligencia artificial.
          </p>

        </div>


        <section class="about-section">

          <h2>¿Qué puedes hacer?</h2>

          <div class="features-grid">

            <article class="feature-card">

              <div class="feature-icon">💬</div>

              <div>
                <h3>Conversar con IA</h3>

                <p>
                  Habla con personajes de Springfield
                  mediante inteligencia artificial.
                </p>
              </div>

            </article>


            <article class="feature-card">

              <div class="feature-icon">🎭</div>

              <div>
                <h3>Elegir personajes</h3>

                <p>
                  Elige entre Homero, Lisa o Bart,
                  cada uno con una personalidad diferente.
                </p>
              </div>

            </article>


            <article class="feature-card">

              <div class="feature-icon">🧠</div>

              <div>
                <h3>Mantener el contexto</h3>

                <p>
                  Continúa una conversación iniciada
                  y conserva el historial mientras interactúas.
                </p>
              </div>

            </article>

          </div>

        </section>


        <section class="about-section">

          <h2>¿Cómo funciona?</h2>

          <div class="features-grid">

            <article class="feature-card">

              <div class="feature-icon">1</div>

              <div>
                <h3>Elige un personaje</h3>

                <p>
                  Selecciona a Homero, Lisa o Bart
                  desde la sección de Chat.
                </p>
              </div>

            </article>


            <article class="feature-card">

              <div class="feature-icon">2</div>

              <div>
                <h3>Escribe tu mensaje</h3>

                <p>
                  Inicia una conversación y escribe
                  lo que quieras preguntarle.
                </p>
              </div>

            </article>


            <article class="feature-card">

              <div class="feature-icon">3</div>

              <div>
                <h3>Recibe una respuesta</h3>

                <p>
                  Gemini genera una respuesta
                  siguiendo la personalidad del personaje.
                </p>
              </div>

            </article>

          </div>

        </section>


        <section class="about-section">

          <h2>Personajes</h2>

          <div class="characters-grid">

            ${Object.values(characters)
              .map(
                (character) => `
                  <article class="about-character-card">

                    <img
                      src="${characterImages[character.id]}"
                      alt="${character.name}"
                      class="about-character-photo"
                    >

                    <h3>${character.name}</h3>

                    <p>
                      ${character.description}
                    </p>

                    <span>
                      ${character.traits}
                    </span>

                  </article>
                `
              )
              .join("")}

          </div>

        </section>


        <section class="about-section">

          <h2>Tecnologías utilizadas</h2>

          <div class="technologies-card">

            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>Gemini AI</span>
            <span>Vitest</span>
            <span>Vercel</span>

          </div>

        </section>


        <section class="about-section">

          <div class="credits-card">

            <h2>Sobre el proyecto</h2>

            <p>
              Springfield AI Chat es una aplicación web
              que permite conversar con personajes ficticios
              utilizando inteligencia artificial.
            </p>

            <p>
              El proyecto fue desarrollado como una aplicación
              SPA utilizando JavaScript, integración con Gemini AI
              y despliegue en Vercel.
            </p>

            <p>
              Desarrollado por
              <strong>Guadalupe Villena</strong>.
            </p>

          </div>

        </section>


        <section class="about-section">

          <div class="cta-card">

            <h2>¿Listo para entrar a Springfield?</h2>

            <p>
              Elige un personaje y comienza una conversación.
            </p>

            <button
              type="button"
              class="cta-button"
              id="about-chat-button"
            >
              Ir a Chat →
            </button>

          </div>

        </section>

      </section>
    `;

    const aboutChatButton =
      document.querySelector("#about-chat-button");

    if (aboutChatButton) {
      aboutChatButton.addEventListener("click", () => {
        selectedCharacter = null;

        history.pushState(
          { chatList: true },
          "",
          "/chat"
        );

        router();
      });
    }

  } else {
    app.innerHTML = homeContent;
    selectedCharacter = null;
  }
}

router();

window.addEventListener("popstate", router);