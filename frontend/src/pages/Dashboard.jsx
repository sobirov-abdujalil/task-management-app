import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSignOutAlt, FaTasks } from "react-icons/fa";
import toast from "react-hot-toast";
import useTaskStore from "../context/taskStore.js";
import TaskCard from "../components/TaskCard.jsx";
import AddTaskModal from "../components/AddTaskModal.jsx";
import EditTaskModal from "../components/EditTaskModal.jsx";

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  const { tasks, loading, fetchTasks, deleteTask, clearTasks } = useTaskStore();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await fetchTasks();
        if (tasks.length > 0) {
          toast.success(
            `Loaded ${tasks.length} task${tasks.length === 1 ? "" : "s"}`
          );
        }
      } catch (error) {
        toast.error("Failed to load tasks. Please refresh the page.");
      }
    };

    loadTasks();
  }, [fetchTasks]);

  const handleLogout = () => {
    const loadingToast = toast.loading("Logging out...");

    // Simulate a brief delay for better UX
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      clearTasks();
      toast.dismiss(loadingToast);
      toast.success("Logged out successfully!");
      navigate("/login");
    }, 500);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    const taskToDelete = tasks.find((task) => task._id === taskId);
    const taskTitle = taskToDelete?.title || "Task";

    if (window.confirm(`Are you sure you want to delete "${taskTitle}"?`)) {
      try {
        await deleteTask(taskId);
        toast.success(`"${taskTitle}" has been deleted successfully.`);
      } catch (error) {
        toast.error(`Failed to delete "${taskTitle}". Please try again.`);
      }
    }
  };

  const handleAddSuccess = () => {
    setShowAddModal(false);
    toast.success("Task created successfully!");
    fetchTasks(); // Refresh the task list
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedTask(null);
    toast.success("Task updated successfully!");
    fetchTasks(); // Refresh the task list
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FaTasks className="text-2xl text-primary-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Task Dashboard
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Task Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <FaPlus />
            Add New Task
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="spinner h-8 w-8 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
          </div>
        )}

        {/* Task List */}
        {!loading && (
          <div className="grid gap-6">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <FaTasks className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No tasks yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get started by creating your first task!
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={() => handleEditTask(task)}
                  onDelete={() => handleDeleteTask(task._id)}
                />
              ))
            )}
          </div>
        )}
      </main>

      {/* Add Task Modal */}
      {showAddModal && (
        <AddTaskModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      {/* Edit Task Modal */}
      {showEditModal && selectedTask && (
        <EditTaskModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTask(null);
          }}
          onSuccess={handleEditSuccess}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
