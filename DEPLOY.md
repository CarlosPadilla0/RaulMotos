# RaulMotos - Render Deployment Guide

This guide will help you deploy your React/TypeScript motorcycle checkout application to Render.

## Prerequisites

- [Render account](https://render.com) (free tier available)
- Git repository with your code (GitHub, GitLab, or Bitbucket)
- Node.js 18+ for local development

## Deployment Options

### Option 1: Static Site (Recommended for React Apps)

Static sites are faster, cheaper, and simpler for frontend applications.

#### Steps:

1. **Push your code to Git repository**
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

2. **Create a new Static Site on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Static Site"
   - Connect your Git repository

3. **Configure the Static Site**
   - **Name**: `raul-motos` (or your preferred name)
   - **Branch**: `main` (or your main branch)
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`

4. **Set Environment Variables** (if needed)
   - Go to Environment tab
   - Add: `NODE_VERSION` = `18`
   - Add: `GEMINI_API_KEY` = `your_actual_api_key`

5. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your app

### Option 2: Web Service (Alternative)

Use this if you need more control or server-side features.

#### Steps:

1. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your Git repository

2. **Configure the Web Service**
   - **Name**: `raul-motos`
   - **Environment**: `Node`
   - **Branch**: `main`
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm start`

3. **Set Environment Variables**
   - `NODE_VERSION`: `18`
   - `GEMINI_API_KEY`: `your_actual_api_key`
   - `NODE_ENV`: `production`

## Configuration Files Explanation

### `render.yaml`
Contains service configuration for Infrastructure as Code deployment. This is optional but useful for complex setups.

### `package.json`
- **Build script**: Compiles TypeScript and builds the Vite app
- **Start script**: Serves the built files using the `serve` package

### `Dockerfile` (Optional)
Multi-stage Docker build for optimized production deployment. Render can use this instead of the build command.

### `.env.example`
Template for environment variables. Copy to `.env` for local development.

## Environment Variables Setup

### Required Variables:
- `GEMINI_API_KEY`: Your Google Gemini API key for AI features

### Optional Variables:
- `NODE_ENV`: Set to `production` for production builds
- `VITE_API_URL`: Base URL for your API (if you have a backend)
- `VITE_APP_TITLE`: Custom app title
- `NODE_VERSION`: Node.js version (should be 18+)

## Local Testing Before Deploy

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Test the build process:**
   ```bash
   npm run build
   ```

3. **Test the production server:**
   ```bash
   npm start
   ```

4. **Verify the app works at** `http://localhost:10000`

## Troubleshooting

### Common Issues:

1. **Build fails on Render**
   - Check your Node.js version matches `engines.node` in `package.json`
   - Ensure all dependencies are in `dependencies`, not just `devDependencies`

2. **App doesn't load after deployment**
   - Verify the `dist` folder is being generated during build
   - Check that `serve` package is installed as a dependency

3. **Environment variables not working**
   - For Vite, prefix client-side variables with `VITE_`
   - Server-side variables (like `GEMINI_API_KEY`) don't need the prefix

4. **Port issues**
   - Render automatically sets the `PORT` environment variable
   - Your app should use `process.env.PORT` or default to a fallback

### Debugging Steps:

1. Check Render build logs for error messages
2. Verify your repository has the latest code
3. Test the build process locally first
4. Ensure all required files are committed to Git

## Custom Domain (Optional)

1. Go to your Render service dashboard
2. Click "Settings" → "Custom Domains"
3. Add your domain (e.g., `raulmotos.com`)
4. Update your domain's DNS settings as instructed

## Performance Optimization

1. **Enable compression** (automatically handled by Render)
2. **Use CDN** (Render provides this for static sites)
3. **Optimize images** in your `public` folder
4. **Enable caching** for static assets

## Security

1. **Environment Variables**: Never commit `.env` files to Git
2. **API Keys**: Store sensitive keys in Render's environment variables
3. **HTTPS**: Render provides free SSL certificates automatically

## Monitoring

- **Render Dashboard**: Monitor deployments and performance
- **Logs**: Access real-time logs in the Render dashboard
- **Uptime**: Render provides 99.9% uptime SLA

## Next Steps After Deployment

1. Test your live application thoroughly
2. Set up custom domain (if needed)
3. Configure monitoring and alerts
4. Plan for CI/CD improvements

## Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#render)

---

Your RaulMotos application should now be successfully deployed on Render! 🚀