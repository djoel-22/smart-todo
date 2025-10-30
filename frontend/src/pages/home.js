import { useState, useEffect } from "react";
import TodoForm from "../components/todoform";
import TodoItem from "../components/todoitem";
import Navbar from "../components/navbar";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // ✅ Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(saved);
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const addTodo = (text) => {
    if (!text.trim()) return;
    const newTodo = {
      text,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (index) => {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // ✅ Filtered + searched todos
  const filteredTodos = todos.filter((todo) => {
    const matchSearch = todo.text.toLowerCase().includes(search.toLowerCase());
    if (filter === "completed") return todo.completed && matchSearch;
    if (filter === "pending") return !todo.completed && matchSearch;
    return matchSearch;
  });

  // ✅ Progress bar
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-700">Your Tasks ✅</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-md p-2 bg-white cursor-pointer"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Progress bar */}
        {total > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Add Todo */}
        <TodoForm addTodo={addTodo} />

        {/* Todos List */}
        <div className="mt-4 space-y-3">
          {filteredTodos.length === 0 ? (
            <p className="text-gray-500 text-center">
              No tasks found. Add one above!
            </p>
          ) : (
            filteredTodos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                toggleTodo={() => toggleTodo(index)}
                deleteTodo={() => deleteTodo(index)}
              />
            ))
          )}
        </div>

        {/* Stats */}
        {total > 0 && (
          <p className="text-gray-600 text-center mt-6">
            ✅ Completed {completed}/{total} ({progress}%)
          </p>
        )}
      </div>
    </div>
  );
}
