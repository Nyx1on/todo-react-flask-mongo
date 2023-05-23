import React from "react";

const CategoryLegend = () => {
  return (
    <div className="my-4 flex items-center font-regular justify-center">
      <div className="w-4 h-4 bg-red-500 rounded-full mr-2 outline-none border-0"></div>
      <span className="mr-4 text-sm text-gray-300 font-poppin">Work</span>
      <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2 outline-none border-0"></div>
      <span className="mr-4 text-sm text-gray-300 font-poppin">Entertainment</span>
      <div className="w-4 h-4 bg-green-500 rounded-full mr-2 outline-none border-0"></div>
      <span className="mr-4 text-sm text-gray-300 font-poppin">Social</span>
      <div className="w-4 h-4 bg-blue-500 rounded-full mr-2 outline-none border-0"></div>
      <span className="mr-4 text-sm text-gray-300 font-poppin">House Chores</span>
      <div className="w-4 h-4 bg-gray-600 rounded-full mr-2 outline-none border-0"></div>
      <span className="text-sm text-gray-300 font-poppin">Other</span>
    </div>
  );
};

export default CategoryLegend;
