import type { Task } from "../types/task";
import TaskCard from "../components/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { FaClock, FaSpinner, FaCheckCircle } from "react-icons/fa";

const TaskColumn = ({
  title,
  tasks,
  moveTask,
  updateTask,
  deleteTask,
}: {
  title: string;
  tasks: Task[];
  moveTask: (id: number, status: Task["status"]) => void;
  updateTask: (id: number, title: string) => void;
  deleteTask: (id: number) => void;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  const icon =
    title === "pending" ? (
      <FaClock className="text-yellow-500" />
    ) : title === "progress" ? (
      <FaSpinner className="text-blue-500" />
    ) : (
      <FaCheckCircle className="text-green-500" />
    );

  return (
    <div
      ref={setNodeRef}
      className={`bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-300 min-h-[320px] ${isOver ? "ring-2 ring-blue-500 bg-blue-50 scale-[1.02]" : ""}`}
    >
      <h2 className="flex items-center justify-between font-semibold text-gray-700 mb-4 capitalize">
        <div className="flex items-center gap-2">
          {icon} {title}
        </div>

        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </h2>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-6 border border-dashed border-gray-200 rounded-lg">
            No tasks
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              moveTask={moveTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
