import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTimes, FaSave } from "react-icons/fa";
import useTaskStore from "../context/taskStore.js";
import dayjs from "dayjs";

const schema = yup.object({
  title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
  status: yup.string().oneOf(["pending", "in-progress", "completed"], "Invalid status"),
  dueDate: yup.date().required("Due date is required"),
});

const EditTaskModal = ({ isOpen, onClose, onSuccess, task }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateTask } = useTaskStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Set form values when task changes
  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("status", task.status);
      setValue("dueDate", dayjs(task.dueDate).format("YYYY-MM-DD"));
    }
  }, [task, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await updateTask(task._id, data);
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

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Edit Task</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              className={`input ${errors.title ? "border-red-500" : ""}`}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              id="description"
              rows="3"
              className={`input resize-none ${errors.description ? "border-red-500" : ""}`}
              placeholder="Enter task description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              {...register("status")}
              id="status"
              className={`input ${errors.status ? "border-red-500" : ""}`}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              {...register("dueDate")}
              type="date"
              id="dueDate"
              className={`input ${errors.dueDate ? "border-red-500" : ""}`}
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
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
              className="btn btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <FaSave />
                  Update Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
