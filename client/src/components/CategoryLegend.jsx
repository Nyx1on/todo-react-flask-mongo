import React from "react";

const CategoryLegend = () => {
  return (
    <div className="my-4 flex-col items-center font-regular">
      <div className="flex my-2">
        <div className="w-5 h-5 bg-blue-500 rounded-full mr-1 outline-none border-0"></div>
        <span className="mr-5 text-sm text-gray-300 font-poppin">
          House Chores
        </span>
      </div>
      <div className="flex my-2">
        <div className="w-5 h-5 bg-[#F64C72] rounded-full mr-1 outline-none border-0"></div>
        <span className="mr-5 text-sm text-gray-300 font-poppin">
          Entertainment
        </span>
      </div>
      <div className="flex my-2">
        <div className="w-5 h-5 bg-[#5CD23B] rounded-full mr-1 outline-none border-0"></div>
        <span className="mr-5 text-sm text-gray-300 font-poppin">Social</span>
      </div>

      <div className="flex my-2">
        <div className="w-5 h-5 bg-red-500 rounded-full mr-1 outline-none border-0"></div>
        <span className="mr-5 text-sm text-gray-300 font-poppin">Work</span>
      </div>
      <div className="flex my-2">
        <div className="w-5 h-5 bg-[#553D67] rounded-full mr-1 outline-none border-0"></div>
        <span className="text-sm text-gray-300 font-poppin">Other</span>
      </div>
    </div>
  );
};

export default CategoryLegend;
