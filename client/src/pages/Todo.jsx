import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "../components/TodoList";
import Loader from "../components/Loader";
import CategoryLegend from "../components/CategoryLegend";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoType, setTodoType] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    sortTodos();
  }, [sortOrder]);

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
    if (input.trim() !== "" && todoType !== "") {
      try {
        const response = await axios.post("http://127.0.0.1:5000/todo/create", {
          text: input,
          type: todoType,
        });
        setInput("");
        console.log(response.status);
        console.log("Response ID:", response.data.id);
        console.log("Response Text:", response.data.text);
        fetchTodos();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please enter the text and select the item type.");
    }
    setLoading(false);
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

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortTodos = () => {
    const sortedTodos = [...todos];
    sortedTodos.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.text.localeCompare(b.text);
      } else {
        return b.text.localeCompare(a.text);
      }
    });
    setTodos(sortedTodos);
  };

  return (
    <div className="flex mt-6">
      <div className="mx-auto w-2/5 h-1/2 bg-white bg-opacity-10 py-4 px-4 rounded-lg">
        <h1 className="my-2 font-medium font-poppin text-5xl text-[#66FCF1]">
          Welcome Back {'"User"'} ,
        </h1>
        <h1 className="my-2 font-medium text-3xl text-[#66FCF1]">
          Let's Get Productive!
        </h1>
        <p className="my-2 font-medium text-xl text-gray-300">
          Create your personal todo list and stay organized.
        </p>
        <form action="" className="flex flex-row" onSubmit={handleOnSubmit}>
          <input
            type="text"
            name="input"
            placeholder="Add items"
            value={input}
            onChange={handleOnChange}
            className="bg-white border border-gray-300 text-gray-900 text-md font-medium rounded-lg opacity-50 focus:ring-[#66FCF1] focus:border-[#66FCF1] outline-none p-3 w-full"
          />
          <select
            value={todoType}
            onChange={(e) => setTodoType(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-md font-medium rounded-lg opacity-50 focus:ring-[#66FCF1] focus:border-[#66FCF1] outline-none p-3 ml-1"
          >
            <option value="">Select Type</option>
            <option value="Work">Work</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Social">Social</option>
            <option value="HouseChores">House Chores</option>
            <option value="Other">Other</option>
          </select>
          <button
            type="submit"
            className="ml-1 text-white bg-[#2bb3e9] font-medium rounded-md text-sm sm:w-auto px-4 text-center"
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
        <div className="mx-4">
          <CategoryLegend />
        </div>
        <div>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="bg-white border border-gray-300 text-gray-900 text-md font-medium rounded-lg opacity-50 focus:ring-[#37c1f8] focus:border-[#37c1f8] outline-none p-3 ml-1"
          >
            <option value="">Sort By</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="w-1/2 mx-auto">
        <div className=" bg-white bg-opacity-10 py-4 px-4 rounded-lg">
          <h1 className="my-2 font-medium font-poppin text-5xl text-[#66FCF1]">
            Your Daily To-do's
          </h1>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {todos.length === 0 ? (
              <div className="mt-4 mb-0 text-xl font-bold text-white text-center bg-white bg-opacity-10 py-4 px-4 rounded-lg">
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
    </div>
  );
};

export default Todo;
