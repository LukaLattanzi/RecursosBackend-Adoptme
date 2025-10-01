import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import { globalErrorHandler, notFoundHandler } from './utils/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a MongoDB con manejo de errores
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Conectado a MongoDB exitosamente');
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  });

app.use(express.json());
app.use(cookieParser());

// Rutas principales
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

// Middleware para rutas no encontradas (debe ir después de todas las rutas)
app.all('*', notFoundHandler);

// Middleware global de manejo de errores (debe ir al final)
app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`));
