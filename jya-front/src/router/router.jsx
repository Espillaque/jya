import React, { useContext } from "react";
import Login from "./../pages/login.jsx";
import Main from "./../pages/main.jsx";
import Register from "./../pages/register.jsx";
import { MyContext } from "../context.js";
import ROUTES from "./routes.jsx";

const Router = () => {
  const { contextData, setContextData } = useContext(MyContext);
  const { activeRoute } = contextData;
  return (
    <>
      {activeRoute === ROUTES.LOGIN && <Login />}
      {activeRoute === ROUTES.MAIN && <Main />}
      {activeRoute === ROUTES.REGISTER && <Register />}
    </>
    // <Routes>
    //   <Route path="/" element={<Login />}></Route>
    //   <Route path="/main" element={<Main />}></Route>
    //   <Route path="/register" element={<Register />}></Route>
    // </Routes>
  );
};

export default Router;
