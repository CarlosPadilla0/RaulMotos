import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/',
      server: {
        port: parseInt(process.env.PORT || '3000'),
        host: '0.0.0.0',
      },
      preview: {
        port: parseInt(process.env.PORT || '4173'),
        host: '0.0.0.0',
      },
      build: {
        outDir: 'build',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        cssCodeSplit: false,
        rollupOptions: {
          output: {
            manualChunks: undefined,
            assetFileNames: (assetInfo) => {
              // Mantener nombres específicos para CSS
              if (assetInfo.name === 'index.css') {
                return 'assets/index.css';
              }
              const info = assetInfo.name?.split('.') || [];
              const ext = info[info.length - 1];
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                return `assets/images/[name]-[hash][extname]`;
              }
              if (/css/i.test(ext)) {
                return `assets/css/[name]-[hash][extname]`;
              }
              return `assets/[name]-[hash][extname]`;
            },
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js',
          },
        },
      },
      css: {
        postcss: './postcss.config.js',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
