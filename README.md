# SV-Gestion-Tarea-API

API para la gestión de tareas y etiquetas, desarrollada con Node.js, Express y MongoDB.
Esta API permite a los usuarios registrarse, iniciar sesión, crear, actualizar y eliminar tareas y etiquetas, así como también cambiar el estado de las tareas y activar o desactivar las etiquetas.
Para la autenticación se utiliza Firebase Auth y para la autorización se utiliza Firebase Admin SDK.

## Tabla de Contenidos

- [Instalación](#instalación)
- [API](#api)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Pruebas](#pruebas)

## Instalación

### Requisitos Previos

- Node.js (v20 o superior)
- npm
- MongoDB
- Credenciales de Firebase y Firebase Admin SDK

### Pasos de Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/santiagoarielv98/sv-gestion-tarea-api.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd sv-gestion-tarea-api
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Crea un archivo `.env` en la raíz del proyecto y copia el contenido del archivo `.env.example`.
5. Configura las variables de entorno en el archivo `.env`.
   - Nota: Para la variable `FIREBASE_SERVICE_ACCOUNT` se debe convertir el archivo `firebase.json` a base64 y pegar el contenido en el archivo `.env`. o bien, cargar el archivo `firebase.json` en la raíz del proyecto y dejar la variable `FIREBASE_SERVICE_ACCOUNT` vacía.
6. Inicia el servidor:
   ```bash
   npm start
   ```
   o
   ```bash
   npm run dev
   ```
7. La API estará disponible en `http://localhost:8080`.

## API

### Endpoints

- `POST /api/v1/auth/signup`: Registrar un nuevo usuario.
- `POST /api/v1/auth/signin`: Iniciar sesión.
- `POST /api/v1/auth/signout`: Cerrar sesión.
- `GET /api/v1/auth/check`: Verificar si el token es válido.

- `POST /api/v1/tags`: Crear una nueva etiqueta.
- `GET /api/v1/tags`: Obtener todas las etiquetas.
- `GET /api/v1/tags/:tagId`: Obtener una etiqueta por ID.
- `PUT /api/v1/tags/:tagId`: Actualizar una etiqueta por ID.
- `DELETE /api/v1/tags/:tagId`: Eliminar una etiqueta por ID. (Soft delete)
- `PATCH /api/v1/tags/:tagId/activate`: Activar una etiqueta por ID.

- `PUT /api/v1/tasks/:taskId`: Actualizar una tarea por ID.
- `DELETE /api/v1/tasks/:taskId`: Eliminar una tarea por ID. (Soft delete)
- `PATCH /api/v1/tasks/:taskId/activate`: Activar una tarea por ID.
- `PATCH /api/v1/tasks/:taskId/toggle`: Cambiar el estado de una tarea por ID.

## Estructura del Proyecto

```plaintext
tu-repositorio/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── utils/
│   └── app.js
├── tests/
├── .env.example
├── index.js # Punto de entrada de la aplicación
├── package.json
├── README.md
└── seeds.js
```

## Variables de Entorno

Las siguientes variables de entorno son necesarias para ejecutar el proyecto:

- `PORT`: Puerto en el que corre la aplicación.

- `FIREBASE_API_KEY`: API Key de Firebase.
- `FIREBASE_AUTH_DOMAIN`: Auth Domain de Firebase.
- `FIREBASE_PROJECT_ID`: Project ID de Firebase.
- `FIREBASE_STORAGE_BUCKET`: Storage Bucket de Firebase.
- `FIREBASE_MESSAGING_SENDER_ID`: Messaging Sender ID de Firebase.
- `FIREBASE_APP_ID`: App ID de Firebase.
- `FIREBASE_SERVICE_ACCOUNT`: Credenciales de Firebase Admin SDK.
- `MONGO_URI`: URI de la base de datos
- `ALLOWED_ORIGIN`: Origen permitido para las peticiones.

## Pruebas

Para ejecutar las pruebas, usa el siguiente comando:

```bash
npm test
```
