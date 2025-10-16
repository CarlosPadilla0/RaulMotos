# Coppel Motorcycle Checkout

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

Una aplicación moderna de checkout para motocicletas, construida con React, TypeScript, Vite y Tailwind CSS.

## 🚀 Deployment en Vercel

Este proyecto está optimizado para deployment en Vercel. Puedes deployarlo fácilmente siguiendo estos pasos:

### Opción 1: Deploy directo desde GitHub

1. Sube tu código a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) e inicia sesión
3. Haz click en "New Project"
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente que es un proyecto Vite
6. Configura las variables de entorno (ver sección de Variables de Entorno)
7. Haz click en "Deploy"

### Opción 2: Deploy usando Vercel CLI

```bash
# Instala Vercel CLI globalmente
npm i -g vercel

# Desde el directorio del proyecto
vercel

# Sigue las instrucciones del CLI
```

## 📋 Prerequisites

- Node.js (versión 16 o superior)
- npm o yarn

## 🛠️ Instalación y Desarrollo Local

1. **Clona el repositorio:**
   ```bash
   git clone <tu-repositorio>
   cd coppel-motorcycle-checkout
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   ```bash
   cp .env.example .env
   # Edita .env con tus valores
   ```

4. **Ejecuta la aplicación en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador en:** `http://localhost:3000`

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run start` - Alias para preview (usado por Vercel)
- `npm run type-check` - Verifica tipos de TypeScript

## 🌍 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# API Key de Gemini para funcionalidades de IA
GEMINI_API_KEY=tu_api_key_aqui

# Opcional: URL base de la API
VITE_API_URL=https://tu-api-url.com

# Opcional: Environment
NODE_ENV=production
```

### Configuración en Vercel

En tu dashboard de Vercel, ve a:
1. Settings → Environment Variables
2. Agrega cada variable con su valor correspondiente
3. Asegúrate de marcar en qué environments quieres que esté disponible (Production, Preview, Development)

## 🏗️ Estructura del Proyecto

```
coppel-motorcycle-checkout/
├── components/           # Componentes React reutilizables
├── public/              # Archivos estáticos
├── src/                 # Código fuente principal
├── .env.example         # Plantilla de variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── index.html          # Plantilla HTML principal
├── package.json        # Dependencias y scripts
├── tailwind.config.js  # Configuración de Tailwind CSS
├── tsconfig.json       # Configuración de TypeScript
├── vercel.json         # Configuración de Vercel
└── vite.config.ts      # Configuración de Vite
```

## 🎨 Tecnologías Utilizadas

- **React 19** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **Vercel** - Platform de deployment

## 📦 Features

- ✅ Optimizado para producción
- ✅ Configuración de TypeScript
- ✅ Tailwind CSS integrado
- ✅ Deploy automático en Vercel
- ✅ Variables de entorno configuradas
- ✅ Hot reload en desarrollo

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado y pertenece a Coppel.
