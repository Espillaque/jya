import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./../pages/login.jsx";
import Main from "./../pages/main.jsx";
import Register from "./../pages/register.jsx";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/main" element={<Main />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
};

export default Router;
