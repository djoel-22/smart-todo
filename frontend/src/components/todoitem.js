export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-3 hover:shadow-md transition">
      <div
        className={`cursor-pointer flex-1 ${
          todo.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
        onClick={toggleTodo}
      >
        {todo.text}
      </div>
      <button
        onClick={deleteTodo}
        className="text-red-500 hover:text-red-700 transition"
      >
        ✕
      </button>
    </div>
  );
}
