const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/tasks', require('./routes/tasks'))

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Task Management API is running!' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
