import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function viewBlog() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({});
  
  const navigate = useNavigate();

  const fetchBlog = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlog(response.data.blog);

      // setTasks
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded mb-4 hover:bg-green-600"
        onClick={() => {
          navigate("/home");
        }}
      >
        Back
      </button>
      <h1 className="text-4xl font-bold text-center text-green-600 mb-4">
         {blog.title}
      </h1>
      <img
        className="w-full h-full object-cover rounded-lg mb-4"
        src={blog.image}
        alt={blog.title}
      />
      <div className="text-gray-500 text-sm mb-2 flex justify-between">
        <span className="font-semibold">Category {">"} {blog.category}</span>
        <span className="font-semibold">Published at  {blog.created_at}</span>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed text-justify">
        {blog.description}
      </p>
    </div>
  );
}

export default viewBlog;
