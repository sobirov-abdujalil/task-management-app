import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import TaskList from './components/TaskList.jsx'
import TaskForm from './components/TaskForm.jsx'
import './styles/main.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  // Add new task
  const addTask = async (taskData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })
      const newTask = await response.json()
      setTasks([...tasks, newTask])
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      })
      setTasks(tasks.filter(task => task._id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // Toggle task completion
  const toggleTask = async (id) => {
    try {
      const task = tasks.find(t => t._id === id)
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !task.completed }),
      })
      const updatedTask = await response.json()
      setTasks(tasks.map(task => task._id === id ? updatedTask : task))
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-logo">Task Manager</h1>
            <div className="nav-links">
              <a href="/" className="nav-link">Home</a>
              <a href="/about" className="nav-link">About</a>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <Home 
                tasks={tasks} 
                loading={loading}
                onAddTask={addTask}
                onDeleteTask={deleteTask}
                onToggleTask={toggleTask}
              />
            } />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
