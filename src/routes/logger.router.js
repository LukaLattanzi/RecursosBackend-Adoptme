import { Router } from 'express';
import logger from '../utils/logger.js';
import { catchAsync } from '../utils/errorHandler.js';

const router = Router();

/**
 * GET /api/loggerTest
 * Endpoint para probar todos los niveles de logging
 */
router.get('/loggerTest', catchAsync(async (req, res) => {
    logger.debug('Este es un mensaje de DEBUG - Solo visible en desarrollo');

    logger.http('Este es un mensaje HTTP - Para requests y responses');

    logger.info('Este es un mensaje INFO - Información general importante');

    logger.warning('Este es un mensaje WARNING - Advertencia sobre algo que podría ser problemático');

    logger.error('Este es un mensaje ERROR - Error controlado para testing', {
        errorType: 'TestError',
        endpoint: '/api/loggerTest',
        timestamp: new Date().toISOString()
    });

    logger.fatal('Este es un mensaje FATAL - Error crítico del sistema', {
        fatalType: 'TestFatal',
        system: 'Logger Testing',
        severity: 'CRITICAL'
    });

    res.status(200).json({
        status: 'success',
        message: 'Prueba de logger completada',
        description: 'Se han ejecutado logs en todos los niveles: debug, http, info, warning, error, fatal',
        environment: process.env.NODE_ENV || 'development',
        logLevels: {
            debug: 'Solo en desarrollo - consola',
            http: 'Requests HTTP',
            info: 'Información general - consola y archivo en producción',
            warning: 'Advertencias - consola y archivo en producción',
            error: 'Errores - consola y archivo errors.log',
            fatal: 'Errores críticos - consola y archivo errors.log'
        }
    });
}));

export default router;