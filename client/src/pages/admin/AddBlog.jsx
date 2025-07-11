import { useEffect, useRef, useState } from "react";
import uploadImage from "../../assets/upload.png";
import Quill from "quill";
import { blogCategories } from "../../config";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const { axios, token, userAccount, setUserAccount } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");

    try {
      setLoading(true);

      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    if (token) {
      try {
        const { data } = await axios.get("/api/admin/profile");
        if (data.success) {
          setUserAccount({
            userName: data.user.userName,
            email: data.user.email,
          });
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = {
        title,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
        author: userAccount.userName,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Technology");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
    fetchUserData();
  }, [token]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-y-scroll"
    >
      <div className="bg-white max-sm:m-4 md:max-w-2xl p-10 sm:m-10 shadow rounded max-sm:text-sm">
        <p>Upload Thumbnail</p>
        <label
          htmlFor="image"
          className={`flex items-center justify-center mt-2 w-30 h-20 rounded cursor-pointer ${!image ? "border border-dashed border-gray-400": ""}`}
        >
          <img
            src={!image ? uploadImage : URL.createObjectURL(image)}
            alt=""
            className={`${!image ? "w-8" : "w-full h-full object-cover rounded"}`}
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        <p className="mt-4">Blog Author</p>
        <input
          value={userAccount.userName || ""}
          type="text"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded bg-gray-100"
          readOnly
        />

        <p className="mt-4">Blog Title</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Enter your blog title"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          required
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          {loading && (
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/10 mt-2">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}
          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:bg-black/80 cursor-pointer transition-all"
          >
            Generate with AI
          </button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 mt-4">
          <p>Publish Now</p>
          <input
            onChange={(e) => setIsPublished(e.target.checked)}
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
          />
        </div>

        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 px-8 py-3 bg-primary/95 hover:bg-primary text-white rounded cursor-pointer text-xs md:text-sm"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
