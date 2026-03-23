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
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border px-4 py-2 rounded-lg"
      />

      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
