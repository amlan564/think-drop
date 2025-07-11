import { useAppContext } from "../context/AppContext";
import Moment from "moment";

const PopularPostList = () => {
  const { blogs, navigate } = useAppContext();

  return (
    <div className="w-full xl:w-3/4">
      <h1 className="text-gray-600 text-xl pb-2 border-b">Popular Blogs</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6 lg:mt-10">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            onClick={() => navigate(`/blog/${blog._id}`)}
            className="flex gap-4 cursor-pointer"
          >
            <img
              src={blog.image}
              alt=""
              className="w-[40%] md:w-[45%] md:h-22 lg:w-24 lg:h-24 object-cover"
            />
            <div>
              <h1 className="mb-2">
                {blog.title}
              </h1>
              <p className="text-xs lg:text-sm text-gray-500 font-light">
                By <span className="text-black"> {blog.author} </span> on {""}
                {Moment(blog.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPostList;
