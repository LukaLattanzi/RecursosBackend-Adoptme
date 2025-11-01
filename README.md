# 🐾 AdoptMe - Backend API

Sistema backend para gestión de adopciones de mascotas con módulo de mocking, manejo de errores, logging y **completamente dockerizado**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-27%20passing-brightgreen)

---

## 🎓 **INICIO RÁPIDO PARA PROFESORES/EVALUADORES**

### ⚡ Método 1: Docker (Recomendado - 1 minuto)

```bash
# 1. Descargar imagen desde Docker Hub
docker pull lukalattanzi/adoptme:latest

# 2. Ejecutar (reemplazar con tu MONGO_URL)
docker run -d -p 8080:8080 \
  -e MONGO_URL="mongodb+srv://usuario:password@cluster.mongodb.net/adoptme" \
  --name adoptme \
  lukalattanzi/adoptme:latest

# 3. Abrir documentación Swagger
# http://localhost:8080/api/docs

# 4. Detener cuando termines
docker stop adoptme && docker rm adoptme
```

### � Método 2: Desde GitHub (3-5 minutos)

```bash
# 1. Clonar repositorio
git clone https://github.com/LukaLattanzi/RecursosBackend-Adoptme.git
cd RecursosBackend-Adoptme

# 2. Instalar y configurar
npm install
cp .env.example .env
# Editar .env con tu MONGO_URL

# 3. Ejecutar tests
npm test  # Debe mostrar: 27 passing

# 4. Iniciar servidor
npm start

# 5. Abrir documentación Swagger
# http://localhost:8080/api/docs
```

### 📊 ¿Qué Verificar?

| Item                | Ubicación                                     | Esperado                          |
| ------------------- | --------------------------------------------- | --------------------------------- |
| **Swagger Users**   | http://localhost:8080/api/docs → Tag "Users"  | 5 endpoints documentados          |
| **Tests Adoptions** | `npm test` → archivo adoptions.test.js        | 12 tests pasando                  |
| **Dockerfile**      | Ver archivo `Dockerfile`                      | Multi-stage, no-root, healthcheck |
| **Docker Hub**      | https://hub.docker.com/r/lukalattanzi/adoptme | Imagen pública disponible         |

---

## �📋 Tabla de Contenidos

