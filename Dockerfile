### Dockerfile para AdoptMe
FROM node:20-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar package.json y package-lock si existe para aprovechar cache
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

# Crear directorios necesarios para uploads
RUN mkdir -p public/img public/documents

ENV PORT=8080

EXPOSE 8080

# Comando por defecto
CMD ["node", "src/server.js"]
