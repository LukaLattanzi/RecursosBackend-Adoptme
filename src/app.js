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
import loggerRouter from './routes/logger.router.js';
import { globalErrorHandler, notFoundHandler } from './utils/errorHandler.js';
import logger from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Configurar Mongoose para evitar warnings de deprecación
mongoose.set('strictQuery', false);

// Conectar a MongoDB con manejo de errores
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    logger.info('✅ Conectado a MongoDB exitosamente', {
      database: 'adoptme',
      host: 'MongoDB Atlas'
    });
  })
  .catch((error) => {
    logger.fatal('❌ Error conectando a MongoDB', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  });

app.use(express.json());
app.use(cookieParser());

// Middleware de logging HTTP
app.use(logger.httpLog);

// Rutas principales
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api', loggerRouter);

// Middleware para rutas no encontradas (debe ir después de todas las rutas)
app.all('*', notFoundHandler);

// Middleware global de manejo de errores (debe ir al final)
app.use(globalErrorHandler);

app.listen(PORT, () => {
  logger.info(`🚀 Servidor ejecutándose en puerto ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});
