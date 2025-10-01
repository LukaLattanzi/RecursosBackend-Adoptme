import logger from './src/utils/logger.js';

/**
 * Prueba específica para errores y fatales
 */

console.log('🧪 Prueba específica: Solo errores y fatales\n');

const environment = process.env.NODE_ENV || 'development';
console.log(`Entorno: ${environment}`);
console.log('='.repeat(50));

// Solo probar errores y fatales
logger.error('❌ ERROR: Esto es un error de prueba', {
    errorCode: 'ERR_001',
    module: 'test',
    details: 'Error de prueba para validar logging'
});

logger.fatal('💀 FATAL: Error crítico del sistema', {
    fatalCode: 'FATAL_001',
    system: 'Core',
    severity: 'CRITICAL'
});

console.log('\n✅ Errores enviados - revisa el archivo errors.log');