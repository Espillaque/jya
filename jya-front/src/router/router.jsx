import React, { useContext } from "react";
import Login from "./../pages/login.jsx";
import Main from "./../pages/main.jsx";
import Register from "./../pages/register.jsx";
import Game from  "./../pages/game.jsx";
import { MyContext } from "../context.js";
import ROUTES from "./routes.jsx";
import Attendance from "./../pages/attendance.jsx";

const Router = () => {
  //Accesses the global state and its methods using context
  const { appState, setAppState } = useContext(MyContext);
  // Destructures activeRoute
  const { activeRoute } = appState;
  return (
    
    <>
    {/* Renders the component if the active route is the specified one (ROUTES.LOGIN, ROUTES.MAIN, etc.) */}
      {activeRoute === ROUTES.LOGIN && <Login />}
      {activeRoute === ROUTES.MAIN && <Main />}
      {activeRoute === ROUTES.REGISTER && <Register />}
      {activeRoute === ROUTES.GAME && <Game />}
      {activeRoute === ROUTES.ATTENDANCE && <Attendance/>}
    </>

    // <Routes>
    //   <Route path="/" element={<Login />}></Route>
    //   <Route path="/main" element={<Main />}></Route>
    //   <Route path="/register" element={<Register />}></Route>
    // </Routes>
  );
};

export default Router;
