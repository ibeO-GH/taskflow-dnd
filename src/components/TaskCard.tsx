import { useState, useEffect, useRef } from "react";
import type { Task } from "../types/task";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({
  task,
  moveTask,
  updateTask,
  deleteTask,
}: {
  task: Task;
  moveTask: (id: number, status: Task["status"]) => void;
  updateTask: (id: number, title: string) => void;
  deleteTask: (id: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
  });

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const statusColor =
    task.status === "pending"
      ? "border-l-yellow-400"
      : task.status === "progress"
        ? "border-l-blue-500"
        : "border-l-green-500";

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        cardRef.current = node;
      }}
      className={`relative bg-white border border-gray-200 border-l-4 ${statusColor} p-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 flex justify-between ${open ? "z-50" : "z-0"}`}
    >
      {editing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            updateTask(task.id, value);
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateTask(task.id, value);
              setEditing(false);
            }
          }}
          className="border px-2 py-1 rounded w-full text-sm"
          autoFocus
        />
      ) : (
        <p
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-gray-800 text-sm font-medium"
        >
          {task.title}
        </p>
      )}
      <span
        {...listeners}
        {...attributes}
        className="cursor-grab text-gray-400 hover:text-gray-700 hover:scale-110 transition"
      >
        ⠿
      </span>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-2 top-10 bg-white border border-gray-200 rounded-lg shadow-lg w-36 z-50 overflow-hidden">
          {task.status === "pending" && (
            <button
              onClick={() => {
                moveTask(task.id, "progress");
                setOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
            >
              Start
            </button>
          )}

          {task.status === "progress" && (
            <button
              onClick={() => {
                moveTask(task.id, "completed");
                setOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
            >
              Complete
            </button>
          )}

          <button
            onClick={() => {
              setEditing(true);
              setOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
          >
            Edit
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            className="block w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
