import React, { useState } from 'react'

const TaskForm = ({ onAddTask, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onAddTask(formData)
      setFormData({ title: '', description: '' })
      onClose()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <h3>Add New Task</h3>
        
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
            rows="3"
            className="form-textarea"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
