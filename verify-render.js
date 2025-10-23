#!/usr/bin/env node

/**
 * Script de verificación para despliegue en Render
 * Verifica que todos los archivos necesarios estén presentes y configurados correctamente
 */

import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Verificando configuración para Render...\n');

const checks = [
    {
        name: 'render.yaml',
        check: () => existsSync(join(__dirname, 'render.yaml')),
        description: 'Archivo de configuración de Render'
    },
    {
        name: 'package.json',
        check: () => {
            const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'));
            return pkg.scripts && pkg.scripts.start && pkg.scripts.build;
        },
        description: 'Scripts de start y build en package.json'
    },
    {
        name: 'start-server.js',
        check: () => existsSync(join(__dirname, 'start-server.js')),
        description: 'Script de inicio del servidor'
    },
    {
        name: '.nvmrc',
        check: () => existsSync(join(__dirname, '.nvmrc')),
        description: 'Especificación de versión de Node.js'
    },
    {
        name: 'vite.config.ts',
        check: () => existsSync(join(__dirname, 'vite.config.ts')),
        description: 'Configuración de Vite'
    },
    {
        name: '.env.example',
        check: () => existsSync(join(__dirname, '.env.example')),
        description: 'Archivo de ejemplo de variables de entorno'
    }
];

let allPassed = true;

checks.forEach(({ name, check, description }) => {
    const passed = check();
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${name} - ${description}`);
    if (!passed) allPassed = false;
});

console.log('\n📋 Resumen:');
if (allPassed) {
    console.log('✅ ¡Todos los archivos están configurados correctamente!');
    console.log('🚀 Tu proyecto está listo para desplegar en Render.');
    console.log('\n📖 Próximos pasos:');
    console.log('1. Haz commit y push de todos los cambios');
    console.log('2. Conecta tu repositorio en render.com');
    console.log('3. ¡Render desplegará automáticamente tu aplicación!');
} else {
    console.log('❌ Algunos archivos faltan o no están configurados correctamente.');
    console.log('📖 Revisa la configuración y vuelve a ejecutar este script.');
    process.exit(1);
}

console.log('\n🏍️ ¡Buena suerte con el despliegue de Coppel Motorcycle Checkout!');
