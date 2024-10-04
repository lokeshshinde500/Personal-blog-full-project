import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Add from "../Pages/Add";
import ViewBlog from "../Pages/viewBlog";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add" element={<Add />} />
        <Route path="/home" element={<Home />} />
        <Route path="/view/:id" element={<ViewBlog />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
