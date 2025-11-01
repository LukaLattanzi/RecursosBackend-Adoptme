#!/bin/bash

# Script para construir y publicar la imagen Docker de AdoptMe
# Autor: Luka Lattanzi

set -e  # Salir si hay algún error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuración
DOCKER_USERNAME="lukalattanzi"
IMAGE_NAME="adoptme"
VERSION="1.0.0"

echo -e "${GREEN}🐳 Script de construcción y publicación de Docker${NC}"
echo "================================================"
echo ""

# Función para mostrar el menú
show_menu() {
    echo "Selecciona una opción:"
    echo "  1) Construir imagen Docker"
    echo "  2) Probar imagen localmente"
    echo "  3) Publicar en Docker Hub"
    echo "  4) Construir y publicar (todo)"
    echo "  5) Salir"
    echo ""
}

# Función para construir la imagen
build_image() {
    echo -e "${YELLOW}📦 Construyendo imagen Docker...${NC}"
    
    docker build -t ${DOCKER_USERNAME}/${IMAGE_NAME}:latest .
    docker tag ${DOCKER_USERNAME}/${IMAGE_NAME}:latest ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}
    
    echo -e "${GREEN}✅ Imagen construida exitosamente${NC}"
    echo "   - ${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
    echo "   - ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}"
    echo ""
}

# Función para probar la imagen localmente
test_image() {
    echo -e "${YELLOW}🧪 Probando imagen localmente...${NC}"
    
    # Verificar si existe archivo .env
    if [ ! -f .env ]; then
        echo -e "${RED}❌ Error: No se encontró archivo .env${NC}"
        echo "   Crea un archivo .env con MONGO_URL configurado"
        return 1
    fi
    
    # Leer MONGO_URL del archivo .env
    source .env
    
    if [ -z "$MONGO_URL" ]; then
        echo -e "${RED}❌ Error: MONGO_URL no está configurada en .env${NC}"
        return 1
    fi
    
    echo "Ejecutando contenedor en puerto 8080..."
    docker run --rm -d \
        -p 8080:8080 \
        -e MONGO_URL="$MONGO_URL" \
        --name adoptme-test \
        ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
    
    echo -e "${GREEN}✅ Contenedor iniciado${NC}"
    echo ""
    echo "Esperando 5 segundos para que inicie el servidor..."
    sleep 5
    
    echo "Probando endpoint de salud..."
    if curl -s http://localhost:8080/api/sessions/current > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Servidor respondiendo correctamente${NC}"
    else
        echo -e "${YELLOW}⚠️  El servidor no responde aún (puede necesitar más tiempo)${NC}"
    fi
    
    echo ""
    echo "Ver logs con: docker logs -f adoptme-test"
    echo "Detener con: docker stop adoptme-test"
    echo ""
}

# Función para publicar en Docker Hub
publish_image() {
    echo -e "${YELLOW}📤 Publicando en Docker Hub...${NC}"
    
    # Verificar login
    if ! docker info | grep -q "Username"; then
        echo "Necesitas iniciar sesión en Docker Hub:"
        docker login
    fi
    
    echo "Publicando imagen..."
    docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
    docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}
    
    echo -e "${GREEN}✅ Imagen publicada exitosamente${NC}"
    echo ""
    echo "🔗 https://hub.docker.com/r/${DOCKER_USERNAME}/${IMAGE_NAME}"
    echo ""
}

# Función principal
main() {
    while true; do
        show_menu
        read -p "Opción: " choice
        echo ""
        
        case $choice in
            1)
                build_image
                ;;
            2)
                test_image
                ;;
            3)
                publish_image
                ;;
            4)
                build_image
                test_image
                read -p "¿Publicar en Docker Hub? (s/n): " confirm
                if [ "$confirm" = "s" ] || [ "$confirm" = "S" ]; then
                    publish_image
                fi
                ;;
            5)
                echo "Saliendo..."
                exit 0
                ;;
            *)
                echo -e "${RED}Opción inválida${NC}"
                echo ""
                ;;
        esac
    done
}

# Ejecutar script
main
