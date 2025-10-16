#!/usr/bin/env node

// Simple start script to handle PORT environment variable properly
const { spawn } = require('child_process');
const port = process.env.PORT || 10000;

console.log(`Starting server on port ${port}...`);

const serve = spawn('npx', ['serve', '-s', 'dist', '-p', port.toString()], {
  stdio: 'inherit',
  shell: true
});

serve.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

serve.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});