import React, { useState } from 'react'
import TaskList from '../components/TaskList.jsx'
import TaskForm from '../components/TaskForm.jsx'

const Home = ({ tasks, loading, onAddTask, onDeleteTask, onToggleTask }) => {
  const [showForm, setShowForm] = useState(false)

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h2>Loading tasks...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Task Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      {showForm && (
        <TaskForm 
          onAddTask={onAddTask}
          onClose={() => setShowForm(false)}
        />
      )}

      <TaskList 
        tasks={tasks}
        onDeleteTask={onDeleteTask}
        onToggleTask={onToggleTask}
      />
    </div>
  )
}

export default Home
