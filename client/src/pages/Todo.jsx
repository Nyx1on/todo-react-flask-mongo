import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "../components/TodoList";
import Loader from "../components/Loader";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const RenderTodos = ({ todos }) => {
    return todos.map((todo) => <TodoList todo={todo} key={todo.id} />);
  };

  const handleOnChange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    if (input.trim() !== "") {
      try {
        const response = await axios.post("http://127.0.0.1:5000/todo/create", {
          text: input,
        });
        setInput("");
        console.log(response.status);
        console.log("Response ID:", response.data.id);
        console.log("Response Text:", response.data.text);
        fetchTodos();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/todo/fetch");
      setTodos(response.data);
      console.log(todos[0].text);
    } catch (err) {
      console.error;
    }
  };

  return (
    <div className="my-36 mx-auto w-1/2 bg-white bg-opacity-20 py-4 px-4 rounded-lg">
      <h1 className="my-2 font-bold text-lg text-gray-800">Create a todo list of your own and hit the button to save.</h1>
      <form action="" className="flex flex-row" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="input"
          placeholder="Add items"
          value={input}
          onChange={handleOnChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md font-bold rounded-lg opacity-50 focus:ring-[#37c1f8] focus:border-[#37c1f8] outline-none p-3 w-full"
        />
        <button
          type="submit"
          className=" text-white bg-[#2bb3e9] font-medium rounded-md text-sm sm:w-auto px-4 text-center"
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
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {todos.length === 0 ? (
            <div className="mt-4 mb-0 py-0 text-xl font-bold text-sm text-black">
              List is Empty.
            </div>
          ) : (
            <>
              <RenderTodos todos={todos} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Todo;
