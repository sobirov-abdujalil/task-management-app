import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "in-progress":
        return "status-in-progress";
      default:
        return "status-pending";
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("MMM DD, YYYY");
  };

  const isOverdue = (dueDate) => {
    return dayjs(dueDate).isBefore(dayjs(), "day");
  };

  return (
    <div className="card hover:shadow-lg dark:hover:shadow-gray-900/30 transition-all duration-200 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 break-words">
            {task.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3 break-words">
            {task.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <FaCalendarAlt className="text-xs flex-shrink-0" />
              <span
                className={
                  isOverdue(task.dueDate)
                    ? "text-red-600 dark:text-red-400 font-medium"
                    : ""
                }
              >
                Due: {formatDate(task.dueDate)}
              </span>
            </div>
            <span
              className={`status-badge ${getStatusClass(task.status)} w-fit`}
            >
              {task.status}
            </span>
          </div>
        </div>
        <div className="flex gap-2 lg:flex-col lg:ml-4">
          <button
            onClick={onEdit}
            className="btn btn-secondary text-sm flex items-center justify-center gap-1 flex-1 lg:flex-none"
          >
            <FaEdit className="text-xs" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={onDelete}
            className="btn btn-danger text-sm flex items-center justify-center gap-1 flex-1 lg:flex-none"
          >
            <FaTrash className="text-xs" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
