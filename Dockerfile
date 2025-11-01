# =========================================
# STAGE 1: Builder - Instalar dependencias
# =========================================
FROM node:20-alpine AS builder

# Metadata
LABEL maintainer="Luka Lattanzi"
LABEL description="AdoptMe Backend API - Sistema de gestión de adopciones de mascotas"
LABEL version="1.0.0"

# Establecer directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev && \
    npm cache clean --force

# =========================================
# STAGE 2: Runtime - Imagen final
# =========================================
FROM node:20-alpine

# Instalar dumb-init para mejor manejo de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Establecer directorio de trabajo
WORKDIR /usr/src/app

# Copiar dependencias del stage anterior
COPY --from=builder --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules

# Copiar el código de la aplicación
COPY --chown=nodejs:nodejs . .

# Crear directorios necesarios para uploads con permisos correctos
RUN mkdir -p public/img public/documents logs && \
    chown -R nodejs:nodejs public logs

# Cambiar al usuario no-root
USER nodejs

# Variables de entorno
ENV NODE_ENV=production \
    PORT=8080

# Exponer puerto
EXPOSE 8080

# Healthcheck para monitoreo
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/api/sessions/current', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Comando con dumb-init para mejor manejo de señales
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/server.js"]

