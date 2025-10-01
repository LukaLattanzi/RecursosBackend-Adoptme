# 🐾 AdoptMe - Backend API

Sistema backend completo para gestión de adopciones de mascotas con módulo de mocking, manejo de errores centralizado y sistema de logging profesional.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/LukaLattanzi/RecursosBackend-Adoptme.git
cd RecursosBackend-Adoptme
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Configuración de la aplicación
PORT=8080
NODE_ENV=development

# Configuración de MongoDB
MONGO_URL=mongodb://localhost:27017/adoptme
# O para MongoDB Atlas:
# MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/adoptme

# JWT Secret
JWT_SECRET=tu_jwt_secret_aqui

# Otras configuraciones
COOKIE_SECRET=tu_cookie_secret_aqui
```

### 4. Ejecutar el proyecto

#### Modo desarrollo (con recarga automática):
```bash
npm run dev
```

#### Modo producción:
```bash
npm start
```

#### Modo producción con logging avanzado:
```bash
npm run start:prod
```

## 🧪 Testing y Verificación

### Scripts de prueba disponibles:

```bash
# Probar módulo de mocking
npm run test:mocking

# Probar sistema de logging (desarrollo)
npm run test:logger

# Probar sistema de logging (producción)
npm run test:logger:prod

# Ejecutar tests generales
npm test
```

## �️ Arquitectura del Proyecto

```
src/
├── app.js                 # Aplicación principal
├── controllers/           # Controladores de rutas
│   ├── users.controller.js
│   ├── pets.controller.js
│   ├── adoptions.controller.js
│   └── sessions.controller.js
├── dao/                   # Data Access Objects
│   ├── models/           # Modelos de MongoDB
│   ├── Users.dao.js
│   └── Pets.dao.js
├── dto/                   # Data Transfer Objects
├── repository/            # Patrón Repository
├── routes/                # Definición de rutas
│   ├── users.router.js
│   ├── pets.router.js
│   ├── mocks.router.js
│   └── logger.router.js
├── services/              # Lógica de negocio
├── utils/                 # Utilidades
│   ├── logger.js         # Sistema de logging
│   ├── mocking.js        # Generación de datos
│   ├── errorHandler.js   # Manejo de errores
│   └── index.js
└── public/               # Archivos estáticos
```

## 🎭 Sistema de Mocking Completo

### 📋 ENTREGABLE N°1 - ✅ IMPLEMENTADO

#### Endpoints de Mocking:

| Endpoint | Método | Descripción | Parámetros |
|----------|--------|-------------|------------|
| `/api/mocks/mockingpets` | GET | Genera 100 mascotas de prueba | - |
| `/api/mocks/mockingusers` | GET | Genera 50 usuarios con especificaciones exactas | - |
| `/api/mocks/generateData` | POST | Inserta datos en la base de datos | `{"users": number, "pets": number}` |

#### Características de usuarios generados:
- ✅ **Password**: "coder123" encriptada con bcrypt
- ✅ **Role**: "user" o "admin" (aleatorio)
- ✅ **Pets**: array vacío
- ✅ **Formato**: Compatible con MongoDB

### Ejemplos de uso:

```bash
# Generar usuarios mock
curl http://localhost:8080/api/mocks/mockingusers

# Generar mascotas mock
curl http://localhost:8080/api/mocks/mockingpets

# Insertar datos en BD
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 50, "pets": 100}'

