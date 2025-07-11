import Moment from "moment";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { _id, image, title, description, author, category, createdAt } = blog;

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow hover:scale-105 hover:shadow-primary/25 duration-300 cursor-pointer"
    >
      <img src={image} alt="" className="aspect-video" />
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs">
        {category}
      </span>
      <p className="ml-5 mt-4 text-sm text-gray-600">
        <span className="text-black font-medium">{author} </span> - {Moment(createdAt).format("MMM DD, YYYY")}
      </p>
      <div className="p-5">
        <h5 className="mb-4 font-medium text-gray-900">{title}</h5>
        <p
          className="mb-3 text-xs text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
