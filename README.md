# Task Management App

A full-stack task management application built with React + Vite frontend and Express + MongoDB backend.

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as completed/incomplete
- ✅ Modern, responsive UI
- ✅ Real-time updates
- ✅ RESTful API
- ✅ MongoDB database integration

## Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **CSS3** - Styling with modern design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing

## Project Structure

```
task-management-app/
├── frontend/                  # React + Vite app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── About.jsx
│   │   ├── styles/
│   │   │   └── main.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
├── backend/                   # Node.js + Express API
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── tasks.js
│   ├── config/
│   │   └── db.js
│   └── server.js
├── package.json
├── .env
└── README.md
```

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas)

## Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env` file is already created with default values:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-manager
   NODE_ENV=development
   ```
   
   If you're using MongoDB Atlas, update the `MONGO_URI` with your connection string.

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows
   mongod
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run server
   ```
   This will start the Express server on port 5000 with nodemon for auto-restart.

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   This will start the Vite dev server on port 3000.

3. **Open your browser**
   
   Navigate to `http://localhost:3000` to access the application.

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

## API Endpoints

The backend provides the following RESTful API endpoints:

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Request/Response Examples

**Create a new task:**
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the task management app",
  "priority": "high"
}
```

**Response:**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the task management app",
  "completed": false,
  "priority": "high",
  "createdAt": "2023-07-20T10:30:00.000Z",
  "updatedAt": "2023-07-20T10:30:00.000Z"
}
```

## Features in Detail

### Frontend Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Changes are reflected immediately without page refresh
- **Form Validation**: Client-side validation for task creation
- **Confirmation Dialogs**: Delete confirmation to prevent accidental deletions
- **Loading States**: Visual feedback during API calls
- **Empty States**: Helpful messages when no tasks exist

### Backend Features
- **RESTful API**: Standard HTTP methods for CRUD operations
- **Error Handling**: Comprehensive error handling with meaningful messages
- **Data Validation**: Server-side validation using Mongoose schemas
- **CORS Support**: Cross-origin requests enabled for frontend integration
- **Environment Configuration**: Flexible configuration via environment variables

## Database Schema

### Task Model
```javascript
{
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  completed: Boolean (default: false),
  priority: String (enum: 'low', 'medium', 'high', default: 'medium'),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify network connectivity if using MongoDB Atlas

2. **Port Already in Use**
   - Change the port in `.env` file
   - Kill processes using the default ports

3. **CORS Errors**
   - The backend is configured with CORS enabled
   - Ensure the frontend is running on the correct port (3000)

4. **Module Not Found Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that all import paths are correct

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [ISC License](LICENSE).

## Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all prerequisites are met
4. Create an issue in the repository

---

**Happy Task Managing! 🎉**
