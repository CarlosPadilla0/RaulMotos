#!/usr/bin/env node

// Servidor optimizado para Render con manejo correcto de tipos MIME
import { spawn } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

// Verificar que el directorio de build existe
const buildDir = path.join(process.cwd(), 'build');
if (!existsSync(buildDir)) {
  console.error('❌ Build directory not found. Run "npm run build" first.');
  process.exit(1);
}

const port = process.env.PORT || 10000;

console.log(`🚀 Starting Coppel Motorcycle Checkout server on port ${port}...`);
console.log(`📁 Serving from: ${buildDir}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

// Usar serve con configuraciones específicas para tipos MIME y SPA
const serveArgs = [
  'serve',
  'build',
  '-p', port.toString(),
  '--cors',
  '--no-port-switching',
  '--config', 'serve.json'
];

console.log(`📋 Comando: npx ${serveArgs.join(' ')}`);

const serve = spawn('npx', serveArgs, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    SERVE_STATIC_HEADERS: JSON.stringify({
      'Cache-Control': 'public, max-age=31536000, immutable'
    })
  }
});

serve.on('close', (code) => {
  console.log(`🛑 Server process exited with code ${code}`);
});

serve.on('error', (err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});

// Manejo de señales para cierre limpio
process.on('SIGTERM', () => {
  console.log('🔄 Received SIGTERM, shutting down gracefully...');
  serve.kill();
});

process.on('SIGINT', () => {
  console.log('🔄 Received SIGINT, shutting down gracefully...');
  serve.kill();
});