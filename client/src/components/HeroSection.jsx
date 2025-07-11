import { useAppContext } from "../context/AppContext";
import Moment from "moment";

const HeroSection = ({ blog }) => {
  const { blogs, navigate } = useAppContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* first column */}
      {blogs.slice(0, 1).map((blog) => (
        <div
          key={blog._id}
          onClick={() => navigate(`/blog/${blog._id}`)}
          className="relative w-full h-[40vh] sm:h-[50vh] lg:h-full bg-cover bg-center cursor-pointer"
          style={{
            backgroundImage: `url(${blog.image})`,
          }}
        >
          <div className="absolute inset-0 bg-black/30">
            <div className="relative h-full flex flex-col items-start justify-end gap-3 pl-6 pb-10">
              <span className="px-3 py-1 bg-primary rounded-full text-white text-xs">
                {blog.category}
              </span>
              <h1 className="md:text-lg lg:text-2xl font-bold text-white rounded pr-16">
                {blog.title}
              </h1>
              <p className="text-xs text-gray-200">
                {Moment(blog.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
        </div>
      ))}
      {/* second column */}
      <div className="w-full flex flex-col md:justify-center gap-6">
        {blogs.slice(1, 3).map((blog) => (
          <div
            key={blog._id}
            onClick={() => navigate(`/blog/${blog._id}`)}
            className="grid grid-cols-2 gap-4 items-center md:h-full cursor-pointer"
          >
            <div className="md:h-full">
              <img
                src={blog.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="px-3 py-1 bg-primary rounded-full text-white text-xs">
                {blog.category}
              </span>
              <h1 className="md:text-lg lg:text-xl">{blog.title}</h1>
              <p className="text-xs text-gray-600">
                {Moment(blog.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
