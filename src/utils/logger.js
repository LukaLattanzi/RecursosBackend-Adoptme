import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir niveles personalizados con prioridades
const customLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        debug: 'blue',
        http: 'green',
        info: 'cyan',
        warning: 'yellow',
        error: 'red',
        fatal: 'magenta'
    }
};

// Configurar colores
winston.addColors(customLevels.colors);

// Formato personalizado para desarrollo
const devFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
        return `[${timestamp}] ${level}: ${message} ${metaString}`;
    })
);

// Formato para producción
const prodFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

// Logger para desarrollo
const developmentLogger = winston.createLogger({
    levels: customLevels.levels,
    level: 'debug',
    format: devFormat,
    transports: [
        new winston.transports.Console()
    ]
});

// Logger para producción
const productionLogger = winston.createLogger({
    levels: customLevels.levels,
    level: 'info',
    defaultMeta: { service: 'adoptme-api' },
    transports: [
        // Logs info, warning en consola
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple()
            ),
            silent: false
        }),
        // Solo errores y fatales en archivo
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/errors.log'),
            level: 'error',
            format: prodFormat,
            silent: false
        })
    ],
    // Excluir handlers de nivel inferior
    exitOnError: false
});

// Determinar el entorno y exportar el logger apropiado
const nodeEnv = process.env.NODE_ENV || 'development';
const logger = nodeEnv === 'production' ? productionLogger : developmentLogger;

// Agregar método para logging de requests HTTP
logger.httpLog = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            userAgent: req.get('User-Agent'),
            ip: req.ip
        };

        if (res.statusCode >= 400) {
            logger.error('HTTP Request Error', logData);
        } else {
            logger.http('HTTP Request', logData);
        }
    });

    if (next) next();
};

export default logger;