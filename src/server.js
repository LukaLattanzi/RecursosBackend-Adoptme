#!/usr/bin/env node
// Bootstrap para asegurar que dotenv se cargue antes de evaluar otros módulos
import 'dotenv/config';

console.log('[bootstrap] dotenv cargado. NODE_ENV =', process.env.NODE_ENV || 'undefined');

import('./app.js')
  .then(() => {
    console.log('[bootstrap] Módulo app.js cargado correctamente');
  })
  .catch((err) => {
    console.error('[bootstrap] Error cargando app.js:', err && err.stack ? err.stack : err);
    process.exit(1);
  });
