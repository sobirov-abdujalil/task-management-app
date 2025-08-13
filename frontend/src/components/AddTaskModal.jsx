import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTimes, FaPlus } from "react-icons/fa";
import useTaskStore from "../context/taskStore.js";

const schema = yup.object({
  title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
  status: yup.string().oneOf(["pending", "in-progress", "completed"], "Invalid status"),
  dueDate: yup.date().required("Due date is required").min(new Date(), "Due date cannot be in the past"),
});

const AddTaskModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addTask } = useTaskStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: "pending",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await addTask(data);
      reset();
      onSuccess();
    } catch (error) {
      // Error is already handled in the store
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Add New Task</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              className={`input ${errors.title ? "input-error" : ""}`}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              id="description"
              rows="3"
              className={`input resize-none ${errors.description ? "input-error" : ""}`}
              placeholder="Enter task description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              {...register("status")}
              id="status"
              className={`input ${errors.status ? "input-error" : ""}`}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Due Date
            </label>
            <input
              {...register("dueDate")}
              type="date"
              id="dueDate"
              className={`input ${errors.dueDate ? "input-error" : ""}`}
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary flex-1"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="spinner h-4 w-4"></div>
                  Creating...
                </>
              ) : (
                <>
                  <FaPlus />
                  Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
