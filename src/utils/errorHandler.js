import logger from './logger.js';

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Datos inválidos: ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Campo duplicado: ${value}. Por favor usa otro valor.`;
    return new AppError(message, 400);
};

const handleCastErrorDB = (err) => {
    const message = `ID inválido: ${err.value}`;
    return new AppError(message, 400);
};

const handleJWTError = () =>
    new AppError('Token inválido. Por favor inicia sesión nuevamente.', 401);

const handleJWTExpiredError = () =>
    new AppError('Tu token ha expirado. Por favor inicia sesión nuevamente.', 401);

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

const sendErrorProd = (err, res) => {

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

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    const nodeEnv = process.env.NODE_ENV || 'development';

    if (nodeEnv === 'development') {
        sendErrorDev(err, res);
    } else {
        let error = { ...err };
        error.message = err.message;

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProd(error, res);
    }
};

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

export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};