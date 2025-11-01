# 🐾 AdoptMe - Backend API

Sistema backend para gestión de adopciones de mascotas con módulo de mocking, manejo de errores y logging.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

## 🚀 Instalación

```
npm install
```

## ⚙️ Configuración

Crear archivo `.env`:

```
PORT=8080
MONGO_URL=mongodb+srv://tu_usuario:password@cluster.mongodb.net/adoptme
```

## 🎯 ENTREGABLE N°1 - ✅ COMPLETADO

### Router de Mocking (`/api/mocks`)

#### GET `/api/mocks/mockingusers`

- Genera **50 usuarios** con especificaciones exactas
- Password: `"coder123"` encriptada con bcrypt
- Role: `"user"` o `"admin"` (aleatorio)
- Pets: array vacío `[]`

#### GET `/api/mocks/mockingpets`

- Genera **100 mascotas** con datos realistas

#### POST `/api/mocks/generateData`

- Inserta usuarios y mascotas en la base de datos
- Parámetros: `{"users": number, "pets": number}`

## 🧪 Verificación del ENTREGABLE

1. **Levantar el servidor:**

   ```
   npm start
   ```

2. **Generar 50 usuarios (especificación ENTREGABLE):**

   ```
   curl http://localhost:8080/api/mocks/mockingusers
   ```

3. **Generar 100 mascotas:**

   ```
   curl http://localhost:8080/api/mocks/mockingpets
   ```

4. **Insertar datos en base de datos:**

   ```
   curl -X POST http://localhost:8080/api/mocks/generateData \
        -H "Content-Type: application/json" \
        -d '{"users": 10, "pets": 20}'
   ```

5. **Verificar que se insertaron:**
   ```
   curl http://localhost:8080/api/users
   curl http://localhost:8080/api/pets
   ```

## � Cambios recientes importantes

Se añadieron las siguientes funcionalidades que conviene verificar:

- Modelo `User` ahora contiene:

  - `documents`: array con objetos { name, reference }
  - `last_connection`: fecha que se actualiza en login y logout

- Nuevo endpoint:

  - POST `/api/users/:uid/documents` — subir uno o múltiples archivos (campo `documents`) y actualizar `user.documents`.

- Sessions:
  - POST `/api/sessions/logout` — limpia la cookie de sesión y actualiza `last_connection`.

## 📤 Probar uploads de documentos (manual)

1. Asegurate de tener creados los directorios `public/documents` y `public/img`:

```bash
mkdir -p public/documents public/img
```

2. Subir uno o varios documentos a un usuario (reemplazar <USER_ID>):

```bash
curl -s -X POST http://localhost:8080/api/users/<USER_ID>/documents \
   -F "documents=@./doc1.pdf" \
   -F "documents=@./doc2.pdf" | jq
```

Resultados esperados:

- Respuesta 200 con `payload` listando los documentos subidos (name, reference).
- Archivos físicos guardados en `public/documents/`.
- `user.documents` en la base de datos contiene las nuevas entradas.

## 🔐 Probar login/logout y `last_connection`

1. Login (setea cookie y actualiza `last_connection` en BD):

```bash
curl -i -s -X POST http://localhost:8080/api/sessions/login \
   -H "Content-Type: application/json" \
   -d '{"email":"test+1@example.com","password":"coder123"}'
```

2. Logout (limpia cookie y actualiza `last_connection`):

```bash
curl -i -s -X POST http://localhost:8080/api/sessions/logout \
   -H "Cookie: coderCookie=<tu_cookie_aqui>"
```

3. Consultar usuario para ver `last_connection`:

```bash
curl -s http://localhost:8080/api/users/<USER_ID> | jq
```

## ✅ Tests automatizados

La suite de tests con `mocha`, `chai` y `supertest` cubre `users`, `pets` y `sessions` (register/login). Para ejecutarlos:

```bash
npm test
```

Nota: los tests incluidos usan stubs para los servicios y no requieren Mongo en ejecución; los pasos manuales anteriores prueban la integración con la base de datos real.

## � Docker

Se agregó un `Dockerfile` en la raíz del proyecto. A continuación los pasos para construir y publicar la imagen.

1. Construir la imagen localmente (reemplaza `<tag>` por el nombre que quieras):

```bash
docker build -t lukalattanzi/adoptme:<tag> .
```

2. Ejecutar el contenedor localmente (mapeando el puerto 8080):

```bash
docker run --rm -p 8080:8080 --env MONGO_URL="$MONGO_URL" lukalattanzi/adoptme:<tag>
```

3. Subir la imagen a Docker Hub (ejemplo):

