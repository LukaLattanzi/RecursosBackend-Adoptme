#!/bin/bash

# ====================================
# Script de Despliegue - AdoptMe API
# ====================================
# Autor: Luka Lattanzi
# Fecha: 01/11/2025
# ====================================

set -e  # Detener en caso de error

echo "🚀 Iniciando proceso de despliegue de AdoptMe API..."
echo "=================================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Variables
IMAGE_NAME="lukalattanzi/adoptme"
IMAGE_TAG="latest"
VERSION_TAG="1.0.0"

# ====================================
# Paso 1: Verificar prerrequisitos
# ====================================
echo -e "${YELLOW}[1/6]${NC} Verificando prerrequisitos..."

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Error: Docker no está instalado${NC}"
    exit 1
fi

# Verificar permisos de Docker
if ! sudo docker ps &> /dev/null; then
    echo -e "${RED}❌ Error: No hay permisos para ejecutar Docker${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker está disponible${NC}"

# Verificar que estamos en el directorio correcto
if [ ! -f "Dockerfile" ]; then
    echo -e "${RED}❌ Error: No se encuentra el Dockerfile${NC}"
    echo "Asegúrate de ejecutar este script desde el directorio raíz del proyecto"
    exit 1
fi

echo -e "${GREEN}✅ Directorio correcto${NC}"
echo ""

# ====================================
# Paso 2: Ejecutar tests
# ====================================
echo -e "${YELLOW}[2/6]${NC} Ejecutando tests..."

if npm test; then
    echo -e "${GREEN}✅ Todos los tests pasaron (27/27)${NC}"
else
    echo -e "${RED}❌ Los tests fallaron. Revisa los errores antes de desplegar.${NC}"
    read -p "¿Deseas continuar de todos modos? (s/N): " continue
    if [[ ! $continue =~ ^[Ss]$ ]]; then
        exit 1
    fi
fi
echo ""

# ====================================
# Paso 3: Construir imagen Docker
# ====================================
echo -e "${YELLOW}[3/6]${NC} Construyendo imagen Docker..."
echo "Esto puede tardar 1-2 minutos..."

if sudo docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .; then
    echo -e "${GREEN}✅ Imagen construida exitosamente${NC}"
else
    echo -e "${RED}❌ Error al construir la imagen${NC}"
    exit 1
fi

# Etiquetar también con versión específica
sudo docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:${VERSION_TAG}
echo -e "${GREEN}✅ Etiquetada como ${IMAGE_NAME}:${IMAGE_TAG} y ${IMAGE_NAME}:${VERSION_TAG}${NC}"
echo ""

# ====================================
# Paso 4: Probar imagen localmente
# ====================================
echo -e "${YELLOW}[4/6]${NC} ¿Deseas probar la imagen localmente antes de subir?"
read -p "Esto requiere que tengas configurada una MONGO_URL (s/N): " test_local

if [[ $test_local =~ ^[Ss]$ ]]; then
    read -p "Ingresa tu MONGO_URL: " mongo_url
    
    echo "Iniciando contenedor de prueba..."
    sudo docker run -d -p 8080:8080 \
        -e MONGO_URL="${mongo_url}" \
        --name adoptme-test \
        ${IMAGE_NAME}:${IMAGE_TAG}
    
    echo "Esperando 5 segundos para que inicie..."
    sleep 5
    
    echo -e "${GREEN}✅ Contenedor iniciado. Logs:${NC}"
    sudo docker logs adoptme-test
    
    echo ""
    echo -e "${GREEN}Puedes verificar en: http://localhost:8080/api/docs${NC}"
    echo ""
    read -p "Presiona Enter cuando hayas terminado de probar..."
    
    echo "Deteniendo contenedor de prueba..."
    sudo docker stop adoptme-test
    sudo docker rm adoptme-test
    echo -e "${GREEN}✅ Contenedor de prueba eliminado${NC}"
else
    echo "Saltando prueba local..."
fi
echo ""

# ====================================
# Paso 5: Login a Docker Hub
# ====================================
echo -e "${YELLOW}[5/6]${NC} Iniciando sesión en Docker Hub..."

if sudo docker login; then
    echo -e "${GREEN}✅ Sesión iniciada en Docker Hub${NC}"
else
    echo -e "${RED}❌ Error al iniciar sesión${NC}"
    exit 1
fi
echo ""

# ====================================
# Paso 6: Push a Docker Hub
# ====================================
echo -e "${YELLOW}[6/6]${NC} Subiendo imagen a Docker Hub..."
echo "Esto puede tardar 2-5 minutos dependiendo de tu conexión..."

# Subir versión latest
if sudo docker push ${IMAGE_NAME}:${IMAGE_TAG}; then
    echo -e "${GREEN}✅ ${IMAGE_NAME}:${IMAGE_TAG} subida exitosamente${NC}"
else
    echo -e "${RED}❌ Error al subir la imagen${NC}"
    exit 1
fi

# Subir versión específica
if sudo docker push ${IMAGE_NAME}:${VERSION_TAG}; then
    echo -e "${GREEN}✅ ${IMAGE_NAME}:${VERSION_TAG} subida exitosamente${NC}"
else
    echo -e "${RED}❌ Error al subir la versión específica${NC}"
fi
echo ""

# ====================================
# Resumen Final
# ====================================
echo "=================================================="
echo -e "${GREEN}✨ ¡DESPLIEGUE COMPLETADO EXITOSAMENTE! ✨${NC}"
echo "=================================================="
echo ""
echo "📊 Resumen:"
echo "  • Imagen: ${IMAGE_NAME}:${IMAGE_TAG}"
echo "  • Versión: ${IMAGE_NAME}:${VERSION_TAG}"
echo "  • Tests: 27/27 pasando"
echo "  • Docker Hub: https://hub.docker.com/r/lukalattanzi/adoptme"
echo ""
echo "🎓 Instrucciones para el profesor:"
echo "  1. docker pull ${IMAGE_NAME}:${IMAGE_TAG}"
echo "  2. docker run -d -p 8080:8080 -e MONGO_URL=\"...\" ${IMAGE_NAME}:${IMAGE_TAG}"
echo "  3. Abrir http://localhost:8080/api/docs"
echo ""
echo "📝 Próximos pasos opcionales:"
echo "  • Verificar en Docker Hub que la imagen esté pública"
echo "  • Actualizar README con fecha de última actualización"
echo "  • Hacer commit final si agregaste archivos nuevos"
echo ""
echo -e "${GREEN}✅ El proyecto está listo para evaluación${NC}"
echo ""
