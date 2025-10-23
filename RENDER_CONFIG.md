# Configuración de Despliegue en Render

## 🚀 Coppel Motorcycle Checkout - Guía de Despliegue en Render

Esta guía te ayudará a desplegar tu aplicación de checkout de motocicletas en Render de manera rápida y eficiente.

### Prerrequisitos

- ✅ Cuenta en [Render](https://render.com) (tier gratuito disponible)
- ✅ Repositorio Git (GitHub, GitLab, o Bitbucket)
- ✅ Node.js 18+ instalado localmente

### 📋 Configuración Actual

El proyecto ya está configurado con:

- 📄 `render.yaml` - Configuración de servicios
- 📄 `start-server.js` - Script de inicio optimizado
- 📄 `.nvmrc` - Versión específica de Node.js
- 📄 `package.json` - Scripts de construcción y despliegue

### 🔧 Pasos para Desplegar

#### 1. Preparar el Repositorio

```bash
# Asegúrate de que todos los archivos estén committeados
git add .
git commit -m "Configuración lista para Render"
git push origin main
```

#### 2. Crear el Servicio en Render

1. Ve al [Dashboard de Render](https://dashboard.render.com)
2. Haz clic en "New +" → "Web Service"
3. Conecta tu repositorio Git
4. Render detectará automáticamente el archivo `render.yaml`

#### 3. Configuración Automática

Render usará la configuración del archivo `render.yaml`:

- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18.18.0
- **Health Check**: Ruta `/`

#### 4. Variables de Entorno (Opcional)

Si tu aplicación necesita variables de entorno adicionales:

1. Ve a la sección "Environment" en Render
2. Agrega las variables necesarias:
   ```
   GEMINI_API_KEY=tu_clave_api_aquí
   NODE_ENV=production
   ```

### 🎯 Opciones de Despliegue

#### Opción 1: Web Service (Recomendado)
- ✅ Adecuado para aplicaciones React con funcionalidades dinámicas
- ✅ Soporte completo para variables de entorno
- ✅ Escalabilidad automática

#### Opción 2: Static Site (Alternativa)
Si prefieres un sitio estático:

1. Cambia a "Static Site" en Render
2. Configuración:
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `build`

### 🔄 Despliegue Automático

Render desplegará automáticamente cuando:
- Hagas push a la rama principal
- Cambies la configuración en el dashboard

### 📊 Monitoreo

Después del despliegue:
- ✅ Verifica logs en el dashboard de Render
- ✅ Prueba la URL proporcionada
- ✅ Configura alertas si es necesario

### 🛠️ Comandos Útiles de Desarrollo

```bash
# Desarrollo local
npm run dev

# Construcción local
npm run build

# Vista previa de la construcción
npm run preview

# Servir la construcción localmente
npm start
```

### 🐛 Solución de Problemas

**Error de construcción:**
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de construcción en Render

**Error de inicio:**
- Asegúrate de que `npm run build` funcione localmente
- Verifica que el directorio `build` se genere correctamente

**Variables de entorno:**
- Verifica que estén configuradas en el dashboard de Render
- Usa el formato correcto en `vite.config.ts`

### 📞 Soporte

- [Documentación de Render](https://render.com/docs)
- [Foro de la Comunidad Render](https://community.render.com)

---

**¡Tu aplicación de checkout de motocicletas estará lista para servir a los clientes de Coppel! 🏍️**