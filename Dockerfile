# Dockerfile opcional para Render (no es necesario para Static Sites)
# Render puede usar este Dockerfile si cambias a Web Service

FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Build la aplicación
RUN npm run build

# Instalar serve globalmente
RUN npm install -g serve

# Exponer puerto
EXPOSE $PORT

# Comando por defecto
CMD ["serve", "-s", "build", "-l", "$PORT"]
