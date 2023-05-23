import React, { useState } from "react";
import axios from "axios";
import { CheckIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

const TodoList = ({ todo }) => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo.text);
  const [completed, setCompleted] = useState(false);
  const [tickColor, setTickColor] = useState("text-white");

  const colors = {
    Work: "bg-red-500",
    Entertainment: "bg-[#F64C72]",
    Social: "bg-[#5CD23B]",
    HouseChores: "bg-blue-500",
    Other: "bg-[#553D67]",
  };

  const randomColor = colors[todo.type];

  console.log(todo.id);

  const handleEdit = async (id) => {
    try {
      const response = await axios.post("https://todoflask-s6vi.onrender.com/todo/update", {
        id: id,
        text: updatedTodo,
      });
      console.log(response.data.message);
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("https://todoflask-s6vi.onrender.com/todo/delete", {
        id: id,
      });
      console.log(response.data.message);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComplete = () => {
    const completeState = completed;
    if(tickColor==="text-white"){
      setTickColor("text-[#03020E]")
    }
    if(tickColor!=="text-white"){
      setTickColor("text-white")
    }
    setCompleted(!completeState);
  };

  return (
    <>
      <div
        className={`flex items-center justify-between my-2 ${randomColor} py-3 rounded-md shadow-lg transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-xl `}
      >
        <button
          onClick={handleComplete}
          className="mx-2 text-bold text-xl my-auto"
        >
          <CheckIcon className={`h-7 w-8 ${tickColor}`}/>
        </button>
        {editMode ? (
          <input
            type="text"
            value={updatedTodo}
            onChange={(e) => setUpdatedTodo(e.target.value)}
            className="mx-4 text-xl text-white bg-transparent border-none focus:outline-none"
          />
        ) : (
          <>
            {completed ? (
              <h1 className="mx-4 text-xl text-[#03020E]"><s>{todo.text}</s></h1>
            ) : (
              <h1 className="mx-4 text-xl text-white">{todo.text}</h1>
            )}
          </>
        )}
        <div>
          {editMode ? (
            <button
              className="mx-1 text-bold text-xl my-auto text-white"
              onClick={() => handleEdit(todo.id)}
            >
              Save
            </button>
          ) : (
            <button className="mx-1" onClick={() => setEditMode(true)}>
              <PencilSquareIcon className="h-8 w-8 text-gray-200" />
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