# Verificar inserción
curl http://localhost:8080/api/users
curl http://localhost:8080/api/pets
```

## 🚨 Sistema de Manejo de Errores

### Características:

- ✅ **Manejo centralizado** con middleware global
- ✅ **Errores operacionales vs programación** diferenciados
- ✅ **Respuestas consistentes** en formato JSON
- ✅ **Logging automático** de errores
- ✅ **Modo desarrollo vs producción**

### Tipos de errores manejados:

| Código | Tipo | Descripción |
|--------|------|-------------|
| 400 | Bad Request | Datos inválidos, errores de validación |
| 401 | Unauthorized | JWT inválido/expirado |
| 404 | Not Found | Recursos no encontrados |
| 500 | Internal Error | Errores del servidor |

### Errores específicos de MongoDB:
- **ValidationError** - Errores de validación de esquema
- **CastError** - IDs mal formateados
- **DuplicateKeyError** - Campos únicos duplicados

## 📊 Sistema de Logging Profesional

### Niveles de logging configurados:
1. **debug** (0) - Solo desarrollo
2. **http** (1) - Requests HTTP
3. **info** (2) - Información general
4. **warning** (3) - Advertencias
5. **error** (4) - Errores
6. **fatal** (5) - Errores críticos

### Configuración por entorno:

#### 🛠️ Desarrollo:
- ✅ Nivel mínimo: **debug**
- ✅ Salida: **consola** con colores
- ✅ Formato: legible y detallado

#### 🚀 Producción:
- ✅ Nivel mínimo: **info**
- ✅ Salida: **consola** + archivo `logs/errors.log`
- ✅ Formato: JSON estructurado

### Endpoint de prueba:
```bash
# Probar todos los niveles de logging
curl http://localhost:8080/api/loggerTest
```

## 🌐 API Endpoints

### 👥 Usuarios (`/api/users`)
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### 🐕 Mascotas (`/api/pets`)
- `GET /api/pets` - Obtener todas las mascotas
- `POST /api/pets` - Crear nueva mascota
- `PUT /api/pets/:id` - Actualizar mascota
- `DELETE /api/pets/:id` - Eliminar mascota

### 🤝 Adopciones (`/api/adoptions`)
- `GET /api/adoptions` - Obtener todas las adopciones
- `POST /api/adoptions` - Crear nueva adopción
- `GET /api/adoptions/:id` - Obtener adopción por ID

### 🔐 Sesiones (`/api/sessions`)
- `POST /api/sessions/register` - Registrar usuario
- `POST /api/sessions/login` - Iniciar sesión
- `POST /api/sessions/logout` - Cerrar sesión

### 🎭 Mocking (`/api/mocks`)
- `GET /api/mocks/mockingpets` - Generar mascotas mock
- `GET /api/mocks/mockingusers` - Generar usuarios mock
- `POST /api/mocks/generateData` - Insertar datos en BD

### 📊 Logging (`/api/loggerTest`)
- `GET /api/loggerTest` - Probar todos los niveles de logging

## 🛠️ Tecnologías Utilizadas

### Backend:
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

### Autenticación y Seguridad:
- **JWT** - JSON Web Tokens
- **bcrypt** - Encriptación de contraseñas
- **cookie-parser** - Manejo de cookies

### Desarrollo y Testing:
- **@faker-js/faker** - Generación de datos mock
- **winston** - Sistema de logging profesional
- **nodemon** - Recarga automática en desarrollo
- **dotenv** - Manejo de variables de entorno

### Utilidades:
- **multer** - Manejo de archivos
- **supertest** - Testing de APIs
- **mocha & chai** - Framework de testing

## 🔒 Seguridad y Buenas Prácticas

- ✅ **Variables de entorno** para configuraciones sensibles
- ✅ **Encriptación de contraseñas** con bcrypt y salt
- ✅ **Autenticación JWT** con tokens seguros
- ✅ **Validación de datos** en entrada
- ✅ **Manejo centralizado de errores**
- ✅ **Logging de seguridad** para auditoría
- ✅ **Sanitización de inputs** para prevenir inyecciones

## 📈 Monitoreo y Observabilidad

### Logging automático de:
- ✅ **Requests HTTP** con timing y status
- ✅ **Errores de aplicación** con stack traces
- ✅ **Conexiones a base de datos**
- ✅ **Operaciones CRUD importantes**
- ✅ **Autenticación y autorización**

### Archivos de log:
- `logs/errors.log` - Errores y eventos críticos (producción)
- Consola con colores - Todos los niveles (desarrollo)

## 🚀 Deploy y Producción

### Variables de entorno requeridas:
```env
NODE_ENV=production
PORT=8080
MONGO_URL=mongodb+srv://...
JWT_SECRET=secret_super_seguro
```

### Comandos de producción:
```bash
# Instalar dependencias de producción
npm ci --only=production

# Ejecutar en modo producción
npm run start:prod
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📋 Estado del Proyecto

### ✅ Completado:
- **Módulo de Mocking** - Generación de datos de prueba
- **Manejo de Errores** - Sistema centralizado y robusto
- **Sistema de Logging** - Winston con múltiples niveles
- **ENTREGABLE N°1** - Todos los criterios implementados
- **API REST** - Endpoints completos y funcionales
- **Autenticación JWT** - Sistema de login/registro
- **Base de datos** - Modelos y relaciones definidas

### 🔄 En desarrollo:
- Testing automatizado completo
- Documentación OpenAPI/Swagger
- Optimizaciones de performance

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👨‍💻 Autor

**Luka Lattanzi**
- GitHub: [@LukaLattanzi](https://github.com/LukaLattanzi)

---

⭐️ **¡Si te gusta este proyecto, dale una estrella!** ⭐️
