import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Diagnóstico rápido: indicar que app.js empezó a ejecutarse
console.log('[app] app.js empezando evaluación...');

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import loggerRouter from './routes/logger.router.js';
import swaggerRouter from './routes/swaggerDocs.router.js';
import { globalErrorHandler, notFoundHandler } from './utils/errorHandler.js';
import logger from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Configurar Mongoose para evitar warnings de deprecación
mongoose.set('strictQuery', false);

// Conectar a MongoDB con manejo de errores
// Conectar a MongoDB con manejo de errores y timeout explícito
const mongooseOptions = {
  // Mongoose 6 no necesita useNewUrlParser / useUnifiedTopology pero podemos
  // controlar el timeout de selección de servidor para fallar rápido si no hay red.
  serverSelectionTimeoutMS: 5000
};

mongoose.connect(process.env.MONGO_URL, mongooseOptions)
  .then(() => {
    logger.info('✅ Conectado a MongoDB exitosamente', {
      database: 'adoptme',
      host: 'MongoDB Atlas'
    });
  })
  .catch((error) => {
    logger.fatal('❌ Error conectando a MongoDB (connect)', {
      error: error.message,
      stack: error.stack
    });
    // No salir inmediatamente: mongoose puede emitir eventos; cerramos con código 1
    process.exit(1);
  });

// Listeners de conexión para mayor trazabilidad
mongoose.connection.on('connected', () => {
  logger.info('MongoDB event: connected');
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB event: error', { error: err.message });
});

mongoose.connection.on('disconnected', () => {
  logger.warning('MongoDB event: disconnected');
});

mongoose.connection.on('reconnectFailed', () => {
  logger.error('MongoDB event: reconnectFailed');
});

// Cerrar conexión ordenadamente al terminar proceso
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    logger.error('Error closing MongoDB connection', { error: err.message });
    process.exit(1);
  }
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
// Documentación API (Swagger)
app.use('/api/docs', swaggerRouter);

// Middleware para rutas no encontradas (debe ir después de todas las rutas)
app.all('*', notFoundHandler);

// Middleware global de manejo de errores (debe ir al final)
app.use(globalErrorHandler);

app.listen(PORT, () => {
  // Mensaje por consola para garantizar visibilidad incluso si el logger falla
  console.log(`[app] Servidor escuchando en puerto ${PORT}`);
  logger.info(`🚀 Servidor ejecutándose en puerto ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});
