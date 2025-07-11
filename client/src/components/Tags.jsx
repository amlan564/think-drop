import React from "react";
import { tagsData } from "../config";

const Tags = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center px-8 sm:px-16 md:px-30">
      <div className="w-full lg:w-4/7 md:text-center">
        <h1 className="text-gray-600 text-xl max-md:border-b max-md:pb-2">Tags</h1>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:mt-10 max-sm:px-2">
          {tagsData.map((tag, index) => (
            <div
              key={index}
              className="bg-black/10 px-4 py-2 rounded hover:bg-primary hover:text-white transition-all duration-200"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
