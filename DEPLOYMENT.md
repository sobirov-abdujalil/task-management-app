# Deployment Guide

This guide covers deploying the Task Management App to various platforms.

## Project Structure

```
task-management-app/
├── frontend/          # React + Vite frontend
├── backend/           # Express + MongoDB backend
├── package.json       # Root package.json with build scripts
├── vercel.json        # Vercel configuration
├── netlify.toml       # Netlify configuration
├── Procfile           # Heroku/Railway configuration
└── .env               # Environment variables
```

## Frontend Deployment

### Vercel Deployment

1. **Connect to Vercel:**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect the configuration

2. **Environment Variables:**
   - Set `VITE_API_URL` to your backend URL
   - Example: `https://your-backend.onrender.com`

3. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm run install:all`

### Netlify Deployment

1. **Connect to Netlify:**
   - Push your code to GitHub
   - Connect your repository to Netlify
   - Netlify will use the `netlify.toml` configuration

2. **Environment Variables:**
   - Set `VITE_API_URL` to your backend URL
   - Example: `https://your-backend.onrender.com`

3. **Build Settings:**
   - Build Command: `npm run build`
   - Publish Directory: `frontend/dist`

## Backend Deployment

### Render Deployment

1. **Create a new Web Service:**
   - Connect your GitHub repository
   - Set the following:
     - **Build Command:** `cd backend && npm install`
     - **Start Command:** `cd backend && npm start`
     - **Root Directory:** Leave empty (uses root)

2. **Environment Variables:**
   ```
   PORT=10000
   MONGO_URI=your_mongodb_connection_string
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   NODE_ENV=production
   ```

3. **MongoDB Setup:**
   - Use MongoDB Atlas for production
   - Create a cluster and get your connection string
   - Add it to the `MONGO_URI` environment variable

### Railway Deployment

1. **Create a new project:**
   - Connect your GitHub repository
   - Railway will auto-detect the Node.js app

2. **Environment Variables:**
   ```
   PORT=10000
   MONGO_URI=your_mongodb_connection_string
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   NODE_ENV=production
   ```

3. **Deploy Settings:**
   - Railway will automatically install dependencies
   - Use `npm start` as the start command

### Heroku Deployment

1. **Create a new app:**
   - Connect your GitHub repository
   - Heroku will use the `Procfile` for configuration

2. **Environment Variables:**
   ```
   PORT=10000
   MONGO_URI=your_mongodb_connection_string
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   NODE_ENV=production
   ```

3. **Add MongoDB:**
   - Install MongoDB Atlas addon or use external MongoDB
   - Set the connection string in environment variables

## Environment Variables

### Frontend (.env)
```env
# API URL for backend (required for production)
VITE_API_URL=https://your-backend-domain.com
```

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
CORS_ORIGIN=*
NODE_ENV=development
```

## Build Commands

### Local Development
```bash
# Install all dependencies
npm run install:all

# Start frontend development server
npm run dev

# Start backend development server
npm run server

# Build frontend for production
npm run build
```

### Production Deployment
```bash
# Build frontend
npm run build

# Start backend
npm start
```

## Troubleshooting

### Common Issues

1. **Build Fails on Vercel:**
   - Ensure `npm run install:all` runs successfully
   - Check that all dependencies are in the correct package.json files
   - Verify the build command points to the correct directory

2. **CORS Errors:**
   - Set `CORS_ORIGIN` to your exact frontend domain
   - Include protocol (https://)
   - Don't include trailing slashes

3. **MongoDB Connection Issues:**
   - Verify your MongoDB connection string
   - Ensure your MongoDB cluster allows connections from your deployment platform
   - Check that your IP is whitelisted (if using MongoDB Atlas)

4. **API Calls Failing:**
   - Verify `VITE_API_URL` is set correctly
   - Ensure the backend is running and accessible
   - Check that the API endpoints are working

### Health Checks

- **Frontend:** Should load without console errors
- **Backend:** Visit `/health` endpoint for status
- **API:** Test `/api/tasks` endpoint for functionality

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files to version control
   - Use platform-specific environment variable settings
   - Rotate sensitive credentials regularly

2. **CORS Configuration:**
   - Set specific origins in production
   - Avoid using `*` for CORS_ORIGIN in production

3. **MongoDB Security:**
   - Use strong passwords
   - Enable network access controls
   - Use connection string with authentication

## Performance Optimization

1. **Frontend:**
   - Build is optimized with code splitting
   - CSS is minified and compressed
   - JavaScript is tree-shaken and minified

2. **Backend:**
   - Uses connection pooling for MongoDB
   - Implements proper error handling
   - Includes health check endpoints

## Monitoring

1. **Frontend:**
   - Monitor build times and bundle sizes
   - Check for console errors in production

2. **Backend:**
   - Monitor API response times
   - Check MongoDB connection status
   - Monitor error rates

## Support

For deployment issues:
1. Check the platform-specific logs
2. Verify environment variables are set correctly
3. Test locally with production-like settings
4. Check the troubleshooting section above
