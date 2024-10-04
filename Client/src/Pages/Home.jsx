import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/blog", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     
      // Update the local state to remove the deleted blog
      const deleteBlog = [...blogs].filter((post) => post._id !== id);
      setBlogs(deleteBlog);
      console.log(blogs)
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id) => {
    // Add update functionality here
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (blogs.length <= 0) {
    return (
      <h2 className="mt-5 text-5xl text-green-500 text-center">
        No Blogs found!
      </h2>
    );
  }

  return (
    <div className="flex flex-wrap justify-center p-4">
      {blogs.map((post) => (
        <div
          key={post._id}
          className="max-w-sm rounded overflow-hidden shadow-lg border-green-300 border-[1px] m-4"
        >
          <img
            className="w-full h-48 object-cover"
            src={post.image}
            alt={post.title}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-green-600">
              {post.title}
            </div>
            <span className="text-gray-500 p-1 bg-green-200 rounded-full border-green-700 border-[1px]">
              {post.category}
            </span>
            <p className="text-gray-500 text-sm mt-2">{post.created_at}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-green-600"
              onClick={() => handleUpdate(post._id)}
            >
              Update
            </button>
            <button
              className="mr-2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
              onClick={() => handleDelete(post._id)}
            >
              Delete
            </button>
            <button
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
              onClick={() => navigate(`/view/${post._id}`)}
            >
              Read
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
