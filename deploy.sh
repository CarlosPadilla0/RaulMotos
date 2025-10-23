#!/bin/bash

# Script de despliegue para Render
# Este script se ejecuta durante el proceso de build en Render

echo "🚀 Iniciando proceso de despliegue de Coppel Motorcycle Checkout..."

# Verificar versión de Node.js
echo "📋 Verificando versión de Node.js..."
node --version
npm --version

# Limpiar caché de npm si existe
echo "🧹 Limpiando caché..."
npm cache clean --force

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm ci

# Ejecutar verificación de tipos
echo "🔍 Verificando tipos de TypeScript..."
npm run type-check

# Construir la aplicación
echo "🏗️ Construyendo la aplicación..."
npm run build

# Verificar que la construcción fue exitosa
if [ -d "build" ]; then
    echo "✅ Construcción completada exitosamente!"
    echo "📁 Contenido del directorio build:"
    ls -la build/
else
    echo "❌ Error: El directorio build no fue creado"
    exit 1
fi

echo "🎉 ¡Despliegue preparado exitosamente!"
