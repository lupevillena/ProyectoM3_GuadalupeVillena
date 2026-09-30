# Springfield AI Chat 🍩

Aplicación web SPA que permite conversar con personajes inspirados en Springfield utilizando Google Gemini AI.

## Descripción

Springfield AI Chat permite elegir entre tres personajes y mantener una conversación con cada uno utilizando inteligencia artificial.

Cada personaje tiene una personalidad diferente definida mediante un system prompt.

### Personajes

- Homero Simpson: divertido, despistado, impulsivo y amante de la comida.
- Lisa Simpson: inteligente, curiosa, reflexiva y responsable.
- Bart Simpson: travieso, rebelde, bromista y despreocupado.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Google Gemini API
- @google/genai
- Vercel Serverless Functions
- Vitest
- Git / GitHub
- Vercel

## Funcionalidades

- SPA con rutas `/home`, `/chat` y `/about`
- Navegación mediante History API
- Soporte para botones atrás y adelante del navegador
- Diseño responsive y mobile-first
- Selección de diferentes personajes
- Integración con Google Gemini AI
- Personalidad diferente para cada personaje
- Historial de conversación durante la sesión
- Estado de "escribiendo..." mientras se espera la respuesta
- Manejo de errores de la API
- Scroll automático del chat
- Mensajes visualmente diferentes para usuario y personaje
- Envío de mensajes con Enter
- API key protegida mediante variables de entorno
- Serverless Function como proxy entre frontend y Gemini
- Tests unitarios con Vitest

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env.local` en la raíz del proyecto:

```text
GEMINI_API_KEY=tu_api_key
```

La API key no debe subirse al repositorio.

Para ejecutar el proyecto localmente con Vercel:

```bash
vercel dev
```

Después abrir:

```text
http://localhost:3000
```

## Tests

Para ejecutar los tests:

```bash
npm test
```

El proyecto incluye 4 tests unitarios realizados con Vitest.

## Integración con Gemini

El frontend envía los mensajes a `/api/chat`.

La Serverless Function recibe la conversación y se comunica con Gemini utilizando la variable de entorno `GEMINI_API_KEY`.

De esta forma, la API key no queda expuesta en el código del frontend.

El historial completo de la conversación se envía en cada solicitud para que el modelo pueda mantener el contexto.

## Prompts de IA

Cada personaje utiliza instrucciones diferentes para definir su personalidad.

### Homero

Se le indica al modelo responder de manera divertida, simple, despistada e impulsiva, con referencias ocasionales a comida y donas.

### Lisa

Se le indica responder de manera inteligente, curiosa, reflexiva y responsable, explicando las ideas de forma clara y lógica.

### Bart

Se le indica responder con un tono informal, travieso, rebelde y bromista.

Los prompts también indican que las respuestas deben ser cortas y naturales para mantener la experiencia similar a un chat.

## Estructura principal

```text
springfield-ai-chat/
├── api/
│   └── chat.js
├── src/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── chat.js
│   ├── characters.js
│   └── utils.js
├── tests/
│   └── utils.test.js
├── .env.local
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

## Seguridad

La API key de Gemini se almacena en una variable de entorno y solamente se utiliza desde la Serverless Function.

El archivo `.env.local` está excluido del repositorio mediante `.gitignore`.