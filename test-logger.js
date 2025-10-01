import logger from './src/utils/logger.js';

/**
 * Archivo de pruebas para validar el sistema de logging
 */

console.log('🧪 Pruebas del Sistema de Logger\n');

// Información del entorno
const environment = process.env.NODE_ENV || 'development';
console.log(`Entorno actual: ${environment}`);
console.log('='.repeat(60));

// Prueba de todos los niveles de logging
console.log('\n📝 Probando todos los niveles de logging:');
console.log('-'.repeat(40));

logger.debug('🔍 Mensaje de DEBUG - Solo visible en desarrollo');
logger.http('🌐 Mensaje de HTTP - Para requests y responses');
logger.info('ℹ️ Mensaje de INFO - Información general importante');
logger.warning('⚠️ Mensaje de WARNING - Advertencia sobre algo problemático');
logger.error('❌ Mensaje de ERROR - Error controlado', {
    errorCode: 'TEST_ERROR',
    details: 'Este es un error de prueba'
});
logger.fatal('💀 Mensaje de FATAL - Error crítico del sistema', {
    fatalCode: 'TEST_FATAL',
    system: 'Logger Testing',
    severity: 'CRITICAL'
});

console.log('\n✅ Pruebas del logger completadas!');
console.log(`\n📁 Los logs de error se guardan en: ./logs/errors.log`);
console.log(`🎯 Configuración actual:`);
console.log(`   - Entorno: ${environment}`);
console.log(`   - Nivel mínimo: ${environment === 'production' ? 'info' : 'debug'}`);
console.log(`   - Archivo de errores: ${environment === 'production' ? 'Habilitado' : 'Deshabilitado'}`);