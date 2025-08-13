import React from 'react'

const TaskItem = ({ task, onDelete, onToggle }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id)
    }
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
          className="task-checkbox"
        />
        <div className="task-details">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          <span className="task-date">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="task-actions">
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
