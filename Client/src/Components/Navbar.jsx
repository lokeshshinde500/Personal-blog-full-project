import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="shadow-lg sticky w-full top-0 left-0">
      <nav className="bg-green-200 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-green-600 text-lg font-bold">BLOGGER.COM</div>
          <div className="hidden md:flex space-x-4 items-center">
            {token ? (
              <>
                <Link
                  to={"/home"}
                  className="text-green-800 hover:shadow-md bg-green-400 p-1 rounded-md transition"
                >
                  Blogs
                </Link>
                <Link
                  to={"/add"}
                  className="text-green-800 hover:shadow-md bg-green-400 p-1 rounded-md transition"
                >
                  Create Blog
                </Link>
                <Link
                  to={"/"}
                  className="text-green-800 hover:shadow-md bg-green-400 p-1 rounded-md transition"
                  onClick={logout}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/"}
                  className="text-green-600 hover:shadow-md bg-green-100 p-1 rounded-md transition border border-green-700"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="text-green-600 hover:shadow-md bg-green-100 p-1 rounded-md transition border border-green-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <MdOutlineMenu />
            </button>
          </div>
        </div>
        <div
          className={`sm:hidden flex flex-col space-y-2 mt-2 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link to={"/home"} className="text-white hover:text-green-200">
            Tasks
          </Link>
          <Link to={"/"} className="text-white hover:text-green-200">
            Create Tasks
          </Link>
          <Link to={"/"} className="text-white hover:text-green-200">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
