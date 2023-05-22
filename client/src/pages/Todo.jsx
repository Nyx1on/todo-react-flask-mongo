import React, { useState } from "react";
import axios from "axios";
import TodoList from "../components/TodoList";

const Todo = () => {
  const [todo, setTodo] = useState("");

  const handleOnChange = (e) => {
    setTodo(e.target.value);
    console.log(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (todo.trim() !== "") {
      try {
        const response = await axios.post("http://127.0.0.1:5000/createTodo", {
          todo: todo,
        });
        setTodo("");
        console.log(response.status);
        console.log("Response ID:", response.data._id);
        console.log("Response Text:", response.data.text);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="my-36 mx-auto w-1/2">
      <h1>Create a todo list</h1>
      <form action="" className="flex flex-row" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="Add items"
          value={todo}
          onChange={handleOnChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#37c1f8] focus:border-[#37c1f8] outline-none p-3 w-full"
        />
        <button
          type="submit"
          className=" text-white bg-[#37c1f8] font-medium rounded-md text-sm sm:w-auto px-4 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </form>
      <TodoList todo={todo} setTodo={setTodo} />
    </div>
  );
};

export default Todo;
