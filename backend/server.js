const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

// Connect to MongoDB
connectDB()

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  optionsSuccessStatus: 200
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.use('/api/tasks', require('./routes/tasks'))

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Task Management API is running!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  })
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`CORS Origin: ${process.env.CORS_ORIGIN || '*'}`)
})
