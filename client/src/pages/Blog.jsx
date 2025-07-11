import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Moment from "moment";
import { FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();

  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);

      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id });
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div>
      <Navbar />
      <div className="text-center mt-20 to-gray-600">
        <p className="text-primary py-4 font-medium text-sm sm:text-base">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold max-w-2xl mx-auto mb-5 text-gray-800">
          {data.title}
        </h1>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border border-primary/35 bg-primary/5 font-medium text-primary text-sm sm:text-base">
          {data.author}
        </p>
      </div>
      <div className="mx-8 sm:mx-16 max-w-xl xl:max-w-4xl md:mx-auto my-10 mt-6">
        <img
          src={data.image}
          alt=""
          className="rounded-3xl mb-5 aspect-video"
        />
      </div>
      <div
        className="rich-text mx-8 sm:mx-16 md:mx-30 md:max-w-3xl"
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></div>

      {/* Comment Section */}

      <div className="mt-14 mb-10 mx-8 sm:mx-16 md:mx-30 max-w-3xl">
        <p className="font-semibold mb-4">Comments ({comments.length})</p>
        <div className="flex flex-col gap-4">
          {comments.map((item, index) => (
            <div
              key={index}
              className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="text-sm max-w-md ml-8">{item.content}</p>
              <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                {Moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add Comment Section */}
      <div className="mx-8 sm:mx-16 md:mx-30 max-w-3xl">
        <p className="font-semibold mb-4">Add your comment</p>
        <form
          onSubmit={addComment}
          className="flex flex-col items-start gap-4 max-w-lg"
        >
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded outline-none text-sm sm:text-base"
            required
          />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Comment"
            className="w-full p-2 border border-gray-300 rounded outline-none h-48 text-sm sm:text-base"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer text-sm sm:text-base"
          >
            Submit
          </button>
        </form>
      </div>
      {/* Share Buttons */}
      <div className="mx-8 sm:mx-16 md:mx-30 my-24 max-w-3xl">
        <p className="font-semibold my-4">Share this article on social media</p>
        <div className="flex items-center gap-4">
          <div className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-gray-200 cursor-pointer">
            <TiSocialFacebook size={20} />
          </div>
          <div className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-gray-200 cursor-pointer">
            <FaTwitter size={15} />
          </div>
          <div className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-gray-200 cursor-pointer">
            <FaGooglePlusG size={18} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
