import { useState } from "react";

const TaskForm = ({ onAdd }: { onAdd: (title: string) => void }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm mb-8"
    >
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 outline-none text-gray-800 placeholder-gray-400"
      />

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
