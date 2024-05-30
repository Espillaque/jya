import React, { useEffect, useState } from "react";
import ROUTES from "./router/routes";

// create context
export const MyContext = React.createContext();

// initial state
const INITIAL_STATE = {
  token: "",
  userName: "",
  userId: "",
  games: [],
  events: [],
  activeRoute: ROUTES.LOGIN,
};

// key for local storage
const STORAGE_KEY = "STORAGE_KEY";


const ContextProvider = (props) => {
  // function to load the initial state from local storage
  const loadInitialState = () => {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : INITIAL_STATE;
  };

  // state and function to set its state
  const [appState, setAppState] = useState(loadInitialState);

  // Effect that updates local storage when the state is changed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  // Function to clear local storage
  const clearLocalStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAppState(INITIAL_STATE); 
  };

  return (
    <MyContext.Provider value={{ appState, setAppState, clearLocalStorage }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
