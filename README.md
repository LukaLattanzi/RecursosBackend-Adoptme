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

## 📁 Estructura

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
