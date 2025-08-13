import { create } from "zustand";
import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "/api",
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const useTaskStore = create((set, get) => ({
  // State
  tasks: [],
  loading: false,

  // Actions
  setLoading: (loading) => set({ loading }),

  // Fetch all tasks
  fetchTasks: async () => {
    set({ loading: true });
    try {
      const response = await api.get("/tasks");
      set({ tasks: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      set({ loading: false });
      throw error;
    }
  },

  // Add new task
  addTask: async (taskData) => {
    set({ loading: true });
    try {
      const response = await api.post("/tasks", taskData);
      const newTask = response.data;
      set((state) => ({
        tasks: [newTask, ...state.tasks],
        loading: false,
      }));
      return newTask;
    } catch (error) {
      console.error("Error adding task:", error);
      set({ loading: false });
      throw error;
    }
  },

  // Update task
  updateTask: async (taskId, taskData) => {
    set({ loading: true });
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      const updatedTask = response.data;
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === taskId ? updatedTask : task
        ),
        loading: false,
      }));
      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);
      set({ loading: false });
      throw error;
    }
  },

  // Delete task
  deleteTask: async (taskId) => {
    set({ loading: true });
    try {
      await api.delete(`/tasks/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== taskId),
        loading: false,
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
      set({ loading: false });
      throw error;
    }
  },

  // Clear tasks (for logout)
  clearTasks: () => set({ tasks: [] }),
}));

export default useTaskStore;
