import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { parse } from "marked";
import { blogCategories } from "../../config";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { _id, title, description, category, image, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const [isUpdating, setIsUpdating] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [formData, setFormData] = useState({
    title: title || "",
    description: description || "",
    category: category || "",
  });

  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };

  const generateContent = async () => {
    if (!formData.title) return toast.error("Please enter a title");

    try {
      setLoading(true);

      const { data } = await axios.post("/api/blog/generate", {
        prompt: formData.title,
      });

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
        setFormData((prev) => ({ ...prev, description: parse(data.content) }));
        console.log("catch here");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async () => {
    try {
      setIsUpdating(true);

      const blogData = {
        id: _id,
        title: formData.title,
        description: quillRef.current.root.innerHTML || formData.description,
        category: formData.category,
      };

      const updateFormData = new FormData();
      updateFormData.append("blog", JSON.stringify(blogData));
      if (newImage) {
        updateFormData.append("image", newImage);
      }

      const { data } = await axios.post("/api/blog/update", updateFormData);

      console.log(data);

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
        document.getElementById(`modal_${_id}`).close();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirm) return;

    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
      quillRef.current.root.innerHTML = description || "";
    }
  }, []);

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 rounded cursor-pointer"
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <button
          onClick={() => document.getElementById(`modal_${_id}`).showModal()}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white cursor-pointer"
        >
          <CiEdit size={16} />
        </button>
        <dialog id={`modal_${_id}`} className="modal">
          <div className="modal-box bg-white text-black">
            <p className="mt-4">Blog Thumbnail</p>
            <label
              htmlFor={`image_${_id}`}
              className="border border-dashed border-gray-400 flex items-center justify-center mt-2 w-30 h-16 rounded cursor-pointer"
            >
              <img
                src={
                  newImage
                    ? URL.createObjectURL(newImage)
                    : image || uploadImage
                }
                alt=""
                className={`${!newImage && !image ? "w-8" : "w-full rounded"}`}
              />
              <input
                onChange={(e) => setNewImage(e.target.files[0])}
                type="file"
                id={`image_${_id}`}
                hidden
              />
            </label>
            <p className="mt-4">Blog Title</p>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 outline-none rounded"
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
              value={formData.category}
              onChange={handleInputChange}
              className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
            >
              <option value="">Select Category</option>
              {blogCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="modal-action">
              <form method="dialog">
                <button className="bg-red-500 text-white px-4 py-2 rounded mr-4 cursor-pointer">
                  Close
                </button>
                <button
                  disabled={isUpdating}
                  onClick={updateBlog}
                  className="bg-primary text-white px-4 py-2 rounded cursor-pointer"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </form>
            </div>
          </div>
        </dialog>
        <div
          onClick={deleteBlog}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white cursor-pointer"
        >
          <MdDelete size={16} />
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
