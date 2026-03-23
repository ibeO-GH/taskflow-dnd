import type { Task } from "../types/task";
import TaskCard from "../components/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { FaClock, FaSpinner, FaCheckCircle } from "react-icons/fa";

const TaskColumn = ({
  title,
  tasks,
  moveTask,
  deleteTask,
}: {
  title: string;
  tasks: Task[];
  moveTask: (id: number, status: Task["status"]) => void;
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
      className={`bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-lg hover:shadow-xl transition duration-300 min-h[320px] ${isOver ? "ring-2 ring-blue-400 scale-[1.02]" : ""}`}
    >
      <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-4 capitalize">
        {icon} {title}
      </h2>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
