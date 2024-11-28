# SV-Gestion-Tarea-API

API para la gestión de tareas y etiquetas, desarrollada con Nest.js, Prisma y Supabase.
Esta API permite a los usuarios registrarse, iniciar sesión, crear, leer, actualizar y eliminar tareas y etiquetas.
Para la autenticación se utiliza JWT.

## Tabla de Contenidos

- [Instalación](#instalación)
- [API](#api)
- [Variables de Entorno](#variables-de-entorno)

## Instalación

### Requisitos Previos

- Node.js (v20 o superisor)
- npm
- MongoDB

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
6. Inicia el servidor:
   ```bash
   npm start
   ```
   o
   ```bash
   npm run start:dev
   ```
7. La API estará disponible en `http://localhost:3000`.

## API

### Endpoints

- `POST /api/auth/register`: Registrar un nuevo usuario.
- `POST /api/auth/login`: Iniciar sesión.
- `POST /api/auth/logout`: Cerrar sesión.
- `GET /api/auth/profile`: Obtener el perfil del usuario autenticado.

- `POST /api/tags`: Crear una nueva etiqueta.
- `GET /api/tags`: Obtener todas las etiquetas.
- `GET /api/tags/all`: Obtener todas las etiquetas de forma paginada.
- `GET /api/tags/:tagId`: Obtener una etiqueta por ID.
- `PATCH /api/tags/:tagId`: Actualizar una etiqueta por ID.
- `DELETE /api/tags/:tagId`: Eliminar una etiqueta por ID. (Soft delete)
- `PATCH /api/tags/:tagId/restore`: Activar una etiqueta por ID.

- `POST /api/tasks`: Crear una nueva tarea.
- `GET /api/tasks`: Obtener todas las tareas.
- `GET /api/tasks/all`: Obtener todas las tareas de forma paginada.
- `GET /api/tasks/:taskId`: Obtener una tarea por ID.
- `PATCH /api/tasks/:taskId`: Actualizar una tarea por ID.
- `DELETE /api/tasks/:taskId`: Eliminar una tarea por ID. (Soft delete)
- `PATCH /api/tasks/:taskId/restore`: Restaurar una tarea por ID.

## Variables de Entorno

Las siguientes variables de entorno son necesarias para ejecutar el proyecto:

- `PORT`: Puerto en el que corre la aplicación.

- `DATABASE_URL`: URL de la base de datos.
- `SALT_ROUNDS`: Número de rondas para el algoritmo de encriptación de contraseñas.
- `JWT_SECRET`: Clave secreta para firmar los tokens JWT.
- `JWT_EXPIRATION`: Tiempo de expiración de los tokens JWT.
