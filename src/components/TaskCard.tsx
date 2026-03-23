import { useState, useEffect, useRef } from "react";
import type { Task } from "../types/task";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({
  task,
  moveTask,
  deleteTask,
}: {
  task: Task;
  moveTask: (id: number, status: Task["status"]) => void;
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

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        cardRef.current = node;
      }}
      className={`relative bg-white/80 backdrop-blur-sm border border-gray-200 p-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 flex justify-between ${open ? "z-50" : "z-0"}`}
    >
      {editing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            moveTask(task.id, task.status);
            task.title = value;
            setEditing(false);
          }}
          className="border px-2 py-1 rounded w-full text-sm"
          autoFocus
        />
      ) : (
        <p
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-gray-800"
        >
          {task.title}
        </p>
      )}
      <span
        {...listeners}
        {...attributes}
        className="cursor-grab text-gray-400 hover:text-gray-600"
      >
        ⠿
      </span>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-2 mt-2 bg-white border rounded-lg shadow-md w-32 z-50">
          {task.status === "pending" && (
            <button
              onClick={() => {
                moveTask(task.id, "progress");
                setOpen(false);
              }}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
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
              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              Complete
            </button>
          )}

          <button
            onClick={() => {
              setEditing(true);
              setOpen(false);
            }}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
          >
            Edit
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
