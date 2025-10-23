# Coppel Motorcycle Checkout - Aplicación de Checkout de Motocicletas

Una aplicación React/TypeScript para la compra y checkout de motocicletas construida con Vite.

## 🚀 Despliegue en Render

Este proyecto está **optimizado para despliegue en Render** con configuración automática.

### 🎯 Despliegue Rápido

1. **Conecta tu repositorio a Render:**
   - Ve a [render.com](https://render.com)
   - Crea una cuenta gratuita
   - Conecta tu repositorio de GitHub/GitLab

2. **Configuración Automática:**
   - Render detectará el archivo `render.yaml`
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm start`
   - Node Version: 18.18.0

3. **Variables de Entorno (Opcional):**
   ```env
   GEMINI_API_KEY=tu_clave_api_aquí
   NODE_ENV=production
   ```

### 📋 Configuración Incluida

- ✅ `render.yaml` - Configuración completa de servicios
- ✅ `start-server.js` - Servidor optimizado para producción
- ✅ `.nvmrc` - Versión específica de Node.js
- ✅ Scripts de build optimizados
- ✅ Manejo automático del puerto

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Production Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions on Render.

## 📁 Project Structure

```
├── components/          # React components
├── public/             # Static assets
├── src/               # Source code
├── types.ts           # TypeScript type definitions
├── Dockerfile         # Docker configuration (optional)
├── render.yaml        # Render deployment config
└── DEPLOY.md          # Deployment guide
```

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Deployment**: Render

## 🔧 Configuration

1. Copy `.env.example` to `.env`
2. Fill in your environment variables
3. Run `npm run dev` to start development

## 📚 Documentation

- [Deployment Guide](./DEPLOY.md) - Complete guide for deploying to Render
- [Component Documentation](./components/) - Component usage and API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under UNLICENSED - see package.json for details.
