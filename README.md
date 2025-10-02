# 🐾 AdoptMe - Backend API# 🐾 AdoptMe - Backend API

Sistema backend para gestión de adopciones de mascotas con módulo de mocking, manejo de errores centralizado y sistema de logging profesional.Sistema backend completo para gestión de adopciones de mascotas con módulo de mocking, manejo de errores centralizado y sistema de logging profesional.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

![Winston](https://img.shields.io/badge/Winston-023E8A?style=for-the-badge)![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---## 🚀 Instalación y Configuración

## 📋 ENTREGABLE N°1 - ✅ COMPLETADO### 1. Clonar el repositorio

### Módulo de Mocking implementado según especificaciones:```bash

git clone https://github.com/LukaLattanzi/RecursosBackend-Adoptme.git

#### ✅ **Router mocks.router.js**cd RecursosBackend-Adoptme

- Creado bajo la ruta base `/api/mocks````

- Endpoint `/mockingpets` migrado exitosamente

### 2. Instalar dependencias

#### ✅ **Generación de Usuarios Mock**

- **Password**: "coder123" encriptada con bcrypt```bash

- **Role**: puede variar entre "user" y "admin"npm install

- **Pets**: array vacío```

- **Formato**: Compatible con MongoDB

### 3. Configurar variables de entorno

#### ✅ **Endpoints Implementados**:

Crear archivo `.env` en la raíz del proyecto:

| Endpoint | Método | Descripción |

|----------|--------|-------------|```env

| `/api/mocks/mockingpets` | GET | Genera 100 mascotas de prueba |# Configuración de la aplicación

| `/api/mocks/mockingusers` | GET | Genera 50 usuarios con especificaciones exactas |PORT=8080

| `/api/mocks/generateData` | POST | Inserta datos en la base de datos |NODE_ENV=development

---# Configuración de MongoDB

MONGO_URL=mongodb://localhost:27017/adoptme

## 🚀 Instalación y Configuración# O para MongoDB Atlas:

# MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/adoptme

### 1. Instalar dependencias

```bash# JWT Secret

npm installJWT_SECRET=tu_jwt_secret_aqui

```

# Otras configuraciones

### 2. Configurar variables de entornoCOOKIE_SECRET=tu_cookie_secret_aqui

````

Crear archivo `.env` en la raíz del proyecto:

### 4. Ejecutar el proyecto

```env

# Configuración de la aplicación AdoptMe#### Modo desarrollo (con recarga automática):

PORT=8080```bash

npm run dev

# Configuración de MongoDB```

MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/adoptme_proyecto

```#### Modo producción:

```bash

### 3. Ejecutar el proyectonpm start

````

````bash

# Modo desarrollo#### Modo producción con logging avanzado:

npm run dev```bash

npm run start:prod

# Modo producción```

npm start

## 🧪 Testing y Verificación

# Modo producción con logging avanzado

npm run start:prod### Scripts de prueba disponibles:

````

`````bash

---# Probar módulo de mocking

npm run test:mocking

## 🏗️ Estructura del Proyecto

# Probar sistema de logging (desarrollo)

```npm run test:logger

📦 RecursosBackend-Adoptme/

├── 📁 src/# Probar sistema de logging (producción)

│   ├── 📄 app.js                     # Aplicación principalnpm run test:logger:prod

│   ├── 📁 controllers/               # Controladores

│   │   ├── adoptions.controller.js# Ejecutar tests generales

│   │   ├── pets.controller.jsnpm test

│   │   ├── sessions.controller.js```

│   │   └── users.controller.js

│   ├── 📁 dao/                       # Data Access Objects## �️ Arquitectura del Proyecto

│   │   ├── Adoption.js

│   │   ├── Pets.dao.js```

│   │   ├── Users.dao.jssrc/

│   │   └── 📁 models/├── app.js                 # Aplicación principal

│   │       ├── Adoption.js├── controllers/           # Controladores de rutas

│   │       ├── Pet.js│   ├── users.controller.js

│   │       └── User.js│   ├── pets.controller.js

│   ├── 📁 dto/                       # Data Transfer Objects│   ├── adoptions.controller.js

│   │   ├── Pet.dto.js│   └── sessions.controller.js

│   │   └── User.dto.js├── dao/                   # Data Access Objects

│   ├── 📁 public/│   ├── models/           # Modelos de MongoDB

│   │   └── 📁 img/│   ├── Users.dao.js

│   ├── 📁 repository/                # Repositorios│   └── Pets.dao.js

│   │   ├── AdoptionRepository.js├── dto/                   # Data Transfer Objects

│   │   ├── GenericRepository.js├── repository/            # Patrón Repository

│   │   ├── PetRepository.js├── routes/                # Definición de rutas

│   │   └── UserRepository.js│   ├── users.router.js

│   ├── 📁 routes/                    # Rutas de la API│   ├── pets.router.js

│   │   ├── adoption.router.js│   ├── mocks.router.js

│   │   ├── logger.router.js│   └── logger.router.js

│   │   ├── mocks.router.js          # 🎯 ENTREGABLE N°1├── services/              # Lógica de negocio

│   │   ├── pets.router.js├── utils/                 # Utilidades

│   │   ├── sessions.router.js│   ├── logger.js         # Sistema de logging

│   │   └── users.router.js│   ├── mocking.js        # Generación de datos

│   ├── 📁 services/│   ├── errorHandler.js   # Manejo de errores

│   │   └── index.js│   └── index.js

│   └── 📁 utils/                     # Utilidades└── public/               # Archivos estáticos

│       ├── errorHandler.js          # Manejo de errores```

│       ├── index.js

│       ├── logger.js                # Sistema de logging## 🎭 Sistema de Mocking Completo

│       ├── mocking.js               # 🎯 Generación de datos mock

│       └── uploader.js### 📋 ENTREGABLE N°1 - ✅ IMPLEMENTADO

├── 📁 logs/                          # Logs del sistema

├── 📄 .env                           # Variables de entorno#### Endpoints de Mocking:

├── 📄 .gitignore

├── 📄 package.json| Endpoint | Método | Descripción | Parámetros |

└── 📄 README.md|----------|--------|-------------|------------|

```| `/api/mocks/mockingpets` | GET | Genera 100 mascotas de prueba | - |

| `/api/mocks/mockingusers` | GET | Genera 50 usuarios con especificaciones exactas | - |

---| `/api/mocks/generateData` | POST | Inserta datos en la base de datos | `{"users": number, "pets": number}` |



## 🎭 Sistema de Mocking - ENTREGABLE N°1#### Características de usuarios generados:

- ✅ **Password**: "coder123" encriptada con bcrypt

### 📋 **Especificaciones Implementadas**:- ✅ **Role**: "user" o "admin" (aleatorio)

- ✅ **Pets**: array vacío

#### **GET** `/api/mocks/mockingusers`- ✅ **Formato**: Compatible con MongoDB

- ✅ Genera **exactamente 50 usuarios**

- ✅ Password: **"coder123" encriptada** con bcrypt### Ejemplos de uso:

- ✅ Role: **"user" o "admin"** (aleatorio)

- ✅ Pets: **array vacío** `[]````bash

- ✅ Formato compatible con **MongoDB**# Generar usuarios mock

curl http://localhost:8080/api/mocks/mockingusers

#### **GET** `/api/mocks/mockingpets`

- ✅ Genera **100 mascotas** de prueba# Generar mascotas mock

- ✅ Especies variadas: dog, cat, bird, rabbit, hamster, fishcurl http://localhost:8080/api/mocks/mockingpets

- ✅ Datos realistas con Faker.js

# Insertar datos en BD

#### **POST** `/api/mocks/generateData`curl -X POST http://localhost:8080/api/mocks/generateData \

- ✅ Recibe parámetros: `{"users": number, "pets": number}`  -H "Content-Type: application/json" \

- ✅ **Inserta datos reales** en la base de datos  -d '{"users": 50, "pets": 100}'

- ✅ Usa servicios de users y pets

- ✅ Validación de parámetros (máximo 1000 por tipo)# Verificar inserción

curl http://localhost:8080/api/users

### 🧪 **Ejemplos de Uso**:curl http://localhost:8080/api/pets

`````

````bash

# Generar 50 usuarios mock (ENTREGABLE N°1)## 🚨 Sistema de Manejo de Errores

curl http://localhost:8080/api/mocks/mockingusers

### Características:

# Generar 100 mascotas mock

curl http://localhost:8080/api/mocks/mockingpets- ✅ **Manejo centralizado** con middleware global

- ✅ **Errores operacionales vs programación** diferenciados

# Insertar datos en la base de datos- ✅ **Respuestas consistentes** en formato JSON

curl -X POST http://localhost:8080/api/mocks/generateData \- ✅ **Logging automático** de errores

  -H "Content-Type: application/json" \- ✅ **Modo desarrollo vs producción**

  -d '{"users": 50, "pets": 100}'

### Tipos de errores manejados:

# Verificar usuarios insertados

curl http://localhost:8080/api/users| Código | Tipo | Descripción |

|--------|------|-------------|

# Verificar mascotas insertadas| 400 | Bad Request | Datos inválidos, errores de validación |

curl http://localhost:8080/api/pets| 401 | Unauthorized | JWT inválido/expirado |

```| 404 | Not Found | Recursos no encontrados |

| 500 | Internal Error | Errores del servidor |

---

### Errores específicos de MongoDB:

## 🚨 Sistema de Manejo de Errores- **ValidationError** - Errores de validación de esquema

- **CastError** - IDs mal formateados

### Características implementadas:- **DuplicateKeyError** - Campos únicos duplicados

- ✅ **Middleware centralizado** (`globalErrorHandler`)

- ✅ **Clase personalizada** `AppError`## 📊 Sistema de Logging Profesional

- ✅ **Manejo específico** de errores MongoDB

- ✅ **Captura automática** con `catchAsync`### Niveles de logging configurados:

- ✅ **Respuestas consistentes** en JSON1. **debug** (0) - Solo desarrollo

2. **http** (1) - Requests HTTP

### Tipos de errores manejados:3. **info** (2) - Información general

- **400**: Datos inválidos, errores de validación4. **warning** (3) - Advertencias

- **401**: JWT inválido/expirado  5. **error** (4) - Errores

- **404**: Recursos no encontrados6. **fatal** (5) - Errores críticos

- **500**: Errores internos del servidor

### Configuración por entorno:

---

#### 🛠️ Desarrollo:

## 📊 Sistema de Logging Profesional- ✅ Nivel mínimo: **debug**

- ✅ Salida: **consola** con colores

### Niveles configurados (menor a mayor prioridad):- ✅ Formato: legible y detallado

1. **debug** - Solo desarrollo

2. **http** - Requests HTTP#### 🚀 Producción:

3. **info** - Información general- ✅ Nivel mínimo: **info**

4. **warning** - Advertencias- ✅ Salida: **consola** + archivo `logs/errors.log`

5. **error** - Errores- ✅ Formato: JSON estructurado

6. **fatal** - Errores críticos

### Endpoint de prueba:

### Por entorno:```bash

- **Desarrollo**: nivel debug+, solo consola con colores# Probar todos los niveles de logging

- **Producción**: nivel info+, errores en archivo `logs/errors.log`curl http://localhost:8080/api/loggerTest

````

### Endpoint de prueba:

````bash## 🌐 API Endpoints

curl http://localhost:8080/api/loggerTest

```### 👥 Usuarios (`/api/users`)

- `GET /api/users` - Obtener todos los usuarios

---- `GET /api/users/:id` - Obtener usuario por ID

- `PUT /api/users/:id` - Actualizar usuario

## 🌐 API Endpoints- `DELETE /api/users/:id` - Eliminar usuario



### 👥 **Usuarios** (`/api/users`)### 🐕 Mascotas (`/api/pets`)

- `GET /api/users` - Obtener todos los usuarios- `GET /api/pets` - Obtener todas las mascotas

- `GET /api/users/:id` - Obtener usuario por ID- `POST /api/pets` - Crear nueva mascota

- `PUT /api/users/:id` - Actualizar usuario- `PUT /api/pets/:id` - Actualizar mascota

- `DELETE /api/users/:id` - Eliminar usuario- `DELETE /api/pets/:id` - Eliminar mascota



### 🐕 **Mascotas** (`/api/pets`)### 🤝 Adopciones (`/api/adoptions`)

- `GET /api/pets` - Obtener todas las mascotas- `GET /api/adoptions` - Obtener todas las adopciones

- `POST /api/pets` - Crear nueva mascota- `POST /api/adoptions` - Crear nueva adopción

- `PUT /api/pets/:id` - Actualizar mascota- `GET /api/adoptions/:id` - Obtener adopción por ID

- `DELETE /api/pets/:id` - Eliminar mascota

### 🔐 Sesiones (`/api/sessions`)

### 🤝 **Adopciones** (`/api/adoptions`)- `POST /api/sessions/register` - Registrar usuario

- `GET /api/adoptions` - Obtener todas las adopciones- `POST /api/sessions/login` - Iniciar sesión

- `POST /api/adoptions` - Crear nueva adopción- `POST /api/sessions/logout` - Cerrar sesión

- `GET /api/adoptions/:id` - Obtener adopción por ID

### 🎭 Mocking (`/api/mocks`)

### 🔐 **Sesiones** (`/api/sessions`)- `GET /api/mocks/mockingpets` - Generar mascotas mock

- `POST /api/sessions/register` - Registrar usuario- `GET /api/mocks/mockingusers` - Generar usuarios mock

- `POST /api/sessions/login` - Iniciar sesión- `POST /api/mocks/generateData` - Insertar datos en BD



### 🎭 **Mocking** (`/api/mocks`) - **ENTREGABLE N°1**### 📊 Logging (`/api/loggerTest`)

- `GET /api/mocks/mockingpets` - Generar mascotas mock- `GET /api/loggerTest` - Probar todos los niveles de logging

- `GET /api/mocks/mockingusers` - Generar usuarios mock

- `POST /api/mocks/generateData` - Insertar datos en BD## 🛠️ Tecnologías Utilizadas



### 📊 **Logging** (`/api/loggerTest`)### Backend:

- `GET /api/loggerTest` - Probar sistema de logging- **Node.js** - Runtime de JavaScript

- **Express.js** - Framework web

---- **MongoDB** - Base de datos NoSQL

- **Mongoose** - ODM para MongoDB

## 🛠️ Tecnologías Utilizadas

### Autenticación y Seguridad:

### **Backend Core**:- **JWT** - JSON Web Tokens

- **Node.js** - Runtime de JavaScript- **bcrypt** - Encriptación de contraseñas

- **Express.js** - Framework web- **cookie-parser** - Manejo de cookies

- **MongoDB** - Base de datos NoSQL

- **Mongoose** - ODM para MongoDB### Desarrollo y Testing:

- **@faker-js/faker** - Generación de datos mock

### **Mocking y Testing**:- **winston** - Sistema de logging profesional

- **@faker-js/faker** - Generación de datos mock- **nodemon** - Recarga automática en desarrollo

- **bcrypt** - Encriptación de contraseñas- **dotenv** - Manejo de variables de entorno



### **Logging y Monitoreo**:### Utilidades:

- **winston** - Sistema de logging profesional- **multer** - Manejo de archivos

- **dotenv** - Variables de entorno- **supertest** - Testing de APIs

- **mocha & chai** - Framework de testing

### **Desarrollo**:

- **nodemon** - Recarga automática## 🔒 Seguridad y Buenas Prácticas

- **cookie-parser** - Manejo de cookies

- **multer** - Manejo de archivos- ✅ **Variables de entorno** para configuraciones sensibles

- ✅ **Encriptación de contraseñas** con bcrypt y salt

---- ✅ **Autenticación JWT** con tokens seguros

- ✅ **Validación de datos** en entrada

## 📝 Scripts Disponibles- ✅ **Manejo centralizado de errores**

- ✅ **Logging de seguridad** para auditoría

```bash- ✅ **Sanitización de inputs** para prevenir inyecciones

# Producción

npm start                    # Iniciar servidor## 📈 Monitoreo y Observabilidad

npm run start:prod          # Modo producción con logging

### Logging automático de:

# Desarrollo  - ✅ **Requests HTTP** con timing y status

npm run dev                 # Modo desarrollo con nodemon- ✅ **Errores de aplicación** con stack traces

- ✅ **Conexiones a base de datos**

# Testing- ✅ **Operaciones CRUD importantes**

npm run test:mocking        # Probar módulo de mocking- ✅ **Autenticación y autorización**

npm run test:logger         # Probar sistema de logging

npm run test:logger:prod    # Probar logging en producción### Archivos de log:

```- `logs/errors.log` - Errores y eventos críticos (producción)

- Consola con colores - Todos los niveles (desarrollo)

---

## 🚀 Deploy y Producción

## 🔍 Verificación del ENTREGABLE N°1

### Variables de entorno requeridas:

### ✅ **Todos los criterios cumplidos**:```env

NODE_ENV=production

1. **✅ Router `mocks.router.js`** - Creado bajo `/api/mocks`PORT=8080

2. **✅ Migración `/mockingpets`** - Movido al nuevo routerMONGO_URL=mongodb+srv://...

3. **✅ Módulo de mocking usuarios** - Con especificaciones exactasJWT_SECRET=secret_super_seguro

4. **✅ Endpoint `/mockingusers`** - 50 usuarios formato MongoDB  ```

5. **✅ Endpoint `/generateData`** - Inserción en base de datos

6. **✅ Verificación de registros** - Mediante servicios GET### Comandos de producción:

```bash

### 🧪 **Para verificar la implementación**:# Instalar dependencias de producción

npm ci --only=production

```bash

# 1. Verificar usuarios mock (50 usuarios con specs exactas)# Ejecutar en modo producción

curl http://localhost:8080/api/mocks/mockingusersnpm run start:prod

````

# 2. Verificar mascotas mock (100 mascotas)

curl http://localhost:8080/api/mocks/mockingpets## 🤝 Contribución

# 3. Insertar datos en BD1. Fork el proyecto

curl -X POST http://localhost:8080/api/mocks/generateData \2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)

-H "Content-Type: application/json" \3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)

-d '{"users": 10, "pets": 20}'4. Push a la rama (`git push origin feature/AmazingFeature`)

5. Abrir un Pull Request

# 4. Comprobar inserción

curl http://localhost:8080/api/users## 📋 Estado del Proyecto

curl http://localhost:8080/api/pets

````### ✅ Completado:

- **Módulo de Mocking** - Generación de datos de prueba

---- **Manejo de Errores** - Sistema centralizado y robusto

- **Sistema de Logging** - Winston con múltiples niveles

## 🚀 Deploy y Producción- **ENTREGABLE N°1** - Todos los criterios implementados

- **API REST** - Endpoints completos y funcionales

### Variables de entorno requeridas:- **Autenticación JWT** - Sistema de login/registro

```env- **Base de datos** - Modelos y relaciones definidas

PORT=8080

MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/adoptme_proyecto### 🔄 En desarrollo:

```- Testing automatizado completo

- Documentación OpenAPI/Swagger

### Para producción:- Optimizaciones de performance

```bash

npm run start:prod## 📄 Licencia

````

Este proyecto está bajo la Licencia ISC.

---

## 👨‍💻 Autor

## 📄 Licencia

**Luka Lattanzi**

ISC- GitHub: [@LukaLattanzi](https://github.com/LukaLattanzi)

---

## 👨‍💻 Autor⭐️ **¡Si te gusta este proyecto, dale una estrella!** ⭐️

**Luka Lattanzi**  
GitHub: [@LukaLattanzi](https://github.com/LukaLattanzi)

---

🎯 **PROYECTO COMPLETADO** - Todos los entregables implementados y verificados ✅
