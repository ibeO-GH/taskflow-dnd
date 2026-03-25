import { useState } from "react";
import type { Task } from "../types/task";
import TaskColumn from "../components/TaskColumn";
import TaskForm from "../components/TaskForm";
import { DndContext, DragOverlay } from "@dnd-kit/core";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      status: "pending",
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const progressTasks = tasks.filter((t) => t.status === "progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const moveTask = (id: number, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const updateTask = (id: number, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: any) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    moveTask(active.id, over.id);
    setActiveTask(null);
  };

  const overlayColor = activeTask
    ? activeTask?.status === "pending"
      ? "border-l-yellow-400"
      : activeTask?.status === "progress"
        ? "border-l-blue-500"
        : "border-l-green-500"
    : "";

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          TaskFlow
        </h1>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Organize. Track. Complete.
        </p>
        <TaskForm onAdd={handleAdd} />
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <TaskColumn
              title="pending"
              tasks={pendingTasks}
              moveTask={moveTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
            <TaskColumn
              title="progress"
              tasks={progressTasks}
              moveTask={moveTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
            <TaskColumn
              title="completed"
              tasks={completedTasks}
              moveTask={moveTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </div>
          <DragOverlay>
            {activeTask ? (
              <div
                className={`bg-white border border-gray-200 border-l-4 ${overlayColor} p-3 rounded-xl shadow-2xl w-[220px] rotate-1`}
              >
                <p className="text-sm font-medium text-gray-800">
                  {activeTask.title}
                </p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Home;
