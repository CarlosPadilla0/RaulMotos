#!/usr/bin/env node

// Simple start script to handle PORT environment variable properly
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

const serve = spawn('npx', ['serve', '-s', 'build', '-p', port.toString()], {
  stdio: 'inherit',
  shell: true
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