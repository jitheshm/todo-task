import React, { useState } from "react";
import { Trash2, Edit, Check } from "lucide-react";
import ITodo from "../interfaces/ITodo";
import {
  addTodoAPI,
  deleteTodoAPI,
  updateTodoAPI,
  updateTodoStatusAPI,
} from "../api/todo";

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);

  const addTodo = async (): Promise<void> => {
    try {
      if (inputValue.trim()) {
        const newTodo: ITodo = {
          task: inputValue,
          completed: false,
        };
        const response = await addTodoAPI(newTodo);
        if (response.data.success) {
          setTodos((prevTodos) => [...prevTodos, response.data.data]);
          setInputValue("");
        } else {
          console.log(response.data.success);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete todo
  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await deleteTodoAPI(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle complete status
  const toggleComplete = async (id: string): Promise<void> => {
    try {
      await updateTodoStatusAPI(id, {
        completed: !todos.find((todo) => todo._id === id)?.completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Start editing a todo
  const startEditing = (todo: ITodo): void => {
    setEditingTodo(todo);
    setInputValue(todo.task);
  };

  // Update todo
  const updateTodo = async (): Promise<void> => {
    try {
      if (inputValue.trim() && editingTodo) {
        const response = await updateTodoAPI(editingTodo._id!, {
          task: inputValue,
        });
        console.log(response)
        if (response.data.success) {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === editingTodo._id
                ? { ...todo, task: inputValue }
                : todo
            )
          );
          setEditingTodo(null);
          setInputValue("");
        } else {
          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      editingTodo ? updateTodo() : addTodo();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a new todo"
          className="flex-grow p-2 border rounded-l-lg"
        />
        <button
          onClick={editingTodo ? updateTodo : addTodo}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
        >
          {editingTodo ? "Update" : "Add"}
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`flex items-center p-2 rounded-lg ${
              todo.completed ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <span
              className={`flex-grow ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.task}
            </span>

            <div className="flex space-x-2">
              <button
                onClick={() => toggleComplete(todo._id!)}
                className="text-green-500 hover:bg-green-200 p-1 rounded"
                title="Mark Complete"
              >
                <Check size={20} />
              </button>

              <button
                onClick={() => startEditing(todo)}
                className="text-blue-500 hover:bg-blue-200 p-1 rounded"
                title="Edit"
              >
                <Edit size={20} />
              </button>

              <button
                onClick={() => deleteTodo(todo._id!)}
                className="text-red-500 hover:bg-red-200 p-1 rounded"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
