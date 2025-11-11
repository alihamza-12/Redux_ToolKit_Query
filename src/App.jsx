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

  if (isLoading) return <p className="text-center mt-10">Loading todos...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to fetch todos</p>
    );
  return (
    <>
      {/* input */}

      <div className="flex justify-center mt-10 gap-2 w-full">
        <input
          value={newTodo}
          onChange={handleInput}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="p-3 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg w-1/3 outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Enter your Todo Item"
          required
        />
        <button
          onClick={handleSubmit}
          className="p-3 rounded-lg bg-green-500 dark:bg-emerald-700 text-white hover:bg-green-600 dark:hover:bg-emerald-800 cursor-pointer transition-all duration-200 hover:scale-105 shadow-md"
        >
          Add Todo
        </button>
      </div>

      {/* List */}
      <div className="pb-20">
        {todos.map((todo) => (
          <ul
            key={todo.id}
            className="flex flex-col items-center mt-5 w-1/3 mx-auto"
          >
            <li className="p-3 w-full bg-blue-100 dark:bg-indigo-800 dark:text-white rounded flex justify-between items-center hover:bg-blue-200 dark:hover:bg-indigo-700">
              {todo.completed ? (
                <button
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className="p-1 hover:bg-blue-500 dark:hover:bg-blue-700 hover:text-white rounded-lg cursor-pointer mr-2"
                >
                  ✅
                </button>
              ) : (
                <button
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className="p-1 hover:bg-blue-500 dark:hover:bg-blue-700 hover:text-white rounded-lg cursor-pointer mr-2"
                >
                  ⭕
                </button>
              )}
              <span className="w-full">{todo.text}</span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="p-1 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 hover:text-white rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 shadow-md"
              >
                ❌
              </button>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default App;
