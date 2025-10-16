# Coppel Motorcycle Checkout

Una aplicación moderna de checkout para motocicletas, construida con React, TypeScript, Vite y Tailwind CSS.

## 🚀 Deployment en Render

Este proyecto está optimizado para deployment en Render como Static Site.

### Configuración en Render

1. **Ve a [render.com](https://render.com) e inicia sesión**

2. **Crea un nuevo Static Site:**
   - Haz click en "New +" → "Static Site"
   - Conecta tu repositorio de GitHub

3. **Configura los siguientes settings:**
   - **Name**: `coppel-motorcycle-checkout`
   - **Root Directory**: `.` (dejar vacío)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
   - **Auto Deploy**: `Yes`

4. **Configura las variables de entorno:**
   - Ve a "Environment" tab
   - Agrega: `GEMINI_API_KEY` con tu API key

5. **Haz click en "Create Static Site"**

### ⚠️ Nota Importante
- NO uses `render.yaml` para Static Sites
- La configuración se hace directamente en la interfaz web de Render
- El directorio de build debe ser exactamente `build`

## 📋 Prerequisites

- Node.js (versión 18 o superior)
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
- `npm run build` - Construye la aplicación para producción (genera en `build/`)
- `npm run preview` - Previsualiza la build de producción
- `npm run serve` - Sirve la aplicación desde `build/`
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

## 🏗️ Estructura del Proyecto

```
coppel-motorcycle-checkout/
├── components/           # Componentes React reutilizables
├── public/              # Archivos estáticos
├── build/              # Build output (generado)
├── .env.example        # Plantilla de variables de entorno
├── .gitignore         # Archivos ignorados por Git
├── .nvmrc             # Versión de Node.js
├── package.json       # Dependencias y scripts
├── RENDER_CONFIG.md   # Instrucciones detalladas para Render
├── tailwind.config.js # Configuración de Tailwind CSS
├── tsconfig.json      # Configuración de TypeScript
└── vite.config.ts     # Configuración de Vite
```

## 🎨 Tecnologías Utilizadas

- **React 19** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **Render** - Platform de deployment

## 📦 Features

- ✅ Optimizado para producción
- ✅ Configuración de TypeScript
- ✅ Tailwind CSS integrado
- ✅ Deploy automático en Render
- ✅ Variables de entorno configuradas
- ✅ Hot reload en desarrollo

## 🚀 Deploy Rápido

1. Sube tu código a GitHub
2. Ve a Render.com → New Static Site
3. Conecta tu repo
4. Configura: Build Command: `npm run build`, Publish Directory: `build`
5. Agrega variable: `GEMINI_API_KEY`
6. Deploy automático

¡Tu aplicación estará disponible en tu URL de Render en pocos minutos!

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado y pertenece a Coppel.
