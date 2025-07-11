import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");

  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") {
      return blogs;
    }
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase()) ||
        blog.author.toLowerCase().includes(input.toLowerCase())
    );
  };

  useEffect(() => {
    filteredBlogs();
  }, [blogs]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
