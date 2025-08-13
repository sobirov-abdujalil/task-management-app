import React from 'react'
import TaskItem from './TaskItem.jsx'

const TaskList = ({ tasks, onDeleteTask, onToggleTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Create your first task to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDeleteTask}
          onToggle={onToggleTask}
        />
      ))}
    </div>
  )
}

export default TaskList