```bash
docker login
docker tag lukalattanzi/adoptme:<tag> lukalattanzi/adoptme:<tag>
docker push lukalattanzi/adoptme:<tag>
```

Nota: desde este entorno no puedo subir la imagen a Docker Hub por ti. Si querés, genero la imagen localmente en tu máquina con los comandos anteriores y te ayudo a etiquetar/pushear.

Enlace público de la imagen en Docker Hub (poner aquí cuando la subas):

```
https://hub.docker.com/r/<tu_usuario>/adoptme
```

### Publicar automáticamente desde GitHub Actions

Se incluyó un workflow (`.github/workflows/docker-publish.yml`) que construye y publica la imagen a Docker Hub cuando se hace push a `main`. Para que funcione:

1. En el repositorio de GitHub ir a Settings → Secrets and variables → Actions.
2. Crear dos secrets:
   - `DOCKERHUB_USERNAME` con tu usuario de Docker Hub.
   - `DOCKERHUB_TOKEN` con un access token de Docker Hub (o tu contraseña si lo preferís, aunque se recomienda token).
3. Hacer push a `main` y el workflow construirá y publicará la imagen con la etiqueta `${{ secrets.DOCKERHUB_USERNAME }}/adoptme:latest`.

Cuando el workflow termine exitosamente, la imagen estará disponible en tu cuenta de Docker Hub y podés actualizar el enlace público en este README.

## ��📁 Estructura

```
src/
├── routes/mocks.router.js    # 🎯 ENTREGABLE N°1
├── utils/mocking.js          # Generación de datos
├── utils/logger.js           # Sistema de logging
├── utils/errorHandler.js     # Manejo de errores
└── controllers/              # API REST
```

## 🛠️ Tecnologías

- **Node.js + Express** - Backend
- **MongoDB + Mongoose** - Base de datos
- **Faker.js** - Datos mock
- **bcrypt** - Encriptación
- **Winston** - Logging

## 📝 Scripts

```
npm start           # Producción
npm run dev         # Desarrollo con nodemon
npm test            # Ejecuta la suite de tests (mocha + chai + supertest)
```

## 🔍 Endpoints Principales

| Endpoint                 | Método | Descripción        |
| ------------------------ | ------ | ------------------ |
| `/api/users`             | GET    | Obtener usuarios   |
| `/api/pets`              | GET    | Obtener mascotas   |
| `/api/adoptions`         | GET    | Obtener adopciones |
| `/api/sessions/register` | POST   | Registro           |
| `/api/sessions/login`    | POST   | Login              |
| `/api/mocks/*`           | \*     | **ENTREGABLE N°1** |

---

## 📚 Documentación API (Swagger)

La API principal ahora incluye documentación interactiva con Swagger UI. Para verla en local:

1. Instala dependencias (si no lo hiciste):

```
npm install
```

2. Levanta la aplicación:

```
npm start
```

3. Abre en tu navegador: http://localhost:8080/api/docs/

La documentación cubre los módulos: Sessions, Pets y Adoptions (endpoints, parámetros y modelos básicos).

**Autor:** Luka Lattanzi  
**Proyecto:** Backend AdoptMe - ENTREGABLE N°1 ✅

## 🧪 Tests

Se agregó una suite de tests con `mocha`, `chai` y `supertest` para cubrir los endpoints de `users` y `pets`.

- Ejecutar tests localmente:

```bash
npm test
```

- Qué incluyen los tests:

  - `test/users.test.js` — tests de `GET /api/users`, `GET /api/users/:uid`, `PUT` y `DELETE` con validaciones de payload y errores.
  - `test/pets.test.js` — tests de `GET /api/pets`, `POST /api/pets` (validación de campos), `PUT` y `DELETE`.

- Nota: los tests usan stubs sobre los servicios (`usersService`, `petsService`) para evitar depender de una base de datos en ejecución. Esto permite validar la lógica de controladores y respuestas HTTP rápidamente.

## 📦 Subir tests al repositorio y CI

1. Commitear y pushear los cambios (tests incluidos):

```bash
git add test/ package.json README.md .github/workflows/nodejs-test.yml
git commit -m "chore(tests): add mocha/chai/supertest tests for users and pets and CI workflow"
git push origin main
```

2. Integrar CI (GitHub Actions): se agregó un workflow que ejecuta `npm ci` y `npm test` en pushes y pull requests. Al pushear, GitHub ejecutará los tests automáticamente.

Si preferís, puedo abrir un `pull request` con estos cambios o adaptar el workflow para correr también un entorno con `mongodb-memory-server` para tests de integración.