- [Inicio Rápido para Profesores](#-inicio-rápido-para-profesoresevaluadores)
- [Entrega Final](#-entrega-final---completada)
- [Inicio Rápido General](#-inicio-rápido)
- [Docker](#-docker)
- [Documentación API (Swagger)](#-documentación-api-swagger)
- [Tests](#-tests)
- [Instalación Local](#-instalación-local)
- [Endpoints Principales](#-endpoints-principales)
- [Guía para Evaluadores](#-guía-para-evaluadores)
- [Tecnologías](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)

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

### ✅ Requisitos de Entrega Cumplidos

| #   | Requisito                         | Estado | Verificación                                    |
| --- | --------------------------------- | ------ | ----------------------------------------------- |
| 1   | **Documentación Swagger - Users** | ✅     | 5 endpoints en `/api/docs` tag "Users"          |
| 2   | **Tests adoption.router.js**      | ✅     | 12 tests en `test/adoptions.test.js`            |
| 3   | **Dockerfile optimizado**         | ✅     | Multi-stage build, usuario no-root, healthcheck |
| 4   | **Imagen en Docker Hub**          | ✅     | `docker pull lukalattanzi/adoptme:latest`       |
| 5   | **README completo**               | ✅     | Este documento con todas las instrucciones      |

### 🔍 Verificación Paso a Paso

#### 1️⃣ Verificar Docker Hub (30 segundos)

```bash
# Descargar imagen pública
docker pull lukalattanzi/adoptme:latest

# Debe descargar sin errores
# Imagen: ~280MB
```

**Enlace directo:** https://hub.docker.com/r/lukalattanzi/adoptme

#### 2️⃣ Verificar Swagger - 5 Endpoints Users (2 minutos)

```bash
# Ejecutar contenedor
docker run -d -p 8080:8080 \
  -e MONGO_URL="tu_mongodb_url" \
  --name adoptme-eval \
  lukalattanzi/adoptme:latest

# Abrir en navegador: http://localhost:8080/api/docs
```

**Buscar tag "Users" y verificar:**

- ✅ `GET /api/users` - Listar usuarios
- ✅ `GET /api/users/:uid` - Obtener usuario por ID
- ✅ `PUT /api/users/:uid` - Actualizar usuario
- ✅ `DELETE /api/users/:uid` - Eliminar usuario
- ✅ `POST /api/users/:uid/documents` - Subir documentos

Cada endpoint debe incluir:

- Descripción completa
- Parámetros documentados
- Schemas de request/response
- Códigos de estado (200, 400, 404, 500)

#### 3️⃣ Verificar Tests - 12 de Adoptions (3 minutos)

```bash
# Clonar repositorio
git clone https://github.com/LukaLattanzi/RecursosBackend-Adoptme.git
cd RecursosBackend-Adoptme

# Instalar dependencias
npm install

# Ejecutar tests
npm test
```

**Output esperado:**

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

**Verificar archivo:** `test/adoptions.test.js` contiene los 12 tests

#### 4️⃣ Verificar Dockerfile (1 minuto)

```bash
# Ver contenido del Dockerfile
cat Dockerfile
```

**Debe contener:**

- ✅ Multi-stage build (`FROM node:20-alpine AS builder`)
- ✅ Usuario no-root (`USER nodejs`)
- ✅ Healthcheck configurado
- ✅ Variables de entorno documentadas
- ✅ Optimizaciones (npm ci, cache clean)

#### 5️⃣ Limpiar Ambiente

```bash
# Detener contenedor de prueba
docker stop adoptme-eval && docker rm adoptme-eval
```

### 📝 Checklist de Evaluación Completa

**Documentación Swagger Users:**

- [ ] Tag "Users" visible en /api/docs
- [ ] GET /api/users - Schema completo con UserDTO
- [ ] GET /api/users/:uid - Parámetro uid documentado
- [ ] PUT /api/users/:uid - RequestBody con schema
- [ ] DELETE /api/users/:uid - Responses 200 y 404
- [ ] POST /api/users/:uid/documents - Multipart/form-data

**Tests adoption.router.js:**

- [ ] 12 tests de adoptions en total
- [ ] GET /api/adoptions - 3 tests (vacío, con datos, errores)
- [ ] GET /api/adoptions/:aid - 3 tests (404, existente, ID correcto)
- [ ] POST /api/adoptions/:uid/:pid - 6 tests (user 404, pet 404, adopted, success, etc.)
- [ ] Usa Mocha + Chai + Supertest
- [ ] Mocks de servicios implementados
- [ ] Todos los tests pasan

**Dockerfile:**

- [ ] Multi-stage build presente
- [ ] Stage 1: builder - instala dependencias
- [ ] Stage 2: runtime - copia de builder
- [ ] Usuario nodejs (no-root) configurado
- [ ] Healthcheck con endpoint /api/sessions/current
- [ ] ENTRYPOINT con dumb-init
- [ ] Variables de entorno ENV NODE_ENV=production

**Docker Hub:**

- [ ] Imagen accesible públicamente
- [ ] `docker pull lukalattanzi/adoptme:latest` funciona
- [ ] Imagen ejecuta correctamente
- [ ] Tag "latest" presente
- [ ] Tamaño razonable (~280MB)

**README.md:**

- [ ] Instrucciones claras para ejecutar con Docker
- [ ] Instrucciones para ejecutar tests
- [ ] Documentación de endpoints
- [ ] Requisitos del sistema documentados
- [ ] Variables de entorno explicadas

### 🚀 Comandos de Verificación Completa (Todo en Uno)

```bash
# Crear archivo de verificación
cat > verificar.sh << 'EOF'
#!/bin/bash
echo "🔍 Iniciando verificación de AdoptMe API..."
echo ""

echo "1️⃣ Verificando Docker Hub..."
docker pull lukalattanzi/adoptme:latest && echo "✅ Imagen descargada" || echo "❌ Error al descargar"
echo ""

echo "2️⃣ Verificando Dockerfile local..."
if [ -f "Dockerfile" ]; then
    grep -q "multi-stage\|AS builder" Dockerfile && echo "✅ Multi-stage build" || echo "❌ No multi-stage"
    grep -q "USER nodejs" Dockerfile && echo "✅ Usuario no-root" || echo "❌ No user no-root"
    grep -q "HEALTHCHECK" Dockerfile && echo "✅ Healthcheck" || echo "❌ No healthcheck"
else
    echo "❌ Dockerfile no encontrado"
fi
echo ""

echo "3️⃣ Ejecutando tests..."
npm test 2>&1 | grep -E "passing|failing"
echo ""

echo "4️⃣ Iniciando contenedor de prueba..."
docker run -d -p 8080:8080 \
  -e MONGO_URL="mongodb+srv://..." \
  --name adoptme-verify \
  lukalattanzi/adoptme:latest

sleep 5
docker logs adoptme-verify | head -n 20

echo ""
echo "✅ Verificación completa"
echo "📖 Swagger: http://localhost:8080/api/docs"
echo "🧹 Limpiar: docker stop adoptme-verify && docker rm adoptme-verify"
EOF

chmod +x verificar.sh
./verificar.sh
```

### 📊 Resumen de Evaluación

**Puntos Clave:**

- ✅ Proyecto completamente funcional
- ✅ Dockerizado y en Docker Hub público
- ✅ 27 tests pasando (12 de adoptions específicamente)
- ✅ Documentación Swagger completa para Users (5 endpoints)
- ✅ Dockerfile optimizado con mejores prácticas
- ✅ README exhaustivo con todas las instrucciones

**Enlaces Importantes:**

- 🔗 GitHub: https://github.com/LukaLattanzi/RecursosBackend-Adoptme
- 🔗 Docker Hub: https://hub.docker.com/r/lukalattanzi/adoptme
- 🔗 Swagger: http://localhost:8080/api/docs (después de ejecutar)

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

## 📦 Información de Entrega

### 📅 Detalles de la Entrega

- **Fecha de Entrega:** 01/11/2025
- **Estudiante:** Luka Lattanzi
- **Versión:** 1.0.0
- **Estado:** ✅ Completo y Listo para Evaluación

### 🔗 Enlaces de Entrega

| Recurso                | URL                                                     | Descripción                             |
| ---------------------- | ------------------------------------------------------- | --------------------------------------- |
| **Repositorio GitHub** | https://github.com/LukaLattanzi/RecursosBackend-Adoptme | Código fuente completo                  |
| **Docker Hub**         | https://hub.docker.com/r/lukalattanzi/adoptme           | Imagen Docker pública                   |
| **Swagger Docs**       | http://localhost:8080/api/docs                          | Documentación API (después de ejecutar) |

### 📥 Comandos de Descarga

```bash
# Clonar desde GitHub
git clone https://github.com/LukaLattanzi/RecursosBackend-Adoptme.git

# Descargar desde Docker Hub
docker pull lukalattanzi/adoptme:latest
```

### 📊 Resumen de Entregables

| Entregable                  | Archivo/Ubicación             | Estado           |
| --------------------------- | ----------------------------- | ---------------- |
| Documentación Swagger Users | `/api/docs` tag "Users"       | ✅ 5 endpoints   |
| Tests Adoptions             | `test/adoptions.test.js`      | ✅ 12 tests      |
| Dockerfile Optimizado       | `Dockerfile`                  | ✅ Multi-stage   |
| Imagen Docker Hub           | `lukalattanzi/adoptme:latest` | ✅ Pública       |
| README Completo             | `README.md`                   | ✅ Este archivo  |
| Tests Completos             | `npm test`                    | ✅ 27/27 passing |

### 🎯 Cómo Evaluar Este Proyecto

**Opción Rápida (Docker):**

```bash
docker pull lukalattanzi/adoptme:latest
docker run -d -p 8080:8080 -e MONGO_URL="..." lukalattanzi/adoptme:latest
# Abrir: http://localhost:8080/api/docs
```

**Opción Completa (GitHub + Tests):**

```bash
git clone https://github.com/LukaLattanzi/RecursosBackend-Adoptme.git
cd RecursosBackend-Adoptme
npm install
npm test    # Ver 27 tests pasando
npm start   # Iniciar servidor
# Abrir: http://localhost:8080/api/docs
```

### 📧 Contacto

- **GitHub:** [@LukaLattanzi](https://github.com/LukaLattanzi)
- **Docker Hub:** [lukalattanzi](https://hub.docker.com/u/lukalattanzi)
- **Email:** [Disponible en el perfil de GitHub]

---

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub**

---

**Desarrollado con ❤️ por Luka Lattanzi - 2025**
