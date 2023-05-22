import React, { useState } from "react";
import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

const TodoList = ({ todo }) => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo.text);

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-400",
    "bg-sky-500",
    "bg-yellow-500",
    "bg-red-400",
    "bg-green-500",
    "bg-orange-400",
  ];

  const lastChar = parseInt(todo.id.slice(-1), 16); 
  const randomColor = colors[lastChar % colors.length];

  console.log(todo.id);

  const handleEdit = async (id) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/todo/update", {
        id: id,
        text: updatedTodo,
      });
      console.log(response.data.message);
      setEditMode(false);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/todo/delete", {
        id: id,
      });
      console.log(response.data.message);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={`flex items-center justify-between my-2 ${randomColor} py-3 rounded-md shadow-lg transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-xl `}
      >
        {editMode ? (
          <input
            type="text"
            value={updatedTodo}
            onChange={(e) => setUpdatedTodo(e.target.value)}
            className="mx-4 text-xl text-white bg-transparent border-none focus:outline-none"
          />
        ) : (
          <h1 className="mx-4 text-xl text-white">{todo.text}</h1>
        )}
        <div>
          {editMode ? (
            <button
              className="mx-1 text-bold text-xl"
              onClick={() => handleEdit(todo.id)}
            >
              Save
            </button>
          ) : (
            <button className="mx-1" onClick={() => setEditMode(true)}>
              <PencilSquareIcon className="h-8 w-8 text-gray-50" />
            </button>
          )}
          <button className="mx-1 mr-3" onClick={() => handleDelete(todo.id)}>
            <TrashIcon className="h-8 w-8 text-black" />
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoList;
