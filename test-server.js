import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

import loggerRouter from './src/routes/logger.router.js';
import { globalErrorHandler, notFoundHandler } from './src/utils/errorHandler.js';
import logger from './src/utils/logger.js';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cookieParser());

// Middleware de logging HTTP
app.use(logger.httpLog);

// Rutas de prueba
app.use('/api', loggerRouter);

// Endpoint adicional de salud
app.get('/health', (req, res) => {
    logger.info('Health check solicitado');
    res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// Middleware para rutas no encontradas
app.all('*', notFoundHandler);

// Middleware global de manejo de errores
app.use(globalErrorHandler);

app.listen(PORT, () => {
  logger.info(`🚀 Servidor de prueba ejecutándose en puerto ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});