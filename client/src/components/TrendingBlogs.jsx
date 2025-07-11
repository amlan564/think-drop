import { useAppContext } from "../context/AppContext";
import Moment from "moment";

const TrendingBlogs = () => {
  const { blogs, navigate } = useAppContext();

  return (
    <div className="w-full lg:w-1/2 xl:w-1/4">
      <h1 className="text-gray-600 text-xl pb-2 border-b">
        Trending Blogs
      </h1>
      <div className="w-full flex flex-col justify-center gap-6 mt-6 lg:mt-10">
        {blogs
          .slice(-6)
          .reverse()
          .map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="w-full flex gap-4 cursor-pointer"
            >
              <div className="w-1/2">
                <img
                  src={blog.image}
                  alt=""
                  className="w-full lg:h-[14vh] object-cover"
                />
              </div>
              <div className="w-1/2 flex flex-col items-start gap-2">
                <h1 className="text-base">{blog.title}</h1>
                <p className="text-xs lg:text-sm text-gray-500">
                  {Moment(blog.createdAt).format("MMM DD, YYYY")}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrendingBlogs;
