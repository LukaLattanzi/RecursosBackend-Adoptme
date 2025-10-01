# 🐾 AdoptMe - Backend

Sistema backend para gestión de adopciones de mascotas.

## 🚀 Instalación y configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

1. Copia el archivo `.env.example` como `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` con tus configuraciones:
   ```
   PORT=8080
   MONGO_URL=tu_url_de_mongodb_aqui
   JWT_SECRET=tu_secreto_jwt_seguro
   NODE_ENV=development
   ```

### 3. Configurar MongoDB

#### Opción A: MongoDB Local

```
MONGO_URL=mongodb://localhost:27017/adoptme
```

#### Opción B: MongoDB Atlas

```
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/adoptme
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

#### Ejecutar tests:

```bash
npm test
```

#### Probar módulo de mocking:

```bash
npm run test:mocking
```

## 🎭 Módulo de Mocking

El proyecto incluye un sistema completo de generación de datos de prueba:

### Endpoints de Mocking disponibles:

- **GET `/api/mocks/mockingpets`** - Genera 100 mascotas de prueba
- **GET `/api/mocks/mockingusers`** - Genera 50 usuarios de prueba
- **GET `/api/mocks/adoptions?count=20`** - Genera adopciones de prueba
- **POST `/api/mocks/generateData`** - Inserta datos de prueba en la base de datos

### Ejemplo de uso:

```bash
# Generar mascotas de prueba
curl http://localhost:8080/api/mocks/mockingpets

# Generar usuarios de prueba
curl http://localhost:8080/api/mocks/mockingusers
```

## 🚨 Manejo de Errores

El proyecto incluye un sistema centralizado de manejo de errores que:

- ✅ Maneja errores de MongoDB (validación, duplicación, cast errors)
- ✅ Maneja errores de JWT (token inválido/expirado)
- ✅ Diferencia entre modo desarrollo y producción
- ✅ Captura errores async automáticamente
- ✅ Proporciona respuestas consistentes

### Tipos de errores manejados:

- **400** - Datos inválidos o mal formados
- **401** - Problemas de autenticación
- **404** - Recursos no encontrados
- **500** - Errores internos del servidor

## 📡 Endpoints disponibles

- **Users**: `/api/users` - Gestión de usuarios
- **Pets**: `/api/pets` - Gestión de mascotas
- **Adoptions**: `/api/adoptions` - Gestión de adopciones
- **Sessions**: `/api/sessions` - Autenticación y sesiones

## 🛠️ Tecnologías utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **bcrypt** - Encriptación de contraseñas
- **Multer** - Manejo de archivos

## 📝 Estructura del proyecto

```
src/
├── app.js              # Archivo principal de la aplicación
├── controllers/        # Controladores de rutas
├── dao/               # Data Access Objects
├── dto/               # Data Transfer Objects
├── repository/        # Repositorios
├── routes/            # Definición de rutas
├── services/          # Lógica de negocio
└── utils/             # Utilidades y helpers
```

## 🔒 Seguridad

- Las variables de entorno están en `.env` (no incluido en el repositorio)
- Las contraseñas se encriptan con bcrypt
- Autenticación mediante JWT tokens

## 📄 Licencia

ISC
