/**
 * Middleware de manejo de errores centralizado
 */

import logger from './logger.js';

/**
 * Clase personalizada para errores de la aplicación
 */
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Manejo de errores de validación de MongoDB
 */
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Datos inválidos: ${errors.join('. ')}`;
    return new AppError(message, 400);
};

/**
 * Manejo de errores de duplicación de MongoDB
 */
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Campo duplicado: ${value}. Por favor usa otro valor.`;
    return new AppError(message, 400);
};

/**
 * Manejo de errores de CastError de MongoDB
 */
const handleCastErrorDB = (err) => {
    const message = `ID inválido: ${err.value}`;
    return new AppError(message, 400);
};

/**
 * Manejo de errores de JWT
 */
const handleJWTError = () =>
    new AppError('Token inválido. Por favor inicia sesión nuevamente.', 401);

const handleJWTExpiredError = () =>
    new AppError('Tu token ha expirado. Por favor inicia sesión nuevamente.', 401);

/**
 * Envío de errores en desarrollo
 */
const sendErrorDev = (err, res) => {
    logger.error('Error en desarrollo', {
        status: err.status,
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode
    });

    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

/**
 * Envío de errores en producción
 */
const sendErrorProd = (err, res) => {
    // Error operacional, mensaje confiable para enviar al cliente
    if (err.isOperational) {
        logger.error('Error operacional', {
            status: err.status,
            message: err.message,
            statusCode: err.statusCode
        });

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    // Error de programación u otros errores desconocidos: no filtrar detalles
    else {
        logger.fatal('Error de programación no controlado', {
            error: err.message,
            stack: err.stack
        });

        res.status(500).json({
            status: 'error',
            message: 'Algo salió mal!'
        });
    }
};

/**
 * Middleware principal de manejo de errores
 */
export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    const nodeEnv = process.env.NODE_ENV || 'development';

    if (nodeEnv === 'development') {
        sendErrorDev(err, res);
    } else {
        let error = { ...err };
        error.message = err.message;

        // Manejo de diferentes tipos de errores de MongoDB
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProd(error, res);
    }
};

/**
 * Middleware para manejar rutas no encontradas
 */
export const notFoundHandler = (req, res, next) => {
    logger.warning(`Ruta no encontrada: ${req.originalUrl}`, {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });

    const err = new AppError(`No se puede encontrar ${req.originalUrl} en este servidor!`, 404);
    next(err);
};

/**
 * Wrapper para funciones async para capturar errores
 */
export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};