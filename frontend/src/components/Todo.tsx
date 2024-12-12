import React, { useContext, useEffect, useState } from "react";
import { Trash2, Edit, Check } from "lucide-react";
import ITodo from "../interfaces/ITodo";
import {
  addTodoAPI,
  deleteTodoAPI,
  fetchTodoAPI,
  updateTodoAPI,
  updateTodoStatusAPI,
} from "../api/todo";
import { AuthContext } from "../App";

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);
  const [dueDate, setDueDate] = useState("");
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    fetchTodoAPI().then((res) => {
      setTodos(res.data.data);
    });
  }, []);

  const formatDate = (date: string | null): string => {
    if (!date) return "";
    const formattedDate = new Date(date);
    const newDate = formattedDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    console.log(newDate);
    return newDate;
  };

  const addTodo = async (): Promise<void> => {
    try {
      if (inputValue.trim() && dueDate.trim()) {
        const newTodo: ITodo = {
          task: inputValue,
          completed: false,
          dueDate,
        };
        const response = await addTodoAPI(newTodo);
        if (response.data.success) {
          setTodos((prevTodos) => [...prevTodos, response.data.data]);
          setInputValue("");
          setDueDate("");
        } else {
          console.log(response.data.success);
        }
      }
    } catch (error) {
      const err = error as { status?: number };
      if (err.status === 401) {
        setAuth(false);
      }
      console.log(err.status);
    }
  };

  // Delete todo
  const deleteTodo = async (id: string): Promise<void> => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this To-Do?"
      );
      if (!isConfirmed) return; // If the user cancels, exit the function

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

  const startEditing = (todo: ITodo): void => {
    setEditingTodo(todo);
    setInputValue(todo.task);
    setDueDate(formatDate(todo.dueDate));
  };

  // Update todo
  const updateTodo = async (): Promise<void> => {
    try {
      if (inputValue.trim() && editingTodo) {
        const response = await updateTodoAPI(editingTodo._id!, {
          task: inputValue,
          dueDate,
        });
        console.log(response);
        if (response.data.success) {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === editingTodo._id
                ? { ...todo, task: inputValue, dueDate }
                : todo
            )
          );
          setEditingTodo(null);
          setInputValue("");
          setDueDate("");
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
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
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

        <input
          type="date"
          value={dueDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border rounded-l-lg"
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
            <span className="text-sm text-gray-500">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </span>

            <div className="flex space-x-2 ml-5">
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
