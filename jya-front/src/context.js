import React, { useState } from "react";
import ROUTES from "./router/routes";

export const MyContext = React.createContext();

const myInitialState = {
  token: "",
  userName: "",
  activeRoute: ROUTES.LOGIN,
};

const ContextProvider = (props) => {
  const [contextData, setContextData] = useState(myInitialState);
  return (
    <MyContext.Provider value={{ contextData, setContextData }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
