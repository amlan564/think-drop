import { useRef } from "react";
import { useAppContext } from "../context/AppContext";

const SearchBlog = () => {
  const { input, setInput } = useAppContext();

  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };
  return (
    <div className="mt-20 sm:mb-10 lg:mt-30">
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-between max-w-lg max-sm:scale-90 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            className="w-full pl-4 outline-none"
            placeholder="Search for blogs"
            required
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
      <div className="text-center mt-6">
        {input && (
          <button
            onClick={onClear}
            className="border border-gray-300 font-light text-xs px-3 py-1 rounded-sm shadow-sm cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBlog;
