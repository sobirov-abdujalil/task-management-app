import React from 'react'

const About = () => {
  return (
    <div className="container">
      <div className="about-content">
        <h1>About Task Manager</h1>
        <p>
          Task Manager is a simple and efficient application designed to help you organize 
          and manage your daily tasks. Built with modern web technologies, it provides 
          a clean and intuitive interface for task management.
        </p>
        
        <h2>Features</h2>
        <ul>
          <li>Create and manage tasks</li>
          <li>Mark tasks as completed</li>
          <li>Delete tasks you no longer need</li>
          <li>Simple and clean interface</li>
          <li>Real-time updates</li>
        </ul>

        <h2>Technology Stack</h2>
        <ul>
          <li><strong>Frontend:</strong> React.js with Vite</li>
          <li><strong>Backend:</strong> Node.js with Express</li>
          <li><strong>Database:</strong> MongoDB with Mongoose</li>
          <li><strong>Styling:</strong> CSS3 with modern design</li>
        </ul>

        <h2>Getting Started</h2>
        <p>
          To get started with Task Manager, simply navigate to the home page and begin 
          creating your tasks. You can add new tasks, mark them as complete, or delete 
          them as needed.
        </p>
      </div>
    </div>
  )
}

export default About
