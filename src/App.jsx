// import { useEffect, useState } from "react";
import { useState } from "react";
import {
  useAddTodosMutation,
  useDeleteTodosMutation,
  useGetTodosQuery,
  useUpdateTodosMutation,
} from "./RTKQuery/apiSlice";

function App() {
  const [newTodo, setNewTodo] = useState("");
  //fetch(GET Method)
  const { data: todos, isError, isLoading } = useGetTodosQuery();
  // console.log(data);
  const [addTodos] = useAddTodosMutation();
  // console.log(addTodos)
  const [updateTodo] = useUpdateTodosMutation();
  const [deleteTodo] = useDeleteTodosMutation();

  //POST Method(Create)
  const handleInput = (e) => {
    setNewTodo(e.target.value);
  };
  const handleSubmit = () => {
    addTodos({
      text: newTodo,
      completed: false,
    });
    setNewTodo("");
  };
  // PATCH
  const toggleTodo = (id, completed) => {
    // console.log(id,todo)
    updateTodo({
      id,
      completed: !completed,
    });
  };
  //DELETE
  const removeTodo = (id) => {
    deleteTodo({ id });
  };
  // -----------------------------------------------------------------------------------------------------------

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-purple-900 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold">Loading todos...</p>
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-purple-900 dark:to-black flex items-center justify-center">
        <div className="text-center bg-red-500/20 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-red-400/30">
          <p className="text-white text-xl font-semibold mb-2">Oops!</p>
          <p className="text-red-100">Failed to fetch todos</p>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-purple-900 dark:to-black">
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Todo App
        </h1>
        <p className="text-lg text-white/80">Manage your tasks efficiently</p>
      </header>

      {/* Input Section */}
      <div className="flex justify-center gap-4 w-full px-4">
        <input
          value={newTodo}
          onChange={handleInput}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="p-4 bg-gradient-to-r from-white/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-700/90 dark:text-white rounded-xl w-full max-w-md outline-none focus:ring-4 focus:ring-white/50 shadow-2xl backdrop-blur-md border border-white/20"
          type="text"
          placeholder="Enter your Todo Item"
          required
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 dark:from-emerald-700 dark:to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-green-700 dark:hover:from-emerald-800 dark:hover:to-emerald-700 cursor-pointer transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-md border border-white/20 hover:shadow-green-500/25"
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <div className="pb-20 px-4">
        {todos.map((todo, index) => (
          <ul
            key={todo.id}
            className="flex flex-col items-center mt-6 w-full max-w-md mx-auto"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <li className="p-4 w-full bg-gradient-to-r from-white/95 to-blue-50/95 dark:from-gray-800/95 dark:to-indigo-900/95 dark:text-white rounded-xl flex justify-between items-center hover:from-white hover:to-blue-100 dark:hover:from-gray-700 dark:hover:to-indigo-800 shadow-2xl backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
              {todo.completed ? (
                <button
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className="p-2 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-500 dark:hover:from-green-600 dark:hover:to-green-700 hover:text-white rounded-lg cursor-pointer mr-3 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm border border-white/20"
                >
                  ✅
                </button>
              ) : (
                <button
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className="p-2 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 dark:hover:from-yellow-600 dark:hover:to-yellow-700 hover:text-white rounded-lg cursor-pointer mr-3 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm border border-white/20"
                >
                  ⭕
                </button>
              )}
              <span
                className={`w-full transition-all duration-300 ${
                  todo.completed
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="p-2 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 hover:text-white rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm border border-white/20"
              >
                ❌
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
