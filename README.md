# 🐾 AdoptMe - Backend API

Sistema backend para gestión de adopciones de mascotas con módulo de mocking, manejo de errores, logging y **completamente dockerizado**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-27%20passing-brightgreen)

---

## 📋 Tabla de Contenidos

- [Entrega Final](#-entrega-final---completada)
- [Inicio Rápido](#-inicio-rápido)
- [Docker](#-docker)
- [Documentación API (Swagger)](#-documentación-api-swagger)
- [Tests](#-tests)
- [Instalación Local](#-instalación-local)
- [Endpoints Principales](#-endpoints-principales)
- [Para Evaluadores](#-guía-para-evaluadores)

---

## ✨ Entrega Final - Completada

### ✅ Requisitos Cumplidos

| Requisito                       | Estado | Verificación                                  |
| ------------------------------- | ------ | --------------------------------------------- |
| **Documentación Swagger Users** | ✅     | Ver `/api/docs` - 5 endpoints documentados    |
| **Tests adoption.router.js**    | ✅     | `npm test` - 12 tests de adoptions            |
| **Dockerfile optimizado**       | ✅     | Multi-stage, no-root, healthcheck             |
| **Imagen en Docker Hub**        | ✅     | https://hub.docker.com/r/lukalattanzi/adoptme |
| **README completo**             | ✅     | Este documento                                |

### 📊 Cobertura de Tests

**27 tests pasando:**

- ✅ **12 tests** - Adoptions API (GET, GET/:id, POST - todos los casos)
- ✅ **5 tests** - Pets API
- ✅ **2 tests** - Sessions API
- ✅ **8 tests** - Users API

---

## 🚀 Inicio Rápido

### Con Docker (Recomendado)

```bash
# Descargar y ejecutar desde Docker Hub
docker pull lukalattanzi/adoptme:latest
docker run -d -p 8080:8080 \
  -e MONGO_URL="mongodb+srv://usuario:password@cluster.mongodb.net/adoptme" \
  --name adoptme-app \
  lukalattanzi/adoptme:latest

# Ver en: http://localhost:8080/api/docs
```

### Sin Docker

```bash
# Clonar e instalar
git clone https://github.com/LukaLattanzi/RecursosBackend-Adoptme.git
cd RecursosBackend-Adoptme
npm install

# Configurar
echo "MONGO_URL=tu_mongodb_url" > .env
echo "PORT=8080" >> .env

# Ejecutar
npm start

# Ver en: http://localhost:8080/api/docs
```

---

## 🐳 Docker

### 📦 Imagen Pública en Docker Hub

**🔗 https://hub.docker.com/r/lukalattanzi/adoptme**

```bash
docker pull lukalattanzi/adoptme:latest
```

### ⚡ Ejecución Rápida

```bash
# Método 1: Con variable de entorno directa
docker run -d -p 8080:8080 \
  -e MONGO_URL="mongodb+srv://..." \
  --name adoptme-app \
  lukalattanzi/adoptme:latest

# Método 2: Con archivo .env
docker run -d -p 8080:8080 \
  --env-file .env \
  --name adoptme-app \
  lukalattanzi/adoptme:latest

# Ver logs
docker logs -f adoptme-app

# Detener
docker stop adoptme-app && docker rm adoptme-app
```

### 🏗️ Construir Localmente

```bash
# Construir imagen
docker build -t adoptme-local:latest .

# Ejecutar
docker run -d -p 8080:8080 \
  -e MONGO_URL="tu_url" \
  --name adoptme-app \
  adoptme-local:latest
```

### 🐙 Docker Compose

```bash
# Crear archivo docker-compose.yml (ya incluido en el proyecto)

# Levantar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### 📊 Características de la Imagen Docker

✅ **Multi-stage build** - Optimizada (~280MB)  
✅ **Usuario no-root** - Mayor seguridad  
✅ **Healthcheck integrado** - Monitoreo automático  
✅ **Alpine Linux** - Base ligera  
✅ **dumb-init** - Manejo correcto de señales

### 🛠️ Comandos Útiles Docker

```bash
# Ver logs en tiempo real
docker logs -f adoptme-app

# Acceder al contenedor
docker exec -it adoptme-app sh

# Ver estado de salud (healthcheck)
docker inspect --format='{{.State.Health.Status}}' adoptme-app

# Ver estadísticas
docker stats adoptme-app
```

### 📤 Publicar en Docker Hub (Mantenedores)

```bash
docker login
docker build -t lukalattanzi/adoptme:latest .
docker tag lukalattanzi/adoptme:latest lukalattanzi/adoptme:1.0.0
docker push lukalattanzi/adoptme:latest
docker push lukalattanzi/adoptme:1.0.0
```

---

## 📚 Documentación API (Swagger)

La API incluye documentación interactiva completa con **Swagger UI**.

### Ver Documentación

```bash
npm start
# Abrir: http://localhost:8080/api/docs
```

### Módulos Documentados

✅ **Users** (5 endpoints completos):

- GET `/api/users` - Listar usuarios
- GET `/api/users/:uid` - Obtener usuario por ID
- PUT `/api/users/:uid` - Actualizar usuario
- DELETE `/api/users/:uid` - Eliminar usuario
- POST `/api/users/:uid/documents` - Subir documentos

✅ **Pets** (5 endpoints)  
✅ **Adoptions** (3 endpoints)  
✅ **Sessions** (2 endpoints)

**Cada endpoint incluye:**

- Descripción detallada
- Parámetros con ejemplos
- Schemas de request/response
- Códigos de estado (200, 400, 404, 500)
- Ejemplos de uso

---

## 🧪 Tests

Suite completa con **Mocha**, **Chai** y **Supertest**.

### Ejecutar Tests

```bash
npm test
```

### Output Esperado

```
  Adoptions API - Tests Completos
    GET /api/adoptions
      ✔ debe devolver lista vacía cuando no hay adopciones
      ✔ debe devolver lista con adopciones existentes
      ✔ debe manejar errores internos del servicio
    GET /api/adoptions/:aid
      ✔ debe retornar 404 cuando la adopción no existe
      ✔ debe devolver adopción existente correctamente
      ✔ debe buscar por el ID correcto
    POST /api/adoptions/:uid/:pid
      ✔ debe retornar 404 cuando el usuario no existe
      ✔ debe retornar 404 cuando la mascota no existe
      ✔ debe retornar 400 cuando la mascota ya está adoptada
      ✔ debe adoptar correctamente cuando todos los datos son válidos
      ✔ debe agregar la mascota al array de pets del usuario
      ✔ debe verificar que se llaman los servicios en el orden correcto

  27 passing (XXXms)
```

### Cobertura

| Módulo    | Tests | Cobertura         |
| --------- | ----- | ----------------- |
| Adoptions | 12    | 100% de endpoints |
| Users     | 8     | 100% de endpoints |
| Pets      | 5     | 100% de endpoints |
| Sessions  | 2     | Register y Login  |

---

## � Instalación Local

### Requisitos

- Node.js 20 o superior
- MongoDB (Atlas o local)
- npm o yarn

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/LukaLattanzi/RecursosBackend-Adoptme.git
cd RecursosBackend-Adoptme

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu MONGO_URL

# 4. Crear directorios necesarios
mkdir -p public/img public/documents logs

# 5. Ejecutar
npm start          # Producción
npm run dev        # Desarrollo con nodemon
```

### Scripts Disponibles

```bash
npm start           # Iniciar servidor en producción
npm run dev         # Desarrollo con auto-reload
npm test            # Ejecutar todos los tests
npm run check:db    # Verificar conexión a MongoDB
npm run docker:build # Construir imagen Docker
npm run docker:run   # Ejecutar contenedor Docker
npm run docker:stop  # Detener contenedor Docker
```

---

## 🔍 Endpoints Principales

### Users

- `GET /api/users` - Listar usuarios
- `GET /api/users/:uid` - Obtener usuario
- `PUT /api/users/:uid` - Actualizar usuario
- `DELETE /api/users/:uid` - Eliminar usuario
- `POST /api/users/:uid/documents` - Subir documentos

### Pets

- `GET /api/pets` - Listar mascotas
- `POST /api/pets` - Crear mascota
- `POST /api/pets/withimage` - Crear con imagen
- `PUT /api/pets/:pid` - Actualizar mascota
- `DELETE /api/pets/:pid` - Eliminar mascota

### Adoptions

- `GET /api/adoptions` - Listar adopciones
- `GET /api/adoptions/:aid` - Obtener adopción
- `POST /api/adoptions/:uid/:pid` - Crear adopción

### Sessions

- `POST /api/sessions/register` - Registrar usuario
- `POST /api/sessions/login` - Iniciar sesión
- `POST /api/sessions/logout` - Cerrar sesión
- `GET /api/sessions/current` - Usuario actual

### Mocking (Testing)

- `GET /api/mocks/mockingusers` - Generar 50 usuarios
- `GET /api/mocks/mockingpets` - Generar 100 mascotas
- `POST /api/mocks/generateData` - Insertar datos en BD

---

## 🎓 Guía para Evaluadores

### Verificación Rápida (5 minutos)

```bash
# 1. Ejecutar desde Docker Hub
docker pull lukalattanzi/adoptme:latest
docker run -d -p 8080:8080 \
  -e MONGO_URL="mongodb+srv://..." \
  --name adoptme-eval \
  lukalattanzi/adoptme:latest

# 2. Verificar Swagger
# Abrir: http://localhost:8080/api/docs
# Buscar tag "Users" y verificar 5 endpoints

# 3. Verificar Tests (opcional - requiere clonar repo)
git clone https://github.com/LukaLattanzi/RecursosBackend-Adoptme.git
cd RecursosBackend-Adoptme
npm install && npm test
# Debe mostrar: 27 passing

# 4. Limpiar
docker stop adoptme-eval && docker rm adoptme-eval
```

### Checklist de Evaluación

**Documentación Swagger Users:**

- [ ] Tag "Users" visible en /api/docs
- [ ] GET /api/users con schema completo
- [ ] GET /api/users/:uid con parámetros y respuestas
- [ ] PUT /api/users/:uid con requestBody
- [ ] DELETE /api/users/:uid documentado
- [ ] POST /api/users/:uid/documents con multipart/form-data

**Tests adoption.router.js:**

- [ ] 12 tests de adoptions presentes
- [ ] GET /api/adoptions cubierto (3 tests)
- [ ] GET /api/adoptions/:aid cubierto (3 tests)
- [ ] POST /api/adoptions/:uid/:pid cubierto (6 tests)
- [ ] Casos de éxito y error verificados
- [ ] Todos los tests pasan (27/27)

**Dockerfile:**

- [ ] Multi-stage build implementado
- [ ] Usuario no-root (nodejs)
- [ ] Healthcheck configurado
- [ ] Variables de entorno documentadas
- [ ] Imagen construye sin errores
- [ ] Contenedor ejecuta correctamente

**Docker Hub:**

- [ ] Imagen pública accesible
- [ ] `docker pull` funciona
- [ ] Enlace en README presente
- [ ] Imagen ejecuta correctamente

---

## 🛠️ Tecnologías Utilizadas

- **Node.js 20** - Runtime de JavaScript
- **Express 4** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Faker.js** - Generación de datos de prueba
- **bcrypt** - Encriptación de contraseñas
- **Winston** - Sistema de logging
- **JWT** - Autenticación
- **Multer** - Upload de archivos
- **Swagger** - Documentación API
- **Mocha + Chai + Supertest** - Testing
- **Docker** - Containerización

---

## � Estructura del Proyecto

```
RecursosBackend-Adoptme/
├── src/
│   ├── controllers/       # Controladores de rutas
│   ├── dao/              # Data Access Objects
│   │   └── models/       # Modelos de Mongoose
│   ├── dto/              # Data Transfer Objects
│   ├── repository/       # Capa de repositorio
│   ├── routes/           # Definición de rutas
│   │   ├── swaggerDocs.router.js  # Documentación Swagger
│   │   ├── adoption.router.js
│   │   ├── users.router.js
│   │   ├── pets.router.js
│   │   ├── sessions.router.js
│   │   └── mocks.router.js
│   ├── services/         # Lógica de negocio
│   ├── utils/            # Utilidades
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── mocking.js
│   ├── app.js            # Configuración de Express
│   └── server.js         # Punto de entrada
├── test/                 # Suite de tests
│   ├── adoptions.test.js # Tests de adoptions ✅
│   ├── users.test.js
│   ├── pets.test.js
│   └── sessions.test.js
├── scripts/
│   ├── check-mongo.js    # Verificar conexión MongoDB
│   └── docker-build.sh   # Script de Docker
├── public/               # Archivos públicos
│   ├── img/
│   └── documents/
├── logs/                 # Archivos de log
├── Dockerfile            # Configuración Docker ✅
├── .dockerignore         # Archivos excluidos de Docker
├── docker-compose.yml    # Configuración Docker Compose
├── package.json          # Dependencias y scripts
└── README.md             # Este archivo
```

---

## � Variables de Entorno

```env
# Requeridas
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/adoptme

# Opcionales
PORT=8080
NODE_ENV=production
```

---

## 📝 Notas Adicionales

### Funcionalidades Destacadas

- **Sistema de logging** con Winston (desarrollo y producción)
- **Manejo centralizado de errores** con middleware global
- **Validación de datos** en requests
- **Autenticación** con JWT y cookies
- **Upload de archivos** con Multer
- **Healthcheck** para monitoreo de salud
- **Datos de prueba** con Faker.js
- **Documentación interactiva** con Swagger UI

### Consideraciones de Seguridad

✅ Usuario no-root en Docker  
✅ Variables sensibles en .env (no commiteadas)  
✅ Passwords encriptados con bcrypt  
✅ Validación de inputs  
✅ Rate limiting (implementable)  
✅ CORS configurado

---

## 👨‍💻 Autor

**Luka Lattanzi**

- GitHub: [@LukaLattanzi](https://github.com/LukaLattanzi)
- Docker Hub: [lukalattanzi/adoptme](https://hub.docker.com/r/lukalattanzi/adoptme)

---

## 📜 Licencia

ISC

---

## 🆘 Soporte y Problemas Comunes

### El contenedor no inicia

```bash
docker logs adoptme-app
# Verificar MONGO_URL está configurada
```

### Error de conexión a MongoDB

```bash
# Verificar la URL
docker exec adoptme-app printenv | grep MONGO_URL
```

### Los tests fallan

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
npm test
```

### Puerto 8080 en uso

```bash
# Usar otro puerto
docker run -d -p 3000:8080 ... lukalattanzi/adoptme:latest
```

---

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub**
